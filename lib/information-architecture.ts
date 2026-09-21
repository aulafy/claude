import type { SiteLocale } from "@/lib/site-nav";

export type PrimaryDestination = {
  id: "learn" | "work" | "build" | "library";
  href: string;
  label: string;
  description: string;
};

export function primaryDestinations(locale: SiteLocale): PrimaryDestination[] {
  if (locale === "en") {
    return [
      { id: "learn", href: "/en/start", label: "Learn", description: "Start from zero with one guided task." },
      { id: "work", href: "/en/courses/ia-pymes", label: "Work & business", description: "Apply AI safely to real processes." },
      { id: "build", href: "/en/courses#programacion", label: "Build", description: "Create software, agents, and local systems." },
      { id: "library", href: "/en/courses", label: "Library", description: "Browse every course and practical guide." },
    ];
  }

  return [
    { id: "learn", href: "/empezar", label: "Aprender", description: "Empieza desde cero con una tarea guiada." },
    { id: "work", href: "/cursos/ia-pymes", label: "Trabajo y pymes", description: "Aplica IA con seguridad a procesos reales." },
    { id: "build", href: "/cursos#programacion", label: "Construir", description: "Crea software, agentes y sistemas locales." },
    { id: "library", href: "/cursos", label: "Biblioteca", description: "Consulta todos los cursos y guías prácticas." },
  ];
}

export const architecturePrinciples = [
  "La entrada principal es una intención, no una tecnología.",
  "Cada página tiene una acción principal y una secundaria como máximo.",
  "Curso, lección, guía y actualidad son tipos de contenido distintos.",
  "La navegación principal conserva cuatro destinos en toda la web.",
  "Las noticias nunca interrumpen una ruta de aprendizaje.",
  "El progreso permanece local y no exige registro.",
] as const;
