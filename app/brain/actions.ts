"use server";

import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/social/config";
import { saveLessonProgress, submitProjectEvidence } from "@/lib/brain/persistence";

const contentIdSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const evidenceSchema = z.record(z.string().min(1).max(2000), z.string().trim().min(1).max(4000)).refine((payload) => Object.keys(payload).length <= 12, "Too many evidence fields");

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
  const { data: lesson, error: lookupError } = await session.db.from("aulafy_lessons").select("id").eq("content_id", parsedId.data).maybeSingle();
  if (lookupError || !lesson) return { ok: false, message: "Lesson is not indexed yet." };
  const result = await saveLessonProgress(session.db, session.userId, lesson.id, status);
  return result.error ? { ok: false, message: "Could not save progress." } : { ok: true };
}

export async function recordProjectEvidence(projectId: string, payload: Record<string, string>) {
  const parsedId = contentIdSchema.safeParse(projectId);
  const parsedPayload = evidenceSchema.safeParse(payload);
  if (!parsedId.success || !parsedPayload.success) return { ok: false, message: "Invalid evidence." };
  const session = await currentUserId();
  if (!session) return { ok: false, message: "Sign in to submit evidence." };
  const { data: project, error: lookupError } = await session.db.from("aulafy_projects").select("id").eq("slug", parsedId.data).maybeSingle();
  if (lookupError || !project) return { ok: false, message: "Project is not indexed yet." };
  const result = await submitProjectEvidence(session.db, session.userId, project.id, parsedPayload.data);
  return result.error ? { ok: false, message: "Could not save evidence." } : { ok: true, evidenceId: result.data.id };
}
