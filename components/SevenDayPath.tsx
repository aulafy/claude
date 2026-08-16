"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import LearningActivitySummary from "@/components/LearningActivitySummary";
import LearningCalendarPlanner from "@/components/LearningCalendarPlanner";
import LearningEvidenceNotebook from "@/components/LearningEvidenceNotebook";
import LearningStreak from "@/components/LearningStreak";
import ProgressTransfer from "@/components/ProgressTransfer";
import PathCompletionSummary from "@/components/PathCompletionSummary";
import SavedLearningList from "@/components/SavedLearningList";
import SelectedLearningPathCard from "@/components/SelectedLearningPathCard";
import { trackLearningEvent } from "@/lib/learning-events";
import {
  LEARNING_PROGRESS_EVENT,
  clearLearningProgress,
  readLearningProgress,
  saveLearningProgress,
  setLearningStepCompleted,
} from "@/lib/learning-progress";
import { sevenDayPath } from "@/lib/seven-day-path";

export default function SevenDayPath({ locale = "es" }: { locale?: "es" | "en" }) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [started, setStarted] = useState<string[]>([]);
  const english = locale === "en";
  const items = sevenDayPath[locale];

  useEffect(() => {
    trackLearningEvent("route_view");
    const update = () => { const progress = readLearningProgress(); setCompleted(progress?.completedLessons ?? []); setStarted(progress?.startedLessons ?? []); };
    const current = readLearningProgress();
    if (!current) {
      const first = items[0];
      saveLearningProgress({
        href: first.href,
        title: first.title,
        courseTitle: english ? "Aulafy 7-day path" : "Ruta de 7 días de Aulafy",
        locale,
        visitedAt: new Date().toISOString(),
      });
    }
    update();
    window.addEventListener(LEARNING_PROGRESS_EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(LEARNING_PROGRESS_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, [english, items, locale]);

  const done = items.filter((item) => completed.includes(item.href)).length;
  const next = items.find((item) => !completed.includes(item.href));

  return (
    <div className="seven-day-path">
      <SelectedLearningPathCard locale={locale} />
      <section className="seven-day-path__progress" aria-label={english ? "Path progress" : "Progreso de la ruta"}>
        <div><span>{done}/7</span><div><h2>{english ? "Your local progress" : "Tu progreso local"}</h2><p>{english ? "Saved only in this browser." : "Guardado únicamente en este navegador."}</p></div></div>
        <progress value={done} max={7}>{done}/7</progress>
        {next ? <Link href={next.href}>{english ? `Continue with day ${next.day}` : `Continuar con el día ${next.day}`} <Icon name="chevronRight" /></Link> : <strong><Icon name="star" /> {english ? "Path completed" : "Ruta completada"}</strong>}
      </section>
      <LearningStreak locale={locale} />

      <ol>
        {items.map((item) => {
          const isDone = completed.includes(item.href);
          const isStarted = !isDone && started.includes(item.href);
          return <li key={item.href} className={isDone ? "is-complete" : (isStarted ? "is-started" : "")}>
            <label>
              <input type="checkbox" checked={isDone} onChange={(event) => { trackLearningEvent("route_step_toggle"); setLearningStepCompleted(item.href, event.target.checked); }} />
              <span><Icon name={isDone ? "check" : "calendar"} /></span>
              <small>{english ? "Day" : "Día"} {item.day}{isStarted ? <em>{english ? "In progress" : "En curso"}</em> : null}</small>
            </label>
            <div><h2>{item.title}</h2><p>{item.result}</p></div>
            <span>≈ {item.minutes} min</span>
            <Link href={item.href}>{isDone ? (english ? "Review" : "Revisar") : (isStarted ? (english ? "Continue" : "Continuar") : (english ? "Start" : "Empezar"))} <Icon name="chevronRight" /></Link>
          </li>;
        })}
      </ol>
      <div className="seven-day-path__note"><p><Icon name="idea" /> {english ? "Seven days is a suggested rhythm, not a deadline. Repeat a mission whenever its evidence is not convincing yet." : "Siete días es un ritmo sugerido, no una fecha límite. Repite una misión cuando su evidencia todavía no te convenza."}</p><button type="button" onClick={clearLearningProgress}>{english ? "Reset local path" : "Reiniciar ruta local"}</button></div>
      <PathCompletionSummary locale={locale} />
      <LearningCalendarPlanner locale={locale} />
      <SavedLearningList locale={locale} />
      <LearningEvidenceNotebook locale={locale} />
      <ProgressTransfer locale={locale} />
      <LearningActivitySummary locale={locale} />
    </div>
  );
}
