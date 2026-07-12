import type { Locale } from "@/lib/i18n";

export type CourseGuidance = {
  track: string;
  audience: string;
  prerequisites: string[];
  outcomes: string[];
  deliverable: string;
  estimatedHours: number;
  updated: string;
};

const updated = "2026-07-10";

const guidanceEs: Record<string, CourseGuidance> = {
  "fundamentos-aulafy": {
    track: "Fundamentos",
    audience: "Personas que quieren entrar en cursos de IA local, agentes, RAG o MLOps con una base técnica clara.",
    prerequisites: ["Un ordenador propio", "Ganas de usar terminal sin miedo"],
    outcomes: ["Preparar un entorno local-first reproducible", "Usar Python con uv, Git, AGENTS.md y Docker con criterio", "Crear una plantilla base para proyectos de IA"],
    deliverable: "Un proyecto base de Aulafy con README, AGENTS.md, entorno Python, Git limpio y servicios preparados.",
    estimatedHours: 4,
    updated,
  },
  "codex-programadores": {
    track: "Programación con IA",
    audience: "Programadores y equipos que quieren incorporar agentes de código con criterio profesional.",
    prerequisites: ["Saber usar Git a nivel básico", "Tener un repositorio pequeño para practicar"],
    outcomes: ["Explorar código desconocido con evidencia", "Encargar e implementar cambios verificables", "Controlar permisos, revisión y automatización"],
    deliverable: "Un cambio completo en un repositorio real, con prueba, revisión y commit limpio.",
    estimatedHours: 5,
    updated,
  },
  "claude-code": {
    track: "Programación con IA",
    audience: "Personas técnicas y no técnicas que quieren construir software desde la terminal.",
    prerequisites: ["Un ordenador con acceso a terminal", "No hace falta experiencia previa con agentes"],
    outcomes: ["Instalar y configurar Claude Code", "Crear proyectos mediante encargos claros", "Usar skills, subagentes, MCP y hooks con seguridad"],
    deliverable: "Un flujo de desarrollo asistido adaptado a tu proyecto o trabajo.",
    estimatedHours: 12,
    updated,
  },
  "ia-local": {
    track: "Programación con IA",
    audience: "Makers, desarrolladores y profesionales que necesitan privacidad o control local.",
    prerequisites: ["Terminal básica", "8 GB de RAM como mínimo; 16 GB recomendados"],
    outcomes: ["Elegir y ejecutar modelos locales", "Conectar herramientas con Ollama o LM Studio", "Construir y publicar aplicaciones privadas"],
    deliverable: "Una aplicación de IA local funcional elegida entre RAG, voz, PDF o productividad.",
    estimatedHours: 18,
    updated,
  },
  "ia-generativa": {
    track: "Aplicaciones prácticas",
    audience: "Creadores, docentes y perfiles multimedia que buscan flujos reproducibles.",
    prerequisites: ["Manejo básico de archivos", "GPU opcional; se explican alternativas"],
    outcomes: ["Entender modelos y licencias", "Generar imagen, voz y vídeo con control", "Documentar semillas, modelos y parámetros"],
    deliverable: "Una cápsula educativa multimedia reproducible y con licencias revisadas.",
    estimatedHours: 7,
    updated,
  },
  "videojuegos-3d-ia": {
    track: "Aplicaciones prácticas",
    audience: "Desarrolladores de juegos, artistas 3D y personas que crean simulaciones.",
    prerequisites: ["Instalar Godot y Blender", "No hace falta experiencia profesional en 3D"],
    outcomes: ["Preparar un pipeline Blender-Godot", "Crear y validar assets asistidos por IA", "Integrar un NPC con modelo local"],
    deliverable: "Un prototipo 3D jugable con assets limpios y una mecánica verificable.",
    estimatedHours: 8,
    updated,
  },
  "seguridad-evals": {
    track: "Sistemas, modelos y agentes",
    audience: "Equipos que publican aplicaciones con LLM y necesitan medir riesgos.",
    prerequisites: ["Conocer el flujo básico de una aplicación de IA", "Poder ejecutar tests o scripts"],
    outcomes: ["Modelar amenazas con OWASP y NIST", "Crear evals y pruebas adversarias", "Auditar privacidad y cadena de suministro"],
    deliverable: "Una auditoría priorizada de una aplicación de IA con evidencias y mitigaciones.",
    estimatedHours: 8,
    updated,
  },
  "mlops-local": {
    track: "Sistemas, modelos y agentes",
    audience: "Desarrolladores que quieren servir modelos abiertos de forma fiable.",
    prerequisites: ["Python y Docker básicos", "Conocer inferencia local con Ollama o llama.cpp"],
    outcomes: ["Elegir un servidor de inferencia", "Añadir routing, límites y observabilidad", "Evaluar coste, latencia y fiabilidad"],
    deliverable: "Una mini plataforma LLM privada con gateway, métricas y límites operativos.",
    estimatedHours: 10,
    updated,
  },
  "fine-tuning-local": {
    track: "Sistemas, modelos y agentes",
    audience: "Perfiles técnicos que necesitan adaptar un modelo abierto a una tarea concreta.",
    prerequisites: ["Python intermedio", "Acceso a una GPU compatible o entorno de entrenamiento"],
    outcomes: ["Preparar datasets de calidad", "Entrenar LoRA o QLoRA de forma reproducible", "Detectar overfitting y exportar a GGUF"],
    deliverable: "Un adaptador evaluado y exportado para ejecutarse con herramientas locales.",
    estimatedHours: 10,
    updated,
  },
  "agentes-automatizacion": {
    track: "Sistemas, modelos y agentes",
    audience: "Programadores que quieren agentes útiles, auditables y resistentes a fallos.",
    prerequisites: ["Programación básica", "Entender APIs, Git y procesos de terminal"],
    outcomes: ["Diseñar agentes y herramientas con límites", "Construir skills y servidores MCP", "Controlar memoria, reintentos, costes y recuperación"],
    deliverable: "Un agente local con herramientas, estado persistente y controles de seguridad.",
    estimatedHours: 14,
    updated,
  },
  "agentes-produccion": {
    track: "Sistemas, modelos y agentes",
    audience: "Equipos que llevan prototipos agénticos a operaciones reales.",
    prerequisites: ["Python o JavaScript", "Conceptos básicos de agentes y automatización"],
    outcomes: ["Elegir entre LangGraph, n8n y CrewAI", "Diseñar estado, memoria y revisión humana", "Observar y recuperar fallos"],
    deliverable: "Un agente de inbox con estado, herramientas, logs y aprobación humana.",
    estimatedHours: 8,
    updated,
  },
  "automatizacion-self-hosted": {
    track: "Sistemas, modelos y agentes",
    audience: "Pymes y técnicos que quieren automatización privada en infraestructura propia.",
    prerequisites: ["Conceptos básicos de Docker", "Un equipo local o VPS para practicar"],
    outcomes: ["Desplegar n8n, Ollama y Open WebUI", "Conectar RAG, webhooks y aprobaciones", "Preparar colas, copias y monitorización"],
    deliverable: "Un servicio interno de soporte ejecutado en una pila self-hosted.",
    estimatedHours: 9,
    updated,
  },
  "rag-seguro": {
    track: "Sistemas, modelos y agentes",
    audience: "Desarrolladores de asistentes que deben responder con documentos y permisos.",
    prerequisites: ["Python básico", "Entender qué son embeddings y una API de LLM"],
    outcomes: ["Diseñar ingesta y chunking robustos", "Combinar búsqueda híbrida y reranking", "Añadir citas, permisos, evals y defensa frente a inyección"],
    deliverable: "Un sistema RAG con respuestas citadas, evaluación y separación de permisos.",
    estimatedHours: 12,
    updated,
  },
  "ia-pymes": {
    track: "Aplicaciones prácticas",
    audience: "Autónomos, pequeñas empresas y profesionales de operaciones.",
    prerequisites: ["Conocer una tarea repetitiva de tu negocio", "No hace falta programar"],
    outcomes: ["Priorizar casos de uso con retorno real", "Automatizar documentos y atención con revisión", "Aplicar privacidad y límites básicos"],
    deliverable: "Un flujo de oficina automatizado con revisión humana y datos protegidos.",
    estimatedHours: 6,
    updated,
  },
};

