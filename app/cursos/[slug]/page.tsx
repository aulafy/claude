import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon, { type IconName } from "@/components/Icon";
import ContinuarCurso from "@/components/ContinuarCurso";
import { cursos, getCurso, totalLecciones } from "@/lib/cursos";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aulafy.net";

export function generateStaticParams() {
  return cursos.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const curso = getCurso(slug);
  if (!curso) return {};
  return {
    title: `${curso.title} — Curso gratuito | Aulafy`,
    description: curso.desc,
    alternates: { canonical: `/cursos/${curso.slug}` },
    openGraph: { title: curso.title, description: curso.desc, url: `/cursos/${curso.slug}` },
  };
}

export default async function CursoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const curso = getCurso(slug);
  if (!curso) notFound();

  const total = totalLecciones(curso);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: curso.title,
    description: curso.desc,
    inLanguage: "es",
    url: `${SITE_URL}/cursos/${curso.slug}`,
    isAccessibleForFree: true,
    provider: { "@type": "Organization", name: "Aulafy", url: SITE_URL },
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
  };

  let n = 0;

  return (
    <div className="max-w-4xl mx-auto px-6 py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/cursos" className="hover:text-zinc-400">Cursos</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">{curso.title}</span>
      </div>

      {/* Cabecera del curso */}
      <div
        className="rounded-2xl p-8 sm:p-10 mb-10 relative overflow-hidden"
        style={{ background: `linear-gradient(120deg, ${curso.gradient[0]}22, ${curso.gradient[1]}22)` }}
      >
        <div className="absolute inset-0 border border-zinc-800 rounded-2xl pointer-events-none" />
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl mb-5"
          style={{ background: `linear-gradient(120deg, ${curso.gradient[0]}, ${curso.gradient[1]})` }}
        >
          <Icon name={curso.icon as IconName} />
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">{curso.title}</h1>
        <p className="mt-4 text-lg text-zinc-400 leading-relaxed max-w-2xl">{curso.desc}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-400">
          <span className="inline-flex items-center gap-1.5"><Icon name="chart" /> {curso.level}</span>
          <span className="inline-flex items-center gap-1.5"><Icon name="book" /> {total} lecciones</span>
          <span className="inline-flex items-center gap-1.5 text-[#22d3ee]"><Icon name="star" /> Gratis y open source</span>
        </div>

        <div className="mt-7 flex flex-wrap gap-4">
          <ContinuarCurso cursoSlug={curso.slug} />
          {curso.pdf && (
            <a
              href={curso.pdf}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-zinc-200 border border-zinc-700 hover:border-zinc-500 transition-colors"
            >
              <Icon name="pdf" /> Descargar en PDF
            </a>
          )}
        </div>
        <p className="mt-4 text-xs text-zinc-600">
          Sin registro. Tu progreso se guarda únicamente en tu navegador.
        </p>
      </div>

      {/* Temario */}
      <h2 className="font-display font-bold text-2xl text-white mb-6">Temario</h2>
      {curso.secciones.map((seccion) => (
        <div key={seccion.title} className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-3">
            {seccion.title}
          </h3>
          <ol className="rounded-xl border border-zinc-800 divide-y divide-zinc-800/70 overflow-hidden">
            {seccion.lecciones.map((l) => {
              n += 1;
              return (
                <li key={l.slug}>
                  <Link
                    href={`/cursos/${curso.slug}/${l.slug}`}
                    className="flex items-center gap-4 px-5 py-3.5 bg-zinc-900/30 hover:bg-zinc-800/50 transition-colors group"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 flex items-center justify-center text-xs font-semibold">
                      {n}
                    </span>
                    <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{l.title}</span>
                    <span className="ml-auto text-zinc-600 group-hover:text-orange-400 transition-colors">
                      <Icon name="chevronRight" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      ))}

      {/* Otros cursos */}
      <div className="mt-12 pt-8 border-t border-zinc-800">
        <Link href="/cursos" className="text-sm text-orange-400 hover:text-orange-300">
          ← Ver todos los cursos
        </Link>
      </div>
    </div>
  );
}
