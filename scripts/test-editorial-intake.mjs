#!/usr/bin/env node
import assert from "node:assert/strict";
import {
  buildGitHubTutorialIssueUrl,
  evaluateEditorialIntake,
} from "../lib/editorial-intake.ts";

const strong = evaluateEditorialIntake({
  title: "Evaluar un sistema RAG con documentación oficial",
  content:
    "La documentación describe una API, un repositorio con código, comandos de instalación y una prueba reproducible. También advierte del coste, la privacidad de los datos, la seguridad y la licencia. ".repeat(5),
  links: [
    "https://github.com/aulafy/taller",
    "https://docs.ollama.com/",
  ],
  audience: "tecnico",
  intent: "actualizar",
  existingPath: "/cursos/rag-seguro/evals-metricas",
  desiredOutcome:
    "El alumno ejecutará una evaluación, comparará sus métricas y conservará una evidencia verificable del resultado.",
});
assert.equal(strong.verdict, "suficiente");
assert.equal(strong.recommendation, "actualizar");
const issueUrl = buildGitHubTutorialIssueUrl(
  {
    title: "Avisar a @equipo <!-- prueba -->",
    content: "Necesitamos un tutorial verificable sin notificar a @usuario.",
    links: ["https://github.com/aulafy/taller"],
    audience: "tecnico",
    intent: "actualizar",
    existingPath: "/cursos/rag-seguro/evals-metricas",
    desiredOutcome: "El alumno ejecutará una evaluación reproducible.",
  },
  strong,
);
const parsedIssueUrl = new URL(issueUrl);
assert.equal(parsedIssueUrl.hostname, "github.com");
assert.equal(parsedIssueUrl.pathname, "/aulafy/claude/issues/new");
assert.equal(
  parsedIssueUrl.searchParams.get("labels"),
  "enhancement,documentation",
);
assert.match(parsedIssueUrl.searchParams.get("title"), /@\u200bequipo/);
assert.doesNotMatch(parsedIssueUrl.searchParams.get("body"), /@usuario/);

const weak = evaluateEditorialIntake({
  title: "Una IA nueva",
  content: "Grok dice que esta herramienta es increíble.",
  links: ["javascript:alert(1)", "no-es-un-enlace"],
  audience: "principiante",
  intent: "auto",
  desiredOutcome: "Conocer la herramienta.",
});
assert.equal(weak.verdict, "insuficiente");
assert.equal(weak.validLinks.length, 0);

const socialOnly = evaluateEditorialIntake({
  title: "Dudas vistas en una red social",
  content:
    "Muchas personas preguntan cómo configurar un modelo y qué coste tiene, pero todavía no tenemos documentación del proveedor. ".repeat(4),
  links: ["https://x.com/example/status/1"],
  audience: "principiante",
  intent: "crear",
  desiredOutcome:
    "El alumno configurará un modelo mediante una práctica que todavía debe verificarse.",
});
assert.notEqual(socialOnly.verdict, "suficiente");
assert.equal(socialOnly.primaryLinks.length, 0);

const hostileLinks = Array.from(
  { length: 30 },
  (_, index) =>
    `https://github.com/aulafy/prueba-${index}?dato=${"x".repeat(1_500)}`,
);
const hostile = evaluateEditorialIntake({
  title: "Petición con entrada hostil\u0000 <!-- oculta --> @equipo",
  content:
    `${"# Encabezado inyectado\n@equipo\n<!-- comentario -->\u0007"}`.repeat(300),
  links: hostileLinks,
  audience: "tecnico",
  intent: "crear",
  desiredOutcome:
    "El alumno podrá comprobar que una entrada pública no ejecuta código ni genera menciones involuntarias.",
});
const hostileIssueUrl = buildGitHubTutorialIssueUrl(
  {
    title: "Petición con entrada hostil\u0000 <!-- oculta --> @equipo",
    content:
      `${"# Encabezado inyectado\n@equipo\n<!-- comentario -->\u0007"}`.repeat(300),
    links: hostileLinks,
    audience: "tecnico",
    intent: "crear",
    desiredOutcome:
      "El alumno podrá comprobar que una entrada pública no ejecuta código ni genera menciones involuntarias.",
  },
  hostile,
);
const hostileParsed = new URL(hostileIssueUrl);
const hostileTitle = hostileParsed.searchParams.get("title");
const hostileBody = hostileParsed.searchParams.get("body");
assert.doesNotMatch(hostileTitle, /[\u0000\u0007]/);
assert.doesNotMatch(hostileBody, /<!--|@equipo|[\u0000\u0007]/);
assert.match(hostileBody, /20 enlace\(s\) adicional\(es\) omitido\(s\)/);
assert.ok(hostileIssueUrl.length < 30_000);

console.log("✓ Evaluador editorial: casos suficiente, débil y solo social validados.");
