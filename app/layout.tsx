import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import Script from "next/script";
import Shell from "@/components/Shell";
import "./globals.css";
import "./fontawesome.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";
const courseTopics = [
  "IA open source",
  "IA local",
  "OpenAI Codex",
  "Claude Code",
  "Fable 5",
  "Videojuegos 3D con IA",
  "Godot",
  "Blender",
  "Unity",
  "Assets 3D",
  "CAD con IA",
  "AutoCAD",
  "Fusion",
  "BIM",
  "Ollama",
  "Open WebUI",
  "RAG",
  "RAG seguro",
  "Fine-tuning",
  "LoRA",
  "QLoRA",
  "MLOps LLM",
  "vLLM",
  "LiteLLM",
  "Langfuse",
  "Agentes de IA",
  "CLI de agentes",
  "R CLI",
  "Python para agentes",
  "Click",
  "Rich",
  "LangGraph",
  "n8n",
  "MCP",
  "Seguridad LLM",
  "Evaluaciones de modelos",
  "OWASP Top 10 LLM",
  "IA para pymes",
  "Automatización self-hosted",
  "ComfyUI",
  "Whisper",
  "Piper",
  "open-source AI courses",
  "free AI courses",
  "local AI",
  "AI agents",
  "RAG with documents",
  "AI automation",
];
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aulafy — Educación abierta para aprender IA construyendo",
    template: "%s",
  },
  description:
    "Cursos gratuitos de inteligencia artificial en español e inglés, con objetivos, proyectos y fuentes: OpenAI Codex, Claude Code, IA local, RAG, agentes, seguridad, MLOps y automatización.",
  keywords: [
    "cursos de IA gratis",
    "cursos de inteligencia artificial en español",
    "curso IA open source",
    "curso Claude Code español",
    "curso OpenAI Codex español",
    "curso Fable 5",
    "curso videojuegos 3D IA",
    "curso Godot Blender IA",
    "IA para CAD",
    "AutoCAD IA",
    "IA local",
    "Ollama",
    "LM Studio",
    "Open WebUI",
    "RAG avanzado",
    "RAG con PDF",
    "curso agentes IA",
    "crear CLI agentes IA",
    "R CLI Aulafy",
    "CLI IA local Python",
    "LangGraph",
    "n8n IA",
    "MCP",
    "seguridad LLM",
    "OWASP Top 10 LLM",
    "MLOps LLM",
    "vLLM",
    "fine-tuning LLM",
    "LoRA",
    "QLoRA",
    "IA para pymes",
    "automatización IA self-hosted",
    "free AI courses",
    "open-source AI courses",
    "Claude Code course",
    "local AI course",
    "RAG course",
    "AI agents course",
    "self-hosted AI automation",
  ],
  authors: [{ name: "Ramón Guillamón", url: "https://www.linkedin.com/in/rguillamon/" }],
  creator: "Ramón Guillamón",
  publisher: "Aulafy",
  applicationName: "Aulafy",
  appleWebApp: { title: "Aulafy", statusBarStyle: "black-translucent" },
  manifest: "/manifest.webmanifest",
  category: "Education",
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
      "en-US": "/en",
      "x-default": "/",
    },
  },
  verification: {
    // Google Search Console (valor fijo; también admite override por env).
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
      "1TiEliSQkuIN6u8NkWQBTG7u6l-0bkWxVEpa3a8GnY0",
    // Bing: se rellena con variable de entorno cuando lo tengas.
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : {},
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Aulafy — Educación abierta para aprender IA construyendo",
    description:
      "Cursos, rutas y proyectos gratuitos para aprender IA local, Codex, Claude Code, RAG, agentes, MLOps, seguridad y automatización.",
    type: "website",
    locale: "es_ES",
    siteName: "Aulafy",
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Aulafy, educación abierta para aprender inteligencia artificial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aulafy — Aprende IA construyendo sistemas reales",
    description: "Cursos prácticos en español para aprender IA local, Claude Code, Fable 5, videojuegos 3D, RAG, MLOps, seguridad y automatización.",
    creator: "@learntouseai",
    site: "@learntouseai",
    images: ["/opengraph-image"],
  },
  other: {
    "ai-summary":
      "Aulafy es un proyecto educativo abierto, gratuito e independiente en español e inglés para aprender inteligencia artificial con cursos, rutas y proyectos verificables sobre Codex, Claude Code, IA local, RAG, agentes, MLOps, seguridad, modelos abiertos y automatización.",
    "llms.txt": `${SITE_URL}/llms.txt`,
    "llms-full.txt": `${SITE_URL}/llms-full.txt`,
    "ai.txt": `${SITE_URL}/ai.txt`,
    "search-index": `${SITE_URL}/search-index.json`,
    "sitemap-index": `${SITE_URL}/sitemap-index.xml`,
    "content-language": "es, en",
    "educational-use": "Cursos gratuitos, rutas y proyectos reproducibles de inteligencia artificial práctica",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: "Aulafy",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon-512.png`,
        width: 512,
        height: 512,
      },
      description:
        "Proyecto educativo abierto, gratuito e independiente en español e inglés, sin registro, con cursos, rutas y proyectos verificables sobre IA local, Codex, Claude Code, RAG, agentes, seguridad, MLOps y automatización.",
      inLanguage: ["es", "en"],
      availableLanguage: ["Spanish", "English"],
      areaServed: ["España", "Latinoamérica", "Hispanohablantes", "Global"],
      audience: {
        "@type": "Audience",
        audienceType: "Estudiantes, makers, autónomos, pymes, docentes y perfiles técnicos",
      },
      knowsAbout: courseTopics,
      founder: { "@id": `${SITE_URL}/#author` },
      sameAs: [
        "https://github.com/aulafy/claude",
        "https://github.com/aulafy/r",
        "https://x.com/learntouseai",
        "https://www.linkedin.com/in/rguillamon/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Aulafy",
      description:
        "Educación abierta y gratuita en español e inglés para aprender inteligencia artificial mediante proyectos verificables.",
      inLanguage: ["es", "en"],
      publisher: { "@id": `${SITE_URL}/#organization` },
      creator: { "@id": `${SITE_URL}/#author` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#author`,
      name: "Ramón Guillamón",
      url: `${SITE_URL}/sobre-ramon-guillamon`,
      jobTitle: "Autor y editor de cursos de IA",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      sameAs: [
        "https://www.linkedin.com/in/rguillamon/",
        "https://x.com/learntouseai",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} antialiased`}
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('aulafy-theme');var l=t?t==='light':matchMedia('(prefers-color-scheme: light)').matches;document.documentElement.classList.toggle('light',l);document.documentElement.style.colorScheme=l?'light':'dark'}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-screen bg-zinc-950 text-zinc-200">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
