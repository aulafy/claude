import { NextResponse } from "next/server";
import { absoluteUrl, alternateLanguages, getSeoIndexEntries, SITE_URL } from "@/lib/seo-index";
import { educationalReviewDate } from "@/lib/course-guidance";

export function GET() {
  const entries = getSeoIndexEntries().map((entry) => ({
    url: absoluteUrl(entry.route),
    route: entry.route || "/",
    title: entry.title,
    description: entry.description,
    language: entry.language,
    type: entry.kind,
    priority: entry.priority,
    alternateLanguages: alternateLanguages(entry),
  }));

  return NextResponse.json(
    {
      name: "Aulafy",
      url: SITE_URL,
      description:
        "Free practical open-source AI courses in Spanish and English: Claude Code, local AI, RAG, agents, MLOps, security, automation, generative AI and small-business AI workflows.",
      license: "Content: CC BY 4.0. Code: MIT.",
      author: "Ramón Guillamón",
      updatedAt: educationalReviewDate,
      entries,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    },
  );
}
