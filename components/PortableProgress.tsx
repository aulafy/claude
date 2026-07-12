"use client";

import { useMemo, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { lecciones, type Curso } from "@/lib/cursos";
import type { Locale } from "@/lib/i18n";
import { createProgressBackup, normalizeProgress, readProgress, writeProgress } from "@/lib/progress";
import { pluralLabel } from "@/lib/plural";

const copy = {
  es: {
    title: "Progreso portable",
    body: "Tu avance sigue en este navegador. Puedes llevarlo a otro equipo con un JSON, imprimir un resumen o reiniciar este curso.",
    export: "Exportar JSON",
    import: "Importar",
    print: "Imprimir resumen",
    reset: "Reiniciar curso",
    done: "completadas",
    imported: "Progreso importado.",
    resetDone: "Curso reiniciado.",
    invalid: "No he podido leer ese JSON de progreso.",
    backupName: "aulafy-progreso",
  },
  en: {
    title: "Portable progress",
    body: "Your progress stays in this browser. Export it as JSON, move it to another machine, print a summary, or reset this course.",
    export: "Export JSON",
    import: "Import",
    print: "Print summary",
    reset: "Reset course",
    done: "completed",
    imported: "Progress imported.",
    resetDone: "Course reset.",
    invalid: "I could not read that progress JSON.",
    backupName: "aulafy-progress",
  },
} satisfies Record<Locale, Record<string, string>>;

export default function PortableProgress({ course, locale = "es" }: { course: Curso; locale?: Locale }) {
  const text = copy[locale];
  const inputRef = useRef<HTMLInputElement>(null);
  const allLessons = useMemo(() => lecciones(course), [course]);
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(() => readProgress()[course.slug]?.length ?? 0);

  function refresh() {
    setDone(readProgress()[course.slug]?.length ?? 0);
  }

  function exportProgress() {
    const backup = createProgressBackup(readProgress());
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${text.backupName}-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function importProgress(file: File) {
    try {
      const parsed = JSON.parse(await file.text());
      const next = normalizeProgress(parsed);
      writeProgress({ ...readProgress(), ...next });
      refresh();
      setMessage(text.imported);
    } catch {
      setMessage(text.invalid);
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function resetCourse() {
    const progress = readProgress();
    delete progress[course.slug];
    writeProgress(progress);
    refresh();
    setMessage(text.resetDone);
  }

  function printSummary() {
    window.print();
  }

  return (
    <section className="aula-panel p-6 sm:p-8 mt-8" aria-labelledby={`portable-progress-${course.slug}`}>
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <div className="flex-1">
          <span className="aula-section-label"><Icon name="save" /> local-first</span>
          <h2 id={`portable-progress-${course.slug}`} className="font-display text-2xl font-bold text-white mt-3">
            {text.title}
          </h2>
          <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-2xl">{text.body}</p>
          <p className="mt-4 aula-meta text-zinc-500">
            {done}/{allLessons.length} {locale === "en" ? pluralLabel(allLessons.length, "lesson", "en").replace(/^\d+ /, "") : pluralLabel(allLessons.length, "lesson").replace(/^\d+ /, "")} {text.done}
          </p>
          {message && <p className="mt-3 text-sm text-emerald-300" role="status">{message}</p>}
        </div>

        <div className="flex flex-wrap lg:justify-end gap-2">
          <button type="button" onClick={exportProgress} className="aula-button aula-button-secondary">
            <Icon name="download" /> {text.export}
          </button>
          <button type="button" onClick={() => inputRef.current?.click()} className="aula-button aula-button-secondary">
            <Icon name="upload" /> {text.import}
          </button>
          <button type="button" onClick={printSummary} className="aula-button aula-button-secondary">
            <Icon name="printer" /> {text.print}
          </button>
          <button type="button" onClick={resetCourse} className="aula-button aula-button-secondary">
            <Icon name="refresh" /> {text.reset}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            aria-label={text.import}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void importProgress(file);
            }}
          />
        </div>
      </div>
    </section>
  );
}
