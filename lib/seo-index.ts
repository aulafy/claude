import { blogPosts } from "@/lib/blog";
import { cursos, lecciones } from "@/lib/cursos";
import { getEnglishLessonDescription, getEnglishLessons, getEnglishLessonTitle } from "@/lib/english-lessons";
import { getLocalizedCursos } from "@/lib/i18n";
import { seoLandings } from "@/lib/seo-landings";
import { getCourseGuidance } from "@/lib/course-guidance";
import { isSocialEnabled } from "@/lib/social/config";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

export type SeoIndexKind =
  | "core"
  | "courses"
  | "english"
  | "blog"
  | "landings"
  | "documents";

export type SeoIndexEntry = {
  route: string;
  title: string;
  description: string;
  language: "es" | "en" | "multi";
  kind: SeoIndexKind;
  priority: number;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  lastModified?: string;
  alternateRoute?: string;
};

export function absoluteUrl(route: string) {
  if (route === "") return SITE_URL;
  return `${SITE_URL}${route}`;
}

const coreEntries: SeoIndexEntry[] = [
  {
    route: "",
    title: "Aulafy",
    description: "Proyecto educativo abierto y gratuito para aprender inteligencia artificial con cursos, rutas y proyectos verificables.",
    language: "multi",
    kind: "core",
    priority: 1,
    changeFrequency: "weekly",
    alternateRoute: "/en",
  },
  {
    route: "/en",
    title: "Aulafy in English",
    description: "Free and open education for learning practical AI through courses, paths and verifiable projects.",
    language: "en",
    kind: "english",
    priority: 0.98,
    changeFrequency: "weekly",
    alternateRoute: "",
  },
  {
    route: "/cursos",
    title: "Cursos gratuitos de inteligencia artificial práctica",
    description: "Catálogo abierto de Codex, IA local, Claude Code, RAG, agentes, seguridad, MLOps y automatización.",
    language: "es",
    kind: "courses",
    priority: 0.95,
    changeFrequency: "weekly",
    alternateRoute: "/en/courses",
  },
  {
    route: "/programa",
    title: "Programa completo para aprender IA",
    description: "Hoja de ruta completa para aprender IA desde perfiles no técnicos hasta sistemas con RAG, agentes, MLOps, seguridad y evaluación.",
    language: "es",
    kind: "core",
    priority: 0.97,
    changeFrequency: "weekly",
    alternateRoute: "/en/program",
  },
  {
    route: "/en/program",
    title: "Complete AI learning program",
    description: "A complete AI learning roadmap from non-technical profiles to RAG, agents, MLOps, security, evaluation and final projects.",
    language: "en",
    kind: "english",
    priority: 0.96,
    changeFrequency: "weekly",
    alternateRoute: "/programa",
  },
  {
    route: "/en/courses",
    title: "Free practical AI courses",
    description: "Open English catalog for Codex, Claude Code, local AI, RAG, agents, MLOps, security and automation.",
    language: "en",
    kind: "english",
    priority: 0.93,
    changeFrequency: "weekly",
    alternateRoute: "/cursos",
  },
  {
    route: "/rutas",
    title: "Rutas para aprender inteligencia artificial",
    description: "Itinerarios por objetivo para programación con IA, agentes, RAG, modelos abiertos y automatización.",
    language: "es",
    kind: "core",
    priority: 0.94,
    changeFrequency: "monthly",
    alternateRoute: "/en/paths",
  },
  {
    route: "/en/paths",
    title: "AI learning paths",
    description: "Outcome-based paths for AI-assisted programming, agents, RAG, open models and automation.",
    language: "en",
    kind: "english",
    priority: 0.92,
    changeFrequency: "monthly",
    alternateRoute: "/rutas",
  },
  {
    route: "/blog",
    title: "Blog de IA práctica",
    description: "Análisis, guías y tutoriales sobre IA, modelos, prompts, automatización y SEO/AEO.",
    language: "es",
    kind: "blog",
    priority: 0.92,
    changeFrequency: "weekly",
  },
  {
    route: "/que-es-aulafy",
    title: "Qué es Aulafy",
    description: "Definición breve de Aulafy para personas, buscadores y asistentes de IA.",
    language: "es",
    kind: "core",
    priority: 0.82,
    changeFrequency: "monthly",
  },
  {
    route: "/acerca",
    title: "Proyecto y fuentes",
    description: "Criterios editoriales, licencias, fuentes y forma recomendada de citar Aulafy.",
    language: "es",
    kind: "core",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    route: "/fuentes",
    title: "Fuentes oficiales",
    description: "Documentación y repositorios usados para contrastar los cursos de Aulafy.",
    language: "es",
    kind: "core",
    priority: 0.68,
    changeFrequency: "monthly",
  },
  {
    route: "/sobre-ramon-guillamon",
    title: "Ramón Guillamón",
    description: "Autoría, criterio editorial, perfiles públicos y áreas de experiencia de Aulafy.",
    language: "es",
    kind: "core",
    priority: 0.72,
    changeFrequency: "monthly",
  },
];

const legalEntries: SeoIndexEntry[] = [
  ["/aviso-legal", "Aviso legal"],
  ["/licencia", "Licencia"],
  ["/privacidad", "Privacidad"],
  ["/cookies", "Cookies"],
].map(([route, title]) => ({
  route,
  title,
  description: `${title} de Aulafy.`,
  language: "es",
  kind: "core",
  priority: 0.42,
  changeFrequency: "yearly",
}));

