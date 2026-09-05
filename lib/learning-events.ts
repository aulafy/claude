export const LEARNING_EVENTS_KEY = "aulafy.learning-events.v1";
export const LEARNING_EVENTS_CHANGED = "aulafy:learning-events";
const AGGREGATE_SENT_KEY = "aulafy.aggregate-events-sent.v1";

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
  // Preserve existing callers without recording activity, locally or remotely.
  void name;
}

export function clearLearningEvents() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(LEARNING_EVENTS_KEY);
  window.localStorage.removeItem(AGGREGATE_SENT_KEY);
  window.dispatchEvent(new Event(LEARNING_EVENTS_CHANGED));
}
