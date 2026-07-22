export type CourseVolatility = "estable" | "revisable" | "volátil";
export type CourseQualityStatus =
  | "Revisión editorial"
  | "Probado parcialmente"
  | "Necesita revisión";

export type CourseQualityRecord = {
  status: CourseQualityStatus;
  reviewedAt: string;
  volatility: CourseVolatility;
  reviewDays: 7 | 30 | 180;
  scope: string;
  evidence: string[];
  sources: { label: string; href: string }[];
  nextReview: string;
};

const NIST = {
  label: "NIST · AI Risk Management Framework",
  href: "https://www.nist.gov/itl/ai-risk-management-framework",
};
const OWASP_LLM = {
  label: "OWASP · Top 10 para aplicaciones con LLM",
  href: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
};
const OPENAI_CODEX = {
  label: "OpenAI · Codex",
  href: "https://developers.openai.com/codex",
};
const OPENAI_DOCS = {
  label: "OpenAI · documentación de plataforma",
  href: "https://platform.openai.com/docs",
};
const ANTHROPIC_DOCS = {
  label: "Anthropic · documentación",
  href: "https://docs.anthropic.com/",
};
const MCP_SPEC = {
  label: "Model Context Protocol · documentación",
  href: "https://modelcontextprotocol.io/",
};
const OLLAMA = {
  label: "Ollama · documentación",
  href: "https://ollama.com/",
};
const HUGGING_FACE_MODEL_CARDS = {
  label: "Hugging Face · Model Cards",
  href: "https://huggingface.co/docs/hub/en/model-cards",
};
const N8N = {
  label: "n8n · documentación",
  href: "https://docs.n8n.io/",
};
const VERCEL = {
  label: "Vercel · documentación",
  href: "https://vercel.com/docs",
};
const SUPABASE = {
  label: "Supabase · documentación",
  href: "https://supabase.com/docs",
};
const LANGGRAPH = {
  label: "LangGraph · documentación",
  href: "https://langchain-ai.github.io/langgraph/",
};
const LITELLM = {
  label: "LiteLLM · documentación",
  href: "https://docs.litellm.ai/",
};
const EU_AI_ACT = {
  label: "Comisión Europea · marco regulador de IA",
  href: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
};

const reviewedAt = "2026-07-22";

