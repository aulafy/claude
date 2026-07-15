import { z } from "zod";
import { SOCIAL_PILOT_UNITS } from "@/lib/social/config";

const optionalUrl = z
  .string()
  .trim()
  .max(500, "El enlace es demasiado largo.")
  .refine((value) => !value || /^https?:\/\//i.test(value), "Usa una dirección que empiece por http:// o https://.")
  .transform((value) => value || null);

export const emailSchema = z.string().trim().email("Escribe un email válido.").max(254);

export const profileSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9_]{3,30}$/, "Usa entre 3 y 30 letras minúsculas, números o guiones bajos."),
  displayName: z.string().trim().min(2, "Escribe al menos 2 caracteres.").max(80),
  bio: z.string().trim().max(500, "La biografía no puede superar 500 caracteres.").transform((value) => value || null),
  website: optionalUrl,
  interests: z
    .string()
    .trim()
    .max(240)
    .transform((value) => normalizeTags(value)),
});

export const projectSchema = z
  .object({
    courseSlug: z.string().trim(),
    lessonSlug: z.string().trim(),
    title: z.string().trim().min(6, "El título debe tener al menos 6 caracteres.").max(120),
    summary: z.string().trim().min(20, "Resume el proyecto en al menos 20 caracteres.").max(320),
    whatBuilt: z.string().trim().min(40, "Explica el resultado con un poco más de detalle.").max(4000),
    whatLearned: z.string().trim().min(20, "Cuenta qué has aprendido.").max(2000),
    obstacles: z.string().trim().max(2000).transform((value) => value || null),
    technologies: z
      .string()
      .trim()
      .max(240)
      .transform((value) => normalizeTags(value)),
    difficulty: z.enum(["principiante", "intermedio", "avanzado"]),
    repositoryUrl: optionalUrl,
    demoUrl: optionalUrl,
    intent: z.enum(["draft", "published"]),
  })
  .superRefine((value, context) => {
    const validUnit = SOCIAL_PILOT_UNITS.some(
      (unit) => unit.courseSlug === value.courseSlug && unit.lessonSlug === value.lessonSlug,
    );
    if (!validUnit) {
      context.addIssue({
        code: "custom",
        path: ["lessonSlug"],
        message: "Esta lección todavía no participa en el piloto.",
      });
    }
  });

export const reviewSchema = z.object({
  projectId: z.string().uuid("El proyecto no es válido."),
  worksCorrectly: z.enum(["yes", "partly", "not_tested"]),
  explanationRating: z.coerce.number().int().min(1).max(5),
  educationalValue: z.coerce.number().int().min(1).max(5),
  feedback: z.string().trim().min(40, "La revisión debe aportar al menos 40 caracteres.").max(2000),
  suggestion: z.string().trim().max(1200).transform((value) => value || null),
});

export const reportSchema = z.object({
  targetType: z.enum(["project", "review", "profile"]),
  targetId: z.string().uuid("El contenido no es válido."),
  reason: z.enum(["spam", "illegal", "harassment", "copyright", "privacy", "malware", "other"]),
  details: z.string().trim().max(1500).transform((value) => value || null),
});

export const moderationSchema = z.object({
  reportId: z.string().uuid(),
  targetType: z.enum(["project", "review", "profile"]),
  targetId: z.string().uuid(),
  decision: z.enum(["hide", "restore", "remove", "dismiss_report"]),
  reason: z.string().trim().min(10, "Explica la decisión.").max(1000),
});

export function formValues(formData: FormData, keys: string[]) {
  return Object.fromEntries(keys.map((key) => [key, String(formData.get(key) ?? "")]));
}

function normalizeTags(value: string) {
  return [...new Set(value.split(",").map((tag) => tag.trim().toLowerCase()).filter(Boolean))].slice(0, 8);
}
