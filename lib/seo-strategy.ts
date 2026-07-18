/**
 * Mapa editorial de intenciones de búsqueda en español.
 *
 * Cada intención general pertenece a una sola URL canónica para evitar que
 * distintas páginas de Aulafy compitan por la misma consulta.
 */
export const spanishSearchIntents = [
  {
    intent: "Encontrar formación general y gratuita",
    primaryQuery: "curso de IA",
    variants: ["curso IA gratis", "curso de inteligencia artificial", "cursos de IA en español"],
    canonical: "/cursos",
    linkHref: "/cursos",
    linkLabel: "Cursos de IA gratis en español",
    linkDescription: "Compara todos los cursos abiertos por nivel, herramienta y objetivo.",
  },
  {
    intent: "Empezar sin saber qué curso elegir",
    primaryQuery: "aprender IA",
    variants: ["aprender inteligencia artificial", "IA desde cero", "cómo aprender IA"],
    canonical: "/rutas",
    linkHref: "/rutas?ruta=desde-cero#desde-cero",
    linkLabel: "Aprender IA desde cero",
    linkDescription: "Elige un itinerario según tu experiencia y el resultado que quieres conseguir.",
  },
  {
    intent: "Aprender a trabajar con Codex",
    primaryQuery: "curso de Codex en español",
    variants: ["Codex desde cero", "tutorial Codex español", "aprender Codex"],
    canonical: "/curso-codex-espanol",
    linkHref: "/curso-codex-espanol",
    linkLabel: "Curso de Codex en español",
    linkDescription: "Empieza desde cero y avanza hasta cambios de código revisados y verificables.",
  },
  {
    intent: "Construir una web con ayuda de IA",
    primaryQuery: "crear una página web con IA",
    variants: ["crear web con IA", "curso páginas web con IA", "web con IA desde cero"],
    canonical: "/crear-pagina-web-con-ia",
    linkHref: "/crear-pagina-web-con-ia",
    linkLabel: "Crear una página web con IA",
    linkDescription: "Del problema y el prototipo local a una web seria, segura y desplegada.",
  },
  {
    intent: "Aplicar IA en un pequeño negocio",
    primaryQuery: "IA para pymes",
    variants: ["IA para autónomos", "inteligencia artificial para empresas", "automatizar una pyme con IA"],
    canonical: "/ia-para-pymes",
    linkHref: "/ia-para-pymes",
    linkLabel: "IA para pymes y autónomos",
    linkDescription: "Casos prácticos, costes, privacidad y automatizaciones con revisión humana.",
  },
  {
    intent: "Crear agentes y automatizaciones",
    primaryQuery: "curso de agentes de IA",
    variants: ["agentes IA", "aprender agentes de IA", "automatización con IA"],
    canonical: "/curso-agentes-ia-espanol",
    linkHref: "/curso-agentes-ia-espanol",
    linkLabel: "Curso de agentes de IA",
    linkDescription: "Aprende flujos de trabajo, herramientas, memoria, límites, registros y supervisión humana.",
  },
] as const;

export const courseSeoOverrides: Record<string, {
  title: string;
  description: string;
  keywords: string[];
}> = {
  "codex-desde-cero": {
    title: "Curso de Codex desde cero en español",
    description: "Aprende Codex desde cero en español con prácticas guiadas, seguridad, prompts claros y proyectos. Curso gratis, abierto y sin registro.",
    keywords: ["curso de Codex en español", "Codex desde cero", "tutorial Codex español"],
  },
  "crear-webs-con-ia": {
    title: "Curso para crear páginas web con IA desde cero",
    description: "Aprende a crear una página web con IA desde cero: requisitos, prototipo, código, APIs, seguridad, costes, Supabase y despliegue en Vercel.",
    keywords: ["crear una página web con IA", "curso páginas web con IA", "crear web con IA desde cero"],
  },
  "ia-pymes": {
    title: "Curso de IA para pymes y autónomos",
    description: "Casos prácticos de IA para pymes y autónomos: emails, facturas, presupuestos, datos, automatización, costes, privacidad y revisión humana.",
    keywords: ["IA para pymes", "IA para autónomos", "inteligencia artificial para empresas"],
  },
  "agentes-automatizacion": {
    title: "Curso de agentes de IA y automatización",
    description: "Aprende agentes de IA en español con herramientas, MCP, memoria, estado, reintentos, costes, seguridad y revisión humana.",
    keywords: ["curso de agentes de IA", "agentes IA español", "automatización con IA"],
  },
};
