import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import DocumentLanguage from "@/components/DocumentLanguage";
import Icon from "@/components/Icon";
import { getWikiArticles, getWikiCourses, wikiParts, wikiReferences } from "@/lib/legacy-wiki";
import styles from "./LegacyWiki.module.css";

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function LegacyWiki({ english = false, query = "" }: { english?: boolean; query?: string }) {
  const home = english ? "/en/wiki" : "/wiki";
  const courses = getWikiCourses(english);
  const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
  const matches = (text: string) => terms.every((term) => normalize(text).includes(term));
  const filtered = courses.flatMap((course) => {
    const all = matches(`${course.title} ${course.description}`);
    const sections = course.sections.map((section) => ({ ...section, lessons: section.lessons.filter((lesson) => all || matches(`${course.title} ${section.title} ${lesson.title}`)) })).filter((section) => section.lessons.length);
    return sections.length ? [{ ...course, sections }] : [];
  });
  const articles = getWikiArticles().filter((post) => matches(`${post.title} ${post.description} ${post.category}`));
  const lessonCount = courses.reduce((total, course) => total + course.sections.reduce((n, section) => n + section.lessons.length, 0), 0);
  return <div className={styles.wiki} lang={english ? "en" : "es"}>
    <DocumentLanguage locale={english ? "en" : "es"} />
    <a className={styles.skip} href="#wiki-main">{english ? "Skip to content" : "Saltar al contenido"}</a>
    <header className={styles.header}>
      <Link href={home} className={styles.brand}><BrandMark /><strong>Aulafy</strong><span>Wiki</span></Link>
      <nav aria-label={english ? "Language" : "Idioma"}><Link href={`/wiki${query ? `?q=${encodeURIComponent(query)}` : ""}`} hrefLang="es" aria-current={!english ? "page" : undefined}>ES</Link><Link href={`/en/wiki${query ? `?q=${encodeURIComponent(query)}` : ""}`} hrefLang="en" aria-current={english ? "page" : undefined}>EN</Link></nav>
    </header>
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <nav aria-label={english ? "Contents" : "Índice"}>
          <p>{english ? "CONTENTS" : "ÍNDICE GENERAL"}</p>
          <a href={`${home}#orientation`}><span>0</span>{english ? "Find your starting point" : "Brújula"}</a>
          {wikiParts.map((part) => <a key={part.id} href={`${home}#${part.id}`}><span>{part.number}</span>{english ? part.en : part.es}</a>)}
          <a href={`${home}#articles`}><span>VI</span>{english ? "Articles and analysis" : "Artículos y análisis"}</a>
          <a href={`${home}#references`}><span>VII</span>{english ? "Reference desk" : "Consulta y recursos"}</a>
        </nav>
        <Link className={styles.return} href={english ? "/en" : "/"} prefetch={false}>{english ? "Back to homepage" : "Volver a la portada"}</Link>
      </aside>
      <main id="wiki-main" className={styles.main}>
        <p className={styles.eyebrow}>{english ? "THE AULAFY LIBRARY" : "LA BIBLIOTECA DE AULAFY"}</p>
        <h1>{english ? "Practical artificial intelligence" : "Inteligencia artificial práctica"}</h1>
        <p className={styles.intro}>{english ? "From your first task to a system you can trust. The previous courses, lessons and articles remain available while we rebuild Aulafy." : "De tu primera tarea a un sistema que puedas defender. Los cursos, lecciones y artículos anteriores siguen disponibles mientras renovamos Aulafy."}</p>
        <p className={styles.stats}>{courses.length} {english ? "courses" : "cursos"} · {lessonCount} {english ? "lessons" : "lecciones"} · {getWikiArticles().length} {english ? "articles, including translations" : "artículos, incluidas traducciones"}</p>
        <div className={styles.notice}><strong>{english ? "Previous content. Not a new edition." : "Contenido anterior. No es una edición nueva."}</strong> {english ? "Versions, commands and links may have changed. Check the date and official sources in each lesson before using it. Spanish-only material is labelled ES." : "Las versiones, comandos y enlaces pueden haber cambiado. Comprueba la fecha y las fuentes oficiales de cada lección antes de utilizarla. El material en inglés se identifica con EN."}</div>
        <form action={home} role="search" className={styles.search}>
          <label htmlFor="wiki-search">{english ? "Find a topic" : "Buscar un tema"}</label>
          <div><input id="wiki-search" name="q" type="search" defaultValue={query} placeholder={english ? "Ollama, privacy, Claude Code…" : "Ollama, privacidad, Claude Code…"} maxLength={160} /><button type="submit" title={english ? "Search" : "Buscar"} aria-label={english ? "Search" : "Buscar"}><Icon name="search" /></button></div>
        </form>
        {query && <p role="status">{english ? "Results for" : "Resultados para"} “{query}”. <Link href={home}>{english ? "Clear search" : "Quitar filtro"}</Link></p>}
        {!query && <section id="orientation" className={styles.section}>
          <h2><span>0</span>{english ? "Find your starting point" : "Brújula: empieza por lo que necesitas"}</h2>
          <div className={styles.paths}>
            <div><h3>{english ? "I am starting out" : "Estoy empezando"}</h3><p>{english ? "Understand the limits of AI, check an answer and complete one small task." : "Entiende los límites de la IA, verifica una respuesta y completa una tarea pequeña."}</p><a href="#understand">{english ? "Start with the fundamentals" : "Empezar por los fundamentos"} →</a></div>
            <div><h3>{english ? "I need it for work" : "Lo necesito para mi trabajo"}</h3><p>{english ? "Choose office work, teaching, data or a website. One useful outcome first." : "Elige oficina, docencia, datos o una web. Primero, un resultado útil."}</p><a href="#apply">{english ? "Choose your field" : "Elegir un oficio"} →</a></div>
            <div><h3>{english ? "I build systems" : "Construyo sistemas"}</h3><p>{english ? "Explore code, local models, RAG and agents; then evaluate and protect them." : "Consulta código, modelos locales, RAG y agentes; después evalúa y protege."}</p><a href="#build">{english ? "Open the technical workshops" : "Ir a los talleres técnicos"} →</a></div>
          </div>
        </section>}
        {wikiParts.map((part) => {
          const items = part.courses.flatMap((slug) => filtered.filter((course) => course.slug === slug));
          if (!items.length) return null;
          return <section key={part.id} id={part.id} className={styles.section}>
            <h2><span>{part.number}</span>{english ? part.en : part.es}</h2>
            <p className={styles.description}>{english ? part.descriptionEn : part.description}</p>
            {items.map((course) => <details key={course.slug} className={styles.course} open={query ? true : undefined}>
              <summary><span>{course.title}</span><small>{course.language.toUpperCase()} · {course.sections.reduce((n, s) => n + s.lessons.length, 0)} {english ? "lessons" : "lecciones"}</small></summary>
              <div className={styles.lessons}>
                <p>{course.description}</p><p className={styles.date}>{english ? "Course date on record" : "Fecha registrada del curso"}: <time dateTime={course.updated}>{course.updated}</time> · <Link href={course.href} prefetch={false}>{english ? "Open course" : "Abrir curso"}</Link></p>
                {course.sections.map((section, index) => <div key={`${section.title}-${index}`}><h3>{section.title}</h3><ol>{section.lessons.map((lesson) => <li key={lesson.href}><Link href={lesson.href} prefetch={false} hrefLang={course.language}>{lesson.title}</Link></li>)}</ol></div>)}
              </div>
            </details>)}
          </section>;
        })}
        {articles.length > 0 && <section id="articles" className={styles.section}><h2><span>VI</span>{english ? "Articles and analysis" : "Artículos y análisis"}</h2><div className={styles.articles}>{articles.map((article) => <article key={article.href} lang={article.language}><p className={styles.date}>{article.category} · {article.language.toUpperCase()} · <time dateTime={article.updated}>{article.updated}</time></p><h3><Link href={article.href} prefetch={false}>{article.title}</Link></h3><p>{article.description}</p></article>)}</div></section>}
        {!filtered.length && !articles.length && <p className={styles.empty}>{english ? "No matching content. Try a shorter term, such as Ollama, RAG or Codex." : "No hay contenido que coincida. Prueba un término más corto, como Ollama, RAG o Codex."}</p>}
        {!query && <section id="references" className={styles.section}><h2><span>VII</span>{english ? "Reference desk" : "Consulta y recursos"}</h2><ul className={styles.references}>{wikiReferences.map((item) => <li key={item.href}><Link href={english && item.hrefEn ? item.hrefEn : item.href} prefetch={false}>{english ? item.en : item.es}</Link></li>)}</ul></section>}
        <footer className={styles.footer}><p>{english ? "Open education. No registration. No cookies." : "Enseñanza libre. Sin registro. Sin cookies."}</p><p><a href="https://github.com/aulafy/claude">GitHub · MIT</a> · <Link href="/licencia">{english ? "Earlier content retains its original licence and attribution." : "El contenido anterior conserva su licencia y atribución originales."}</Link></p></footer>
      </main>
    </div>
  </div>;
}
