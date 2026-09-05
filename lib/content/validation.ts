import type { CanonicalContentDocument } from "./types.ts";
import { createContentRegistry } from "./registry.ts";
import { conceptRegistry, skillRegistry } from "../curriculum/graph.ts";

export type ContentIssue = { severity: "error" | "warning"; sourcePath: string; message: string };

export function validateContent(documents: CanonicalContentDocument[]) {
  const issues: ContentIssue[] = [];
  const ids = new Map<string, CanonicalContentDocument>();
  for (const document of documents) {
    const previous = ids.get(document.id);
    if (previous) issues.push({ severity: "error", sourcePath: document.sourcePath, message: `duplicate content ID ${document.id}; already used by ${previous.sourcePath}` });
    ids.set(document.id, document);
    for (const concept of document.concepts) if (!conceptRegistry.has(concept)) issues.push({ severity: "error", sourcePath: document.sourcePath, message: `unknown concept: ${concept}` });
    for (const skill of document.skills) if (!skillRegistry.has(skill)) issues.push({ severity: "error", sourcePath: document.sourcePath, message: `unknown skill: ${skill}` });
    for (const prerequisite of document.prerequisites) {
      if (prerequisite === document.id) issues.push({ severity: "error", sourcePath: document.sourcePath, message: `self prerequisite: ${prerequisite}` });
      else if (!documents.some((candidate) => candidate.id === prerequisite)) issues.push({ severity: "error", sourcePath: document.sourcePath, message: `unknown prerequisite: ${prerequisite}` });
    }
    if (document.type === "lesson" && !document.course) issues.push({ severity: "error", sourcePath: document.sourcePath, message: "lesson requires course" });
    if (document.type === "course" && !document.lessons?.length) issues.push({ severity: "warning", sourcePath: document.sourcePath, message: "course has no explicit lessons" });
    if (document.type === "lesson" && document.course && !documents.some((candidate) => candidate.type === "course" && candidate.id === document.course)) issues.push({ severity: "error", sourcePath: document.sourcePath, message: `unknown course: ${document.course}` });
  }
  const registry = createContentRegistry(documents);
  for (const course of registry.getByType("course")) for (const lessonId of course.lessons ?? []) if (!registry.getLessonById(lessonId)) issues.push({ severity: "error", sourcePath: course.sourcePath, message: `course references unknown lesson: ${lessonId}` });
  return issues;
}
