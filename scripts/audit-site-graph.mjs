import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BUILD_ROOT = path.join(ROOT, ".next/server/app");
const REPORT_PATH = path.join(ROOT, "docs/audits/site-graph-latest.md");
const ENTRY_ROUTES = ["/", "/empezar", "/cursos", "/blog", "/mi-ruta", "/en"];

function walk(dir, predicate) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full, predicate) : predicate(full) ? [full] : [];
  });
}

function decodeHtml(value = "") {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function plainText(value = "") {
  return decodeHtml(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function routeFromHtml(file) {
  const relative = path.relative(BUILD_ROOT, file).replaceAll(path.sep, "/").replace(/\.html$/, "");
  if (relative === "index") return "/";
  return `/${relative.replace(/\/index$/, "")}`;
}

function normalizeRoute(href, sourceRoute = "/") {
  if (!href || href.startsWith("#") || /^(mailto:|tel:|javascript:)/i.test(href)) return null;
  try {
    const url = new URL(href, `https://www.aulafy.net${sourceRoute}`);
    if (!/^(www\.)?aulafy\.net$/i.test(url.hostname)) return null;
    const decoded = decodeURIComponent(url.pathname).replace(/\/{2,}/g, "/");
    return decoded === "/" ? "/" : decoded.replace(/\/$/, "");
  } catch {
    return null;
  }
}

function getAttribute(tag, name) {
  if (!tag) return "";
  const match = tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return decodeHtml(match?.[1] ?? match?.[2] ?? match?.[3] ?? "");
}

function extractPage(file) {
  const html = fs.readFileSync(file, "utf8");
  const route = routeFromHtml(file);
  const declaredLanguage = getAttribute(html.match(/<html\b[^>]*>/i)?.[0], "lang") || "unknown";
  const language = route === "/en" || route.startsWith("/en/") ? "en" : declaredLanguage;
  const title = plainText(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => plainText(match[1])).filter(Boolean);
  const canonicalTag = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]).find((tag) => /\brel\s*=\s*["']canonical["']/i.test(tag));
  const canonical = normalizeRoute(getAttribute(canonicalTag, "href"), route);
  const robotsTag = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]).find((tag) => /\bname\s*=\s*["']robots["']/i.test(tag));
  const noindex = /(?:^|,)\s*noindex\b/i.test(getAttribute(robotsTag, "content"));
  const links = [...html.matchAll(/<a\b[^>]*>/gi)]
    .map((match) => normalizeRoute(getAttribute(match[0], "href"), route))
    .filter(Boolean);
  return { route, language, title, h1s, canonical, noindex, links: [...new Set(links)] };
}

function routePatterns() {
  return walk(path.join(ROOT, "app"), (file) => /(?:page|route)\.(?:tsx?|jsx?)$/.test(file))
    .map((file) => path.relative(path.join(ROOT, "app"), path.dirname(file)).replaceAll(path.sep, "/"))
    .map((route) => route.split("/").filter((part) => !/^\(.+\)$/.test(part)).join("/"))
    .map((route) => `/${route}`.replace(/\/+/g, "/"))
    .map((route) => route === "/." ? "/" : route)
    .map((route) => new RegExp(`^${route
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .replace(/\\\[\\\.\\\.\\\.[^\]]+\\\]/g, ".+")
      .replace(/\\\[[^\]]+\\\]/g, "[^/]+")}$`));
}

function isAsset(route) {
  return /\.(?:avif|css|csv|gif|ico|jpe?g|js|json|map|md|mp3|mp4|pdf|png|svg|tex|txt|webmanifest|webp|xml)$/i.test(route);
}

function formatList(items, empty = "Ninguno") {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : `- ${empty}`;
}

if (!fs.existsSync(BUILD_ROOT)) {
  console.error("Missing .next/server/app. Run `npm run build` before this audit.");
  process.exit(1);
}

const pages = walk(BUILD_ROOT, (file) => file.endsWith(".html"))
  .map(extractPage)
  .filter((page) => !page.route.startsWith("/_not-found") && page.route !== "/_global-error");
const byRoute = new Map(pages.map((page) => [page.route, page]));
const patterns = routePatterns();
const exists = (route) => byRoute.has(route)
  || patterns.some((pattern) => pattern.test(route))
  || fs.existsSync(path.join(ROOT, "public", route.replace(/^\//, "")));
const indexablePages = pages.filter((page) => !page.noindex);
const canonicalPages = indexablePages.filter((page) => !page.canonical || page.canonical === page.route);

const missingTitles = indexablePages.filter((page) => !page.title).map((page) => page.route);
const missingH1 = indexablePages.filter((page) => page.h1s.length === 0).map((page) => page.route);
const multipleH1 = indexablePages.filter((page) => page.h1s.length > 1).map((page) => `${page.route} (${page.h1s.length})`);
const missingCanonical = indexablePages.filter((page) => !page.canonical).map((page) => page.route);
const mismatchedCanonical = indexablePages.filter((page) => page.canonical && page.canonical !== page.route).map((page) => `${page.route} -> ${page.canonical}`);

const broken = [];
for (const page of pages) {
  for (const target of page.links) {
    if (!isAsset(target) && !exists(target)) broken.push(`${page.route} -> ${target}`);
  }
}

const incoming = new Map(canonicalPages.map((page) => [page.route, 0]));
for (const page of pages) {
  for (const target of page.links) {
    if (incoming.has(target) && target !== page.route) incoming.set(target, incoming.get(target) + 1);
  }
}
const orphans = [...incoming].filter(([route, count]) => count === 0 && route !== "/").map(([route]) => route);

const duplicateGroups = (field) => {
  const groups = new Map();
  for (const page of pages) {
    const value = field(page);
    if (!value) continue;
    const key = `${page.language}\0${value}`;
    groups.set(key, [...(groups.get(key) ?? []), page.route]);
  }
  return [...groups].filter(([, routes]) => routes.length > 1).map(([key, routes]) => {
    const [language, value] = key.split("\0");
    return `“${value}” [${language}] -> ${routes.join(", ")}`;
  });
};
const duplicateTitles = duplicateGroups((page) => canonicalPages.includes(page) ? page.title : "");
const duplicateH1s = duplicateGroups((page) => canonicalPages.includes(page) ? page.h1s[0] : "");

const distance = new Map();
const queue = ENTRY_ROUTES.filter((route) => byRoute.has(route));
queue.forEach((route) => distance.set(route, 0));
while (queue.length) {
  const route = queue.shift();
  const depth = distance.get(route);
  for (const target of byRoute.get(route)?.links ?? []) {
    if (byRoute.has(target) && !distance.has(target)) {
      distance.set(target, depth + 1);
      queue.push(target);
    }
  }
}
const deepPages = canonicalPages
  .filter((page) => (distance.get(page.route) ?? Infinity) > 4)
  .map((page) => `${page.route} (${distance.has(page.route) ? distance.get(page.route) : "sin ruta"})`);

const blocking = missingTitles.length + missingH1.length + missingCanonical.length + broken.length;
const generatedAt = new Date().toISOString();
const report = `# Auditoría del grafo interno de Aulafy

Generada: ${generatedAt}

## Resumen

| Comprobación | Resultado |
|---|---:|
| HTML estáticos auditados | ${pages.length} |
| Enlaces internos únicos | ${new Set(pages.flatMap((page) => page.links)).size} |
| Enlaces rotos | ${broken.length} |
| Sin title | ${missingTitles.length} |
| Sin H1 | ${missingH1.length} |
| Con varios H1 | ${multipleH1.length} |
| Sin canonical | ${missingCanonical.length} |
| Canonical distinto de la ruta | ${mismatchedCanonical.length} |
| Sin enlaces entrantes | ${orphans.length} |
| A más de 4 clics o sin ruta | ${deepPages.length} |
| Títulos duplicados | ${duplicateTitles.length} |
| H1 duplicados | ${duplicateH1s.length} |

Los errores bloqueantes son enlaces internos rotos y páginas sin title, H1 o canonical. Las demás listas requieren revisión editorial: pueden incluir excepciones intencionales.

## Enlaces rotos

${formatList(broken)}

## Metadatos ausentes

### Sin title
${formatList(missingTitles)}

### Sin H1
${formatList(missingH1)}

### Con varios H1
${formatList(multipleH1)}

### Sin canonical
${formatList(missingCanonical)}

### Canonical distinto de la ruta
${formatList(mismatchedCanonical)}

## Descubrimiento interno

### Sin enlaces entrantes
${formatList(orphans)}

### A más de cuatro clics o sin ruta desde las entradas
${formatList(deepPages)}

## Duplicados

### Title duplicado
${formatList(duplicateTitles)}

### H1 duplicado
${formatList(duplicateH1s)}
`;

fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
fs.writeFileSync(REPORT_PATH, report);

console.log(`Audited ${pages.length} rendered pages. Report: ${path.relative(ROOT, REPORT_PATH)}`);
console.log(`Blocking: ${blocking} | broken=${broken.length} title=${missingTitles.length} h1=${missingH1.length} canonical=${missingCanonical.length}`);
console.log(`Editorial: orphans=${orphans.length} deep=${deepPages.length} duplicateTitles=${duplicateTitles.length} duplicateH1=${duplicateH1s.length}`);
if (blocking > 0) process.exitCode = 1;
