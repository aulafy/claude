import { NextResponse } from "next/server";
import { absoluteUrl, alternateLanguages, getSeoIndexEntries, SITE_URL } from "@/lib/seo-index";
import { educationalReviewDate } from "@/lib/course-guidance";

export function GET() {
  const seoEntries = getSeoIndexEntries();
  const entries = seoEntries.map((entry) => ({
    url: absoluteUrl(entry.route),
    route: entry.route || "/",
    title: entry.title,
    description: entry.description,
    language: entry.language,
    type: entry.kind,
    priority: entry.priority,
    changeFrequency: entry.changeFrequency,
    lastModified: entry.lastModified ?? educationalReviewDate,
    alternateLanguages: alternateLanguages(entry),
  }));
  const totals = seoEntries.reduce(
    (acc, entry) => {
      acc.byLanguage[entry.language] = (acc.byLanguage[entry.language] ?? 0) + 1;
      acc.byType[entry.kind] = (acc.byType[entry.kind] ?? 0) + 1;
      return acc;
    },
    {
      entries: seoEntries.length,
      byLanguage: {} as Record<string, number>,
      byType: {} as Record<string, number>,
    },
  );

  return NextResponse.json(
    {
      name: "Aulafy",
      url: SITE_URL,
      description:
        "Free practical open-source AI courses in Spanish and English: Claude Code, local AI, RAG, agents, MLOps, security, automation, generative AI and small-business AI workflows.",
      license: "Content: CC BY 4.0. Code: MIT.",
      author: "Ramón Guillamón",
      updatedAt: educationalReviewDate,
      discovery: {
        sitemap: `${SITE_URL}/sitemap.xml`,
        sitemapIndex: `${SITE_URL}/sitemap-index.xml`,
        llms: `${SITE_URL}/llms.txt`,
        llmsFull: `${SITE_URL}/llms-full.txt`,
        ai: `${SITE_URL}/ai.txt`,
      },
      totals,
      entries,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    },
  );
}
