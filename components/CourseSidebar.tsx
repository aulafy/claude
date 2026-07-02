"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getCurso, lecciones } from "@/lib/cursos";
import Icon from "@/components/Icon";
import Search from "@/components/Search";
import ThemeToggle from "@/components/ThemeToggle";

const STORAGE_KEY = "aulafy:progress:v1";

type Progress = Record<string, string[]>;

function readProgress(): Progress {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Progress;
  } catch {
    return {};
  }
}

export default function CourseSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [visited, setVisited] = useState<string[]>([]);

  // /cursos/<curso>/<leccion>
  const [, , cursoSlug, leccionSlug] = pathname.split("/");
  const curso = getCurso(cursoSlug ?? "");

  // Marca la lección actual como visitada y sincroniza estado.
  useEffect(() => {
    if (!curso || !leccionSlug) return;
    const progress = readProgress();
    const set = new Set(progress[curso.slug] ?? []);
    set.add(leccionSlug);
    progress[curso.slug] = [...set];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      /* almacenamiento no disponible */
    }
    const frame = window.requestAnimationFrame(() => setVisited(progress[curso.slug]));
    return () => window.cancelAnimationFrame(frame);
  }, [curso, leccionSlug]);

  const { total, done, pct } = useMemo(() => {
    if (!curso) return { total: 0, done: 0, pct: 0 };
    const all = lecciones(curso).map((l) => l.slug);
    const doneCount = all.filter((s) => visited.includes(s)).length;
    return {
      total: all.length,
      done: doneCount,
      pct: all.length ? Math.round((doneCount / all.length) * 100) : 0,
    };
  }, [curso, visited]);

  if (!curso) return null;

  return (
    <>
      {/* Botón móvil */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-3 left-3 z-50 w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200"
        aria-label="Menú del curso"
      >
        <Icon name={open ? "close" : "menu"} />
      </button>

      {open && (
        <div onClick={() => setOpen(false)} className="md:hidden fixed inset-0 bg-black/60 z-40" />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-[280px] flex flex-col border-r border-zinc-800 bg-zinc-950 z-40 transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Cabecera del curso */}
        <div className="px-5 py-4 border-b border-zinc-800">
          <Link
            href="/cursos"
            onClick={() => setOpen(false)}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors inline-flex items-center gap-1.5 mb-2"
          >
            ← Todos los cursos
          </Link>
          <Link href={`/cursos/${curso.slug}`} onClick={() => setOpen(false)} className="block">
            <div className="text-sm font-semibold text-white leading-snug">{curso.title}</div>
          </Link>
          {/* Progreso */}
          <div className="mt-3" aria-label={`Progreso: ${done} de ${total} lecciones`}>
            <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1">
              <span>{done}/{total} lecciones</span>
              <span>{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee] transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="px-3 pt-3">
          <Search />
        </div>

        {/* Lecciones */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {curso.secciones.map((seccion, seccionIndex) => {
            const start = curso.secciones
              .slice(0, seccionIndex)
              .reduce((sum, item) => sum + item.lecciones.length, 0);

            return (
              <div key={seccion.title} className="mb-5">
                <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                  {seccion.title}
                </p>
                {seccion.lecciones.map((l, leccionIndex) => {
                  const n = start + leccionIndex + 1;
                  const href = `/cursos/${curso.slug}/${l.slug}`;
                  const active = pathname === href;
                  const isDone = visited.includes(l.slug);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm mb-0.5 transition-colors ${
                        active
                          ? "bg-orange-500/15 text-orange-400 font-medium"
                          : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 w-5 h-5 rounded-full border text-[10px] flex items-center justify-center ${
                          isDone
                            ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-400"
                            : "border-zinc-700 text-zinc-500"
                        }`}
                        aria-hidden="true"
                      >
                        {isDone ? <Icon name="check" /> : n}
                      </span>
                      <span className="leading-snug">{l.title}</span>
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
              className="text-xs text-zinc-500 hover:text-orange-400 transition-colors inline-flex items-center gap-1.5"
            >
              <Icon name="pdf" /> Descargar PDF
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
