import type { Locale } from "@/lib/i18n";

export type LearningPath = {
  slug: string;
  title: string;
  description: string;
  audience: string;
  duration: string;
  outcome: string;
  courses: string[];
};

const paths: Record<Locale, LearningPath[]> = {
  es: [
    {
      slug: "programacion",
      title: "Programación con agentes de IA",
      description: "Aprende a trabajar con Codex y Claude Code, y después conecta tus proyectos con modelos locales.",
      audience: "Programadores, makers y equipos de producto",
      duration: "4–6 semanas",
      outcome: "Entregar cambios de software con pruebas, revisión y un flujo de agente controlado.",
      courses: ["codex-programadores", "claude-code", "ia-local"],
    },
    {
      slug: "sistemas",
      title: "Ingeniería de sistemas de IA",
      description: "Construye RAG, agentes y servicios de modelos; añade seguridad, observabilidad y evaluación.",
      audience: "Desarrolladores backend, ML engineers y perfiles DevOps",
      duration: "8–12 semanas",
      outcome: "Operar una aplicación de IA medible, segura y recuperable ante fallos.",
      courses: ["rag-seguro", "agentes-automatizacion", "agentes-produccion", "seguridad-evals", "mlops-local"],
    },
    {
      slug: "modelos",
      title: "Modelos abiertos y post-training",
      description: "Pasa de ejecutar modelos locales a servirlos, evaluarlos y adaptarlos con tus propios datos.",
      audience: "Perfiles técnicos con Python y acceso a GPU",
      duration: "5–8 semanas",
      outcome: "Publicar un modelo adaptado y evaluado detrás de una API controlada.",
      courses: ["ia-local", "mlops-local", "fine-tuning-local", "seguridad-evals"],
    },
    {
      slug: "negocio-creativo",
      title: "IA aplicada a negocio y contenido",
      description: "Automatiza trabajo real y crea recursos multimedia sin perder privacidad, licencias ni revisión humana.",
      audience: "Autónomos, pymes, docentes y creadores",
      duration: "3–5 semanas",
      outcome: "Construir un flujo útil para tu actividad con evidencia, permisos y revisión humana.",
      courses: ["ia-pymes", "automatizacion-self-hosted", "ia-generativa", "videojuegos-3d-ia"],
    },
  ],
  en: [
    {
      slug: "programming",
      title: "Programming with AI agents",
      description: "Learn Codex and Claude Code, then connect projects to local models.",
      audience: "Developers, makers, and product teams",
      duration: "4–6 weeks",
      outcome: "Ship tested software changes through a controlled agent workflow.",
      courses: ["codex-programadores", "claude-code", "ia-local"],
    },
    {
      slug: "systems",
      title: "AI systems engineering",
      description: "Build RAG, agents, and model services with security, observability, and evaluation.",
      audience: "Backend developers, ML engineers, and DevOps practitioners",
      duration: "8–12 weeks",
      outcome: "Operate a measurable, secure AI application that recovers from failures.",
      courses: ["rag-seguro", "agentes-automatizacion", "agentes-produccion", "seguridad-evals", "mlops-local"],
    },
    {
      slug: "open-models",
      title: "Open models and post-training",
      description: "Move from running local models to serving, evaluating, and adapting them with your data.",
      audience: "Technical learners with Python and GPU access",
      duration: "5–8 weeks",
      outcome: "Publish an evaluated adapted model behind a controlled API.",
      courses: ["ia-local", "mlops-local", "fine-tuning-local", "seguridad-evals"],
    },
    {
      slug: "applied-ai",
      title: "Applied AI for work and content",
      description: "Automate real work and create media without losing privacy, licensing, or human review.",
      audience: "Small businesses, educators, freelancers, and creators",
      duration: "3–5 weeks",
      outcome: "Build a useful workflow with evidence, permissions, and human approval.",
      courses: ["ia-pymes", "automatizacion-self-hosted", "ia-generativa", "videojuegos-3d-ia"],
    },
  ],
};

export function getLearningPaths(locale: Locale) {
  return paths[locale];
}
