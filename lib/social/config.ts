export const SOCIAL_PILOT_UNITS = [
  {
    courseSlug: "codex-desde-cero",
    lessonSlug: "primera-web-local",
    courseTitle: "Codex desde cero",
    lessonTitle: "Construye tu primera web local",
    prompt:
      "Publica la web que has construido, explica qué necesidad resuelve y qué comprobaste antes de darla por terminada.",
  },
  {
    courseSlug: "codex-desde-cero",
    lessonSlug: "automatizar-con-vista-previa",
    courseTitle: "Codex desde cero",
    lessonTitle: "Automatiza una tarea repetitiva con vista previa",
    prompt:
      "Comparte una automatización segura: muestra la vista previa, los límites y cómo evitaste modificar datos por sorpresa.",
  },
  {
    courseSlug: "codex-desde-cero",
    lessonSlug: "proyecto-final",
    courseTitle: "Codex desde cero",
    lessonTitle: "Proyecto final según tu perfil",
    prompt:
      "Presenta tu proyecto final, las decisiones que tomaste, la evidencia de que funciona y el siguiente paso que mejorarías.",
  },
] as const;

export type SocialPilotUnit = (typeof SOCIAL_PILOT_UNITS)[number];

export function isSocialEnabled() {
  return process.env.NEXT_PUBLIC_AULAFY_SOCIAL_ENABLED === "true";
}

export function getSocialPilotUnit(courseSlug: string, lessonSlug: string) {
  return SOCIAL_PILOT_UNITS.find(
    (unit) => unit.courseSlug === courseSlug && unit.lessonSlug === lessonSlug,
  );
}

export function isSocialPilotLesson(courseSlug: string, lessonSlug: string) {
  return Boolean(getSocialPilotUnit(courseSlug, lessonSlug));
}

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error("La comunidad todavía no tiene configurada la conexión con Supabase.");
  }

  return { url, publishableKey };
}

export function isSocialPreviewMode() {
  return process.env.NODE_ENV !== "production" && process.env.AULAFY_SOCIAL_PREVIEW === "true";
}

export function isGoogleAuthEnabled() {
  return process.env.NEXT_PUBLIC_SUPABASE_GOOGLE_ENABLED === "true";
}
