import Link from "next/link";
import Icon from "@/components/Icon";
import type { LearningProject } from "@/lib/social/types";

export default function ProjectCard({ project, layout = "card" }: { project: LearningProject; layout?: "card" | "feed" }) {
  if (layout === "feed") return <FeedProject project={project} />;

  return (
    <article className="group aula-capsule flex h-full flex-col">
      <Link href={`/proyectos/${project.id}`} className="block p-5 sm:p-6 flex-1">
        <div className="mb-4 flex items-start justify-between gap-4">
          <span className="aula-chip" data-tone="violet"><Icon name="experiment" /> Evidencia</span>
          <span className="aula-meta">{formatDate(project.publishedAt ?? project.createdAt)}</span>
        </div>
        <p className="aula-meta text-cyan-300 mb-2">{project.unit.lessonTitle}</p>
        <h2 className="font-display text-xl font-bold text-white group-hover:text-fuchsia-300">{project.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((technology) => (
            <span key={technology} className="aula-chip">{technology}</span>
          ))}
        </div>
      </Link>
      <div className="border-t border-zinc-800 px-5 py-4 flex items-center justify-between gap-3">
        <Link href={`/perfil/${project.author.username}`} className="text-sm font-semibold text-zinc-200 hover:text-fuchsia-300">
          @{project.author.username}
        </Link>
        <span className="aula-meta"><Icon name="chat" /> {project.reviewCount} {project.reviewCount === 1 ? "revisión" : "revisiones"}</span>
      </div>
    </article>
  );
}

function FeedProject({ project }: { project: LearningProject }) {
  const initial = project.author.displayName.trim().charAt(0).toUpperCase() || "A";

  return (
    <article className="group aula-capsule">
      <header className="flex items-center justify-between gap-4 border-b border-zinc-800 px-5 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 font-display font-bold text-fuchsia-200" aria-hidden="true">{initial}</span>
          <div className="min-w-0">
            <Link href={`/perfil/${project.author.username}`} className="block truncate text-sm font-semibold text-white hover:text-fuchsia-300">{project.author.displayName}</Link>
            <p className="aula-meta truncate">@{project.author.username} · {formatDate(project.publishedAt ?? project.createdAt)}</p>
          </div>
        </div>
        <span className="aula-chip shrink-0" data-tone="violet"><Icon name="experiment" /> Evidencia</span>
      </header>

      <Link href={`/proyectos/${project.id}`} className="block px-5 py-5 sm:px-6 sm:py-6">
        <p className="aula-meta mb-2 text-cyan-300">{project.unit.lessonTitle}</p>
        <h2 className="font-display text-2xl font-bold leading-tight text-white transition-colors group-hover:text-fuchsia-300">{project.title}</h2>
        <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-zinc-400">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((technology) => <span key={technology} className="aula-chip">{technology}</span>)}
        </div>
      </Link>

      <footer className="flex items-center justify-between gap-3 border-t border-zinc-800 px-5 py-3.5 sm:px-6">
        <span className="aula-meta"><Icon name="chat" /> {project.reviewCount} {project.reviewCount === 1 ? "revisión útil" : "revisiones útiles"}</span>
        <Link href={`/proyectos/${project.id}`} className="text-sm font-semibold text-fuchsia-300 hover:text-cyan-300">Ver proyecto →</Link>
      </footer>
    </article>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "short" }).format(new Date(value));
}
