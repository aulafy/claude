import { blogPosts } from "@/lib/blog";
import { cursos, lecciones } from "@/lib/cursos";
import { getEnglishCourseSections, getEnglishLessonDescription, getEnglishLessons, getEnglishLessonTitle } from "@/lib/english-lessons";
import { getLocalizedCursos } from "@/lib/i18n";
import { seoLandings } from "@/lib/seo-landings";
import { isSocialEnabled } from "@/lib/social/config";
import { getCourseQuality } from "@/lib/course-quality";

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
    lastModified: "2026-08-05",
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
    lastModified: "2026-08-05",
    alternateRoute: "",
  },
  {
    route: "/empezar",
    title: "Tu primera tarea útil con IA en 15 minutos",
    description: "Misión guiada para usar IA por primera vez, comprobar el resultado y mantener la decisión en manos humanas.",
    language: "es",
    kind: "core",
    priority: 0.99,
    changeFrequency: "monthly",
    lastModified: "2026-08-16",
    alternateRoute: "/en/start",
  },
  {
    route: "/en/start",
    title: "Your first useful AI task in 15 minutes",
    description: "A guided mission to use AI for the first time, verify the result, and keep the final decision human.",
    language: "en",
    kind: "english",
    priority: 0.98,
    changeFrequency: "monthly",
    lastModified: "2026-08-16",
    alternateRoute: "/empezar",
  },
  {
    route: "/buscar",
    title: "Buscar cursos, guías y soluciones de IA",
    description: "Busca por objetivo, herramienta o error dentro de la biblioteca abierta de Aulafy.",
    language: "es",
    kind: "core",
    priority: 0.75,
    changeFrequency: "weekly",
    lastModified: "2026-08-16",
    alternateRoute: "/en/search",
  },
  {
    route: "/guias",
    title: "Guías prácticas de inteligencia artificial",
    description: "Respuestas claras para empezar con IA, proteger datos, elegir herramientas y resolver problemas técnicos concretos.",
    language: "es",
    kind: "core",
    priority: 0.9,
    changeFrequency: "weekly",
    lastModified: "2026-08-16",
  },
  {
    route: "/mi-ruta",
    title: "Mi ruta de 7 días para empezar con IA",
    description: "Siete misiones gratuitas para usar IA, comprobar resultados, proteger datos y construir un flujo repetible.",
    language: "es",
    kind: "core",
    priority: 0.98,
    changeFrequency: "monthly",
    lastModified: "2026-08-16",
    alternateRoute: "/en/my-path",
  },
  {
    route: "/en/my-path",
    title: "My 7-day path to start with AI",
    description: "Seven free missions to use AI, verify results, protect data, and build a repeatable workflow.",
    language: "en",
    kind: "english",
    priority: 0.97,
    changeFrequency: "monthly",
    lastModified: "2026-08-16",
    alternateRoute: "/mi-ruta",
  },
  {
    route: "/en/search",
    title: "Search AI courses, guides and solutions",
    description: "Search by outcome, tool, or error across Aulafy's open library.",
    language: "en",
    kind: "english",
    priority: 0.74,
    changeFrequency: "weekly",
    lastModified: "2026-08-16",
    alternateRoute: "/buscar",
  },
  {
    route: "/curso-ia",
    title: "Curso completo de inteligencia artificial en español",
    description: "Curso continuo y gratuito de IA: 7 módulos, 28 lecciones y 7 proyectos desde cero hasta producción.",
    language: "es",
    kind: "core",
    priority: 0.98,
    changeFrequency: "weekly",
    lastModified: "2026-08-05",
    alternateRoute: "/en/ai-course",
  },
  {
    route: "/en/ai-course",
    title: "Complete artificial intelligence course",
    description: "One free continuous AI course: 7 modules, 28 lessons, and 7 projects from foundations to production.",
    language: "en",
    kind: "english",
    priority: 0.97,
    changeFrequency: "weekly",
    lastModified: "2026-08-05",
    alternateRoute: "/curso-ia",
  },
  {
    route: "/cursos",
    title: "Cursos de IA gratis en español: de cero a avanzado",
    description: "Cursos gratuitos para aprender IA desde cero o avanzar en Codex, webs con IA, pymes, RAG, agentes, seguridad y MLOps.",
    language: "es",
    kind: "courses",
    priority: 0.95,
    changeFrequency: "weekly",
    lastModified: "2026-08-05",
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
    lastModified: "2026-08-05",
    alternateRoute: "/cursos",
  },
  {
    route: "/rutas",
    title: "Aprender IA desde cero: rutas gratuitas por nivel",
    description: "Itinerarios gratuitos para aprender inteligencia artificial según tu nivel y objetivo, desde cero hasta RAG, agentes y MLOps.",
    language: "es",
    kind: "core",
    priority: 0.94,
    changeFrequency: "monthly",
    alternateRoute: "/en/paths",
  },
  {
    route: "/que-aprender-ia",
    title: "Empieza con IA: elige tu primer paso",
    description: "Guía para empezar a aprender inteligencia artificial según tu objetivo: estudiar, trabajar, crear webs, programar o construir sistemas de IA.",
    language: "es",
    kind: "core",
    priority: 0.93,
    changeFrequency: "monthly",
  },
  {
    route: "/web",
    title: "Curso completo de IA desde cero en una página",
    description: "Edición web íntegra y descargable del curso fundamental de inteligencia artificial de Aulafy, con 12 lecciones, prácticas y fuentes.",
    language: "es",
    kind: "documents",
    priority: 0.9,
    changeFrequency: "weekly",
    lastModified: "2026-08-05",
  },
  {
    route: "/proyectos",
    title: "Proyectos de IA guiados: aprende construyendo",
    description: "Elige un proyecto práctico de IA: primer resultado, web, automatización, RAG, agentes, SaaS geoespacial o plataforma privada.",
    language: "es",
    kind: "core",
    priority: 0.91,
    changeFrequency: "weekly",
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
  ["/aulafy-guia-completa.pdf", "Borrador de la guía completa de Aulafy"],
  ["/guia-claude-code.pdf", "Guía Claude Code"],
  ["/guia-claude-code-vol2.pdf", "Guía Claude Code + IA local"],
  ["/manual-codex-desde-cero-aulafy.pdf", "Manual Codex desde cero"],
].map(([route, title]) => ({
  route,
  title: title as string,
  description: "Borrador PDF gratuito de Aulafy con contenido educativo de inteligencia artificial práctica.",
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
  language: post.locale ?? "es",
  kind: "blog",
  priority: 0.86,
  changeFrequency: "weekly",
  lastModified: post.updated,
  alternateRoute: post.slug === "ultimos-modelos-ia-local-agosto-2026"
    ? "/blog/latest-local-ai-models-august-2026"
    : post.slug === "latest-local-ai-models-august-2026"
      ? "/blog/ultimos-modelos-ia-local-agosto-2026"
      : undefined,
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
    lastModified: getCourseQuality(course.slug).reviewedAt,
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
    lastModified: getCourseQuality(course.slug).reviewedAt,
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
    lastModified: getCourseQuality(course.slug).reviewedAt,
    alternateRoute: `/cursos/${course.slug}`,
  },
  ...getEnglishCourseSections(course).flatMap((section) => section.lecciones).map((lesson) => {
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
      lastModified: getCourseQuality(course.slug).reviewedAt,
      alternateRoute: translatedLesson?.alternateRoute === null
        ? undefined
        : translatedLesson?.alternateRoute ?? `/cursos/${course.slug}/${lesson.slug}`,
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
