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

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: ["Ramón Guillamón"],
      images: [{ url: post.image, width: 1672, height: 941, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    inLanguage: "es",
    author: { "@type": "Person", name: "Ramón Guillamón" },
    publisher: { "@type": "Organization", name: "Aulafy", url: SITE_URL },
    image: [`${SITE_URL}${post.image}`],
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
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

  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="mb-2 text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-zinc-400">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">{post.category}</span>
      </div>

      <article>
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#22d3ee] bg-[#22d3ee]/10 border border-[#22d3ee]/20 rounded-full px-3 py-1 mb-5">
            <Icon name={post.icon} />
            {post.category} · Actualizado {new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(new Date(post.updated))} · {post.readingTime}
          </div>
          <h1 className="font-display font-extrabold text-4xl text-white leading-tight">{post.title}</h1>
          <p className="mt-5 text-lg text-zinc-400 leading-relaxed">{post.intro}</p>
          {post.editorNote && (
            <div className="mt-6 rounded-xl border border-[#22d3ee]/25 bg-[#22d3ee]/10 px-4 py-3 text-sm text-[#a5f3fc] leading-relaxed">
              {post.editorNote}
            </div>
          )}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 mt-8">
            <Image src={post.image} alt="" fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" priority />
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
              <Link key={item.href} href={item.href} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 hover:border-zinc-600 transition-colors">
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
