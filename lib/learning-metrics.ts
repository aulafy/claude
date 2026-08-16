export const learningEventNames = [
  "landing_view",
  "mission_start",
  "mission_complete",
  "route_view",
  "route_step_toggle",
  "route_selected",
  "search_used",
  "search_no_results",
  "lesson_25",
  "lesson_50",
  "lesson_90",
  "next_lesson_click",
  "continue_return",
  "return_7d",
  "return_30d",
  "feedback_useful",
  "task_open",
  "external_source_open",
] as const;

export type LearningEventName = (typeof learningEventNames)[number];

export type LearningMetricRow = {
  event_day: string;
  event_name: LearningEventName;
  event_count: number;
};

export const learningEventLabels: Record<LearningEventName, string> = {
  landing_view: "Portada vista",
  mission_start: "Misión iniciada",
  mission_complete: "Misión completada",
  route_view: "Ruta consultada",
  route_step_toggle: "Paso de ruta cambiado",
  route_selected: "Ruta elegida",
  search_used: "Búsqueda realizada",
  search_no_results: "Búsqueda sin resultados",
  lesson_25: "Lección al 25 %",
  lesson_50: "Lección al 50 %",
  lesson_90: "Lección al 90 %",
  next_lesson_click: "Siguiente lección",
  continue_return: "Aprendizaje retomado",
  return_7d: "Retorno tras 7 días",
  return_30d: "Retorno tras 30 días",
  feedback_useful: "Lección útil",
  task_open: "Tarea abierta",
  external_source_open: "Fuente externa consultada",
};

type FunnelDefinition = {
  label: string;
  numerator: LearningEventName;
  denominator: LearningEventName;
  inverse?: boolean;
};

const funnelDefinitions: FunnelDefinition[] = [
  { label: "Portada → iniciar misión", numerator: "mission_start", denominator: "landing_view" },
  { label: "Iniciar → completar misión", numerator: "mission_complete", denominator: "mission_start" },
  { label: "Leer 25 % → llegar al 90 %", numerator: "lesson_90", denominator: "lesson_25" },
  { label: "Llegar al 90 % → continuar", numerator: "next_lesson_click", denominator: "lesson_90" },
  { label: "Búsquedas sin respuesta", numerator: "search_no_results", denominator: "search_used", inverse: true },
];

export function summarizeLearningMetrics(rows: LearningMetricRow[]) {
  const totals = new Map<LearningEventName, number>();
  const daily = new Map<string, Map<LearningEventName, number>>();

  for (const row of rows) {
    const count = Number(row.event_count) || 0;
    totals.set(row.event_name, (totals.get(row.event_name) ?? 0) + count);
    const day = daily.get(row.event_day) ?? new Map<LearningEventName, number>();
    day.set(row.event_name, (day.get(row.event_name) ?? 0) + count);
    daily.set(row.event_day, day);
  }

  const total = (event: LearningEventName) => totals.get(event) ?? 0;
  const funnel = funnelDefinitions.map((definition) => {
    const numerator = total(definition.numerator);
    const denominator = total(definition.denominator);
    return {
      label: definition.label,
      inverse: definition.inverse ?? false,
      numeratorEvent: definition.numerator,
      denominatorEvent: definition.denominator,
      numerator,
      denominator,
      rate: denominator ? (numerator / denominator) * 100 : null,
    };
  });

  const signals = funnel.flatMap((item) => {
    if (item.rate === null) return [];
    if (item.inverse && item.rate >= 20) {
      return [`${item.rate.toFixed(0)} % de las búsquedas no encuentra contenido: conviene revisar términos y huecos.`];
    }
    if (!item.inverse && item.rate < 45) {
      return [`${item.label} está en ${item.rate.toFixed(0)} %: revisa claridad, esfuerzo y siguiente acción.`];
    }
    return [];
  });

  const days = [...daily.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([day, events]) => ({
      day,
      starts: events.get("mission_start") ?? 0,
      completions: events.get("mission_complete") ?? 0,
      deepReads: events.get("lesson_90") ?? 0,
      returns: (events.get("return_7d") ?? 0) + (events.get("return_30d") ?? 0),
    }));

  return { totals, total, funnel, signals, days };
}
