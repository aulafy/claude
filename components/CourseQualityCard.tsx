import Icon from "@/components/Icon";
import type { CourseQualityRecord } from "@/lib/course-quality";

const volatilityLabel: Record<CourseQualityRecord["volatility"], string> = {
  estable: "Conceptos estables",
  revisable: "Revisión periódica",
  volátil: "Seguimiento frecuente",
};

export default function CourseQualityCard({ quality }: { quality: CourseQualityRecord }) {
  return (
    <details className="aula-disclosure aula-panel mb-10">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5">
        <span>
          <span className="aula-section-label"><Icon name="shield" /> confianza del curso</span>
          <strong className="mt-2 block font-display text-base text-white">
            {quality.status} · <time dateTime={quality.reviewedAt}>{quality.reviewedAt}</time>
          </strong>
        </span>
        <Icon name="chevronRight" className="aula-disclosure-icon text-zinc-500" />
      </summary>
      <div className="border-t border-zinc-800 px-5 pb-5 pt-4">
        <div className="flex flex-wrap gap-2">
          <span className="aula-chip" data-tone={quality.volatility === "volátil" ? "amber" : "green"}>
            {volatilityLabel[quality.volatility]}
          </span>
          <span className="aula-chip"><Icon name="calendar" /> Revisar cada {quality.reviewDays} días</span>
          <span className="aula-chip">Próxima revisión · {quality.nextReview}</span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          <strong className="text-zinc-200">Alcance:</strong> {quality.scope}
        </p>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <p className="aula-meta text-zinc-500">Evidencia revisada</p>
            <ul className="mt-2 grid gap-2 text-sm text-zinc-400">
              {quality.evidence.map((item) => (
                <li key={item} className="flex gap-2"><Icon name="check" className="mt-1 text-emerald-400" /> <span>{item}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="aula-meta text-zinc-500">Fuentes primarias de referencia</p>
            <ul className="mt-2 grid gap-2 text-sm">
              {quality.sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200">
                    <Icon name="external" /> {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-zinc-500">
          Esta ficha no sustituye la prueba local de cada tutorial técnico. Si una lección incluye comandos, versiones, precios o plataformas externas, debe volver a contrastarse con sus fuentes oficiales antes de marcarse como probada.
        </p>
      </div>
    </details>
  );
}
