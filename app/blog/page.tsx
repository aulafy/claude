import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog de IA en español: guías, comparativas y actualidad",
  description:
    "Guías prácticas sobre IA en español: MCP, agentes, Claude Code, herramientas, SEO/AEO, prompts, pymes, IA local y RAG.",
  keywords: [
    "blog IA español",
    "MCP español",
    "Model Context Protocol",
    "agentes IA",
    "herramientas IA 2026",
    "ChatGPT vs Claude",
    "IA para SEO",
    "AEO",
    "IA para pymes",
    "tendencias IA 2026",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog de IA en español",
    description:
      "Guías prácticas, comparativas y listas actualizadas para aprender y aplicar IA sin humo.",
    url: "/blog",
    type: "website",
    images: [{ url: "/opengraph-image",
        width: 1200,
        height: 630, alt: "Blog de IA de Aulafy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog de IA en español",
    description: "Herramientas, comparativas, SEO/AEO, prompts, pymes, agentes e IA local.",
    images: ["/opengraph-image"],
  },
};

export default function BlogPage() {
  const quickAnswers = [
    { title: "¿Qué puedo hacer con IA sin programar?", desc: "Siete tareas pequeñas para empezar hoy.", href: "/que-puedo-hacer-con-ia-sin-programar", icon: "idea" as const },
    { title: "¿Cómo sé si la respuesta es correcta?", desc: "Un método breve para verificar hechos y fuentes.", href: "/como-saber-si-una-respuesta-de-ia-es-correcta", icon: "check" as const },
    { title: "¿Qué datos no debo compartir?", desc: "Protege información personal y confidencial.", href: "/que-datos-no-debo-compartir-con-una-ia", icon: "userShield" as const },
    { title: "¿Cómo empiezo a usar IA en la oficina?", desc: "Diseña un primer piloto pequeño y reversible.", href: "/ia-para-oficina-primeros-pasos", icon: "briefcase" as const },
  ];
  const beginnerSlugs = new Set([
    "como-empezar-usar-ia-2026",
    "usar-ia-estudiar-sin-hacer-trampas-2026",
    "mejores-herramientas-ia-gratis-2026",
    "chatgpt-vs-claude-vs-gemini-vs-grok-2026",
    "ia-para-pymes-autonomos-casos-uso-2026",
  ]);
  const learningPosts = blogPosts.filter((post) => beginnerSlugs.has(post.slug));
  const featured = (learningPosts.find((post) => post.slug === "como-empezar-usar-ia-2026") ?? learningPosts[0])!;
  const beginnerGuides = learningPosts.filter((post) => post.slug !== featured.slug);
  const radarPosts = blogPosts.filter((post) => !beginnerSlugs.has(post.slug));

  return (
    <main className="aula-shell max-w-6xl mx-auto px-6 py-14">
      <div className="mb-4 aula-meta">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Blog</span>
      </div>

      <section className="mb-12">
        <div className="aula-chip mb-5" data-tone="cyan">
          <Icon name="search" />
          Aprende IA antes de perseguir novedades
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white max-w-4xl">
          Guías para empezar y un radar técnico separado
        </h1>
        <p className="mt-5 lesson-lead max-w-3xl">
          Empieza por una tarea, una necesidad o una duda cotidiana. Las noticias de modelos y herramientas están en el radar técnico para que no tengas que entenderlas antes de aprender lo esencial.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#aprender" className="aula-button aula-button-primary"><Icon name="seed" /> Aprender IA</a>
          <a href="#radar" className="aula-button aula-button-secondary"><Icon name="chart" /> Radar técnico</a>
          <a href="/feed.xml" className="aula-button aula-button-secondary"><Icon name="rss" /> Seguir por RSS</a>
        </div>
      </section>

      <section id="aprender" className="scroll-mt-24" aria-labelledby="learning-guides-title">
        <div className="mb-6">
          <span className="aula-section-label"><Icon name="seed" /> Empieza aquí</span>
          <h2 id="learning-guides-title" className="mt-2 font-display text-3xl font-bold text-white">Aprender IA sin jerga previa</h2>
          <p className="mt-2 max-w-3xl text-zinc-400">Guías evergreen para elegir una primera tarea, estudiar, trabajar y comparar herramientas con criterio.</p>
        </div>

      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Respuestas rápidas para empezar con IA">
        {quickAnswers.map((answer) => (
          <Link key={answer.href} href={answer.href} className="aula-capsule p-5 group">
            <Icon name={answer.icon} className="text-[#22d3ee]" />
            <h2 className="mt-3 font-display text-base font-bold text-white group-hover:text-fuchsia-300">{answer.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{answer.desc}</p>
          </Link>
        ))}
      </div>

      <Link href={`/blog/${featured.slug}`} className="group aula-frame block p-7 mb-8 hover:border-zinc-600 transition-colors">
        <div className="flex flex-col md:flex-row gap-6 md:items-center">
          <div className="relative w-full md:w-72 aspect-video rounded-lg overflow-hidden border border-white/10 bg-zinc-950 shrink-0">
            <Image src={featured.image} alt={featured.title} fill sizes="(min-width: 768px) 288px, 100vw" className="object-cover" priority />
          </div>
          <div className="flex-1">
            <div className="aula-meta mb-2">Empieza aquí · {featured.category} · {featured.readingTime}</div>
            <h2 className="font-display font-bold text-2xl text-white group-hover:text-fuchsia-300 transition-colors">{featured.title}</h2>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{featured.description}</p>
            {featured.editorNote && (
              <p className="mt-3 text-xs text-[#22d3ee] leading-relaxed">{featured.editorNote}</p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {featured.sections.slice(0, 3).map((section) => (
                <span key={section.title} className="aula-chip">
                  {section.title}
                </span>
              ))}
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-[#22d3ee]">
            Leer guía <Icon name="chevronRight" />
          </span>
        </div>
      </Link>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {beginnerGuides.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group aula-capsule p-6"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 mb-4">
              <Image src={post.image} alt={post.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="aula-meta mb-2">{post.category} · {post.readingTime}</div>
            <h2 className="font-display font-bold text-xl text-white group-hover:text-fuchsia-300 transition-colors">{post.title}</h2>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{post.description}</p>
            {post.editorNote && (
              <p className="mt-3 text-xs text-[#22d3ee] leading-relaxed">{post.editorNote}</p>
            )}
            <div className="mt-4 space-y-2">
              <div className="aula-section-label text-[#22d3ee]">Dentro</div>
              <div className="flex flex-wrap gap-2">
                {post.sections.slice(0, 3).map((section) => (
                  <span key={section.title} className="aula-chip">
                    {section.title}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
      </section>

      <section id="radar" className="mt-16 border-t border-zinc-800 pt-12 scroll-mt-24" aria-labelledby="technical-radar-title">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="aula-section-label"><Icon name="chart" /> Para profundizar</span>
            <h2 id="technical-radar-title" className="mt-2 font-display text-3xl font-bold text-white">Radar técnico</h2>
            <p className="mt-2 max-w-3xl text-zinc-400">Cambios de modelos, protocolos, agentes y ecosistema. Úsalo para actualizarte, no como requisito para empezar.</p>
          </div>
          <Link href="/mi-ruta" className="aula-button aula-button-secondary shrink-0"><Icon name="route" /> Volver a mi ruta</Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {radarPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group aula-capsule p-6">
              <div className="relative aspect-video rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 mb-4">
                <Image src={post.image} alt={post.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="aula-meta mb-2">{post.category} · {post.readingTime}</div>
              <h3 className="font-display font-bold text-xl text-white group-hover:text-fuchsia-300 transition-colors">{post.title}</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{post.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
