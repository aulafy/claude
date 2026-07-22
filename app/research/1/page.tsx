import type { Metadata } from "next";
import Link from "next/link";

const pdfHref = "/research/1/neural-capsules-research-paper-ramon.pdf";

export const metadata: Metadata = {
  title: "Research 1: Neural Capsules",
  description: "Paper técnico descargable sobre Neural Capsules, publicado en Aulafy como recurso de research.",
  alternates: { canonical: "/research/1" },
};

export default function ResearchPaperPage() {
  return (
    <main id="main-content" className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="aula-panel border border-[var(--border)] p-6 sm:p-8">
          <p className="aula-section-label">Research / 1</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-[var(--text)] sm:text-4xl">
            Neural Capsules: A Storage-Aware Framework for Hot-Swappable, Incrementally Composable Language-Model Experts
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            Paper técnico de Ramón Guillamón publicado como recurso descargable de investigación en Aulafy.
            Aquí puedes leer el contexto básico y bajar el PDF original sin intermediarios.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="aula-button aula-button-primary" href={pdfHref} download>
              Descargar PDF
            </a>
            <Link className="aula-button aula-button-secondary" href={pdfHref} target="_blank" rel="noreferrer">
              Abrir en nueva pestaña
            </Link>
          </div>
        </header>

        <section className="aula-panel border border-[var(--border)] p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-[var(--text)]">Ficha rápida</h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="aula-meta">Autor</dt>
              <dd className="mt-1 text-sm text-[var(--text)]">Ramón Guillamón</dd>
            </div>
            <div>
              <dt className="aula-meta">Formato</dt>
              <dd className="mt-1 text-sm text-[var(--text)]">PDF descargable</dd>
            </div>
            <div>
              <dt className="aula-meta">Ubicación</dt>
              <dd className="mt-1 text-sm text-[var(--text)]">/research/1</dd>
            </div>
            <div>
              <dt className="aula-meta">Propósito</dt>
              <dd className="mt-1 text-sm text-[var(--text)]">Archivo técnico de research para consulta y descarga</dd>
            </div>
          </dl>
        </section>

        <section className="aula-panel border border-[var(--border)] p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-[var(--text)]">Descarga directa</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            El fichero está alojado en el sitio para que se pueda enlazar, indexar y descargar sin pasos extra.
          </p>
          <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--panel-soft)] p-4 text-sm text-[var(--text)]">
            <code>{pdfHref}</code>
          </div>
        </section>
      </div>
    </main>
  );
}
