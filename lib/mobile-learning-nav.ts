import type { IconName } from "@/components/Icon";
import type { LearningProgress } from "@/lib/learning-progress";
import { getLearningContinuation } from "./learning-continuation.ts";
import { siteNav } from "./site-nav.ts";

export type MobileLearningNavItem = {
  href: string;
  label: string;
  icon: IconName;
  active: boolean;
  continue: boolean;
  title?: string;
};

export function getMobileLearningNavItems(locale: "es" | "en", pathname: string, progress: LearningProgress | null): MobileLearningNavItem[] {
  const english = locale === "en";
  const continuation = getLearningContinuation(progress, locale);
  const nav = siteNav(locale);
  const definitions = [
    { href: nav.home.href, label: nav.home.label, icon: "home" as const, continue: false },
    { href: nav.start.href, label: nav.start.label, icon: "route" as const, continue: false },
    { href: nav.courses.href, label: nav.courses.label, icon: "grid" as const, continue: false },
    continuation
      ? { href: continuation.href, label: english ? "Continue" : "Continuar", icon: "rocket" as const, continue: true, title: continuation.title }
      : { href: nav.search.href, label: nav.search.label, icon: "search" as const, continue: false },
  ];
  return definitions.map((item) => ({
    ...item,
    active: item.href === (english ? "/en" : "/") ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`),
  }));
}
