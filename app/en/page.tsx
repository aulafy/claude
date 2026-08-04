import type { Metadata } from "next";
import UnifiedCourse from "@/components/UnifiedCourse";

export const metadata: Metadata = {
  title: "Complete artificial intelligence course in English — Aulafy",
  description:
    "One continuous open AI course in English: 21 lessons and 7 projects covering foundations, RAG, software, local models, agents, safety, and production.",
  alternates: { canonical: "/en", languages: { "es-ES": "/", "en-US": "/en", "x-default": "/" } },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Complete artificial intelligence course in English — Aulafy",
    description: "21 lessons and 7 integrated projects, free, open, and available without sign-up.",
    type: "article",
    locale: "en_US",
    url: "/en",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Aulafy, free and open practical AI education" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete artificial intelligence course in English — Aulafy",
    description: "21 lessons and 7 integrated projects, free, open, and available without sign-up.",
    creator: "@learntouseai",
    images: ["/opengraph-image"],
  },
};

export default function EnglishHome() {
  return <UnifiedCourse locale="en" />;
}
