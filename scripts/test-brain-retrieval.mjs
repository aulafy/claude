import assert from "node:assert/strict";
import { loadContentRegistry } from "../lib/content/registry.ts";
import { ingestCanonicalContent } from "../lib/brain/ingestion.ts";
import { createRetriever } from "../lib/brain/retrieval.ts";

const documents = loadContentRegistry();
const retriever = createRetriever(ingestCanonicalContent(documents), documents);
const ollama = retriever.retrieve("How do I inspect an Ollama context window?");
assert.ok(ollama.hits.length > 0);
assert.equal(ollama.hits[0].lessonId, "ollama-context-window");
assert.ok(ollama.hits[0].provenance.sourcePath.endsWith("lesson.mdx"));
assert.ok(ollama.concepts.includes("context-window"));
assert.deepEqual(retriever.retrieve("Ollama context window"), retriever.retrieve("Ollama context window"));
assert.equal(retriever.retrieve("moon landing on mars").hits.length, 0);
assert.equal(retriever.retrieve("").hits.length, 0);
assert.equal(retriever.retrieve("Ollama", 1).hits.length, 1);
console.log("Brain retrieval tests passed: ranking, provenance, concepts, determinism, empty and unsupported queries.");
