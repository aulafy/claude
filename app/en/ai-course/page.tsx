import type { Metadata } from "next";
import UnifiedCourse from "@/components/UnifiedCourse";

export const metadata: Metadata = {
  title: "Complete artificial intelligence course — 28 lessons",
  description: "One free continuous AI course in English: 7 modules, 28 lessons, and 7 projects from foundations to production.",
  alternates: { canonical: "/en/ai-course", languages: { "es-ES": "/curso-ia", "en-US": "/en/ai-course", "x-default": "/curso-ia" } },
};

export default function CompleteAiCourse() { return <UnifiedCourse locale="en" />; }
