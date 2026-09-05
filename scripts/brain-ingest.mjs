import { ingestCanonicalContent } from "../lib/brain/ingestion.ts";
import { loadContentRegistry } from "../lib/content/registry.ts";

const snapshot = ingestCanonicalContent(loadContentRegistry());
console.log("Aulafy Brain Ingestion Plan");
console.log(`Canonical documents: ${snapshot.documents.length}`);
console.log(`Knowledge documents: ${snapshot.documents.length}`);
console.log(`Knowledge chunks: ${snapshot.chunks.length}`);
console.log(`Input hash: ${snapshot.inputHash}`);
console.log("Writes: 0 (M0.4 contract only; no database or vector store is connected)");
console.log("PASS");
