import type { LearningProgress } from "./learning-progress.ts";
import { sevenDayPath } from "./seven-day-path.ts";

export type LearningContinuation = {
  href: string;
  title: string;
  courseTitle: string;
  inProgress: boolean;
};

function matchesLocale(href: string, locale: "es" | "en") {
  return locale === "en" ? href.startsWith("/en/") : !href.startsWith("/en/");
}

function describeHref(href: string, locale: "es" | "en") {
  const pathItem = sevenDayPath[locale].find((item) => item.href === href);
  if (pathItem) return { title: pathItem.title, courseTitle: locale === "en" ? "Aulafy 7-day path" : "Ruta de 7 días de Aulafy" };
  return null;
}

export function getLearningContinuation(progress: LearningProgress | null, locale: "es" | "en"): LearningContinuation | null {
  if (!progress || progress.locale !== locale) return null;
  const completed = new Set(progress.completedLessons ?? []);
  const pending = (progress.startedLessons ?? []).filter((href) => matchesLocale(href, locale) && !completed.has(href));
  const pendingHref = pending.includes(progress.href) ? progress.href : pending.at(-1);
  if (pendingHref) {
    const description = pendingHref === progress.href
      ? { title: progress.title, courseTitle: progress.courseTitle }
      : describeHref(pendingHref, locale);
    return {
      href: pendingHref,
      title: description?.title ?? (locale === "en" ? "Mission in progress" : "Misión en curso"),
      courseTitle: description?.courseTitle ?? (locale === "en" ? "Local learning path" : "Ruta local de aprendizaje"),
      inProgress: true,
    };
  }
  return { href: progress.href, title: progress.title, courseTitle: progress.courseTitle, inProgress: false };
}
