"use client";

import { useState, useTransition } from "react";
import { rejectEvidence, verifyEvidence } from "@/app/brain/actions";

type Evidence = { id: string; created_at: string; payload: Record<string, unknown> | null };

export default function EvidenceReviewQueue({ initialEvidence }: { initialEvidence: Evidence[] }) {
  const [items, setItems] = useState(initialEvidence);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const review = (id: string, decision: "verify" | "reject") => startTransition(async () => {
    const result = await (decision === "verify" ? verifyEvidence(id) : rejectEvidence(id));
    if (result.ok) setItems((current) => current.filter((item) => item.id !== id));
    setMessage(result.ok ? decision === "verify" ? "Evidencia verificada." : "Evidencia rechazada." : result.message ?? "No se pudo revisar.");
  });

  return (
    <section className="aula-panel mt-8 p-5 sm:p-7" aria-labelledby="brain-review-title">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div><p className="aula-meta">AULAFY BRAIN</p><h2 id="brain-review-title" className="mt-1 font-display text-2xl font-bold text-white">Evidencias pendientes</h2></div>
        <span className="text-sm text-zinc-400">{items.length} por revisar</span>
      </div>
      {items.length ? <div className="mt-5 grid gap-3">{items.map((item) => <article key={item.id} className="rounded-lg border border-zinc-800 p-4"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="font-mono text-xs text-zinc-500">{item.id}</p><p className="mt-1 text-xs text-zinc-500">{new Intl.DateTimeFormat("es-ES", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.created_at))}</p></div><div className="flex gap-2"><button type="button" disabled={isPending} onClick={() => review(item.id, "reject")} className="aula-button aula-button-secondary text-xs">Rechazar</button><button type="button" disabled={isPending} onClick={() => review(item.id, "verify")} className="aula-button aula-button-primary text-xs">Verificar</button></div></div><dl className="mt-4 grid gap-2 sm:grid-cols-3">{Object.entries(item.payload ?? {}).map(([key, value]) => <div key={key}><dt className="text-xs uppercase text-zinc-500">{key}</dt><dd className="mt-1 break-words text-sm text-zinc-200">{String(value)}</dd></div>)}</dl></article>)}</div> : <p className="mt-5 text-sm text-zinc-400">No hay evidencias pendientes.</p>}
      {message && <p role="status" className="mt-4 text-sm text-zinc-300">{message}</p>}
    </section>
  );
}
