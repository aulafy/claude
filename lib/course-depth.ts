// Profundidad real de cada curso, medida sobre el texto publicado (no sobre lo que se promete).
// La genera `npm run audit:depth` contra el sitio (o un build local); no se edita a mano.
// Complementa la ficha de confianza (`course-quality.ts`): la confianza dice QUÉ se revisó; la profundidad dice CUÁNTO hay.
export type CourseDepth = "completo" | "desarrollo" | "esquema";
export type CourseDepthRecord = { depth: CourseDepth; lessons: number; medianWords: number; minWords: number; codeBlocks: number; thinLessons: number; measuredAt: string };

export const DEPTH_MEASURED_AT = "2026-10-19";
// Umbrales (palabras propias por lección, sin texto repetido entre lecciones): <250 = esquema; <450 = en desarrollo; ≥450 = completo.
export const DEPTH_THRESHOLDS = { schema: 250, development: 450 } as const;

const MEASURES: Record<string, Omit<CourseDepthRecord, "depth" | "measuredAt">> = {
  "ia-docentes-educacion": {
    "lessons": 16,
    "medianWords": 120,
    "minWords": 96,
    "codeBlocks": 0,
    "thinLessons": 16
  },
  "ia-datos-analitica": {
    "lessons": 14,
    "medianWords": 191,
    "minWords": 167,
    "codeBlocks": 1,
    "thinLessons": 14
  },
  "automatizacion-self-hosted": {
    "lessons": 10,
    "medianWords": 285,
    "minWords": 235,
    "codeBlocks": 15,
    "thinLessons": 1
  },
  "fine-tuning-local": {
    "lessons": 8,
    "medianWords": 304,
    "minWords": 254,
    "codeBlocks": 16,
    "thinLessons": 0
  },
  "crear-webs-con-ia": {
    "lessons": 47,
    "medianWords": 340,
    "minWords": 267,
    "codeBlocks": 73,
    "thinLessons": 0
  },
  "agentes-automatizacion": {
    "lessons": 20,
    "medianWords": 343,
    "minWords": 255,
    "codeBlocks": 52,
    "thinLessons": 0
  },
  "mlops-local": {
    "lessons": 10,
    "medianWords": 347,
    "minWords": 275,
    "codeBlocks": 18,
    "thinLessons": 0
  },
  "agentes-produccion": {
    "lessons": 9,
    "medianWords": 352,
    "minWords": 284,
    "codeBlocks": 15,
    "thinLessons": 0
  },
  "codex-programadores": {
    "lessons": 10,
    "medianWords": 354,
    "minWords": 320,
    "codeBlocks": 39,
    "thinLessons": 0
  },
  "rag-seguro": {
    "lessons": 14,
    "medianWords": 357,
    "minWords": 289,
    "codeBlocks": 32,
    "thinLessons": 0
  },
  "ai-router": {
    "lessons": 6,
    "medianWords": 380,
    "minWords": 357,
    "codeBlocks": 6,
    "thinLessons": 0
  },
  "fundamentos-aulafy": {
    "lessons": 6,
    "medianWords": 382,
    "minWords": 318,
    "codeBlocks": 15,
    "thinLessons": 0
  },
  "deepseek-harness": {
    "lessons": 10,
    "medianWords": 488,
    "minWords": 259,
    "codeBlocks": 24,
    "thinLessons": 0
  },
  "ia-generativa": {
    "lessons": 7,
    "medianWords": 506,
    "minWords": 459,
    "codeBlocks": 17,
    "thinLessons": 0
  },
  "seguridad-evals": {
    "lessons": 7,
    "medianWords": 564,
    "minWords": 512,
    "codeBlocks": 12,
    "thinLessons": 0
  },
  "ia-local": {
    "lessons": 35,
    "medianWords": 575,
    "minWords": 358,
    "codeBlocks": 106,
    "thinLessons": 0
  },
  "videojuegos-3d-ia": {
    "lessons": 6,
    "medianWords": 593,
    "minWords": 471,
    "codeBlocks": 15,
    "thinLessons": 0
  },
  "ia-pymes": {
    "lessons": 20,
    "medianWords": 612,
    "minWords": 300,
    "codeBlocks": 38,
    "thinLessons": 0
  },
  "claude-code": {
    "lessons": 24,
    "medianWords": 675,
    "minWords": 160,
    "codeBlocks": 89,
    "thinLessons": 2
  },
  "ia-desde-cero": {
    "lessons": 12,
    "medianWords": 688,
    "minWords": 608,
    "codeBlocks": 4,
    "thinLessons": 0
  },
  "codex-desde-cero": {
    "lessons": 20,
    "medianWords": 989,
    "minWords": 833,
    "codeBlocks": 68,
    "thinLessons": 0
  }
};

export function depthOf(medianWords: number): CourseDepth {
  return medianWords < DEPTH_THRESHOLDS.schema ? "esquema" : medianWords < DEPTH_THRESHOLDS.development ? "desarrollo" : "completo";
}

export function getCourseDepth(slug: string): CourseDepthRecord | null {
  const m = MEASURES[slug];
  return m ? { ...m, depth: depthOf(m.medianWords), measuredAt: DEPTH_MEASURED_AT } : null;
}

export const DEPTH_LABEL: Record<CourseDepth, { label: string; hint: string }> = {
  completo: { label: "Completo", hint: "Lecciones con desarrollo, ejemplos y ejercicios medibles." },
  desarrollo: { label: "En desarrollo", hint: "Útil, pero las lecciones aún son breves. Se está ampliando." },
  esquema: { label: "Esquema", hint: "Guion del curso: las lecciones todavía son resúmenes. No lo uses como único recurso." },
};

// Orden del catálogo: lo más sólido primero; dentro de cada nivel de profundidad se conserva el orden editorial.
export const DEPTH_ORDER: Record<CourseDepth, number> = { completo: 0, desarrollo: 1, esquema: 2 };
