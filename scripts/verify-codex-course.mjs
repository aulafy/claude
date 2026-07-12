import assert from "node:assert/strict";
import { codexLessons, getCodexLessonPractice } from "../lib/codex-course-content.ts";

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

console.log(`Verified flagship Codex practice structure for ${codexLessons.length} lessons.`);
