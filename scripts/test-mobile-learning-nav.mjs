import assert from "node:assert/strict";
import { getMobileLearningNavItems } from "../lib/mobile-learning-nav.ts";

const noProgress = getMobileLearningNavItems("es", "/buscar", null);
assert.equal(noProgress.length, 4, "Mobile navigation must keep four stable destinations");
assert.deepEqual(noProgress.map((item) => item.label), ["Inicio", "Mi ruta", "Buscar", "Explorar"]);
assert.equal(noProgress.find((item) => item.active)?.label, "Buscar");
assert.equal(noProgress.some((item) => item.continue), false);

const progress = {
  href: "/en/courses/deepseek-harness/models",
  title: "Models",
  courseTitle: "DeepSeek Harness",
  locale: "en",
  visitedAt: "2026-08-16T10:00:00.000Z",
  completedLessons: [],
  savedItems: [],
};
const withProgress = getMobileLearningNavItems("en", progress.href, progress);
assert.deepEqual(withProgress.map((item) => item.label), ["Home", "My path", "Search", "Continue"]);
assert.equal(withProgress[3].href, progress.href);
assert.equal(withProgress[3].active, true);
assert.equal(withProgress[3].continue, true);

const otherLocale = getMobileLearningNavItems("es", "/cursos", progress);
assert.equal(otherLocale[3].label, "Explorar", "Progress from another locale must not leak into the current navigation");
assert.equal(otherLocale[3].active, true);

console.log("Mobile learning navigation contract passed: four stable actions, active state, local Continue, fallback Explore, and locale isolation.");
