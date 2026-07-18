import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon, { type IconName } from "@/components/Icon";
import CodexStartingCheck from "@/components/CodexStartingCheck";
import IaBasicsStartingCheck from "@/components/IaBasicsStartingCheck";
import ContinuarCurso from "@/components/ContinuarCurso";
import PortableProgress from "@/components/PortableProgress";
import { cursos, getCurso, totalLecciones } from "@/lib/cursos";
import { getCourseGuidance } from "@/lib/course-guidance";
import { isCourseAvailableInLocale } from "@/lib/i18n";
import { pluralLabel } from "@/lib/plural";
import { courseSeoOverrides } from "@/lib/seo-strategy";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

export function generateStaticParams() {
  return cursos.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const curso = getCurso(slug);
  if (!curso) return {};
  const lecciones = curso.secciones.flatMap((seccion) => seccion.lecciones.map((leccion) => leccion.title));
  const seoOverride = courseSeoOverrides[curso.slug];
  const title = seoOverride?.title ?? curso.title;
  const hasEnglishVersion = isCourseAvailableInLocale(curso, "en");
  const description = compactDescription(seoOverride?.description ??
    `${curso.desc} Curso gratis en español, sin registro, con ${totalLecciones(curso)} lecciones.`);
  return {
    title,
    description,
    keywords: [
      curso.title,
      curso.short,
      ...(seoOverride?.keywords ?? []),
      "Aulafy",
      ...lecciones.slice(0, 16),
    ],
    alternates: {
      canonical: `/cursos/${curso.slug}`,
      languages: hasEnglishVersion
        ? { "es-ES": `/cursos/${curso.slug}`, "en-US": `/en/courses/${curso.slug}` }
        : { "es-ES": `/cursos/${curso.slug}` },
    },
    openGraph: {
      title,
      description,
      url: `/cursos/${curso.slug}`,
      type: "website",
      siteName: "Aulafy",
      locale: "es_ES",
      images: [
        {
          url: "/opengraph-image",
        width: 1200,
        height: 630,
          alt: `${curso.title} en Aulafy`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@learntouseai",
      images: ["/opengraph-image"],
    },
  };
}

function compactDescription(text: string) {
  if (text.length <= 155) return text;
  const trimmed = text.slice(0, 152);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 120 ? lastSpace : 152)}...`;
}

export default async function CursoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const curso = getCurso(slug);
  if (!curso) notFound();

  const total = totalLecciones(curso);
  const guidance = getCourseGuidance(curso.slug, "es");
  const leccionesCurso = curso.secciones.flatMap((seccion) => seccion.lecciones);
  const leccionTitles = leccionesCurso.map((leccion) => leccion.title);
  const itinerary = curso.itinerary;
  const primaryPhase = itinerary?.phases.find((phase) => phase.recommended);
  const primaryLessonCount = primaryPhase ? primaryPhase.end - primaryPhase.start + 1 : 0;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LearningResource",
        "@id": `${SITE_URL}/cursos/${curso.slug}#learning-resource`,
        name: curso.title,
        description: curso.desc,
        inLanguage: "es",
        url: `${SITE_URL}/cursos/${curso.slug}`,
        isAccessibleForFree: true,
        educationalLevel: curso.level,
        timeRequired: guidance ? `PT${guidance.estimatedHours}H` : undefined,
        dateModified: guidance?.updated,
        audience: guidance ? { "@type": "Audience", audienceType: guidance.audience } : undefined,
        competencyRequired: guidance?.prerequisites,
        learningResourceType: "Course",
        keywords: [
          curso.title,
          curso.short,
          "curso gratis IA",
          "IA open source en español",
          ...leccionTitles,
        ].join(", "),
        teaches: guidance?.outcomes ?? leccionTitles,
        provider: { "@id": `${SITE_URL}/#organization` },
        author: { "@id": `${SITE_URL}/#author` },
        hasPart: leccionesCurso.map((leccion) => ({
          "@type": "LearningResource",
          name: leccion.title,
          url: `${SITE_URL}/cursos/${curso.slug}/${leccion.slug}`,
          inLanguage: "es",
          isAccessibleForFree: true,
          learningResourceType: "Lección",
          isPartOf: { "@id": `${SITE_URL}/cursos/${curso.slug}#learning-resource` },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Cursos", item: `${SITE_URL}/cursos` },
          {
            "@type": "ListItem",
            position: 3,
            name: curso.title,
            item: `${SITE_URL}/cursos/${curso.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="aula-shell max-w-5xl mx-auto px-6 py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mb-4 aula-meta">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/cursos" className="hover:text-zinc-400">Cursos</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">{curso.title}</span>
      </div>

      {/* Cabecera del curso */}
      <div
        className="aula-frame p-8 sm:p-10 mb-10"
        style={{ background: `linear-gradient(120deg, ${curso.gradient[0]}22, ${curso.gradient[1]}22)` }}
      >
        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          <div className="flex-1 min-w-0">
            <span className="aula-section-label">
              <Icon name="capsule" /> cápsula/{curso.slug}
            </span>
            <div
              className="aula-course-art mt-5 mb-6 w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl"
              style={{ background: `linear-gradient(120deg, ${curso.gradient[0]}, ${curso.gradient[1]})` }}
            >
              <Icon name={curso.icon as IconName} />
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white">{curso.title}</h1>
            <p className="mt-4 lesson-lead max-w-3xl">{curso.desc}</p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="aula-chip"><Icon name="chart" /> {curso.level}</span>
              {itinerary && primaryPhase ? (
                <>
                  <span className="aula-chip" data-tone="cyan"><Icon name="rocket" /> Ruta principal · {pluralLabel(primaryLessonCount, "lesson")}</span>
                  <span className="aula-chip"><Icon name="book" /> {pluralLabel(total, "lesson")} disponibles</span>
                </>
              ) : (
                <span className="aula-chip" data-tone="cyan"><Icon name="book" /> {pluralLabel(total, "lesson")}</span>
              )}
              <span className="aula-chip" data-tone="green"><Icon name="star" /> Acceso gratuito · contenido abierto</span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <ContinuarCurso cursoSlug={curso.slug} />
              {curso.pdf && (
                <a
                  href={curso.pdf}
                  className="aula-button aula-button-secondary"
                >
                  <Icon name="pdf" /> Descargar en PDF
                </a>
              )}
            </div>
            {curso.resources?.length ? (
              <details className="aula-disclosure mt-4 max-w-3xl rounded-lg border border-zinc-800 bg-zinc-950/25">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm text-zinc-400 hover:text-white">
                  <span><Icon name="download" /> Fuentes editables y código del curso</span>
                  <Icon name="chevronRight" className="aula-disclosure-icon text-zinc-600" />
                </summary>
                <div className="flex flex-wrap gap-2 border-t border-zinc-800 p-3" aria-label="Fuentes editables del curso">
                  {curso.resources.map((resource) => (
                    <a key={resource.href} href={resource.href} download className="aula-chip">
                      <Icon name="download" /> {resource.label} · {resource.format}
                    </a>
                  ))}
                </div>
              </details>
            ) : null}
            <p className="mt-4 aula-meta text-zinc-600">
              Sin registro. Tu progreso se guarda solo en este navegador. <a href={`#progress-${curso.slug}`} className="text-cyan-300 hover:text-cyan-200">Haz una copia antes de cambiar de equipo o borrar datos.</a>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:w-64">
            <div className="aula-panel p-4">
              <div className="aula-meta text-zinc-500">{pluralLabel(curso.secciones.length, "module").replace(/^\d+ /, "")}</div>
              <div className="font-display text-3xl font-bold text-white mt-1">{curso.secciones.length}</div>
            </div>
            <div className="aula-panel p-4">
              <div className="aula-meta text-zinc-500">{pluralLabel(total, "lesson").replace(/^\d+ /, "")}</div>
              <div className="font-display text-3xl font-bold text-white mt-1">{total}</div>
            </div>
            <div className="aula-panel p-4 col-span-2">
              <div className="aula-meta text-zinc-500">estado</div>
              <div className="font-display text-xl font-bold text-white mt-1">abierto</div>
            </div>
          </div>
        </div>
      </div>

      <PortableProgress course={curso} />

      {guidance && (
        <section className="mb-12" aria-labelledby="course-outcomes">
          <div className="grid lg:grid-cols-[1.35fr_0.65fr] gap-6">
            <div className="aula-panel p-6 sm:p-8">
              <span className="aula-section-label"><Icon name="prompt" /> Resultado educativo</span>
              <h2 id="course-outcomes" className="font-display text-2xl font-bold text-white mt-3">Qué serás capaz de hacer</h2>
              <ul className="mt-5 grid gap-3">
                {guidance.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3 text-zinc-300 leading-relaxed">
                    <Icon name="check" className="text-emerald-400 mt-1" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-zinc-800">
                <div className="aula-meta text-zinc-500">Entregable final</div>
                <p className="mt-2 text-zinc-300 leading-relaxed">{guidance.deliverable}</p>
              </div>
            </div>
            <div className="aula-panel p-6 sm:p-8">
              <span className="aula-section-label"><Icon name="userGraduate" /> Antes de empezar</span>
              <p className="mt-4 text-sm text-zinc-300 leading-relaxed">{guidance.audience}</p>
              <ul className="mt-5 space-y-3 text-sm text-zinc-400">
                {guidance.prerequisites.map((item) => <li key={item}>• {item}</li>)}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {itinerary ? (
                  <>
                    <span className="aula-chip" data-tone="cyan"><Icon name="calendar" /> Ruta principal · ≈ {itinerary.primaryHours} h</span>
                    <span className="aula-chip">Completo · ≈ {guidance.estimatedHours} h</span>
                  </>
                ) : (
                  <span className="aula-chip" data-tone="cyan"><Icon name="calendar" /> ≈ {guidance.estimatedHours} h</span>
                )}
                <span className="aula-chip" data-tone="green">{guidance.track}</span>
              </div>
              <p className="mt-5 aula-meta text-zinc-600">Revisión editorial: {new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(new Date(`${guidance.updated}T12:00:00Z`))}</p>
            </div>
          </div>
        </section>
      )}

      {itinerary && (
        <section className="mb-12 aula-frame p-6 sm:p-8" aria-labelledby="course-itinerary-title">
          <span className="aula-section-label"><Icon name="route" /> Cómo recorrer este curso</span>
          <h2 id="course-itinerary-title" className="mt-3 font-display text-2xl font-bold text-white">{itinerary.headline}</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-zinc-400">{itinerary.description}</p>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {itinerary.phases.map((phase) => {
              const firstLesson = leccionesCurso[phase.start - 1];
              const lessonCount = phase.end - phase.start + 1;
              return (
                <Link key={phase.title} href={`/cursos/${curso.slug}/${firstLesson.slug}`} className="aula-capsule flex flex-col p-5 group">
                  <span className="aula-meta text-zinc-500">{phase.eyebrow} · {pluralLabel(lessonCount, "lesson")}</span>
                  <h3 className="mt-2 font-display text-lg font-bold text-white group-hover:text-cyan-200">{phase.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{phase.description}</p>
                  <span className="mt-4 text-sm text-cyan-300">Abrir desde «{firstLesson.title}» <Icon name="chevronRight" /></span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {curso.slug === "ia-desde-cero" && <IaBasicsStartingCheck />}
      {curso.slug === "codex-desde-cero" && <CodexStartingCheck />}

      {/* Temario */}
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <span className="aula-section-label"><Icon name="route" /> Itinerario</span>
          <h2 className="font-display font-bold text-2xl text-white mt-2">Temario</h2>
        </div>
        <span className="aula-chip" data-tone="cyan">{pluralLabel(total, "step")}</span>
      </div>
      <div className="grid gap-3">
      {curso.secciones.map((seccion, seccionIndex) => {
        const start = curso.secciones
          .slice(0, seccionIndex)
          .reduce((sum, item) => sum + item.lecciones.length, 0);

        return (
          <details key={seccion.title} open={seccionIndex === 0} className="aula-disclosure aula-panel">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5">
              <span>
                <span className="aula-meta text-zinc-600">módulo {String(seccionIndex + 1).padStart(2, "0")}</span>
                <strong className="mt-1 block font-display text-base sm:text-lg text-zinc-100">{seccion.title}</strong>
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <span className="aula-chip">{pluralLabel(seccion.lecciones.length, "lesson")}</span>
                <Icon name="chevronRight" className="aula-disclosure-icon text-zinc-600" />
              </span>
            </summary>
            <ol className="grid gap-2 border-t border-zinc-800 p-3 sm:p-4">
              {seccion.lecciones.map((l, leccionIndex) => {
                const n = start + leccionIndex + 1;
                return (
                <li key={l.slug}>
                  <Link
                    href={`/cursos/${curso.slug}/${l.slug}`}
                    className="aula-capsule flex items-center gap-4 px-4 py-3.5 group"
                  >
                    <span className="flex-shrink-0 w-9 h-9 rounded-md bg-violet-500/10 border border-violet-500/25 text-violet-400 flex items-center justify-center text-xs font-semibold font-[family-name:var(--font-code)]">
                      {n}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-zinc-300 group-hover:text-white transition-colors">{l.title}</span>
                      <span className="aula-meta mt-0.5 block text-zinc-600">/{curso.slug}/{l.slug}</span>
                    </span>
                    <span className="ml-auto text-zinc-600 group-hover:text-fuchsia-300 transition-colors">
                      <Icon name="chevronRight" />
                    </span>
                  </Link>
                </li>
                );
              })}
            </ol>
          </details>
        );
      })}
      </div>

      {/* Otros cursos */}
      <div className="mt-12 pt-8 border-t border-zinc-800">
        <Link href="/cursos" className="aula-button aula-button-secondary">
          <Icon name="grid" /> Ver todos los cursos
        </Link>
      </div>
    </div>
  );
}
