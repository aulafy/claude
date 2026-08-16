import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Icon from "@/components/Icon";
import { learningEventLabels, summarizeLearningMetrics, type LearningMetricRow } from "@/lib/learning-metrics";
import { getAggregateLearningMetrics } from "@/lib/learning-metrics-server";
import { getCurrentMember } from "@/lib/social/queries";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Aprendizaje agregado | Administración de Aulafy",
  robots: { index: false, follow: false },
};

const periods = [7, 30, 90] as const;

function parsePeriod(value: string | string[] | undefined) {
  const parsed = Number(Array.isArray(value) ? value[0] : value);
  return periods.includes(parsed as (typeof periods)[number]) ? parsed : 30;
}

function EmptyState({ status }: { status: "disabled" | "unconfigured" | "error" }) {
  const copy = {
    disabled: {
      icon: "chart" as const,
      title: "La medición agregada está desactivada",
      text: "Aulafy continúa funcionando sin enviar eventos. Activa el interruptor únicamente después de aplicar la migración y revisar la política de privacidad.",
    },
    unconfigured: {
      icon: "gear" as const,
      title: "Falta la conexión privada",
      text: "El interruptor está activo, pero el servidor no tiene la URL de Supabase o la clave service_role. No se ha intentado mostrar información parcial.",
    },
    error: {
      icon: "warning" as const,
      title: "No se pudieron leer los contadores",
      text: "Comprueba la migración y la configuración de Supabase. La clave y el detalle técnico del error permanecen en el servidor.",
    },
  }[status];

  return (
    <section className="aula-panel mt-8 p-8 text-center sm:p-12">
      <Icon name={copy.icon} className="text-3xl text-cyan-300" />
      <h2 className="mt-4 font-display text-2xl font-bold text-white">{copy.title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">{copy.text}</p>
    </section>
  );
}

function MetricCard({ label, value, note }: { label: string; value: number; note: string }) {
  return (
    <article className="aula-panel p-5">
      <p className="aula-meta">{label}</p>
      <p className="mt-2 font-display text-3xl font-extrabold text-white tabular-nums">{value.toLocaleString("es-ES")}</p>
      <p className="mt-2 text-xs leading-relaxed text-zinc-500">{note}</p>
    </article>
  );
}

export default async function LearningAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string | string[] }>;
}) {
  const member = await getCurrentMember();
  if (!member) redirect(`/acceso?next=${encodeURIComponent("/admin/aprendizaje")}`);
  if (member.role !== "admin") notFound();

  const days = parsePeriod((await searchParams).days);
  const result = await getAggregateLearningMetrics(days);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div className="max-w-3xl">
          <span className="aula-section-label"><Icon name="userShield" /> Área restringida</span>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl">Aprendizaje agregado</h1>
          <p className="lesson-lead mt-4">Señales para mejorar misiones, búsqueda y continuidad. Cada cifra es un contador diario sin personas, rutas, consultas ni contenido.</p>
        </div>
        <Link href="/admin/moderacion" className="aula-button aula-button-secondary min-h-10 px-4 py-2 text-sm">
          <Icon name="userShield" /> Moderación
        </Link>
      </div>

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="Periodo del informe">
        {periods.map((period) => (
          <Link
            key={period}
            href={`/admin/aprendizaje?days=${period}`}
            aria-current={period === days ? "page" : undefined}
            className={`aula-button min-h-9 px-4 py-2 text-sm ${period === days ? "aula-button-primary" : "aula-button-secondary"}`}
          >
            {period} días
          </Link>
        ))}
      </nav>

      {result.status !== "ready" ? <EmptyState status={result.status} /> : <Dashboard rows={result.rows} days={days} />}
    </div>
  );
}

