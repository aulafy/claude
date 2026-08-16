import type { IconName } from "@/components/Icon";
import type { LearningProgress } from "@/lib/learning-progress";
import { getLearningContinuation } from "./learning-continuation.ts";

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
  const definitions = [
    { href: english ? "/en" : "/", label: english ? "Home" : "Inicio", icon: "home" as const, continue: false },
    { href: english ? "/en/my-path" : "/mi-ruta", label: english ? "My path" : "Mi ruta", icon: "route" as const, continue: false },
    { href: english ? "/en/search" : "/buscar", label: english ? "Search" : "Buscar", icon: "search" as const, continue: false },
    continuation
      ? { href: continuation.href, label: english ? "Continue" : "Continuar", icon: "rocket" as const, continue: true, title: continuation.title }
      : { href: english ? "/en/courses" : "/cursos", label: english ? "Explore" : "Explorar", icon: "grid" as const, continue: false },
  ];
  return definitions.map((item) => ({
    ...item,
    active: item.href === (english ? "/en" : "/") ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`),
  }));
}
