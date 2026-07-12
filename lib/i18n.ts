import { cursos, proximamente, type Curso } from "@/lib/cursos";

export type Locale = "es" | "en";

type CourseCopy = Pick<Curso, "title" | "short" | "desc">;

const englishCourseCopy: Record<string, CourseCopy> = {
  "fundamentos-aulafy": {
    title: "Aulafy foundations",
    short: "Python, Git, terminal, and Docker for learning AI smoothly.",
    desc: "Prepare a local-first environment for any Aulafy course: terminal, modern Python with uv, Git, AGENTS.md, Docker, local services, and a reproducible project template.",
  },
  "codex-programadores": {
    title: "Codex for programmers",
    short: "Build, test, and ship changes with OpenAI Codex.",
    desc: "Learn a professional Codex workflow: explore repositories, write verifiable requests, configure AGENTS.md, implement with tests, review Git changes, control permissions, and automate tasks with codex exec.",
  },
  "claude-code": {
    title: "Claude Code, from zero to pro",
    short: "Build real software by talking to AI in your terminal.",
    desc: "A practical route from installation to skills, subagents, MCP and professional workflows, including local AI apps that run on your own computer.",
  },
  "ia-local": {
    title: "Claude Code + Local AI",
    short: "Private AI tools that run on your machine.",
    desc: "Learn to connect Claude Code with Ollama, local models, vector databases and desktop workflows you can run without sending every task to the cloud.",
  },
  "ia-generativa": {
    title: "Generative AI: image, voice and video",
    short: "Create production-ready media with AI pipelines.",
    desc: "A hands-on course for images, audio, video and creative automation, with attention to quality, control and repeatable workflows.",
  },
  "videojuegos-3d-ia": {
    title: "Games, 3D and simulations with AI",
    short: "Prototype interactive worlds with AI-assisted tools.",
    desc: "Build playable prototypes, 3D scenes, mechanics and asset workflows using AI as a practical production partner.",
  },
  "seguridad-evals": {
    title: "AI security and evaluation",
    short: "Measure, test and harden AI systems before trusting them.",
    desc: "A practical security path for prompts, agents and models: evals, red teaming, data risks, guardrails and responsible deployment.",
  },
  "mlops-local": {
    title: "Local MLOps and model deployment",
    short: "Serve, monitor and operate models from your own stack.",
    desc: "Move from local experiments to controlled deployments with model serving, logs, evaluation loops and operational discipline.",
  },
  "fine-tuning-local": {
    title: "Fine-tuning and post-training for LLMs",
    short: "Train useful adapters without losing control.",
    desc: "Prepare datasets, run LoRA and QLoRA jobs, evaluate overfitting and export models for local use.",
  },
  "agentes-automatizacion": {
    title: "Agents and automation",
    short: "Design agents that can work, recover and stay under control.",
    desc: "Learn subagents, tools, memory, MCP, retries and automation loops for real workflows on your own machine.",
  },
  "agentes-produccion": {
    title: "Production agents with LangGraph and n8n",
    short: "Take agent prototypes into reliable operations.",
    desc: "Compare frameworks, design state and memory, add human approvals, observe failures and ship agent workflows responsibly.",
  },
  "automatizacion-self-hosted": {
    title: "Self-hosted AI automation for small businesses",
    short: "Run AI workflows on your own infrastructure.",
    desc: "Deploy n8n, Ollama, Qdrant and support automations with Docker, VPS setups, queues, backups and monitoring.",
  },
  "rag-seguro": {
    title: "Advanced and secure RAG",
    short: "Build retrieval systems that answer better and leak less.",
    desc: "Go beyond basic embeddings with better chunking, reranking, permissions, citations, monitoring and production safety.",
  },
  "ia-pymes": {
    title: "AI for small businesses and freelancers",
    short: "Use AI where it improves real work.",
    desc: "Identify valuable use cases, automate office flows, build useful assistants and decide what should stay human.",
  },
};

const englishUpcomingCopy: Record<string, { title: string; desc: string }> = {
  "IA para datos y analítica": {
    title: "AI for data and analytics",
    desc: "CSV, SQL, notebooks, dashboards, data cleaning and analytical assistants with open models.",
  },
};

