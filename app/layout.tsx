import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import Script from "next/script";
import Shell from "@/components/Shell";
import { cursos, totalLecciones } from "@/lib/cursos";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aulafy — Cursos gratis de IA open source en español",
    template: "%s | Aulafy",
  },
  description:
    "Cursos gratuitos de inteligencia artificial open source en español con ejemplos prácticos: IA local, Claude Code, Ollama, RAG, agentes, prompts, imagen, voz, vídeo y automatización.",
  keywords: [
    "cursos de IA gratis",
    "cursos de inteligencia artificial en español",
    "curso IA open source",
    "tutoriales IA prácticos",
    "aprender inteligencia artificial",
    "IA open source español",
    "Claude Code",
    "tutorial Claude Code español",
    "Anthropic CLI",
    "aprender Claude Code",
    "IA local",
    "Ollama",
    "LM Studio",
    "modelos locales",
    "LLM",
    "RAG local",
    "chatbot con documentos",
    "agentes de IA",
    "subagentes",
    "MCP",
    "hooks Claude Code",
    "skills Claude Code",
    "prompts IA",
    "ComfyUI",
    "FLUX",
    "Diffusers",
    "Whisper",
    "Piper",
    "Wan video IA",
    "IA generativa multimedia",
    "automatización con IA",
    "IA programación",
    "asistente código terminal",
  ],
  authors: [{ name: "Ramón Guillamón", url: "https://www.linkedin.com/in/rguillamon/" }],
  creator: "Ramón Guillamón",
  publisher: "Aulafy",
  alternates: { canonical: "/" },
  category: "Education",
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
    title: "Aulafy — Cursos gratis de IA open source en español",
    description:
      "Tutoriales gratuitos y prácticos para aprender IA local, Claude Code, RAG, prompts, IA generativa multimedia y automatización con herramientas abiertas.",
    type: "website",
    locale: "es_ES",
    siteName: "Aulafy",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aulafy — Cursos gratis de IA open source",
    description: "Cursos prácticos en español para aprender IA local, Claude Code, RAG, IA generativa y automatización.",
    creator: "@learntouseai",
  },
  other: {
    "ai-summary":
      "Aulafy es una web educativa en español con cursos gratuitos de inteligencia artificial open source, IA local, Claude Code, RAG, IA generativa, prompts y automatización.",
    "llms.txt": `${SITE_URL}/llms.txt`,
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
      description:
        "Web educativa con cursos gratuitos de inteligencia artificial open source en español, IA local, RAG, prompts, Claude Code y automatización.",
      inLanguage: "es",
      knowsAbout: [
        "Inteligencia artificial",
        "IA open source",
        "IA local",
        "Claude Code",
        "Agentes de IA",
        "RAG",
        "Ollama",
        "LM Studio",
        "Model Context Protocol",
        "Subagentes",
        "Hooks",
        "Skills",
        "Automatización con IA",
        "Ingeniería de prompts",
      ],
      sameAs: ["https://github.com/raym33/claude"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Aulafy",
      description:
        "Cursos de Inteligencia Artificial open source en español, gratis y con ejemplos prácticos.",
      inLanguage: "es",
      publisher: { "@id": `${SITE_URL}/#organization` },
      creator: { "@id": `${SITE_URL}/#author` },
    },
    ...cursos.map((curso) => ({
      "@type": "Course",
      "@id": `${SITE_URL}/cursos/${curso.slug}#course`,
      name: curso.title,
      description: curso.desc,
      url: `${SITE_URL}/cursos/${curso.slug}`,
      inLanguage: "es",
      isAccessibleForFree: true,
      educationalLevel: curso.level,
      numberOfCredits: totalLecciones(curso),
      provider: { "@id": `${SITE_URL}/#organization` },
      author: { "@id": `${SITE_URL}/#author` },
      teaches: curso.secciones.flatMap((seccion) => seccion.lecciones.map((leccion) => leccion.title)),
    })),
    {
      "@type": "LearningResource",
      "@id": `${SITE_URL}/volumen-2#learning-resource`,
      name: "Claude Code + IA Local",
      description:
        "Guía práctica en español para construir aplicaciones de IA local con Ollama, LM Studio, RAG, PDF, voz y modelos abiertos.",
      url: `${SITE_URL}/volumen-2`,
      inLanguage: "es",
      isAccessibleForFree: true,
      educationalLevel: "Intermedio",
      learningResourceType: "Tutorial",
      provider: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#author`,
      name: "Ramón Guillamón",
      email: "learntouseai@gmail.com",
      url: SITE_URL,
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
