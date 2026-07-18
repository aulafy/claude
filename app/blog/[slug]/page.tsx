import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { blogPosts, getBlogPost } from "@/lib/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const title = seoTitleFor(post.slug, post.title);
  const description = compactDescription(post.description);

  return {
    title,
    description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: ["Ramón Guillamón"],
      images: [{ url: post.image, width: 1672, height: 941, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.image],
    },
  };
}

function seoTitleFor(slug: string, fallback: string) {
  const titles: Record<string, string> = {
    "como-empezar-usar-ia-2026": "Cómo empezar a usar IA en 2026",
    "usar-ia-estudiar-sin-hacer-trampas-2026": "Cómo usar IA para estudiar sin hacer trampas",
    "grok-45-guia-evaluacion-2026": "Grok 4.5: evaluación sin hype",
    "crear-tutoriales-ia-x-aulafy": "Tutoriales de IA para X sin humo",
    "mcp-2026-07-28-migracion-guia-espanol": "MCP 2026-07-28: guía de migración",
    "mejores-herramientas-ia-gratis-2026": "Mejores herramientas de IA gratis en 2026",
    "chatgpt-vs-claude-vs-gemini-vs-grok-2026": "ChatGPT vs Claude vs Gemini vs Grok",
    "como-usar-ia-para-seo-aeo-2026": "IA para SEO y AEO en 2026",
    "mejores-prompts-chatgpt-claude-blogs": "Prompts para ChatGPT y Claude en blogs",
    "ia-para-pymes-autonomos-casos-uso-2026": "IA para pymes: 25 casos de uso",
    "tendencias-ia-2026-agentes-ia-local-rag": "Tendencias IA 2026: agentes, local y RAG",
  };
  return titles[slug] ?? fallback;
}

function compactDescription(text: string) {
  if (text.length <= 155) return text;
  const trimmed = text.slice(0, 152);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 120 ? lastSpace : 152)}...`;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${post.slug}#article`,
    url: `${SITE_URL}/blog/${post.slug}`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    inLanguage: "es",
    author: { "@id": `${SITE_URL}/#author`, name: "Ramón Guillamón", url: `${SITE_URL}/sobre-ramon-guillamon` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}${post.image}`,
      width: 1672,
      height: 941,
    },
    mainEntityOfPage: { "@id": `${SITE_URL}/blog/${post.slug}#webpage` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    keywords: post.keywords.join(", "),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };

  return (
    <main className="aula-shell max-w-4xl mx-auto px-6 py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="mb-4 aula-meta">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-zinc-400">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">{post.category}</span>
      </div>

      <article>
        <header className="aula-frame p-6 sm:p-8 mb-10">
          <div className="aula-chip mb-5" data-tone="cyan">
            <Icon name={post.icon} />
            {post.category} · Actualizado {new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(new Date(post.updated))} · {post.readingTime}
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-tight">{post.title}</h1>
          <p className="mt-5 lesson-lead">{post.intro}</p>
          {post.editorNote && (
            <div className="mt-6 aula-panel border-[#22d3ee]/25 px-4 py-3 text-sm text-[#a5f3fc] leading-relaxed">
              {post.editorNote}
            </div>
          )}
          <div className="relative aspect-video rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 mt-8">
            <Image src={post.image} alt={post.title} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" priority />
          </div>
        </header>

        <div className="prose">
          {post.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
            </section>
          ))}

          {post.table && (
            <section>
              <h2>Comparativa rápida</h2>
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      {post.table.headers.map((header) => <th key={header}>{header}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {post.table.rows.map((row) => (
                      <tr key={row.join("-")}>
                        {row.map((cell) => <td key={cell}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <section>
            <h2>Preguntas frecuentes</h2>
            {post.faqs.map((faq) => (
              <div key={faq.q}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </section>
        </div>

        <section className="mt-12 border-t border-zinc-800 pt-8">
          <h2 className="font-display font-bold text-2xl text-white mb-5">Sigue aprendiendo</h2>
          <div className="grid gap-4">
            {post.related.map((item) => (
              <Link key={item.href} href={item.href} className="aula-capsule block p-4">
                <div className="font-semibold text-white">{item.title}</div>
                <p className="mt-1 text-sm text-zinc-400">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
