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
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://aulafy.net"
  ),
  title: {
    default: "Aprende Claude Code — Guía completa en español",
    template: "%s",
  },
  description:
    "Tutorial completo de Claude Code desde cero: instalación, comandos, skills, subagentes, MCP, hooks, permisos y uso avanzado. Incluye el Volumen II: Claude Code + IA Local.",
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
    title: "Aprende Claude Code — Guía completa en español",
    description:
      "Tutorial completo de Claude Code en español: recetas, proyectos guiados, skills, subagentes y el Volumen II sobre IA local.",
    type: "website",
    locale: "es_ES",
    siteName: "Aprende Claude Code",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aprende Claude Code — Guía completa en español",
    description: "Tutorial completo de Claude Code en español. Incluye el Volumen II: IA local.",
    creator: "@learntouseai",
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aulafy.net";

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
      "@type": "Person",
      "@id": `${SITE_URL}/#author`,
      name: "Ramón Guillamón",
      jobTitle: "AI Automation Consultant",
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
