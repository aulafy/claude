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
    <div className="aula-shell max-w-4xl mx-auto px-6 sm:px-8 py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }}
      />
      <div className="mb-4 aula-meta">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Volumen II</span>
      </div>

      <div className="aula-frame p-6 sm:p-8 mb-8">
        <div className="aula-chip mb-4" data-tone="amber">
          Continuación · Volumen II
        </div>
        <PageTitle icon="brain">Claude Code + IA Local</PageTitle>
        <p className="lesson-lead">
          El primer libro te enseñó <em>qué</em> es Claude Code. Este da el salto:
          vas a <strong>construir herramientas de inteligencia artificial reales</strong>{" "}
          que se ejecutan en tu propio ordenador (tus datos no salen a la nube) y a{" "}
          <strong>publicarlas en internet</strong>. Sin ser programador.
        </p>
        <div className="flex flex-wrap gap-3 mt-7">
          <a
            href="/guia-claude-code-vol2.pdf"
            className="aula-button aula-button-primary text-sm"
          >
            <Icon name="filePdf" />
            Descargar el Volumen II (PDF)
          </a>
          <Link
            href="/cursos/ia-local/terminal"
            className="aula-button aula-button-secondary text-sm"
          >
            Empezar a leer →
          </Link>
        </div>
      </div>

      <div className="callout callout-orange mb-10">
        <strong>¿Vienes del Volumen I?</strong> Perfecto. Este volumen asume que ya
        tienes Claude Code instalado y funcionando. Si no, empieza por la{" "}
        <Link href="/cursos/claude-code/instalacion">instalación</Link> y los{" "}
        <Link href="/cursos/claude-code/primeros-pasos">primeros pasos</Link>.
      </div>

      {partes.map((parte) => (
        <div key={parte.titulo} className="mb-8">
          <h2 className="aula-section-label mb-3">
            {parte.titulo}
          </h2>
          <div className="grid gap-2">
            {parte.caps.map((cap) => (
              <Link
                key={cap.href}
                href={cap.href}
                className="aula-capsule flex items-center gap-4 p-4"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-md bg-violet-500/15 border border-violet-500/30 text-violet-400 flex items-center justify-center text-sm font-semibold font-[family-name:var(--font-code)]">
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
        <a href="https://www.linkedin.com/in/rguillamon/" className="text-violet-400 hover:text-fuchsia-300">LinkedIn</a>{" · "}
        <a href="https://x.com/learntouseai" className="text-violet-400 hover:text-fuchsia-300">X</a>
      </div>
    </div>
  );
}