const guidanceEn: Record<string, CourseGuidance> = {};

Object.assign(guidanceEn, {
  "fundamentos-aulafy": { ...guidanceEs["fundamentos-aulafy"], track: "Foundations", audience: "Learners entering local AI, agents, RAG, or MLOps courses who need a clear technical base.", prerequisites: ["Your own computer", "Willingness to use the terminal calmly"], outcomes: ["Prepare a reproducible local-first environment", "Use Python with uv, Git, AGENTS.md, and Docker with judgment", "Create a base template for AI projects"], deliverable: "An Aulafy base project with README, AGENTS.md, Python environment, clean Git history, and services ready." },
  "codex-programadores": { ...guidanceEs["codex-programadores"], track: "AI-assisted programming", audience: "Developers and teams adopting coding agents professionally.", prerequisites: ["Basic Git skills", "A small repository for practice"], outcomes: ["Explore unfamiliar code with evidence", "Request and implement verifiable changes", "Control permissions, review, and automation"], deliverable: "A complete repository change with a test, review, and clean commit." },
  "claude-code": { ...guidanceEs["claude-code"], track: "AI-assisted programming", audience: "Technical and non-technical builders who want to create software from the terminal.", prerequisites: ["A computer with terminal access", "No previous agent experience required"], outcomes: ["Install and configure Claude Code", "Build projects from clear requests", "Use skills, subagents, MCP, and hooks safely"], deliverable: "An AI-assisted development workflow adapted to your work." },
  "ia-local": { ...guidanceEs["ia-local"], track: "AI-assisted programming", audience: "Makers and developers who need privacy and local control.", prerequisites: ["Basic terminal use", "8 GB RAM minimum; 16 GB recommended"], outcomes: ["Choose and run local models", "Connect tools through Ollama or LM Studio", "Build and publish private applications"], deliverable: "A working local AI application using RAG, voice, PDF, or productivity tools." },
});

export function getCourseGuidance(slug: string, locale: Locale = "es") {
  if (locale === "es") return guidanceEs[slug];
  return guidanceEn[slug] ?? {
    track: "Applied AI",
    audience: "Learners who want to move from concepts to a working, reviewable project.",
    prerequisites: ["Basic computer skills", "Time to complete the guided exercises"],
    outcomes: ["Understand the core technical decisions", "Apply the workflow in guided lessons", "Evaluate a practical result"],
    deliverable: "A practical project with explicit verification and next steps.",
    estimatedHours: guidanceEs[slug]?.estimatedHours ?? 6,
    updated,
  };
}

export const educationalReviewDate = updated;
