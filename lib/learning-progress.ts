import { trackLearningEvent } from "./learning-events.ts";
import { getLearningReturnEvent } from "./learning-return.ts";
import { isLearningDay, toLocalDay } from "./learning-streak.ts";

export const LEARNING_PROGRESS_KEY = "aulafy.learning-progress.v1";
export const LEARNING_PROGRESS_EVENT = "aulafy:learning-progress";

export type SavedLearningItem = {
  href: string;
  title: string;
  courseTitle: string;
  locale: "es" | "en";
  savedAt: string;
};

export type SelectedLearningPath = {
  slug: string;
  title: string;
  href: string;
  firstTitle: string;
  firstHref: string;
  locale: "es" | "en";
  selectedAt: string;
};

export type LearningEvidenceItem = {
  href: string;
  title: string;
  content: string;
  locale: "es" | "en";
  savedAt: string;
};

export type LearningProgress = {
  href: string;
  title: string;
  courseTitle: string;
  locale: "es" | "en";
  visitedAt: string;
  startedLessons: string[];
  completedLessons: string[];
  activityDays: string[];
  evidenceItems: LearningEvidenceItem[];
  savedItems: SavedLearningItem[];
  selectedPath?: SelectedLearningPath;
};

export type LearningProgressExport = {
  format: "aulafy-learning-progress";
  version: 1;
  exportedAt: string;
  progress: LearningProgress;
};

const MAX_COMPLETED_LESSONS = 1000;
const MAX_STARTED_LESSONS = 2000;
const MAX_ACTIVITY_DAYS = 366;
const MAX_EVIDENCE_ITEMS = 20;
const MAX_EVIDENCE_LENGTH = 2000;
const MAX_SAVED_ITEMS = 50;
const MAX_TEXT_LENGTH = 240;

function internalHref(value: unknown): value is string {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") && value.length <= 500;
}

function validateSavedItem(value: unknown): SavedLearningItem | null {
  if (typeof value !== "object" || value === null) return null;
  const candidate = value as Record<string, unknown>;
  if (!internalHref(candidate.href)) return null;
  if (typeof candidate.title !== "string" || !candidate.title.trim() || candidate.title.length > MAX_TEXT_LENGTH) return null;
  if (typeof candidate.courseTitle !== "string" || !candidate.courseTitle.trim() || candidate.courseTitle.length > MAX_TEXT_LENGTH) return null;
  if (candidate.locale !== "es" && candidate.locale !== "en") return null;
  if (typeof candidate.savedAt !== "string" || !Number.isFinite(Date.parse(candidate.savedAt))) return null;
  return { href: candidate.href, title: candidate.title.trim(), courseTitle: candidate.courseTitle.trim(), locale: candidate.locale, savedAt: new Date(candidate.savedAt).toISOString() };
}

function validateSelectedPath(value: unknown): SelectedLearningPath | null {
  if (typeof value !== "object" || value === null) return null;
  const candidate = value as Record<string, unknown>;
  if (typeof candidate.slug !== "string" || !/^[a-z0-9-]{1,80}$/.test(candidate.slug)) return null;
  if (typeof candidate.title !== "string" || !candidate.title.trim() || candidate.title.length > MAX_TEXT_LENGTH) return null;
  if (!internalHref(candidate.href) || !internalHref(candidate.firstHref)) return null;
  if (typeof candidate.firstTitle !== "string" || !candidate.firstTitle.trim() || candidate.firstTitle.length > MAX_TEXT_LENGTH) return null;
  if (candidate.locale !== "es" && candidate.locale !== "en") return null;
  if (typeof candidate.selectedAt !== "string" || !Number.isFinite(Date.parse(candidate.selectedAt))) return null;
  return {
    slug: candidate.slug,
    title: candidate.title.trim(),
    href: candidate.href,
    firstTitle: candidate.firstTitle.trim(),
    firstHref: candidate.firstHref,
    locale: candidate.locale,
    selectedAt: new Date(candidate.selectedAt).toISOString(),
  };
}

function validateEvidenceItem(value: unknown): LearningEvidenceItem | null {
  if (typeof value !== "object" || value === null) return null;
  const candidate = value as Record<string, unknown>;
  if (!internalHref(candidate.href)) return null;
  if (typeof candidate.title !== "string" || !candidate.title.trim() || candidate.title.length > MAX_TEXT_LENGTH) return null;
  if (typeof candidate.content !== "string" || !candidate.content.trim() || candidate.content.length > MAX_EVIDENCE_LENGTH) return null;
  if (candidate.locale !== "es" && candidate.locale !== "en") return null;
  if (typeof candidate.savedAt !== "string" || !Number.isFinite(Date.parse(candidate.savedAt))) return null;
  return { href: candidate.href, title: candidate.title.trim(), content: candidate.content.trim(), locale: candidate.locale, savedAt: new Date(candidate.savedAt).toISOString() };
}

