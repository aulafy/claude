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

console.log("✓ Evaluador editorial: casos suficiente, débil y solo social validados.");
