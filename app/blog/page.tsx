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
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

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
          Guías para aprender y aplicar IA
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white max-w-4xl">
          Guías y actualidad sobre inteligencia artificial
        </h1>
        <p className="mt-5 lesson-lead max-w-3xl">
          Explicaciones prácticas, comparativas y análisis para entender qué está cambiando y qué merece realmente la pena aprender.
          Cada guía enlaza a cursos y proyectos para que puedas pasar de la lectura a la práctica.
        </p>
      </section>

      <Link href={`/blog/${featured.slug}`} className="group aula-frame block p-7 mb-8 hover:border-zinc-600 transition-colors">
        <div className="flex flex-col md:flex-row gap-6 md:items-center">
          <div className="relative w-full md:w-72 aspect-video rounded-lg overflow-hidden border border-white/10 bg-zinc-950 shrink-0">
            <Image src={featured.image} alt={featured.title} fill sizes="(min-width: 768px) 288px, 100vw" className="object-cover" priority />
          </div>
          <div className="flex-1">
            <div className="aula-meta mb-2">Destacado · {featured.category} · {featured.readingTime}</div>
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
        {rest.map((post) => (
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
    </main>
  );
}
