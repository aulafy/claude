import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { cursos, proximamente, totalLecciones } from "@/lib/cursos";

export const metadata: Metadata = {
  title: "Cursos — Aulafy",
  description:
    "Catálogo de cursos de IA de Aulafy: Claude Code, IA local, RAG, agentes, seguridad, evals, prompts, imagen, voz y vídeo. Gratis, en español y de código abierto.",
  alternates: { canonical: "/cursos" },
};

export default function Cursos() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Cursos</span>
      </div>

      <div className="mb-12">
        <h1 className="font-display font-extrabold text-4xl text-white mb-4">Cursos</h1>
        <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
          Rutas prácticas para pasar de curioso a construir de verdad. Todos gratuitos,
          en español y de código abierto. Sin registro: tu progreso se guarda solo en tu navegador.
        </p>
      </div>

      {/* Cursos disponibles */}
      <div className="grid md:grid-cols-2 gap-6 mb-14">
        {cursos.map((c) => (
          <Link
            key={c.slug}
            href={`/cursos/${c.slug}`}
            className="group rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden hover:border-zinc-600 transition-colors"
          >
            {/* Portada */}
            <div
              className="h-36 relative flex items-end p-5"
              style={{ background: `linear-gradient(120deg, ${c.gradient[0]}, ${c.gradient[1]})` }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_80%_0%,rgba(255,255,255,0.25),transparent_60%)]" />
              <div className="relative w-12 h-12 rounded-xl bg-white/15 border border-white/25 backdrop-blur flex items-center justify-center text-white text-xl">
                <Icon name={c.icon as IconName} />
              </div>
            </div>
            <div className="p-6">
              <h2 className="font-display font-bold text-xl text-white group-hover:text-orange-300 transition-colors">
                {c.title}
              </h2>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{c.desc}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
                <span className="inline-flex items-center gap-1.5"><Icon name="chart" /> {c.level}</span>
                <span className="inline-flex items-center gap-1.5"><Icon name="book" /> {totalLecciones(c)} lecciones</span>
                {c.pdf && <span className="inline-flex items-center gap-1.5"><Icon name="pdf" /> PDF incluido</span>}
                <span className="text-[#22d3ee]">Gratis</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Próximamente */}
      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4">Próximamente</h2>
      <div className="grid sm:grid-cols-2 gap-5">
        {proximamente.map((c) => (
          <div key={c.title} className="rounded-2xl border border-zinc-800/70 bg-zinc-900/20 p-6 opacity-75">
            <div className="text-2xl mb-3 text-zinc-400"><Icon name={c.icon as IconName} /></div>
            <h3 className="font-display font-semibold text-lg text-zinc-300">{c.title}</h3>
            <p className="mt-2 text-sm text-zinc-500 leading-relaxed">{c.desc}</p>
            <div className="mt-4 text-xs text-[#e879f9]">En preparación</div>
          </div>
        ))}
      </div>
    </div>
  );
}
