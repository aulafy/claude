import assert from "node:assert/strict";
import { cursos } from "../lib/cursos.ts";
import { getLearningPaths } from "../lib/learning-paths.ts";
import { getPathRecommendation } from "../lib/path-advisor.ts";

const profiles = ["cero", "trabajo", "tecnico"];
const goals = ["fundamentos", "web", "trabajo", "programar", "sistemas"];

for (const locale of ["es", "en"]) {
  const pathSlugs = new Set(getLearningPaths(locale).map((path) => path.slug));
  for (const profile of profiles) {
    for (const goal of goals) {
      const result = getPathRecommendation(profile, goal, locale);
      assert.ok(pathSlugs.has(result.pathSlug), `Unknown ${locale} path for ${profile}/${goal}: ${result.pathSlug}`);
      assert.ok(result.title && result.reason && result.firstWin, `Incomplete recommendation for ${locale} ${profile}/${goal}`);
      assert.equal(result.href.startsWith(locale === "en" ? "/en/" : "/"), true, `Wrong locale href: ${result.href}`);
      const courseMatch = result.href.match(/^\/(?:en\/)?courses\/([^/]+)$/);
      if (courseMatch) {
        const course = cursos.find((item) => item.slug === courseMatch[1]);
        assert.ok(course, `Unknown recommended course: ${courseMatch[1]}`);
        if (locale === "en") assert.notEqual(course.availableInEnglish, false, `Spanish-only course recommended in English: ${course.slug}`);
      }
    }
  }
}

assert.equal(getPathRecommendation("cero", "fundamentos", "es").href, "/cursos/ia-desde-cero");
assert.equal(getPathRecommendation("trabajo", "fundamentos", "es").href, "/cursos/ia-pymes");
assert.equal(getPathRecommendation("tecnico", "programar", "en").href, "/en/courses/codex-programadores");
assert.equal(getPathRecommendation("cero", "sistemas", "es").href, "/cursos/codex-desde-cero");

console.log("Path advisor contract passed: 30 bilingual profile/goal combinations, valid paths, available courses, and safe entry points.");
