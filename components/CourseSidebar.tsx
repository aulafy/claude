"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getCurso, lecciones } from "@/lib/cursos";
import { getEnglishLessonTitle } from "@/lib/english-lessons";
import { getLocalizedCurso, type Locale } from "@/lib/i18n";
import Icon from "@/components/Icon";
import ThemeToggle from "@/components/ThemeToggle";
import BrandMark from "@/components/BrandMark";

const copy = {
  es: { allCourses: "Cursos", privacy: "Sin cuenta ni seguimiento", download: "PDF", menu: "Abrir curso", lessons: "lecciones", current: "Estás aquí", index: "Ver índice completo", previous: "Anterior", next: "Siguiente" },
  en: { allCourses: "Courses", privacy: "No account or tracking", download: "PDF", menu: "Open course", lessons: "lessons", current: "You are here", index: "View full index", previous: "Previous", next: "Next" },
} satisfies Record<Locale, Record<string, string>>;

export default function CourseSidebar({ locale = "es" }: { locale?: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const text = copy[locale];
  const parts = pathname.split("/");
  const cursoSlug = locale === "en" ? parts[3] : parts[2];
  const lessonSlug = locale === "en" ? parts[4] : parts[3];
  const sourceCurso = getCurso(cursoSlug ?? "");
  const curso = getLocalizedCurso(cursoSlug ?? "", locale);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!open || !isMobile) return;
    sidebarRef.current?.querySelector<HTMLElement>("a, button, summary")?.focus();
  }, [isMobile, open]);

  if (!curso || !sourceCurso) return null;

  const flatLessons = lecciones(sourceCurso);
  const total = flatLessons.length;
  const currentIndex = Math.max(0, flatLessons.findIndex((lesson) => lesson.slug === lessonSlug));
  const current = flatLessons[currentIndex];
  const previous = currentIndex > 0 ? flatLessons[currentIndex - 1] : null;
  const next = currentIndex < total - 1 ? flatLessons[currentIndex + 1] : null;
  const localizedTitle = (slug: string, fallback: string) => locale === "en" ? getEnglishLessonTitle(curso.slug, slug, fallback) : fallback;
  const lessonHref = (slug: string) => locale === "en" ? `/en/courses/${cursoSlug}/${slug}` : `/cursos/${cursoSlug}/${slug}`;
  const closeMenu = () => { setOpen(false); menuButtonRef.current?.focus(); };

  return (
    <>
      <button
        onClick={() => setOpen((value) => !value)}
        ref={menuButtonRef}
        className="md:hidden fixed top-3 left-3 z-50 min-w-11 h-10 px-3 rounded-lg bg-[var(--panel)] border border-[var(--border)] flex items-center gap-2 justify-center text-[var(--text)] shadow-xl"
        aria-label={text.menu}
        aria-expanded={open}
        aria-controls="course-sidebar"
      >
        <Icon name={open ? "close" : "menu"} /><span className="text-xs">{open ? "" : `${currentIndex + 1}/${total}`}</span>
      </button>

      {open ? <div onClick={closeMenu} className="md:hidden fixed inset-0 bg-black/25 z-40" /> : null}

      <aside
        id="course-sidebar"
        ref={sidebarRef}
        aria-hidden={isMobile && !open ? true : undefined}
        inert={isMobile && !open ? true : undefined}
        className={`fixed top-0 left-0 h-screen w-[252px] flex flex-col border-r border-[var(--border)] bg-[var(--sidebar-bg)] z-40 transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <Link href={locale === "en" ? "/en/courses" : "/cursos"} onClick={closeMenu} className="aula-meta hover:text-[var(--accent)] inline-flex items-center gap-1.5 mb-4">← {text.allCourses}</Link>
          <div className="flex items-start gap-2.5">
            <BrandMark className="mt-0.5 h-7 w-7 flex-none text-[var(--accent)]" />
            <Link href={locale === "en" ? `/en/courses/${curso.slug}` : `/cursos/${curso.slug}`} onClick={() => setOpen(false)} className="block font-display text-sm font-semibold text-[var(--text)] leading-snug">{curso.title}</Link>
          </div>
          <p className="mt-2 aula-meta text-[var(--signal-green)]"><Icon name="shield" /> {text.privacy}</p>
        </div>

        <div className="px-5 py-5 border-b border-[var(--border)]">
          <div className="flex items-center justify-between aula-meta"><span>{text.current}</span><span>{currentIndex + 1}/{total}</span></div>
          <div className="h-1.5 bg-[var(--bg-depth)] rounded-full overflow-hidden my-3" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={currentIndex + 1} aria-label={`${currentIndex + 1} / ${total}`}>
            <span className="block h-full bg-[var(--accent)]" style={{ width: `${((currentIndex + 1) / total) * 100}%` }} />
          </div>
          <strong className="block text-sm text-[var(--text)] leading-snug">{current ? localizedTitle(current.slug, current.title) : curso.title}</strong>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {previous ? <Link href={lessonHref(previous.slug)} onClick={() => setOpen(false)} className="rounded-md border border-[var(--border)] px-2 py-2 text-xs text-[var(--muted)] hover:text-[var(--accent)]">← {text.previous}</Link> : <span />}
            {next ? <Link href={lessonHref(next.slug)} onClick={() => setOpen(false)} className="rounded-md border border-[var(--border)] px-2 py-2 text-xs text-[var(--text)] hover:text-[var(--accent)] text-right">{text.next} →</Link> : null}
          </div>
        </div>

        <details className="flex-1 min-h-0 overflow-y-auto group">
          <summary className="sticky top-0 cursor-pointer list-none px-5 py-4 bg-[var(--sidebar-bg)] border-b border-[var(--border)] text-sm font-medium text-[var(--text)] flex justify-between items-center">
            <span>{text.index}</span><span className="group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
          </summary>
          <nav className="py-4 px-3" aria-label={text.index}>
            {curso.secciones.map((section, sectionIndex) => {
              const start = curso.secciones.slice(0, sectionIndex).reduce((sum, item) => sum + item.lecciones.length, 0);
              return (
                <div key={section.title} className="mb-5">
                  <p className="px-3 mb-2 aula-section-label">{section.title}</p>
                  {section.lecciones.map((lesson, lessonIndex) => {
                    const number = start + lessonIndex + 1;
                    const href = lessonHref(lesson.slug);
                    const active = pathname === href;
                    return (
                      <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={active ? "page" : undefined} className={`flex gap-2.5 px-3 py-2 rounded-md text-xs mb-1 border ${active ? "border-[var(--accent)] bg-[var(--surface)] text-[var(--accent)]" : "border-transparent text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]"}`}>
                        <span className="flex-shrink-0 text-[10px] text-[var(--muted)]" aria-hidden="true">{number}</span>
                        <span className="leading-snug">{localizedTitle(lesson.slug, lesson.title)}</span>
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </nav>
        </details>

        <div className="px-5 py-3 border-t border-[var(--border)] flex items-center justify-between">
          {curso.pdf ? <a href={curso.pdf} className="aula-meta hover:text-[var(--accent)]"><Icon name="pdf" /> {text.download}</a> : <span />}
          <ThemeToggle compact />
        </div>
      </aside>
    </>
  );
}
