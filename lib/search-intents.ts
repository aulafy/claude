export type SearchLocale = "es" | "en";

export type SearchRescue = {
  id: string;
  label: string;
  description: string;
  suggestions: Array<{ href: string; title: string; reason: string }>;
};

const normalizeSearchText = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9+#.]+/g, " ")
  .trim();

const corrections: Record<string, string> = {
  ollamma: "ollama",
  olama: "ollama",
  deppseek: "deepseek",
  deepsek: "deepseek",
  chatgtp: "chatgpt",
  chatgptt: "chatgpt",
  cloude: "claude",
  claudeecode: "claude code",
  codexx: "codex",
  ragg: "rag",
  automatizacionn: "automatizacion",
  privasidad: "privacidad",
};

const synonymGroups = [
  ["principiante", "principiantes", "empezar", "inicio", "cero", "novato", "beginner", "start", "new"],
  ["trabajo", "oficina", "empresa", "negocio", "pyme", "autonomo", "administracion", "work", "office", "business"],
  ["programar", "programacion", "codigo", "desarrollo", "developer", "coding", "code"],
  ["datos", "csv", "excel", "sql", "analitica", "dashboard", "data", "spreadsheet"],
  ["privacidad", "seguridad", "rgpd", "datos sensibles", "secretos", "privacy", "security", "gdpr"],
  ["local", "ollama", "offline", "privado", "self hosted", "selfhosted"],
  ["docente", "profesor", "educacion", "clase", "alumno", "teacher", "education", "classroom"],
  ["web", "pagina", "sitio", "landing", "website"],
  ["imagen", "video", "voz", "audio", "creativo", "image", "voice", "creative"],
  ["error", "problema", "falla", "no funciona", "troubleshooting", "issue", "broken"],
];

export function normalizeSearchQuery(value: string) {
  return normalizeSearchText(value)
    .split(/\s+/)
    .map((term) => corrections[term] ?? term)
    .join(" ");
}

export function expandSearchTerms(value: string) {
  const normalized = normalizeSearchQuery(value);
  const original = normalized.split(/\s+/).filter(Boolean);
  const expanded = new Set(original);
  for (const group of synonymGroups) {
    if (group.some((term) => normalized.includes(term))) {
      group.forEach((term) => term.split(" ").forEach((token) => expanded.add(token)));
    }
  }
  return { normalized, original, expanded: [...expanded] };
}

type RankedSearchEntry = {
  route: string;
  title: string;
  description: string;
  language: "es" | "en" | "multi";
  priority: number;
};

function includesAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(term));
}

function routeIntentBoost(query: string, route: string) {
  let boost = 0;
  if (query.includes("ollama")) {
    if (route.endsWith("/ollama-desde-cero")) boost += 24;
    if (includesAny(query, ["error", "problema", "falla", "funciona", "issue", "broken", "troubleshooting"]) && route.endsWith("/troubleshooting-ollama")) boost += 34;
  }
  if (query.includes("deepseek") && route.includes("/deepseek-harness")) boost += 20;
  if (includesAny(query, intentTriggers.work ?? [])) {
    if (route.endsWith("/ia-pymes/diagnostico-piloto")) boost += 26;
    if (route.endsWith("/claude-code/pymes")) boost += 16;
    if (route.endsWith("/ia-pymes/flujo-fiable")) boost += 12;
  }
  if (includesAny(query, intentTriggers.data ?? [])) {
    if (route.endsWith("/ia-datos-analitica")) boost += 24;
    if (route.endsWith("/ia-pymes/convertir-extracto-csv")) boost += 14;
  }
  if (includesAny(query, intentTriggers.privacy ?? [])) {
    if (route.endsWith("/ia-pymes/rgpd-basico")) boost += 22;
    if (route.endsWith("/seguridad-evals/privacidad-datos")) boost += 16;
  }
  if (includesAny(query, intentTriggers.education ?? []) && route.endsWith("/ia-docentes-educacion")) boost += 24;
  if (includesAny(query, intentTriggers.beginner ?? [])) {
    if (route === "/empezar" || route === "/en/start") boost += 28;
    if (route === "/mi-ruta" || route === "/en/my-path") boost += 18;
  }
  return boost;
}

