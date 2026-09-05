import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/social/config";
import { loadContentRegistry } from "@/lib/content/registry";
import { createLearningLoop } from "@/lib/brain/learning-loop";
import BrainProgressPanel from "@/components/BrainProgressPanel";

export const metadata: Metadata = { title: "Tu ruta de aprendizaje | Aulafy", description: "Guarda el progreso de tu ruta de IA local y envía evidencias verificables.", robots: { index: false, follow: false } };

export default async function BrainPage() {
  const documents = loadContentRegistry();
  const loop = createLearningLoop(documents);
  let userId: string | null = null;
  if (isSupabaseConfigured()) {
    const db = await createSupabaseServerClient();
    const { data } = await db.auth.getClaims();
    userId = typeof data?.claims?.sub === "string" ? data.claims.sub : null;
  }
  const statuses = new Map<string, "not_started" | "in_progress" | "completed">();
  if (userId && isSupabaseConfigured()) {
    const db = await createSupabaseServerClient();
    const { data } = await db.from("aulafy_user_lesson_progress").select("status,aulafy_lessons(content_id)").eq("user_id", userId);
    for (const row of (data ?? []) as Array<{ status?: string; aulafy_lessons?: { content_id?: string } | Array<{ content_id?: string }> }>) { const contentId = Array.isArray(row.aulafy_lessons) ? row.aulafy_lessons[0]?.content_id : row.aulafy_lessons?.content_id; if (contentId && (row.status === "in_progress" || row.status === "completed")) statuses.set(contentId, row.status); }
  }
  return <div className="mx-auto max-w-6xl px-6 py-14"><p className="aula-section-label">AULAFY BRAIN · LOCAL AI</p><h1 className="mt-4 font-display text-4xl font-extrabold text-white">Aprende construyendo un sistema local</h1><p className="mt-4 max-w-2xl text-lg text-zinc-300">Una ruta corta con lecciones, un proyecto y evidencia. El progreso se basa en acciones guardadas, no en una barra decorativa.</p><div className="mt-8"><BrainProgressPanel authenticated={Boolean(userId)} lessons={loop.path.map((lesson) => ({ id: lesson.id, title: lesson.title, status: statuses.get(lesson.id) ?? "not_started" }))} /></div></div>;
}
