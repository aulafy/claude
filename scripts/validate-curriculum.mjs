import { buildCurriculumGraph, validateCurriculumGraph } from "../lib/curriculum/graph.ts";
import { loadContentRegistry } from "../lib/content/registry.ts";

const graph = buildCurriculumGraph(loadContentRegistry());
const issues = validateCurriculumGraph(graph);
console.log("Aulafy Curriculum Validation");
console.log(`Concepts: ${graph.concepts.size}  Skills: ${graph.skills.size}  Relations: ${graph.relations.length}  Documents: ${graph.documents.length}`);
for (const issue of issues) console.log(`${issue.kind.toUpperCase()} ${issue.subject}\n  ${issue.message}`);
if (issues.some((issue) => issue.kind === "error")) process.exitCode = 1;
else console.log("PASS");
