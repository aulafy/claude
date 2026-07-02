"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurso, lecciones } from "@/lib/cursos";

const STORAGE_KEY = "aulafy:progress:v1";

export default function ContinuarCurso({ cursoSlug }: { cursoSlug: string }) {
  const curso = getCurso(cursoSlug);
  const [state, setState] = useState<{ done: number; next: string } | null>(null);

  useEffect(() => {
    if (!curso) return;
    try {
      const progress = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Record<string, string[]>;
      const visited = new Set(progress[curso.slug] ?? []);
      const all = lecciones(curso);
      const next = all.find((l) => !visited.has(l.slug)) ?? all[0];
      const frame = window.requestAnimationFrame(() => {
        setState({ done: all.filter((l) => visited.has(l.slug)).length, next: next.slug });
      });
      return () => window.cancelAnimationFrame(frame);
    } catch {
      /* sin almacenamiento */
    }
  }, [curso]);

  if (!curso) return null;
  const first = lecciones(curso)[0].slug;
  const empezado = (state?.done ?? 0) > 0;

  return (
    <Link
      href={`/cursos/${curso.slug}/${state?.next ?? first}`}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-[#8b5cf6] to-[#e879f9] hover:opacity-90 transition-opacity"
    >
      {empezado ? `Continuar (${state!.done} completadas) →` : "Empezar el curso →"}
    </Link>
  );
}
