import assert from "node:assert/strict";
import { getLearningContinuation } from "../lib/learning-continuation.ts";

const progress = {
  href: "/cursos/ia-desde-cero/modelos-chat-llm", title: "Última lección visitada", courseTitle: "IA desde cero", locale: "es", visitedAt: "2026-08-16T10:00:00.000Z",
  startedLessons: ["/cursos/ia-desde-cero/pedir-resultados-utiles", "/cursos/ia-desde-cero/alucinaciones-verificar"], completedLessons: [],
  activityDays: [], evidenceItems: [], savedItems: [],
};

const pending = getLearningContinuation(progress, "es");
assert.equal(pending?.href, "/cursos/ia-desde-cero/alucinaciones-verificar", "The latest unfinished mission must beat a merely visited lesson");
assert.equal(pending?.title, "Detecta una respuesta inventada", "Route missions should use their concise route title");
assert.equal(pending?.inProgress, true);

const currentPending = getLearningContinuation({ ...progress, href: progress.startedLessons[0] }, "es");
assert.equal(currentPending?.href, progress.startedLessons[0], "The current unfinished mission must remain preferred");

const completedLatest = getLearningContinuation({ ...progress, completedLessons: [progress.startedLessons[1]] }, "es");
assert.equal(completedLatest?.href, progress.startedLessons[0], "Completed missions must be skipped");

const fallback = getLearningContinuation({ ...progress, completedLessons: progress.startedLessons }, "es");
assert.equal(fallback?.href, progress.href, "With no unfinished mission, continue from the last visit");
assert.equal(fallback?.inProgress, false);
assert.equal(getLearningContinuation(progress, "en"), null, "A continuation must not leak across locales");

console.log("Learning continuation contract passed: unfinished mission priority, current pending preference, completed skip, fallback, and locale isolation.");
