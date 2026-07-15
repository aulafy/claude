import assert from "node:assert/strict";
import fs from "node:fs";

const layout = fs.readFileSync("app/layout.tsx", "utf8");
const seoIndex = fs.readFileSync("lib/seo-index.ts", "utf8");
const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");
const robots = fs.readFileSync("app/robots.ts", "utf8");
const sitemapIndex = fs.readFileSync("app/sitemap-index.xml/route.ts", "utf8");
const seoLandings = fs.readFileSync("lib/seo-landings.ts", "utf8");
const seoStrategy = fs.readFileSync("lib/seo-strategy.ts", "utf8");
const home = fs.readFileSync("components/AulafyNexusLanding.tsx", "utf8");
const coursesPage = fs.readFileSync("app/cursos/page.tsx", "utf8");
const pathsPage = fs.readFileSync("components/LearningPathsPage.tsx", "utf8");
const footer = fs.readFileSync("components/Footer.tsx", "utf8");

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

assert.match(robots, /userAgent:\s*"\*"/, "robots.txt must define a rule for every crawler");
assert.match(robots, /sitemap:\s*`\$\{SITE_URL\}\/sitemap-index\.xml`/, "robots.txt must declare the canonical sitemap index");
assert.doesNotMatch(robots, /sitemap\.xml`/, "robots.txt must not also declare the legacy full sitemap");
for (const blockedPath of ["/api/", "/auth/", "/course/"]) {
  assert.ok(robots.includes(blockedPath), `robots.txt must avoid crawling ${blockedPath}`);
}
for (const kind of ["core", "courses", "english", "blog", "landings", "documents"]) {
  assert.ok(sitemapIndex.includes(`/sitemaps/${kind}.xml`), `Sitemap index must list ${kind}.xml`);
}

const canonicalMatches = [...seoStrategy.matchAll(/canonical:\s*"([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(canonicalMatches).size, canonicalMatches.length, "Every Spanish search intent must own a unique canonical URL");
for (const route of [
  "/cursos",
  "/rutas",
  "/curso-codex-espanol",
  "/crear-pagina-web-con-ia",
  "/ia-para-pymes",
  "/curso-agentes-ia-espanol",
]) {
  assert.ok(seoStrategy.includes(`canonical: "${route}"`), `SEO strategy must map ${route}`);
}
for (const slug of ["curso-codex-espanol", "crear-pagina-web-con-ia"]) {
  assert.ok(seoLandings.includes(`slug: "${slug}"`), `Missing search landing ${slug}`);
}
for (const source of [home, coursesPage, pathsPage, footer]) {
  assert.ok(source.includes("seo-strategy") || source.includes("/curso-codex-espanol"), "Key navigation surfaces must link to the Spanish SEO map");
}

console.log("Verified canonicals, hreflang, robots.txt, segmented sitemaps, Spanish search intents, internal links, social cards, and JSON-LD.");
