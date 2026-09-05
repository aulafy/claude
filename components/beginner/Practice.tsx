"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import type { BeginnerLesson } from "@/lib/beginner-course";
import styles from "./Course.module.css";

export default function Practice({ lesson, next }: { lesson: BeginnerLesson; next?: { slug: string; title: string } }) {
  const [draft, setDraft] = useState(lesson.starter);
  const [checked, setChecked] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const correct = submitted && selected !== null && lesson.answers[selected].correct;
  const ready = correct && checked.length === lesson.criteria.length && draft.trim() !== lesson.starter.trim() && draft.trim().length > 0;

  function download() {
    const text = `# Aulafy: ${lesson.title}\n\n## My practice\n${draft}\n\n## Self-review\n${lesson.criteria.map((item) => `- [${checked.includes(item) ? "x" : " "}] ${item}`).join("\n")}\n\nKnowledge check: ${correct ? "correct" : "not yet passed"}\nThis is a self-review, not an externally graded certificate.\n\n${lesson.takeaway}\nhttps://www.aulafy.net/en/learn/${lesson.slug}\n`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/markdown;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = `aulafy-${lesson.slug}.md`; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloaded(true);
  }

  return <>
    <section id="practice" className={styles.practice} aria-labelledby="practice-title">
      <p className={styles.eyebrow}>03 / Your turn</p><h2 id="practice-title">Put it into practice</h2><p>{lesson.task}</p>
      <label htmlFor="practice-draft">Your working notes</label>
      <p id="draft-privacy" className={styles.hint}>Use fictional information. Nothing you write here is sent to a server or an AI. Download your work before leaving; it is not saved automatically.</p>
      <textarea id="practice-draft" aria-describedby="draft-privacy" value={draft} onChange={(event) => { setDraft(event.target.value); setDownloaded(false); }} rows={10} spellCheck={false} autoComplete="off" />
      <fieldset><legend>Review your work</legend>{lesson.criteria.map((criterion) => <label key={criterion} className={styles.check}><input type="checkbox" checked={checked.includes(criterion)} onChange={(event) => setChecked(event.target.checked ? [...checked, criterion] : checked.filter((item) => item !== criterion))} /><span>{criterion}</span></label>)}</fieldset>
      <button type="button" className={styles.secondary} onClick={download}><Icon name="download" /> Download my work</button><span role="status" className={styles.hint}>{downloaded ? " Download prepared on your device." : ""}</span>
    </section>
    <section className={styles.quiz} aria-labelledby="check-title">
      <p className={styles.eyebrow}>04 / Check your understanding</p><h2 id="check-title">One decision before you go</h2>
      <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
        <fieldset><legend>{lesson.question}</legend>{lesson.answers.map((answer, index) => <label key={answer.text} className={styles.answer}><input type="radio" name="knowledge-check" value={index} checked={selected === index} onChange={() => { setSelected(index); setSubmitted(false); }} /><span>{answer.text}</span></label>)}</fieldset>
        <button type="submit" className={styles.primary} disabled={selected === null}>Check my answer <Icon name="chevronRight" /></button>
      </form>
      <div aria-live="polite">{submitted && selected !== null && <p className={correct ? styles.success : styles.feedback}>{lesson.answers[selected].feedback}</p>}</div>
    </section>
    <section className={styles.finish} aria-label="Lesson review">
      <p className={styles.eyebrow}>{ready ? "Self-review complete" : "Take this with you"}</p><h2>{lesson.takeaway}</h2>
      <p>{ready ? "You have checked your practice and answered the knowledge question. This is your own assessment, not automated grading of your writing." : "Complete the practice, review each criterion and check your answer to finish your self-review. Every lesson remains open."}</p>
      {next ? <Link className={styles.primary} href={`/en/learn/${next.slug}`}>Next: {next.title} <Icon name="chevronRight" /></Link> : <><Link className={styles.primary} href="/en/courses">Explore your next course <Icon name="chevronRight" /></Link><p>You have reached the final lesson. Keep your project and repeat the method on a new, low-risk task.</p></>}
    </section>
  </>;
}
