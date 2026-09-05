import assert from "node:assert/strict";
import { buildCurriculumGraph, conceptRelations, validateCurriculumGraph } from "../lib/curriculum/graph.ts";
import { loadContentRegistry } from "../lib/content/registry.ts";

const documents = loadContentRegistry();
const graph = buildCurriculumGraph(documents);
assert.equal(validateCurriculumGraph(graph).length, 0);
assert.ok(graph.documents.some((document) => document.id === "ollama-context-window"));
assert.ok(conceptRelations.some((relation) => relation.type === "REQUIRES"));
const cyclic = buildCurriculumGraph([
  { ...documents[0], id: "a", prerequisites: ["b"] },
  { ...documents[0], id: "b", prerequisites: ["a"] },
]);
assert.ok(validateCurriculumGraph(cyclic).some((issue) => issue.message === "cyclic content prerequisite"));
const invalidRelation = { ...graph, relations: [{ source: "llm", target: "missing", type: "RELATED_TO" }] };
assert.ok(validateCurriculumGraph(invalidRelation).some((issue) => issue.message.includes("unknown concept")));
console.log("Curriculum graph tests passed: relations, content prerequisites, unknown nodes and cycle detection.");
