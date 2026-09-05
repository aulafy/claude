import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import { beginnerLessons } from "@/lib/beginner-course";
import styles from "./Course.module.css";

export default function CourseFrame({ children, current }: { children: React.ReactNode; current?: string }) {
  const contents = <nav aria-label="Course lessons">{beginnerLessons.map((lesson, index) => <Link key={lesson.slug} href={`/en/learn/${lesson.slug}`} aria-current={current === lesson.slug ? "page" : undefined}><span>{String(index + 1).padStart(2, "0")}</span><span>{lesson.title}<small>{lesson.minutes} min</small></span></Link>)}</nav>;
  return <div className={styles.page}>
    <a href="#course-content" className={styles.skip}>Skip to lesson</a>
    <header className={styles.header}>
      <Link href="/en" className={styles.brand}><BrandMark /><strong>Aulafy</strong></Link>
      <span className={styles.edition}>The open classroom / English edition</span>
      <nav aria-label="Main navigation"><Link href="/en" aria-current={!current ? "page" : undefined}>Your course</Link><Link href="/en/courses">Library</Link><Link href="/" hrefLang="es">Español</Link></nav>
    </header>
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <p className={styles.eyebrow}>The beginner course</p><h2>AI for everyday life</h2>
        <p>8 lessons / about 2½ hours<br />No coding or paid tools required</p>
        <div className={`${styles.contents} ${styles.desktopContents}`}>{contents}</div>
        <details className={`${styles.contents} ${styles.mobileContents}`}>
          <summary>Course contents</summary>
          {contents}
        </details>
        <div className={styles.openNote}><strong>Open to everyone.</strong><p>No account. No tracking. No cookies. Your exercise stays in this page until you leave or reload.</p><Link href="/en/privacy">Privacy &amp; open licence</Link></div>
      </aside>
      <main id="course-content" className={styles.main}>{children}</main>
    </div>
    <footer className={styles.footer}><span>Free to learn. Free to build on.</span><nav aria-label="Legal and source"><Link href="/en/privacy">Privacy &amp; MIT licence</Link><a href="https://github.com/aulafy/claude">Source on GitHub</a><Link href="/en/ai-course">Extended programme</Link></nav></footer>
  </div>;
}
