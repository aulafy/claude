#!/usr/bin/env node
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const ebookPath = path.join(root, "tmp", "ebook", "ebook-content.json");
const outputPath = path.join(root, "lib", "english-lesson-content.json");

const args = new Map();
for (const arg of process.argv.slice(2)) {
  const [key, value = "true"] = arg.replace(/^--/, "").split("=");
  args.set(key, value);
}

const model = args.get("model") || "grok-composer-2.5-fast";
const onlyCourse = args.get("course");
const limit = args.has("limit") ? Number(args.get("limit")) : Infinity;
const force = args.get("force") === "true";
const timeoutMs = args.has("timeout") ? Number(args.get("timeout")) : 150000;

function ensureEbook() {
  const result = spawnSync("node", ["scripts/collect-ebook-content.cjs"], {
    cwd: root,
    stdio: "inherit",
  });
  if (result.status !== 0) {
    throw new Error("Could not collect ebook content.");
  }
}

function stripAnsi(text) {
  return text.replace(/\x1b\[[0-9;]*m/g, "");
}

function extractJson(text) {
  const clean = stripAnsi(text)
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "");

  const start = clean.indexOf("{");
  if (start < 0) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < clean.length; i += 1) {
    const ch = clean[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === "\"") inString = false;
      continue;
    }

    if (ch === "\"") inString = true;
    else if (ch === "{") depth += 1;
    else if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        const candidate = clean.slice(start, i + 1);
        try {
          return JSON.parse(candidate);
        } catch {
          return null;
        }
      }
    }
  }

  return null;
}

function runGrok(prompt) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "grok",
      ["--no-leader", "-m", model, "-p", prompt, "--output-format", "plain", "--max-turns", "1"],
      { cwd: root, stdio: ["ignore", "pipe", "pipe"] },
    );

    let stdout = "";
    let stderr = "";
    let settled = false;

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      child.kill("SIGKILL");
      const parsed = extractJson(stdout);
      if (parsed) resolve(parsed);
      else reject(new Error(`Grok timed out without valid JSON. stdout=${stdout.slice(0, 500)} stderr=${stderr.slice(0, 500)}`));
    }, timeoutMs);

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString("utf8");
      const parsed = extractJson(stdout);
      if (parsed && !settled) {
        settled = true;
        clearTimeout(timer);
        child.kill("SIGTERM");
        resolve(parsed);
      }
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString("utf8");
    });

    child.on("exit", () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      const parsed = extractJson(stdout);
      if (parsed) resolve(parsed);
      else reject(new Error(`Grok exited without valid JSON. stdout=${stdout.slice(0, 500)} stderr=${stderr.slice(0, 500)}`));
    });
  });
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

function validate(original, translated) {
  if (!translated || translated.courseSlug !== original.courseSlug || translated.slug !== original.slug) {
    throw new Error("Translated lesson does not preserve courseSlug/slug.");
  }
  if (!Array.isArray(translated.blocks) || translated.blocks.length !== original.blocks.length) {
    throw new Error("Translated lesson changed block count.");
  }
  for (let i = 0; i < original.blocks.length; i += 1) {
    const before = original.blocks[i];
    const after = translated.blocks[i];
    if (before.type !== after.type) throw new Error(`Block ${i} changed type.`);
    if (before.type === "code" && before.text !== after.text) {
      throw new Error(`Block ${i} changed code text.`);
    }
  }
}

function loadExisting() {
  if (!fs.existsSync(outputPath) || force) {
    return { generatedAt: "", source: "scripts/translate-lessons-grok.mjs", lessons: [] };
  }
  return JSON.parse(fs.readFileSync(outputPath, "utf8"));
}

function save(data) {
  data.generatedAt = new Date().toISOString().slice(0, 10);
  data.source = "scripts/translate-lessons-grok.mjs";
  fs.writeFileSync(outputPath, `${JSON.stringify(data, null, 2)}\n`);
}

function lessonKey(courseSlug, lessonSlug) {
  return `${courseSlug}/${lessonSlug}`;
}

function buildPrompt(lesson) {
  return `Translate this Aulafy lesson JSON from Spanish to English.

Return ONLY valid JSON. Do not wrap it in markdown.
Preserve this exact schema:
{
  "courseSlug": string,
  "courseTitle": string,
  "slug": string,
  "title": string,
  "href": string,
  "blocks": [{"type": "h2" | "h3" | "p" | "bullet" | "code", "text": string}]
}

Rules:
- Preserve all keys, slugs, hrefs and block types.
- Preserve every block with "type": "code" exactly unchanged, byte for byte.
- Translate courseTitle, title and every non-code block text into natural English for technical learners.
- Keep product names and commands unchanged.
- Do not add, remove, split or merge blocks.

JSON:
${JSON.stringify(lesson, null, 2)}`;
}

ensureEbook();

const ebook = JSON.parse(fs.readFileSync(ebookPath, "utf8"));
const output = loadExisting();
const existing = new Map(output.lessons.map((lesson) => [lessonKey(lesson.courseSlug, lesson.slug), lesson]));
let done = 0;

for (const course of ebook.courses) {
  if (onlyCourse && course.slug !== onlyCourse) continue;
  for (const lesson of course.lessons) {
    if (done >= limit) break;
    const original = compactLesson(course, lesson);
    const key = lessonKey(original.courseSlug, original.slug);
    if (!force && existing.has(key)) continue;

    process.stdout.write(`Translating ${key}... `);
    let translated;
    let lastError;
    for (let attempt = 1; attempt <= 2; attempt += 1) {
      try {
        translated = await runGrok(buildPrompt(original));
        validate(original, translated);
        break;
      } catch (error) {
        lastError = error;
        process.stdout.write(`retry${attempt} `);
      }
    }
    if (!translated) {
      console.log(`FAILED: ${lastError?.message ?? "unknown error"}`);
      save(output);
      process.exitCode = 1;
      continue;
    }

    existing.set(key, translated);
    output.lessons = Array.from(existing.values()).sort((a, b) =>
      lessonKey(a.courseSlug, a.slug).localeCompare(lessonKey(b.courseSlug, b.slug)),
    );
    save(output);
    done += 1;
    console.log("ok");
  }
}

console.log(`Saved ${output.lessons.length} translated lessons to ${path.relative(root, outputPath)}.`);
