import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { cursos, totalLecciones, type Curso } from "@/lib/cursos";
import { getCourseGuidance } from "@/lib/course-guidance";
import { courseGroups } from "@/lib/course-groups";
import TaskExplorer from "@/components/TaskExplorer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

function CourseCard({ course }: { course: Curso }) {
  const guidance = getCourseGuidance(course.slug, "es");
  return (
    <Link href={`/cursos/${course.slug}`} className="group aula-panel flex h-full flex-col p-5">
      <span className="flex items-start gap-4">
        <span className="aula-icon flex-none text-violet-300"><Icon name={course.icon as IconName} /></span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap gap-2">
            <span className="aula-chip" data-tone="cyan">{course.level}</span>
            <span className="aula-chip">{totalLecciones(course)} lecciones</span>
            {guidance ? <span className="aula-chip">≈ {guidance.estimatedHours} h</span> : null}
          </span>
          <strong className="mt-3 block font-display text-lg text-[var(--text)] group-hover:text-[var(--accent)]">{course.title}</strong>
          <span className="mt-2 block text-sm text-[var(--muted)] leading-relaxed">{course.short}</span>
        </span>
      </span>
      <span className="mt-auto flex items-center pt-5 text-sm font-semibold text-[var(--accent)]">
        Ver curso <span aria-hidden="true" className="ml-auto">→</span>
      </span>
    </Link>
  );
}

export const metadata: Metadata = {
  title: "Cursos de IA gratis en español: de cero a avanzado",
  description:
    "Cursos de IA gratis en español para aprender desde cero o avanzar en Codex, webs con IA, IA para pymes, RAG, agentes, seguridad y MLOps.",
  keywords: [
    "cursos gratis de IA",
    "cursos inteligencia artificial español",
    "curso IA open source",
    "curso Claude Code",
    "curso OpenAI Codex",
    "tutorial Codex para programadores",
    "curso Fable 5",
    "curso videojuegos 3D IA",
    "curso Godot Blender IA",
    "IA para CAD",
    "curso Ollama",
    "curso RAG",
    "curso agentes IA",
    "curso fine-tuning LLM",
    "curso MLOps LLM",
    "curso IA para pymes",
    "automatización IA self-hosted",
  ],
  alternates: { canonical: "/cursos", languages: { "es-ES": "/cursos", "en-US": "/en/courses", "x-default": "/cursos" } },
  openGraph: {
    title: "Cursos de IA gratis en español: de cero a avanzado",
    description:
      "Rutas prácticas, gratuitas y sin registro para aprender IA local, Codex, Claude Code, RAG, agentes, MLOps, seguridad y automatización.",
    url: "/cursos",
    type: "website",
    siteName: "Aulafy",
    locale: "es_ES",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Catálogo de cursos de IA en Aulafy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cursos de IA gratis en español: de cero a avanzado",
    description:
      "Catálogo práctico de Aulafy para aprender IA local, Claude Code, Fable 5, videojuegos 3D, RAG, agentes, MLOps y seguridad.",
    creator: "@learntouseai",
    images: ["/opengraph-image"],
  },
};