const sectionTitleEn: Record<string, string> = {
  "Preparar el entorno": "Prepare your environment",
  "Base local-first": "Local-first base",
  "Herramientas de trabajo": "Working tools",
  "Flujo de desarrollo": "Development workflow",
  "Control y automatización": "Control and automation",
  "Empezar": "Getting started",
  "Practica diaria": "Daily practice",
  "Práctica diaria": "Daily practice",
  "Según tu perfil": "By profile",
  "Extender Claude Code": "Extending Claude Code",
  "Referencia": "Reference",
  "Ayuda": "Help",
  "Fundamentos": "Foundations",
  "IA local avanzada": "Advanced local AI",
  "Construye tus herramientas": "Build your tools",
  "Sácalo al mundo": "Ship it",
  "Anexos (avanzado)": "Advanced appendix",
  "Mapa y criterio": "Map and judgment",
  "Imagen controlada": "Controlled image generation",
  "Audio y vídeo": "Audio and video",
  "Assets y prototipo": "Assets and prototype",
  "CAD y validación": "CAD and validation",
  "Riesgo y marco mental": "Risk and mental model",
  "Medir antes de confiar": "Measure before trusting",
  "Producción responsable": "Responsible production",
  "Servir modelos": "Serving models",
  "Operar con control": "Controlled operations",
  "Proyecto final": "Final project",
  "Antes de entrenar": "Before training",
  "Entrenamiento práctico": "Practical training",
  "Evaluar y usar": "Evaluate and use",
  "Automatizar con control": "Controlled automation",
  "Del portátil a producción": "From laptop to production",
  "Fallos de producción": "Production failures",
  "Arquitectura": "Architecture",
  "Automatizar con herramientas": "Automating with tools",
  "Producción": "Production",
  "Arquitectura base": "Base architecture",
  "Flujos de negocio": "Business workflows",
  "Fundamentos que importan": "Foundations that matter",
  "Recuperar mejor": "Better retrieval",
  "Seguridad y producción": "Security and production",
  "Antes de automatizar": "Before automating",
  "Flujos de oficina": "Office workflows",
};

const levelEn: Record<string, string> = {
  "Principiante": "Beginner",
  "Principiante -> avanzado": "Beginner to advanced",
  "Principiante → avanzado": "Beginner to advanced",
  "Principiante -> intermedio": "Beginner to intermediate",
  "Principiante → intermedio": "Beginner to intermediate",
  "Intermedio": "Intermediate",
  "Intermedio -> avanzado": "Intermediate to advanced",
  "Intermedio → avanzado": "Intermediate to advanced",
};

export function isEnglishPath(pathname: string) {
  return pathname === "/en" || pathname.startsWith("/en/");
}

export function pathForLocale(pathname: string, locale: Locale) {
  const path = pathname || "/";
  const spanishPath = path === "/en" ? "/" : path.startsWith("/en/") ? path.slice(3) || "/" : path;

  if (locale === "es") {
    if (spanishPath === "/paths") return "/rutas";
    if (spanishPath === "/courses") return "/cursos";
    if (spanishPath.startsWith("/courses/")) return `/cursos/${spanishPath.slice("/courses/".length)}`;
    return spanishPath;
  }

  if (spanishPath === "/") return "/en";
  if (spanishPath === "/rutas") return "/en/paths";
  if (spanishPath === "/cursos") return "/en/courses";
  if (spanishPath.startsWith("/cursos/")) {
    const [, , courseSlug, lessonSlug] = spanishPath.split("/");
    if (!courseSlug) return "/en/courses";
    return lessonSlug ? `/en/courses/${courseSlug}/${lessonSlug}` : `/en/courses/${courseSlug}`;
  }

  return "/en";
}

export function getLocalizedCursos(locale: Locale) {
  if (locale === "es") return cursos;

  return cursos.map((curso) => {
    const copy = englishCourseCopy[curso.slug];

    return {
      ...curso,
      title: copy?.title ?? curso.title,
      short: copy?.short ?? curso.short,
      desc: copy?.desc ?? curso.desc,
      level: levelEn[curso.level] ?? curso.level,
      secciones: curso.secciones.map((section) => ({
        ...section,
        title: sectionTitleEn[section.title] ?? section.title,
      })),
    };
  });
}

export function getLocalizedCurso(slug: string, locale: Locale) {
  return getLocalizedCursos(locale).find((curso) => curso.slug === slug);
}

export function getLocalizedProximamente(locale: Locale) {
  if (locale === "es") return proximamente;
  return proximamente.map((item) => {
    const copy = englishUpcomingCopy[item.title];
    return copy ? { ...item, ...copy } : item;
  });
}
