import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { seoLandings } from "@/lib/seo-landings";

export const metadata: Metadata = {
  title: "Guías prácticas de inteligencia artificial",
  description: "Respuestas claras y guías prácticas para empezar con IA, elegir una herramienta, proteger datos y resolver problemas técnicos concretos.",
  alternates: { canonical: "/guias" },
};

const beginnerSlugs = new Set([
  "que-puedo-hacer-con-ia-sin-programar",
  "como-saber-si-una-respuesta-de-ia-es-correcta",
  "que-datos-no-debo-compartir-con-una-ia",
  "ia-para-oficina-primeros-pasos",
]);

const courseSlugs = new Set([
  "curso-codex-espanol",
  "crear-pagina-web-con-ia",
  "curso-claude-code-espanol",
  "curso-ia-local-ollama",
  "curso-rag-pdf-ia",
  "curso-agentes-ia-espanol",
  "ia-para-pymes",
]);

const groups = [
  {
    id: "empezar",
    label: "Empieza aquí",
    title: "Respuestas para usar IA con criterio",
    description: "Dudas habituales explicadas sin asumir conocimientos técnicos.",
    icon: "seed" as const,
    items: seoLandings.filter((landing) => beginnerSlugs.has(landing.slug)),
  },
  {
    id: "rutas",
    label: "Rutas completas",
    title: "Aprende una herramienta o construye un proyecto",
    description: "Entradas amplias que conducen a cursos ordenados y prácticas verificables.",
    icon: "route" as const,
    items: seoLandings.filter((landing) => courseSlugs.has(landing.slug)),
  },
  {
    id: "resolver",
    label: "Consulta técnica",
    title: "Resuelve un problema concreto",
    description: "Diagnósticos sobre IA local, RAG, agentes, automatización, hardware y flujos de producción.",
    icon: "tools" as const,
    items: seoLandings.filter((landing) => !beginnerSlugs.has(landing.slug) && !courseSlugs.has(landing.slug)),
  },
];

export default function GuidesPage() {
  return (
    <div className="aula-shell mx-auto max-w-6xl px-6 py-14">
      <div className="aula-meta mb-4">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Guías</span>
      </div>

      <header className="max-w-4xl">
        <span className="aula-section-label"><Icon name="book" /> Biblioteca por pregunta</span>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-white sm:text-5xl">Guías prácticas para aprender y resolver con IA</h1>
        <p className="lesson-lead mt-5">Empieza por tu duda o resultado. Las respuestas para principiantes aparecen primero; los diagnósticos técnicos quedan separados para cuando realmente los necesites.</p>
        <nav className="mt-7 flex flex-wrap gap-3" aria-label="Secciones de guías">
          {groups.map((group) => <a key={group.id} href={`#${group.id}`} className="aula-button aula-button-secondary"><Icon name={group.icon} /> {group.label}</a>)}
        </nav>
      </header>

      {groups.map((group) => (
        <section id={group.id} key={group.id} className="mt-14 scroll-mt-24" aria-labelledby={`${group.id}-title`}>
          <span className="aula-section-label"><Icon name={group.icon} /> {group.label}</span>
          <h2 id={`${group.id}-title`} className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">{group.title}</h2>
          <p className="mt-2 max-w-3xl text-zinc-400">{group.description}</p>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {group.items.map((guide) => (
              <Link key={guide.slug} href={`/${guide.slug}`} className="aula-capsule group p-5">
                <span className="flex items-start justify-between gap-3">
                  <Icon name={guide.icon} className="mt-1 text-[#22d3ee]" />
                  <Icon name="chevronRight" className="mt-1 text-zinc-600 group-hover:text-fuchsia-300" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold leading-snug text-white group-hover:text-fuchsia-300">{guide.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{guide.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-14 border-t border-zinc-800 pt-10">
        <h2 className="font-display text-2xl font-bold text-white">¿Prefieres avanzar con un orden?</h2>
        <p className="mt-2 text-zinc-400">La ruta inicial convierte estas respuestas en siete prácticas breves con progreso local.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/mi-ruta" className="aula-button aula-button-primary"><Icon name="route" /> Abrir mi ruta</Link>
          <Link href="/blog#radar" className="aula-button aula-button-secondary"><Icon name="chart" /> Ver radar técnico</Link>
          <Link href="/solicitar-tutorial" className="aula-button aula-button-secondary"><Icon name="idea" /> Solicitar un tutorial</Link>
          <Link href="/research/1" className="aula-button aula-button-secondary"><Icon name="document" /> Investigación</Link>
        </div>
      </section>
    </div>
  );
}
