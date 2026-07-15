import assert from "node:assert/strict";
import fs from "node:fs";
import { cursos, lecciones } from "../lib/cursos.ts";
import { getCourseGuidance } from "../lib/course-guidance.ts";
import { courseGroups } from "../lib/course-groups.ts";
import { getLearningPaths } from "../lib/learning-paths.ts";

const courseSlugs = new Set();
const lessonUrls = new Set();
let lessonCount = 0;
const officialSourceHints = [
  "https://platform.openai.com/docs",
  "https://developers.openai.com/codex",
  "https://docs.anthropic.com",
  "https://ollama.com",
  "https://docs.litellm.ai",
  "https://owasp.org",
  "https://www.nist.gov/itl/ai-risk-management-framework",
];

const finalProjectWords = /\b(proyecto|entregable|auditoría|aplicación|prototipo|servicio|agente|flujo|plataforma|adaptador|cambio|cápsula|entrega|modelo|sistema|web)\b/i;

for (const course of cursos) {
  assert.ok(!courseSlugs.has(course.slug), `Duplicate course slug: ${course.slug}`);
  courseSlugs.add(course.slug);
  assert.ok(course.title.length >= 8, `Course title is too short: ${course.slug}`);
  assert.ok(course.slug.trim(), `Missing course slug`);
  assert.ok(course.desc.length >= 100, `Course description is too short: ${course.slug}`);
  assert.ok(course.secciones.length >= 2, `Course needs at least two modules: ${course.slug}`);
  assert.ok(course.level.trim(), `Missing course level: ${course.slug}`);
  assert.ok(course.short.trim().length >= 20, `Missing short course summary: ${course.slug}`);

  const guidance = getCourseGuidance(course.slug, "es");
  assert.ok(guidance, `Missing educational guidance: ${course.slug}`);
  assert.ok(guidance.estimatedHours >= 1, `Course needs estimated duration: ${course.slug}`);
  assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(guidance.updated), `Course needs ISO review date: ${course.slug}`);
  assert.ok(guidance.audience.length >= 40, `Course audience is too vague: ${course.slug}`);
  assert.ok(guidance.outcomes.length >= 3, `Course needs three outcomes: ${course.slug}`);
  assert.ok(guidance.prerequisites.length >= 2, `Course needs two prerequisites: ${course.slug}`);
  assert.ok(guidance.deliverable.length >= 30, `Deliverable is too vague: ${course.slug}`);
  assert.ok(finalProjectWords.test(guidance.deliverable), `Deliverable must describe a final project or artifact: ${course.slug}`);
  assert.ok(officialSourceHints.length >= 3, "Official source baseline is missing");

  const courseLessons = lecciones(course);
  assert.ok(courseLessons.length >= 2, `Course needs at least two lessons: ${course.slug}`);

  for (const [index, lesson] of courseLessons.entries()) {
    const key = `${course.slug}/${lesson.slug}`;
    assert.ok(!lessonUrls.has(key), `Duplicate lesson URL: ${key}`);
    lessonUrls.add(key);
    assert.ok(lesson.title.length >= 5, `Lesson title is too short: ${key}`);
    const directLessonPage = `app/cursos/${key}/page.tsx`;
    const generatedLessonPage = `app/cursos/${course.slug}/[lesson]/page.tsx`;
    assert.ok(
      fs.existsSync(directLessonPage) || fs.existsSync(generatedLessonPage),
      `Missing Spanish lesson page: ${key}`,
    );
    assert.ok(index === 0 || courseLessons[index - 1], `Missing previous lesson relation: ${key}`);
    assert.ok(index === courseLessons.length - 1 || courseLessons[index + 1], `Missing next lesson relation: ${key}`);
    lessonCount += 1;
  }
}

assert.ok(cursos.length >= 3, "Google course-list markup needs at least three real courses");
assert.ok(fs.existsSync("app/rutas/page.tsx"), "Missing Spanish learning paths");
assert.ok(fs.existsSync("app/en/paths/page.tsx"), "Missing English learning paths");

const catalogCourseSlugs = courseGroups.flatMap((group) => group.slugs);
assert.equal(new Set(catalogCourseSlugs).size, catalogCourseSlugs.length, "A course appears in more than one catalog group");
assert.deepEqual(
  new Set(catalogCourseSlugs),
  courseSlugs,
  "Every published course must appear exactly once in the visible Spanish catalog",
);

const spanishPaths = getLearningPaths("es");
const pathCourseSlugs = new Set(spanishPaths.flatMap((path) => path.courses));
assert.ok(spanishPaths.filter((path) => path.featured).length >= 4, "The landing needs at least four clear starting profiles");
for (const path of spanishPaths) {
  assert.ok(path.entry.length >= 8, `Learning path needs an entry level: ${path.slug}`);
  assert.ok(path.firstStep.length >= 8, `Learning path needs a first step: ${path.slug}`);
  assert.ok(path.outcome.length >= 60, `Learning path needs a concrete outcome: ${path.slug}`);
  assert.ok(path.courses.length >= 1, `Learning path needs at least one course: ${path.slug}`);
  assert.ok(path.courses.every((slug) => courseSlugs.has(slug)), `Unknown course in learning path: ${path.slug}`);
}
assert.deepEqual(pathCourseSlugs, courseSlugs, "Every published course must belong to at least one Spanish learning path");
assert.ok(spanishPaths.find((path) => path.slug === "desde-cero")?.courses.includes("codex-desde-cero"), "Missing zero-experience path");
assert.ok(spanishPaths.find((path) => path.slug === "web-saas")?.courses.includes("crear-webs-con-ia"), "Missing web and SaaS path");

console.log(`Educational audit passed: ${cursos.length} courses, ${lessonCount} lessons, ${spanishPaths.length} paths and no orphaned courses.`);
