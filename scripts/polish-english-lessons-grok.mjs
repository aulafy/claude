#!/usr/bin/env node
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const target = path.join(root, "lib", "english-lesson-content.json");
const model = process.env.GROK_MODEL ?? "grok-composer-2.5-fast";
const concurrency = 3;
const spanish = /(¿|¡|\b(el|la|los|las|una|para|con|sin|que|este|esta|del|desde|después|antes|solo|todos|cómo|qué|crear|ejecuta|prueba|revisa|archivo|proyecto|cambios|datos|respuesta|usuario|herramienta|modelo|configuración|instrucciones|si)\b)/i;

function parseJson(text) {
  const clean = text.replace(/\x1b\[[0-9;]*m/g, "").replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "");
  const start = clean.indexOf("[");
  if (start < 0) return null;
  let depth = 0;
  let quoted = false;
  let escaped = false;
  for (let index = start; index < clean.length; index += 1) {
    const char = clean[index];
    if (quoted) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') quoted = false;
    } else if (char === '"') quoted = true;
    else if (char === "[") depth += 1;
    else if (char === "]" && --depth === 0) {
      try { return JSON.parse(clean.slice(start, index + 1)); } catch { return null; }
    }
  }
  return null;
}

function callGrok(prompt) {
  return new Promise((resolve, reject) => {
    const child = spawn("grok", ["--no-leader", "-m", model, "-p", prompt, "--output-format", "plain", "--max-turns", "1"], { cwd: root });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => child.kill("SIGKILL"), 240000);
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", reject);
    child.on("exit", () => {
      clearTimeout(timer);
      const result = parseJson(stdout);
      if (result) resolve(result);
      else reject(new Error(`Grok did not return valid JSON: ${stderr.slice(0, 300)}`));
    });
  });
}

function validate(before, after) {
  if (!after || before.courseSlug !== after.courseSlug || before.slug !== after.slug || before.blocks.length !== after.blocks.length) {
    throw new Error(`Invalid lesson ${before.courseSlug}/${before.slug}`);
  }
  before.blocks.forEach((block, index) => {
    if (block.type !== after.blocks[index]?.type) throw new Error(`Changed block type in ${before.slug}`);
  });
}

function prompt(lessons) {
  return "You are editing English technical course lessons for Aulafy. Return ONLY a valid JSON array containing the same lesson objects.\n\n"
    + "Translate every remaining Spanish phrase into natural English, including prose, YAML/JSON values, shell comments, example prompts and user-facing messages inside code blocks. Keep programming syntax, commands, package names, CLI flags, paths, identifiers, JSON/YAML keys, markdown structure and block types unchanged whenever they are code rather than explanatory language. Do not add, remove, reorder, split or merge blocks. Preserve every courseSlug, slug and href exactly.\n\nLessons:\n"
    + JSON.stringify(lessons);
}

const data = JSON.parse(fs.readFileSync(target, "utf8"));
const candidates = data.lessons.filter((lesson) => lesson.blocks.some((block) => spanish.test(block.text)));
const batches = [];
for (let index = 0; index < candidates.length; index += 4) batches.push(candidates.slice(index, index + 4));
const updates = new Map();
let cursor = 0;

async function worker() {
  while (cursor < batches.length) {
    const batch = batches[cursor++];
    process.stdout.write(`Polishing ${batch.map((item) => `${item.courseSlug}/${item.slug}`).join(", ")}... `);
    try {
      const translated = await callGrok(prompt(batch));
      if (!Array.isArray(translated) || translated.length !== batch.length) throw new Error("Unexpected batch size");
      batch.forEach((lesson, index) => validate(lesson, translated[index]));
      translated.forEach((lesson) => updates.set(`${lesson.courseSlug}/${lesson.slug}`, lesson));
      console.log("ok");
    } catch (error) {
      console.log(`failed (${error.message})`);
    }
  }
}

await Promise.all(Array.from({ length: concurrency }, worker));
data.lessons = data.lessons.map((lesson) => updates.get(`${lesson.courseSlug}/${lesson.slug}`) ?? lesson);
data.generatedAt = new Date().toISOString().slice(0, 10);
data.source = "scripts/polish-english-lessons-grok.mjs";
fs.writeFileSync(target, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${updates.size}/${candidates.length} lessons.`);
