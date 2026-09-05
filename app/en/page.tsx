import type { Metadata } from "next";
import CourseHome from "@/components/beginner/CourseHome";

export const metadata: Metadata = {
  title: "Aulafy — Learn artificial intelligence from zero",
  description: "A free beginner AI course in English: eight guided lessons, worked examples, practice, feedback and a final project. No account, cookies or tracking.",
  alternates: { canonical: "/en", languages: { "es-ES": "/", "en-US": "/en", "x-default": "/" }, types: { "application/rss+xml": "/en/feed.xml" } },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aulafy — Learn AI through a clear path",
    description: "Eight guided lessons for complete beginners, with practice, feedback and a final project. Free, no registration.",
    type: "website", locale: "en_US", url: "/en",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Aulafy, free and open practical AI education" }],
  },
  twitter: {
    card: "summary_large_image", title: "Aulafy — Learn AI through a clear path",
    description: "Learn AI from zero with eight practical lessons. No account, cookies or tracking.", creator: "@learntouseai", images: ["/opengraph-image"],
  },
};

export default function EnglishHome() {
  return <CourseHome />;
}
