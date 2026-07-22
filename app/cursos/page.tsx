import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { cursos, proximamente, totalLecciones, type Curso } from "@/lib/cursos";
import { getCourseGuidance } from "@/lib/course-guidance";
import { getCourseQuality } from "@/lib/course-quality";
import { courseGroups } from "@/lib/course-groups";
import { spanishSearchIntents } from "@/lib/seo-strategy";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

function CourseCard({ course }: { course: Curso }) {
  const guidance = getCourseGuidance(course.slug, "es");
  const quality = getCourseQuality(course.slug);
  const terminalNeeded = ["fundamentos-aulafy", "codex-programadores", "claude-code", "ia-local", "rag-seguro", "agentes-automatizacion", "agentes-produccion", "mlops-local", "fine-tuning-local", "ai-router", "automatizacion-self-hosted"].includes(course.slug);
  const localFirst = ["ia-local", "rag-seguro", "automatizacion-self-hosted", "mlops-local", "fine-tuning-local"].includes(course.slug);
  return (
    <Link href={`/cursos/${course.slug}`} className="group aula-panel p-5 hover:border-violet-500/40">
      <span className="flex items-start gap-4">
        <span className="aula-icon flex-none text-violet-300"><Icon name={course.icon as IconName} /></span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap gap-2">
            <span className="aula-chip" data-tone="cyan">{course.level}</span>
            <span className="aula-chip">{totalLecciones(course)} lecciones</span>
            {guidance ? <span className="aula-chip">≈ {guidance.estimatedHours} h</span> : null}
          </span>
          <strong className="mt-3 block font-display text-lg text-zinc-100 group-hover:text-fuchsia-200">{course.title}</strong>
          <span className="mt-2 block text-sm text-zinc-500 leading-relaxed">{course.short}</span>
        </span>
      </span>
      {guidance ? (
        <span className="mt-5 block rounded-xl border border-zinc-800/80 bg-zinc-950/25 p-3">
          <span className="aula-meta text-zinc-600">Entregable</span>
          <span className="mt-1 block text-sm leading-relaxed text-zinc-300">{guidance.deliverable}</span>
        </span>
      ) : null}
      <span className="mt-4 flex flex-wrap items-center gap-2">
        <span className="aula-chip" data-tone={quality.volatility === "volátil" ? "amber" : "green"}>{quality.status}</span>
        {terminalNeeded ? <span className="aula-chip"><Icon name="terminal" /> Terminal</span> : <span className="aula-chip">Sin terminal al inicio</span>}
        {localFirst ? <span className="aula-chip" data-tone="green">local-first</span> : null}
        <span aria-hidden="true" className="ml-auto text-sm text-zinc-500 group-hover:text-violet-300">Abrir →</span>
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
  alternates: { canonical: "/cursos", languages: { "es-ES": "/cursos", "en-US": "/en/courses" } },
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
            "@type": "LearningResource",
            "@id": `${SITE_URL}/cursos/${curso.slug}#learning-resource`,
            name: curso.title,
            description: curso.desc,
            url: `${SITE_URL}/cursos/${curso.slug}`,
            inLanguage: "es",
            isAccessibleForFree: true,
            learningResourceType: "Course",
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

      <section className="aula-frame p-6 sm:p-8 mb-8">
          <div className="max-w-4xl">
            <span className="aula-section-label">
              <Icon name="capsule" /> Biblioteca de cápsulas
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mt-4 mb-4">
              Cursos de IA gratis en español: empieza desde cero o avanza
            </h1>
            <p className="lesson-lead max-w-3xl">
              Aprende inteligencia artificial con rutas prácticas para principiantes y perfiles técnicos:
              Codex, creación de webs con IA, casos para pymes, IA local, agentes y automatización.
              Todo es gratuito, en español y sin registro.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="aula-chip" data-tone="green"><Icon name="check" /> Gratis</span>
              <span className="aula-chip" data-tone="cyan"><Icon name="globe" /> En español</span>
              <span className="aula-chip" data-tone="amber"><Icon name="check" /> Proyectos verificables</span>
              <span className="aula-chip"><Icon name="shield" /> Fichas de confianza</span>
            </div>
          <p className="mt-5 aula-meta text-zinc-500">{cursos.length} cursos · {leccionesTotales} lecciones</p>
          </div>
      </section>

      <section className="grid gap-3 md:grid-cols-4 mb-8" aria-label="Filtros rápidos por intención">
        <a href="#empezar" className="aula-capsule p-4 group">
          <strong className="text-zinc-100 group-hover:text-cyan-200">Empiezo desde cero</strong>
          <span className="mt-2 block text-sm text-zinc-500">IA desde cero, Codex inicial y primera web.</span>
        </a>
        <a href="#programacion" className="aula-capsule p-4 group">
          <strong className="text-zinc-100 group-hover:text-cyan-200">Quiero programar</strong>
          <span className="mt-2 block text-sm text-zinc-500">Terminal, agentes de código, Claude Code y local.</span>
        </a>
        <a href="#sistemas" className="aula-capsule p-4 group">
          <strong className="text-zinc-100 group-hover:text-cyan-200">Quiero sistemas fiables</strong>
          <span className="mt-2 block text-sm text-zinc-500">RAG, agentes, seguridad, evals y operación.</span>
        </a>
        <a href="#aplicaciones" className="aula-capsule p-4 group">
          <strong className="text-zinc-100 group-hover:text-cyan-200">Quiero aplicarlo ya</strong>
          <span className="mt-2 block text-sm text-zinc-500">Pymes, contenido, videojuegos y casos reales.</span>
        </a>
      </section>

      <section className="aula-panel p-5 sm:p-6 mb-8" aria-labelledby="catalog-help-title">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="aula-section-label"><Icon name="route" /> Recomendación personal</span>
            <h2 id="catalog-help-title" className="mt-2 font-display text-xl font-bold text-white">¿No sabes qué curso elegir?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">Responde tres preguntas y recibe un solo curso para empezar. No necesitas entender todavía nombres como RAG, MLOps o agentes.</p>
          </div>
          <Link href="/que-aprender-ia" className="aula-button aula-button-primary shrink-0"><Icon name="rocket" /> Elegir mi primer paso</Link>
        </div>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          ¿Ya programas? Ve directamente al <Link href="/curso-codex-espanol" className="font-semibold text-[var(--accent)] underline underline-offset-4">curso de Codex en español</Link>.
        </p>
      </section>

      <details className="aula-disclosure aula-panel mb-10" aria-labelledby="course-goals-title">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6">
          <span>
            <span className="aula-section-label"><Icon name="search" /> Búsqueda por objetivo</span>
            <strong id="course-goals-title" className="mt-2 block font-display text-lg text-white">Ya sé qué quiero conseguir</strong>
          </span>
          <Icon name="chevronRight" className="aula-disclosure-icon text-zinc-500" />
        </summary>
        <div className="border-t border-zinc-800 p-5 sm:p-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {spanishSearchIntents.filter((item) => item.canonical !== "/cursos").map((item) => (
              <Link key={item.canonical} href={item.linkHref} className="aula-capsule p-4 group">
                <strong className="text-zinc-100 group-hover:text-cyan-200">{item.linkLabel}</strong>
                <span className="block mt-2 text-sm text-zinc-500 leading-relaxed">{item.linkDescription}</span>
              </Link>
            ))}
          </div>
        </div>
      </details>

      <div className="mb-6">
        <span className="aula-section-label"><Icon name="book" /> Biblioteca completa</span>
        <h2 className="mt-2 font-display text-2xl font-bold text-white">Abre solo el bloque que necesitas</h2>
        <p className="mt-2 max-w-3xl text-zinc-400">Cada tarjeta muestra nivel, duración aproximada, entregable, si requiere terminal y estado editorial. Empieza por una intención, no por una lista infinita.</p>
      </div>

      {courseGroups.map((group) => {
        const groupCourses = group.slugs.map((slug) => cursos.find((course) => course.slug === slug)).filter((course): course is Curso => Boolean(course));
        return (
          <details id={group.id} key={group.id} open={group.id === "empezar"} className="aula-disclosure aula-panel mb-5 scroll-mt-24">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 sm:p-6">
              <span>
                <strong id={`${group.id}-title`} className="font-display text-xl sm:text-2xl font-bold text-white">{group.title}</strong>
                <span className="mt-2 block max-w-3xl text-sm leading-relaxed text-zinc-400">{group.description}</span>
              </span>
              <span className="flex shrink-0 items-center gap-3"><span className="aula-chip" data-tone={group.id === "empezar" ? "green" : "cyan"}>{groupCourses.length} cursos</span><Icon name="chevronRight" className="aula-disclosure-icon text-zinc-500" /></span>
            </summary>
            <div className="border-t border-zinc-800 p-5 sm:p-6">
              <div className="grid md:grid-cols-2 gap-3">
                {groupCourses.map((course) => <CourseCard key={course.slug} course={course} />)}
              </div>
            </div>
          </details>
        );
      })}

      <a
        href="/aulafy-guia-completa.pdf"
        className="group aula-frame mt-10 flex flex-col sm:flex-row sm:items-center gap-4 p-4 hover:border-zinc-600 transition-colors"
      >
        <span className="aula-icon flex-shrink-0 text-fuchsia-300"><Icon name="filePdf" /></span>
        <span className="flex-1 text-sm">
          <strong className="text-white">¿Prefieres una lectura continua?</strong>{" "}
          <span className="text-zinc-400">Descarga el borrador editorial de la guía completa de Aulafy en PDF. Edición julio 2026, 654 páginas.</span>
        </span>
        <span className="aula-chip" data-tone="amber"><Icon name="download" /> Borrador PDF</span>
      </a>

      <details className="aula-disclosure aula-panel mt-5">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6">
          <span><span className="aula-section-label"><Icon name="lab" /> En preparación</span><strong className="mt-2 block font-display text-lg text-white">Ver próximos cursos</strong></span>
          <Icon name="chevronRight" className="aula-disclosure-icon text-zinc-500" />
        </summary>
        <div className="grid gap-5 border-t border-zinc-800 p-5 sm:grid-cols-2 sm:p-6">
          {proximamente.map((c) => (
            <div key={c.title} className="rounded-lg border border-zinc-800 p-5 opacity-80">
              <div className="aula-icon text-zinc-400 mb-4"><Icon name={c.icon as IconName} /></div>
              <h3 className="font-display font-semibold text-lg text-zinc-300">{c.title}</h3>
              <p className="mt-2 text-sm text-zinc-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
