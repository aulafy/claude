import assert from "node:assert/strict";
import { createRssFeed } from "../lib/rss.ts";

const feed = createRssFeed({
  title: "Aulafy & AI",
  description: "Build < verify",
  siteUrl: "https://www.aulafy.net/",
  feedPath: "/feed.xml",
  language: "es",
  now: new Date("2026-08-16T23:59:59.000Z"),
  items: [
    { title: "Older", description: "First", href: "/blog/older", publishedAt: "2026-08-14" },
    { title: "Newer & safer", description: "Use <fake> data", href: "/blog/newer?x=1&y=2", publishedAt: "2026-08-16", category: "Guide & test" },
    { title: "Future", description: "Not yet", href: "/blog/future", publishedAt: "2026-08-17" },
    { title: "Broken", description: "Never", href: "/blog/broken", publishedAt: "not-a-date" },
  ],
});

assert.match(feed, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
assert.match(feed, /<rss version="2\.0"/);
assert.match(feed, /<atom:link href="https:\/\/www\.aulafy\.net\/feed\.xml" rel="self" type="application\/rss\+xml" \/>/);
assert.equal((feed.match(/<item>/g) ?? []).length, 2, "Future and invalid items must not be published");
assert.ok(feed.indexOf("Newer &amp; safer") < feed.indexOf("Older"), "Items must be newest first");
assert.match(feed, /Use &lt;fake&gt; data/);
assert.match(feed, /newer\?x=1&amp;y=2/);
assert.match(feed, /<lastBuildDate>Sun, 16 Aug 2026 12:00:00 GMT<\/lastBuildDate>/);
assert.doesNotMatch(feed, /Future|Broken/);

console.log("RSS contract passed: RSS 2.0 discovery, absolute URLs, XML escaping, newest-first ordering, valid dates, and no future items.");
