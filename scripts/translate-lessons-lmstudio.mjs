#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ebookPath = path.join(root, "tmp", "ebook", "ebook-content.json");
const outputPath = path.join(root, "lib", "english-lesson-content.json");

const args = new Map();
for (const arg of process.argv.slice(2)) {
  const [key, value = "true"] = arg.replace(/^--/, "").split("=");
  args.set(key, value);
}

const endpoint = args.get("endpoint") || "http://127.0.0.1:1234/v1/chat/completions";
const model = args.get("model") || "google/gemma-4-12b-qat";
const onlyCourse = args.get("course");
const lessonFilter = new Set((args.get("lessons") || "").split(",").map((item) => item.trim()).filter(Boolean));
const timeoutMs = Number(args.get("timeout") || 180000);

function ensureEbook() {
  const result = spawnSync("node", ["scripts/collect-ebook-content.cjs"], { cwd: root, stdio: "inherit" });
  if (result.status !== 0) throw new Error("Could not collect ebook content.");
}

function compactLesson(course, lesson) {
  return {
    courseSlug: course.slug,
    courseTitle: course.title,
    slug: lesson.slug,
    title: lesson.title,
    href: lesson.href,
    blocks: lesson.blocks,
  };
}

function extractJson(text) {
  const clean = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "");
  const start = clean.indexOf("{");
  if (start < 0) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < clean.length; index += 1) {
    const char = clean[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === "\"") inString = false;
      continue;
    }
    if (char === "\"") inString = true;
    else if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        try {
          return JSON.parse(clean.slice(start, index + 1));
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}

function validate(original, translated) {
  if (!translated || translated.courseSlug !== original.courseSlug || translated.slug !== original.slug) {
    throw new Error("Translated lesson does not preserve courseSlug/slug.");
  }
  if (!Array.isArray(translated.blocks) || translated.blocks.length !== original.blocks.length) {
    throw new Error("Translated lesson changed block count.");
  }
  for (let index = 0; index < original.blocks.length; index += 1) {
    const before = original.blocks[index];
    const after = translated.blocks[index];
    if (before.type !== after.type) throw new Error(`Block ${index} changed type.`);
    if (before.type === "code" && before.text !== after.text) throw new Error(`Block ${index} changed code text.`);
  }
}

async function translate(lesson) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        temperature: 0.1,
        messages: [
          {
            role: "system",
            content: "You translate Spanish technical course lessons into natural English. Return only valid JSON.",
          },
          {
            role: "user",
            content: `Translate this Aulafy lesson JSON from Spanish to English.

Return ONLY valid JSON. Preserve every key, slug, href, block type and block count.
Translate courseTitle, title and every non-code block text.
Preserve code blocks exactly byte for byte.

JSON:
${JSON.stringify(lesson, null, 2)}`,
          },
        ],
      }),
      signal: controller.signal,
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(JSON.stringify(payload).slice(0, 500));
    const text = payload.choices?.[0]?.message?.content ?? "";
    const parsed = extractJson(text);
    if (!parsed) throw new Error(`No valid JSON in model response: ${text.slice(0, 300)}`);
    validate(lesson, parsed);
    return parsed;
  } finally {
    clearTimeout(timer);
  }
}

function key(courseSlug, lessonSlug) {
  return `${courseSlug}/${lessonSlug}`;
}

ensureEbook();

const ebook = JSON.parse(fs.readFileSync(ebookPath, "utf8"));
const output = JSON.parse(fs.readFileSync(outputPath, "utf8"));
const existing = new Map(output.lessons.map((lesson) => [key(lesson.courseSlug, lesson.slug), lesson]));

for (const course of ebook.courses) {
  if (onlyCourse && course.slug !== onlyCourse) continue;
  for (const lesson of course.lessons) {
    if (lessonFilter.size && !lessonFilter.has(lesson.slug) && !lessonFilter.has(key(course.slug, lesson.slug))) continue;
    const original = compactLesson(course, lesson);
    process.stdout.write(`Translating ${key(original.courseSlug, original.slug)} with LM Studio... `);
    const translated = await translate(original);
    existing.set(key(translated.courseSlug, translated.slug), translated);
    console.log("ok");
  }
}

output.lessons = Array.from(existing.values()).sort((a, b) => key(a.courseSlug, a.slug).localeCompare(key(b.courseSlug, b.slug)));
output.generatedAt = new Date().toISOString().slice(0, 10);
output.source = "scripts/translate-lessons-lmstudio.mjs";
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Saved ${output.lessons.length} translated lessons to ${path.relative(root, outputPath)}.`);
