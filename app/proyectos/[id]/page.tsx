import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import ReportForm from "@/components/social/ReportForm";
import ReviewForm from "@/components/social/ReviewForm";
import { getCurrentMember, getProjectDetail } from "@/lib/social/queries";

export const metadata: Metadata = {
  title: "Proyecto de la comunidad de Aulafy",
  robots: { index: false, follow: true },
};

export default async function Proyecto({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ creado?: string }>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const [project, member] = await Promise.all([getProjectDetail(id), getCurrentMember()]);
  if (!project) notFound();
  const isAuthor = member?.id === project.authorId;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 sm:py-14">
      <div className="aula-meta mb-6"><Link href="/comunidad" className="hover:text-zinc-300">Comunidad</Link><span className="mx-2">/</span><span>Proyecto</span></div>
      {query.creado && <div className="mb-6 rounded-lg border border-emerald-500/35 bg-emerald-500/10 p-4 text-sm text-emerald-100">{query.creado === "draft" ? "Borrador guardado. Solo tú puedes verlo." : "Evidencia publicada correctamente."}</div>}

      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-7 items-start">
        <article className="aula-frame p-6 sm:p-9 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="aula-chip" data-tone="violet"><Icon name="experiment" /> Evidencia de aprendizaje</span>
            <span className="aula-chip" data-tone={project.status === "published" ? "green" : "amber"}>{project.status === "published" ? "Publicada" : "Borrador"}</span>
            <span className="aula-chip">{project.difficulty}</span>
          </div>
          <p className="aula-meta text-cyan-300">{project.unit.courseTitle} / {project.unit.lessonTitle}</p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mt-3">{project.title}</h1>
          <p className="lesson-lead mt-5">{project.summary}</p>

          <section className="mt-9 border-t border-zinc-800 pt-7">
            <h2 className="font-display text-2xl font-bold text-white">Qué construyó</h2>
            <TextBlock value={project.whatBuilt} />
          </section>
          <section className="mt-8">
            <h2 className="font-display text-2xl font-bold text-white">Qué aprendió</h2>
            <TextBlock value={project.whatLearned} />
          </section>
          {project.obstacles && <section className="mt-8"><h2 className="font-display text-2xl font-bold text-white">Errores y siguiente mejora</h2><TextBlock value={project.obstacles} /></section>}

          {(project.repositoryUrl || project.demoUrl) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.repositoryUrl && <a className="aula-button aula-button-secondary" href={project.repositoryUrl} target="_blank" rel="noreferrer"><Icon name="code" /> Ver código</a>}
              {project.demoUrl && <a className="aula-button aula-button-primary" href={project.demoUrl} target="_blank" rel="noreferrer"><Icon name="external" /> Abrir demostración</a>}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-2">{project.technologies.map((technology) => <span key={technology} className="aula-chip">{technology}</span>)}</div>
          {member && !isAuthor && <div className="mt-8"><ReportForm targetType="project" targetId={project.id} /></div>}
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="aula-panel p-5">
            <p className="aula-meta">Publicado por</p>
            <Link href={`/perfil/${project.author.username}`} className="block mt-2 font-display text-xl font-bold text-white hover:text-fuchsia-300">{project.author.displayName}</Link>
            <p className="aula-meta mt-1">@{project.author.username}</p>
            {project.author.bio && <p className="mt-4 text-sm leading-relaxed text-zinc-400">{project.author.bio}</p>}
          </div>
          <div className="aula-panel p-5">
            <p className="aula-meta">Evidencia vinculada</p>
            <Link href={`/cursos/${project.courseSlug}/${project.lessonSlug}`} className="block mt-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">Ir a la lección <Icon name="chevronRight" /></Link>
          </div>
        </aside>
      </div>

      <section className="mt-10 max-w-4xl" aria-labelledby="reviews-title">
        <div className="mb-5"><span className="aula-section-label"><Icon name="chat" /> Revisión entre personas</span><h2 id="reviews-title" className="font-display text-3xl font-bold text-white mt-2">{project.reviews.length} {project.reviews.length === 1 ? "revisión" : "revisiones"}</h2></div>
        <div className="space-y-4">
          {project.reviews.map((review) => (
            <article key={review.id} className="aula-panel p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <Link href={`/perfil/${review.reviewer.username}`} className="font-semibold text-white hover:text-fuchsia-300">@{review.reviewer.username}</Link>
                <div className="flex flex-wrap gap-2"><span className="aula-chip">Claridad {review.explanationRating}/5</span><span className="aula-chip">Valor {review.educationalValue}/5</span></div>
              </div>
              <TextBlock value={review.feedback} compact />
              {review.suggestion && <p className="mt-4 border-l-2 border-cyan-500/40 pl-4 text-sm leading-relaxed text-zinc-300"><strong className="text-cyan-200">Mejora propuesta:</strong> {review.suggestion}</p>}
            </article>
          ))}
          {!project.reviews.length && <div className="aula-panel p-6 text-zinc-400">Todavía no hay revisiones. La primera debe explicar algo concreto, no limitarse a «muy bueno».</div>}
        </div>

        <div className="mt-7">
          {!member && <div className="aula-panel p-5"><p className="text-sm text-zinc-300">Para revisar este proyecto necesitas identificarte.</p><Link href={`/acceso?next=${encodeURIComponent(`/proyectos/${project.id}`)}`} className="aula-button aula-button-primary mt-4"><Icon name="userGraduate" /> Entrar para revisar</Link></div>}
          {member && !isAuthor && project.status === "published" && <ReviewForm projectId={project.id} />}
          {isAuthor && <div className="aula-panel p-5 text-sm text-zinc-400"><Icon name="shield" /> No puedes revisar tu propio proyecto. Sí puedes utilizar las revisiones recibidas para mejorarlo.</div>}
        </div>
      </section>
    </div>
  );
}

function TextBlock({ value, compact = false }: { value: string; compact?: boolean }) {
  return <div className={`${compact ? "mt-4 text-sm" : "mt-4"} whitespace-pre-wrap break-words leading-relaxed text-zinc-300`}>{value}</div>;
}
