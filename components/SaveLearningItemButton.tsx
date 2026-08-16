"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import {
  LEARNING_PROGRESS_EVENT,
  readLearningProgress,
  setLearningItemSaved,
} from "@/lib/learning-progress";

export default function SaveLearningItemButton({ href, title, courseTitle, locale }: { href: string; title: string; courseTitle: string; locale: "es" | "en" }) {
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const update = () => setSaved(readLearningProgress()?.savedItems.some((item) => item.href === href) ?? false);
    update();
    window.addEventListener(LEARNING_PROGRESS_EVENT, update);
    window.addEventListener("storage", update);
    return () => { window.removeEventListener(LEARNING_PROGRESS_EVENT, update); window.removeEventListener("storage", update); };
  }, [href]);
  return <button type="button" aria-pressed={saved} onClick={() => setLearningItemSaved({ href, title, courseTitle, locale }, !saved)} className={`mt-4 flex min-h-9 w-full items-center justify-center gap-2 rounded-md border px-3 py-2 text-xs font-semibold ${saved ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-200" : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"}`}><Icon name={saved ? "check" : "save"} /> {saved ? (locale === "en" ? "Saved for later" : "Guardada para después") : (locale === "en" ? "Save for later" : "Guardar para después")}</button>;
}
