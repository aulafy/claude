import assert from "node:assert/strict";
import { ingestCanonicalContent, diffIngestionSnapshots, toKnowledgeChunks } from "../lib/brain/ingestion.ts";
import { loadContentRegistry } from "../lib/content/registry.ts";

const documents = loadContentRegistry();
const first = ingestCanonicalContent(documents);
const second = ingestCanonicalContent([...documents].reverse());
assert.deepEqual(first, second, "ingestion must be deterministic regardless of input order");
assert.equal(first.documents.length, documents.length);
assert.ok(first.chunks.length >= documents.length);
assert.equal(diffIngestionSnapshots(first, second).newDocuments.length, 0);
assert.equal(diffIngestionSnapshots(first, second).changedDocuments.length, 0);
const changed = { ...documents[0], body: `${documents[0].body}\nChanged`, contentHash: "changed-hash" };
const changedSnapshot = ingestCanonicalContent([changed, ...documents.slice(1)]);
assert.deepEqual(diffIngestionSnapshots(first, changedSnapshot).changedDocuments, [documents[0].id]);
assert.ok(toKnowledgeChunks(documents.find((document) => document.id === "ollama-context-window")).every((chunk) => chunk.sourcePath.endsWith("lesson.mdx")));
console.log("Brain ingestion tests passed: provenance, chunks, hashes, idempotency and change detection.");