function addDays(isoDate: string, days: number) {
  const date = new Date(`${isoDate}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function record(input: Omit<CourseQualityRecord, "reviewedAt" | "nextReview">): CourseQualityRecord {
  return {
    ...input,
    reviewedAt,
    nextReview: addDays(reviewedAt, input.reviewDays),
  };
}

const fallback = record({
  status: "Revisión editorial",
  volatility: "revisable",
  reviewDays: 30,
  scope:
    "Estructura educativa, coherencia del temario, fuentes generales y riesgos. Las lecciones técnicas concretas deben probar comandos y versiones antes de marcarse como probadas.",
  evidence: [
    "Curso incluido en rutas visibles.",
    "Fecha ISO obligatoria en catálogo.",
    "Resultado educativo y entregable revisados por audit automático.",
  ],
  sources: [NIST, OWASP_LLM],
});

const records: Record<string, CourseQualityRecord> = {
  "ia-desde-cero": record({
    status: "Revisión editorial",
    volatility: "estable",
    reviewDays: 180,
    scope: "Conceptos iniciales, riesgos, privacidad, verificación, primera utilidad con IA y límites de delegación para alumnos sin experiencia previa.",
    evidence: ["Microprácticas sin sesión.", "Ficha de calidad por lección.", "Fuentes primarias de educación y riesgo."],
    sources: [NIST, OWASP_LLM, EU_AI_ACT],
  }),
  "codex-desde-cero": record({
    status: "Revisión editorial",
    volatility: "volátil",
    reviewDays: 7,
    scope: "Uso educativo de Codex, permisos, repositorios, navegación, tareas locales y prácticas sin exponer secretos.",
    evidence: ["Curso con comprobación inicial.", "Fuentes oficiales de Codex.", "Auditoría de estructura y lecciones."],
    sources: [OPENAI_CODEX, OPENAI_DOCS],
  }),
  "codex-programadores": record({
    status: "Revisión editorial",
    volatility: "volátil",
    reviewDays: 7,
    scope: "Flujos de programación con agentes de código, revisión de diffs, permisos y validación proporcional al riesgo.",
    evidence: ["Lecciones con fuentes oficiales.", "Checks específicos del curso Codex.", "Énfasis en revisión humana y tests."],
    sources: [OPENAI_CODEX, OPENAI_DOCS],
  }),
  "claude-code": record({
    status: "Revisión editorial",
    volatility: "volátil",
    reviewDays: 7,
    scope: "Uso práctico de Claude Code, CLAUDE.md, permisos, MCP, hooks, skills y flujos de desarrollo.",
    evidence: ["Contenido enlazado a documentación del proveedor.", "Advertencias de permisos y secretos.", "Ritmo de revisión semanal por volatilidad."],
    sources: [ANTHROPIC_DOCS, MCP_SPEC, OWASP_LLM],
  }),
  "crear-webs-con-ia": record({
    status: "Probado parcialmente",
    volatility: "revisable",
    reviewDays: 30,
    scope: "Proceso educativo para crear, revisar y publicar webs con IA, GitHub, Vercel, SEO básico y controles anti-AI-slop.",
    evidence: ["Build de Aulafy ejecutado.", "Curso generado desde fuente Markdown.", "Checklist de calidad web y despliegue."],
    sources: [VERCEL, SUPABASE, OPENAI_CODEX],
  }),
  "ia-pymes": record({
    status: "Revisión editorial",
    volatility: "volátil",
    reviewDays: 7,
    scope: "Diagnóstico, piloto, automatización, privacidad, costes y operación mínima para pymes de 1 a 50 personas.",
    evidence: ["Kit editable para pymes.", "Advertencias de costes y datos.", "Flujo fiable antes de permisos o agentes."],
    sources: [NIST, OWASP_LLM, N8N, EU_AI_ACT],
  }),
  "automatizacion-self-hosted": record({
    status: "Revisión editorial",
    volatility: "revisable",
    reviewDays: 30,
    scope: "Automatización self-hosted con n8n, Docker, Ollama, colas, aprobaciones, backups y límites operativos.",
    evidence: ["Fuentes oficiales de n8n y Ollama.", "Lecciones orientadas a operación mínima.", "Advertencias de VPS, secretos y mantenimiento."],
    sources: [N8N, OLLAMA, OWASP_LLM],
  }),
  "rag-seguro": record({
    status: "Revisión editorial",
    volatility: "revisable",
    reviewDays: 30,
    scope: "RAG con chunking, embeddings, búsqueda híbrida, re-ranking, citaciones, permisos, evals y abstención.",
    evidence: ["Curso específico de RAG seguro.", "Lecciones de evaluación y citaciones.", "Énfasis en autorización y recuperación medible."],
    sources: [NIST, OWASP_LLM, HUGGING_FACE_MODEL_CARDS],
  }),
  "agentes-automatizacion": record({
    status: "Revisión editorial",
    volatility: "volátil",
    reviewDays: 7,
    scope: "Agentes, MCP, subagentes, loops, permisos, memoria, retries, idempotencia, verificación y separación entre propuesta, ejecución y revisión.",
    evidence: ["Lecciones de MCP seguro y verificación.", "Patrones de agente/verificador.", "Riesgos de herramientas con escritura."],
    sources: [MCP_SPEC, OWASP_LLM, OPENAI_CODEX],
  }),
  "agentes-produccion": record({
    status: "Revisión editorial",
    volatility: "volátil",
    reviewDays: 7,
    scope: "Operación de agentes con estado, memoria, evals, logs, human-in-the-loop, recuperación de errores y observabilidad.",
    evidence: ["Lecciones sobre trazas y evals.", "Lecciones sobre recuperación y revisión humana.", "Conexión con observabilidad de agentes."],
    sources: [LANGGRAPH, NIST, OWASP_LLM],
  }),
  "seguridad-evals": record({
    status: "Revisión editorial",
    volatility: "revisable",
    reviewDays: 30,
    scope: "Riesgos, privacidad, red teaming, OWASP LLM, supply chain y evaluación mínima de sistemas de IA.",
    evidence: ["Curso dedicado a seguridad y evals.", "Fuentes de riesgo primarias.", "Proyecto de auditoría."],
    sources: [OWASP_LLM, NIST, EU_AI_ACT],
  }),
  "ia-local": record({
    status: "Revisión editorial",
    volatility: "volátil",
    reviewDays: 7,
    scope: "Ollama, modelos locales, VRAM, cuantización, Open WebUI, RAG local, hardware y límites frente a cloud.",
    evidence: ["Curso con hardware y troubleshooting.", "Fuentes de Ollama y model cards.", "Advertencias de requisitos reales."],
    sources: [OLLAMA, HUGGING_FACE_MODEL_CARDS, OWASP_LLM],
  }),
  "fine-tuning-local": record({
    status: "Revisión editorial",
    volatility: "volátil",
    reviewDays: 7,
    scope: "Datasets, LoRA/QLoRA, SFT, Axolotl, Unsloth, evals, overfitting, exportación, licencias y límites reales de publicación de modelos ajustados.",
    evidence: ["Curso especializado.", "Revisión semanal por cambios de modelos, librerías y licencias.", "Énfasis en evals antes de publicar modelos."],
    sources: [HUGGING_FACE_MODEL_CARDS, NIST],
  }),
  "mlops-local": record({
    status: "Revisión editorial",
    volatility: "volátil",
    reviewDays: 7,
    scope: "Serving local, vLLM, LiteLLM, routing híbrido, observabilidad, costes, colas y recuperación.",
    evidence: ["Curso de operación.", "Fuentes de gateway y serving.", "Advertencias de VRAM, colas y costes."],
    sources: [LITELLM, OLLAMA, NIST],
  }),
  "ai-router": record({
    status: "Revisión editorial",
    volatility: "volátil",
    reviewDays: 7,
    scope: "Routing de modelos, políticas, shadow mode, quality scoring, presupuesto y gateway multi-modelo.",
    evidence: ["Curso con políticas y scoring.", "Fuentes de LiteLLM.", "Separación de calidad, coste y fallback."],
    sources: [LITELLM, OPENAI_DOCS, NIST],
  }),
};

export function getCourseQuality(slug: string): CourseQualityRecord {
  return records[slug] ?? fallback;
}
