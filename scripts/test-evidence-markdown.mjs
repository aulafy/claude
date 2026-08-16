import assert from "node:assert/strict";
import { createEvidenceMarkdown } from "../lib/evidence-markdown.ts";

const evidence = [{
  href: "/cursos/ia-desde-cero/pedir-resultados-utiles",
  title: "Resultado [útil]\ncon límites",
  content: "Objetivo: ejemplo ficticio\nCódigo observado: ```json\n{}\n```",
  locale: "es",
  savedAt: "2026-08-16T10:00:00.000Z",
}];

const spanish = createEvidenceMarkdown(evidence, "es", "2026-08-16T12:00:00.000Z");
assert.match(spanish, /^# Mi libreta de evidencias de Aulafy/m);
assert.match(spanish, /## 1\. Resultado \[útil\] con límites/, "Titles must stay on one Markdown heading line");
assert.match(spanish, /\[Resultado \\\[útil\\\] con límites\]/, "Lesson link labels must escape Markdown control characters");
assert.match(spanish, /https:\/\/www\.aulafy\.net\/cursos\/ia-desde-cero\/pedir-resultados-utiles/);
assert.match(spanish, /````\nObjetivo:[\s\S]*\n````/, "The fence must be longer than backtick runs in evidence");
assert.match(spanish, /Revísalo antes de compartirlo/, "The export must carry its privacy warning");

const english = createEvidenceMarkdown(evidence, "en", "2026-08-16T12:00:00.000Z");
assert.match(english, /^# My Aulafy evidence notebook/m);
assert.match(english, /Review it before sharing/);
assert.equal(createEvidenceMarkdown([], "es", "2026-08-16T12:00:00.000Z").includes("Evidencias: 0"), true);

console.log("Evidence Markdown contract passed: bilingual copy, stable links, single-line headings, dynamic fences, and privacy warning.");
