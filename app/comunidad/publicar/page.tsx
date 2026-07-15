import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Icon from "@/components/Icon";
import ProjectForm from "@/components/social/ProjectForm";
import { isSupabaseConfigured } from "@/lib/social/config";
import { getCurrentMember, getLearningUnits } from "@/lib/social/queries";

export const metadata: Metadata = { title: "Publicar evidencia de aprendizaje", robots: { index: false, follow: false } };

export default async function Publicar({ searchParams }: { searchParams: Promise<{ curso?: string; leccion?: string }> }) {
  const params = await searchParams;
  const next = `/comunidad/publicar${params.curso && params.leccion ? `?curso=${encodeURIComponent(params.curso)}&leccion=${encodeURIComponent(params.leccion)}` : ""}`;
  const [member, units] = await Promise.all([getCurrentMember(), getLearningUnits()]);
  if (isSupabaseConfigured() && !member) redirect(`/acceso?next=${encodeURIComponent(next)}`);
  const selectedKey = params.curso && params.leccion ? `${params.curso}/${params.leccion}` : undefined;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-14">
      <div className="aula-meta mb-5"><Link href="/comunidad" className="hover:text-zinc-300">Comunidad</Link><span className="mx-2">/</span><span>Publicar</span></div>
      <span className="aula-section-label"><Icon name="upload" /> Evidencia de aprendizaje</span>
      <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mt-4">Cuenta el proceso, no solo el resultado</h1>
      <p className="lesson-lead mt-5 mb-8">Una buena publicación permite que otra persona entienda qué construiste, reproduzca tus decisiones y aprenda también de los errores.</p>
      {!isSupabaseConfigured() && <div className="aula-panel border-amber-500/35! p-4 mb-6 text-sm text-amber-100"><Icon name="database" /> Formulario en modo de revisión: la conexión con Supabase todavía no está configurada y no guardará datos.</div>}
      <ProjectForm units={units} selectedKey={selectedKey} />
    </div>
  );
}
