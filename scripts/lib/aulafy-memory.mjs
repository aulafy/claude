import fs from "node:fs";
import path from "node:path";

const DEFAULT_LIMIT = 4;

function normalize(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function terms(value) {
  return new Set(
    normalize(value)
      .split(" ")
      .filter((term) => term.length >= 3),
  );
}

function readJsonLines(file) {
  if (!fs.existsSync(file)) return [];
  return fs
    .readFileSync(file, "utf8")
    .split("\n")
    .filter(Boolean)
    .flatMap((line) => {
      try {
        return [JSON.parse(line)];
      } catch {
        return [];
      }
    });
}

export function retrieveKnowledge({ corpusPath, query, limit = DEFAULT_LIMIT }) {
  const today = new Date().toISOString().slice(0, 10);
  const records = readJsonLines(corpusPath).filter(
    (record) =>
      ["estable", "verificado"].includes(record.status) &&
      (!record.review_after || record.review_after >= today),
  );
  const queryTerms = terms(query);
  if (records.length === 0 || queryTerms.size === 0) return [];

  const documentFrequency = new Map();
  const indexed = records.map((record) => {
    const searchable = terms(
      `${record.title} ${record.section} ${(record.tags || []).join(" ")} ${record.text}`,
    );
    for (const term of searchable) {
      documentFrequency.set(term, (documentFrequency.get(term) || 0) + 1);
    }
    return { record, searchable };
  });

  return indexed
    .map(({ record, searchable }) => {
      let score = 0;
      for (const term of queryTerms) {
        if (!searchable.has(term)) continue;
        const frequency = documentFrequency.get(term) || 1;
        score += Math.log(1 + records.length / frequency);
        if (normalize(record.title).includes(term)) score += 1.5;
        if ((record.tags || []).includes(term)) score += 1;
      }
      return { ...record, memory_score: Number(score.toFixed(4)) };
    })
    .filter((record) => record.memory_score > 0)
    .sort(
      (left, right) =>
        right.memory_score - left.memory_score ||
        left.chunk_id.localeCompare(right.chunk_id, "es"),
    )
    .slice(0, limit);
}

export function renderKnowledgeContext(records) {
  if (records.length === 0) {
    return "No se recuperó conocimiento canónico relacionado. No rellenes el vacío de memoria: marca las afirmaciones como pendientes.";
  }

  return records
    .map(
      (record, index) => `### Memoria ${index + 1}
ID: ${record.document_id}
Fragmento: ${record.chunk_id}
Estado: ${record.status}
Verificado: ${record.verified_at || "sin fecha"}
Revisar después de: ${record.review_after}
Fuente canónica: ${record.document_url}
Fuentes primarias: ${(record.source_urls || []).join(", ") || "sin fuentes"}

${record.text}`,
    )
    .join("\n\n");
}

export function appendMemoryEvent(file, event) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.appendFileSync(
    file,
    `${JSON.stringify({
      schema_version: 1,
      recorded_at: new Date().toISOString(),
      ...event,
    })}\n`,
  );
}
