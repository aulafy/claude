import { loadContentRegistry } from "../lib/content/registry.ts";
import { ingestCanonicalContent } from "../lib/brain/ingestion.ts";
import { createRetriever } from "../lib/brain/retrieval.ts";
import { evaluateRetrieval } from "../lib/brain/evals.ts";

const documents = loadContentRegistry();
const result = evaluateRetrieval(createRetriever(ingestCanonicalContent(documents), documents).retrieve);
console.log("Aulafy Brain Evaluation");
console.log(`Retrieval recall@5: ${(result.recallAt5 * 100).toFixed(0)}%`);
console.log(`Mean reciprocal rank: ${result.meanReciprocalRank.toFixed(2)}`);
for (const item of result.results) console.log(`${item.passed ? "PASS" : "FAIL"} ${item.caseId} -> ${item.retrievedLessonIds.join(", ") || "no hits"}`);
if (result.passed !== result.total) process.exitCode = 1;
