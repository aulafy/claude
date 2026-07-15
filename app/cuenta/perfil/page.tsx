import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Icon from "@/components/Icon";
import ProfileForm from "@/components/social/ProfileForm";
import { getCurrentMember } from "@/lib/social/queries";

export const metadata: Metadata = { title: "Editar perfil de Aulafy", robots: { index: false, follow: false } };

export default async function EditarPerfil() {
  const member = await getCurrentMember();
  if (!member?.profile) redirect(`/acceso?next=${encodeURIComponent("/cuenta/perfil")}`);
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 sm:py-14">
      <div className="aula-meta mb-5"><Link href={`/perfil/${member.profile.username}`} className="hover:text-zinc-300">Mi perfil</Link><span className="mx-2">/</span><span>Editar</span></div>
      <span className="aula-section-label"><Icon name="gear" /> Datos públicos</span>
      <h1 className="font-display font-extrabold text-4xl text-white mt-4">Edita tu perfil de aprendizaje</h1>
      <p className="mt-4 mb-7 text-zinc-400">El email de acceso nunca se muestra aquí. Publica solo la información que quieras hacer visible.</p>
      <ProfileForm profile={member.profile} />
    </div>
  );
}
