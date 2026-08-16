import type { Locale } from "@/lib/i18n";

export type AdvisorProfile = "cero" | "trabajo" | "tecnico";
export type AdvisorGoal = "fundamentos" | "web" | "trabajo" | "programar" | "sistemas";

export type PathRecommendation = {
  pathSlug: string;
  pathTitle: string;
  title: string;
  href: string;
  reason: string;
  firstWin: string;
};

export function getPathRecommendation(profile: AdvisorProfile, goal: AdvisorGoal, locale: Locale): PathRecommendation {
  const en = locale === "en";
  let result: PathRecommendation = {
    pathSlug: en ? "applied-ai" : "desde-cero", pathTitle: en ? "Applied AI for work and content" : "Empieza desde cero, sin programar",
    title: en ? "Your first useful AI task" : "IA desde cero", href: en ? "/en/start" : "/cursos/ia-desde-cero",
    reason: en ? "Learn to frame a small task, verify the result, and protect data before choosing a specialised tool." : "Aprenderás a plantear una tarea, contrastar una respuesta y proteger tus datos antes de elegir una herramienta.",
    firstWin: en ? "Complete a low-risk task and explain what you checked yourself." : "Completar una tarea de bajo riesgo y explicar qué parte comprobaste tú.",
  };
  if (goal === "web") result = {
    pathSlug: en ? "programming" : "web-saas", pathTitle: en ? "Programming with AI agents" : "Crea una web o una demo SaaS",
    title: profile === "tecnico" ? (en ? "Codex for programmers" : "Crea webs profesionales con IA") : (en ? "Claude Code, from zero to pro" : "Codex desde cero"),
    href: profile === "tecnico" ? (en ? "/en/courses/codex-programadores" : "/cursos/crear-webs-con-ia") : (en ? "/en/courses/claude-code" : "/cursos/codex-desde-cero"),
    reason: en ? "Begin with a controlled development workflow before publishing or adding real users and data." : "Empezarás con un entorno controlado antes de publicar o añadir usuarios y datos reales.",
    firstWin: en ? "Turn an idea into a verifiable brief and a local prototype." : "Convertir una idea en un briefing comprobable y un prototipo local.",
  };
  else if (goal === "trabajo" || profile === "trabajo" && goal === "fundamentos") result = {
    pathSlug: en ? "applied-ai" : "negocio-creativo", pathTitle: en ? "Applied AI for work and content" : "Aplica IA a tu trabajo o negocio",
    title: en ? "AI for small businesses" : "IA práctica para pymes", href: en ? "/en/courses/ia-pymes" : "/cursos/ia-pymes",
    reason: en ? "Start from a real process and a success measure, while keeping data and final approval under human control." : "Partirás de un proceso y una métrica reales, manteniendo los datos y la aprobación final bajo control humano.",
    firstWin: en ? "Choose one reversible pilot with a baseline and a stopping rule." : "Elegir un piloto reversible con línea base y criterio de parada.",
  };
  else if (goal === "programar" || profile === "tecnico" && goal === "fundamentos") result = {
    pathSlug: en ? "programming" : "programacion", pathTitle: en ? "Programming with AI agents" : "Programación con agentes de IA",
    title: profile === "tecnico" ? (en ? "Codex for programmers" : "Codex para programadores") : (en ? "Aulafy foundations" : profile === "cero" ? "Codex desde cero" : "Fundamentos para Aulafy"),
    href: profile === "tecnico" ? (en ? "/en/courses/codex-programadores" : "/cursos/codex-programadores") : en ? "/en/courses/fundamentos-aulafy" : profile === "cero" ? "/cursos/codex-desde-cero" : "/cursos/fundamentos-aulafy",
    reason: en ? "Build the foundation for a repository → change → tests → review workflow." : "Construirás la base para trabajar con repositorio → cambio → pruebas → revisión.",
    firstWin: en ? "Inspect a repository and deliver one small tested change." : "Explorar un repositorio y entregar un cambio pequeño con pruebas.",
  };
  else if (goal === "sistemas") result = {
    pathSlug: en ? "systems" : "sistemas", pathTitle: en ? "AI systems engineering" : "Ingeniería de sistemas de IA",
    title: en ? "Aulafy foundations" : profile === "tecnico" ? "Fundamentos para Aulafy" : "Codex desde cero",
    href: en ? "/en/courses/fundamentos-aulafy" : profile === "tecnico" ? "/cursos/fundamentos-aulafy" : "/cursos/codex-desde-cero",
    reason: en ? "Prepare a reproducible base before RAG, agents, evaluation, observability, and operations." : "Prepararás una base reproducible antes de entrar en RAG, agentes, evaluación, observabilidad y operación.",
    firstWin: en ? "Run and verify a reproducible local project." : "Ejecutar y verificar un proyecto local reproducible.",
  };
  return result;
}
