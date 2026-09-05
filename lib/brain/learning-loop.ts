import type { CanonicalContentDocument } from "../content/types.ts";

export type LearningEvent =
  | { type: "lesson_started"; contentId: string }
  | { type: "lesson_completed"; contentId: string }
  | { type: "evidence_submitted"; contentId: string; payload: Record<string, string> }
  | { type: "evidence_verified"; contentId: string };

export type LearningState = { events: LearningEvent[] };
export type LearningLoop = {
  path: CanonicalContentDocument[];
  project: CanonicalContentDocument;
  state: LearningState;
  next: () => CanonicalContentDocument | undefined;
  startLesson: (contentId: string) => void;
  completeLesson: (contentId: string) => void;
  submitEvidence: (payload: Record<string, string>) => void;
  verifyEvidence: () => void;
  progress: () => { lessonsCompleted: number; lessonsTotal: number; evidenceSubmitted: boolean; evidenceVerified: boolean; percent: number };
};

function prerequisitesMet(document: CanonicalContentDocument, events: readonly LearningEvent[]) {
  return document.prerequisites.every((id) => events.some((event) => event.type === "lesson_completed" && event.contentId === id));
}

export function createLearningLoop(documents: CanonicalContentDocument[], courseId = "local-ai", projectId = "run-local-llm"): LearningLoop {
  const byId = new Map(documents.map((document) => [document.id, document]));
  const course = byId.get(courseId);
  const project = byId.get(projectId);
  if (!course || course.type !== "course") throw new Error(`unknown course: ${courseId}`);
  if (!project || project.type !== "project") throw new Error(`unknown project: ${projectId}`);
  const path: CanonicalContentDocument[] = [];
  const seen = new Set<string>();
  const add = (id: string) => {
    if (seen.has(id)) return;
    const document = byId.get(id);
    if (!document) throw new Error(`learning path references unknown content: ${id}`);
    for (const prerequisite of document.prerequisites) add(prerequisite);
    if (document.type === "lesson" && document.status === "published") path.push(document);
    seen.add(id);
  };
  for (const lessonId of course.lessons ?? []) add(lessonId);
  const state: LearningState = { events: [] };
  return {
    path,
    project,
    state,
    next: () => path.find((document) => !state.events.some((event) => event.type === "lesson_completed" && event.contentId === document.id)),
    startLesson: (contentId) => {
      const lesson = path.find((document) => document.id === contentId);
      if (!lesson) throw new Error(`lesson is not in this learning path: ${contentId}`);
      if (!state.events.some((event) => event.type === "lesson_started" && event.contentId === contentId)) state.events.push({ type: "lesson_started", contentId });
    },
    completeLesson: (contentId) => {
      const lesson = path.find((document) => document.id === contentId);
      if (!lesson) throw new Error(`lesson is not in this learning path: ${contentId}`);
      if (!prerequisitesMet(lesson, state.events)) throw new Error(`prerequisites are incomplete for: ${contentId}`);
      if (!state.events.some((event) => event.type === "lesson_completed" && event.contentId === contentId)) state.events.push({ type: "lesson_completed", contentId });
    },
    submitEvidence: (payload) => {
      if (!path.every((lesson) => state.events.some((event) => event.type === "lesson_completed" && event.contentId === lesson.id))) throw new Error("complete the learning path before submitting project evidence");
      if (!Object.keys(payload).length || Object.values(payload).some((value) => !value.trim())) throw new Error("evidence payload must contain non-empty fields");
      state.events.push({ type: "evidence_submitted", contentId: project.id, payload: { ...payload } });
    },
    verifyEvidence: () => {
      if (!state.events.some((event) => event.type === "evidence_submitted" && event.contentId === project.id)) throw new Error("cannot verify evidence that was not submitted");
      if (!state.events.some((event) => event.type === "evidence_verified" && event.contentId === project.id)) state.events.push({ type: "evidence_verified", contentId: project.id });
    },
    progress: () => {
      const lessonsCompleted = path.filter((lesson) => state.events.some((event) => event.type === "lesson_completed" && event.contentId === lesson.id)).length;
      const evidenceSubmitted = state.events.some((event) => event.type === "evidence_submitted" && event.contentId === project.id);
      const evidenceVerified = state.events.some((event) => event.type === "evidence_verified" && event.contentId === project.id);
      const totalSteps = path.length + 1;
      const completedSteps = lessonsCompleted + (evidenceVerified ? 1 : evidenceSubmitted ? 0.5 : 0);
      return { lessonsCompleted, lessonsTotal: path.length, evidenceSubmitted, evidenceVerified, percent: Math.round((completedSteps / totalSteps) * 100) };
    },
  };
}
