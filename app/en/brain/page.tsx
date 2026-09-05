import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/social/config";
import { loadContentRegistry } from "@/lib/content/registry";
import { createLearningLoop } from "@/lib/brain/learning-loop";
import { getOwnLearningState } from "@/lib/brain/persistence";
import BrainProgressPanel from "@/components/BrainProgressPanel";

export const metadata: Metadata = { title: "Your learning path | Aulafy", description: "Save your local AI learning progress and submit verifiable evidence.", robots: { index: false, follow: false } };

export default async function EnglishBrainPage() {
  const loop = createLearningLoop(loadContentRegistry());
  let userId: string | null = null;
  let evidence: Array<{ id: string; status: string; created_at: string }> = [];
  const statuses = new Map<string, "not_started" | "in_progress" | "completed">();
  if (isSupabaseConfigured()) {
    const db = await createSupabaseServerClient();
    const { data } = await db.auth.getClaims();
    userId = typeof data?.claims?.sub === "string" ? data.claims.sub : null;
    if (userId) {
      const [progress, ownState] = await Promise.all([
        db.from("aulafy_user_lesson_progress").select("status,aulafy_lessons(content_id)").eq("user_id", userId),
        getOwnLearningState(db, userId),
      ]);
      for (const row of (progress.data ?? []) as Array<{ status?: string; aulafy_lessons?: { content_id?: string } | Array<{ content_id?: string }> }>) {
        const linked = Array.isArray(row.aulafy_lessons) ? row.aulafy_lessons[0]?.content_id : row.aulafy_lessons?.content_id;
        if (linked && (row.status === "in_progress" || row.status === "completed")) statuses.set(linked, row.status);
      }
      evidence = ownState.evidence.map((item) => ({ id: item.id, status: item.status, created_at: item.created_at }));
    }
  }
  return <div className="mx-auto max-w-6xl px-6 py-14"><p className="aula-section-label">AULAFY BRAIN · LOCAL AI</p><h1 className="mt-4 font-display text-4xl font-extrabold text-white">Learn by building a local system</h1><p className="mt-4 max-w-2xl text-lg text-zinc-300">A short path with lessons, one project, and evidence. Progress comes from saved actions, not a decorative progress bar.</p><div className="mt-8"><BrainProgressPanel authenticated={Boolean(userId)} lessons={loop.path.map((lesson) => ({ id: lesson.id, title: lesson.title, status: statuses.get(lesson.id) ?? "not_started" }))} evidence={evidence} /></div></div>;
}
