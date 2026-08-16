"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { LEARNING_PROGRESS_EVENT, readLearningProgress, type LearningProgress } from "@/lib/learning-progress";
import { createPathCompletionMarkdown, isSevenDayPathComplete } from "@/lib/path-completion";

export default function PathCompletionSummary({ locale = "es" }: { locale?: "es" | "en" }) {
  const [progress, setProgress] = useState<LearningProgress | null>(null);
  const english = locale === "en";

  useEffect(() => {
    const update = () => setProgress(readLearningProgress());
    update();
    window.addEventListener(LEARNING_PROGRESS_EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(LEARNING_PROGRESS_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  if (!progress || !isSevenDayPathComplete(progress, locale)) return null;

  function download() {
    if (!progress) return;
    const markdown = createPathCompletionMarkdown(progress, locale);
    const url = URL.createObjectURL(new Blob([markdown], { type: "text/markdown;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `aulafy-ruta-completada-${new Date().toISOString().slice(0, 10)}.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return <section className="path-completion-summary" aria-labelledby="path-completion-title">
    <div className="path-completion-summary__head"><span><Icon name="star" /></span><div><p className="aula-meta">{english ? "7 OF 7 MISSIONS" : "7 DE 7 MISIONES"}</p><h2 id="path-completion-title">{english ? "You completed the beginner path" : "Has completado la ruta inicial"}</h2><p>{english ? "This is a personal summary based on progress stored in this browser, not an academic credential or identity check." : "Es un resumen personal basado en el progreso de este navegador, no una acreditación académica ni una comprobación de identidad."}</p></div></div>
    <dl><div><dt>{english ? "Missions" : "Misiones"}</dt><dd>7/7</dd></div><div><dt>{english ? "Active days" : "Días activos"}</dt><dd>{progress.activityDays.length}</dd></div><div><dt>{english ? "Evidence" : "Evidencias"}</dt><dd>{progress.evidenceItems.length}</dd></div></dl>
    <div className="path-completion-summary__actions"><button type="button" onClick={download}><Icon name="download" /> {english ? "Download summary .md" : "Descargar resumen .md"}</button><Link href="#libreta-evidencias"><Icon name="clipboard" /> {english ? "Review evidence" : "Revisar evidencias"}</Link></div>
  </section>;
}