function Dashboard({ rows, days }: { rows: LearningMetricRow[]; days: number }) {
  const summary = summarizeLearningMetrics(rows);
  if (!rows.length) {
    return (
      <section className="aula-panel mt-8 p-8 text-center sm:p-12">
        <Icon name="experiment" className="text-3xl text-emerald-300" />
        <h2 className="mt-4 font-display text-2xl font-bold text-white">Todavía no hay eventos en este periodo</h2>
        <p className="mt-3 text-sm text-zinc-400">La integración está lista. Los primeros contadores aparecerán aquí sin identificar a visitantes.</p>
      </section>
    );
  }

  const maxDaily = Math.max(1, ...summary.days.flatMap((day) => [day.starts, day.completions, day.deepReads, day.returns]));

  return (
    <div className="mt-8 grid gap-8">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label={`Resumen de ${days} días`}>
        <MetricCard label="MISIONES INICIADAS" value={summary.total("mission_start")} note="Navegadores/día que iniciaron la práctica." />
        <MetricCard label="MISIONES COMPLETADAS" value={summary.total("mission_complete")} note="Finales declarados, no tiempo de pantalla." />
        <MetricCard label="LECTURAS PROFUNDAS" value={summary.total("lesson_90")} note="Lecciones que alcanzaron aproximadamente el 90 %." />
        <MetricCard label="RETORNOS REALES" value={summary.total("return_7d") + summary.total("return_30d")} note="Navegadores que vuelven tras 7 o 30 días; no simples pulsaciones." />
      </section>

      <section className="aula-panel p-5 sm:p-7" aria-labelledby="funnel-title">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><p className="aula-meta">EMBUDO APROXIMADO</p><h2 id="funnel-title" className="mt-1 font-display text-2xl font-bold text-white">Dónde continúa el aprendizaje</h2></div>
          <p className="max-w-sm text-xs leading-relaxed text-zinc-500">Las etapas son contadores independientes por navegador y día; orientan decisiones, no representan cohortes individuales.</p>
        </div>
        <div className="mt-6 grid gap-5">
          {summary.funnel.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                <span className="font-medium text-zinc-200">{item.label}</span>
                <span className="shrink-0 font-mono text-zinc-400">{item.rate === null ? "sin base" : `${item.rate.toFixed(1)} %`}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-sm bg-zinc-800" role="img" aria-label={`${item.label}: ${item.rate === null ? "sin base" : `${item.rate.toFixed(1)} por ciento`}`}>
                <div className={`h-full ${item.inverse ? "bg-amber-400" : "bg-cyan-400"}`} style={{ width: `${Math.min(item.rate ?? 0, 100)}%` }} />
              </div>
              <p className="mt-1.5 text-xs text-zinc-600">{item.numerator.toLocaleString("es-ES")} de {item.denominator.toLocaleString("es-ES")}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,.7fr)]">
        <div className="aula-panel overflow-hidden p-5 sm:p-7">
          <p className="aula-meta">EVOLUCIÓN DIARIA</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-white">Actividad que deja evidencia</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="text-xs uppercase text-zinc-500"><tr><th className="pb-3 pr-4">Día</th><th className="pb-3 pr-4">Inicios</th><th className="pb-3 pr-4">Completadas</th><th className="pb-3 pr-4">Lecturas 90 %</th><th className="pb-3">Retornos</th></tr></thead>
              <tbody className="divide-y divide-zinc-800/80">
                {summary.days.map((day) => (
                  <tr key={day.day} className="text-zinc-300">
                    <th className="py-3 pr-4 font-medium text-zinc-200">{new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "short", timeZone: "UTC" }).format(new Date(`${day.day}T00:00:00Z`))}</th>
                    {[day.starts, day.completions, day.deepReads, day.returns].map((value, index) => <td key={index} className="py-3 pr-4 tabular-nums"><span className="inline-block h-1.5 bg-emerald-400/60 align-middle" style={{ width: `${Math.max(2, (value / maxDaily) * 42)}px` }} /> <span className="ml-2">{value}</span></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="aula-panel p-5 sm:p-7">
          <p className="aula-meta">SEÑALES EDITORIALES</p>
          <h2 className="mt-1 font-display text-xl font-bold text-white">Qué revisar primero</h2>
          {summary.signals.length ? <ul className="mt-5 grid gap-3">{summary.signals.map((signal) => <li key={signal} className="border-l-2 border-amber-400 pl-3 text-sm leading-relaxed text-zinc-300">{signal}</li>)}</ul> : <p className="mt-5 text-sm leading-relaxed text-zinc-400">No hay una caída clara con los umbrales actuales. Espera más volumen y contrasta con comentarios cualitativos.</p>}
        </aside>
      </section>

      <details className="aula-panel p-5 sm:p-7">
        <summary className="cursor-pointer font-display font-bold text-white">Contadores disponibles</summary>
        <dl className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {[...summary.totals.entries()].sort(([left], [right]) => left.localeCompare(right)).map(([event, count]) => <div key={event} className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-2"><dt className="text-xs text-zinc-400">{learningEventLabels[event]}</dt><dd className="font-mono text-sm text-zinc-200">{count}</dd></div>)}
        </dl>
      </details>
    </div>
  );
}
