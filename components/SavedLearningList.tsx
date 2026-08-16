"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { LEARNING_PROGRESS_EVENT, readLearningProgress, setLearningItemSaved, type SavedLearningItem } from "@/lib/learning-progress";

export default function SavedLearningList({ locale = "es" }: { locale?: "es" | "en" }) {
  const [items, setItems] = useState<SavedLearningItem[]>([]);
  useEffect(() => {
    const update = () => setItems((readLearningProgress()?.savedItems ?? []).filter((item) => item.locale === locale));
    update();
    window.addEventListener(LEARNING_PROGRESS_EVENT, update);
    window.addEventListener("storage", update);
    return () => { window.removeEventListener(LEARNING_PROGRESS_EVENT, update); window.removeEventListener("storage", update); };
  }, [locale]);
  if (!items.length) return null;
  const en = locale === "en";
  return <section className="aula-panel mt-5 p-5 sm:p-6" aria-labelledby="saved-learning-title">
    <div className="flex flex-wrap items-end justify-between gap-3"><div><span className="aula-section-label"><Icon name="save" /> {en ? "YOUR LOCAL LIST" : "TU LISTA LOCAL"}</span><h2 id="saved-learning-title" className="mt-2 font-display text-xl font-bold text-white">{en ? "Saved for later" : "Guardado para después"}</h2></div><span className="aula-chip" data-tone="cyan">{items.length}/50</span></div>
    <ul className="mt-5 grid gap-2">{items.map((item) => <li key={item.href} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-md border border-zinc-800 bg-zinc-950/35 p-3"><Link href={item.href} className="min-w-0"><span className="aula-meta text-zinc-500">{item.courseTitle}</span><strong className="mt-1 block truncate text-sm text-zinc-100 hover:text-cyan-200">{item.title}</strong></Link><button type="button" onClick={() => setLearningItemSaved(item, false)} className="flex size-9 items-center justify-center rounded-md border border-zinc-800 text-zinc-500 hover:border-rose-400/50 hover:text-rose-300" aria-label={`${en ? "Remove" : "Quitar"}: ${item.title}`} title={en ? "Remove from list" : "Quitar de la lista"}><Icon name="close" /></button></li>)}</ul>
  </section>;
}
