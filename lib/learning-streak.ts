const DAY_MS = 86_400_000;

export function toLocalDay(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isLearningDay(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(year, month - 1, day);
  return parsed.getFullYear() === year && parsed.getMonth() === month - 1 && parsed.getDate() === day;
}

function dayNumber(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return Math.floor(Date.UTC(year, month - 1, day) / DAY_MS);
}

export function summarizeLearningStreak(days: string[], today = toLocalDay()) {
  const todayNumber = dayNumber(today);
  const unique = [...new Set(days.filter(isLearningDay))].filter((day) => dayNumber(day) <= todayNumber).sort();
  const numbers = new Set(unique.map(dayNumber));
  const latestNumber = unique.length ? dayNumber(unique[unique.length - 1]) : null;
  const currentAnchor = latestNumber !== null && latestNumber >= todayNumber - 1 && latestNumber <= todayNumber ? latestNumber : null;

  let current = 0;
  if (currentAnchor !== null) {
    for (let cursor = currentAnchor; numbers.has(cursor); cursor -= 1) current += 1;
  }

  let best = 0;
  let run = 0;
  let previous: number | null = null;
  for (const value of [...numbers].sort((left, right) => left - right)) {
    run = previous !== null && value === previous + 1 ? run + 1 : 1;
    best = Math.max(best, run);
    previous = value;
  }

  return { current, best, totalDays: unique.length, lastActiveDay: unique.at(-1) ?? null };
}

export function recentLearningDays(days: string[], today = new Date(), length = 7) {
  const active = new Set(days.filter(isLearningDay));
  return Array.from({ length }, (_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (length - index - 1));
    const value = toLocalDay(date);
    return { value, active: active.has(value) };
  });
}
