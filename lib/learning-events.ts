export const LEARNING_EVENTS_KEY = "aulafy.learning-events.v1";
export const LEARNING_EVENTS_CHANGED = "aulafy:learning-events";
const AGGREGATE_SENT_KEY = "aulafy.aggregate-events-sent.v1";
const pendingAggregateEvents = new Set<string>();

export type LearningEventName =
  | "landing_view"
  | "mission_start"
  | "mission_complete"
  | "route_view"
  | "route_step_toggle"
  | "route_selected"
  | "search_used"
  | "search_no_results"
  | "lesson_25"
  | "lesson_50"
  | "lesson_90"
  | "next_lesson_click"
  | "continue_return"
  | "return_7d"
  | "return_30d"
  | "feedback_useful"
  | "task_open"
  | "external_source_open";

export type LocalLearningEvents = {
  counts: Partial<Record<LearningEventName, number>>;
  lastEvent?: LearningEventName;
  lastEventAt?: string;
};

export function readLearningEvents(): LocalLearningEvents {
  if (typeof window === "undefined") return { counts: {} };
  try {
    const value = window.localStorage.getItem(LEARNING_EVENTS_KEY);
    if (!value) return { counts: {} };
    const parsed = JSON.parse(value) as LocalLearningEvents;
    return { counts: parsed.counts ?? {}, lastEvent: parsed.lastEvent, lastEventAt: parsed.lastEventAt };
  } catch {
    return { counts: {} };
  }
}

export function trackLearningEvent(name: LearningEventName) {
  if (typeof window === "undefined") return;
  const current = readLearningEvents();
  const next: LocalLearningEvents = {
    counts: { ...current.counts, [name]: (current.counts[name] ?? 0) + 1 },
    lastEvent: name,
    lastEventAt: new Date().toISOString(),
  };
  window.localStorage.setItem(LEARNING_EVENTS_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(LEARNING_EVENTS_CHANGED));
  void sendAggregateEvent(name);
}

async function sendAggregateEvent(name: LearningEventName) {
  if (process.env.NEXT_PUBLIC_AULAFY_AGGREGATE_METRICS_ENABLED !== "true") return;

  const day = new Date().toISOString().slice(0, 10);
  const eventKey = `${day}:${name}`;
  let sent: string[] = [];
  try {
    sent = JSON.parse(window.localStorage.getItem(AGGREGATE_SENT_KEY) ?? "[]") as string[];
  } catch {
    sent = [];
  }
  if (sent.includes(eventKey) || pendingAggregateEvents.has(eventKey)) return;
  pendingAggregateEvents.add(eventKey);

  try {
    const response = await fetch("/api/learning-events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event: name }),
      credentials: "omit",
      keepalive: true,
    });
    if (!response.ok) return;
    const recent = sent.filter((item) => item.slice(0, 10) >= new Date(Date.now() - 8 * 86_400_000).toISOString().slice(0, 10));
    window.localStorage.setItem(AGGREGATE_SENT_KEY, JSON.stringify([...recent, eventKey]));
  } catch {
    // Learning must continue normally when optional aggregate metrics are unavailable.
  } finally {
    pendingAggregateEvents.delete(eventKey);
  }
}

export function clearLearningEvents() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(LEARNING_EVENTS_KEY);
  window.localStorage.removeItem(AGGREGATE_SENT_KEY);
  window.dispatchEvent(new Event(LEARNING_EVENTS_CHANGED));
}
