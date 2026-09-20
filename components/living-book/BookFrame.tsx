"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Icon from "@/components/Icon";
import DocumentLanguage from "@/components/DocumentLanguage";
import type { BookCatalog, BookLocale } from "@/lib/living-book/schema";
import styles from "./Book.module.css";

export default function BookFrame({ catalog, available, locale, current = "", children }: { catalog: BookCatalog; available: string[]; locale: BookLocale; current?: string; children: React.ReactNode }) {
  const en = locale === "en";
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const base = `/book/${locale}`;
  const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  return <div className={styles.book} data-book-root lang={locale}>
    <DocumentLanguage locale={locale} />
    <a className={styles.skip} href="#book-content">{en ? "Skip to chapter" : "Saltar al capítulo"}</a>
    <header className={styles.masthead}>
      <div className={styles.publication}><span>{en ? "OPEN EDUCATION" : "ENSEÑANZA ABIERTA"}</span><span>{en ? "Local working edition" : "Edición de trabajo local"}</span></div>
      <Link className={styles.wordmark} href={`${base}/first-task`}><Image src="/aulafy-logo.png" width={38} height={38} sizes="38px" alt="" />Aulafy<span>{catalog.title[locale]}</span></Link>
      <div className={styles.languages} aria-label={en ? "Language" : "Idioma"}><Link href={`/book/es${current ? `/${current}` : ""}`} aria-current={!en ? "page" : undefined}>ES</Link><Link href={`/book/en${current ? `/${current}` : ""}`} aria-current={en ? "page" : undefined}>EN</Link></div>
    </header>
    <nav className={styles.topnav} aria-label={en ? "Book sections" : "Secciones del libro"}>
      <div><button className={styles.menu} title={en ? "Table of contents" : "Índice"} aria-label={en ? "Table of contents" : "Índice"} aria-expanded={open} aria-controls="book-index" onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} /></button><Link href={base} aria-current={!current ? "page" : undefined}>{en ? "Contents" : "Índice"}</Link><Link href={`${base}/changes`} aria-current={current === "changes" ? "page" : undefined}>{en ? "Changes" : "Cambios"}</Link><Link href={`${base}/editorial`} aria-current={current === "editorial" ? "page" : undefined}>{en ? "Edition" : "Edición"}</Link></div>
      <span>{en ? "Free · MIT · No account" : "Libre · MIT · Sin registro"}</span>
    </nav>
    <div className={styles.layout}>
      <aside id="book-index" className={`${styles.sidebar} ${open ? styles.sidebarOpen : ""}`}>
        <div className={styles.indexTitle}><span>{en ? "THE LEARNING PATH" : "EL RECORRIDO"}</span><small>{available.length} / {catalog.parts.flatMap(part => part.chapters).length}</small></div>
        <label className={styles.search}><Icon name="search" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder={en ? "Find a chapter" : "Buscar un capítulo"} aria-label={en ? "Find a chapter" : "Buscar un capítulo"} /></label>
        <nav aria-label={en ? "Chapters" : "Capítulos"}>{catalog.parts.map((part, index) => {
          const entries = part.chapters.filter(chapter => `${chapter.title[locale]} ${part.title[locale]}`.toLowerCase().includes(query.toLowerCase()));
          if (!entries.length) return null;
          return <div key={part.id} className={styles.part}><h2><span>{roman[index]}</span>{part.title[locale]}</h2><ol>{entries.map(chapter => <li key={chapter.id}>{available.includes(chapter.id) ? <Link href={`${base}/${chapter.id}`} aria-current={current === chapter.id ? "page" : undefined} onClick={() => setOpen(false)}>{chapter.title[locale]}{current === chapter.id && <Icon name="chevronRight" />}</Link> : <span className={styles.planned}>{chapter.title[locale]}<small>{en ? "Planned" : "En preparación"}</small></span>}</li>)}</ol></div>;
        })}</nav>
        {query && !catalog.parts.some(part => part.chapters.some(chapter => `${chapter.title[locale]} ${part.title[locale]}`.toLowerCase().includes(query.toLowerCase()))) && <p className={styles.empty}>{en ? "No chapters found." : "No hay capítulos para esta búsqueda."}</p>}
        <div className={styles.indexFooter}><Icon name="book" /><span>{en ? "Beginner to advanced" : "De principiante a avanzado"}</span></div>
      </aside>
      <main id="book-content" className={styles.main}>{children}</main>
    </div>
    <footer className={styles.footer}><strong>Aulafy</strong><span>{en ? "Open learning. No cookies or account." : "Aprendizaje abierto. Sin cookies ni cuenta."}</span><a href="https://github.com/aulafy/claude" target="_blank" rel="noreferrer">MIT <Icon name="external" /></a></footer>
  </div>;
}
