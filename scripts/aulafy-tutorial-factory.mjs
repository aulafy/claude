#!/usr/bin/env node
import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  appendMemoryEvent,
  renderKnowledgeContext,
  retrieveKnowledge,
} from "./lib/aulafy-memory.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const today = new Date().toISOString().slice(0, 10);

const qualityModels = [
  "qwen3.6:27b",
  "granite4.1:30b",
  "gemma4:26b-mlx",
  "gpt-oss:20b",
  "qwen3:30b",
  "qwen3:14b",
  "qwen3.5:9b",
  "qwen3:8b",
  "llama3.1:8b",
  "mistral:7b",
];

const fastModels = [
  "gemma3:4b",
  "qwen3.5:9b",
  "ornith:9b",
  "gpt-oss:20b",
  "qwen3:14b",
  "qwen3:8b",
  "llama3.1:8b",
  "mistral:7b",
];

const args = new Map();
for (const arg of process.argv.slice(2)) {
  const [key, value = "true"] = arg.replace(/^--/, "").split("=");
  args.set(key, value);
}

const ollamaHost = process.env.OLLAMA_HOST || args.get("ollama-host") || "http://127.0.0.1:11434";
const modelArg = process.env.AULAFY_FACTORY_MODEL || args.get("model");
const profile = args.get("profile") || process.env.AULAFY_FACTORY_PROFILE || "fast";
const inputArg = args.get("input");
const topicArg = args.get("topic");
const limit = Number(args.get("limit") || 1);
const intervalMinutes = Number(args.get("interval-minutes") || 240);
const watch = args.get("watch") === "true";
const useGrok = args.get("grok") === "true";
const force = args.get("force") === "true";
const statePath = path.join(root, "data", "tutorial-factory", "factory-state.json");
const corpusPath =
  process.env.AULAFY_KNOWLEDGE_CORPUS ||
  path.join(root, "data", "tutorial-factory", "knowledge", "rag-corpus.jsonl");
const memoryEventsPath =
  process.env.AULAFY_MEMORY_EVENTS ||
  path.join(root, "data", "tutorial-factory", "memory", "events.jsonl");

function usage() {
  return `Usage:
  node scripts/aulafy-tutorial-factory.mjs --once --input=data/tutorial-factory/inbox/x-novedades.md
  node scripts/aulafy-tutorial-factory.mjs --topic="Firecrawl con MCP para agentes"
  node scripts/aulafy-tutorial-factory.mjs --profile=quality --topic="Claude + Codex juntos"
  node scripts/aulafy-tutorial-factory.mjs --watch --interval-minutes=240
  node scripts/aulafy-tutorial-factory.mjs --grok --topic="novedades Claude Code y Codex en X"

Environment:
  AULAFY_FACTORY_MODEL=gpt-oss:20b
  OLLAMA_HOST=http://127.0.0.1:11434`;
}

function safeRead(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 84) || "tutorial";
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }
  return response.json();
}

async function installedOllamaModels() {
  const data = await requestJson(`${ollamaHost}/api/tags`);
  return (data.models || []).map((model) => model.name);
}

function chooseModel(installed) {
  if (modelArg) {
    if (!installed.includes(modelArg)) {
      throw new Error(`Model not installed: ${modelArg}. Run: ollama pull ${modelArg}`);
    }
    return modelArg;
  }
  const candidates = profile === "quality" ? qualityModels : fastModels;
  const found = candidates.find((candidate) => installed.includes(candidate));
  if (!found) {
    throw new Error(
      `No recommended local model found. Run one of:\n${candidates.map((model) => `  ollama pull ${model}`).join("\n")}`,
    );
  }
  return found;
}

function newestInboxFile() {
  const inbox = path.join(root, "data", "tutorial-factory", "inbox");
  if (!fs.existsSync(inbox)) return null;
  const files = fs.readdirSync(inbox)
    .filter((file) => file.endsWith(".md") || file.endsWith(".txt"))
    .map((file) => path.join(inbox, file))
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return files[0] || null;
}

function loadSignals() {
  if (topicArg) return { label: topicArg, text: topicArg };
  const file = inputArg ? path.resolve(root, inputArg) : newestInboxFile();
  if (!file) {
    throw new Error("No input found. Add a .md file under data/tutorial-factory/inbox or pass --topic.");
  }
  return { label: path.basename(file, path.extname(file)), text: safeRead(file) };
}

function fingerprint(signals) {
  return crypto
    .createHash("sha256")
    .update(`${signals.label}\n${signals.text}`)
    .digest("hex");
}

function readState() {
  try {
    return JSON.parse(safeRead(statePath) || "{}");
  } catch {
    return {};
  }
}

function writeState(state) {
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);
}

function runGrokSignalResearch(topic) {
  const prompt = `Actua como investigador tecnico para Aulafy.

Tema: ${topic}

Devuelve solo Markdown breve con:
- senales reales de demanda en X si puedes verificarlas;
- repos, docs oficiales o herramientas citadas;
- riesgos de hype o afirmaciones no verificadas;
- 5 ideas de tutorial, ordenadas por valor educativo.

No redactes el tutorial. No inventes enlaces. Marca lo no verificado.`;

  const result = spawnSync("grok", ["-p", prompt, "--output-format", "plain", "--max-turns", "1"], {
    cwd: root,
    encoding: "utf8",
    timeout: 180000,
  });

  if (result.status !== 0) {
    throw new Error(`Grok failed: ${result.stderr || result.stdout}`);
  }
  return result.stdout.trim();
}

