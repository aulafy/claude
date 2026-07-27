#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const today = new Date().toISOString().slice(0, 10);

const args = new Map();
for (const arg of process.argv.slice(2)) {
  const [key, value = "true"] = arg.replace(/^--/, "").split("=");
  args.set(key, value);
}

const topic =
  args.get("topic") ||
  "novedades, dudas y herramientas de inteligencia artificial útiles para alumnos hispanohablantes de Aulafy";
const intervalMinutes = Number(args.get("interval-minutes") || 360);
const watch = args.get("watch") === "true";
const dryRun = args.get("dry-run") === "true";
const maxSignals = Number(args.get("max-signals") || 8);
const maxTurns = Number(args.get("max-turns") || 8);
const grokModel = args.get("model") || process.env.AULAFY_GROK_MODEL || "";
const allowSubagents = args.get("subagents") === "true";
const mode = args.get("mode") || "fast";
const grokBinary =
  process.env.AULAFY_GROK_BIN ||
  (process.env.HOME
    ? path.join(process.env.HOME, ".grok", "bin", "grok")
    : "grok");

const signalSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "generatedAt",
    "topic",
    "summary",
    "signals",
    "rejected",
    "recommendedNextStep",
  ],
  properties: {
    generatedAt: { type: "string" },
    topic: { type: "string" },
    summary: { type: "string" },
    signals: {
      type: "array",
      maxItems: maxSignals,
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "title",
          "whyItMatters",
          "audience",
          "level",
          "sourceType",
          "primarySourceUrl",
          "socialEvidenceUrl",
          "verificationStatus",
          "tutorialIdea",
          "risks",
          "aulafyFit",
        ],
        properties: {
          title: { type: "string" },
          whyItMatters: { type: "string" },
          audience: { type: "string" },
          level: { type: "string" },
          sourceType: { type: "string" },
          primarySourceUrl: { type: "string" },
          socialEvidenceUrl: { type: "string" },
          verificationStatus: { type: "string" },
          tutorialIdea: { type: "string" },
          risks: { type: "array", items: { type: "string" } },
          aulafyFit: { type: "string" },
        },
      },
    },
    rejected: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["item", "reason"],
        properties: {
          item: { type: "string" },
          reason: { type: "string" },
        },
      },
    },
    recommendedNextStep: { type: "string" },
  },
};

function usage() {
  return `Usage:
  npm run radar:grok -- --topic="IA para pymes en español"
  npm run radar:grok -- --mode=deep --topic="IA para pymes en X en español" --max-turns=12
  npm run radar:grok -- --topic="Claude Code, Codex, MCP y skills" --max-signals=6
  npm run radar:grok -- --topic="modelos locales para pymes" --max-turns=5
  npm run radar:grok -- --topic="preguntas de IA en X" --subagents=true
  npm run radar:grok -- --dry-run
  npm run radar:grok:watch

Environment:
  AULAFY_GROK_MODEL=<optional-grok-model>`;
}

function slugify(text) {
  return (
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 70) || "radar"
  );
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function runGrok() {
  const prompt = `Actua como investigador curricular y tecnico para Aulafy.

Tema: ${topic}

${
  mode === "deep"
    ? "Busca senales recientes y verificables, preferentemente en espanol, sobre necesidades reales de aprendizaje en IA."
    : "No navegues ni uses herramientas externas. Clasifica el tema con tu conocimiento disponible y marca todo como pendiente si no puedes verificarlo ahora."
}

Prioriza:
- IA para pymes y oficinas;
- estudiantes y principiantes;
- Codex, Claude Code, Grok, agentes, MCP, skills, RAG, modelos locales y automatizacion;
- herramientas con documentacion oficial, repositorio, paper, model card o pagina primaria.

Reglas:
- No inventes enlaces, cifras, fechas ni popularidad.
- X/Reddit sirven como senal de demanda, no como prueba tecnica.
- Si no tienes fuente primaria, marca el campo como "pendiente".
- Rechaza hype, listas genericas y demos sin codigo/documentacion.
- Devuelve temas convertibles en tutoriales practicos de 15-60 minutos.
- Incluye riesgos de coste, privacidad, seguridad, licencia y mantenimiento.

Devuelve JSON valido segun el schema.`;

  const commandArgs = [
    "-p",
    prompt,
    "--output-format",
    "json",
    "--json-schema",
    JSON.stringify(signalSchema),
    "--max-turns",
    String(maxTurns),
  ];
  if (mode !== "deep") {
    commandArgs.push("--disable-web-search");
  }
  if (!allowSubagents) {
    commandArgs.push("--no-subagents");
  }
  if (grokModel) {
    commandArgs.push("--model", grokModel);
  }

  const result = spawnSync(grokBinary, commandArgs, {
    cwd: root,
    encoding: "utf8",
    timeout: 240000,
  });

  if (result.error) {
    throw new Error(
      `No se pudo ejecutar Grok en ${grokBinary}: ${result.error.message}`,
    );
  }
  if (result.status !== 0) {
    const detail = (
      result.stderr ||
      result.stdout ||
      "sin salida del proceso"
    ).trim();
    const signal = result.signal ? `; señal ${result.signal}` : "";
    throw new Error(
      `Grok terminó con código ${result.status}${signal}: ${detail}`,
    );
  }

  return parseGrokJson(result.stdout);
}

function parseGrokJson(stdout) {
  const parsed = JSON.parse(stdout);
  if (parsed && typeof parsed === "object" && parsed.structuredOutput) {
    return parsed.structuredOutput;
  }
  if (parsed && typeof parsed === "object" && typeof parsed.text === "string") {
    return JSON.parse(parsed.text);
  }
  return parsed;
}

