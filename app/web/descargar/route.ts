import fs from "node:fs";
import path from "node:path";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export const dynamic = "force-static";

export async function GET() {
  const markdown = fs.readFileSync(
    path.join(process.cwd(), "public", "recursos", "ia-desde-cero", "curso-ia-desde-cero.md"),
    "utf8",
  );
  const content = String(await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown));
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>IA desde cero — Aulafy</title><style>
  :root{color-scheme:light}*{box-sizing:border-box}body{margin:0;background:#f4f1eb;color:#24211d;font:18px/1.72 Georgia,serif}main{max-width:760px;margin:auto;background:#fff;padding:7vw}.cover{border-bottom:4px solid #24211d;padding-bottom:3rem;margin-bottom:4rem}.cover b{font:800 1rem Arial,sans-serif;letter-spacing:.12em}.cover h1{font:800 clamp(3rem,10vw,6rem)/.95 Arial,sans-serif;margin:.7rem 0 1.2rem}.cover p{font-size:1.2rem;color:#5d554c}.meta{font:700 .8rem Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;color:#6d28d9}h1,h2,h3{font-family:Arial,sans-serif;line-height:1.15;color:#171512}h1{font-size:2.5rem}h2{font-size:2rem;margin-top:4rem;border-top:2px solid #24211d;padding-top:2rem}h3{font-size:1.25rem;margin-top:2.2rem}p{margin:0 0 1.15rem}li{margin:.4rem 0}a{color:#5b21b6;text-underline-offset:3px}blockquote{margin:1.5rem 0;padding:1rem 1.25rem;border-left:5px solid #7c3aed;background:#f4efff}pre{overflow:auto;background:#171512;color:#f5f2ea;padding:1rem;border-radius:8px;font:14px/1.6 monospace}code{font-family:monospace}table{border-collapse:collapse;width:100%;font-size:.9rem}th,td{border:1px solid #cfc8bd;padding:.6rem;text-align:left;vertical-align:top}th{background:#eee9e1}@media(max-width:600px){body{font-size:16px}main{padding:1.25rem}table{display:block;overflow:auto}}@media print{body{background:#fff}main{max-width:none;padding:0}a{color:inherit}h2{break-before:page}pre,blockquote,table{break-inside:avoid}}
  </style></head><body><main><header class="cover"><b>AULAFY · EDICIÓN HTML DESCARGABLE</b><h1>IA desde cero</h1><p>Curso fundamental para aprender inteligencia artificial con criterio, práctica y evidencias.</p><div class="meta">12 lecciones · revisado el 4 de agosto de 2026 · CC BY-SA 4.0</div></header>${content}<footer><hr><p>Fuente: <a href="https://www.aulafy.net/web">aulafy.net/web</a> · Comprueba en línea si existe una versión más reciente.</p></footer></main></body></html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": 'attachment; filename="aulafy-ia-desde-cero.html"',
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
