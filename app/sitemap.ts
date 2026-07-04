import type { MetadataRoute } from "next";
import { cursos, lecciones } from "@/lib/cursos";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

type SitemapEntry = {
  route: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const principales: SitemapEntry[] = [
  { route: "", changeFrequency: "weekly", priority: 1 },
  { route: "/cursos", changeFrequency: "weekly", priority: 0.95 },
  { route: "/acerca", changeFrequency: "monthly", priority: 0.7 },
];

const guiaClaude: SitemapEntry[] = [
  "/instalacion",
  "/primeros-pasos",
  "/donde-usar",
  "/recetas",
  "/proyectos",
  "/prompts",
  "/glosario",
  "/skills",
  "/subagentes",
  "/plugins",
  "/flujos",
  "/comandos",
  "/configuracion",
  "/mcp",
  "/hooks",
  "/permisos",
  "/avanzado",
  "/faq",
  "/problemas",
  "/recursos",
  "/comparativa",
  "/pymes",
  "/equipos",
].map((route) => ({ route, changeFrequency: "monthly", priority: 0.76 }));

const volumen2: SitemapEntry[] = [
  "/volumen-2",
  "/volumen-2/avatar",
  "/volumen-2/chatbot-legal",
  "/volumen-2/cluster",
  "/volumen-2/depurar",
  "/volumen-2/estudio",
  "/volumen-2/facturacion",
  "/volumen-2/ia-local",
  "/volumen-2/landing",
  "/volumen-2/pdf",
  "/volumen-2/prompts",
  "/volumen-2/proyectos",
  "/volumen-2/publicar",
  "/volumen-2/simulaciones-3d",
  "/volumen-2/terminal",
  "/volumen-2/texto-a-audio",
  "/volumen-2/voz",
  "/volumen-2/wordpress",
].map((route) => ({ route, changeFrequency: "monthly", priority: route === "/volumen-2" ? 0.86 : 0.74 }));

const legales: SitemapEntry[] = [
  "/aviso-legal",
  "/licencia",
  "/privacidad",
  "/cookies",
].map((route) => ({ route, changeFrequency: "yearly", priority: 0.42 }));

const descargables: SitemapEntry[] = [
  "/guia-claude-code.pdf",
  "/guia-claude-code-vol2.pdf",
].map((route) => ({ route, changeFrequency: "monthly", priority: 0.72 }));

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const rutasCursos: SitemapEntry[] = cursos.flatMap((c) => [
    { route: `/cursos/${c.slug}`, changeFrequency: "weekly", priority: 0.9 },
    ...lecciones(c).map((l) => ({
      route: `/cursos/${c.slug}/${l.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.78,
    })),
  ]);

  const rutas = [
    ...principales,
    ...guiaClaude,
    ...volumen2,
    ...legales,
    ...descargables,
    ...rutasCursos,
  ];
  const unicas = Array.from(new Map(rutas.map((entry) => [entry.route, entry])).values());

  return unicas.map(({ route, changeFrequency, priority }) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
