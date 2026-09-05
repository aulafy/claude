import fs from "node:fs";
import path from "node:path";
import { parseContentFile } from "./parser.ts";
import type { CanonicalContentDocument, ContentType } from "./types.ts";

function filesIn(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(full) : entry.isFile() && entry.name.endsWith(".mdx") ? [full] : [];
  });
}

export function loadContentRegistry(root = process.cwd()): CanonicalContentDocument[] {
  return filesIn(path.join(root, "content")).sort().map((file) => parseContentFile(file, root));
}

export function createContentRegistry(documents: CanonicalContentDocument[]) {
  const byId = new Map(documents.map((document) => [document.id, document]));
  return {
    documents: [...documents],
    getContentById: (id: string) => byId.get(id),
    getCourseById: (id: string) => byId.get(id)?.type === "course" ? byId.get(id) : undefined,
    getLessonById: (id: string) => byId.get(id)?.type === "lesson" ? byId.get(id) : undefined,
    getProjectById: (id: string) => byId.get(id)?.type === "project" ? byId.get(id) : undefined,
    getPublished: () => documents.filter((document) => document.status === "published"),
    getLessonsForCourse: (course: string) => documents.filter((document) => document.type === "lesson" && document.course === course),
    getByType: (type: ContentType) => documents.filter((document) => document.type === type),
  };
}
