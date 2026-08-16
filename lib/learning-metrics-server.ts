import "server-only";
import {
  learningEventNames,
  type LearningEventName,
  type LearningMetricRow,
} from "@/lib/learning-metrics";

export type LearningMetricsResult =
  | { status: "disabled" }
  | { status: "unconfigured" }
  | { status: "error" }
  | { status: "ready"; rows: LearningMetricRow[] };

function getPreviewRows(): LearningMetricRow[] {
  const events: Array<[LearningEventName, number]> = [
    ["landing_view", 120], ["mission_start", 71], ["mission_complete", 38],
    ["lesson_25", 94], ["lesson_90", 51], ["next_lesson_click", 33],
    ["search_used", 42], ["search_no_results", 11], ["continue_return", 24],
    ["feedback_useful", 19], ["route_view", 36], ["task_open", 29],
  ];
  return Array.from({ length: 10 }, (_, index) => {
    const day = new Date(Date.UTC(2026, 7, 7 + index)).toISOString().slice(0, 10);
    return events.map(([event_name, base]) => ({
      event_day: day,
      event_name,
      event_count: Math.max(1, Math.round(base * (0.055 + index * 0.008))),
    }));
  }).flat();
}

function isLearningEventName(value: unknown): value is LearningEventName {
  return typeof value === "string" && learningEventNames.includes(value as LearningEventName);
}

export async function getAggregateLearningMetrics(days: number): Promise<LearningMetricsResult> {
  if (process.env.NODE_ENV !== "production" && process.env.AULAFY_METRICS_PREVIEW === "true") {
    return { status: "ready", rows: getPreviewRows() };
  }
  if (process.env.NEXT_PUBLIC_AULAFY_AGGREGATE_METRICS_ENABLED !== "true") {
    return { status: "disabled" };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { status: "unconfigured" };

  try {
    const response = await fetch(`${url}/rest/v1/rpc/get_learning_event_summary`, {
      method: "POST",
      headers: {
        apikey: key,
        authorization: `Bearer ${key}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ p_days: Math.max(1, Math.min(days, 365)) }),
      cache: "no-store",
    });
    if (!response.ok) return { status: "error" };

    const payload: unknown = await response.json();
    if (!Array.isArray(payload)) return { status: "error" };
    const rows = payload.flatMap((row): LearningMetricRow[] => {
      if (
        typeof row !== "object" || row === null ||
        typeof (row as Record<string, unknown>).event_day !== "string" ||
        !isLearningEventName((row as Record<string, unknown>).event_name)
      ) return [];
      const count = Number((row as Record<string, unknown>).event_count);
      if (!Number.isFinite(count) || count < 0) return [];
      return [{
        event_day: (row as Record<string, unknown>).event_day as string,
        event_name: (row as Record<string, unknown>).event_name as LearningEventName,
        event_count: count,
      }];
    });
    return { status: "ready", rows };
  } catch {
    return { status: "error" };
  }
}
