import assert from "node:assert/strict";
import fs from "node:fs";
import { unifiedModuleProjects, unifiedModules, unifiedSources } from "../lib/unified-course.ts";

assert.equal(unifiedModules.length, 7, "The unified course must keep seven modules");

const ids = new Set();
const titles = { es: new Set(), en: new Set() };
const recoveredLessons = [];

for (const module of unifiedModules) {
  const project = unifiedModuleProjects[module.id];
  assert.ok(project, `Missing module project: ${module.id}`);
  assert.equal(project.deliverables.length, 3, `Module project needs three deliverables: ${module.id}`);
  assert.equal(project.checks.length, 3, `Module project needs three checks: ${module.id}`);
  assert.ok(module.id && !ids.has(module.id), `Duplicate or empty module id: ${module.id}`);
  ids.add(module.id);
  assert.ok(module.lessons.length >= 3, `Module needs at least three lessons: ${module.id}`);

  for (const locale of ["es", "en"]) {
    assert.ok(module.title[locale].length >= 5, `Missing ${locale} module title: ${module.id}`);
    assert.ok(module.purpose[locale].length >= 25, `Weak ${locale} module purpose: ${module.id}`);
    assert.ok(project.title[locale].length >= 12, `Weak ${locale} project title: ${module.id}`);
    assert.ok(project.scenario[locale].length >= 45, `Weak ${locale} project scenario: ${module.id}`);
    assert.ok(project.deliverables.every((item) => item[locale].length >= 25), `Weak ${locale} deliverable: ${module.id}`);
    assert.ok(project.checks.every((item) => item[locale].length >= 25), `Weak ${locale} project check: ${module.id}`);
  }

  for (const lesson of module.lessons) {
    assert.ok(!ids.has(lesson.id), `Duplicate lesson id: ${lesson.id}`);
    ids.add(lesson.id);
    assert.ok(lesson.outcomes.length >= 2, `Lesson needs observable outcomes: ${lesson.id}`);
    assert.ok(lesson.explanation.length >= 2, `Lesson needs a compact explanation: ${lesson.id}`);
    assert.ok(lesson.sources.length >= 1, `Lesson needs a primary source: ${lesson.id}`);
    assert.ok(lesson.sources.every((key) => unifiedSources[key]), `Unknown source in lesson: ${lesson.id}`);
    if (lesson.importedFrom) {
      recoveredLessons.push({ moduleId: module.id, lesson });
      assert.match(lesson.importedFrom.href, /backup\/aulafy-pre-documentacion-2026-08-04/, `Recovered lesson must link to the immutable backup: ${lesson.id}`);
    }

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

assert.equal(ids.size - unifiedModules.length, 28, "The canonical course must contain 28 lessons");
assert.equal(recoveredLessons.length, 7, "The backup import must recover exactly seven lessons");
assert.deepEqual(
  [...new Set(recoveredLessons.map(({ moduleId }) => moduleId))],
  unifiedModules.map(({ id }) => id),
  "Every module must receive one recovered lesson",
);

for (const [key, source] of Object.entries(unifiedSources)) {
  assert.ok(source.href.startsWith("https://"), `Source must use HTTPS: ${key}`);
  assert.ok(source.label.length >= 8, `Source needs a useful label: ${key}`);
}

const courseComponent = fs.readFileSync(new URL("../components/UnifiedCourse.tsx", import.meta.url), "utf8");
assert.match(courseComponent, /id={`project-\${moduleId}`}/, "Module projects need stable anchors");
assert.match(courseComponent, /href={`#project-\${module\.id}`}/, "Lesson navigation must lead to module projects");
assert.match(courseComponent, /<FirstWorkedExample/, "The course needs at least one worked example");
assert.match(courseComponent, /"@type": "Course"/, "The canonical page needs Course structured data");
assert.match(courseComponent, /item\.importedFrom/, "Recovered lessons need visible attribution");
for (const trustPage of ["/fuentes", "/sobre-ramon-guillamon", "/privacidad"]) {
  assert.ok(courseComponent.includes(`href="${trustPage}"`), `Missing trust link: ${trustPage}`);
}

console.log(`Unified course verified: ${unifiedModules.length} modules, ${ids.size - unifiedModules.length} lessons, two languages.`);