export function validateLearningProgress(value: unknown): LearningProgress | null {
  if (typeof value !== "object" || value === null) return null;
  const candidate = value as Record<string, unknown>;
  if (!internalHref(candidate.href)) return null;
  if (typeof candidate.title !== "string" || !candidate.title.trim() || candidate.title.length > MAX_TEXT_LENGTH) return null;
  if (typeof candidate.courseTitle !== "string" || !candidate.courseTitle.trim() || candidate.courseTitle.length > MAX_TEXT_LENGTH) return null;
  if (candidate.locale !== "es" && candidate.locale !== "en") return null;
  if (typeof candidate.visitedAt !== "string" || !Number.isFinite(Date.parse(candidate.visitedAt))) return null;
  if (!Array.isArray(candidate.completedLessons) || candidate.completedLessons.length > MAX_COMPLETED_LESSONS) return null;
  if (!candidate.completedLessons.every(internalHref)) return null;
  const rawStartedLessons = candidate.startedLessons ?? [];
  if (!Array.isArray(rawStartedLessons) || rawStartedLessons.length > MAX_STARTED_LESSONS || !rawStartedLessons.every(internalHref)) return null;
  const completedLessons = [...new Set(candidate.completedLessons)];
  const startedLessons = [...new Set([...rawStartedLessons, ...completedLessons])];
  if (startedLessons.length > MAX_STARTED_LESSONS) return null;
  const rawActivityDays = candidate.activityDays ?? [];
  if (!Array.isArray(rawActivityDays) || rawActivityDays.length > MAX_ACTIVITY_DAYS || !rawActivityDays.every(isLearningDay)) return null;
  const rawEvidenceItems = candidate.evidenceItems ?? [];
  if (!Array.isArray(rawEvidenceItems) || rawEvidenceItems.length > MAX_EVIDENCE_ITEMS) return null;
  const evidenceItems = rawEvidenceItems.map(validateEvidenceItem);
  if (evidenceItems.some((item) => item === null)) return null;
  const rawSavedItems = candidate.savedItems ?? [];
  if (!Array.isArray(rawSavedItems) || rawSavedItems.length > MAX_SAVED_ITEMS) return null;
  const savedItems = rawSavedItems.map(validateSavedItem);
  if (savedItems.some((item) => item === null)) return null;
  const selectedPath = candidate.selectedPath === undefined ? undefined : validateSelectedPath(candidate.selectedPath);
  if (candidate.selectedPath !== undefined && !selectedPath) return null;
  const uniqueSavedItems = new Map<string, SavedLearningItem>();
  for (const item of savedItems as SavedLearningItem[]) {
    const previous = uniqueSavedItems.get(item.href);
    if (!previous || Date.parse(item.savedAt) > Date.parse(previous.savedAt)) uniqueSavedItems.set(item.href, item);
  }
  const uniqueEvidenceItems = new Map<string, LearningEvidenceItem>();
  for (const item of evidenceItems as LearningEvidenceItem[]) {
    const previous = uniqueEvidenceItems.get(item.href);
    if (!previous || item.savedAt > previous.savedAt) uniqueEvidenceItems.set(item.href, item);
  }
  return {
    href: candidate.href,
    title: candidate.title.trim(),
    courseTitle: candidate.courseTitle.trim(),
    locale: candidate.locale,
    visitedAt: new Date(candidate.visitedAt).toISOString(),
    startedLessons,
    completedLessons,
    activityDays: [...new Set(rawActivityDays)].sort().slice(-MAX_ACTIVITY_DAYS),
    evidenceItems: [...uniqueEvidenceItems.values()].sort((left, right) => right.savedAt.localeCompare(left.savedAt)),
    savedItems: [...uniqueSavedItems.values()].sort((left, right) => right.savedAt.localeCompare(left.savedAt)),
    ...(selectedPath ? { selectedPath } : {}),
  };
}

export function createLearningProgressExport(progress: LearningProgress, exportedAt = new Date().toISOString()): LearningProgressExport {
  const valid = validateLearningProgress(progress);
  if (!valid) throw new Error("Invalid learning progress");
  return { format: "aulafy-learning-progress", version: 1, exportedAt, progress: valid };
}

