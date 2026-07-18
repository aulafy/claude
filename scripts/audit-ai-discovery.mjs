import { appendFile } from "node:fs/promises";

const baseUrl = (process.argv[2] || "https://www.aulafy.net").replace(/\/$/, "");
const results = [];

function record(name, ok, detail, url) {
  results.push({ name, ok, detail, url });
}

async function read(path, name) {
  const url = `${baseUrl}${path}`;
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Aulafy-AIDiscoveryAudit/1.0 (+https://www.aulafy.net/acerca)" },
      redirect: "follow",
      signal: AbortSignal.timeout(15_000),
    });
    const body = await response.text();
    record(name, response.ok, `HTTP ${response.status} · ${body.length.toLocaleString("es-ES")} caracteres`, url);
    return { response, body, url };
  } catch (error) {
    record(name, false, error instanceof Error ? error.message : "Error de red", url);
    return { response: null, body: "", url };
  }
}

const robots = await read("/robots.txt", "robots.txt accesible");
for (const agent of ["OAI-SearchBot", "Claude-SearchBot", "PerplexityBot"]) {
  const normalizedRobots = robots.body.toLowerCase();
  const marker = `user-agent: ${agent.toLowerCase()}`;
  const groupStart = normalizedRobots.indexOf(marker);
  const followingGroup = groupStart >= 0 ? normalizedRobots.indexOf("user-agent:", groupStart + marker.length) : -1;
  const group = groupStart >= 0 ? normalizedRobots.slice(groupStart, followingGroup >= 0 ? followingGroup : undefined) : "";
  record(
    `Acceso declarado para ${agent}`,
    groupStart >= 0 && !/^disallow:\s*\/\s*$/im.test(group),
    groupStart >= 0 ? "Agente declarado y contenido público permitido" : "Falta una política explícita",
    robots.url,
  );
}

const sitemap = await read("/sitemap-index.xml", "Índice de sitemaps accesible");
record(
  "Sitemaps segmentados",
  sitemap.body.includes("/sitemaps/courses.xml") && sitemap.body.includes("/sitemaps/blog.xml"),
  "Cursos y blog deben aparecer en el índice",
  sitemap.url,
);

const llms = await read("/llms.txt", "Resumen para asistentes accesible");
record("llms.txt identifica Aulafy", /aulafy/i.test(llms.body) && llms.body.length > 500, "Resumen legible y no vacío", llms.url);

const aiText = await read("/ai.txt", "Mapa editorial para agentes accesible");
record("ai.txt enlaza fuentes y contenido", /fuentes/i.test(aiText.body) && /cursos/i.test(aiText.body), "Incluye rutas editoriales", aiText.url);

const pages = [
  ["/", "Portada"],
  ["/cursos/ia-desde-cero", "Curso IA desde cero"],
  ["/cursos/ia-desde-cero/alucinaciones-verificar", "Lección verificable"],
  ["/cursos/agentes-produccion/observabilidad-agentes-locales", "Lección técnica"],
];

for (const [path, name] of pages) {
  const page = await read(path, `${name}: respuesta`);
  const hasTitle = /<title[^>]*>[^<]{8,}<\/title>/i.test(page.body);
  const hasHeading = /<h1[^>]*>[\s\S]*?<\/h1>/i.test(page.body);
  const hasCanonical = /rel=["']canonical["']/i.test(page.body);
  const visibleApprox = page.body.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  record(`${name}: contenido interpretable`, hasTitle && hasHeading && hasCanonical && visibleApprox.length > 600, `title=${hasTitle} · h1=${hasHeading} · canonical=${hasCanonical} · texto≈${visibleApprox.length}`, page.url);
}

const failures = results.filter((result) => !result.ok);
const lines = [
  "# Auditoría diaria de descubrimiento por IA",
  "",
  `Destino: ${baseUrl}`,
  `Fecha: ${new Date().toISOString()}`,
  "",
  "| Estado | Comprobación | Detalle |",
  "|---|---|---|",
  ...results.map((result) => `| ${result.ok ? "✅" : "❌"} | [${result.name}](${result.url}) | ${result.detail.replaceAll("|", "\\|")} |`),
  "",
  failures.length === 0 ? "Resultado: todas las comprobaciones han pasado." : `Resultado: ${failures.length} comprobaciones necesitan revisión.`,
  "",
];

const report = lines.join("\n");
console.log(report);

if (process.env.GITHUB_STEP_SUMMARY) {
  await appendFile(process.env.GITHUB_STEP_SUMMARY, report, "utf8");
}

if (failures.length > 0) process.exitCode = 1;
