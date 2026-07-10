import CodexLessonPage, { codexLessonMetadata } from "@/components/CodexLessonPage";

export const metadata = codexLessonMetadata("git-revision");

export default function Page() {
  return <CodexLessonPage slug="git-revision" />;
}
