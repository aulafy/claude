"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { recordLessonProgress, recordProjectEvidence } from "@/app/brain/actions";

type Lesson = { id: string; title: string; status: "not_started" | "in_progress" | "completed" };
export default function BrainProgressPanel({ lessons, authenticated }: { lessons: Lesson[]; authenticated: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [evidence, setEvidence] = useState({ model: "", task: "", result: "" });
  const completed = lessons.filter((lesson) => lesson.status === "completed").length;
  const updateLesson = (id: string, status: "in_progress" | "completed") => startTransition(async () => {
    const result = await recordLessonProgress(id, status);
    setMessage(result.ok ? "Progreso guardado." : result.message ?? "No se pudo guardar el progreso.");
  });
  const submitEvidence = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      const result = await recordProjectEvidence("run-local-llm", evidence);
      setMessage(result.ok ? "Evidencia enviada para revisión." : result.message ?? "No se pudo enviar la evidencia.");
    });
  };
  if (!authenticated) return <div className="aula-panel p-5"><p className="text-zinc-200">Inicia sesión para guardar tu progreso y enviar evidencia.</p><Link className="aula-button aula-button-primary mt-4 inline-flex" href="/acceso?next=%2Fbrain">Entrar</Link></div>;
  return <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
    <section className="aula-panel p-5">
      <div className="flex items-baseline justify-between gap-4"><h2 className="font-display text-2xl font-bold text-white">Learn</h2><span className="text-sm text-zinc-400">{completed}/{lessons.length} completadas</span></div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800"><div className="h-full bg-emerald-400 transition-all" style={{ width: `${lessons.length ? Math.round(completed / lessons.length * 100) : 0}%` }} /></div>
      <ol className="mt-5 grid gap-3">{lessons.map((lesson, index) => <li key={lesson.id} className="flex items-center justify-between gap-3 rounded-lg border border-zinc-800 p-3"><span><span className="mr-2 text-xs text-zinc-500">{index + 1}</span>{lesson.title}</span><button type="button" disabled={isPending || lesson.status === "completed"} onClick={() => updateLesson(lesson.id, lesson.status === "not_started" ? "in_progress" : "completed")} className="aula-button aula-button-secondary text-xs">{lesson.status === "completed" ? "Completada" : lesson.status === "in_progress" ? "Completar" : "Empezar"}</button></li>)}</ol>
    </section>
    <section className="aula-panel p-5"><h2 className="font-display text-2xl font-bold text-white">Build · Verify</h2><p className="mt-2 text-sm text-zinc-400">Run a local model for one useful task, then submit only what you actually checked.</p><form onSubmit={submitEvidence} className="mt-5 grid gap-3">{(["model", "task", "result"] as const).map((field) => <label key={field} className="grid gap-1 text-sm text-zinc-300"><span>{field === "model" ? "Model" : field === "task" ? "Task" : "Checked result"}</span><input required value={evidence[field]} onChange={(event) => setEvidence({ ...evidence, [field]: event.target.value })} className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-white" /></label>)}<button disabled={isPending || completed < lessons.length} className="aula-button aula-button-primary mt-2" type="submit">{isPending ? "Guardando…" : "Enviar evidencia"}</button></form>{message && <p role="status" className="mt-4 text-sm text-zinc-300">{message}</p>}</section>
  </div>;
}
