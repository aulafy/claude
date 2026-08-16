import type { LabStation, LearningLabScenario } from "./learning-lab-scenarios.ts";

export const LEARNING_LAB_PROGRESS_KEY = "aulafy.learning-lab.v1";

export type LearningLabScenarioProgress = {
  activeStation: LabStation;
  objectiveComplete: boolean;
  promptComplete: Record<string, boolean>;
  reviewComplete: boolean;
  updatedAt: string;
};

export type LearningLabProgress = {
  version: 1;
  scenarios: Partial<Record<LearningLabScenario["id"], LearningLabScenarioProgress>>;
};

const scenarioIds: LearningLabScenario["id"][] = ["pyme", "estudiante"];
const stations: LabStation[] = ["brief", "prompt", "review"];
const MAX_PROMPT_DECISIONS = 12;

function validateScenarioProgress(value: unknown): LearningLabScenarioProgress | null {
  if (typeof value !== "object" || value === null) return null;
  const candidate = value as Record<string, unknown>;
  if (!stations.includes(candidate.activeStation as LabStation)) return null;
  if (typeof candidate.objectiveComplete !== "boolean" || typeof candidate.reviewComplete !== "boolean") return null;
  if (typeof candidate.updatedAt !== "string" || !Number.isFinite(Date.parse(candidate.updatedAt))) return null;
  if (typeof candidate.promptComplete !== "object" || candidate.promptComplete === null || Array.isArray(candidate.promptComplete)) return null;
  const entries = Object.entries(candidate.promptComplete as Record<string, unknown>);
  if (entries.length > MAX_PROMPT_DECISIONS) return null;
  if (entries.some(([key, complete]) => !/^[a-z0-9-]{1,80}$/.test(key) || complete !== true)) return null;
  return {
    activeStation: candidate.activeStation as LabStation,
    objectiveComplete: candidate.objectiveComplete,
    promptComplete: Object.fromEntries(entries) as Record<string, boolean>,
    reviewComplete: candidate.reviewComplete,
    updatedAt: new Date(candidate.updatedAt).toISOString(),
  };
}

export function validateLearningLabProgress(value: unknown): LearningLabProgress | null {
  if (typeof value !== "object" || value === null) return null;
  const candidate = value as Record<string, unknown>;
  if (candidate.version !== 1 || typeof candidate.scenarios !== "object" || candidate.scenarios === null || Array.isArray(candidate.scenarios)) return null;
  const rawScenarios = candidate.scenarios as Record<string, unknown>;
  if (Object.keys(rawScenarios).some((id) => !scenarioIds.includes(id as LearningLabScenario["id"]))) return null;
  const scenarios: LearningLabProgress["scenarios"] = {};
  for (const id of scenarioIds) {
    if (rawScenarios[id] === undefined) continue;
    const progress = validateScenarioProgress(rawScenarios[id]);
    if (!progress) return null;
    scenarios[id] = progress;
  }
  return { version: 1, scenarios };
}

export function readLearningLabProgress(): LearningLabProgress {
  if (typeof window === "undefined") return { version: 1, scenarios: {} };
  try {
    const raw = window.localStorage.getItem(LEARNING_LAB_PROGRESS_KEY);
    return raw ? validateLearningLabProgress(JSON.parse(raw)) ?? { version: 1, scenarios: {} } : { version: 1, scenarios: {} };
  } catch {
    return { version: 1, scenarios: {} };
  }
}

export function saveLearningLabScenarioProgress(id: LearningLabScenario["id"], progress: Omit<LearningLabScenarioProgress, "updatedAt">) {
  if (typeof window === "undefined") return false;
  const current = readLearningLabProgress();
  const next: LearningLabProgress = {
    version: 1,
    scenarios: { ...current.scenarios, [id]: { ...progress, updatedAt: new Date().toISOString() } },
  };
  const valid = validateLearningLabProgress(next);
  if (!valid) return false;
  window.localStorage.setItem(LEARNING_LAB_PROGRESS_KEY, JSON.stringify(valid));
  return true;
}

export function clearLearningLabScenarioProgress(id: LearningLabScenario["id"]) {
  if (typeof window === "undefined") return false;
  const current = readLearningLabProgress();
  const scenarios = { ...current.scenarios };
  delete scenarios[id];
  if (Object.keys(scenarios).length === 0) window.localStorage.removeItem(LEARNING_LAB_PROGRESS_KEY);
  else window.localStorage.setItem(LEARNING_LAB_PROGRESS_KEY, JSON.stringify({ version: 1, scenarios }));
  return true;
}
