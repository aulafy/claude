import { blogPosts } from "@/lib/blog";
import { createRssFeed } from "@/lib/rss";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

export function GET() {
  const xml = createRssFeed({
    title: "Aulafy — Guías y radar de inteligencia artificial",
    description: "Guías prácticas para aprender IA y actualizaciones técnicas revisadas por Aulafy.",
    siteUrl: SITE_URL,
    feedPath: "/feed.xml",
    language: "es",
    items: blogPosts.map((post) => ({ title: post.title, description: post.description, href: `/blog/${post.slug}`, publishedAt: post.updated, category: post.category })),
  });
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" } });
}
