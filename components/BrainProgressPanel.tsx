"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { recordLessonProgress, recordProjectEvidence } from "@/app/brain/actions";

type Lesson = { id: string; title: string; status: "not_started" | "in_progress" | "completed" };
type Evidence = { id: string; status: string; created_at: string; reviewed_at: string | null };
export default function BrainProgressPanel({ lessons, authenticated, evidence: submittedEvidence, english = false }: { lessons: Lesson[]; authenticated: boolean; evidence: Evidence[]; english?: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [lessonItems, setLessonItems] = useState(lessons);
  const [formEvidence, setFormEvidence] = useState({ model: "", task: "", result: "" });
  const [evidenceItems, setEvidenceItems] = useState(submittedEvidence);
  const completed = lessonItems.filter((lesson) => lesson.status === "completed").length;
  const updateLesson = (id: string, status: "in_progress" | "completed") => startTransition(async () => {
    const result = await recordLessonProgress(id, status);
    if (result.ok) {
      setLessonItems((current) => current.map((lesson) => lesson.id === id ? { ...lesson, status } : lesson));
      setMessage(english ? "Progress saved." : "Progreso guardado.");
    } else setMessage(result.message ?? (english ? "Could not save progress." : "No se pudo guardar el progreso."));
  });
  const submitEvidence = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      const result = await recordProjectEvidence("run-local-llm", formEvidence);
      if (result.ok) {
        setEvidenceItems((current) => [{ id: result.evidenceId, status: "submitted", created_at: new Date().toISOString(), reviewed_at: null }, ...current]);
        setFormEvidence({ model: "", task: "", result: "" });
        setMessage(english ? "Evidence submitted for review." : "Evidencia enviada para revisión.");
      } else setMessage(result.message ?? (english ? "Could not submit evidence." : "No se pudo enviar la evidencia."));
    });
  };
  if (!authenticated) return <div className="aula-panel p-5"><p className="text-zinc-200">{english ? "Sign in to save your progress and submit evidence." : "Inicia sesión para guardar tu progreso y enviar evidencia."}</p><Link className="aula-button aula-button-primary mt-4 inline-flex" href={english ? "/acceso?next=%2Fen%2Fbrain" : "/acceso?next=%2Fbrain"}>{english ? "Sign in" : "Entrar"}</Link></div>;
  const evidenceLabel = (status: string) => english ? status === "verified" ? "Verified" : status === "rejected" ? "Rejected: correct and resubmit" : "Pending review" : status === "verified" ? "Verificada" : status === "rejected" ? "Rechazada: corrige y vuelve a enviar" : "Pendiente de revisión";
  const evidenceTone = (status: string) => status === "verified" ? "text-emerald-300" : status === "rejected" ? "text-red-300" : "text-amber-300";
  const reviewedLabel = (item: Evidence) => item.reviewed_at ? `${english ? "Reviewed" : "Revisada"} ${new Intl.DateTimeFormat(english ? "en-US" : "es-ES", { dateStyle: "medium" }).format(new Date(item.reviewed_at))}` : undefined;
  return <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
    <section className="aula-panel p-5">
      <div className="flex items-baseline justify-between gap-4"><h2 className="font-display text-2xl font-bold text-white">{english ? "Learn" : "Aprende"}</h2><span className="text-sm text-zinc-400">{completed}/{lessons.length} {english ? "completed" : "completadas"}</span></div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800"><div className="h-full bg-emerald-400 transition-all" style={{ width: `${lessons.length ? Math.round(completed / lessons.length * 100) : 0}%` }} /></div>
      <ol className="mt-5 grid gap-3">{lessonItems.map((lesson, index) => <li key={lesson.id} className="flex items-center justify-between gap-3 rounded-lg border border-zinc-800 p-3"><span><span className="mr-2 text-xs text-zinc-500">{index + 1}</span>{lesson.title}</span><button type="button" disabled={isPending || lesson.status === "completed"} onClick={() => updateLesson(lesson.id, lesson.status === "not_started" ? "in_progress" : "completed")} className="aula-button aula-button-secondary text-xs">{lesson.status === "completed" ? (english ? "Completed" : "Completada") : lesson.status === "in_progress" ? (english ? "Complete" : "Completar") : (english ? "Start" : "Empezar")}</button></li>)}</ol>
    </section>
    <section className="aula-panel p-5"><h2 className="font-display text-2xl font-bold text-white">Build · Verify</h2><p className="mt-2 text-sm text-zinc-400">Run a local model for one useful task, then submit only what you actually checked.</p><form onSubmit={submitEvidence} className="mt-5 grid gap-3">{(["model", "task", "result"] as const).map((field) => <label key={field} className="grid gap-1 text-sm text-zinc-300"><span>{field === "model" ? "Model" : field === "task" ? "Task" : "Checked result"}</span><input required value={formEvidence[field]} onChange={(event) => setFormEvidence({ ...formEvidence, [field]: event.target.value })} className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-white" /></label>)}<button disabled={isPending || completed < lessons.length} className="aula-button aula-button-primary mt-2" type="submit">{isPending ? "Guardando…" : "Enviar evidencia"}</button></form>{evidenceItems.length > 0 && <div className="mt-6 border-t border-zinc-800 pt-4"><p className="aula-meta">MIS EVIDENCIAS</p><ul className="mt-3 grid gap-2">{evidenceItems.map((item) => <li key={item.id} className="flex items-center justify-between gap-3 text-sm"><span className="font-mono text-xs text-zinc-500">{item.id.slice(0, 8)}</span><span className={evidenceTone(item.status)}>{evidenceLabel(item.status)}{reviewedLabel(item) && <small className="ml-2 text-zinc-500">({reviewedLabel(item)})</small>}</span></li>)}</ul></div>}{message && <p role="status" className="mt-4 text-sm text-zinc-300">{message}</p>}</section>
  </div>;
}
