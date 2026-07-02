import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aprende-claude-code.vercel.app";

const routes = [
  "",
  "/instalacion",
  "/primeros-pasos",
  "/donde-usar",
  "/recetas",
  "/proyectos",
  "/prompts",
  "/glosario",
  "/faq",
  "/problemas",
  "/recursos",
  "/comparativa",
  "/pymes",
  "/equipos",
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
  "/volumen-2",
  "/volumen-2/terminal",
  "/volumen-2/proyectos",
  "/volumen-2/prompts",
  "/volumen-2/ia-local",
  "/volumen-2/depurar",
  "/volumen-2/chatbot-legal",
  "/volumen-2/pdf",
  "/volumen-2/voz",
  "/volumen-2/texto-a-audio",
  "/volumen-2/simulaciones-3d",
  "/volumen-2/avatar",
  "/volumen-2/wordpress",
  "/volumen-2/landing",
  "/volumen-2/facturacion",
  "/volumen-2/estudio",
  "/volumen-2/publicar",
  "/volumen-2/cluster",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