export function parseLearningProgressExport(value: unknown): LearningProgressExport | null {
  if (typeof value !== "object" || value === null) return null;
  const candidate = value as Record<string, unknown>;
  if (candidate.format !== "aulafy-learning-progress" || candidate.version !== 1) return null;
  if (typeof candidate.exportedAt !== "string" || !Number.isFinite(Date.parse(candidate.exportedAt))) return null;
  const progress = validateLearningProgress(candidate.progress);
  if (!progress) return null;
  return { format: "aulafy-learning-progress", version: 1, exportedAt: new Date(candidate.exportedAt).toISOString(), progress };
}

export function mergeLearningProgress(current: LearningProgress | null, imported: LearningProgress): LearningProgress {
  const validImported = validateLearningProgress(imported);
  if (!validImported) throw new Error("Invalid imported learning progress");
  const validCurrent = validateLearningProgress(current);
  if (!validCurrent) return validImported;
  const importedIsNewer = Date.parse(validImported.visitedAt) >= Date.parse(validCurrent.visitedAt);
  const recent = importedIsNewer ? validImported : validCurrent;
  const mergedSavedItems = new Map<string, SavedLearningItem>();
  for (const item of [...validCurrent.savedItems, ...validImported.savedItems]) {
    const previous = mergedSavedItems.get(item.href);
    if (!previous || Date.parse(item.savedAt) > Date.parse(previous.savedAt)) mergedSavedItems.set(item.href, item);
  }
  const selectedPath = !validCurrent.selectedPath || (validImported.selectedPath && validImported.selectedPath.selectedAt >= validCurrent.selectedPath.selectedAt)
    ? validImported.selectedPath
    : validCurrent.selectedPath;
  const mergedEvidenceItems = new Map<string, LearningEvidenceItem>();
  for (const item of [...validCurrent.evidenceItems, ...validImported.evidenceItems]) {
    const previous = mergedEvidenceItems.get(item.href);
    if (!previous || item.savedAt > previous.savedAt) mergedEvidenceItems.set(item.href, item);
  }
  const completedLessons = [...new Set([...validCurrent.completedLessons, ...validImported.completedLessons])].slice(0, MAX_COMPLETED_LESSONS);
  const startedLessons = [...new Set([...completedLessons, ...validCurrent.startedLessons, ...validImported.startedLessons])].slice(0, MAX_STARTED_LESSONS);
  return {
    ...recent,
    startedLessons,
    completedLessons,
    activityDays: [...new Set([...validCurrent.activityDays, ...validImported.activityDays])].sort().slice(-MAX_ACTIVITY_DAYS),
    evidenceItems: [...mergedEvidenceItems.values()].sort((left, right) => right.savedAt.localeCompare(left.savedAt)).slice(0, MAX_EVIDENCE_ITEMS),
    savedItems: [...mergedSavedItems.values()].sort((left, right) => right.savedAt.localeCompare(left.savedAt)).slice(0, MAX_SAVED_ITEMS),
    ...(selectedPath ? { selectedPath } : {}),
  };
}

export function readLearningProgress(): LearningProgress | null {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(LEARNING_PROGRESS_KEY);
    if (!value) return null;
    return validateLearningProgress(JSON.parse(value));
  } catch {
    return null;
  }
}

export function saveLearningProgress(next: Omit<LearningProgress, "startedLessons" | "completedLessons" | "activityDays" | "evidenceItems" | "savedItems"> & { startedLessons?: string[]; completedLessons?: string[]; activityDays?: string[]; evidenceItems?: LearningEvidenceItem[]; savedItems?: SavedLearningItem[] }) {
  if (typeof window === "undefined") return;
  const current = readLearningProgress();
  const progress: LearningProgress = {
    ...next,
    startedLessons: next.startedLessons ?? current?.startedLessons ?? [],
    completedLessons: next.completedLessons ?? current?.completedLessons ?? [],
    activityDays: next.activityDays ?? current?.activityDays ?? [],
    evidenceItems: next.evidenceItems ?? current?.evidenceItems ?? [],
    savedItems: next.savedItems ?? current?.savedItems ?? [],
  };
  const valid = validateLearningProgress(progress);
  if (!valid) return;
  window.localStorage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify(valid));
  window.dispatchEvent(new Event(LEARNING_PROGRESS_EVENT));
  const returnEvent = getLearningReturnEvent(current?.visitedAt, valid.visitedAt);
  if (returnEvent) trackLearningEvent(returnEvent);
}

