import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://aprende-claude-code.vercel.app"
  ),
  title: {
    default: "Aprende Claude Code — Guía completa en español",
    template: "%s",
  },
  description:
    "Tutorial completo de Claude Code desde cero: instalación, comandos, skills, subagentes, MCP, hooks, permisos y uso avanzado. La CLI de IA más potente para desarrolladores.",
  keywords: [
    "Claude Code",
    "tutorial Claude Code español",
    "Anthropic CLI",
    "aprender Claude Code",
    "IA programación",
    "asistente código terminal",
  ],
  openGraph: {
    title: "Aprende Claude Code — Guía completa en español",
    description:
      "Tutorial completo de Claude Code desde cero en español: recetas, proyectos guiados, skills, subagentes y más.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aprende Claude Code — Guía completa en español",
    description: "Tutorial completo de Claude Code desde cero en español.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-zinc-950 text-zinc-200">
        <Sidebar />
        <div className="md:ml-[260px] min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <ChatWidget />
      </body>
    </html>
  );
}
