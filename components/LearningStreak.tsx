"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { LEARNING_PROGRESS_EVENT, readLearningProgress } from "@/lib/learning-progress";
import { recentLearningDays, summarizeLearningStreak } from "@/lib/learning-streak";

export default function LearningStreak({ locale = "es" }: { locale?: "es" | "en" }) {
  const [activityDays, setActivityDays] = useState<string[]>([]);
  const [today, setToday] = useState<Date | null>(null);
  const english = locale === "en";

  useEffect(() => {
    const update = () => {
      setActivityDays(readLearningProgress()?.activityDays ?? []);
      setToday(new Date());
    };
    update();
    window.addEventListener(LEARNING_PROGRESS_EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(LEARNING_PROGRESS_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  if (!today) return null;
  const summary = summarizeLearningStreak(activityDays);
  const recent = recentLearningDays(activityDays, today);
  const formatter = new Intl.DateTimeFormat(english ? "en-US" : "es-ES", { weekday: "short" });

  return <section className="learning-streak" aria-labelledby="learning-streak-title">
    <div className="learning-streak__copy">
      <span><Icon name="calendar" /></span>
      <div>
        <p className="aula-meta">{english ? "LEARNING RHYTHM" : "RITMO DE APRENDIZAJE"}</p>
        <h2 id="learning-streak-title">{summary.current} {english ? (summary.current === 1 ? "active day in a row" : "active days in a row") : (summary.current === 1 ? "día activo seguido" : "días activos seguidos")}</h2>
        <p>{english ? "Only days when you complete a mission or lesson count." : "Solo cuentan los días en que completas una misión o lección."}</p>
      </div>
    </div>
    <dl>
      <div><dt>{english ? "Best" : "Mejor"}</dt><dd>{summary.best}</dd></div>
      <div><dt>{english ? "Active days" : "Días activos"}</dt><dd>{summary.totalDays}</dd></div>
    </dl>
    <ol aria-label={english ? "Activity during the last seven days" : "Actividad durante los últimos siete días"}>
      {recent.map((day) => {
        const [year, month, date] = day.value.split("-").map(Number);
        const label = formatter.format(new Date(year, month - 1, date)).replace(".", "");
        return <li key={day.value} className={day.active ? "is-active" : ""} title={day.value} aria-label={`${label}, ${day.active ? (english ? "completed activity" : "actividad completada") : (english ? "no completed activity" : "sin actividad completada")}`}><span aria-hidden="true">{label.slice(0, 2)}</span><i aria-hidden="true" /></li>;
      })}
    </ol>
  </section>;
}
