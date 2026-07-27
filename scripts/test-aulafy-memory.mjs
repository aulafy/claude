#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  appendMemoryEvent,
  renderKnowledgeContext,
  retrieveKnowledge,
} from "./lib/aulafy-memory.mjs";

const temporaryDirectory = fs.mkdtempSync(
  path.join(os.tmpdir(), "aulafy-memory-test-"),
);

try {
  const corpusPath = path.join(temporaryDirectory, "corpus.jsonl");
  const eventsPath = path.join(temporaryDirectory, "events.jsonl");
  const records = [
    {
      chunk_id: "concepto-rag::explicacion::01",
      document_id: "concepto-rag",
      title: "Generación aumentada por recuperación",
      section: "Explicación",
      text: "RAG recupera conocimiento verificable antes de responder.",
      tags: ["rag"],
      status: "verificado",
      verified_at: "2026-07-27",
      review_after: "2099-01-01",
      document_url: "https://example.test/rag",
      source_urls: ["https://example.test/source"],
    },
    {
      chunk_id: "concepto-vencido::explicacion::01",
      document_id: "concepto-vencido",
      title: "RAG antiguo",
      section: "Explicación",
      text: "Este fragmento de RAG está vencido.",
      tags: ["rag"],
      status: "verificado",
      verified_at: "2020-01-01",
      review_after: "2020-02-01",
      document_url: "https://example.test/old",
      source_urls: [],
    },
  ];
  fs.writeFileSync(
    corpusPath,
    `${records.map((record) => JSON.stringify(record)).join("\n")}\n`,
  );

  const result = retrieveKnowledge({
    corpusPath,
    query: "tutorial práctico de RAG",
    limit: 4,
  });
  assert.equal(result.length, 1);
  assert.equal(result[0].document_id, "concepto-rag");
  assert.match(renderKnowledgeContext(result), /concepto-rag/);

  appendMemoryEvent(eventsPath, {
    event: "test",
    retrieved_knowledge_ids: ["concepto-rag"],
  });
  const event = JSON.parse(fs.readFileSync(eventsPath, "utf8").trim());
  assert.equal(event.schema_version, 1);
  assert.equal(event.event, "test");

  console.log(
    "✓ Memoria editorial: recuperación, caducidad y diario validados.",
  );
} finally {
  fs.rmSync(temporaryDirectory, { recursive: true, force: true });
}
