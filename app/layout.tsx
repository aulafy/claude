import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
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
  title: "Aprende Claude Code — Guía completa en español",
  description:
    "Tutorial completo de Claude Code desde cero: instalación, comandos, MCP, hooks, permisos y uso avanzado. La CLI de IA más potente para desarrolladores.",
  openGraph: {
    title: "Aprende Claude Code — Guía completa en español",
    description: "Tutorial completo de Claude Code desde cero en español.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-zinc-950 text-zinc-200">
        <Sidebar />
        <main className="ml-[260px] min-h-screen">{children}</main>
      </body>
    </html>
  );
}
