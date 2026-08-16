"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { LEARNING_PROGRESS_EVENT, readLearningProgress, setSelectedLearningPath, type SelectedLearningPath } from "@/lib/learning-progress";

export default function SelectedLearningPathCard({ locale = "es" }: { locale?: "es" | "en" }) {
  const [path, setPath] = useState<SelectedLearningPath | null>(null);
  const english = locale === "en";

  useEffect(() => {
    const update = () => setPath(readLearningProgress()?.selectedPath ?? null);
    update();
    window.addEventListener(LEARNING_PROGRESS_EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(LEARNING_PROGRESS_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  if (!path || path.locale !== locale) return <section className="selected-path-card selected-path-card--empty" aria-labelledby="selected-path-title">
    <div><span className="aula-section-label"><Icon name="route" /> {english ? "PERSONAL PATH" : "RUTA PERSONAL"}</span><h2 id="selected-path-title">{english ? "Choose a path for your goal" : "Elige una ruta para tu objetivo"}</h2><p>{english ? "The one-minute finder recommends one starting point and can save it here without an account." : "El orientador de un minuto recomienda un único comienzo y puede guardarlo aquí sin crear una cuenta."}</p></div>
    <Link href={english ? "/en/paths#orientador" : "/rutas#orientador"} className="aula-button aula-button-secondary"><Icon name="route" /> {english ? "Find my path" : "Encontrar mi ruta"}</Link>
  </section>;

  return <section className="selected-path-card" aria-labelledby="selected-path-title">
    <div><span className="aula-section-label"><Icon name="route" /> {english ? "YOUR CHOSEN PATH" : "TU RUTA ELEGIDA"}</span><h2 id="selected-path-title">{path.title}</h2><p>{english ? `Your recommended starting point is “${path.firstTitle}”. Only this choice, not your finder answers, is stored in this browser.` : `Tu comienzo recomendado es «${path.firstTitle}». Solo esta elección, no tus respuestas al orientador, se guarda en este navegador.`}</p></div>
    <div className="selected-path-card__actions"><Link href={path.firstHref} className="aula-button aula-button-primary"><Icon name="rocket" /> {english ? "Continue with the first step" : "Continuar con el primer paso"}</Link><Link href={path.href} className="aula-button aula-button-secondary"><Icon name="route" /> {english ? "View full path" : "Ver ruta completa"}</Link><button type="button" className="aula-button aula-button-secondary" onClick={() => setSelectedLearningPath(null)}><Icon name="close" /> {english ? "Remove" : "Quitar"}</button></div>
  </section>;
}
