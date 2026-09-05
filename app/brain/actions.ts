"use server";

import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/social/config";
import { saveLessonProgress, submitProjectEvidence, verifyEvidence as verifyEvidenceRecord } from "@/lib/brain/persistence";
import { loadContentRegistry } from "@/lib/content/registry";
import { createLearningLoop } from "@/lib/brain/learning-loop";

const contentIdSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const evidenceSchema = z.record(z.string().min(1).max(2000), z.string().trim().min(1).max(4000)).refine((payload) => Object.keys(payload).length <= 12, "Too many evidence fields");
const evidenceIdSchema = z.string().uuid();

async function currentUserId() {
  if (!isSupabaseConfigured()) return null;
  const db = await createSupabaseServerClient();
  const { data, error } = await db.auth.getClaims();
  return error || typeof data?.claims?.sub !== "string" ? null : { db, userId: data.claims.sub };
}

export async function recordLessonProgress(lessonId: string, status: "in_progress" | "completed") {
  const parsedId = contentIdSchema.safeParse(lessonId);
  if (!parsedId.success) return { ok: false, message: "Invalid lesson." };
  const session = await currentUserId();
  if (!session) return { ok: false, message: "Sign in to save progress." };
  const loop = createLearningLoop(loadContentRegistry());
  const lesson = loop.path.find((item) => item.id === parsedId.data);
  if (!lesson) return { ok: false, message: "Lesson is not in the learning path." };
  const { data: existing } = await session.db.from("aulafy_user_lesson_progress").select("status,aulafy_lessons(content_id)").eq("user_id", session.userId);
  const completed = new Set((existing ?? []).flatMap((row) => {
    const linked = row.aulafy_lessons as { content_id?: string } | Array<{ content_id?: string }> | null;
    const contentId = Array.isArray(linked) ? linked[0]?.content_id : linked?.content_id;
    return row.status === "completed" && contentId ? [contentId] : [];
  }));
  if (status === "completed" && lesson.prerequisites.some((id) => !completed.has(id))) return { ok: false, message: "Complete the previous lessons first." };
  const { data: indexedLesson, error: lookupError } = await session.db.from("aulafy_lessons").select("id").eq("content_id", parsedId.data).maybeSingle();
  if (lookupError || !indexedLesson) return { ok: false, message: "Lesson is not indexed yet." };
  const result = await saveLessonProgress(session.db, session.userId, indexedLesson.id, status);
  return result.error ? { ok: false, message: "Could not save progress." } : { ok: true };
}

export async function recordProjectEvidence(projectId: string, payload: Record<string, string>) {
  const parsedId = contentIdSchema.safeParse(projectId);
  const parsedPayload = evidenceSchema.safeParse(payload);
  if (!parsedId.success || !parsedPayload.success) return { ok: false, message: "Invalid evidence." };
  const session = await currentUserId();
  if (!session) return { ok: false, message: "Sign in to submit evidence." };
  const loop = createLearningLoop(loadContentRegistry());
  const { data: existing } = await session.db.from("aulafy_user_lesson_progress").select("status,aulafy_lessons(content_id)").eq("user_id", session.userId);
  const completed = new Set((existing ?? []).flatMap((row) => {
    const linked = row.aulafy_lessons as { content_id?: string } | Array<{ content_id?: string }> | null;
    const contentId = Array.isArray(linked) ? linked[0]?.content_id : linked?.content_id;
    return row.status === "completed" && contentId ? [contentId] : [];
  }));
  if (!loop.path.every((lesson) => completed.has(lesson.id))) return { ok: false, message: "Complete the learning path before submitting evidence." };
  const { data: project, error: lookupError } = await session.db.from("aulafy_projects").select("id").eq("slug", parsedId.data).maybeSingle();
  if (lookupError || !project) return { ok: false, message: "Project is not indexed yet." };
  const result = await submitProjectEvidence(session.db, session.userId, project.id, parsedPayload.data);
  return result.error ? { ok: false, message: "Could not save evidence." } : { ok: true, evidenceId: result.data.id };
}

export async function verifyEvidence(evidenceId: string) {
  const parsedId = evidenceIdSchema.safeParse(evidenceId);
  if (!parsedId.success) return { ok: false, message: "Invalid evidence." };
  const session = await currentUserId();
  if (!session) return { ok: false, message: "Sign in to review evidence." };
  const { data: role } = await session.db.from("user_roles").select("role").eq("user_id", session.userId).maybeSingle();
  if (role?.role !== "moderator" && role?.role !== "admin") return { ok: false, message: "You are not allowed to verify evidence." };
  const result = await verifyEvidenceRecord(session.db, session.userId, parsedId.data);
  return result.error ? { ok: false, message: "Could not verify evidence." } : { ok: true };
}
