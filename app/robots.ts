import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo-index";

const HOST = new URL(SITE_URL).host;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/auth/", "/course/"] }],
    // Search Console solo necesita el índice canónico; este ya referencia
    // los sitemaps segmentados de cursos, landings, blog y documentos.
    sitemap: `${SITE_URL}/sitemap-index.xml`,
    host: HOST,
  };
}
