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

const reviewedAt = "2026-07-18";

const records: Record<string, Omit<QualityRecord, "reviewedAt" | "status">> = {
  "que-puede-hacer-ia-generativa": { volatility: "estable", reviewDays: 180, scope: "Criterio de delegación, riesgo y revisión humana.", sources: [UNESCO, NIST] },
  "modelos-chat-llm": { volatility: "revisable", reviewDays: 30, scope: "Diferencias conceptuales entre modelo, interfaz, contexto y herramientas.", sources: [NIST] },
  "chat-rag-agentes-automatizacion": { volatility: "revisable", reviewDays: 30, scope: "Selección de arquitectura mínima y límites de autonomía.", sources: [NIST, OWASP] },
  "contexto-tokens-memoria": { volatility: "revisable", reviewDays: 30, scope: "Minimización de contexto, memoria y datos sensibles.", sources: [OWASP, NIST] },
  "pedir-resultados-utiles": { volatility: "estable", reviewDays: 180, scope: "Diseño de encargos observables y criterios de aceptación.", sources: [UNESCO, NIST] },
  "alucinaciones-verificar": { volatility: "estable", reviewDays: 180, scope: "Protocolo de contraste con fuentes primarias y evidencia.", sources: [UNESCO, NIST] },
  "elegir-modelo-herramienta": { volatility: "volátil", reviewDays: 7, scope: "Método de comparación; no publica una clasificación ni precios de modelos.", sources: [NIST] },
  "privacidad-derechos-seguridad": { volatility: "volátil", reviewDays: 7, scope: "Minimización, permisos y señales generales; no constituye asesoramiento jurídico.", sources: [OWASP, EU_AI] },
  "imagen-voz-video-responsable": { volatility: "revisable", reviewDays: 30, scope: "Consentimiento, transparencia, licencia y accesibilidad.", sources: [UNESCO, EU_AI] },
  "primer-proyecto-repetible": { volatility: "estable", reviewDays: 180, scope: "Rúbrica de proyecto repetible, revisable y de bajo riesgo.", sources: [UNESCO, NIST] },
};

export function getIaBasicsQuality(slug: string): QualityRecord | undefined {
  const record = records[slug];
  return record ? { ...record, reviewedAt, status: "Revisión editorial" } : undefined;
}