export function completeLearningStep(href: string) {
  if (!internalHref(href)) return;
  const current = readLearningProgress();
  if (!current) return;
  const startedLessons = Array.from(new Set([...current.startedLessons, href]));
  const completedLessons = Array.from(new Set([...current.completedLessons, href]));
  const activityDays = Array.from(new Set([...current.activityDays, toLocalDay()])).sort().slice(-MAX_ACTIVITY_DAYS);
  window.localStorage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify({ ...current, startedLessons, completedLessons, activityDays }));
  window.dispatchEvent(new Event(LEARNING_PROGRESS_EVENT));
}

export function setLearningStepCompleted(href: string, completed: boolean) {
  if (!internalHref(href)) return;
  const current = readLearningProgress();
  if (!current) return;
  const startedLessons = completed ? Array.from(new Set([...current.startedLessons, href])) : current.startedLessons;
  const completedLessons = completed
    ? Array.from(new Set([...current.completedLessons, href]))
    : current.completedLessons.filter((item) => item !== href);
  const activityDays = completed ? Array.from(new Set([...current.activityDays, toLocalDay()])).sort().slice(-MAX_ACTIVITY_DAYS) : current.activityDays;
  window.localStorage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify({ ...current, startedLessons, completedLessons, activityDays }));
  window.dispatchEvent(new Event(LEARNING_PROGRESS_EVENT));
}

export function startLearningStep(href: string) {
  if (typeof window === "undefined" || !internalHref(href)) return false;
  const current = readLearningProgress();
  if (!current || current.startedLessons.includes(href)) return false;
  const startedLessons = [...current.startedLessons, href];
  const valid = validateLearningProgress({ ...current, startedLessons });
  if (!valid) return false;
  window.localStorage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify(valid));
  window.dispatchEvent(new Event(LEARNING_PROGRESS_EVENT));
  return true;
}

export function replaceLearningProgress(progress: LearningProgress) {
  if (typeof window === "undefined") return false;
  const valid = validateLearningProgress(progress);
  if (!valid) return false;
  window.localStorage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify(valid));
  window.dispatchEvent(new Event(LEARNING_PROGRESS_EVENT));
  return true;
}

export function setLearningItemSaved(item: Omit<SavedLearningItem, "savedAt">, saved: boolean) {
  const current = readLearningProgress();
  if (!current || !internalHref(item.href)) return false;
  const existing = current.savedItems.filter((entry) => entry.href !== item.href);
  const savedItems = saved ? [{ ...item, savedAt: new Date().toISOString() }, ...existing] : existing;
  const valid = validateLearningProgress({ ...current, savedItems });
  if (!valid) return false;
  window.localStorage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify(valid));
  window.dispatchEvent(new Event(LEARNING_PROGRESS_EVENT));
  return saved;
}

export function setLearningEvidence(item: Omit<LearningEvidenceItem, "savedAt"> | null, href: string) {
  if (typeof window === "undefined" || !internalHref(href)) return false;
  if (item && item.href !== href) return false;
  const current = readLearningProgress();
  if (!current) return false;
  const existing = current.evidenceItems.filter((entry) => entry.href !== href);
  const evidenceItems = item ? [{ ...item, savedAt: new Date().toISOString() }, ...existing].slice(0, MAX_EVIDENCE_ITEMS) : existing;
  const valid = validateLearningProgress({ ...current, evidenceItems });
  if (!valid) return false;
  window.localStorage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify(valid));
  window.dispatchEvent(new Event(LEARNING_PROGRESS_EVENT));
  return true;
}

export function setSelectedLearningPath(path: Omit<SelectedLearningPath, "selectedAt"> | null) {
  if (typeof window === "undefined") return false;
  const current = readLearningProgress();
  if (!path) {
    if (!current) return true;
    const next = { ...current };
    delete next.selectedPath;
    window.localStorage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(LEARNING_PROGRESS_EVENT));
    return true;
  }
  const selectedPath = validateSelectedPath({ ...path, selectedAt: new Date().toISOString() });
  if (!selectedPath) return false;
  const next: LearningProgress = current
    ? { ...current, selectedPath }
    : {
      href: selectedPath.firstHref,
      title: selectedPath.firstTitle,
      courseTitle: selectedPath.title,
      locale: selectedPath.locale,
      visitedAt: new Date().toISOString(),
      startedLessons: [],
      completedLessons: [],
      activityDays: [],
      evidenceItems: [],
      savedItems: [],
      selectedPath,
    };
  const valid = validateLearningProgress(next);
  if (!valid) return false;
  window.localStorage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify(valid));
  window.dispatchEvent(new Event(LEARNING_PROGRESS_EVENT));
  return true;
}

export function clearLearningProgress() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(LEARNING_PROGRESS_KEY);
  window.dispatchEvent(new Event(LEARNING_PROGRESS_EVENT));
}