const socialEntries: SeoIndexEntry[] = isSocialEnabled()
  ? [
      {
        route: "/comunidad",
        title: "Aulafy Comunidad",
        description: "Proyectos vinculados a lecciones y revisiones educativas para aprender inteligencia artificial construyendo.",
        language: "es",
        kind: "core",
        priority: 0.9,
        changeFrequency: "daily",
      },
      {
        route: "/comunidad/normas",
        title: "Normas de Aulafy Comunidad",
        description: "Normas de Aulafy Comunidad.",
        language: "es",
        kind: "core",
        priority: 0.42,
        changeFrequency: "yearly",
      },
    ]
  : [];

const documentEntries: SeoIndexEntry[] = [
  ["/aulafy-guia-completa.pdf", "Guía completa de Aulafy"],
  ["/guia-claude-code.pdf", "Guía Claude Code"],
  ["/guia-claude-code-vol2.pdf", "Guía Claude Code + IA local"],
  ["/manual-codex-desde-cero-aulafy.pdf", "Manual Codex desde cero"],
].map(([route, title]) => ({
  route,
  title: title as string,
  description: "Guía PDF gratuita de Aulafy con contenido educativo de inteligencia artificial práctica.",
  language: "es" as const,
  kind: "documents" as const,
  priority: 0.68,
  changeFrequency: "yearly" as const,
}));

const landingEntries: SeoIndexEntry[] = seoLandings.map((landing) => ({
  route: `/${landing.slug}`,
  title: landing.title,
  description: landing.description,
  language: "es",
  kind: "landings",
  priority: 0.88,
  changeFrequency: "weekly",
}));

const blogEntries: SeoIndexEntry[] = blogPosts.map((post) => ({
  route: `/blog/${post.slug}`,
  title: post.title,
  description: post.description,
  language: "es",
  kind: "blog",
  priority: 0.86,
  changeFrequency: "weekly",
  lastModified: post.updated,
}));

const englishCourses = getLocalizedCursos("en");

const courseEntries: SeoIndexEntry[] = cursos.flatMap((course) => [
  {
    route: `/cursos/${course.slug}`,
    title: course.title,
    description: course.desc,
    language: "es" as const,
    kind: "courses" as const,
    priority: 0.9,
    changeFrequency: "weekly" as const,
    lastModified: getCourseGuidance(course.slug, "es")?.updated,
    alternateRoute: course.availableInEnglish === false ? undefined : `/en/courses/${course.slug}`,
  },
  ...lecciones(course).map((lesson) => ({
    route: `/cursos/${course.slug}/${lesson.slug}`,
    title: lesson.title,
    description: `${lesson.title}. Lección gratuita del curso ${course.title} en Aulafy.`,
    language: "es" as const,
    kind: "courses" as const,
    priority: 0.78,
    changeFrequency: "monthly" as const,
    lastModified: getCourseGuidance(course.slug, "es")?.updated,
    alternateRoute: course.availableInEnglish === false
      ? undefined
      : `/en/courses/${course.slug}/${lesson.slug}`,
  })),
]);

const englishCourseEntries: SeoIndexEntry[] = englishCourses.flatMap((course) => [
  {
    route: `/en/courses/${course.slug}`,
    title: course.title,
    description: course.desc,
    language: "en" as const,
    kind: "english" as const,
    priority: 0.86,
    changeFrequency: "weekly" as const,
    lastModified: getCourseGuidance(course.slug, "en")?.updated,
    alternateRoute: `/cursos/${course.slug}`,
  },
  ...lecciones(course).map((lesson) => {
    const translatedLesson = getEnglishLessons().find(
      (item) => item.courseSlug === course.slug && item.slug === lesson.slug,
    );
    return {
      route: `/en/courses/${course.slug}/${lesson.slug}`,
      title: getEnglishLessonTitle(course.slug, lesson.slug, lesson.title),
      description: translatedLesson
        ? getEnglishLessonDescription(translatedLesson)
        : `${lesson.title}. Free lesson from ${course.title} on Aulafy.`,
      language: "en" as const,
      kind: "english" as const,
      priority: 0.72,
      changeFrequency: "monthly" as const,
      lastModified: getCourseGuidance(course.slug, "en")?.updated,
      alternateRoute: `/cursos/${course.slug}/${lesson.slug}`,
    };
  }),
]);

export function getSeoIndexEntries() {
  const entries = [
    ...coreEntries,
    ...legalEntries,
    ...socialEntries,
    ...documentEntries,
    ...landingEntries,
    ...blogEntries,
    ...courseEntries,
    ...englishCourseEntries,
  ];
  return Array.from(new Map(entries.map((entry) => [entry.route, entry])).values());
}

export function getSeoEntriesByKind(kind: SeoIndexKind) {
  return getSeoIndexEntries().filter((entry) => entry.kind === kind);
}

export function alternateLanguages(entry: SeoIndexEntry) {
  if (!entry.alternateRoute) return undefined;
  const esRoute = entry.language === "en" ? entry.alternateRoute : entry.route;
  const enRoute = entry.language === "en" ? entry.route : entry.alternateRoute;
  return {
    "es-ES": absoluteUrl(esRoute),
    "en-US": absoluteUrl(enRoute),
    "x-default": absoluteUrl(esRoute),
  };
}
