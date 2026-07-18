"use client";

import { useMemo, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { lecciones, type Curso } from "@/lib/cursos";
import type { Locale } from "@/lib/i18n";
import { createProgressBackup, normalizeProgress, readProgress, writeProgress } from "@/lib/progress";
import { pluralLabel } from "@/lib/plural";

const copy = {
  es: {
    title: "Guardar, trasladar o reiniciar el progreso",
    body: "Tu avance se guarda en este navegador y no se envía a Aulafy. Si borras los datos del navegador o cambias de equipo sin importarlo, no podremos recuperarlo. Exporta un JSON para conservarlo o trasladarlo.",
    backupHint: "Si este curso te importa, descarga una copia después de cada módulo o antes de limpiar el navegador.",
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
    title: "Save, move, or reset progress",
    body: "Your progress stays in this browser and is never sent to Aulafy. If you clear browser data or change devices without importing it, we cannot recover it. Export JSON to keep or move it.",
    backupHint: "If this course matters to you, download a copy after each module or before clearing browser data.",
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
    <details id={`progress-${course.slug}`} className="aula-disclosure aula-panel mt-8 scroll-mt-24" aria-labelledby={`portable-progress-${course.slug}`}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6">
        <span>
          <span className="aula-section-label"><Icon name="save" /> progreso privado y portable</span>
          <strong id={`portable-progress-${course.slug}`} className="mt-2 block font-display text-lg text-white">{text.title}</strong>
          <span className="aula-meta mt-2 block text-zinc-500">
            {done}/{allLessons.length} {locale === "en" ? pluralLabel(allLessons.length, "lesson", "en").replace(/^\d+ /, "") : pluralLabel(allLessons.length, "lesson").replace(/^\d+ /, "")} {text.done}
          </span>
        </span>
        <Icon name="chevronRight" className="aula-disclosure-icon text-zinc-500" />
      </summary>
      <div className="border-t border-zinc-800 p-5 sm:p-6">
        <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">{text.body}</p>
        <p className="mt-3 flex max-w-2xl gap-2 text-sm leading-relaxed text-amber-200"><Icon name="warning" className="mt-0.5 shrink-0" /> {text.backupHint}</p>
        {message && <p className="mt-3 text-sm text-emerald-300" role="status">{message}</p>}
        <div className="mt-5 flex flex-wrap gap-2">
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
    </details>
  );
}
