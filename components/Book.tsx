"use client";

import { useState } from "react";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";

/* ============================================================
   Componentes compartidos del Volumen II (Claude Code + IA Local)
   Reproducen en la web los recuadros pedagógicos del PDF.
   ============================================================ */

export function Lead({ children }: { children: React.ReactNode }) {
  return <p className="text-lg text-zinc-400 leading-relaxed">{children}</p>;
}

export function Crumb({ label }: { label: string }) {
  return (
    <div className="mb-2 text-xs text-zinc-600">
      <Link href="/" className="hover:text-zinc-400">Inicio</Link>
      <span className="mx-2">/</span>
      <Link href="/volumen-2" className="hover:text-zinc-400">Volumen II</Link>
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
    <div className="my-4 rounded-lg border border-zinc-700 bg-zinc-900/60 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900">
        <span className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
          <Icon name="terminal" /> Terminal
        </span>
        <button
          onClick={copy}
          className="text-xs px-2 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors flex items-center gap-1"
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
      <pre className="px-4 py-3 text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap overflow-x-auto font-[family-name:var(--font-geist-mono)]">
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
    <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
      {prev ? (
        <Link href={prev.href} className="text-sm text-zinc-500 hover:text-zinc-300">← {prev.label}</Link>
      ) : <span />}
      {next ? (
        <Link href={next.href} className="text-sm text-orange-400 hover:text-orange-300">{next.label} →</Link>
      ) : <span />}
    </div>
  );
}

/* --- Envoltorio de capítulo --- */
export function Chapter({
  crumb,
  title,
  icon,
  lead,
  children,
}: {
  crumb: string;
  title: string;
  icon: IconName;
  lead: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <Crumb label={crumb} />
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
          <Icon name={icon} className="text-orange-400 text-3xl" />
          <span>{title}</span>
        </h1>
        <Lead>{lead}</Lead>
      </div>
      {children}
    </div>
  );
}
