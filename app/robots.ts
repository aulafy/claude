import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo-index";

const HOST = new URL(SITE_URL).host;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/api/"] },
      { userAgent: "ChatGPT-User", allow: "/", disallow: ["/api/"] },
      { userAgent: "Googlebot", allow: "/", disallow: ["/api/"] },
      { userAgent: "Bingbot", allow: "/", disallow: ["/api/"] },
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemap-index.xml`,
      `${SITE_URL}/sitemaps/core.xml`,
      `${SITE_URL}/sitemaps/courses.xml`,
      `${SITE_URL}/sitemaps/english.xml`,
      `${SITE_URL}/sitemaps/blog.xml`,
      `${SITE_URL}/sitemaps/landings.xml`,
      `${SITE_URL}/sitemaps/documents.xml`,
    ],
    host: HOST,
  };
}
