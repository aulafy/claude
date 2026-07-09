import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { cursos, lecciones } from "@/lib/cursos";
import { seoLandings } from "@/lib/seo-landings";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

type SitemapEntry = {
  route: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

function alternatesFor(route: string) {
  if (route === "") {
    return { languages: { "es-ES": BASE_URL, "en-US": `${BASE_URL}/en` } };
  }
  if (route === "/en") {
    return { languages: { "es-ES": BASE_URL, "en-US": `${BASE_URL}/en` } };
  }
  if (route === "/cursos" || route === "/en/courses") {
    return { languages: { "es-ES": `${BASE_URL}/cursos`, "en-US": `${BASE_URL}/en/courses` } };
  }
  if (route.startsWith("/cursos/")) {
    const parts = route.split("/").filter(Boolean);
    if (parts.length === 2) {
      return {
        languages: {
          "es-ES": `${BASE_URL}${route}`,
          "en-US": `${BASE_URL}/en/courses/${parts[1]}`,
        },
      };
    }
    if (parts.length === 3) {
      return {
        languages: {
          "es-ES": `${BASE_URL}${route}`,
          "en-US": `${BASE_URL}/en/courses/${parts[1]}/${parts[2]}`,
        },
      };
    }
  }
  if (route.startsWith("/en/courses/")) {
    const [, , slug, lessonSlug] = route.split("/").filter(Boolean);
    return {
      languages: {
        "es-ES": `${BASE_URL}/cursos/${slug}${lessonSlug ? `/${lessonSlug}` : ""}`,
        "en-US": `${BASE_URL}${route}`,
      },
    };
  }
  return undefined;
}

const principales: SitemapEntry[] = [
  { route: "", changeFrequency: "weekly", priority: 1 },
  { route: "/en", changeFrequency: "weekly", priority: 0.98 },
  { route: "/cursos", changeFrequency: "weekly", priority: 0.95 },
  { route: "/en/courses", changeFrequency: "weekly", priority: 0.93 },
  { route: "/blog", changeFrequency: "weekly", priority: 0.92 },
  { route: "/que-es-aulafy", changeFrequency: "monthly", priority: 0.82 },
  { route: "/acerca", changeFrequency: "monthly", priority: 0.7 },
  { route: "/fuentes", changeFrequency: "monthly", priority: 0.68 },
  { route: "/sobre-ramon-guillamon", changeFrequency: "monthly", priority: 0.72 },
];

const legales: SitemapEntry[] = [
  "/aviso-legal",
  "/licencia",
  "/privacidad",
  "/cookies",
].map((route) => ({ route, changeFrequency: "yearly", priority: 0.42 }));

const descargables: SitemapEntry[] = [
  "/llms.txt",
  "/llms-full.txt",
  "/aulafy-guia-completa.pdf",
  "/guia-claude-code.pdf",
  "/guia-claude-code-vol2.pdf",
].map((route) => ({ route, changeFrequency: "monthly", priority: 0.72 }));

const landingsSeo: SitemapEntry[] = seoLandings.map((landing) => ({
  route: `/${landing.slug}`,
  changeFrequency: "weekly",
  priority: 0.88,
}));

const blog: SitemapEntry[] = blogPosts.map((post) => ({
  route: `/blog/${post.slug}`,
  changeFrequency: "weekly",
  priority: 0.86,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const rutasCursos: SitemapEntry[] = cursos.flatMap((c) => [
    { route: `/cursos/${c.slug}`, changeFrequency: "weekly", priority: 0.9 },
    { route: `/en/courses/${c.slug}`, changeFrequency: "weekly", priority: 0.86 },
    ...lecciones(c).map((l) => ({
      route: `/cursos/${c.slug}/${l.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.78,
    })),
    ...lecciones(c).map((l) => ({
      route: `/en/courses/${c.slug}/${l.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
  ]);

  const rutas = [
    ...principales,
    ...legales,
    ...descargables,
    ...landingsSeo,
    ...blog,
    ...rutasCursos,
  ];
  const unicas = Array.from(new Map(rutas.map((entry) => [entry.route, entry])).values());

  return unicas.map(({ route, changeFrequency, priority }) => {
    const alternates = alternatesFor(route);
    return {
      url: `${BASE_URL}${route}`,
      lastModified: now,
      changeFrequency,
      priority,
      ...(alternates ? { alternates } : {}),
    };
  });
}
