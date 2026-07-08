import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon, { type IconName } from "@/components/Icon";
import ContinuarCurso from "@/components/ContinuarCurso";
import { cursos, getCurso, totalLecciones } from "@/lib/cursos";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

export function generateStaticParams() {
  return cursos.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const curso = getCurso(slug);
  if (!curso) return {};
  const lecciones = curso.secciones.flatMap((seccion) => seccion.lecciones.map((leccion) => leccion.title));
  const title = curso.title;
  const description = compactDescription(
    `${curso.desc} Curso gratis en español, sin registro, con ${totalLecciones(curso)} lecciones.`,
  );
  return {
    title,
    description,
    keywords: [
      curso.title,
      curso.short,
      "curso gratis IA",
      "curso IA open source",
      "tutorial IA español",
      "Aulafy",
      ...lecciones.slice(0, 16),
    ],
    alternates: { canonical: `/cursos/${curso.slug}` },
    openGraph: {
      title,
      description,
      url: `/cursos/${curso.slug}`,
      type: "website",
      siteName: "Aulafy",
      locale: "es_ES",
      images: [
        {
          url: "/og-image.png",
          width: 512,
          height: 512,
          alt: `${curso.title} en Aulafy`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@learntouseai",
      images: ["/og-image.png"],
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
  const leccionesCurso = curso.secciones.flatMap((seccion) => seccion.lecciones);
  const leccionTitles = leccionesCurso.map((leccion) => leccion.title);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${SITE_URL}/cursos/${curso.slug}#course`,
        name: curso.title,
        description: curso.desc,
        inLanguage: "es",
        url: `${SITE_URL}/cursos/${curso.slug}`,
        isAccessibleForFree: true,
        educationalLevel: curso.level,
        learningResourceType: "Curso online",
        keywords: [
          curso.title,
          curso.short,
          "curso gratis IA",
          "IA open source en español",
          ...leccionTitles,
        ].join(", "),
        teaches: leccionTitles,
        provider: { "@type": "Organization", name: "Aulafy", url: SITE_URL },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          category: "free",
          url: `${SITE_URL}/cursos/${curso.slug}`,
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          courseWorkload: `PT${Math.max(2, Math.round(total * 0.4))}H`,
        },
        syllabusSections: curso.secciones.map((s) => ({
          "@type": "Syllabus",
          name: s.title,
          description: s.lecciones.map((l) => l.title).join(" · "),
        })),
        hasPart: leccionesCurso.map((leccion) => ({
          "@type": "LearningResource",
          name: leccion.title,
          url: `${SITE_URL}/cursos/${curso.slug}/${leccion.slug}`,
          inLanguage: "es",
          isAccessibleForFree: true,
          learningResourceType: "Lección",
          isPartOf: { "@id": `${SITE_URL}/cursos/${curso.slug}#course` },
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
              <span className="aula-chip" data-tone="cyan"><Icon name="book" /> {total} lecciones</span>
              <span className="aula-chip" data-tone="green"><Icon name="star" /> Gratis y open source</span>
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
            <p className="mt-4 aula-meta text-zinc-600">
              Sin registro. Tu progreso se guarda únicamente en tu navegador.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:w-64">
            <div className="aula-panel p-4">
              <div className="aula-meta text-zinc-500">módulos</div>
              <div className="font-display text-3xl font-bold text-white mt-1">{curso.secciones.length}</div>
            </div>
            <div className="aula-panel p-4">
              <div className="aula-meta text-zinc-500">lecciones</div>
              <div className="font-display text-3xl font-bold text-white mt-1">{total}</div>
            </div>
            <div className="aula-panel p-4 col-span-2">
              <div className="aula-meta text-zinc-500">estado</div>
              <div className="font-display text-xl font-bold text-white mt-1">abierto</div>
            </div>
          </div>
        </div>
      </div>

      {/* Temario */}
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <span className="aula-section-label"><Icon name="route" /> Itinerario</span>
          <h2 className="font-display font-bold text-2xl text-white mt-2">Temario</h2>
        </div>
        <span className="aula-chip" data-tone="cyan">{total} pasos</span>
      </div>
      {curso.secciones.map((seccion, seccionIndex) => {
        const start = curso.secciones
          .slice(0, seccionIndex)
          .reduce((sum, item) => sum + item.lecciones.length, 0);

        return (
          <div key={seccion.title} className="mb-8">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h3 className="aula-section-label">
                módulo {String(seccionIndex + 1).padStart(2, "0")} / {seccion.title}
              </h3>
              <span className="aula-chip">{seccion.lecciones.length} lecciones</span>
            </div>
            <ol className="grid gap-2">
              {seccion.lecciones.map((l, leccionIndex) => {
                const n = start + leccionIndex + 1;
                return (
                <li key={l.slug}>
                  <Link
                    href={`/cursos/${curso.slug}/${l.slug}`}
                    className="aula-capsule flex items-center gap-4 px-4 py-3.5 group"
                  >
                    <span className="flex-shrink-0 w-9 h-9 rounded-md bg-orange-500/10 border border-orange-500/25 text-orange-400 flex items-center justify-center text-xs font-semibold font-[family-name:var(--font-code)]">
                      {n}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-zinc-300 group-hover:text-white transition-colors">{l.title}</span>
                      <span className="aula-meta mt-0.5 block text-zinc-600">/{curso.slug}/{l.slug}</span>
                    </span>
                    <span className="ml-auto text-zinc-600 group-hover:text-orange-400 transition-colors">
                      <Icon name="chevronRight" />
                    </span>
                  </Link>
                </li>
                );
              })}
            </ol>
          </div>
        );
      })}

      {/* Otros cursos */}
      <div className="mt-12 pt-8 border-t border-zinc-800">
        <Link href="/cursos" className="aula-button aula-button-secondary">
          <Icon name="grid" /> Ver todos los cursos
        </Link>
      </div>
    </div>
  );
}
