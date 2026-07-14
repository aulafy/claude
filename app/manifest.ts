import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aulafy",
    short_name: "Aulafy",
    description: "Educación abierta y gratuita para aprender inteligencia artificial construyendo proyectos reales.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0b0914",
    theme_color: "#8b5cf6",
    lang: "es",
    dir: "ltr",
    categories: ["education", "productivity"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
