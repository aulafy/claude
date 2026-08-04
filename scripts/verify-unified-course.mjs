import assert from "node:assert/strict";
import { unifiedModules, unifiedSources } from "../lib/unified-course.ts";

assert.equal(unifiedModules.length, 7, "The unified course must keep seven modules");

const ids = new Set();
const titles = { es: new Set(), en: new Set() };

for (const module of unifiedModules) {
  assert.ok(module.id && !ids.has(module.id), `Duplicate or empty module id: ${module.id}`);
  ids.add(module.id);
  assert.ok(module.lessons.length >= 3, `Module needs at least three lessons: ${module.id}`);

  for (const locale of ["es", "en"]) {
    assert.ok(module.title[locale].length >= 5, `Missing ${locale} module title: ${module.id}`);
    assert.ok(module.purpose[locale].length >= 25, `Weak ${locale} module purpose: ${module.id}`);
  }

  for (const lesson of module.lessons) {
    assert.ok(!ids.has(lesson.id), `Duplicate lesson id: ${lesson.id}`);
    ids.add(lesson.id);
    assert.ok(lesson.outcomes.length >= 2, `Lesson needs observable outcomes: ${lesson.id}`);
    assert.ok(lesson.explanation.length >= 2, `Lesson needs a compact explanation: ${lesson.id}`);
    assert.ok(lesson.sources.length >= 1, `Lesson needs a primary source: ${lesson.id}`);
    assert.ok(lesson.sources.every((key) => unifiedSources[key]), `Unknown source in lesson: ${lesson.id}`);

    for (const locale of ["es", "en"]) {
      const title = lesson.title[locale].trim().toLocaleLowerCase(locale);
      assert.ok(!titles[locale].has(title), `Duplicate ${locale} lesson title: ${lesson.title[locale]}`);
      titles[locale].add(title);
      assert.ok(lesson.summary[locale].length >= 20, `Weak ${locale} summary: ${lesson.id}`);
      assert.ok(lesson.practice[locale].length >= 25, `Weak ${locale} practice: ${lesson.id}`);
      assert.ok(lesson.evidence[locale].length >= 20, `Weak ${locale} evidence: ${lesson.id}`);
      assert.ok(lesson.outcomes.every((item) => item[locale].length >= 12), `Weak ${locale} outcome: ${lesson.id}`);
      assert.ok(lesson.explanation.every((item) => item[locale].length >= 45), `Weak ${locale} explanation: ${lesson.id}`);
    }
  }
}

for (const [key, source] of Object.entries(unifiedSources)) {
  assert.ok(source.href.startsWith("https://"), `Source must use HTTPS: ${key}`);
  assert.ok(source.label.length >= 8, `Source needs a useful label: ${key}`);
}

console.log(`Unified course verified: ${unifiedModules.length} modules, ${ids.size - unifiedModules.length} lessons, two languages.`);

