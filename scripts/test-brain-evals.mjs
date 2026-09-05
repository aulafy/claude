import assert from "node:assert/strict";
import { loadContentRegistry } from "../lib/content/registry.ts";
import { ingestCanonicalContent } from "../lib/brain/ingestion.ts";
import { createRetriever } from "../lib/brain/retrieval.ts";
import { answerWithAulafyTutor } from "../lib/brain/tutor.ts";
import { evaluateRetrieval, evaluateTutorGrounding } from "../lib/brain/evals.ts";

const documents = loadContentRegistry();
const retrieval = createRetriever(ingestCanonicalContent(documents), documents);
const evalResult = evaluateRetrieval(retrieval.retrieve);
assert.equal(evalResult.recallAt5, 1);
assert.equal(evalResult.passed, evalResult.total);
const context = retrieval.retrieve("Ollama context window");
const tutor = await answerWithAulafyTutor("What is the context window?", context);
assert.equal(evaluateTutorGrounding(tutor, context).passed, true);
const unsupported = retrieval.retrieve("unsupported topic");
const abstained = await answerWithAulafyTutor("Unsupported topic", unsupported);
assert.equal(evaluateTutorGrounding(abstained, unsupported).passed, true);
console.log("Brain eval tests passed: retrieval recall, ranking and tutor provenance/abstention.");
