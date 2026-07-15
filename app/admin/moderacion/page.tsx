import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Icon from "@/components/Icon";
import ModerationForm from "@/components/social/ModerationForm";
import { getCurrentMember, getModerationReports } from "@/lib/social/queries";

export const metadata: Metadata = { title: "Moderación de Aulafy Comunidad", robots: { index: false, follow: false } };

export default async function Moderacion() {
  const member = await getCurrentMember();
  if (!member) redirect(`/acceso?next=${encodeURIComponent("/admin/moderacion")}`);
  if (member.role === "member") notFound();
  const reports = await getModerationReports();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 sm:py-14">
      <span className="aula-section-label"><Icon name="userShield" /> Área restringida</span>
      <h1 className="font-display font-extrabold text-4xl text-white mt-4">Cola de moderación</h1>
      <p className="lesson-lead mt-4 mb-8">Cada decisión requiere un motivo y queda registrada. Ocultar es reversible; retirar no lo es para el autor.</p>
      {reports.length ? <div className="space-y-5">{reports.map((report) => <article key={report.id} className="aula-frame p-6"><div className="flex flex-wrap gap-2 mb-4"><span className="aula-chip" data-tone="amber">{report.reason}</span><span className="aula-chip">{report.targetType}</span><span className="aula-chip">{report.status}</span></div><h2 className="font-display text-xl font-bold text-white">{report.targetLabel}</h2><p className="aula-meta mt-2">Denuncia de @{report.reporter?.username ?? "usuario eliminado"} · {new Intl.DateTimeFormat("es-ES", { dateStyle: "medium", timeStyle: "short" }).format(new Date(report.createdAt))}</p>{report.details && <p className="mt-4 text-sm leading-relaxed text-zinc-300">{report.details}</p>}<ModerationForm report={report} /></article>)}</div> : <div className="aula-panel p-8 text-center"><Icon name="check" className="text-3xl text-emerald-400" /><h2 className="font-display text-2xl font-bold text-white mt-4">No hay denuncias pendientes</h2></div>}
    </div>
  );
}
