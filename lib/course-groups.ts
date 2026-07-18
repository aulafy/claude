export type CourseGroup = {
  id: string;
  title: string;
  description: string;
  slugs: string[];
};

// Agrupación visible del catálogo español. Se valida junto con los itinerarios
// para que ningún curso publicado quede oculto o sin un punto de entrada claro.
export const courseGroups: CourseGroup[] = [
  {
    id: "empezar",
    title: "Empieza desde cero",
    description: "Entiende primero la IA generativa; después elige Codex, una web real o la base técnica solo cuando tu proyecto lo necesite.",
    slugs: ["ia-desde-cero", "codex-desde-cero", "crear-webs-con-ia", "fundamentos-aulafy"],
  },
  {
    id: "programacion",
    title: "Programación con IA",
    description: "Programa con agentes, domina la terminal y construye herramientas que puedes mantener.",
    slugs: ["codex-programadores", "claude-code", "ia-local"],
  },
  {
    id: "sistemas",
    title: "Sistemas, modelos y agentes",
    description: "Diseña, evalúa y opera sistemas de IA con control técnico, seguridad y costes observables.",
    slugs: ["agentes-automatizacion", "agentes-produccion", "rag-seguro", "ai-router", "seguridad-evals", "mlops-local", "fine-tuning-local", "automatizacion-self-hosted"],
  },
  {
    id: "aplicaciones",
    title: "Aplicaciones prácticas",
    description: "Lleva la IA a contenidos, negocios, videojuegos y flujos de trabajo reales.",
    slugs: ["ia-generativa", "videojuegos-3d-ia", "ia-pymes"],
  },
];
