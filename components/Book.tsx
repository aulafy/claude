"use client";

import { useState } from "react";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";

/* ============================================================
   Componentes compartidos del Volumen II (Claude Code + IA Local)
   Reproducen en la web los recuadros pedagógicos del PDF.
   ============================================================ */

export function Lead({ children }: { children: React.ReactNode }) {
  return <p className="lesson-lead">{children}</p>;
}

export type LessonMission = {
  minutes?: number;
  build?: string;
  evidence?: string;
  steps?: [string, string, string];
};

export function Crumb({
  label,
  courseHref = "/cursos/ia-local",
  courseLabel = "Claude Code + IA Local",
}: {
  label: string;
  courseHref?: string;
  courseLabel?: string;
}) {
  return (
    <div className="mb-4 aula-meta">
      <Link href="/cursos" className="hover:text-zinc-400">Cursos</Link>
      <span className="mx-2">/</span>
      <Link href={courseHref} className="hover:text-zinc-400">{courseLabel}</Link>
      <span className="mx-2">/</span>
      <span className="text-zinc-400">{label}</span>
    </div>
  );
}

/* --- Recuadros --- */
export function Objetivos({ children }: { children: React.ReactNode }) {
  return (
    <div className="callout callout-info mb-8">
      <strong className="inline-flex items-center gap-2">
        <Icon name="prompt" /> Objetivos de aprendizaje
      </strong>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export function Idea({ children }: { children: React.ReactNode }) {
  return (
    <div className="callout callout-tip my-6">
      <strong className="inline-flex items-center gap-2">
        <Icon name="idea" /> Idea clave.
      </strong>{" "}
      {children}
    </div>
  );
}

export function Cuidado({ children }: { children: React.ReactNode }) {
  return (
    <div className="callout callout-warning my-6">
      <strong className="inline-flex items-center gap-2">
        <Icon name="warning" /> Cuidado.
      </strong>{" "}
      {children}
    </div>
  );
}

export function Cristiano({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="callout callout-info my-6">
      <strong className="inline-flex items-center gap-2">
        <Icon name="brain" /> En cristiano: {term}.
      </strong>{" "}
      {children}
    </div>
  );
}

export function Comprueba({ children }: { children: React.ReactNode }) {
  return (
    <div className="callout callout-tip my-6">
      <strong className="inline-flex items-center gap-2">
        <Icon name="check" /> Comprueba que funciona.
      </strong>{" "}
      {children}
    </div>
  );
}

export function Guardar({ children }: { children: React.ReactNode }) {
  return (
    <div className="callout callout-orange my-6">
      <strong className="inline-flex items-center gap-2">
        <Icon name="save" /> Guardar y reabrir el proyecto.
      </strong>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export function Nota({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="callout callout-orange my-6">
      <strong>{title}</strong>
      <div className="mt-2">{children}</div>
    </div>
  );
}

/* --- Bloque de terminal (comandos), con copiar --- */
export function Terminal({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };
  return (
    <div className="aula-terminal my-5">
      <div className="aula-terminal-bar">
        <span className="flex items-center gap-1.5">
          <Icon name="terminal" /> Terminal
        </span>
        <button
          onClick={copy}
          className="aula-chip"
        >
          {copied ? (
            <>
              <Icon name="check" className="text-emerald-400" /> Copiado
            </>
          ) : (
            <>
              <Icon name="copy" /> Copiar
            </>
          )}
        </button>
      </div>
      <pre className="px-4 py-3 text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap overflow-x-auto font-[family-name:var(--font-code)]">
        {children}
      </pre>
    </div>
  );
}

/* --- Navegación anterior / siguiente --- */
export function ChapterNav({
  prev,
  next,
}: {
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
}) {
  return (
    <div className="mt-12 pt-8 border-t border-zinc-800">
      {next ? (
        <div className="aula-panel mb-5 p-5">
          <span className="aula-section-label"><Icon name="rocket" /> Siguiente misión recomendada</span>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Si has guardado la evidencia de esta lección, continúa con «{next.label}». Si no, repite la comprobación antes de avanzar.
          </p>
        </div>
      ) : null}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
      {prev ? (
        <Link href={prev.href} className="aula-button aula-button-secondary justify-start">
          <Icon name="chevronRight" className="rotate-180" /> {prev.label}
        </Link>
      ) : <span />}
      {next ? (
        <Link href={next.href} className="aula-button aula-button-primary justify-start sm:justify-center">
          {next.label} <Icon name="chevronRight" />
        </Link>
      ) : <span />}
      </div>
    </div>
  );
}

export function MissionBrief({
  title,
  mission,
}: {
  title: string;
  mission?: LessonMission;
}) {
  const [copiedEvidence, setCopiedEvidence] = useState(false);
  const steps = mission?.steps ?? ["Entiende el criterio", "Haz una práctica pequeña", "Guarda una evidencia"];
  const build = mission?.build ?? `Una decisión o prueba aplicada a «${title}».`;
  const evidence = mission?.evidence ?? "Una nota breve con qué hiciste, qué salió bien, qué falló y qué revisarías después.";
  const evidenceTemplate = [
    `# Evidencia de aprendizaje: ${title}`,
    "",
    "## Objetivo",
    build,
    "",
    "## Pasos realizados",
    ...steps.map((step, index) => `${index + 1}. ${step}`),
    "",
    "## Resultado",
    evidence,
    "",
    "## Comprobación",
    "- ¿Qué he verificado por mí mismo/a?",
    "- ¿Qué fuente, prueba o dato confirma que no estoy copiando una alucinación?",
    "- ¿Qué haría distinto en la siguiente iteración?",
  ].join("\n");

  const copyEvidence = async () => {
    try {
      await navigator.clipboard.writeText(evidenceTemplate);
      setCopiedEvidence(true);
      setTimeout(() => setCopiedEvidence(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <section className="lesson-mission mb-10" aria-labelledby="lesson-mission-title">
      <div className="lesson-mission-main">
        <span className="aula-section-label"><Icon name="rocket" /> Misión de la lección</span>
        <h2 id="lesson-mission-title">Qué vas a conseguir ahora</h2>
        <p>{build}</p>
      </div>
      <ol className="lesson-mission-steps" aria-label="Método de la misión">
        {steps.map((step, index) => (
          <li key={step}>
            <span>{index + 1}</span>
            <strong>{step}</strong>
          </li>
        ))}
      </ol>
      <div className="lesson-mission-proof">
        {mission?.minutes ? <span className="aula-chip" data-tone="cyan"><Icon name="calendar" /> ≈ {mission.minutes} min</span> : null}
        <span className="aula-chip" data-tone="green"><Icon name="save" /> Evidencia</span>
        <p>{evidence}</p>
        <button type="button" className="lesson-mission-copy" onClick={copyEvidence}>
          {copiedEvidence ? (
            <>
              <Icon name="check" /> Plantilla copiada
            </>
          ) : (
            <>
              <Icon name="copy" /> Copiar plantilla de evidencia
            </>
          )}
        </button>
      </div>
    </section>
  );
}

/* --- Envoltorio de capítulo --- */
export function Chapter({
  crumb,
  title,
  icon,
  lead,
  children,
  courseHref,
  courseLabel,
  mission,
}: {
  crumb: string;
  title: string;
  icon: IconName;
  lead: React.ReactNode;
  children: React.ReactNode;
  courseHref?: string;
  courseLabel?: string;
  mission?: LessonMission;
}) {
  return (
    <div className="aula-shell max-w-4xl mx-auto px-6 sm:px-8 py-12 sm:py-14">
      <Crumb label={crumb} courseHref={courseHref} courseLabel={courseLabel} />
      <header className="aula-frame p-6 sm:p-8 mb-10">
        <div className="aula-icon text-fuchsia-300 text-xl mb-5">
          <Icon name={icon} />
        </div>
        <span className="aula-section-label">
          <Icon name="book" /> Lección
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-4 leading-tight">
          {title}
        </h1>
        <Lead>{lead}</Lead>
      </header>
      <MissionBrief title={title} mission={mission} />
      <article className="aula-reading mx-auto">
        {children}
      </article>
    </div>
  );
}
