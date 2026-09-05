import { cursos } from "@/lib/cursos";
import { blogPosts } from "@/lib/blog";
import { getLocalizedCurso } from "@/lib/i18n";
import { getEnglishCourseSections, getEnglishLessonTitle } from "@/lib/english-lessons";
import { getEnglishLessonSlug, getEnglishLessonTitleOverride } from "@/lib/course-lesson-routing";

export const wikiParts = [
  { id: "understand", number: "I", es: "Entender y verificar", en: "Understand and verify", description: "Criterio, vocabulario, encargos claros y una primera tarea comprobable.", descriptionEn: "Judgement, vocabulary, clear requests and a first verifiable task.", courses: ["ia-desde-cero"] },
  { id: "apply", number: "II", es: "Aplicar a tu oficio", en: "Apply to your work", description: "Oficina, educación, datos, webs y creación multimedia. Elige el resultado que necesitas.", descriptionEn: "Office work, education, data, websites and media. Choose the outcome you need.", courses: ["ia-pymes", "ia-docentes-educacion", "ia-datos-analitica", "crear-webs-con-ia", "ia-generativa", "videojuegos-3d-ia"] },
  { id: "build", number: "III", es: "Construir con IA", en: "Build with AI", description: "Entorno, archivos, código y talleres de agentes. Claude Code y DeepSeek Harness mantienen sus temarios propios.", descriptionEn: "Your environment, files, code and coding-agent workshops. Claude Code and DeepSeek Harness retain their own curricula.", courses: ["fundamentos-aulafy", "codex-desde-cero", "codex-programadores", "claude-code", "deepseek-harness"] },
  { id: "systems", number: "IV", es: "Diseñar sistemas", en: "Design systems", description: "Documentos propios, Ollama e IA local, agentes con límites y servicios privados.", descriptionEn: "Your documents, Ollama and local AI, bounded agents and private services.", courses: ["rag-seguro", "ia-local", "agentes-automatizacion", "agentes-produccion", "automatizacion-self-hosted"] },
  { id: "operate", number: "V", es: "Operar y proteger", en: "Operate and protect", description: "Enrutamiento, despliegue, adaptación de modelos, seguridad y evaluación.", descriptionEn: "Routing, deployment, model adaptation, security and evaluation.", courses: ["ai-router", "mlops-local", "fine-tuning-local", "seguridad-evals"] },
];

export function getWikiCourses(english: boolean) {
  return cursos.map((source) => {
    const translated = english ? getLocalizedCurso(source.slug, "en") : undefined;
    const course = translated ?? source;
    const language = translated ? "en" : "es";
    const href = `${translated ? "/en/courses" : "/cursos"}/${source.slug}`;
    return {
      slug: source.slug, title: course.title, description: course.short,
      updated: source.updatedAt, language, href,
      sections: (translated ? getEnglishCourseSections(course) : course.secciones).map((section) => ({
        title: section.title,
        lessons: section.lecciones.map((lesson) => ({
          title: translated ? getEnglishLessonTitleOverride(source.slug, lesson.slug) ?? getEnglishLessonTitle(source.slug, lesson.slug, lesson.title) : lesson.title,
          href: `${href}/${translated ? getEnglishLessonSlug(source.slug, lesson.slug) : lesson.slug}`,
        })),
      })),
    };
  });
}

export function getWikiArticles() {
  return blogPosts.map((post) => ({ title: post.title, description: post.description, href: `/blog/${post.slug}`, language: post.locale ?? "es", updated: post.updated, category: post.category }));
}

export const wikiReferences = [
  { es: "Programa continuo de IA", en: "Continuous AI course", href: "/curso-ia", hrefEn: "/en/ai-course" },
  { es: "Glosario", en: "Glossary (Spanish)", href: "/glosario" },
  { es: "Recetas prácticas", en: "Practical recipes (Spanish)", href: "/recetas" },
  { es: "Fuentes y verificación", en: "Sources and verification (Spanish)", href: "/fuentes" },
  { es: "Rutas de aprendizaje", en: "Learning paths", href: "/rutas", hrefEn: "/en/paths" },
  { es: "Licencia y atribución", en: "Licensing and attribution (Spanish)", href: "/licencia" },
];
