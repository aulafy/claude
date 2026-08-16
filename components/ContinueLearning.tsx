"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { trackLearningEvent } from "@/lib/learning-events";
import { getLearningContinuation } from "@/lib/learning-continuation";
import {
  LEARNING_PROGRESS_EVENT,
  clearLearningProgress,
  readLearningProgress,
  type LearningProgress,
} from "@/lib/learning-progress";

export default function ContinueLearning({
  locale = "es",
  compact = false,
}: {
  locale?: "es" | "en";
  compact?: boolean;
}) {
  const [progress, setProgress] = useState<LearningProgress | null>(null);

  useEffect(() => {
    const update = () => setProgress(readLearningProgress());
    update();
    window.addEventListener(LEARNING_PROGRESS_EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(LEARNING_PROGRESS_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  const continuation = getLearningContinuation(progress, locale);
  if (!continuation) return null;

  if (compact) {
    return (
      <Link
        href={continuation.href}
        onClick={() => trackLearningEvent("continue_return")}
        className="hidden min-h-9 min-w-9 items-center justify-center gap-2 rounded-md border border-[var(--border)] px-2 py-2 text-sm font-semibold text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] sm:inline-flex lg:px-3"
        title={`${locale === "en" ? "Continue" : "Continuar"}: ${continuation.title}`}
        aria-label={`${locale === "en" ? "Continue" : "Continuar"}: ${continuation.title}`}
      >
        <Icon name="rocket" /> <span className="hidden lg:inline">{locale === "en" ? "Continue" : "Continuar"}</span>
      </Link>
    );
  }

  return (
    <aside className="continue-learning" aria-label={locale === "en" ? "Your local learning progress" : "Tu progreso local de aprendizaje"}>
      <div>
        <span><Icon name="save" /> {locale === "en" ? "SAVED ON THIS DEVICE" : "GUARDADO EN ESTE DISPOSITIVO"}</span>
        <h2>{continuation.inProgress ? (locale === "en" ? "Continue your unfinished mission" : "Continúa tu misión pendiente") : (locale === "en" ? "Continue where you left off" : "Continúa donde lo dejaste")}</h2>
        <p><strong>{continuation.courseTitle}</strong> · {continuation.title}</p>
      </div>
      <Link href={continuation.href} onClick={() => trackLearningEvent("continue_return")}>{continuation.inProgress ? (locale === "en" ? "Resume mission" : "Retomar misión") : (locale === "en" ? "Continue learning" : "Continuar aprendiendo")} <Icon name="chevronRight" /></Link>
      <button type="button" onClick={() => clearLearningProgress()}>{locale === "en" ? "Clear local progress" : "Borrar progreso local"}</button>
    </aside>
  );
}
