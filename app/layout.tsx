import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import Shell from "@/components/Shell";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net"
  ),
  title: {
    default: "Aulafy — Cursos de Inteligencia Artificial en español",
    template: "%s | Aulafy",
  },
  description:
    "Cursos gratuitos y de código abierto para aprender IA con ejemplos prácticos: Claude Code, IA local, prompts, RAG, voz, PDF y automatización.",
  keywords: [
    "Claude Code",
    "tutorial Claude Code español",
    "Anthropic CLI",
    "aprender Claude Code",
    "IA local",
    "Ollama",
    "LM Studio",
    "RAG local",
    "IA programación",
    "asistente código terminal",
  ],
  authors: [{ name: "Ramón Guillamón", url: "https://www.linkedin.com/in/rguillamon/" }],
  creator: "Ramón Guillamón",
  publisher: "Ramón Guillamón",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Aulafy — Cursos de IA en español",
    description:
      "Cursos gratuitos y prácticos para aprender IA, construir herramientas propias y trabajar con modelos locales.",
    type: "website",
    locale: "es_ES",
    siteName: "Aulafy",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aulafy — Cursos de IA en español",
    description: "Cursos gratuitos y prácticos para aprender IA, Claude Code e IA local.",
    creator: "@learntouseai",
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aulafy.net";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Aulafy",
      description:
        "Cursos de Inteligencia Artificial en español, gratis y de código abierto. El primer curso es Claude Code.",
      inLanguage: "es",
      publisher: { "@id": `${SITE_URL}/#author` },
    },
    {
      "@type": "Course",
      "@id": `${SITE_URL}/guia#course`,
      name: "Claude Code, de 0 a pro",
      description:
        "Curso gratuito en español para aprender Claude Code desde cero, con proyectos, recetas, skills, subagentes, MCP, hooks e IA local.",
      url: `${SITE_URL}/guia`,
      inLanguage: "es",
      isAccessibleForFree: true,
      provider: { "@id": `${SITE_URL}/#website` },
      author: { "@id": `${SITE_URL}/#author` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#author`,
      name: "Ramón Guillamón",
      jobTitle: "AI Automation Consultant",
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
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} antialiased`}>
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
