"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { createEvidenceMarkdown } from "@/lib/evidence-markdown";
import { LEARNING_PROGRESS_EVENT, readLearningProgress, setLearningEvidence, type LearningEvidenceItem } from "@/lib/learning-progress";

export default function LearningEvidenceNotebook({ locale = "es" }: { locale?: "es" | "en" }) {
  const [items, setItems] = useState<LearningEvidenceItem[]>([]);
  const english = locale === "en";

  function downloadMarkdown() {
    if (!items.length) return;
    const markdown = createEvidenceMarkdown(items, locale);
    const url = URL.createObjectURL(new Blob([markdown], { type: "text/markdown;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `aulafy-evidencias-${new Date().toISOString().slice(0, 10)}.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  useEffect(() => {
    const update = () => setItems(readLearningProgress()?.evidenceItems ?? []);
    update();
    window.addEventListener(LEARNING_PROGRESS_EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(LEARNING_PROGRESS_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return <section id="libreta-evidencias" className="learning-evidence-notebook scroll-mt-24" aria-labelledby="evidence-notebook-title">
    <div className="learning-evidence-notebook__head">
      <div><p className="aula-meta"><Icon name="clipboard" /> {english ? "LOCAL NOTEBOOK" : "LIBRETA LOCAL"}</p><h2 id="evidence-notebook-title">{english ? "Evidence from your missions" : "Evidencias de tus misiones"}</h2><p>{english ? "Saved only when you choose to do so. Entries remain in this browser and are included in your progress export." : "Solo se guardan cuando tú lo decides. Permanecen en este navegador y se incluyen al exportar tu progreso."}</p></div>
      <div>{items.length ? <button type="button" onClick={downloadMarkdown}><Icon name="download" /> {english ? "Download .md" : "Descargar .md"}</button> : null}<span>{items.length}/20</span></div>
    </div>
    {items.length === 0 ? <div className="learning-evidence-notebook__empty"><Icon name="clipboard" /><p>{english ? "Complete a practice and use “Save on this device” to build a small portfolio of results." : "Completa una práctica y usa «Guardar en este dispositivo» para crear una pequeña carpeta de resultados."}</p></div> : <ol>
      {items.map((item) => <li key={item.href}>
        <details>
          <summary><span><strong>{item.title}</strong><small>{new Intl.DateTimeFormat(english ? "en-GB" : "es-ES", { dateStyle: "medium" }).format(new Date(item.savedAt))}</small></span><Icon name="chevronRight" /></summary>
          <pre>{item.content}</pre>
          <div><Link href={item.href}><Icon name="book" /> {english ? "Open lesson" : "Abrir lección"}</Link><button type="button" onClick={() => setLearningEvidence(null, item.href)}><Icon name="close" /> {english ? "Delete" : "Borrar"}</button></div>
        </details>
      </li>)}
    </ol>}
  </section>;
}
