export type LessonVolatility = "estable" | "revisable" | "volátil";

type QualityRecord = {
  reviewedAt: string;
  status: "Revisión editorial";
  volatility: LessonVolatility;
  reviewDays: number;
  scope: string;
  sources: { label: string; href: string }[];
};

const UNESCO = { label: "UNESCO · IA generativa en educación", href: "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research" };
const NIST = { label: "NIST · AI Risk Management Framework", href: "https://www.nist.gov/itl/ai-risk-management-framework" };
const OWASP = { label: "OWASP · Top 10 para aplicaciones con LLM", href: "https://owasp.org/www-project-top-10-for-large-language-model-applications/" };
const EU_AI = { label: "Comisión Europea · marco regulador de IA", href: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" };
const OSI = { label: "OSI · Open Source AI Definition 1.0", href: "https://opensource.org/ai/open-source-ai-definition" };
const HF_CARDS = { label: "Hugging Face · Model Cards", href: "https://huggingface.co/docs/hub/en/model-cards" };
const DETECTORS = { label: "Liang et al. · sesgo de detectores de texto", href: "https://arxiv.org/abs/2304.02819" };

const initialReviewAt = "2026-07-18";
const lessonReviewDates: Record<string, string> = {
  "alucinaciones-verificar": "2026-07-19",
  "elegir-modelo-herramienta": "2026-07-19",
  "imagen-voz-video-responsable": "2026-07-19",
};

const records: Record<string, Omit<QualityRecord, "reviewedAt" | "status">> = {
  "que-puede-hacer-ia-generativa": { volatility: "estable", reviewDays: 180, scope: "Criterio de delegación, riesgo y revisión humana.", sources: [UNESCO, NIST] },
  "modelos-chat-llm": { volatility: "revisable", reviewDays: 30, scope: "Diferencias conceptuales entre modelo, interfaz, contexto y herramientas.", sources: [NIST] },
  "chat-rag-agentes-automatizacion": { volatility: "revisable", reviewDays: 30, scope: "Selección de arquitectura mínima y límites de autonomía.", sources: [NIST, OWASP] },
  "contexto-tokens-memoria": { volatility: "revisable", reviewDays: 30, scope: "Minimización de contexto, memoria y datos sensibles.", sources: [OWASP, NIST] },
  "pedir-resultados-utiles": { volatility: "estable", reviewDays: 180, scope: "Diseño de encargos observables y criterios de aceptación.", sources: [UNESCO, NIST] },
  "alucinaciones-verificar": { volatility: "estable", reviewDays: 180, scope: "Protocolo de contraste con fuentes primarias y evidencia.", sources: [UNESCO, NIST] },
  "elegir-modelo-herramienta": { volatility: "volátil", reviewDays: 7, scope: "Método de comparación, model cards y distinción entre open weights y open source; no publica una clasificación ni precios.", sources: [NIST, OSI, HF_CARDS] },
  "privacidad-derechos-seguridad": { volatility: "volátil", reviewDays: 7, scope: "Minimización, permisos y señales generales; no constituye asesoramiento jurídico.", sources: [OWASP, EU_AI] },
  "imagen-voz-video-responsable": { volatility: "revisable", reviewDays: 30, scope: "Consentimiento, transparencia, licencia, accesibilidad y límites de la detección automática.", sources: [UNESCO, EU_AI, DETECTORS] },
  "primer-proyecto-repetible": { volatility: "estable", reviewDays: 180, scope: "Rúbrica de proyecto repetible, revisable y de bajo riesgo.", sources: [UNESCO, NIST] },
};

export function getIaBasicsQuality(slug: string): QualityRecord | undefined {
  const record = records[slug];
  return record ? { ...record, reviewedAt: lessonReviewDates[slug] ?? initialReviewAt, status: "Revisión editorial" } : undefined;
}
