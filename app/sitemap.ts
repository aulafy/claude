import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aprende-claude-code.vercel.app";

const routes = [
  "",
  "/instalacion",
  "/primeros-pasos",
  "/recetas",
  "/proyectos",
  "/prompts",
  "/glosario",
  "/faq",
  "/problemas",
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
