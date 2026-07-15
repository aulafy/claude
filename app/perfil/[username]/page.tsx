import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import ProjectCard from "@/components/social/ProjectCard";
import ReportForm from "@/components/social/ReportForm";
import { getCurrentMember, getPublicProfile } from "@/lib/social/queries";

export const metadata: Metadata = { title: "Perfil de aprendizaje en Aulafy", robots: { index: false, follow: true } };

export default async function Perfil({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  if (!/^[a-z0-9_]{3,30}$/i.test(username)) notFound();
  const [result, member] = await Promise.all([getPublicProfile(username), getCurrentMember()]);
  if (!result) notFound();
  const { profile, projects } = result;
  const isOwn = member?.id === profile.id;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 sm:py-14">
      <section className="aula-frame p-6 sm:p-9">
        <div className="grid md:grid-cols-[1fr_auto] gap-7 items-start">
          <div>
            <span className="aula-section-label"><Icon name="userGraduate" /> Perfil de aprendizaje</span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mt-4">{profile.displayName}</h1>
            <p className="aula-meta mt-2">@{profile.username}</p>
            {profile.bio && <p className="lesson-lead mt-5 max-w-3xl">{profile.bio}</p>}
            <div className="mt-5 flex flex-wrap gap-2">{profile.interests.map((interest) => <span key={interest} className="aula-chip">{interest}</span>)}</div>
            {profile.website && <a href={profile.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-5 text-sm text-cyan-300 hover:text-cyan-200"><Icon name="external" /> Web personal</a>}
          </div>
          <div className="aula-panel p-5 min-w-44"><p className="aula-meta">evidencias publicadas</p><p className="font-display text-4xl font-bold text-white mt-2">{projects.length}</p></div>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          {isOwn && <Link href="/cuenta/perfil" className="aula-button aula-button-primary"><Icon name="gear" /> Editar perfil</Link>}
        </div>
        {member && !isOwn && <div className="mt-7"><ReportForm targetType="profile" targetId={profile.id} /></div>}
      </section>

      <section className="mt-10" aria-labelledby="profile-projects-title">
        <h2 id="profile-projects-title" className="font-display text-3xl font-bold text-white mb-6">Evidencias de aprendizaje</h2>
        {projects.length ? <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div> : <div className="aula-panel p-7 text-zinc-400">Este perfil todavía no ha publicado proyectos.</div>}
      </section>
    </div>
  );
}
