"use server";

import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/social/config";
import { saveLessonProgress, submitProjectEvidence } from "@/lib/brain/persistence";

const idSchema = z.string().uuid();
const evidenceSchema = z.record(z.string().min(1).max(2000), z.string().trim().min(1).max(4000)).refine((payload) => Object.keys(payload).length <= 12, "Too many evidence fields");

async function currentUserId() {
  if (!isSupabaseConfigured()) return null;
  const db = await createSupabaseServerClient();
  const { data, error } = await db.auth.getClaims();
  return error || typeof data?.claims?.sub !== "string" ? null : { db, userId: data.claims.sub };
}

export async function recordLessonProgress(lessonId: string, status: "in_progress" | "completed") {
  const parsedId = idSchema.safeParse(lessonId);
  if (!parsedId.success) return { ok: false, message: "Invalid lesson." };
  const session = await currentUserId();
  if (!session) return { ok: false, message: "Sign in to save progress." };
  const result = await saveLessonProgress(session.db, session.userId, parsedId.data, status);
  return result.error ? { ok: false, message: "Could not save progress." } : { ok: true };
}

export async function recordProjectEvidence(projectId: string, payload: Record<string, string>) {
  const parsedId = idSchema.safeParse(projectId);
  const parsedPayload = evidenceSchema.safeParse(payload);
  if (!parsedId.success || !parsedPayload.success) return { ok: false, message: "Invalid evidence." };
  const session = await currentUserId();
  if (!session) return { ok: false, message: "Sign in to submit evidence." };
  const result = await submitProjectEvidence(session.db, session.userId, parsedId.data, parsedPayload.data);
  return result.error ? { ok: false, message: "Could not save evidence." } : { ok: true, evidenceId: result.data.id };
}
