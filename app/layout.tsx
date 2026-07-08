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
const courseTopics = [
  "IA open source",
  "IA local",
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
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aulafy — Cursos gratis de IA open source en español",
    template: "%s",
  },
  description:
    "Cursos gratuitos de inteligencia artificial open source en español, sin registro y con ejemplos prácticos: IA local, Claude Code, Ollama, RAG, fine-tuning, MLOps, agentes, seguridad, evals, imagen, voz, vídeo y automatización.",
  keywords: [
    "cursos de IA gratis",
    "cursos de inteligencia artificial en español",
    "curso IA open source",
    "curso Claude Code español",
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
    "R CLI raym33",
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
  ],
  authors: [{ name: "Ramón Guillamón", url: "https://www.linkedin.com/in/rguillamon/" }],
  creator: "Ramón Guillamón",
  publisher: "Aulafy",
  manifest: "/manifest.webmanifest",
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
      "Tutoriales gratuitos y prácticos para aprender IA local, Claude Code, Fable 5, videojuegos 3D, RAG, MLOps, seguridad, IA generativa y automatización con herramientas abiertas.",
    type: "website",
    locale: "es_ES",
    siteName: "Aulafy",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 512,
        height: 512,
        alt: "Aulafy, cursos gratis de IA open source en español",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aulafy — Cursos gratis de IA open source",
    description: "Cursos prácticos en español para aprender IA local, Claude Code, Fable 5, videojuegos 3D, RAG, MLOps, seguridad y automatización.",
    creator: "@learntouseai",
    images: ["/og-image.png"],
  },
  other: {
    "ai-summary":
      "Aulafy es una web educativa en español con cursos gratuitos de inteligencia artificial open source, IA local, Claude Code, Fable 5, videojuegos 3D, Blender, Godot, CAD con IA, RAG, fine-tuning, MLOps, seguridad de modelos, IA generativa, prompts, n8n, Open WebUI, Ollama y automatización self-hosted.",
    "llms.txt": `${SITE_URL}/llms.txt`,
    "llms-full.txt": `${SITE_URL}/llms-full.txt`,
    "content-language": "es",
    "educational-use": "Cursos gratuitos, tutoriales prácticos y ejemplos reproducibles de IA open source",
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
        "Web educativa con cursos gratuitos de inteligencia artificial open source en español, sin registro, con IA local, Fable 5, videojuegos 3D, CAD, RAG, prompts, Claude Code, CLI de agentes tipo R, agentes y automatización.",
      inLanguage: "es",
      areaServed: ["España", "Latinoamérica", "Hispanohablantes"],
      audience: {
        "@type": "Audience",
        audienceType: "Estudiantes, makers, autónomos, pymes, docentes y perfiles técnicos",
      },
      knowsAbout: courseTopics,
      sameAs: [
        "https://github.com/raym33/claude",
        "https://github.com/raym33/r",
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
        "Cursos de Inteligencia Artificial open source en español, gratis y con ejemplos prácticos.",
      inLanguage: "es",
      publisher: { "@id": `${SITE_URL}/#organization` },
      creator: { "@id": `${SITE_URL}/#author` },
    },
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/cursos#collection`,
      url: `${SITE_URL}/cursos`,
      name: "Cursos gratuitos de IA open source en español",
      description:
        "Catálogo de cursos prácticos de Aulafy sobre IA local, Claude Code, Fable 5, videojuegos 3D, CAD, RAG, CLI de agentes tipo R, agentes, fine-tuning, MLOps, seguridad, evals y automatización.",
      inLanguage: "es",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#course-list` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#course-list`,
      name: "Catálogo de cursos de IA open source",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: cursos.length,
      itemListElement: cursos.map((curso, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/cursos/${curso.slug}`,
        name: curso.title,
        description: curso.desc,
      })),
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
      learningResourceType: "Curso online",
      keywords: [curso.title, curso.short, ...curso.secciones.flatMap((seccion) => seccion.lecciones.map((leccion) => leccion.title))].join(", "),
      numberOfCredits: totalLecciones(curso),
      provider: { "@id": `${SITE_URL}/#organization` },
      author: { "@id": `${SITE_URL}/#author` },
      audience: {
        "@type": "Audience",
        audienceType: "Personas que quieren aprender IA con ejemplos prácticos y herramientas abiertas",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        category: "free",
        url: `${SITE_URL}/cursos/${curso.slug}`,
      },
      teaches: curso.secciones.flatMap((seccion) => seccion.lecciones.map((leccion) => leccion.title)),
      hasPart: curso.secciones.flatMap((seccion) =>
        seccion.lecciones.map((leccion) => ({
          "@type": "LearningResource",
          name: leccion.title,
          url: `${SITE_URL}/cursos/${curso.slug}/${leccion.slug}`,
          inLanguage: "es",
          isAccessibleForFree: true,
          learningResourceType: "Lección",
          isPartOf: { "@id": `${SITE_URL}/cursos/${curso.slug}#course` },
        })),
      ),
    })),
    {
      "@type": "LearningResource",
      "@id": `${SITE_URL}/cursos/ia-local#learning-resource`,
      name: "Claude Code + IA Local",
      description:
        "Guía práctica en español para construir aplicaciones de IA local con Ollama, LM Studio, RAG, PDF, voz y modelos abiertos.",
      url: `${SITE_URL}/cursos/ia-local`,
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
      email: "contacto@aulafy.net",
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
