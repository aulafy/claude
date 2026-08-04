import { NextResponse } from "next/server";
import { localized, unifiedLessonCount, unifiedModules, unifiedSources } from "@/lib/unified-course";
import { SITE_URL } from "@/lib/seo-index";

export function GET() {
  const modules = unifiedModules.map((module) => {
    const lessons = module.lessons.map((lesson) => `  - ${localized(lesson.title, "es")} (#${lesson.id})`).join("\n");
    return `- ${localized(module.title, "es")}: ${localized(module.purpose, "es")}\n${lessons}\n  - Proyecto integrador (#project-${module.id})`;
  }).join("\n");
  const sources = Object.values(unifiedSources).map((source) => `- ${source.label}: ${source.href}`).join("\n");

  const text = `# Aulafy

> Curso abierto, continuo y bilingüe para aprender inteligencia artificial desde los fundamentos hasta producción.

URL canónica ES: ${SITE_URL}/
Canonical EN URL: ${SITE_URL}/en
Revisión estructural: 2026-08-04
Acceso: gratuito, sin registro y sin seguimiento del progreso
Contenido: CC BY 4.0
Código: MIT — https://github.com/aulafy/claude

La experiencia principal de Aulafy contiene ${unifiedModules.length} módulos, ${unifiedLessonCount} lecciones y ${unifiedModules.length} proyectos integradores. Cada lección declara resultados, explicación, práctica, evidencia, fuentes y volatilidad editorial. El material histórico más extenso continúa disponible en el repositorio, pero no es la fuente canónica del curso unificado.

## Temario canónico

${modules}

## Fuentes primarias del curso

${sources}

## Autoridad y transparencia

- Autor y editor: Ramón Guillamón — ${SITE_URL}/sobre-ramon-guillamon
- Método de fuentes: ${SITE_URL}/fuentes
- Privacidad: ${SITE_URL}/privacidad
- Repositorio y cambios: https://github.com/aulafy/claude
- Índice ampliado para asistentes: ${SITE_URL}/llms-full.txt
`;

  return new NextResponse(text, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" } });
}
