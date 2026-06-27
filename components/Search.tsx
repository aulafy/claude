"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchData, type SearchItem } from "@/lib/search-data";

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

export default function Search() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Abrir con Cmd/Ctrl+K
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchData.slice(0, 8);
    return searchData
      .map((item) => ({ item, s: score(item, q) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8)
      .map((r) => r.item);
  }, [query]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  function go(href: string) {
    setOpen(false);
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

  return (
    <>
      {/* Disparador en el sidebar */}
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900/50 text-sm text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 transition-colors"
      >
        <span>🔍</span>
        <span className="flex-1 text-left">Buscar...</span>
        <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-400">⌘K</kbd>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4 bg-black/60"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 border-b border-zinc-800">
              <span className="text-zinc-500">🔍</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Buscar en la guía..."
                className="flex-1 bg-transparent py-3.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
              />
              <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-500">esc</kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto py-2">
              {results.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-zinc-500">
                  Sin resultados para &ldquo;{query}&rdquo;
                </p>
              ) : (
                results.map((r, i) => (
                  <button
                    key={r.href}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r.href)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors ${
                      i === active ? "bg-orange-500/15" : "hover:bg-zinc-800/50"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className={`text-sm font-medium ${i === active ? "text-orange-400" : "text-zinc-200"}`}>
                        {r.title}
                      </div>
                      <div className="text-xs text-zinc-500">{r.section}</div>
                    </div>
                    <span className="text-zinc-600 text-xs">↵</span>
                  </button>
                ))
              )}
            </div>

            <div className="px-4 py-2 border-t border-zinc-800 flex items-center gap-3 text-[11px] text-zinc-600">
              <span><kbd className="px-1 rounded bg-zinc-800 border border-zinc-700">↑</kbd> <kbd className="px-1 rounded bg-zinc-800 border border-zinc-700">↓</kbd> navegar</span>
              <span><kbd className="px-1 rounded bg-zinc-800 border border-zinc-700">↵</kbd> abrir</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
