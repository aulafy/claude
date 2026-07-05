import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { cursos, proximamente, totalLecciones } from "@/lib/cursos";

export const metadata: Metadata = {
  title: "Cursos gratis de IA open source en español",
  description:
    "Catálogo gratuito de cursos de inteligencia artificial open source en español: Claude Code, IA local, Ollama, RAG, agentes, fine-tuning, MLOps, seguridad, evals, prompts, imagen, voz, vídeo y automatización. Sin registro.",
  keywords: [
    "cursos gratis de IA",
    "cursos inteligencia artificial español",
    "curso IA open source",
    "curso Claude Code",
    "curso Fable 5",
    "curso videojuegos 3D IA",
    "curso Godot Blender IA",
    "IA para CAD",
    "curso Ollama",
    "curso RAG",
    "curso agentes IA",
    "curso fine-tuning LLM",
    "curso MLOps LLM",
    "curso IA para pymes",
    "automatización IA self-hosted",
  ],
  alternates: { canonical: "/cursos" },
  openGraph: {
    title: "Cursos gratis de IA open source en español — Aulafy",
    description:
      "Rutas prácticas, gratuitas y sin registro para aprender IA local, Claude Code, Fable 5, videojuegos 3D, RAG, agentes, MLOps, seguridad y automatización.",
    url: "/cursos",
    type: "website",
    siteName: "Aulafy",
    locale: "es_ES",
    images: [
      {
        url: "/og-image.png",
        width: 512,
        height: 512,
        alt: "Catálogo de cursos de IA en Aulafy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cursos gratis de IA open source en español",
    description:
      "Catálogo práctico de Aulafy para aprender IA local, Claude Code, Fable 5, videojuegos 3D, RAG, agentes, MLOps y seguridad.",
    creator: "@learntouseai",
    images: ["/og-image.png"],
  },
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
        <h1 className="font-display font-extrabold text-4xl text-white mb-4">
          Cursos gratis de IA open source en español
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
          Rutas prácticas para pasar de curioso a construir de verdad. Todos gratuitos,
          en español y de código abierto. Sin registro: tu progreso se guarda solo en tu navegador.
        </p>
      </div>

      {/* Descarga del libro completo */}
      <a
        href="/aulafy-guia-completa.pdf"
        className="group flex items-center gap-4 rounded-xl border border-[#8b5cf6]/30 bg-gradient-to-r from-[#8b5cf6]/10 to-transparent p-4 mb-10 hover:border-[#8b5cf6]/60 transition-colors"
      >
        <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#22d3ee] flex items-center justify-center text-white"><Icon name="filePdf" /></span>
        <span className="flex-1 text-sm">
          <strong className="text-white">¿Prefieres leerlo todo de un tirón?</strong>{" "}
          <span className="text-zinc-400">Descarga los 7 cursos en un libro PDF de 225 páginas, gratis.</span>
        </span>
        <span className="flex-shrink-0 text-[#a78bfa] text-sm font-medium group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1.5"><Icon name="download" /> Descargar</span>
      </a>

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