export default function Cursos() {
  const leccionesTotales = cursos.reduce((sum, curso) => sum + totalLecciones(curso), 0);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/cursos#webpage`,
        url: `${SITE_URL}/cursos`,
        name: "Cursos de IA gratis en español: de cero a avanzado",
        description: "Catálogo abierto de cursos prácticos y gratuitos para aprender inteligencia artificial en español.",
        inLanguage: "es",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/cursos#course-list` },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/cursos#course-list`,
        name: "Catálogo de cursos de IA de Aulafy",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: cursos.length,
        itemListElement: cursos.map((curso, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/cursos/${curso.slug}`,
          item: {
            "@type": "Course",
            "@id": `${SITE_URL}/cursos/${curso.slug}#learning-resource`,
            name: curso.title,
            description: curso.desc,
            url: `${SITE_URL}/cursos/${curso.slug}`,
            inLanguage: "es",
            isAccessibleForFree: true,
            provider: { "@id": `${SITE_URL}/#organization` },
          },
        })),
      },
    ],
  };

  return (
    <div className="aula-shell max-w-6xl mx-auto px-6 py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mb-4 aula-meta">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Cursos</span>
      </div>

      <section className="mb-10 border-b border-[var(--border)] pb-8">
          <div className="max-w-4xl">
            <span className="aula-section-label">
              <Icon name="book" /> Biblioteca de aprendizaje
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-[var(--text)] mt-4 mb-4">
              Encuentra lo que necesitas aprender
            </h1>
            <p className="lesson-lead max-w-3xl">
              Elige un objetivo y Aulafy te lleva al contenido adecuado. Sin registro, sin cookies y sin tener que entender antes toda la jerga de la IA.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="aula-chip" data-tone="green"><Icon name="check" /> Gratis</span>
              <span className="aula-chip" data-tone="cyan"><Icon name="globe" /> En español</span>
              <span className="aula-chip" data-tone="amber"><Icon name="check" /> Prácticas con evidencia</span>
              <span className="aula-chip"><Icon name="shield" /> Fichas de confianza</span>
            </div>
          <p className="mt-5 aula-meta text-zinc-500">{cursos.length} cursos · {leccionesTotales} lecciones</p>
          </div>
      </section>

      <TaskExplorer />

      <section className="border-y border-[var(--border)] py-6 mb-12" aria-labelledby="catalog-help-title">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="aula-section-label"><Icon name="route" /> Recomendación personal</span>
            <h2 id="catalog-help-title" className="mt-2 font-display text-xl font-bold text-[var(--text)]">¿Todavía no sabes qué elegir?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">Responde tres preguntas y recibe un único punto de partida.</p>
          </div>
          <Link href="/que-aprender-ia" className="aula-button aula-button-primary shrink-0"><Icon name="rocket" /> Elegir mi primer paso</Link>
        </div>
        <p className="mt-4 text-sm text-[var(--muted)]">
          ¿Ya programas? Empieza por el <Link href="/curso-codex-espanol" className="font-semibold text-[var(--accent)]">curso de Codex en español</Link>.
        </p>
      </section>

      <div className="mb-6">
        <span className="aula-section-label"><Icon name="book" /> Biblioteca completa</span>
        <h2 className="mt-2 font-display text-2xl font-bold text-[var(--text)]">Biblioteca completa</h2>
        <p className="mt-2 max-w-3xl text-[var(--muted)]">Cuatro bloques estables, desde los fundamentos hasta la construcción de sistemas y aplicaciones.</p>
      </div>

      {courseGroups.map((group) => {
        const groupCourses = group.slugs.map((slug) => cursos.find((course) => course.slug === slug)).filter((course): course is Curso => Boolean(course));
        return (
          <details id={group.id} key={group.id} open={group.id === "empezar"} className="aula-disclosure aula-panel mb-5 scroll-mt-24">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 sm:p-6">
              <span>
                <strong id={`${group.id}-title`} className="font-display text-xl sm:text-2xl font-bold text-[var(--text)]">{group.title}</strong>
                <span className="mt-2 block max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{group.description}</span>
              </span>
              <span className="flex shrink-0 items-center gap-3"><span className="aula-chip" data-tone={group.id === "empezar" ? "green" : "cyan"}>{groupCourses.length} cursos</span><Icon name="chevronRight" className="aula-disclosure-icon text-zinc-500" /></span>
            </summary>
            <div className="border-t border-[var(--border)] p-5 sm:p-6">
              <div className="grid md:grid-cols-2 gap-3">
                {groupCourses.map((course) => <CourseCard key={course.slug} course={course} />)}
              </div>
            </div>
          </details>
        );
      })}

    </div>
  );
}
