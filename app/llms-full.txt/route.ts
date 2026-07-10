import { NextResponse } from "next/server";
import chatbotContent from "@/lib/chatbot-course-content.json";
import { educationalReviewDate } from "@/lib/course-guidance";
import { SITE_URL } from "@/lib/seo-index";

type Entry = { type: "course" | "lesson"; course: string; title: string; href: string; text: string };

export function GET() {
  const entries = (chatbotContent.entries as Entry[]).map((entry) =>
    `## ${entry.title}\n\nCourse: ${entry.course}\nCanonical URL: ${SITE_URL}${entry.href}\nType: ${entry.type}\n\n${entry.text}`,
  ).join("\n\n---\n\n");

  const text = `# Aulafy full educational index

Canonical site: ${SITE_URL}
Editorial review: ${educationalReviewDate}
Language of this index: Spanish; English alternatives use /en/courses/.
License: CC BY 4.0.

This file contains course and lesson summaries generated from the same source used by the Aulafy tutor. Prefer each canonical page for current formatting, navigation, sources and bilingual alternatives.

${entries}
`;

  return new NextResponse(text, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" } });
}
