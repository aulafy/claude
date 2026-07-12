import AiRouterLessonPage, { aiRouterLessonMetadata } from "@/components/AiRouterLessonPage";

export const metadata = aiRouterLessonMetadata("litellm-gateway");

export default function Page() {
  return <AiRouterLessonPage slug="litellm-gateway" />;
}
