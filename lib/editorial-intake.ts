export type EditorialIntent = "auto" | "crear" | "actualizar";
export type EditorialAudience =
  "principiante" | "estudiante" | "pyme" | "tecnico" | "avanzado";

export type EditorialIntake = {
  title: string;
  content: string;
  links: string[];
  audience: EditorialAudience;
  intent: EditorialIntent;
  existingPath?: string;
  desiredOutcome: string;
};

export type EditorialCriterion = {
  id: string;
  label: string;
  detail: string;
  points: number;
  maximum: number;
  passed: boolean;
};

export type EditorialEvaluation = {
  score: number;
  maximum: number;
  verdict: "suficiente" | "investigar" | "insuficiente";
  recommendation: "crear" | "actualizar" | "investigar";
  summary: string;
  criteria: EditorialCriterion[];
  missing: string[];
  validLinks: string[];
  primaryLinks: string[];
  warnings: string[];
};

const PRIMARY_HOSTS = [
  "openai.com",
  "anthropic.com",
  "docs.anthropic.com",
  "github.com",
  "huggingface.co",
  "arxiv.org",
  "doi.org",
  "nvidia.com",
  "ai.google.dev",
  "developers.google.com",
  "microsoft.com",
  "learn.microsoft.com",
  "docs.ollama.com",
  "ollama.com",
  "langchain.com",
  "langfuse.com",
  "modelcontextprotocol.io",
];

const PRACTICAL_TERMS = [
  "código",
  "codigo",
  "repositorio",
  "github",
  "documentación",
  "documentacion",
  "api",
  "instalar",
  "configurar",
  "ejemplo",
  "prueba",
  "benchmark",
  "dataset",
  "modelo",
  "comando",
  "error",
];

const RISK_TERMS = [
  "coste",
  "precio",
  "privacidad",
  "seguridad",
  "licencia",
  "riesgo",
  "límite",
  "limite",
  "datos",
];

const MAX_PUBLIC_LINKS = 10;
const MAX_PUBLIC_LINK_LENGTH = 1_000;

function validUrl(value: string) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}

function isPrimary(value: string) {
  try {
    const hostname = new URL(value).hostname.replace(/^www\./, "");
    return PRIMARY_HOSTS.some(
      (host) => hostname === host || hostname.endsWith(`.${host}`),
    );
  } catch {
    return false;
  }
}

function containsAny(text: string, terms: string[]) {
  const normalized = text.toLocaleLowerCase("es");
  return terms.some((term) => normalized.includes(term));
}

