import assert from "node:assert/strict";
import {
  createLearningProgressExport,
  mergeLearningProgress,
  parseLearningProgressExport,
  validateLearningProgress,
} from "../lib/learning-progress.ts";

const base = {
  href: "/empezar",
  title: "Primera misión",
  courseTitle: "Ruta de 7 días",
  locale: "es",
  visitedAt: "2026-08-15T10:00:00.000Z",
  completedLessons: ["/empezar", "/empezar"],
};

const valid = validateLearningProgress(base);
assert.ok(valid);
assert.deepEqual(valid.completedLessons, ["/empezar"], "Completed routes must be deduplicated");
assert.deepEqual(valid.startedLessons, ["/empezar"], "Older completed lessons must also normalize to started lessons");
assert.deepEqual(valid.savedItems, [], "Version 1 files created before saved lists must remain compatible");
assert.deepEqual(valid.activityDays, [], "Version 1 files created before learning streaks must remain compatible");
assert.deepEqual(valid.evidenceItems, [], "Version 1 files created before the evidence notebook must remain compatible");
assert.equal(validateLearningProgress({ ...base, href: "https://example.com" }), null, "External last-location URLs must fail");
assert.equal(validateLearningProgress({ ...base, completedLessons: ["//example.com"] }), null, "Protocol-relative completed URLs must fail");
assert.equal(validateLearningProgress({ ...base, visitedAt: "not-a-date" }), null, "Invalid dates must fail");
assert.equal(validateLearningProgress({ ...base, completedLessons: Array.from({ length: 1001 }, (_, index) => `/lesson-${index}`) }), null, "Oversized completed lists must fail");
assert.equal(validateLearningProgress({ ...base, startedLessons: Array.from({ length: 2001 }, (_, index) => `/started-${index}`) }), null, "Oversized started lists must fail");
assert.equal(validateLearningProgress({ ...base, activityDays: ["2026-02-30"] }), null, "Impossible activity dates must fail");
assert.equal(validateLearningProgress({ ...base, evidenceItems: [{ href: "https://example.com", title: "Bad", content: "Text", locale: "es", savedAt: base.visitedAt }] }), null, "Evidence must belong to an internal lesson");
assert.equal(validateLearningProgress({ ...base, evidenceItems: [{ href: "/empezar", title: "Too long", content: "x".repeat(2001), locale: "es", savedAt: base.visitedAt }] }), null, "Evidence content must have a defensive size limit");
assert.equal(validateLearningProgress({ ...base, savedItems: [{ href: "https://example.com", title: "Bad", courseTitle: "Bad", locale: "es", savedAt: base.visitedAt }] }), null, "External saved-item URLs must fail");
assert.equal(validateLearningProgress({ ...base, savedItems: Array.from({ length: 51 }, (_, index) => ({ href: `/saved-${index}`, title: `Saved ${index}`, courseTitle: "Course", locale: "es", savedAt: base.visitedAt })) }), null, "Oversized saved lists must fail");
assert.equal(validateLearningProgress({ ...base, selectedPath: { slug: "web-saas", title: "Web", href: "https://example.com", firstTitle: "Start", firstHref: "/empezar", locale: "es", selectedAt: base.visitedAt } }), null, "External chosen-path URLs must fail");

const withPath = validateLearningProgress({ ...base, selectedPath: { slug: "web-saas", title: "Crea una web", href: "/rutas?ruta=web-saas#web-saas", firstTitle: "Codex desde cero", firstHref: "/cursos/codex-desde-cero", locale: "es", selectedAt: base.visitedAt } });
assert.equal(withPath?.selectedPath?.slug, "web-saas", "A valid chosen path must be portable");

const exported = createLearningProgressExport(valid, "2026-08-16T09:00:00.000Z");
assert.equal(exported.version, 1);
assert.deepEqual(parseLearningProgressExport(JSON.parse(JSON.stringify(exported))), exported, "A valid document must round-trip");
assert.equal(parseLearningProgressExport({ ...exported, version: 2 }), null, "Unknown versions must fail closed");
assert.equal(parseLearningProgressExport({ ...exported, format: "other-app" }), null, "Foreign formats must fail closed");

const newer = {
  ...valid,
  href: "/cursos/ia-desde-cero/modelos-chat-llm",
  title: "Modelos, chat y LLM",
  visitedAt: "2026-08-16T10:00:00.000Z",
  completedLessons: ["/cursos/ia-desde-cero/modelos-chat-llm"],
  startedLessons: ["/cursos/ia-desde-cero/modelos-chat-llm", "/cursos/ia-desde-cero/chat-rag-agentes-automatizacion"],
  activityDays: ["2026-08-15", "2026-08-16"],
  evidenceItems: [{ href: "/cursos/ia-desde-cero/modelos-chat-llm", title: "Modelos", content: "Interfaz: web\nModelo: comprobado", locale: "es", savedAt: "2026-08-16T09:35:00.000Z" }],
  savedItems: [{ href: "/cursos/ia-desde-cero/modelos-chat-llm", title: "Modelos", courseTitle: "IA desde cero", locale: "es", savedAt: "2026-08-16T09:30:00.000Z" }],
  selectedPath: { slug: "sistemas", title: "Ingeniería de sistemas de IA", href: "/rutas?ruta=sistemas#sistemas", firstTitle: "Fundamentos", firstHref: "/cursos/fundamentos-aulafy", locale: "es", selectedAt: "2026-08-16T09:45:00.000Z" },
};
const merged = mergeLearningProgress(withPath, newer);
assert.equal(merged.href, newer.href, "Merge must keep the most recently visited location");
assert.deepEqual(merged.completedLessons, ["/empezar", "/cursos/ia-desde-cero/modelos-chat-llm"], "Merge must preserve both sets without duplicates");
assert.deepEqual(merged.startedLessons, ["/empezar", "/cursos/ia-desde-cero/modelos-chat-llm", "/cursos/ia-desde-cero/chat-rag-agentes-automatizacion"], "Merge must preserve started state and keep completed lessons started");
assert.deepEqual(merged.activityDays, ["2026-08-15", "2026-08-16"], "Merge must preserve portable activity days");
assert.equal(merged.evidenceItems[0]?.content, newer.evidenceItems[0].content, "Merge must preserve portable evidence");
assert.equal(merged.savedItems[0]?.href, newer.savedItems[0].href, "Merge must preserve saved lessons");
assert.equal(merged.selectedPath?.slug, "sistemas", "Merge must keep the most recently chosen path");

console.log("Progress transfer contract passed: versioning, strict internal routes, chosen paths, size limits, round-trip, and deterministic merge.");
