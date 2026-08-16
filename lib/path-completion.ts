import type { LearningProgress } from "./learning-progress.ts";
import { sevenDayPath } from "./seven-day-path.ts";

export function isSevenDayPathComplete(progress: LearningProgress | null, locale: "es" | "en") {
  if (!progress) return false;
  return sevenDayPath[locale].every((item) => progress.completedLessons.includes(item.href));
}

export function createPathCompletionMarkdown(progress: LearningProgress, locale: "es" | "en", generatedAt = new Date().toISOString(), baseUrl = "https://www.aulafy.net") {
  if (!isSevenDayPathComplete(progress, locale)) throw new Error("The seven-day path is not complete");
  const english = locale === "en";
  const formatter = new Intl.DateTimeFormat(english ? "en-GB" : "es-ES", { dateStyle: "long", timeZone: "UTC" });
  const items = sevenDayPath[locale];
  const lines = [
    `# ${english ? "My completed 7-day Aulafy path" : "Mi ruta de 7 días completada en Aulafy"}`,
    "",
    `${english ? "Summary generated" : "Resumen generado"}: ${formatter.format(new Date(generatedAt))}`,
    `${english ? "Active learning days stored locally" : "Días activos guardados localmente"}: ${progress.activityDays.length}`,
    `${english ? "Evidence entries stored locally" : "Evidencias guardadas localmente"}: ${progress.evidenceItems.length}`,
    "",
    `> ${english ? "This is a personal learning summary generated from local browser progress, not an academic credential or identity verification." : "Este es un resumen personal generado desde el progreso local del navegador, no una acreditación académica ni una verificación de identidad."}`,
    "",
    `## ${english ? "Completed missions" : "Misiones completadas"}`,
    "",
  ];

  for (const item of items) {
    lines.push(`- [x] [${item.title}](<${new URL(item.href, baseUrl).toString()}>) — ${item.result}`);
  }

  lines.push("", `## ${english ? "Next review" : "Próxima revisión"}`, "", english
    ? "Reopen the mission whose evidence is weakest, repeat it with a new low-risk case, and update your evidence notebook."
    : "Abre la misión cuya evidencia sea más débil, repítela con un caso nuevo de bajo riesgo y actualiza tu libreta de evidencias.");
  return `${lines.join("\n")}\n`;
}
