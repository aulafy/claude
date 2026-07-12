"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { getCurso, lecciones } from "@/lib/cursos";
import type { Locale } from "@/lib/i18n";
import { readProgress } from "@/lib/progress";

export default function ContinuarCurso({ cursoSlug, locale = "es" }: { cursoSlug: string; locale?: Locale }) {
  const curso = getCurso(cursoSlug);
  const [state, setState] = useState<{ done: number; next: string } | null>(null);

  useEffect(() => {
    if (!curso) return;
    try {
      const progress = readProgress();
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
  const href = locale === "en"
    ? `/en/courses/${curso.slug}/${state?.next ?? first}`
    : `/cursos/${curso.slug}/${state?.next ?? first}`;
  const label = locale === "en"
    ? empezado ? `Continue (${state!.done} completed)` : "Start course"
    : empezado ? `Continuar (${state!.done} completadas)` : "Empezar el curso";

  return (
    <Link
      href={href}
      className="aula-button aula-button-primary"
    >
      <Icon name={empezado ? "route" : "rocket"} />
      {label}
    </Link>
  );
}
