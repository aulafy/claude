import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import ProjectCard from "@/components/social/ProjectCard";
import { isSocialPreviewMode, isSupabaseConfigured } from "@/lib/social/config";
import { getCurrentMember, getPublicProjects } from "@/lib/social/queries";
import { signOut } from "@/app/acceso/actions";

export const metadata: Metadata = {
  title: "Aulafy Comunidad — aprende IA construyendo",
  description: "Proyectos vinculados a lecciones, explicaciones reproducibles y revisiones educativas de la comunidad de Aulafy.",
  alternates: { canonical: "/comunidad" },
};

export default async function Comunidad() {
  const [projects, member] = await Promise.all([getPublicProjects(), getCurrentMember()]);
  const reviews = projects.reduce((sum, project) => sum + project.reviewCount, 0);

  return (
    <div className="mx-auto max-w-6xl px-5 py-7 sm:px-6 sm:py-9">
      {isSocialPreviewMode() && <div className="mb-4 flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/8 px-4 py-2.5 text-xs text-amber-100"><Icon name="experiment" /> Demostración local · perfiles y proyectos ficticios</div>}

      <section className="aula-frame mb-7">
        <div className="grid items-center gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <span className="aula-section-label"><Icon name="users" /> Comunidad de aprendizaje</span>
            <h1 className="mt-3 font-display text-3xl font-extrabold leading-[1.06] text-white sm:text-4xl lg:text-5xl">Aprende construyendo. Comparte el proceso.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">Publica el resultado de una lección, explica qué aprendiste y recibe una revisión que te ayude a mejorarlo.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:max-w-52 lg:flex-col">
            <Link href="/comunidad/publicar" className="aula-button aula-button-primary"><Icon name="upload" /> Publicar proyecto</Link>
            <Link href="/comunidad/normas" className="aula-button aula-button-secondary"><Icon name="shield" /> Ver las normas</Link>
          </div>
        </div>
      </section>

      {!isSupabaseConfigured() && !isSocialPreviewMode() && (
        <section className="aula-panel border-amber-500/30! p-5 mb-8" aria-label="Estado técnico">
          <p className="font-semibold text-amber-100"><Icon name="database" /> La experiencia está implementada, pero el backend social todavía no está conectado.</p>
          <p className="mt-2 text-sm text-zinc-400">Cuando se apliquen la migración y las variables de Supabase, esta página mostrará proyectos reales.</p>
        </section>
      )}

      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section aria-labelledby="community-projects-title">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div><span className="aula-section-label"><Icon name="experiment" /> Feed de aprendizaje</span><h2 id="community-projects-title" className="mt-1.5 font-display text-2xl font-bold text-white sm:text-3xl">Proyectos recientes</h2></div>
            <p className="hidden text-right text-xs text-zinc-500 sm:block">Cronológico<br />sin popularidad</p>
          </div>
          {projects.length ? (
            <div className="grid gap-5">{projects.map((project) => <ProjectCard key={project.id} project={project} layout="feed" />)}</div>
          ) : (
            <div className="aula-panel p-8 text-center sm:p-12"><Icon name="seed" className="text-3xl text-emerald-400" /><h3 className="mt-4 font-display text-2xl font-bold text-white">La primera evidencia aún está por publicar</h3><p className="mx-auto mt-3 max-w-xl text-zinc-400">El piloto empezará con proyectos vinculados a tres lecciones de «Codex desde cero».</p></div>
          )}
        </section>

        <aside className="grid gap-4 lg:sticky lg:top-24" aria-label="Información de la comunidad">
          {member && (
            <section className="aula-panel p-5">
              <p className="aula-meta">TU ESPACIO</p>
              <p className="mt-2 font-display text-xl font-bold text-white">Hola, {member.profile?.displayName ?? "estudiante"}</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">Documenta lo que estás aprendiendo y conserva tus proyectos en un perfil público.</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {member.profile && <Link href={`/perfil/${member.profile.username}`} className="aula-button aula-button-secondary min-h-9 px-3 py-2 text-sm">Mi perfil</Link>}
                <Link href="/cuenta/perfil" className="aula-button aula-button-secondary min-h-9 px-3 py-2 text-sm">Editar</Link>
                {member.role !== "member" && <Link href="/admin/moderacion" className="aula-button aula-button-secondary col-span-2 min-h-9 px-3 py-2 text-sm">Moderación</Link>}
                <form action={signOut} className="col-span-2"><button className="aula-button aula-button-secondary min-h-9 w-full px-3 py-2 text-sm" type="submit">Cerrar sesión</button></form>
              </div>
            </section>
          )}

          <section className="aula-panel p-5">
            <div className="flex items-center justify-between gap-3"><p className="aula-meta">PILOTO ACTIVO</p><span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.65)]" /></div>
            <h3 className="mt-2 font-display text-lg font-bold text-white">Codex desde cero</h3>
            <p className="mt-1 text-sm text-zinc-400">3 lecciones permiten publicar evidencias.</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Metric label="proyectos" value={projects.length} />
              <Metric label="revisiones" value={reviews} />
            </div>
          </section>

          <section className="aula-panel p-5">
            <p className="aula-meta">CÓMO PARTICIPAR</p>
            <ol className="mt-4 grid gap-4">
              <Step number="1" title="Completa una lección" text="Los cursos siguen abiertos y sin registro." />
              <Step number="2" title="Explica tu resultado" text="Cuenta también errores y decisiones." />
              <Step number="3" title="Revisa a otra persona" text="Aporta una mejora concreta y respetuosa." />
            </ol>
          </section>
        </aside>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="rounded-lg border border-zinc-800 bg-black/10 p-3"><div className="aula-meta">{label}</div><div className="mt-1 font-display text-2xl font-bold text-white">{value}</div></div>;
}

function Step({ number, title, text }: { number: string; title: string; text: string }) {
  return <li className="flex gap-3"><span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 font-code text-xs text-fuchsia-200">{number}</span><div><h3 className="text-sm font-semibold text-white">{title}</h3><p className="mt-1 text-xs leading-relaxed text-zinc-500">{text}</p></div></li>;
}