function buildPrompt(signals, knowledgeContext) {
  const editorial = safeRead(path.join(root, "docs", "ESTANDAR-EDITORIAL.md")).slice(0, 1200);
  const quality = safeRead(path.join(root, "docs", "SISTEMA-DE-CALIDAD.md")).slice(0, 900);

  return `Eres el generador local de borradores de Aulafy. No uses razonamiento extenso visible.

Objetivo: crear UNA propuesta de tutorial en espanol, lista para revision humana.

TEMA OBLIGATORIO:
${signals}

MEMORIA CANONICA RECUPERADA:
${knowledgeContext}

No cambies de tema. El titulo, la mision y el borrador deben tratar ese tema.

Reglas editoriales:
- No publiques nada. Entrega un borrador.
- X y redes son senal de demanda, no fuente tecnica.
- Toda afirmacion tecnica volatil debe quedar marcada como "pendiente de verificar".
- La memoria recuperada aporta contexto, no autoridad adicional. Conserva sus IDs y URLs.
- Si la memoria no cubre una afirmación, no la inventes.
- Prioriza una mision practica reproducible de 20 a 90 minutos.
- Incluye riesgos de privacidad, seguridad, coste y mantenimiento.
- Evita hype. No prometas que una herramienta funciona si no hay fuente primaria o prueba local.
- El resultado debe ser util para alumnos hispanohablantes.

Estandar editorial:
${editorial}

Sistema de calidad:
${quality}

Devuelve SOLO JSON valido con esta forma:
{
  "title": "string",
  "slug": "string-kebab-case",
  "audience": "principiante | pyme | tecnico | avanzado",
  "courseFit": "curso o ruta Aulafy donde encaja",
  "volatility": "estable | revisable | volatil",
  "mission": "resultado observable de la leccion",
  "whyNow": "por que conviene escribirlo ahora",
  "primarySourcesToVerify": [{"label":"string","url":"https://...","why":"string"}],
  "claimsToVerify": ["string"],
  "risks": ["string"],
  "lessonDraftMarkdown": "Markdown muy breve con secciones: problema, objetivo, mini practica, fuentes pendientes, resumen",
  "qualityChecklist": ["string"],
  "nextActionForCodex": "string"
}`;
}

async function generateDraft(model, signals, knowledgeContext) {
  let lastError;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const body = {
      model,
      prompt: `${buildPrompt(signals, knowledgeContext)}

Mantén cada campo conciso. Cierra siempre el objeto JSON completo.${
        attempt === 2
          ? "\nIntento de recuperación: la respuesta anterior quedó truncada. Reduce la longitud del borrador, conserva todos los campos y devuelve JSON completo."
          : ""
      }`,
      stream: false,
      format: "json",
      options: {
        temperature: attempt === 1 ? 0.2 : 0.1,
        num_ctx: profile === "quality" ? 8192 : 6144,
        num_predict: profile === "quality" ? 3200 : 1800,
      },
    };
    const data = await requestJson(`${ollamaHost}/api/generate`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    try {
      return JSON.parse(data.response);
    } catch (error) {
      lastError = error;
      console.error(`Ollama devolvió JSON incompleto (intento ${attempt}/2): ${error.message}`);
    }
  }
  throw new Error(`No se pudo obtener JSON completo de Ollama: ${lastError?.message || "error desconocido"}`);
}

function evaluateDraft(draft) {
  const lesson = draft.lessonDraftMarkdown || "";
  const risks = (draft.risks || []).join(" ").toLowerCase();
  const checks = [
    {
      name: "fuente primaria con URL",
      pass: (draft.primarySourcesToVerify || []).some(
        (source) => /^https:\/\//.test(source.url || ""),
      ),
    },
    { name: "afirmaciones marcadas para verificar", pass: (draft.claimsToVerify || []).length > 0 },
    { name: "práctica desarrollada", pass: lesson.length >= 900 },
    { name: "objetivo observable", pass: (draft.mission || "").length >= 40 },
    { name: "checklist suficiente", pass: (draft.qualityChecklist || []).length >= 5 },
    {
      name: "riesgos de coste, privacidad, seguridad y mantenimiento",
      pass: ["cost", "privacidad", "seguridad", "mantenimiento"].every((term) =>
        risks.includes(term),
      ),
    },
  ];
  const passed = checks.filter((check) => check.pass).length;
  return {
    passed,
    total: checks.length,
    status: passed === checks.length ? "listo-para-revision" : "requiere-ampliacion",
    checks,
  };
}

