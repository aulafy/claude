import type { LearningEvidenceItem } from "./learning-progress.ts";

function singleLine(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function linkLabel(value: string) {
  return singleLine(value).replace(/[\\\[\]]/g, "\\$&");
}

function codeFence(content: string) {
  const longest = Math.max(2, ...[...content.matchAll(/`+/g)].map((match) => match[0].length));
  return "`".repeat(longest + 1);
}

export function createEvidenceMarkdown(items: LearningEvidenceItem[], locale: "es" | "en", exportedAt = new Date().toISOString(), baseUrl = "https://www.aulafy.net") {
  const english = locale === "en";
  const formatter = new Intl.DateTimeFormat(english ? "en-GB" : "es-ES", { dateStyle: "long", timeZone: "UTC" });
  const lines = [
    `# ${english ? "My Aulafy evidence notebook" : "Mi libreta de evidencias de Aulafy"}`,
    "",
    `${english ? "Exported" : "Exportada"}: ${formatter.format(new Date(exportedAt))}`,
    `${english ? "Entries" : "Evidencias"}: ${items.length}`,
    "",
    `> ${english ? "This file was created locally. Review it before sharing and remove personal, confidential, or secret information." : "Este archivo se creó localmente. Revísalo antes de compartirlo y elimina información personal, confidencial o secreta."}`,
    "",
  ];

  for (const [index, item] of items.entries()) {
    const fence = codeFence(item.content);
    const href = new URL(item.href, baseUrl).toString();
    lines.push(
      `## ${index + 1}. ${singleLine(item.title)}`,
      "",
      `- ${english ? "Saved" : "Guardada"}: ${formatter.format(new Date(item.savedAt))}`,
      `- ${english ? "Lesson" : "Lección"}: [${linkLabel(item.title)}](<${href}>)`,
      "",
      fence,
      item.content.trim(),
      fence,
      "",
    );
  }

  return `${lines.join("\n").trimEnd()}\n`;
}
