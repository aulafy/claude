import type { Locale } from "@/lib/i18n";

export type LearningPath = {
  slug: string;
  title: string;
  description: string;
  audience: string;
  entry: string;
  firstStep: string;
  duration: string;
  outcome: string;
  courses: string[];
  featured: boolean;
};

const paths: Record<Locale, LearningPath[]> = {
  es: [
    {
      slug: "desde-cero",
      title: "Empieza desde cero, sin programar",
      description: "Aprende a usar Codex con seguridad, consigue resultados útiles y descubre la base técnica solo cuando la necesites.",
      audience: "Personas sin experiencia técnica, estudiantes y profesionales curiosos",
      entry: "Cero absoluto",
      firstStep: "Codex desde cero",
      duration: "2–4 semanas",
      outcome: "Crear un entregable útil, verificarlo y elegir con criterio tu siguiente especialización.",
      courses: ["codex-desde-cero"],
      featured: true,
    },
    {
      slug: "web-saas",
      title: "Crea una web o una demo SaaS",
      description: "Pasa de una idea a una web seria, accesible, publicada y mantenible; después practica con casos reales como METEO.",
      audience: "Principiantes, makers, estudiantes, autónomos y pequeños negocios",
      entry: "Sin experiencia previa",
      firstStep: "Codex desde cero",
      duration: "6–10 semanas",
      outcome: "Publicar una web real con código revisable, costes entendidos y un plan básico de seguridad y mantenimiento.",
      courses: ["codex-desde-cero", "crear-webs-con-ia"],
      featured: true,
    },
    {
      slug: "programacion",
      title: "Programación con agentes de IA",
      description: "Aprende a trabajar con Codex y Claude Code, y después conecta tus proyectos con modelos locales.",
      audience: "Programadores, makers y equipos de producto",
      entry: "Perfil técnico inicial o experiencia programando",
      firstStep: "Fundamentos para Aulafy",
      duration: "4–6 semanas",
      outcome: "Entregar cambios de software con pruebas, revisión y un flujo de agente controlado.",
      courses: ["fundamentos-aulafy", "codex-programadores", "claude-code", "ia-local"],
      featured: true,
    },
    {
      slug: "negocio-creativo",
      title: "Aplica IA a tu trabajo o negocio",
      description: "Automatiza trabajo real y crea recursos multimedia sin perder privacidad, licencias ni revisión humana.",
      audience: "Autónomos, pymes, docentes, operaciones y creadores",
      entry: "No técnico o técnico",
      firstStep: "Codex desde cero",
      duration: "3–6 semanas",
      outcome: "Construir un flujo útil para tu actividad con evidencia, permisos, costes y revisión humana.",
      courses: ["codex-desde-cero", "ia-pymes", "automatizacion-self-hosted", "ia-generativa", "videojuegos-3d-ia"],
      featured: true,
    },
    {
      slug: "sistemas",
      title: "Ingeniería de sistemas de IA",
      description: "Construye RAG, agentes y servicios de modelos; añade seguridad, observabilidad y evaluación.",
      audience: "Desarrolladores backend, ML engineers y perfiles DevOps",
      entry: "Técnico intermedio",
      firstStep: "Fundamentos para Aulafy",
      duration: "8–12 semanas",
      outcome: "Operar una aplicación de IA medible, segura y recuperable ante fallos.",
      courses: ["fundamentos-aulafy", "rag-seguro", "agentes-automatizacion", "agentes-produccion", "ai-router", "seguridad-evals", "mlops-local"],
      featured: true,
    },
    {
      slug: "modelos",
      title: "Modelos abiertos y post-training",
      description: "Pasa de ejecutar modelos locales a servirlos, evaluarlos y adaptarlos con tus propios datos.",
      audience: "Perfiles técnicos con Python y acceso a GPU",
      entry: "Técnico avanzado",
      firstStep: "Fundamentos para Aulafy",
      duration: "5–8 semanas",
      outcome: "Publicar un modelo adaptado y evaluado detrás de una API controlada.",
      courses: ["fundamentos-aulafy", "ia-local", "mlops-local", "fine-tuning-local", "ai-router", "seguridad-evals"],
      featured: false,
    },
    {
      slug: "capstone-ai-privada",
      title: "Capstone: plataforma de IA privada",
      description: "Integra RAG seguro, agentes, MLOps local y AI Router en un proyecto final auditable.",
      audience: "Equipos que quieren pasar de cursos sueltos a un sistema completo",
      entry: "Técnico avanzado",
      firstStep: "Fundamentos para Aulafy",
      duration: "10–14 semanas",
      outcome: "Construir una plataforma privada con RAG, agente con herramientas, gateway, evals, trazas, rollback y revisión humana.",
      courses: ["fundamentos-aulafy", "rag-seguro", "agentes-automatizacion", "agentes-produccion", "mlops-local", "ai-router", "seguridad-evals"],
      featured: false,
    },
  ],
  en: [
    {
      slug: "programming",
      title: "Programming with AI agents",
      description: "Learn Codex and Claude Code, then connect projects to local models.",
      audience: "Developers, makers, and product teams",
      entry: "Early technical or programming experience",
      firstStep: "Aulafy foundations",
      duration: "4–6 weeks",
      outcome: "Ship tested software changes through a controlled agent workflow.",
      courses: ["fundamentos-aulafy", "codex-programadores", "claude-code", "ia-local"],
      featured: true,
    },
    {
      slug: "systems",
      title: "AI systems engineering",
      description: "Build RAG, agents, and model services with security, observability, and evaluation.",
      audience: "Backend developers, ML engineers, and DevOps practitioners",
      entry: "Intermediate technical",
      firstStep: "Aulafy foundations",
      duration: "8–12 weeks",
      outcome: "Operate a measurable, secure AI application that recovers from failures.",
      courses: ["fundamentos-aulafy", "rag-seguro", "agentes-automatizacion", "agentes-produccion", "ai-router", "seguridad-evals", "mlops-local"],
      featured: true,
    },
    {
      slug: "open-models",
      title: "Open models and post-training",
      description: "Move from running local models to serving, evaluating, and adapting them with your data.",
      audience: "Technical learners with Python and GPU access",
      entry: "Advanced technical",
      firstStep: "Aulafy foundations",
      duration: "5–8 weeks",
      outcome: "Publish an evaluated adapted model behind a controlled API.",
      courses: ["fundamentos-aulafy", "ia-local", "mlops-local", "fine-tuning-local", "ai-router", "seguridad-evals"],
      featured: false,
    },
    {
      slug: "applied-ai",
      title: "Applied AI for work and content",
      description: "Automate real work and create media without losing privacy, licensing, or human review.",
      audience: "Small businesses, educators, freelancers, and creators",
      entry: "Non-technical or technical",
      firstStep: "Aulafy foundations",
      duration: "3–5 weeks",
      outcome: "Build a useful workflow with evidence, permissions, and human approval.",
      courses: ["fundamentos-aulafy", "ia-pymes", "automatizacion-self-hosted", "ia-generativa", "videojuegos-3d-ia"],
      featured: true,
    },
    {
      slug: "private-ai-capstone",
      title: "Capstone: private AI platform",
      description: "Integrate secure RAG, agents, local MLOps, and an AI Router into an auditable final project.",
      audience: "Teams moving from individual courses to a complete system",
      entry: "Advanced technical",
      firstStep: "Aulafy foundations",
      duration: "10–14 weeks",
      outcome: "Build a private platform with RAG, tool-using agent, gateway, evals, traces, rollback, and human review.",
      courses: ["fundamentos-aulafy", "rag-seguro", "agentes-automatizacion", "agentes-produccion", "mlops-local", "ai-router", "seguridad-evals"],
      featured: false,
    },
  ],
};

export function getLearningPaths(locale: Locale) {
  return paths[locale];
}
