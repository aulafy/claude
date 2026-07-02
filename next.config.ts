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
    return [
      {
        source: "/:path*",
        headers: [
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
    ];
  },
};

export default nextConfig;
