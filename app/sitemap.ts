import type { MetadataRoute } from "next";
import { cursos, lecciones } from "@/lib/cursos";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

const estaticas = ["", "/cursos", "/acerca", "/aviso-legal", "/licencia", "/privacidad", "/cookies"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const rutasCursos = cursos.flatMap((c) => [
    `/cursos/${c.slug}`,
    ...lecciones(c).map((l) => `/cursos/${c.slug}/${l.slug}`),
  ]);

  return [...estaticas, ...rutasCursos].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority:
      route === ""
        ? 1
        : route === "/cursos" || cursos.some((c) => route === `/cursos/${c.slug}`)
          ? 0.9
          : ["/aviso-legal", "/privacidad", "/cookies", "/licencia"].includes(route)
            ? 0.4
            : route === "/acerca"
              ? 0.7
            : 0.8,
  }));
}
