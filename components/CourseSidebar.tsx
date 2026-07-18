"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getCurso, lecciones } from "@/lib/cursos";
import { getEnglishLessonTitle } from "@/lib/english-lessons";
import { getLocalizedCurso, type Locale } from "@/lib/i18n";
import Icon from "@/components/Icon";
import Search from "@/components/Search";
import ThemeToggle from "@/components/ThemeToggle";

const copy = {
  es: {
    allCourses: "Todos los cursos", course: "cápsula", privacy: "Sin cuenta · sin seguimiento",
    download: "Descargar PDF", menu: "Menú del curso", lessons: "lecciones",
  },
  en: {
    allCourses: "All courses", course: "capsule", privacy: "No account · no tracking",
    download: "Download Spanish PDF", menu: "Course menu", lessons: "lessons",
  },
} satisfies Record<Locale, Record<string, string>>;

export default function CourseSidebar({ locale = "es" }: { locale?: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const text = copy[locale];

  // /cursos/<curso>/<leccion>
  const parts = pathname.split("/");
  const cursoSlug = locale === "en" ? parts[3] : parts[2];
  const sourceCurso = getCurso(cursoSlug ?? "");
  const curso = getLocalizedCurso(cursoSlug ?? "", locale);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const allLessons = sourceCurso ? lecciones(sourceCurso).map((lesson) => lesson.slug) : [];
  const total = allLessons.length;

  function lessonHref(slug: string) {
    return locale === "en" ? `/en/courses/${cursoSlug}/${slug}` : `/cursos/${cursoSlug}/${slug}`;
  }

  useEffect(() => {
    if (!open || !isMobile) return;
    const firstFocusable = sidebarRef.current?.querySelector<HTMLElement>("a, button, input");
    firstFocusable?.focus();
  }, [isMobile, open]);

  if (!curso || !sourceCurso) return null;

  return (
    <>
      {/* Botón móvil */}
      <button
        onClick={() => setOpen((value) => !value)}
        ref={menuButtonRef}
        className="md:hidden fixed top-3 left-3 z-50 w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-200 shadow-xl"
        aria-label={text.menu}
        aria-expanded={open}
        aria-controls="course-sidebar"
      >
        <Icon name={open ? "close" : "menu"} />
      </button>

      {open && (
        <div onClick={() => setOpen(false)} className="md:hidden fixed inset-0 bg-black/60 z-40" />
      )}

      <aside
        id="course-sidebar"
        ref={sidebarRef}
        aria-hidden={isMobile && !open ? true : undefined}
        inert={isMobile && !open ? true : undefined}
        className={`fixed top-0 left-0 h-screen w-[280px] flex flex-col border-r border-zinc-800 bg-zinc-950/96 backdrop-blur-xl z-40 transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Cabecera del curso */}
        <div className="px-5 py-4 border-b border-zinc-800">
          <Link
            href={locale === "en" ? "/en/courses" : "/cursos"}
            onClick={() => { setOpen(false); menuButtonRef.current?.focus(); }}
            className="aula-meta hover:text-zinc-300 transition-colors inline-flex items-center gap-1.5 mb-3"
          >
            ← {text.allCourses}
          </Link>
          <Link href={locale === "en" ? `/en/courses/${curso.slug}` : `/cursos/${curso.slug}`} onClick={() => setOpen(false)} className="block">
            <div className="font-display text-sm font-semibold text-white leading-snug">{curso.title}</div>
            <div className="aula-meta mt-1 text-zinc-600">{text.course}/{curso.slug}</div>
          </Link>
          <p className="mt-3 aula-meta text-emerald-300"><Icon name="shield" /> {text.privacy}</p>
          <p className="mt-1 aula-meta text-zinc-600">{total} {text.lessons}</p>
        </div>

        <div className="px-3 pt-3">
          <Search locale={locale} />
        </div>

        {/* Lecciones */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {curso.secciones.map((seccion, seccionIndex) => {
            const start = curso.secciones
              .slice(0, seccionIndex)
              .reduce((sum, item) => sum + item.lecciones.length, 0);

            return (
              <div key={seccion.title} className="mb-5">
                <p className="px-3 mb-2 aula-section-label text-zinc-600">
                  {seccion.title}
                </p>
                {seccion.lecciones.map((l, leccionIndex) => {
                  const n = start + leccionIndex + 1;
                  const href = lessonHref(l.slug);
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm mb-1 border transition-colors ${
                        active
                          ? "border-violet-500/35 bg-violet-500/15 text-fuchsia-300 font-medium"
                          : "border-transparent text-zinc-400 hover:text-zinc-100 hover:border-zinc-800 hover:bg-zinc-900/70"
                      }`}
                    >
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-md border border-zinc-700 text-zinc-500 text-[10px] flex items-center justify-center font-[family-name:var(--font-code)]"
                        aria-hidden="true"
                      >
                        {n}
                      </span>
                      <span className="leading-snug">{locale === "en" ? getEnglishLessonTitle(curso.slug, l.slug, l.title) : l.title}</span>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* Pie del sidebar */}
        <div className="px-5 py-3 border-t border-zinc-800 flex items-center justify-between">
          {curso.pdf ? (
            <a
              href={curso.pdf}
              className="aula-meta hover:text-fuchsia-300 transition-colors inline-flex items-center gap-1.5"
            >
              <Icon name="pdf" /> {text.download}
            </a>
          ) : (
            <span />
          )}
          <ThemeToggle compact />
        </div>
      </aside>
    </>
  );
}
