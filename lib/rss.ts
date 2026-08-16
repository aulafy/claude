export type RssItem = {
  title: string;
  description: string;
  href: string;
  publishedAt: string;
  category?: string;
};

type RssOptions = {
  title: string;
  description: string;
  siteUrl: string;
  feedPath: string;
  language: "es" | "en";
  items: RssItem[];
  now?: Date;
};

export function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function absoluteUrl(siteUrl: string, href: string) {
  return new URL(href, `${siteUrl.replace(/\/$/, "")}/`).toString();
}

function validDate(value: string) {
  const date = new Date(`${value}T12:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function createRssFeed({ title, description, siteUrl, feedPath, language, items, now = new Date() }: RssOptions) {
  const normalizedSite = siteUrl.replace(/\/$/, "");
  const published = items
    .map((item) => ({ item, date: validDate(item.publishedAt) }))
    .filter((entry): entry is { item: RssItem; date: Date } => Boolean(entry.date && entry.date <= now))
    .sort((left, right) => right.date.getTime() - left.date.getTime());
  const lastBuildDate = published[0]?.date ?? now;
  const itemXml = published.map(({ item, date }) => {
    const url = absoluteUrl(normalizedSite, item.href);
    return [
      "    <item>",
      `      <title>${escapeXml(item.title)}</title>`,
      `      <description>${escapeXml(item.description)}</description>`,
      `      <link>${escapeXml(url)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
      `      <pubDate>${date.toUTCString()}</pubDate>`,
      ...(item.category ? [`      <category>${escapeXml(item.category)}</category>`] : []),
      "    </item>",
    ].join("\n");
  }).join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(title)}</title>`,
    `    <description>${escapeXml(description)}</description>`,
    `    <link>${escapeXml(`${normalizedSite}${language === "en" ? "/en" : ""}`)}</link>`,
    `    <atom:link href="${escapeXml(absoluteUrl(normalizedSite, feedPath))}" rel="self" type="application/rss+xml" />`,
    `    <language>${language}</language>`,
    `    <lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>`,
    "    <ttl>1440</ttl>",
    itemXml,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}
