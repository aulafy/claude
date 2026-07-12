import { cursos, lecciones } from "@/lib/cursos";

export const PROGRESS_STORAGE_KEY = "aulafy:progress:v1";

export type ProgressData = Record<string, string[]>;

export type ProgressBackup = {
  app: "Aulafy";
  schema: "aulafy-progress-v1";
  exportedAt: string;
  progress: ProgressData;
};

export function normalizeProgress(input: unknown): ProgressData {
  const source = isBackup(input) ? input.progress : input;
  if (!source || typeof source !== "object" || Array.isArray(source)) return {};

  const normalized: ProgressData = {};
  for (const course of cursos) {
    const rawLessons = (source as Record<string, unknown>)[course.slug];
    if (!Array.isArray(rawLessons)) continue;
    const allowed = new Set(lecciones(course).map((lesson) => lesson.slug));
    const unique = [...new Set(rawLessons.filter((slug): slug is string => typeof slug === "string"))];
    const valid = unique.filter((slug) => allowed.has(slug));
    if (valid.length) normalized[course.slug] = valid;
  }
  return normalized;
}

export function readProgress(): ProgressData {
  if (typeof window === "undefined") return {};
  try {
    return normalizeProgress(JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY) ?? "{}"));
  } catch {
    return {};
  }
}

export function writeProgress(progress: ProgressData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(normalizeProgress(progress)));
  window.dispatchEvent(new CustomEvent("aulafy:progress-updated"));
}

export function createProgressBackup(progress: ProgressData, exportedAt = new Date().toISOString()): ProgressBackup {
  return {
    app: "Aulafy",
    schema: "aulafy-progress-v1",
    exportedAt,
    progress: normalizeProgress(progress),
  };
}

function isBackup(input: unknown): input is ProgressBackup {
  return Boolean(
    input &&
      typeof input === "object" &&
      (input as ProgressBackup).schema === "aulafy-progress-v1" &&
      (input as ProgressBackup).progress,
  );
}
