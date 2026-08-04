import Link from "next/link";
import styles from "./UnifiedCourse.module.css";
import { localized, unifiedLessonCount, unifiedModules, unifiedSources, type CourseLocale } from "@/lib/unified-course";

const copy = {
  es: {
    skip: "Saltar al curso", course: "Curso abierto de inteligencia artificial", title: "Aprende IA, de cero a producción.",
    lead: "Un curso continuo, compacto y en español. Ve de los fundamentos a datos, software, modelos locales, agentes y operación segura sin perderte entre catálogos.",
    start: "Empezar por la primera lección", contents: "Contenido", modules: "módulos", lessons: "lecciones", updated: "Revisión estructural", open: "Gratis · abierto · sin registro",
    method: "Cada lección responde cuatro cosas: qué aprenderás, qué debes entender, qué harás y qué evidencia conservarás.",
    learn: "Al terminar podrás", practice: "Práctica", evidence: "Evidencia", sources: "Fuentes primarias", status: "Estado editorial",
    stable: "Concepto estable", reviewable: "Revisión periódica", volatile: "Revisión frecuente", next: "Siguiente lección", top: "Volver al índice",
    footer: "Contenido CC BY-SA 4.0 · código MIT. Formación educativa no oficial.", language: "English",
  },
  en: {
    skip: "Skip to course", course: "Open artificial intelligence course", title: "Learn AI, from zero to production.",
    lead: "One continuous, compact course in English. Move from foundations to data, software, local models, agents, and safe operations without getting lost in catalogues.",
    start: "Start with the first lesson", contents: "Contents", modules: "modules", lessons: "lessons", updated: "Structural review", open: "Free · open · no sign-up",
    method: "Every lesson answers four questions: what you will learn, what you need to understand, what you will do, and what evidence you will keep.",
    learn: "By the end you can", practice: "Practice", evidence: "Evidence", sources: "Primary sources", status: "Editorial status",
    stable: "Stable concept", reviewable: "Periodic review", volatile: "Frequent review", next: "Next lesson", top: "Back to contents",
    footer: "Content CC BY-SA 4.0 · code MIT. Unofficial educational material.", language: "Español",
  },
} as const;

export default function UnifiedCourse({ locale = "es" }: { locale?: CourseLocale }) {
  const text = copy[locale];
  const lessons = unifiedModules.flatMap((module) => module.lessons);
  const languageHref = locale === "es" ? "/en" : "/";

  return (
    <div className={styles.page}>
      <a href="#curso" className={styles.skip}>{text.skip}</a>
      <header className={styles.header} id="arriba">
        <Link href={locale === "es" ? "/" : "/en"} className={styles.brand}><span>A</span><strong>Aulafy</strong></Link>
        <nav aria-label="Utilidades"><a href="#indice">{text.contents}</a><Link href={languageHref} hrefLang={locale === "es" ? "en" : "es"}>{text.language}</Link><a href="https://github.com/aulafy/claude" target="_blank" rel="noopener noreferrer">GitHub</a></nav>
      </header>

      <section className={styles.hero}>
        <p>{text.course}</p><h1>{text.title}</h1><p className={styles.lead}>{text.lead}</p>
        <div className={styles.actions}><a href={`#${lessons[0].id}`}>{text.start} ↓</a><span>{text.open}</span></div>
        <dl><div><dt>{text.modules}</dt><dd>{unifiedModules.length}</dd></div><div><dt>{text.lessons}</dt><dd>{unifiedLessonCount}</dd></div><div><dt>{text.updated}</dt><dd><time dateTime="2026-08-04">04·08·2026</time></dd></div></dl>
      </section>

      <div className={styles.layout}>
        <aside className={styles.sidebar} id="indice">
          <div className={styles.sidebarIntro}><strong>{text.contents}</strong><p>{text.method}</p></div>
          <nav aria-label={text.contents}>
            {unifiedModules.map((module) => <div key={module.id}><a className={styles.moduleLink} href={`#${module.id}`}>{localized(module.title, locale)}</a><ol>{module.lessons.map((item) => <li key={item.id}><a href={`#${item.id}`}>{localized(item.title, locale)}</a></li>)}</ol></div>)}
          </nav>
        </aside>

        <main className={styles.content} id="curso">
          {unifiedModules.map((module) => (
            <section className={styles.module} id={module.id} key={module.id}>
              <header className={styles.moduleHeader}><p>{locale === "es" ? "Módulo" : "Module"}</p><h2>{localized(module.title, locale)}</h2><p>{localized(module.purpose, locale)}</p></header>
              {module.lessons.map((item) => {
                const index = lessons.findIndex((lesson) => lesson.id === item.id);
                const next = lessons[index + 1];
                return <article className={styles.lesson} id={item.id} key={item.id}>
                  <div className={styles.lessonMeta}><span>{String(index + 1).padStart(2, "0")} / {unifiedLessonCount}</span><span>{text.status}: {text[item.volatility]}</span></div>
                  <h3>{localized(item.title, locale)}</h3><p className={styles.summary}>{localized(item.summary, locale)}</p>
                  <div className={styles.outcomes}><strong>{text.learn}</strong><ul>{item.outcomes.map((outcome) => <li key={localized(outcome, locale)}>{localized(outcome, locale)}</li>)}</ul></div>
                  <div className={styles.explanation}>{item.explanation.map((paragraph) => <p key={localized(paragraph, locale)}>{localized(paragraph, locale)}</p>)}</div>
                  <div className={styles.exercise}><div><span>{text.practice}</span><p>{localized(item.practice, locale)}</p></div><div><span>{text.evidence}</span><p>{localized(item.evidence, locale)}</p></div></div>
                  <details className={styles.sources}><summary>{text.sources} · {item.sources.length}</summary><ul>{item.sources.map((key) => <li key={key}><a href={unifiedSources[key].href} target="_blank" rel="noopener noreferrer">{unifiedSources[key].label} ↗</a></li>)}</ul></details>
                  <footer>{next ? <a href={`#${next.id}`}>{text.next} ↓</a> : <a href="#arriba">{text.top} ↑</a>}<a href="#indice">{text.contents}</a></footer>
                </article>;
              })}
            </section>
          ))}
        </main>
      </div>
      <footer className={styles.footer}><strong>Aulafy</strong><p>{text.footer}</p><Link href={languageHref}>{text.language}</Link></footer>
    </div>
  );
}

