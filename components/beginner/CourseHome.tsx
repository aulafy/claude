import Link from "next/link";
import Icon from "@/components/Icon";
import CourseFrame from "./CourseFrame";
import styles from "./Course.module.css";
import { beginnerLessons, beginnerReviewDate } from "@/lib/beginner-course";

export default function CourseHome() {
  return <CourseFrame>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Course", name: "AI for everyday life", description: "Eight practical lessons for complete beginners, with worked examples, practice and a final project.", url: "https://www.aulafy.net/en", inLanguage: "en", educationalLevel: "Beginner", isAccessibleForFree: true, dateModified: beginnerReviewDate, license: "https://github.com/aulafy/claude/blob/main/LICENSE", provider: { "@type": "EducationalOrganization", name: "Aulafy", url: "https://www.aulafy.net" }, hasPart: beginnerLessons.map((lesson) => ({ "@type": "LearningResource", name: lesson.title, url: `https://www.aulafy.net/en/learn/${lesson.slug}` })) }) }} />
    <section className={styles.intro}>
      <p className={styles.eyebrow}>A practical course for complete beginners</p>
      <h1>AI for everyday life.</h1>
      <p className={styles.lead}>Learn to ask clearly, spot mistakes and make something useful. One small lesson at a time.</p>
      <Link className={styles.primary} href="/en/learn/what-ai-can-do">Begin lesson 1 <Icon name="chevronRight" /></Link>
      <div className={styles.facts}><span>8 practical lessons</span><span>About 2½ hours</span><span>Free, always open</span></div>
    </section>
    <section className={styles.preview} aria-labelledby="preview-title"><div><p className={styles.eyebrow}>A first taste</p><h2 id="preview-title">Can you spot the mistake?</h2><p>The source says: “The fee has not been announced.”</p><blockquote>The workshop is free.</blockquote><details><summary>Reveal the explanation</summary><p>“Not announced” does not mean “free”. A useful AI draft must preserve what is unknown. You will practise this skill in lesson 4.</p></details></div><div className={styles.previewSide}><Icon name="document" /><strong>Read. Try. Check.</strong><p>Worked examples, your own practice and feedback on every knowledge check.</p></div></section>
    <section className={styles.syllabus} aria-labelledby="syllabus-title"><p className={styles.eyebrow}>Your learning path</p><h2 id="syllabus-title">From a first question to a checked project.</h2>
      {beginnerLessons.map((lesson, index) => <Link className={styles.lessonRow} href={`/en/learn/${lesson.slug}`} key={lesson.slug}><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span><span><small>{lesson.unit}</small><h3>{lesson.title}</h3><p>{lesson.outcome}</p></span><span className={styles.duration}>{lesson.minutes} min <Icon name="chevronRight" /></span></Link>)}
    </section>
    <section className={styles.expect}><h2>Bring curiosity. Leave with a method.</h2><p>You need a browser and a little time. All exercises include fictional examples, so you can complete the course without an external AI account. Optional external tools have their own terms.</p><p>Your final project is a checked community announcement, the prompt behind it and a record of your decisions. Download each exercise to keep your work; Aulafy does not create a learner profile.</p><p className={styles.hint}>Course reviewed <time dateTime={beginnerReviewDate}>5 September 2026</time>. Foundations are tool-independent. Sources and review dates are visible in every lesson.</p></section>
  </CourseFrame>;
}
