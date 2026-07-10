import assert from "node:assert/strict";
import fs from "node:fs";
import { cursos, lecciones } from "../lib/cursos.ts";
import { getCourseGuidance } from "../lib/course-guidance.ts";

const courseSlugs = new Set();
const lessonUrls = new Set();
let lessonCount = 0;

for (const course of cursos) {
  assert.ok(!courseSlugs.has(course.slug), `Duplicate course slug: ${course.slug}`);
  courseSlugs.add(course.slug);
  assert.ok(course.title.length >= 8, `Course title is too short: ${course.slug}`);
  assert.ok(course.desc.length >= 100, `Course description is too short: ${course.slug}`);
  assert.ok(course.secciones.length >= 2, `Course needs at least two modules: ${course.slug}`);

  const guidance = getCourseGuidance(course.slug, "es");
  assert.ok(guidance, `Missing educational guidance: ${course.slug}`);
  assert.ok(guidance.outcomes.length >= 3, `Course needs three outcomes: ${course.slug}`);
  assert.ok(guidance.prerequisites.length >= 2, `Course needs two prerequisites: ${course.slug}`);
  assert.ok(guidance.deliverable.length >= 30, `Deliverable is too vague: ${course.slug}`);

  for (const lesson of lecciones(course)) {
    const key = `${course.slug}/${lesson.slug}`;
    assert.ok(!lessonUrls.has(key), `Duplicate lesson URL: ${key}`);
    lessonUrls.add(key);
    assert.ok(lesson.title.length >= 5, `Lesson title is too short: ${key}`);
    assert.ok(fs.existsSync(`app/cursos/${key}/page.tsx`), `Missing Spanish lesson page: ${key}`);
    lessonCount += 1;
  }
}

assert.ok(cursos.length >= 3, "Google course-list markup needs at least three real courses");
assert.ok(fs.existsSync("app/rutas/page.tsx"), "Missing Spanish learning paths");
assert.ok(fs.existsSync("app/en/paths/page.tsx"), "Missing English learning paths");

console.log(`Educational audit passed: ${cursos.length} courses, ${lessonCount} lessons, ${lessonUrls.size} unique lesson URLs.`);
