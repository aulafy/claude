"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import {
  LEARNING_EVENTS_CHANGED,
  clearLearningEvents,
  readLearningEvents,
  type LocalLearningEvents,
} from "@/lib/learning-events";

export default function LearningActivitySummary({ locale = "es" }: { locale?: "es" | "en" }) {
  const [events, setEvents] = useState<LocalLearningEvents>({ counts: {} });
  const english = locale === "en";

  useEffect(() => {
    const update = () => setEvents(readLearningEvents());
    update();
    window.addEventListener(LEARNING_EVENTS_CHANGED, update);
    return () => window.removeEventListener(LEARNING_EVENTS_CHANGED, update);
  }, []);

  const actions = Object.values(events.counts).reduce((sum, count) => sum + (count ?? 0), 0);
  if (!actions) return null;

  return <details className="learning-activity-summary">
    <summary><Icon name="chart" /> {english ? "Activity on this device" : "Actividad en este dispositivo"} <span>{actions}</span></summary>
    <div>
      <p>{english ? "The detailed counts stay in this browser. If aggregate metrics are enabled, Aulafy receives only a daily event-name count, never prompts, answers, search text, paths, accounts, or personal identifiers." : "El detalle permanece en este navegador. Si las métricas agregadas están activadas, Aulafy recibe solo un contador diario por tipo de evento, nunca prompts, respuestas, texto buscado, rutas, cuentas ni identificadores personales."}</p>
      <dl>
        <div><dt>{english ? "Missions started" : "Misiones iniciadas"}</dt><dd>{events.counts.mission_start ?? 0}</dd></div>
        <div><dt>{english ? "Missions completed" : "Misiones completadas"}</dt><dd>{events.counts.mission_complete ?? 0}</dd></div>
        <div><dt>{english ? "Searches used" : "Búsquedas utilizadas"}</dt><dd>{events.counts.search_used ?? 0}</dd></div>
        <div><dt>{english ? "Searches without results" : "Búsquedas sin resultados"}</dt><dd>{events.counts.search_no_results ?? 0}</dd></div>
        <div><dt>{english ? "Paths chosen" : "Rutas elegidas"}</dt><dd>{events.counts.route_selected ?? 0}</dd></div>
        <div><dt>{english ? "Next lessons" : "Avances de lección"}</dt><dd>{events.counts.next_lesson_click ?? 0}</dd></div>
        <div><dt>{english ? "Lessons read to 90%" : "Lecciones leídas al 90 %"}</dt><dd>{events.counts.lesson_90 ?? 0}</dd></div>
        <div><dt>{english ? "Returns using Continue" : "Regresos con Continuar"}</dt><dd>{events.counts.continue_return ?? 0}</dd></div>
        <div><dt>{english ? "Returns after 7 days" : "Regresos tras 7 días"}</dt><dd>{events.counts.return_7d ?? 0}</dd></div>
        <div><dt>{english ? "Returns after 30 days" : "Regresos tras 30 días"}</dt><dd>{events.counts.return_30d ?? 0}</dd></div>
        <div><dt>{english ? "Useful ratings" : "Valoraciones útiles"}</dt><dd>{events.counts.feedback_useful ?? 0}</dd></div>
        <div><dt>{english ? "External sources opened" : "Fuentes externas consultadas"}</dt><dd>{events.counts.external_source_open ?? 0}</dd></div>
      </dl>
      <button type="button" onClick={clearLearningEvents}>{english ? "Clear activity counters" : "Borrar contadores de actividad"}</button>
    </div>
  </details>;
}
