import { NextResponse } from "next/server";
import { SITE_URL, type SeoIndexKind } from "@/lib/seo-index";

const SITEMAPS: Array<{ kind: SeoIndexKind; route: string }> = [
  { kind: "core", route: "/sitemaps/core.xml" },
  { kind: "courses", route: "/sitemaps/courses.xml" },
  { kind: "english", route: "/sitemaps/english.xml" },
  { kind: "blog", route: "/sitemaps/blog.xml" },
  { kind: "landings", route: "/sitemaps/landings.xml" },
  { kind: "documents", route: "/sitemaps/documents.xml" },
];

function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function GET() {
  const body = SITEMAPS.map(
    (item) =>
      `<sitemap><loc>${escapeXml(`${SITE_URL}${item.route}`)}</loc></sitemap>`,
  ).join("");

  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    },
  );
}
