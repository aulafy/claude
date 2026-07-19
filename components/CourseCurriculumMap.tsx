import Link from "next/link";
import { getLocalizedCursos, type Locale } from "@/lib/i18n";
import { totalLecciones } from "@/lib/cursos";
import styles from "@/components/CourseCurriculumMap.module.css";

const sections = [
  {
    id: "base",
    slugs: ["ia-desde-cero"],
    es: {
      title: "Empieza aquí",
      description: "Crea una base común: qué puede hacer la IA, cómo pedir resultados y cómo comprobarlos antes de especializarte.",
      relation: "Desde esta base puedes aplicar la IA a una tarea o aprender a construir con código.",
    },
    en: {
      title: "Start here",
      description: "Build a common foundation: what AI can do, how to request useful results, and how to verify them.",
      relation: "From this foundation, apply AI to a task or learn to build with code.",
    },
  },
  {
    id: "aplicar",
    slugs: ["codex-desde-cero", "crear-webs-con-ia", "ia-pymes", "ia-generativa", "videojuegos-3d-ia"],
    es: {
      title: "Elige una aplicación",
      description: "Convierte la base en un resultado visible: una web, una mejora de negocio, contenido o una experiencia interactiva.",
      relation: "Si necesitas mantener código, datos o infraestructura, continúa por la rama técnica.",
    },
    en: {
      title: "Choose an application",
      description: "Turn the foundation into a visible outcome: a website, a business improvement, media, or an interactive experience.",
      relation: "Continue into the technical branch when you need to maintain code, data, or infrastructure.",
    },
  },
  {
    id: "construir",
    slugs: ["fundamentos-aulafy", "codex-programadores", "claude-code", "ia-local"],
    es: {
      title: "Construye con código",
      description: "Prepara el entorno, trabaja con agentes de programación y aprende a ejecutar modelos con control sobre tus proyectos.",
      relation: "Esta rama prepara los conocimientos necesarios para diseñar y operar sistemas de IA fiables.",
    },
    en: {
      title: "Build with code",
      description: "Prepare your environment, work with coding agents, and run models while keeping control of your projects.",
      relation: "This branch prepares you to design and operate reliable AI systems.",
    },
  },
  {
    id: "operar",
    slugs: ["rag-seguro", "agentes-automatizacion", "agentes-produccion", "automatizacion-self-hosted", "ai-router", "seguridad-evals", "mlops-local", "fine-tuning-local"],
    es: {
      title: "Lleva sistemas a producción",
      description: "Combina recuperación, agentes, evaluación, seguridad, despliegue y adaptación de modelos cuando el problema lo exija.",
      relation: "No es obligatorio completarlo todo: elige solo la pieza que tu sistema necesita y vuelve al mapa cuando crezca.",
    },
    en: {
      title: "Take systems to production",
      description: "Combine retrieval, agents, evaluation, security, deployment, and model adaptation when the problem requires it.",
      relation: "You do not need every course: choose the component your system needs and return as it grows.",
    },
  },
] as const;

const copy = {
  es: {
    eyebrow: "Mapa completo de Aulafy",
    title: "Cómo se relacionan todos los cursos",
    intro: "No es una lista que debas completar. Empieza por la base, elige un resultado y profundiza solo cuando tu proyecto necesite más control.",
    flow: ["Comprender", "Aplicar o construir", "Operar con confianza"],
    lessons: "lecciones",
    current: "Estás aquí",
    open: "Ver curso",
    all: "Ver catálogo completo",
  },
  en: {
    eyebrow: "Complete Aulafy map",
    title: "How all courses connect",
    intro: "This is not a checklist. Start with the foundation, choose an outcome, and go deeper only when your project needs more control.",
    flow: ["Understand", "Apply or build", "Operate with confidence"],
    lessons: "lessons",
    current: "You are here",
    open: "View course",
    all: "View full catalogue",
  },
} as const;

export default function CourseCurriculumMap({ currentSlug, locale = "es" }: { currentSlug: string; locale?: Locale }) {
  const text = copy[locale];
  const courses = getLocalizedCursos(locale);
  const bySlug = new Map(courses.map((course) => [course.slug, course]));
  const base = locale === "en" ? "/en/courses" : "/cursos";
  const visibleSections = sections
    .map((section) => ({
      ...section,
      courses: section.slugs
        .map((slug) => bySlug.get(slug))
        .filter((course): course is NonNullable<typeof course> => Boolean(course)),
    }))
    .filter((section) => section.courses.length > 0);

  return (
    <section className={styles.map} aria-labelledby="course-map-title">
      <div className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>{text.eyebrow}</p>
          <h2 id="course-map-title">{text.title}</h2>
          <p>{text.intro}</p>
        </div>
        <ol className={styles.flow} aria-label={text.title}>
          {text.flow.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}
        </ol>
      </div>

      <div className={styles.sections}>
        {visibleSections.map((section, sectionIndex) => {
          const sectionCopy = section[locale];
          return (
            <section className={styles.section} key={section.id} aria-labelledby={`course-map-${section.id}`}>
              <header>
                <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
                <div>
                  <h3 id={`course-map-${section.id}`}>{sectionCopy.title}</h3>
                  <p>{sectionCopy.description}</p>
                </div>
              </header>
              <div className={styles.grid}>
                {section.courses.map((course) => {
                  const current = course.slug === currentSlug;
                  return (
                    <Link href={`${base}/${course.slug}`} key={course.slug} className={styles.course} data-current={current || undefined} aria-current={current ? "page" : undefined}>
                      <span className={styles.courseTop}>
                        <strong>{course.title}</strong>
                        {current ? <small>{text.current}</small> : null}
                      </span>
                      <span className={styles.description}>{course.short}</span>
                      <span className={styles.meta}>{course.level} · {totalLecciones(course)} {text.lessons}</span>
                      <span className={styles.open}>{text.open} <span aria-hidden="true">→</span></span>
                    </Link>
                  );
                })}
              </div>
              <p className={styles.relation}><span aria-hidden="true">↳</span> {sectionCopy.relation}</p>
            </section>
          );
        })}
      </div>

      <Link className={styles.catalogue} href={base}>{text.all} <span aria-hidden="true">→</span></Link>
    </section>
  );
}
