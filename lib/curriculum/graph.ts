import type { CanonicalContentDocument } from "../content/types.ts";

export type ConceptRelationType = "REQUIRES" | "PART_OF" | "RELATED_TO" | "BUILDS_ON" | "ALTERNATIVE_TO";
export type ConceptRelation = { source: string; target: string; type: ConceptRelationType };
export type CurriculumIssue = { kind: "error" | "warning"; subject: string; message: string };

export type CurriculumGraph = {
  concepts: ReadonlySet<string>;
  skills: ReadonlySet<string>;
  relations: readonly ConceptRelation[];
  documents: readonly CanonicalContentDocument[];
};

export const conceptRegistry = new Set([
  "llm", "token", "context-window", "ollama", "local-inference", "quantization", "local-ai",
  "task-scope", "reversibility", "memory", "privacy", "backups", "evaluation", "latency",
]);
export const skillRegistry = new Set([
  "run-local-model", "inspect-model", "configure-context-window", "define-task",
  "write-acceptance-criteria", "inspect-hardware", "choose-model", "classify-data",
  "make-backup", "measure-latency", "compare-output",
]);
export const conceptRelations: readonly ConceptRelation[] = [
  { source: "context-window", target: "llm", type: "REQUIRES" },
  { source: "ollama", target: "local-inference", type: "PART_OF" },
  { source: "quantization", target: "local-inference", type: "RELATED_TO" },
  { source: "task-scope", target: "local-inference", type: "BUILDS_ON" },
  { source: "privacy", target: "local-inference", type: "REQUIRES" },
  { source: "evaluation", target: "local-inference", type: "BUILDS_ON" },
];

export function buildCurriculumGraph(documents: CanonicalContentDocument[]): CurriculumGraph {
  return { concepts: conceptRegistry, skills: skillRegistry, relations: conceptRelations, documents: [...documents] };
}

function hasCycle(edges: Map<string, string[]>) {
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const visit = (node: string): boolean => {
    if (visiting.has(node)) return true;
    if (visited.has(node)) return false;
    visiting.add(node);
    for (const next of edges.get(node) ?? []) if (visit(next)) return true;
    visiting.delete(node);
    visited.add(node);
    return false;
  };
  return [...edges.keys()].some(visit);
}

export function validateCurriculumGraph(graph: CurriculumGraph): CurriculumIssue[] {
  const issues: CurriculumIssue[] = [];
  const seenRelations = new Set<string>();
  for (const relation of graph.relations) {
    const key = `${relation.source}|${relation.target}|${relation.type}`;
    if (seenRelations.has(key)) issues.push({ kind: "error", subject: key, message: "duplicate concept relation" });
    seenRelations.add(key);
    if (!graph.concepts.has(relation.source) || !graph.concepts.has(relation.target)) issues.push({ kind: "error", subject: key, message: "concept relation references an unknown concept" });
    if (relation.source === relation.target) issues.push({ kind: "error", subject: key, message: "concept relation cannot point to itself" });
  }
  const conceptEdges = new Map<string, string[]>();
  for (const relation of graph.relations.filter((item) => item.type === "REQUIRES" || item.type === "BUILDS_ON")) conceptEdges.set(relation.source, [...(conceptEdges.get(relation.source) ?? []), relation.target]);
  if (hasCycle(conceptEdges)) issues.push({ kind: "error", subject: "concepts", message: "cyclic prerequisite relation" });
  const prerequisiteEdges = new Map<string, string[]>();
  for (const document of graph.documents) {
    for (const prerequisite of document.prerequisites) {
      if (prerequisite === document.id) issues.push({ kind: "error", subject: document.id, message: "content cannot require itself" });
      prerequisiteEdges.set(document.id, [...(prerequisiteEdges.get(document.id) ?? []), prerequisite]);
    }
  }
  if (hasCycle(prerequisiteEdges)) issues.push({ kind: "error", subject: "content", message: "cyclic content prerequisite" });
  return issues;
}
