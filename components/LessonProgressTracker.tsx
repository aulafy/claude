"use client";

import { useEffect } from "react";
import { trackLearningEvent, type LearningEventName } from "@/lib/learning-events";
import { saveLearningProgress } from "@/lib/learning-progress";

export default function LessonProgressTracker({
  href,
  title,
  courseTitle,
  locale,
}: {
  href: string;
  title: string;
  courseTitle: string;
  locale: "es" | "en";
}) {
  useEffect(() => {
    saveLearningProgress({
      href,
      title,
      courseTitle,
      locale,
      visitedAt: new Date().toISOString(),
    });
  }, [courseTitle, href, locale, title]);

  useEffect(() => {
    const reached = new Set<number>();
    const thresholds = [
      { value: 25, event: "lesson_25" },
      { value: 50, event: "lesson_50" },
      { value: 90, event: "lesson_90" },
    ] satisfies Array<{ value: number; event: LearningEventName }>;

    const measure = () => {
      const root = document.documentElement;
      const available = root.scrollHeight - window.innerHeight;
      const percent = available <= 0 ? 100 : (window.scrollY / available) * 100;
      thresholds.forEach(({ value, event }) => {
        if (percent >= value && !reached.has(value)) {
          reached.add(value);
          trackLearningEvent(event);
        }
      });
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [href]);

  return null;
}
