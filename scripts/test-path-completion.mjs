import assert from "node:assert/strict";
import { createPathCompletionMarkdown, isSevenDayPathComplete } from "../lib/path-completion.ts";
import { sevenDayPath } from "../lib/seven-day-path.ts";

const progress = {
  href: "/mi-ruta", title: "Ruta", courseTitle: "Aulafy", locale: "es", visitedAt: "2026-08-16T10:00:00.000Z",
  startedLessons: sevenDayPath.es.map((item) => item.href), completedLessons: sevenDayPath.es.map((item) => item.href),
  activityDays: ["2026-08-10", "2026-08-16"], evidenceItems: [], savedItems: [],
};

assert.equal(isSevenDayPathComplete(progress, "es"), true);
assert.equal(isSevenDayPathComplete({ ...progress, completedLessons: progress.completedLessons.slice(0, 6) }, "es"), false);
assert.equal(isSevenDayPathComplete(progress, "en"), false, "Locale-specific routes must not share completion state accidentally");
assert.throws(() => createPathCompletionMarkdown({ ...progress, completedLessons: [] }, "es"), /not complete/);

const markdown = createPathCompletionMarkdown(progress, "es", "2026-08-16T12:00:00.000Z");
assert.match(markdown, /^# Mi ruta de 7 días completada en Aulafy/m);
assert.equal((markdown.match(/^- \[x\]/gm) ?? []).length, 7);
assert.match(markdown, /no una acreditación académica ni una verificación de identidad/);
assert.match(markdown, /Evidencias guardadas localmente: 0/);
assert.match(markdown, /Próxima revisión/);

const englishProgress = { ...progress, locale: "en", startedLessons: sevenDayPath.en.map((item) => item.href), completedLessons: sevenDayPath.en.map((item) => item.href) };
assert.match(createPathCompletionMarkdown(englishProgress, "en", "2026-08-16T12:00:00.000Z"), /^# My completed 7-day Aulafy path/m);

console.log("Path completion contract passed: seven locale-specific missions, blocked incomplete export, local summary, disclaimer, and next review.");
