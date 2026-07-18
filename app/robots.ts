import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo-index";

const HOST = new URL(SITE_URL).host;
const PRIVATE_PATHS = ["/api/", "/auth/", "/course/"];

// Los agentes de búsqueda se nombran de forma explícita para que la política
// editorial sea auditable, aunque la regla general ya permita el contenido.
const SEARCH_AGENTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      ...SEARCH_AGENTS.map((userAgent) => ({ userAgent, allow: "/", disallow: PRIVATE_PATHS })),
    ],
    // Search Console solo necesita el índice canónico; este ya referencia
    // los sitemaps segmentados de cursos, landings, blog y documentos.
    sitemap: `${SITE_URL}/sitemap-index.xml`,
    host: HOST,
  };
}
