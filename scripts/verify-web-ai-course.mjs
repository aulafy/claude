import assert from "node:assert/strict";
import fs from "node:fs";
import { getCurso } from "../lib/cursos.ts";
import {
  WEB_AI_SOURCE_FILE,
  getWebAiLesson,
  webAiLessons,
} from "../lib/web-ai-course-content.ts";

const course = getCurso("crear-webs-con-ia");
assert.ok(course, "The web with AI course must be registered");
assert.equal(webAiLessons.length, 46, "The course must publish exactly 46 lessons");
assert.equal(new Set(webAiLessons.map((lesson) => lesson.slug)).size, 46, "Lesson slugs must be unique");
assert.equal(
  course.secciones.flatMap((section) => section.lecciones).length,
  webAiLessons.length,
  "Registry and content must expose the same number of lessons",
);

const registryLessons = course.secciones.flatMap((section) => section.lecciones);
for (const lesson of webAiLessons) {
  const parsed = getWebAiLesson(lesson.slug);
  const registered = registryLessons.find((item) => item.slug === lesson.slug);
  assert.ok(parsed, `Missing Markdown lesson: ${lesson.slug}`);
  assert.ok(registered, `Missing registered lesson: ${lesson.slug}`);
  assert.equal(registered.title, lesson.title, `Title mismatch: ${lesson.slug}`);
  assert.ok(parsed.markdown.length >= 900, `Lesson is too short: ${lesson.slug}`);
  assert.match(parsed.markdown, /### (Resultado visible|Encargo|Entregable)/, `Missing result: ${lesson.slug}`);
  assert.match(parsed.markdown, /```text/, `Missing practical prompt: ${lesson.slug}`);
  assert.match(parsed.markdown, /### Fuentes/, `Missing official sources: ${lesson.slug}`);
}

const source = fs.readFileSync(WEB_AI_SOURCE_FILE, "utf8");
assert.ok(source.length >= 60_000, "The complete editable source is missing or truncated");
assert.match(source, /# Recursos comunes/, "Shared resources are missing");
assert.match(source, /No publiques ni hagas acciones externas/, "The universal review prompt is missing");
assert.equal(webAiLessons.filter((lesson) => lesson.kind === "lab").length, 10, "The course must include 10 reproducible labs");
assert.ok(
  fs.existsSync("public/recursos/crear-webs-con-ia/plantilla-informe-laboratorio.md"),
  "The downloadable lab report template is missing",
);
assert.ok(
  fs.existsSync("public/recursos/crear-webs-con-ia/plantilla-ficha-web-seria.md"),
  "The first lesson problem-card template is missing",
);
assert.ok(
  fs.existsSync("public/recursos/crear-webs-con-ia/plantilla-alcance-web-v1.md"),
  "The second lesson scope template is missing",
);

const firstLesson = getWebAiLesson("una-web-seria");
assert.ok(firstLesson, "The first lesson must exist");
assert.ok(firstLesson.markdown.length >= 8_000, "The first lesson must be a complete guided lesson");
assert.match(firstLesson.markdown, /### Método paso a paso/, "The first lesson needs a guided method");
assert.match(firstLesson.markdown, /### Rúbrica de salida/, "The first lesson needs an exit rubric");
assert.doesNotMatch(firstLesson.markdown, /Publica en Aulafy Comunidad/, "The course must not depend on the postponed community");

const secondLesson = getWebAiLesson("elegir-tipo-web");
assert.ok(secondLesson, "The second lesson must exist");
assert.ok(secondLesson.markdown.length >= 8_000, "The second lesson must be a complete guided lesson");
assert.match(secondLesson.markdown, /### Árbol de decisión/, "The second lesson needs a decision tree");
assert.match(secondLesson.markdown, /### Rúbrica de salida/, "The second lesson needs an exit rubric");
assert.match(secondLesson.markdown, /### Autoevaluación/, "The second lesson needs self-assessment");

console.log(`Verified ${webAiLessons.length} web-with-AI lessons and their editable source.`);
