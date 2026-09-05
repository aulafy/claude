import type { SupabaseClient } from "@supabase/supabase-js";

type BrainDb = SupabaseClient;

export async function saveLessonProgress(db: BrainDb, userId: string, lessonId: string, status: "in_progress" | "completed") {
  const now = new Date().toISOString();
  const { data, error } = await db.from("aulafy_user_lesson_progress").upsert({
    user_id: userId,
    lesson_id: lessonId,
    status,
    started_at: now,
    completed_at: status === "completed" ? now : null,
    last_activity_at: now,
  }, { onConflict: "user_id,lesson_id" }).select("user_id,lesson_id,status,started_at,completed_at,last_activity_at").single();
  return { data, error };
}

export async function submitProjectEvidence(db: BrainDb, userId: string, projectId: string, payload: Record<string, string>) {
  const { data: evidence, error: evidenceError } = await db.from("aulafy_evidence").insert({
    user_id: userId,
    evidence_type: "project_submission",
    status: "submitted",
    payload,
  }).select("id,user_id,evidence_type,status,created_at").single();
  if (evidenceError || !evidence) return { data: null, error: evidenceError };
  const { error: targetError } = await db.from("aulafy_evidence_targets").insert({ evidence_id: evidence.id, project_id: projectId });
  if (targetError) {
    await db.from("aulafy_evidence").delete().eq("id", evidence.id).eq("user_id", userId);
    return { data: null, error: targetError };
  }
  return { data: evidence, error: null };
}

export async function getOwnLearningState(db: BrainDb, userId: string) {
  const [progress, evidence] = await Promise.all([
    db.from("aulafy_user_lesson_progress").select("lesson_id,status,started_at,completed_at,last_activity_at").eq("user_id", userId).order("last_activity_at", { ascending: false }),
    db.from("aulafy_evidence").select("id,evidence_type,status,payload,created_at,verified_at,reviewed_at,reviewed_by,aulafy_evidence_targets(project_id,lesson_id,exercise_id,evaluation_id)").eq("user_id", userId).order("created_at", { ascending: false }),
  ]);
  return { progress: progress.data ?? [], evidence: evidence.data ?? [], error: progress.error ?? evidence.error };
}

export async function verifyEvidence(db: BrainDb, reviewerId: string, evidenceId: string) {
  const reviewedAt = new Date().toISOString();
  const { data, error } = await db.from("aulafy_evidence").update({ status: "verified", verified_at: reviewedAt, reviewed_at: reviewedAt, reviewed_by: reviewerId }).eq("id", evidenceId).eq("status", "submitted").select("id,status,verified_at,reviewed_at,reviewed_by").single();
  return { data, error, reviewerId };
}

export async function rejectEvidence(db: BrainDb, reviewerId: string, evidenceId: string) {
  const { data, error } = await db.from("aulafy_evidence").update({ status: "rejected", reviewed_at: new Date().toISOString(), reviewed_by: reviewerId }).eq("id", evidenceId).eq("status", "submitted").select("id,status,reviewed_at,reviewed_by").single();
  return { data, error, reviewerId };
}
