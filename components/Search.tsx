"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { searchData, type SearchItem } from "@/lib/search-data";
import { getEnglishLessonTitle } from "@/lib/english-lessons";
import { pathForLocale, type Locale } from "@/lib/i18n";

const copy = {
  es: { open: "Buscar...", label: "Buscar en la guía", placeholder: "Buscar en la guía...", empty: "Sin resultados para", navigate: "navegar", openResult: "abrir", close: "Cerrar búsqueda" },
  en: { open: "Search...", label: "Search lessons", placeholder: "Search lessons...", empty: "No results for", navigate: "navigate", openResult: "open", close: "Close search" },
} satisfies Record<Locale, Record<string, string>>;

function localizedSearchData(locale: Locale): SearchItem[] {
  if (locale === "es") return searchData;
  return searchData.map((item) => {
    const parts = item.href.split("/").filter(Boolean);
    const [section, courseSlug, lessonSlug] = parts;
    const title = section === "cursos" && courseSlug && lessonSlug
      ? getEnglishLessonTitle(courseSlug, lessonSlug, item.title)
      : item.title;
    return { ...item, title, section: "Course lessons", href: pathForLocale(item.href, "en") };
  });
}

function score(item: SearchItem, q: string): number {
  const hay = `${item.title} ${item.section} ${item.keywords}`.toLowerCase();
  const title = item.title.toLowerCase();
  if (title === q) return 100;
  if (title.startsWith(q)) return 80;
  if (title.includes(q)) return 60;
  if (hay.includes(q)) return 40;
  // coincidencia por palabras sueltas
  const words = q.split(/\s+/).filter(Boolean);
  if (words.length && words.every((w) => hay.includes(w))) return 20;
  return 0;
}

export default function Search({ locale = "es" }: { locale?: Locale }) {
  const router = useRouter();
  const text = copy[locale];
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const items = useMemo(() => localizedSearchData(locale), [locale]);

  function openSearch() {
    setQuery("");
    setActive(0);
    setOpen(true);
  }

  function closeSearch() {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  // Abrir con Cmd/Ctrl+K
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) closeSearch();
        else openSearch();
      }
      if (e.key === "Escape") closeSearch();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 8);
    return items
      .map((item) => ({ item, s: score(item, q) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8)
      .map((r) => r.item);
  }, [items, query]);

  function go(href: string) {
    closeSearch();
    router.push(href);
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[active];
      if (r) go(r.href);
    }
  }

  function trapFocus(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Tab") return;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), input, a[href]");
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      {/* Disparador en el sidebar */}
      <button
        onClick={openSearch}
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="aulafy-search-dialog"
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900/50 text-sm text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 transition-colors"
      >
        <Icon name="search" />
        <span className="flex-1 text-left">{text.open}</span>
        <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-400">⌘/Ctrl K</kbd>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4 bg-black/60"
          onClick={closeSearch}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={text.label}
            id="aulafy-search-dialog"
            ref={dialogRef}
            onKeyDown={trapFocus}
            className="w-full max-w-lg rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 border-b border-zinc-800">
              <Icon name="search" className="text-zinc-500" />
              <input
                ref={inputRef}
                value={query}
                aria-label={text.label}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKey}
                placeholder={text.placeholder}
                className="flex-1 bg-transparent py-3.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
              />
              <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-500">esc</kbd>
              <button
                type="button"
                onClick={closeSearch}
                aria-label={text.close}
                className="sr-only"
              >
                {text.close}
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto py-2">
              {results.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-zinc-500">
                  {text.empty} &ldquo;{query}&rdquo;
                </p>
              ) : (
                results.map((r, i) => (
                  <button
                    key={r.href}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r.href)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors ${
                      i === active ? "bg-violet-500/15" : "hover:bg-zinc-800/50"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className={`text-sm font-medium ${i === active ? "text-violet-400" : "text-zinc-200"}`}>
                        {r.title}
                      </div>
                      <div className="text-xs text-zinc-500">{r.section}</div>
                    </div>
                    <Icon name="chevronRight" className="text-zinc-600 text-xs" />
                  </button>
                ))
              )}
            </div>

            <div className="px-4 py-2 border-t border-zinc-800 flex items-center gap-3 text-[11px] text-zinc-600">
              <span><kbd className="px-1 rounded bg-zinc-800 border border-zinc-700">↑</kbd> <kbd className="px-1 rounded bg-zinc-800 border border-zinc-700">↓</kbd> {text.navigate}</span>
              <span><kbd className="px-1 rounded bg-zinc-800 border border-zinc-700">↵</kbd> {text.openResult}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
