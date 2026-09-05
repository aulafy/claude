import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CourseFrame from "@/components/beginner/CourseFrame";
import Practice from "@/components/beginner/Practice";
import styles from "@/components/beginner/Course.module.css";
import { beginnerLessons, beginnerReviewDate, beginnerSources } from "@/lib/beginner-course";

export const dynamicParams = false;
export function generateStaticParams() { return beginnerLessons.map((lesson) => ({ lesson: lesson.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> {
  const { lesson: slug } = await params;
  const lesson = beginnerLessons.find((item) => item.slug === slug);
  if (!lesson) notFound();
  return { title: `${lesson.title} | Aulafy beginner AI course`, description: lesson.outcome, alternates: { canonical: `/en/learn/${slug}` }, openGraph: { title: lesson.title, description: lesson.outcome, url: `/en/learn/${slug}`, locale: "en_US", type: "article" } };
}
export default async function BeginnerLessonPage({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson: slug } = await params;
  const index = beginnerLessons.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const lesson = beginnerLessons[index];
  const next = beginnerLessons[index + 1];
  return <CourseFrame current={slug}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "LearningResource", name: lesson.title, description: lesson.outcome, inLanguage: "en", educationalLevel: "Beginner", isAccessibleForFree: true, learningResourceType: "Lesson", timeRequired: `PT${lesson.minutes}M`, dateModified: beginnerReviewDate, license: "https://github.com/aulafy/claude/blob/main/LICENSE", url: `https://www.aulafy.net/en/learn/${slug}`, isPartOf: { "@type": "Course", name: "AI for everyday life", url: "https://www.aulafy.net/en", provider: { "@type": "Organization", name: "Aulafy", url: "https://www.aulafy.net" } } }) }} />
    <header className={styles.intro}><p className={styles.eyebrow}>{lesson.unit} / Lesson {index + 1} of 8</p><h1>{lesson.title}</h1><p className={styles.lead}>{lesson.outcome}</p><div className={styles.facts}><span>{lesson.minutes} minutes, including practice</span><a href="#practice">Go to practice</a>{index > 0 && <Link href={`/en/learn/${beginnerLessons[index - 1].slug}`}>Previous lesson</Link>}</div></header>
    <section className={styles.reading} aria-label="Explanation"><p className={styles.eyebrow}>01 / Understand</p>{lesson.sections.map((section) => <div key={section.title}><h2>{section.title}</h2><p>{section.text}</p></div>)}</section>
    <section className={styles.example} aria-labelledby="example-title"><p className={styles.eyebrow}>02 / Worked example</p><h2 id="example-title">Look closely at the result</h2><p className={styles.hint}>A written teaching example, not a live AI response.</p><div className={styles.sample}><strong>Request or source</strong><pre>{lesson.example.input}</pre></div><div className={styles.sample}><strong>Sample output</strong><pre>{lesson.example.output}</pre></div><details><summary>Compare with the tutor’s review</summary><p>{lesson.example.review}</p></details></section>
    <Practice key={lesson.slug} lesson={lesson} next={next ? { slug: next.slug, title: next.title } : undefined} />
    <section className={styles.sources}><h2>Sources &amp; course notes</h2><p className={styles.hint}>Reviewed <time dateTime={beginnerReviewDate}>5 September 2026</time>. Examples and exercises are original Aulafy teaching material under MIT. These references inform the course’s approach to reliability and learning; they are not endorsements.</p><ul>{beginnerSources.map((source) => <li key={source.href}><a href={source.href} rel="noreferrer">{source.title}</a><small>{source.note}</small></li>)}</ul><a href="https://github.com/aulafy/claude/issues">Report a correction on GitHub</a></section>
  </CourseFrame>;
}
