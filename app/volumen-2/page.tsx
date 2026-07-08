import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageTitle from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Volumen II · Claude Code + IA Local",
  description:
    "La continuación de Aprende Claude Code. Construye herramientas de IA que se ejecutan en tu propio ordenador y publícalas en internet. Guía práctica para perfiles técnicos, en español.",
  alternates: { canonical: "/cursos/ia-local" },
};

const partes = [
  {
    titulo: "Parte I · Fundamentos",
    caps: [
      { href: "/cursos/ia-local/terminal", n: 1, label: "La terminal sin miedo (qué es un CLI)" },
      { href: "/cursos/ia-local/proyectos", n: 2, label: "Cómo trabajar con tus proyectos" },
      { href: "/cursos/ia-local/prompts", n: 3, label: "Escribir buenos encargos (prompts)" },
      { href: "/cursos/ia-local/ia-local", n: 4, label: "IA local: elige el modelo para tu máquina" },
      { href: "/cursos/ia-local/depurar", n: 5, label: "Cuando algo se rompe: depurar y proteger" },
    ],
  },
  {
    titulo: "Parte II · Construye tus herramientas de IA",
    caps: [
      { href: "/cursos/ia-local/chatbot-legal", n: 6, label: "Un chatbot que responde citando la ley" },
      { href: "/cursos/ia-local/pdf", n: 7, label: "Pregúntale a tus PDF" },
      { href: "/cursos/ia-local/voz", n: 8, label: "Un chatbot que te escucha y te habla" },
      { href: "/cursos/ia-local/texto-a-audio", n: 9, label: "Convierte cualquier texto en audio" },
      { href: "/cursos/ia-local/simulaciones-3d", n: 10, label: "Simulaciones 3D para explicar en clase" },
      { href: "/cursos/ia-local/avatar", n: 11, label: "Un avatar que habla para tus cursos" },
      { href: "/cursos/ia-local/wordpress", n: 12, label: "Crea un tema de WordPress con IA" },
      { href: "/cursos/ia-local/landing", n: 13, label: "Una web para tu servicio en minutos" },
      { href: "/cursos/ia-local/facturacion", n: 14, label: "Un asistente de oficina para autónomos" },
      { href: "/cursos/ia-local/estudio", n: 15, label: "Una app para estudiar y aprender" },
    ],
  },
  {
    titulo: "Parte III · Sácalo al mundo",
    caps: [
      { href: "/cursos/ia-local/publicar", n: 16, label: "Publica tu aplicación en internet" },
    ],
  },
  {
    titulo: "Anexos (avanzado)",
    caps: [
      { href: "/cursos/ia-local/cluster", n: 17, label: "Varios ordenadores, una sola IA" },
    ],
  },
];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

const bookJsonLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Claude Code + IA Local — Guía práctica para perfiles técnicos (Volumen II)",
  inLanguage: "es",
  url: `${SITE_URL}/cursos/ia-local`,
  bookFormat: "https://schema.org/EBook",
  license: "https://creativecommons.org/licenses/by/4.0/",
  isAccessibleForFree: true,
  author: { "@type": "Person", name: "Ramón Guillamón", url: "https://www.linkedin.com/in/rguillamon/" },
  about: ["Claude Code", "IA local", "Ollama", "RAG", "despliegue de aplicaciones"],
  hasPart: partes.flatMap((p) =>
    p.caps.map((c) => ({
      "@type": "Chapter",
      position: c.n,
      name: c.label,
      url: `${SITE_URL}${c.href}`,
    }))
  ),
};

export default function VolumenII() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }}
      />
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Volumen II</span>
      </div>

      <div className="mb-8">
        <div className="inline-block mb-3 text-xs font-semibold uppercase tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1">
          Continuación · Volumen II
        </div>
        <PageTitle icon="brain">Claude Code + IA Local</PageTitle>
        <p className="text-lg text-zinc-400 leading-relaxed">
          El primer libro te enseñó <em>qué</em> es Claude Code. Este da el salto:
          vas a <strong>construir herramientas de inteligencia artificial reales</strong>{" "}
          que se ejecutan en tu propio ordenador (tus datos no salen a la nube) y a{" "}
          <strong>publicarlas en internet</strong>. Sin ser programador.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-10">
        <a
          href="/guia-claude-code-vol2.pdf"
          className="inline-flex items-center gap-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white font-medium px-4 py-2.5 text-sm transition-colors"
        >
          <Icon name="filePdf" />
          Descargar el Volumen II (PDF)
        </a>
        <Link
          href="/cursos/ia-local/terminal"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-200 font-medium px-4 py-2.5 text-sm transition-colors"
        >
          Empezar a leer →
        </Link>
      </div>

      <div className="callout callout-orange mb-10">
        <strong>¿Vienes del Volumen I?</strong> Perfecto. Este volumen asume que ya
        tienes Claude Code instalado y funcionando. Si no, empieza por la{" "}
        <Link href="/cursos/claude-code/instalacion">instalación</Link> y los{" "}
        <Link href="/cursos/claude-code/primeros-pasos">primeros pasos</Link>.
      </div>

      {partes.map((parte) => (
        <div key={parte.titulo} className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-3">
            {parte.titulo}
          </h2>
          <div className="space-y-2">
            {parte.caps.map((cap) => (
              <Link
                key={cap.href}
                href={cap.href}
                className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 hover:border-zinc-600 transition-colors"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center text-sm font-semibold">
                  {cap.n}
                </div>
                <span className="text-zinc-200 text-sm font-medium">{cap.label}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-12 pt-8 border-t border-zinc-800 text-sm text-zinc-500">
        Contenido bajo licencia Creative Commons (CC BY 4.0) · por Ramón Guillamón ·{" "}
        <a href="https://www.linkedin.com/in/rguillamon/" className="text-orange-400 hover:text-orange-300">LinkedIn</a>{" · "}
        <a href="https://x.com/learntouseai" className="text-orange-400 hover:text-orange-300">X</a>
      </div>
    </div>
  );
}
