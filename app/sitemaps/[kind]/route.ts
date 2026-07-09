import { NextResponse } from "next/server";
import { absoluteUrl, alternateLanguages, getSeoEntriesByKind, type SeoIndexKind } from "@/lib/seo-index";

const VALID_KINDS = new Set<SeoIndexKind>(["core", "courses", "english", "blog", "landings", "documents"]);

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function sitemapXml(kind: SeoIndexKind) {
  const urls = getSeoEntriesByKind(kind)
    .map((entry) => {
      const alternates = alternateLanguages(entry);
      const alternateTags = alternates
        ? Object.entries(alternates)
            .map(
              ([hreflang, href]) =>
                `<xhtml:link rel="alternate" hreflang="${escapeXml(hreflang)}" href="${escapeXml(href)}" />`,
            )
            .join("")
        : "";

      return [
        "<url>",
        `<loc>${escapeXml(absoluteUrl(entry.route))}</loc>`,
        entry.lastModified ? `<lastmod>${escapeXml(new Date(entry.lastModified).toISOString())}</lastmod>` : "",
        `<changefreq>${entry.changeFrequency}</changefreq>`,
        `<priority>${entry.priority.toFixed(2)}</priority>`,
        alternateTags,
        "</url>",
      ].join("");
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ kind: string }> },
) {
  const { kind } = await params;
  const cleanKind = kind.replace(/\.xml$/, "") as SeoIndexKind;
  if (!VALID_KINDS.has(cleanKind)) return new NextResponse("Not found", { status: 404 });

  return new NextResponse(sitemapXml(cleanKind), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
