import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo-index";

const HOST = new URL(SITE_URL).host;

// Rastreadores de IA / motores generativos con acceso explícito.
// El userAgent "*" ya permite el acceso general; esta lista ayuda a que los
// agentes conocidos interpreten la intención editorial de indexación y citación.
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Googlebot",
  "Bingbot",
  "DuckDuckBot",
  "Applebot",
  "Applebot-Extended",
  "CCBot",
  "Amazonbot",
  "Bytespider",
  "cohere-ai",
  "Meta-ExternalAgent",
  "GrokBot",
  "xAI-Bot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Acceso explícito para asistentes de IA (descubrimiento y citación)
      ...AI_BOTS.map((bot) => ({ userAgent: bot, allow: "/" })),
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemap-index.xml`,
      `${SITE_URL}/sitemaps/core.xml`,
      `${SITE_URL}/sitemaps/courses.xml`,
      `${SITE_URL}/sitemaps/english.xml`,
      `${SITE_URL}/sitemaps/blog.xml`,
      `${SITE_URL}/sitemaps/landings.xml`,
      `${SITE_URL}/sitemaps/ai.xml`,
    ],
    host: HOST,
  };
}
