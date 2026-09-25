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

> Plataforma abierta, gratuita y bilingüe (español e inglés) para aprender inteligencia artificial en 3 niveles: Empieza (desde cero, sin programar), Aplica (IA en el trabajo y en pymes) y Construye (software, agentes, RAG e IA local).

## Camino recomendado en 3 niveles

1. Empieza — primera tarea útil con IA en 15 minutos, sin conocimientos previos: ${SITE_URL}/empezar
2. Aplica — IA en pymes y en el trabajo, con privacidad y revisión humana: ${SITE_URL}/cursos/ia-pymes
3. Construye — programar con agentes de IA, RAG e IA local: ${SITE_URL}/cursos/claude-code
Biblioteca con todos los cursos: ${SITE_URL}/cursos

Portada y rutas ES: ${SITE_URL}/
English homepage and paths: ${SITE_URL}/en
Curso continuo ES: ${SITE_URL}/curso-ia
Continuous course EN: ${SITE_URL}/en/ai-course
Revisión estructural: 2026-09-25
Acceso: gratuito, sin registro y sin seguimiento personal del progreso
Contenido: CC BY 4.0
Código: MIT — https://github.com/aulafy/claude

Además, el curso continuo (material complementario) contiene ${unifiedModules.length} módulos, ${unifiedLessonCount} lecciones y ${unifiedModules.length} proyectos integradores. Cada lección declara resultados, explicación, práctica, evidencia, fuentes y volatilidad editorial. La portada también ofrece una biblioteca ampliada de cursos especializados y rutas por objetivo: no deben confundirse con el temario del curso continuo.

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

## Entradas recomendadas por intención

- Empezar desde cero: ${SITE_URL}/empezar
- Aplicar IA en una pyme: ${SITE_URL}/cursos/ia-pymes
- Programar y construir con IA: ${SITE_URL}/cursos/claude-code
- Consultar todos los cursos: ${SITE_URL}/cursos
- Buscar por tema o problema: ${SITE_URL}/buscar
- Contenido en inglés: ${SITE_URL}/en
`;

  return new NextResponse(text, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" } });
}