export function rankSearchEntries<T extends RankedSearchEntry>(entries: T[], query: string, locale: SearchLocale, limit = 12) {
  const { normalized, original, expanded } = expandSearchTerms(query);
  if (!original.length) return [];
  const related = expanded.filter((term) => !original.includes(term));

  return entries
    .filter((entry) => entry.language === locale || entry.language === "multi")
    .map((entry) => {
      const title = normalizeSearchText(entry.title);
      const description = normalizeSearchText(entry.description);
      const route = normalizeSearchText(entry.route);
      const directScore = original.reduce((total, term) => total + (title.includes(term) ? 7 : 0) + (description.includes(term) ? 3 : 0) + (route.includes(term) ? 1 : 0), 0);
      const relatedScore = related.reduce((total, term) => total + (title.includes(term) ? 2 : 0) + (description.includes(term) ? 1 : 0), 0);
      const phraseScore = title.includes(normalized) ? 14 : description.includes(normalized) ? 5 : 0;
      return { entry, score: directScore + relatedScore + phraseScore + routeIntentBoost(normalized, entry.route) + entry.priority };
    })
    .filter((item) => item.score >= 3)
    .sort((left, right) => right.score - left.score || right.entry.priority - left.entry.priority)
    .slice(0, limit)
    .map((item) => item.entry);
}

const rescues: Record<SearchLocale, SearchRescue[]> = {
  es: [
    {
      id: "beginner", label: "Empezar desde cero", description: "Primera práctica, conceptos mínimos y una ruta corta.",
      suggestions: [
        { href: "/empezar", title: "Primera misión en 15 minutos", reason: "Haz algo útil antes de estudiar teoría." },
        { href: "/mi-ruta", title: "Ruta guiada de 7 días", reason: "Avanza con una evidencia pequeña cada día." },
        { href: "/cursos/ia-desde-cero", title: "IA desde cero", reason: "Entiende modelos, límites, privacidad y verificación." },
      ],
    },
    {
      id: "work", label: "IA para trabajo y pymes", description: "Casos de oficina con control humano y protección de datos.",
      suggestions: [
        { href: "/cursos/ia-pymes/diagnostico-piloto", title: "Diagnostica un primer piloto", reason: "Elige una tarea útil sin tocar todavía sistemas críticos." },
        { href: "/cursos/claude-code/pymes", title: "Pymes y oficina", reason: "Documentos, hojas de cálculo y tareas repetitivas." },
        { href: "/cursos/ia-pymes/flujo-fiable", title: "Diseña un flujo fiable", reason: "Separa borrador, validación y acción real." },
      ],
    },
    {
      id: "coding", label: "Programar y construir", description: "Desde una primera web hasta cambios verificables en repositorios.",
      suggestions: [
        { href: "/cursos/codex-desde-cero", title: "Codex desde cero", reason: "Empieza sin necesitar experiencia previa." },
        { href: "/cursos/crear-webs-con-ia", title: "Crear webs con IA", reason: "Construye y publica una aplicación completa." },
        { href: "/cursos/codex-programadores", title: "Codex para programadores", reason: "Trabaja con repositorios, pruebas y Git." },
      ],
    },
    {
      id: "data", label: "Datos, Excel y analítica", description: "Analiza sin perder originales ni aceptar resultados sin comprobar.",
      suggestions: [
        { href: "/cursos/ia-datos-analitica", title: "IA para datos y analítica", reason: "Ruta completa con CSV, SQL y visualización." },
        { href: "/cursos/ia-pymes/convertir-extracto-csv", title: "Convertir un extracto a CSV", reason: "Práctica de extracción con revisión humana." },
        { href: "/cursos/ia-pymes/presupuestos-excel", title: "Presupuestos y Excel", reason: "Automatiza cálculos sin sobrescribir la fuente." },
      ],
    },
    {
      id: "local", label: "IA local y Ollama", description: "Modelos en tu equipo, instalación y resolución de problemas.",
      suggestions: [
        { href: "/cursos/ia-local/ollama-desde-cero", title: "Ollama desde cero", reason: "Instala, prueba y entiende dónde guarda los modelos." },
        { href: "/cursos/ia-local/troubleshooting-ollama", title: "Resolver problemas de Ollama", reason: "Diagnostica puertos, memoria, GPU y modelos." },
        { href: "/cursos/ia-local/hardware-minimo-2026", title: "Hardware mínimo", reason: "Elige modelos que realmente caben en tu equipo." },
      ],
    },
    {
      id: "privacy", label: "Privacidad y seguridad", description: "Protege información antes de conectar modelos o automatizaciones.",
      suggestions: [
        { href: "/cursos/ia-pymes/rgpd-basico", title: "RGPD básico para proyectos de IA", reason: "Define finalidad, acceso y minimización." },
        { href: "/cursos/seguridad-evals/privacidad-datos", title: "Privacidad, logs y datos sensibles", reason: "Revisa qué termina almacenado y por quién." },
        { href: "/cursos/ia-pymes/permisos-agentes", title: "Permisos para agentes", reason: "Da a cada herramienta solo el acceso imprescindible." },
      ],
    },
    {
      id: "education", label: "IA para docentes", description: "Actividades con objetivos de aprendizaje, privacidad y evaluación.",
      suggestions: [
        { href: "/cursos/ia-docentes-educacion", title: "IA para docentes y educación", reason: "Curso completo con prácticas responsables." },
        { href: "/cursos/ia-docentes-educacion/privacidad-menores", title: "Privacidad y menores", reason: "Decide qué datos no deben entrar en una herramienta." },
        { href: "/cursos/ia-docentes-educacion/objetivo-aprendizaje", title: "Objetivos antes que herramientas", reason: "Diseña la actividad desde lo que debe aprenderse." },
      ],
    },
  ],
  en: [
    {
      id: "beginner", label: "Start from zero", description: "A first practice, essential concepts, and a short path.",
      suggestions: [
        { href: "/en/start", title: "First mission in 15 minutes", reason: "Do something useful before studying theory." },
        { href: "/en/my-path", title: "Guided 7-day path", reason: "Build one small piece of evidence each day." },
        { href: "/en/ai-course", title: "AI foundations", reason: "Understand models, limits, privacy, and verification." },
      ],
    },
    {
      id: "coding", label: "Build with AI", description: "From a first project to verifiable repository changes.",
      suggestions: [
        { href: "/en/courses/codex-programadores", title: "Codex for programmers", reason: "Work with repositories, tests, and Git." },
        { href: "/en/courses/claude-code", title: "Claude Code from zero to pro", reason: "Build real software through a guided terminal workflow." },
        { href: "/en/courses/fundamentos-aulafy", title: "Aulafy foundations", reason: "Prepare Python, Git, terminal, and Docker fundamentals." },
      ],
    },
    {
      id: "local", label: "Local AI and Ollama", description: "Run models on your machine and solve common setup problems.",
      suggestions: [
        { href: "/en/courses/ia-local/ollama-desde-cero", title: "Ollama from zero", reason: "Install and test your first local model." },
        { href: "/en/courses/ia-local/troubleshooting-ollama", title: "Ollama troubleshooting", reason: "Diagnose ports, memory, GPU, and models." },
        { href: "/en/courses/ia-local/hardware-minimo-2026", title: "Minimum hardware", reason: "Choose models that fit your machine." },
      ],
    },
  ],
};

