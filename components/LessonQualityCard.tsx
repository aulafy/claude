import Icon from "@/components/Icon";
import type { LessonVolatility } from "@/lib/ia-basics-quality";

type Props = {
  reviewedAt: string;
  status: string;
  volatility: LessonVolatility;
  reviewDays: number;
  scope: string;
  sources: { label: string; href: string }[];
};

const volatilityLabel: Record<LessonVolatility, string> = {
  estable: "Concepto estable",
  revisable: "Revisión periódica",
  volátil: "Seguimiento frecuente",
};

export default function LessonQualityCard({ reviewedAt, status, volatility, reviewDays, scope, sources }: Props) {
  return (
    <details className="aula-disclosure aula-panel mb-8">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5">
        <span>
          <span className="aula-section-label"><Icon name="shield" /> ficha de confianza</span>
          <strong className="mt-2 block font-display text-base text-white">{status} · <time dateTime={reviewedAt}>{reviewedAt}</time></strong>
        </span>
        <Icon name="chevronRight" className="aula-disclosure-icon text-zinc-500" />
      </summary>
      <div className="border-t border-zinc-800 px-5 pb-5 pt-4">
        <div className="flex flex-wrap gap-2">
          <span className="aula-chip" data-tone={volatility === "volátil" ? "amber" : "green"}>{volatilityLabel[volatility]}</span>
          <span className="aula-chip"><Icon name="calendar" /> Revisar cada {reviewDays} días</span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400"><strong className="text-zinc-200">Alcance revisado:</strong> {scope}</p>
        <p className="mt-4 aula-meta text-zinc-500">Fuentes primarias de referencia</p>
        <ul className="mt-2 grid gap-2 text-sm">
          {sources.map((source) => (
            <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200"><Icon name="external" /> {source.label}</a></li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-zinc-500">Este estado describe una revisión editorial. No afirma que exista código ejecutable en una lección conceptual.</p>
      </div>
    </details>
  );
}
