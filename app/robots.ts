import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aulafy.net";
const HOST = new URL(BASE_URL).host;

// Rastreadores de IA / motores generativos con acceso explícito
// (ChatGPT/OpenAI, Claude/Anthropic, Perplexity, Google Gemini, Apple, etc.)
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
  "Applebot-Extended",
  "CCBot",
  "Amazonbot",
  "Bytespider",
  "cohere-ai",
  "Meta-ExternalAgent",
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
