import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { cursos, proximamente, totalLecciones, type Curso } from "@/lib/cursos";
import { getCourseGuidance } from "@/lib/course-guidance";
import { courseGroups } from "@/lib/course-groups";
import { spanishSearchIntents } from "@/lib/seo-strategy";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

function formatCourseUpdatedAt(value: string) {
  return new Intl.DateTimeFormat("es-ES", { month: "short", year: "numeric" })
    .format(new Date(`${value}T12:00:00Z`))
    .replace(".", "");
}

function CourseCard({ course }: { course: Curso }) {
  const index = cursos.findIndex((item) => item.slug === course.slug);
  const guidance = getCourseGuidance(course.slug, "es");
  return (
    <Link href={`/cursos/${course.slug}`} className="group aula-capsule block">
      <div
        className="aula-course-art h-36 flex items-end justify-between gap-4 p-5"
        style={{ background: `linear-gradient(120deg, ${course.gradient[0]}, ${course.gradient[1]})` }}
      >
        <div className="relative w-12 h-12 rounded-lg bg-white/15 border border-white/25 backdrop-blur flex items-center justify-center text-white text-xl">
          <Icon name={course.icon as IconName} />
        </div>
        <span className="relative rounded-md border border-white/25 bg-black/20 px-2.5 py-1 font-[family-name:var(--font-code)] text-xs text-white">
          cap.{String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="p-6">
        <div className="aula-meta mb-2 text-zinc-500">/cursos/{course.slug}</div>
        <h3 className="font-display font-bold text-xl text-white group-hover:text-fuchsia-300 transition-colors">
          {course.title}
        </h3>
        <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{course.desc}</p>
        {guidance && <p className="mt-4 text-sm text-zinc-300 leading-relaxed border-l-2 border-emerald-500/40 pl-3"><strong className="text-zinc-100">Terminas con:</strong> {guidance.deliverable}</p>}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="aula-chip"><Icon name="chart" /> {course.level}</span>
          <span className="aula-chip" data-tone="cyan"><Icon name="book" /> {totalLecciones(course)} lecciones</span>
          {course.pdf && <span className="aula-chip" data-tone="amber"><Icon name="pdf" /> PDF</span>}
          <span className="aula-chip" data-tone="green">open</span>
          {guidance && <span className="aula-chip"><Icon name="calendar" /> ≈ {guidance.estimatedHours} h</span>}
          <span className="aula-chip" title={`Última actualización: ${course.updatedAt}`}><Icon name="calendar" /> Actualizado: {formatCourseUpdatedAt(course.updatedAt)}</span>
        </div>
      </div>
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
        <div className="grid lg:grid-cols-[1fr_280px] gap-8 items-end">
          <div>
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
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="aula-panel p-4">
              <div className="aula-meta text-zinc-500">cursos</div>
              <div className="font-display text-3xl font-bold text-white mt-1">{cursos.length}</div>
            </div>
            <div className="aula-panel p-4">
              <div className="aula-meta text-zinc-500">lecciones</div>
              <div className="font-display text-3xl font-bold text-white mt-1">{leccionesTotales}</div>
            </div>
            <div className="aula-panel p-4 col-span-2">
              <div className="aula-meta text-zinc-500">formato</div>
              <div className="font-display text-xl font-bold text-white mt-1">web + PDF</div>
            </div>
          </div>
        </div>
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
        <p className="mt-2 max-w-3xl text-zinc-400">«Empieza desde cero» aparece abierto. Los bloques técnicos y de aplicación quedan disponibles sin competir por tu atención.</p>
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
              <div className="grid md:grid-cols-2 gap-6">
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
