import type { MetadataRoute } from "next";
import { absoluteUrl, alternateLanguages, getSeoIndexEntries } from "@/lib/seo-index";

export default function sitemap(): MetadataRoute.Sitemap {
  return getSeoIndexEntries().map((entry) => {
    const languages = alternateLanguages(entry);

    return {
      url: absoluteUrl(entry.route),
      ...(entry.lastModified ? { lastModified: new Date(entry.lastModified) } : {}),
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      ...(languages ? { alternates: { languages } } : {}),
    };
  });
}
