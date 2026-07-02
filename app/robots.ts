import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";
const HOST = new URL(BASE_URL).host;

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
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: HOST,
  };
}
