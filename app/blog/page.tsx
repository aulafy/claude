import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog de IA en español: herramientas, comparativas, SEO y automatización",
  description:
    "Artículos prácticos de Aulafy sobre IA en español: mejores herramientas, ChatGPT vs Claude vs Gemini vs Grok, SEO/AEO, prompts, pymes, agentes, IA local y RAG.",
  keywords: [
    "blog IA español",
    "herramientas IA 2026",
    "ChatGPT vs Claude",
    "IA para SEO",
    "AEO",
    "IA para pymes",
    "tendencias IA 2026",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog de IA en español — Aulafy",
    description:
      "Guías prácticas, comparativas y listas actualizadas para aprender y aplicar IA sin humo.",
    url: "/blog",
    type: "website",
    images: [{ url: "/og-image.png", width: 512, height: 512, alt: "Blog de IA de Aulafy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog de IA en español — Aulafy",
    description: "Herramientas, comparativas, SEO/AEO, prompts, pymes, agentes e IA local.",
    images: ["/og-image.png"],
  },
};

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Blog</span>
      </div>

      <section className="mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-[#22d3ee] bg-[#22d3ee]/10 border border-[#22d3ee]/20 rounded-full px-3 py-1 mb-5">
          <Icon name="search" />
          Guías para Google, lectores y asistentes de IA
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white max-w-4xl">
          Blog de IA en español: herramientas, comparativas y guías prácticas
        </h1>
        <p className="mt-5 text-lg text-zinc-400 max-w-3xl leading-relaxed">
          Artículos pensados para búsquedas reales: mejores herramientas de IA, comparativas entre modelos,
          SEO/AEO, prompts, casos de uso para pymes, agentes, IA local y RAG. Sin relleno: cada post enlaza a cursos y proyectos de Aulafy.
        </p>
      </section>

      <Link href={`/blog/${featured.slug}`} className="group block rounded-2xl border border-[#8b5cf6]/30 bg-gradient-to-br from-[#8b5cf6]/12 to-[#22d3ee]/5 p-7 mb-8 hover:border-[#8b5cf6]/60 transition-colors">
        <div className="flex flex-col md:flex-row gap-6 md:items-center">
          <div className="relative w-full md:w-72 aspect-video rounded-xl overflow-hidden border border-white/10 bg-zinc-950 shrink-0">
            <Image src={featured.image} alt="" fill sizes="(min-width: 768px) 288px, 100vw" className="object-cover" priority />
          </div>
          <div className="flex-1">
            <div className="text-xs text-[#a78bfa] font-semibold mb-2">Destacado · {featured.category} · {featured.readingTime}</div>
            <h2 className="font-display font-bold text-2xl text-white group-hover:text-orange-300 transition-colors">{featured.title}</h2>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{featured.description}</p>
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
            className="group rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 hover:border-zinc-600 transition-colors"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 mb-4">
              <Image src={post.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="text-xs text-zinc-500 mb-2">{post.category} · {post.readingTime}</div>
            <h2 className="font-display font-bold text-xl text-white group-hover:text-orange-300 transition-colors">{post.title}</h2>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{post.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