const intentTriggers: Record<string, string[]> = {
  beginner: ["principiante", "empezar", "inicio", "cero", "novato", "beginner", "start", "new"],
  work: ["trabajo", "oficina", "empresa", "negocio", "pyme", "autonomo", "administracion", "work", "office", "business"],
  coding: ["programar", "programacion", "codigo", "web", "app", "developer", "coding", "code", "website"],
  data: ["datos", "csv", "excel", "sql", "analitica", "dashboard", "data", "spreadsheet"],
  local: ["local", "ollama", "offline", "privado", "self hosted", "selfhosted", "gpu"],
  privacy: ["privacidad", "seguridad", "rgpd", "sensible", "secretos", "privacy", "security", "gdpr"],
  education: ["docente", "profesor", "educacion", "clase", "alumno", "teacher", "education", "classroom"],
};

export function getSearchRescues(query: string, locale: SearchLocale, limit = 2) {
  const normalized = normalizeSearchQuery(query);
  const available = rescues[locale];
  const ranked = available
    .map((rescue, index) => ({
      rescue,
      index,
      score: (intentTriggers[rescue.id] ?? []).filter((trigger) => normalized.includes(trigger)).length,
    }))
    .sort((left, right) => right.score - left.score || left.index - right.index);
  const matched = ranked.filter((item) => item.score > 0);
  const fallback = available.filter((item) => item.id === "beginner" || item.id === "coding");
  return (matched.length ? matched.map((item) => item.rescue) : fallback).slice(0, limit);
}
