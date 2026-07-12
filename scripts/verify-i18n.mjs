import assert from "node:assert/strict";
import fs from "node:fs";
import { cursos, lecciones } from "../lib/cursos.ts";
import { pluralLabel } from "../lib/plural.ts";
import { aiRouterLessons } from "../lib/ai-router-course-content.ts";
import { codexLessons } from "../lib/codex-course-content.ts";
import { foundationLessons } from "../lib/foundation-course-content.ts";

const generatedEnglish = JSON.parse(fs.readFileSync("lib/english-lesson-content.json", "utf8")).lessons;
const generatedByKey = new Map(generatedEnglish.map((lesson) => [`${lesson.courseSlug}/${lesson.slug}`, lesson]));
const authoredEnglish = new Map(
  [
    ...codexLessons.map((lesson) => [`codex-programadores/${lesson.slug}`, lesson.title.en]),
    ...foundationLessons.map((lesson) => [`fundamentos-aulafy/${lesson.slug}`, lesson.title.en]),
    ...aiRouterLessons.map((lesson) => [`ai-router/${lesson.slug}`, lesson.title.en]),
  ],
);
const i18nSource = fs.readFileSync("lib/i18n.ts", "utf8");

assert.equal(pluralLabel(1, "lesson"), "1 lección");
assert.equal(pluralLabel(2, "lesson"), "2 lecciones");
assert.equal(pluralLabel(1, "module"), "1 módulo");
assert.equal(pluralLabel(2, "module"), "2 módulos");
assert.equal(pluralLabel(1, "lesson", "en"), "1 lesson");
assert.equal(pluralLabel(2, "lesson", "en"), "2 lessons");

for (const course of cursos) {
  assert.ok(i18nSource.includes(`"${course.slug}"`), `Missing English course copy: ${course.slug}`);
  assert.ok(i18nSource.includes(`if (spanishPath === "/cursos") return "/en/courses";`), "Spanish catalog must map to English catalog");
  assert.ok(i18nSource.includes(`if (spanishPath.startsWith("/cursos/"))`), "Spanish course paths must map to English course paths");

  for (const lesson of lecciones(course)) {
    const key = `${course.slug}/${lesson.slug}`;
    const generatedLesson = generatedByKey.get(key);
    const authoredTitle = authoredEnglish.get(key);
    const translatedTitle = authoredTitle ?? generatedLesson?.title;
    assert.ok(translatedTitle, `Missing English lesson: ${key}`);
    if (translatedTitle === lesson.title) {
      assert.doesNotMatch(translatedTitle, /[áéíóúñ¿¡]|\b(el|la|los|las|para|con|sin|desde|cómo|qué)\b/i, `Untranslated Spanish lesson title: ${key}`);
    }
    assert.doesNotMatch(translatedTitle, /[¿¡]/, `Spanish punctuation in English title: ${key}`);
  }
}

console.log(`Verified ES/EN parity and pluralization for ${cursos.length} courses and ${cursos.flatMap(lecciones).length} lessons.`);