function dryRunSignals() {
  return {
    generatedAt: new Date().toISOString(),
    topic,
    summary:
      "Ejecucion de prueba sin llamar a Grok. Sirve para validar escritura, formato y deduplicacion.",
    signals: [
      {
        title: "Ejemplo: IA para pymes sin exponer datos sensibles",
        whyItMatters:
          "Muchas pymes quieren empezar barato, pero necesitan controlar privacidad, coste y errores.",
        audience: "pyme",
        level: "principiante",
        sourceType: "dry-run",
        primarySourceUrl: "pendiente",
        socialEvidenceUrl: "pendiente",
        verificationStatus: "no verificado; ejemplo local",
        tutorialIdea:
          "Crear un diagnóstico simple de procesos antes de automatizar con IA.",
        risks: [
          "privacidad",
          "coste variable",
          "automatizar decisiones sin revisión humana",
        ],
        aulafyFit: "Modulo 1 o ruta PYMES",
      },
    ],
    rejected: [
      {
        item: "Ejemplo de hype sin fuente",
        reason: "No tiene repo, documentación ni práctica reproducible.",
      },
    ],
    recommendedNextStep:
      "Sustituir dry-run por una consulta real a Grok y pasar las señales al generador local.",
  };
}

function renderMarkdown(report, signature) {
  const rows = report.signals
    .map(
      (signal, index) => `### ${index + 1}. ${signal.title}

- Audiencia: ${signal.audience}
- Nivel: ${signal.level}
- Encaje Aulafy: ${signal.aulafyFit}
- Tipo de fuente: ${signal.sourceType}
- Fuente primaria: ${signal.primarySourceUrl}
- Evidencia social: ${signal.socialEvidenceUrl}
- Estado: ${signal.verificationStatus}
- Por qué importa: ${signal.whyItMatters}
- Tutorial propuesto: ${signal.tutorialIdea}
- Riesgos: ${signal.risks.join(", ") || "pendiente"}
`,
    )
    .join("\n");

  const rejected = report.rejected
    .map((item) => `- ${item.item}: ${item.reason}`)
    .join("\n");

  return `# Radar Grok/X para Aulafy

Fecha: ${report.generatedAt}
Tema: ${report.topic}
Firma: ${signature}
Estado: señal editorial; no publicar sin verificación

## Resumen

${report.summary}

## Señales candidatas

${rows || "Sin señales candidatas."}

## Rechazado o aplazado

${rejected || "- Nada rechazado en esta ejecución."}

## Siguiente paso recomendado

${report.recommendedNextStep}

## Recordatorio editorial

Las señales sociales ayudan a entender demanda real. Las fuentes técnicas deben venir de documentación oficial, repositorios, model cards, papers o pruebas locales reproducibles.
`;
}

function saveReport(report) {
  const baseDir = path.join(root, "data", "tutorial-factory");
  const signalsDir = path.join(baseDir, "signals");
  const inboxDir = path.join(baseDir, "inbox");
  const indexPath = path.join(baseDir, "radar-index.json");
  ensureDir(signalsDir);
  ensureDir(inboxDir);

  const canonical = JSON.stringify({
    topic: report.topic,
    titles: report.signals.map((signal) => signal.title.toLowerCase()).sort(),
    primarySources: report.signals
      .map((signal) => signal.primarySourceUrl)
      .sort(),
  });
  const signature = sha256(canonical).slice(0, 16);
  const existing = fs.existsSync(indexPath)
    ? JSON.parse(fs.readFileSync(indexPath, "utf8"))
    : {};
  if (existing[signature]) {
    return { duplicate: true, signature, ...existing[signature] };
  }

  const base = `${today}-${slugify(report.topic)}-${signature}`;
  const jsonPath = path.join(signalsDir, `${base}.json`);
  const markdownPath = path.join(signalsDir, `${base}.md`);
  const inboxPath = path.join(inboxDir, `${base}.md`);

  fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(markdownPath, renderMarkdown(report, signature));
  fs.writeFileSync(inboxPath, renderMarkdown(report, signature));

  existing[signature] = {
    createdAt: new Date().toISOString(),
    topic: report.topic,
    jsonPath: path.relative(root, jsonPath),
    markdownPath: path.relative(root, markdownPath),
    inboxPath: path.relative(root, inboxPath),
  };
  fs.writeFileSync(indexPath, `${JSON.stringify(existing, null, 2)}\n`);

  return { duplicate: false, signature, jsonPath, markdownPath, inboxPath };
}

function runOnce() {
  const report = dryRun ? dryRunSignals() : runGrok();
  const saved = saveReport(report);
  if (saved.duplicate) {
    console.log(`Duplicate radar signal ignored: ${saved.signature}`);
    console.log(saved.inboxPath);
    return;
  }
  console.log(`Saved Grok radar signal: ${saved.signature}`);
  console.log(saved.markdownPath);
  console.log(saved.inboxPath);
}

async function main() {
  if (args.has("help")) {
    console.log(usage());
    return;
  }

  if (!watch) {
    runOnce();
    return;
  }

  console.log(`Aulafy Grok radar running every ${intervalMinutes} minutes.`);
  while (true) {
    try {
      runOnce();
    } catch (error) {
      console.error(error.message);
    }
    await new Promise((resolve) =>
      setTimeout(resolve, intervalMinutes * 60 * 1000),
    );
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
