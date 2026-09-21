import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Icon from "@/components/Icon";
import { publicationProblems, bookReport } from "@/lib/living-book/engine";
import type { BookChapter, LivingBook } from "@/lib/living-book/engine";
import type { BookLocale } from "@/lib/living-book/schema";
import BookFrame from "./BookFrame";
import Practice, { CopyBlock, ReaderTools } from "./Practice";
import styles from "./Book.module.css";

const headingId = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
function Frame({ book, locale, current, children }: { book: LivingBook; locale: BookLocale; current?: string; children: React.ReactNode }) { return <BookFrame catalog={book.catalog} available={book.chapters.map(chapter => chapter.metadata.id)} locale={locale} current={current}>{children}</BookFrame>; }

export function ChapterView({ book, chapter, locale }: { book: LivingBook; chapter: BookChapter; locale: BookLocale }) {
  const en = locale === "en";
  const metadata = chapter.metadata;
  const copy = metadata.localized[locale];
  const order = book.catalog.parts.flatMap(part => part.chapters).filter(item => book.chapters.some(chapter => chapter.metadata.id === item.id));
  const index = order.findIndex(item => item.id === metadata.id);
  const part = book.catalog.parts.find(part => part.chapters.some(item => item.id === metadata.id))!;
  const partNumber = book.catalog.parts.indexOf(part) + 1;
  const chapterNumber = book.catalog.parts.flatMap(part => part.chapters).findIndex(item => item.id === metadata.id) + 1;
  const levelLabel = { beginner: en ? "Beginner" : "Principiante", intermediate: en ? "Intermediate" : "Intermedio", advanced: en ? "Advanced" : "Avanzado" }[metadata.level];
  const headings = [...chapter.bodies[locale].matchAll(/^## (.+)$/gm)].map(match => match[1]);
  const blockers = publicationProblems(book, chapter, locale);
  return <Frame book={book} locale={locale} current={metadata.id}><div className={styles.chapterGrid}><article className={styles.article}>
    <div className={styles.chapterTop}><span>{en ? "PART" : "PARTE"} {partNumber} / {part.title[locale]}</span><ReaderTools locale={locale} id={metadata.id} /></div>
    <div className={styles.chapterNumber}>{en ? "CHAPTER" : "CAPÍTULO"} {String(chapterNumber).padStart(2, "0")}</div>
    <h1>{copy.title}</h1><p className={styles.lead}>{copy.summary}</p>
    <div className={styles.meta}><span><Icon name="book" />{levelLabel}</span><span>{metadata.minutes} min</span><span className={styles.draft}>{blockers.length ? (en ? "Draft · review pending" : "Borrador · revisión pendiente") : (en ? "Reviewed · local preview" : "Revisado · vista previa local")}</span></div>
    {blockers.includes("translation-outdated") && <p className={styles.reviewNote}>{en ? "Translation needs review against the current source." : "La traducción necesita revisión frente al texto de referencia."}</p>}
    <section className={styles.outcomes}><h2>{en ? "By the end" : "Al terminar"}</h2><ul>{copy.outcomes.map(outcome => <li key={outcome}><Icon name="check" />{outcome}</li>)}</ul></section>
    <div className={styles.prose}><ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml components={{ h2: ({ children }) => <h2 id={headingId(String(children))}>{children}</h2>, pre: ({ children }) => <CopyBlock locale={locale}>{children}</CopyBlock>, table: ({ children }) => <div className={styles.tableWrap}><table>{children}</table></div>, a: ({ children, href }) => <a href={href} rel="noreferrer">{children}</a> }}>{chapter.bodies[locale]}</ReactMarkdown></div>
    <Practice key={`${metadata.id}:${locale}:${chapter.hashes[locale]}`} metadata={metadata} hash={chapter.hashes[locale]} locale={locale} />
    <section className={styles.provenance}><h2>{en ? "Origin and revision" : "Origen y revisión"}</h2><p>{metadata.legacyPaths.length ? (en ? "This draft declares the following legacy material as a reference. The chapter still needs editorial attribution and review." : "Este borrador declara el siguiente material antiguo como referencia. El capítulo aún necesita atribución y revisión editorial.") : (en ? "This is new editorial material; no legacy source is declared. Preview text, not a published edition." : "Este es material editorial nuevo; no declara una fuente antigua. Texto de vista previa, no una edición publicada.")}</p>{metadata.legacyPaths.map(file => <code key={file}>{file}</code>)}<p>{en ? "Content revision" : "Revisión del contenido"}: <code>{chapter.hashes[locale].slice(0, 16)}</code></p></section>
    <nav className={styles.chapterNav} aria-label={en ? "Previous and next chapters" : "Capítulos anterior y siguiente"}>{index > 0 ? <Link href={`/book/${locale}/${order[index - 1].id}`}><small>{en ? "PREVIOUS" : "ANTERIOR"}</small>{order[index - 1].title[locale]}</Link> : <Link href={`/book/${locale}`}><small>{en ? "THE BOOK" : "EL LIBRO"}</small>{en ? "Complete contents" : "Índice completo"}</Link>}{order[index + 1] ? <Link href={`/book/${locale}/${order[index + 1].id}`}><small>{en ? "NEXT CHAPTER" : "SIGUIENTE CAPÍTULO"}</small>{order[index + 1].title[locale]} <Icon name="chevronRight" /></Link> : <Link href={`/book/${locale}`}><small>{en ? "NEXT PART" : "SIGUIENTE PARTE"}</small>{en ? "View the planned learning path" : "Ver el recorrido en preparación"}</Link>}</nav>
    </article><aside className={styles.chapterToc}><span>{en ? "IN THIS CHAPTER" : "EN ESTE CAPÍTULO"}</span><nav>{headings.map(heading => <a key={heading} href={`#${headingId(heading)}`}>{heading}</a>)}<a href="#practice">{en ? "Check your understanding" : "Comprueba lo aprendido"}</a></nav><div className={styles.tocNote}><Icon name="shield" /><span>{en ? "Fictional data. No connected accounts." : "Datos ficticios. Sin cuentas conectadas."}</span></div></aside></div></Frame>;
}

export function ContentsView({ book, locale }: { book: LivingBook; locale: BookLocale }) {
  const en = locale === "en";
  return <Frame book={book} locale={locale}><article className={styles.indexPage}><div className={styles.chapterNumber}>{en ? "CONTENTS" : "ÍNDICE DEL LIBRO"}</div><h1>{book.catalog.title[locale]}</h1><p className={styles.lead}>{en ? "From your first useful task to building, evaluating and maintaining AI applications." : "De tu primera tarea útil a construir, evaluar y mantener aplicaciones con IA."}</p><div className={styles.meta}><span>8 {en ? "parts" : "partes"}</span><span>{book.chapters.length} {en ? "draft chapters" : "capítulos redactados"}</span><span>{en ? "Unwritten chapters are marked as planned" : "Los capítulos pendientes figuran en preparación"}</span></div>{book.catalog.parts.map((part, index) => <section key={part.id} className={styles.contentsPart}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{part.title[locale]}</h2><p>{part.outcome[locale]}</p><ol>{part.chapters.map(item => <li key={item.id}>{book.chapters.some(chapter => chapter.metadata.id === item.id) ? <Link href={`/book/${locale}/${item.id}`}>{item.title[locale]}<Icon name="chevronRight" /></Link> : <span>{item.title[locale]}<small>{en ? "Planned" : "En preparación"}</small></span>}</li>)}</ol></div></section>)}</article></Frame>;
}

export function EditionView({ book, locale, editorial }: { book: LivingBook; locale: BookLocale; editorial: boolean }) {
  const en = locale === "en";
  const report = bookReport(book);
  return <Frame book={book} locale={locale} current={editorial ? "editorial" : "changes"}><article className={styles.indexPage}><div className={styles.chapterNumber}>{en ? "WORKING EDITION" : "EDICIÓN DE TRABAJO"}</div><h1>{editorial ? (en ? "Editorial status" : "Estado editorial") : (en ? "Book changes" : "Cambios del libro")}</h1><p className={styles.lead}>{en ? "Local preview. No daily monitoring or automatic publication is active." : "Vista previa local. La vigilancia diaria y la publicación automática no están activas."}</p>
    {!editorial ? <section className={styles.releaseNote}><span className={styles.draft}>{en ? "UNPUBLISHED" : "SIN PUBLICAR"}</span><h2>{en ? "First reading sequence" : "Primera secuencia de lectura"}</h2><p>{en ? "Twenty-four draft chapters in Spanish and English, adapted from existing material and awaiting editorial review." : "Veinticuatro capítulos en borrador, en español e inglés, adaptados del material existente y pendientes de revisión editorial."}</p><p>{en ? "No verified daily editions have been released yet." : "Todavía no se han publicado ediciones diarias verificadas."}</p><Link href={`/book/${locale}/first-task`}>{en ? "Read the first chapter" : "Leer el primer capítulo"} <Icon name="chevronRight" /></Link></section> : <><h2 className={styles.tableHeading}>{en ? "Chapters" : "Capítulos"}</h2><div className={styles.tableWrap}><table className={styles.editorialTable}><thead><tr><th>{en ? "Chapter" : "Capítulo"}</th><th>{en ? "Languages" : "Idiomas"}</th><th>{en ? "Review" : "Revisión"}</th></tr></thead><tbody>{book.chapters.map(chapter => <tr key={chapter.metadata.id}><td><Link href={`/book/${locale}/${chapter.metadata.id}`}>{chapter.metadata.localized[locale].title}</Link></td><td>ES / EN</td><td>{en ? "Editorial approval pending" : "Aprobación editorial pendiente"}</td></tr>)}</tbody></table></div><h2 className={styles.tableHeading}>{en ? "Selected sources" : "Fuentes seleccionadas"}</h2>{report.sources.map(source => <section className={styles.sourceRow} key={source.id}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<Icon name="external" /></a><span>{en ? "First capture pending" : "Primera captura pendiente"} · {source.intervalHours} h</span><small>{source.impact.affected.length} {en ? "linked chapters" : "capítulos vinculados"}</small></section>)}<p className={styles.reviewNote}>{en ? "A source change creates a review candidate. It does not verify or publish a chapter." : "Un cambio en una fuente abre una revisión pendiente. No verifica ni publica un capítulo."}</p></>}
  </article></Frame>;
}
