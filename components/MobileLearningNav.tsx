"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { trackLearningEvent } from "@/lib/learning-events";
import { LEARNING_PROGRESS_EVENT, readLearningProgress, type LearningProgress } from "@/lib/learning-progress";
import { getMobileLearningNavItems } from "@/lib/mobile-learning-nav";

export default function MobileLearningNav({ locale = "es" }: { locale?: "es" | "en" }) {
  const pathname = usePathname();
  const [progress, setProgress] = useState<LearningProgress | null>(null);
  const english = locale === "en";

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

  const items = getMobileLearningNavItems(locale, pathname, progress);

  return <nav className="mobile-learning-nav" aria-label={english ? "Quick learning navigation" : "Navegación rápida de aprendizaje"}>
    {items.map((item) => {
      return <Link key={`${item.label}-${item.href}`} href={item.href} aria-current={item.active ? "page" : undefined} title={item.continue && item.title ? `${item.label}: ${item.title}` : item.label} onClick={item.continue ? () => trackLearningEvent("continue_return") : undefined}><Icon name={item.icon} /><span>{item.label}</span></Link>;
    })}
  </nav>;
}
