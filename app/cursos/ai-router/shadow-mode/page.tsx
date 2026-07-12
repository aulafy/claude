import AiRouterLessonPage, { aiRouterLessonMetadata } from "@/components/AiRouterLessonPage";

export const metadata = aiRouterLessonMetadata("shadow-mode");

export default function Page() {
  return <AiRouterLessonPage slug="shadow-mode" />;
}
