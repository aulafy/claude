import type { NextConfig } from "next";

// Lecciones del curso "Claude Code" que antes vivían en la raíz.
const leccionesClaudeCode = [
  "instalacion",
  "primeros-pasos",
  "donde-usar",
  "recetas",
  "proyectos",
  "prompts",
  "glosario",
  "pymes",
  "equipos",
  "skills",
  "subagentes",
  "plugins",
  "flujos",
  "comandos",
  "configuracion",
  "mcp",
  "hooks",
  "permisos",
  "avanzado",
  "faq",
  "problemas",
  "recursos",
  "comparativa",
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // La guía y el Volumen II ahora son cursos.
      { source: "/guia", destination: "/cursos/claude-code", permanent: true },
      { source: "/course/:path*", destination: "/", permanent: true },
      { source: "/volumen-2", destination: "/cursos/ia-local", permanent: true },
      { source: "/volumen-2/:leccion", destination: "/cursos/ia-local/:leccion", permanent: true },
      ...leccionesClaudeCode.map((slug) => ({
        source: `/${slug}`,
        destination: `/cursos/claude-code/${slug}`,
        permanent: true,
      })),
    ];
  },
  async headers() {
    const contentSecurityPolicy = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "connect-src 'self'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
          },
        ],
      },
      {
        source: "/en/:path*",
        headers: [{ key: "Content-Language", value: "en" }],
      },
      {
        source: "/en",
        headers: [{ key: "Content-Language", value: "en" }],
      },
      {
        source: "/:path*.png",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        source: "/:path*.pdf",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        source: "/:path*.woff2",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/llms.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
          { key: "X-Robots-Tag", value: "noindex, noarchive, nosnippet" },
        ],
      },
      {
        source: "/llms-full.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
          { key: "X-Robots-Tag", value: "noindex, noarchive, nosnippet" },
        ],
      },
      {
        source: "/ai.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
          { key: "X-Robots-Tag", value: "noindex, noarchive, nosnippet" },
        ],
      },
      {
        source: "/search-index.json",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
          { key: "X-Robots-Tag", value: "noindex, noarchive, nosnippet" },
        ],
      },
      {
        source: "/sitemap-index.xml",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }],
      },
      {
        source: "/sitemaps/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }],
      },
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
      {
        source: "/manifest.webmanifest",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
