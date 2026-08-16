import type { LearningEventName } from "./learning-events.ts";

const DAY_MS = 86_400_000;

export type LearningReturnEvent = Extract<LearningEventName, "return_7d" | "return_30d">;

export function getLearningReturnEvent(previousVisitedAt: string | undefined, visitedAt: string): LearningReturnEvent | null {
  if (!previousVisitedAt) return null;
  const previous = Date.parse(previousVisitedAt);
  const current = Date.parse(visitedAt);
  if (!Number.isFinite(previous) || !Number.isFinite(current) || current < previous) return null;
  const elapsed = current - previous;
  if (elapsed >= 30 * DAY_MS) return "return_30d";
  if (elapsed >= 7 * DAY_MS) return "return_7d";
  return null;
}
