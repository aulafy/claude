import { NextResponse } from "next/server";
import { cursos, totalLecciones } from "@/lib/cursos";
import { getCourseGuidance, educationalReviewDate } from "@/lib/course-guidance";
import { SITE_URL } from "@/lib/seo-index";

export function GET() {
  const lessonCount = cursos.reduce((sum, course) => sum + totalLecciones(course), 0);
  const catalog = cursos.map((course) => {
    const guidance = getCourseGuidance(course.slug, "es");
    return `- [${course.title}](${SITE_URL}/cursos/${course.slug}): ${course.desc}${guidance ? ` Resultado: ${guidance.deliverable}` : ""}`;
  }).join("\n");

  const text = `# Aulafy

> Biblioteca educativa gratuita y bilingüe para aprender inteligencia artificial mediante proyectos verificables.

Aulafy publica ${cursos.length} cursos y ${lessonCount} lecciones en español, con versiones en inglés, sin registro. El contenido se organiza por resultados educativos, incluye fuentes oficiales y prioriza IA local, programación con agentes, RAG, automatización, seguridad, MLOps y modelos abiertos.

## Rutas recomendadas

- [Rutas de aprendizaje](${SITE_URL}/rutas): itinerarios por objetivo profesional.
- [English learning paths](${SITE_URL}/en/paths): English curriculum routes.
- [Catálogo en español](${SITE_URL}/cursos)
- [English catalog](${SITE_URL}/en/courses)

## Cursos

${catalog}

## Autoridad y uso

- Autor y editor: Ramón Guillamón — ${SITE_URL}/sobre-ramon-guillamon
- Fuentes oficiales: ${SITE_URL}/fuentes
- Licencia de contenido: CC BY 4.0
- Código: MIT — https://github.com/aulafy/claude
- Última revisión editorial global: ${educationalReviewDate}

## Índices

- Sitemap: ${SITE_URL}/sitemap-index.xml
- Índice JSON: ${SITE_URL}/search-index.json
- Contenido ampliado para asistentes: ${SITE_URL}/llms-full.txt
`;

  return new NextResponse(text, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" } });
}
