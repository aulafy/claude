import { getLocalizedCursos } from "@/lib/i18n";
import { createRssFeed } from "@/lib/rss";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

export function GET() {
  const xml = createRssFeed({
    title: "Aulafy — English AI course updates",
    description: "New and updated practical artificial intelligence courses from Aulafy.",
    siteUrl: SITE_URL,
    feedPath: "/en/feed.xml",
    language: "en",
    items: getLocalizedCursos("en").map((course) => ({ title: course.title, description: course.desc, href: `/en/courses/${course.slug}`, publishedAt: course.updatedAt, category: course.level })),
  });
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" } });
}