export function evaluateEditorialIntake(
  intake: EditorialIntake,
): EditorialEvaluation {
  const text = `${intake.title}\n${intake.content}\n${intake.desiredOutcome}`;
  const validLinks = [
    ...new Set(intake.links.map((link) => link.trim()).filter(validUrl)),
  ];
  const primaryLinks = validLinks.filter(isPrimary);
  const criteria: EditorialCriterion[] = [];

  const add = (
    id: string,
    label: string,
    detail: string,
    points: number,
    maximum: number,
  ) => {
    criteria.push({
      id,
      label,
      detail,
      points,
      maximum,
      passed: points === maximum,
    });
  };

  const contextPoints =
    intake.content.trim().length >= 700
      ? 2
      : intake.content.trim().length >= 250
        ? 1
        : 0;
  add(
    "context",
    "Contexto suficiente",
    `${intake.content.trim().length} caracteres aportados; buscamos problema, novedad y contexto.`,
    contextPoints,
    2,
  );

  add(
    "sources",
    "Fuentes consultables",
    validLinks.length > 0
      ? `${validLinks.length} enlace(s) válido(s).`
      : "No hay enlaces HTTP/HTTPS válidos.",
    validLinks.length > 0 ? 1 : 0,
    1,
  );

  add(
    "primary",
    "Fuente primaria",
    primaryLinks.length > 0
      ? `${primaryLinks.length} enlace(s) parecen documentación, repositorio, paper o proveedor original.`
      : "Una publicación de X puede indicar demanda, pero falta documentación o evidencia primaria.",
    primaryLinks.length > 0 ? 2 : 0,
    2,
  );

  add(
    "outcome",
    "Resultado educativo observable",
    intake.desiredOutcome.trim().length >= 45
      ? "El resultado esperado permite diseñar una práctica."
      : "Describe qué podrá construir, decidir o comprobar el alumno.",
    intake.desiredOutcome.trim().length >= 45
      ? 2
      : intake.desiredOutcome.trim().length >= 20
        ? 1
        : 0,
    2,
  );

  add(
    "practice",
    "Base para una práctica",
    containsAny(text, PRACTICAL_TERMS)
      ? "El material contiene señales de código, configuración, pruebas o documentación."
      : "Falta una acción reproducible o una evidencia que el alumno pueda obtener.",
    containsAny(text, PRACTICAL_TERMS) ? 1 : 0,
    1,
  );

  add(
    "risks",
    "Costes y riesgos",
    containsAny(text, RISK_TERMS)
      ? "El material menciona al menos un límite, coste, licencia o riesgo."
      : "Todavía no aparecen costes, privacidad, seguridad, licencia o mantenimiento.",
    containsAny(text, RISK_TERMS) ? 1 : 0,
    1,
  );

  const updateEvidence =
    intake.intent === "actualizar" || Boolean(intake.existingPath?.trim());
  add(
    "placement",
    "Encaje en Aulafy",
    updateEvidence
      ? `Se propone revisar ${intake.existingPath?.trim() || "contenido existente"}.`
      : intake.intent === "crear"
        ? "Se propone un tutorial nuevo."
        : "El sistema decidirá entre crear, actualizar o investigar.",
    intake.intent !== "auto" || Boolean(intake.existingPath?.trim()) ? 1 : 0,
    1,
  );

  const score = criteria.reduce(
    (total, criterion) => total + criterion.points,
    0,
  );
  const maximum = criteria.reduce(
    (total, criterion) => total + criterion.maximum,
    0,
  );
  const missing = criteria
    .filter((criterion) => !criterion.passed)
    .map((criterion) => criterion.detail);
  const warnings = [
    ...(intake.links.length > validLinks.length
      ? [
          `${intake.links.length - validLinks.length} enlace(s) no son URL HTTP/HTTPS válida.`,
        ]
      : []),
    "Los enlaces se clasifican, pero no se descargan ni se consideran verificados.",
    "Una señal de X, Reddit o un resumen de otro modelo nunca sustituye la fuente primaria.",
  ];

  const verdict =
    score >= 8 && primaryLinks.length > 0
      ? "suficiente"
      : score >= 5
        ? "investigar"
        : "insuficiente";
  const recommendation =
    verdict !== "suficiente"
      ? "investigar"
      : updateEvidence
        ? "actualizar"
        : "crear";

  return {
    score,
    maximum,
    verdict,
    recommendation,
    summary:
      verdict === "suficiente"
        ? `Hay base suficiente para preparar un borrador y ${recommendation === "actualizar" ? "compararlo con el contenido existente" : "diseñar una lección nueva"}.`
        : verdict === "investigar"
          ? "La idea es prometedora, pero necesita completar evidencia antes de generar un tutorial fiable."
          : "La señal todavía es demasiado débil para ocupar tiempo editorial.",
    criteria,
    missing,
    validLinks,
    primaryLinks,
    warnings,
  };
}

function publicIssueText(value: string, maximum = 4_000) {
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .replaceAll("<!--", "&lt;!--")
    .replaceAll("-->", "--&gt;")
    .replaceAll("@", "@\u200b")
    .trim()
    .slice(0, maximum);
}

export function buildGitHubTutorialIssueUrl(
  intake: EditorialIntake,
  evaluation: EditorialEvaluation,
) {
  const action =
    intake.intent === "actualizar"
      ? "Actualizar un tutorial"
      : intake.intent === "crear"
        ? "Crear un tutorial"
        : "Decidir entre crear o actualizar";
  const publicLinks = evaluation.validLinks
    .slice(0, MAX_PUBLIC_LINKS)
    .map((link) => publicIssueText(link, MAX_PUBLIC_LINK_LENGTH));
  const omittedLinks = Math.max(
    0,
    evaluation.validLinks.length - publicLinks.length,
  );
  const body = `## Propuesta

**Acción:** ${action}
**Público:** ${intake.audience}
**Página relacionada:** ${publicIssueText(intake.existingPath || "", 500) || "No indicada"}
**Evaluación previa:** ${evaluation.score}/${evaluation.maximum} — ${evaluation.verdict}

## Problema

${publicIssueText(intake.content, 2_500)}

## Resultado para el alumno

${publicIssueText(intake.desiredOutcome, 800)}

## Fuentes y señales aportadas

${publicLinks.map((link) => `- ${link}`).join("\n") || "- No se aportaron enlaces válidos."}
${omittedLinks > 0 ? `\n- ${omittedLinks} enlace(s) adicional(es) omitido(s) para mantener una petición manejable.` : ""}

## Comprobaciones pendientes

${evaluation.missing.map((item) => `- ${publicIssueText(item, 500)}`).join("\n") || "- Revisión técnica y editorial."}

---

Esta petición se preparó desde el formulario público de Aulafy. Los enlaces no han sido descargados ni verificados automáticamente.`;
  const parameters = new URLSearchParams({
    title: `[Tutorial] ${publicIssueText(intake.title, 180)}`,
    body,
    labels: "enhancement,documentation",
  });
  return `https://github.com/aulafy/claude/issues/new?${parameters.toString()}`;
}
