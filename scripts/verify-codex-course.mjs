import assert from "node:assert/strict";
import fs from "node:fs";
import { codexLessons, getCodexLessonPractice } from "../lib/codex-course-content.ts";
import {
  CODEX_ZERO_SOURCE_FILE,
  codexZeroLessons,
  getCodexZeroLesson,
} from "../lib/codex-zero-course-content.ts";

const requiredStringFields = [
  "build",
  "why",
  "starter",
  "codexPrompt",
  "expected",
  "manualCheck",
  "commonError",
  "exercise",
  "solution",
  "evidence",
];

assert.ok(codexLessons.length >= 8, "Codex course should remain a full flagship course");

for (const lesson of codexLessons) {
  const practice = getCodexLessonPractice(lesson);
  const key = `codex-programadores/${lesson.slug}`;

  for (const field of requiredStringFields) {
    assert.ok(practice[field].es.length >= 30, `Missing Spanish practice field ${field}: ${key}`);
    assert.ok(practice[field].en.length >= 30, `Missing English practice field ${field}: ${key}`);
  }

  assert.ok(practice.steps.es.length >= 4, `Missing Spanish steps: ${key}`);
  assert.ok(practice.steps.en.length >= 4, `Missing English steps: ${key}`);
  assert.ok(practice.verify.length >= 8, `Missing verification command: ${key}`);
  assert.ok(practice.sources.length >= 1, `Missing official sources: ${key}`);
  assert.ok(practice.sources.every((source) => source.href.startsWith("https://")), `Sources must be HTTPS: ${key}`);
  assert.match(practice.tested, /^\d{4}-\d{2}-\d{2}$/, `Missing tested date: ${key}`);
}

assert.equal(codexZeroLessons.length, 20, "Codex desde cero must publish exactly 20 lessons");
assert.equal(new Set(codexZeroLessons.map((lesson) => lesson.slug)).size, 20, "Codex desde cero lesson slugs must be unique");

for (const lesson of codexZeroLessons) {
  const parsed = getCodexZeroLesson(lesson.slug);
  const key = `codex-desde-cero/${lesson.slug}`;
  assert.ok(parsed, `Missing parsed Markdown lesson: ${key}`);
  assert.ok(parsed.markdown.length >= 3000, `Lesson is not complete enough: ${key}`);
  assert.match(parsed.markdown, /### Qué vas a aprender/, `Missing objectives: ${key}`);
  assert.match(parsed.markdown, /### Ejemplo resuelto/, `Missing worked example: ${key}`);
  assert.match(parsed.markdown, /### Comprueba que lo has entendido/, `Missing self-assessment: ${key}`);
  assert.match(parsed.markdown, /### Fuentes oficiales/, `Missing official sources: ${key}`);
  assert.ok(fs.existsSync(`app/cursos/${key}/page.tsx`), `Missing web route: ${key}`);
}

const zeroSource = fs.readFileSync(CODEX_ZERO_SOURCE_FILE, "utf8");
assert.equal((zeroSource.match(/^# Apéndice [A-J]\./gm) ?? []).length, 10, "Codex desde cero must retain its 10 appendices");
assert.match(zeroSource, /Estado:\*\* aprobado y publicado/, "Published source must record its approved status");

for (const [file, minimumBytes] of [
  ["public/manual-codex-desde-cero-aulafy.pdf", 400_000],
  ["public/recursos/codex-desde-cero/manual-codex-desde-cero-aulafy.tex", 200_000],
  [CODEX_ZERO_SOURCE_FILE, 150_000],
]) {
  assert.ok(fs.statSync(file).size >= minimumBytes, `Published artifact is missing or truncated: ${file}`);
}

console.log(`Verified ${codexLessons.length} developer Codex lessons and ${codexZeroLessons.length} Codex desde cero lessons with complete source artifacts.`);
