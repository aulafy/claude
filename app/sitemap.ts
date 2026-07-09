import type { MetadataRoute } from "next";
import { absoluteUrl, alternateLanguages, getSeoIndexEntries } from "@/lib/seo-index";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return getSeoIndexEntries().map((entry) => {
    const languages = alternateLanguages(entry);

    return {
      url: absoluteUrl(entry.route),
      lastModified: entry.lastModified ? new Date(entry.lastModified) : now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      ...(languages ? { alternates: { languages } } : {}),
    };
  });
}
