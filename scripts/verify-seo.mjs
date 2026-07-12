import assert from "node:assert/strict";
import fs from "node:fs";

const layout = fs.readFileSync("app/layout.tsx", "utf8");
const seoIndex = fs.readFileSync("lib/seo-index.ts", "utf8");
const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");
const robots = fs.readFileSync("app/robots.ts", "utf8");

assert.match(layout, /https:\/\/www\.aulafy\.net/, "Default metadataBase must use https://www.aulafy.net");
assert.match(layout, /canonical:\s*"\/"/, "Homepage canonical must be /");
assert.match(layout, /"es-ES":\s*"\/"/, "Homepage must expose es-ES hreflang");
assert.match(layout, /"en-US":\s*"\/en"/, "Homepage must expose en-US hreflang");
assert.match(layout, /"x-default":\s*"\/"/, "Homepage must expose x-default hreflang");
assert.match(layout, /openGraph:\s*{[\s\S]*url:\s*"\/"/, "Homepage Open Graph URL must be canonical");
assert.match(layout, /twitter:\s*{[\s\S]*summary_large_image/, "Twitter card metadata is missing");
assert.match(layout, /"@type":\s*"WebSite"/, "WebSite JSON-LD is missing");
assert.match(layout, /"@type":\s*"EducationalOrganization"/, "EducationalOrganization JSON-LD is missing");

assert.match(seoIndex, /export const SITE_URL = .*https:\/\/www\.aulafy\.net/, "SEO index must default to canonical www host");
assert.match(seoIndex, /route:\s*""[\s\S]*alternateRoute:\s*"\/en"/, "Root SEO entry must alternate to /en");
assert.match(seoIndex, /route:\s*"\/en"[\s\S]*alternateRoute:\s*""/, "English root entry must alternate to /");
assert.match(seoIndex, /"es-ES":\s*absoluteUrl\(esRoute\)/, "alternateLanguages must emit es-ES");
assert.match(seoIndex, /"en-US":\s*absoluteUrl\(enRoute\)/, "alternateLanguages must emit en-US");
assert.match(seoIndex, /"x-default":\s*absoluteUrl\(esRoute\)/, "alternateLanguages must emit x-default");
assert.doesNotMatch(seoIndex, /\/acerca-de/, "Old /acerca-de route must not be indexed");

assert.match(sitemap, /getSeoIndexEntries\(\)/, "Sitemap must be generated from the SEO index");
assert.match(sitemap, /alternates:\s*{\s*languages\s*}/, "Sitemap entries must include hreflang alternates");

for (const bot of ["OAI-SearchBot", "ChatGPT-User", "Googlebot", "Bingbot"]) {
  assert.ok(robots.includes(bot), `robots.txt must explicitly allow ${bot}`);
}
for (const file of ["/sitemap.xml", "/sitemap-index.xml", "/sitemaps/core.xml", "/sitemaps/courses.xml", "/sitemaps/english.xml"]) {
  assert.ok(robots.includes(file), `robots.txt must list ${file}`);
}

console.log("Verified canonical homepage, hreflang source, robots.txt, sitemap source, Open Graph, Twitter cards, and JSON-LD.");