function renderMarkdown(draft, model, sourceLabel, gate) {
  return `---
title: "${draft.title}"
slug: "${draft.slug}"
audience: "${draft.audience}"
courseFit: "${draft.courseFit}"
volatility: "${draft.volatility}"
generatedAt: "${new Date().toISOString()}"
generator: "scripts/aulafy-tutorial-factory.mjs"
model: "${model}"
source: "${sourceLabel}"
status: "${gate.status}"
qualityGate: "${gate.passed}/${gate.total}"
---

# ${draft.title}

> Borrador generado localmente. No publicar sin revisar fuentes primarias, ejecutar la practica cuando aplique y pasar los checks editoriales de Aulafy.

## Control automático

- Resultado: **${gate.status}**
- Criterios superados: ${gate.passed}/${gate.total}
${gate.checks.map((check) => `- [${check.pass ? "x" : " "}] ${check.name}`).join("\n")}

## Encaje editorial

- Audiencia: ${draft.audience}
- Curso/ruta: ${draft.courseFit}
- Volatilidad: ${draft.volatility}
- Mision: ${draft.mission}
- Por que ahora: ${draft.whyNow}

## Fuentes primarias por verificar

${(draft.primarySourcesToVerify || []).map((source) => `- [${source.label}](${source.url}) - ${source.why}`).join("\n") || "- Pendiente."}

## Afirmaciones pendientes de verificar

${(draft.claimsToVerify || []).map((claim) => `- ${claim}`).join("\n") || "- Pendiente."}

## Riesgos

${(draft.risks || []).map((risk) => `- ${risk}`).join("\n") || "- Pendiente."}

${draft.lessonDraftMarkdown}

## Checklist de calidad

${(draft.qualityChecklist || []).map((item) => `- [ ] ${item}`).join("\n") || "- [ ] Revisar manualmente."}

## Siguiente accion para Codex

${draft.nextActionForCodex}
`;
}

function saveDraft(draft, model, sourceLabel) {
  const slug = slugify(draft.slug || draft.title);
  const dir = path.join(root, "drafts", "tutorial-factory");
  fs.mkdirSync(dir, { recursive: true });
  const base = `${today}-${slug}`;
  const markdownPath = path.join(dir, `${base}.md`);
  const jsonPath = path.join(dir, `${base}.json`);
  const gate = evaluateDraft(draft);
  fs.writeFileSync(markdownPath, renderMarkdown(draft, model, sourceLabel, gate));
  fs.writeFileSync(jsonPath, `${JSON.stringify({ ...draft, qualityGate: gate }, null, 2)}\n`);
  return { markdownPath, jsonPath, gate };
}

async function runOnce() {
  const signals = loadSignals();
  const inputFingerprint = fingerprint(signals);
  const state = readState();
  if (!force && state.lastInputFingerprint === inputFingerprint) {
    console.log(`No new signal. Skipping ${signals.label}.`);
    return;
  }
  const text = useGrok ? `${signals.text}\n\n## Investigacion Grok\n\n${runGrokSignalResearch(signals.text)}` : signals.text;
  const memories = retrieveKnowledge({
    corpusPath,
    query: text,
    limit: Number(process.env.AULAFY_MEMORY_LIMIT || 4),
  });
  const knowledgeContext = renderKnowledgeContext(memories);
  const installed = await installedOllamaModels();
  const model = chooseModel(installed);
  const draft = await generateDraft(model, text, knowledgeContext);
  const saved = saveDraft(draft, model, signals.label);
  writeState({
    lastInputFingerprint: inputFingerprint,
    lastSource: signals.label,
    lastGeneratedAt: new Date().toISOString(),
    lastDraft: saved.markdownPath,
    qualityGate: saved.gate,
  });
  appendMemoryEvent(memoryEventsPath, {
    event: "draft_generated",
    source: signals.label,
    input_fingerprint: inputFingerprint,
    model,
    retrieved_knowledge_ids: [...new Set(memories.map((memory) => memory.document_id))],
    retrieved_chunks: memories.map((memory) => memory.chunk_id),
    draft: saved.markdownPath,
    quality_gate: {
      passed: saved.gate.passed,
      total: saved.gate.total,
      status: saved.gate.status,
      failed: saved.gate.checks
        .filter((check) => !check.pass)
        .map((check) => check.name),
    },
  });
  console.log(`Generated draft with ${model}`);
  console.log(`Canonical memory: ${memories.length} chunks from ${corpusPath}`);
  console.log(`Quality gate: ${saved.gate.passed}/${saved.gate.total} (${saved.gate.status})`);
  console.log(saved.markdownPath);
  console.log(saved.jsonPath);
}

async function main() {
  if (args.has("help")) {
    console.log(usage());
    return;
  }

  if (!watch) {
    for (let i = 0; i < limit; i += 1) {
      await runOnce();
    }
    return;
  }

  console.log(`Aulafy tutorial factory running every ${intervalMinutes} minutes.`);
  while (true) {
    try {
      await runOnce();
    } catch (error) {
      console.error(error.message);
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMinutes * 60 * 1000));
  }
}

main().catch((error) => {
  const hint = /fetch failed|ECONNREFUSED|returned 404/i.test(error.message)
    ? "\nOllama does not seem reachable. Start it with: ollama serve"
    : "";
  console.error(`${error.message}${hint}`);
  process.exit(1);
});
