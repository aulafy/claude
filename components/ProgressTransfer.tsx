"use client";

import { useRef, useState, type ChangeEvent } from "react";
import Icon from "@/components/Icon";
import {
  createLearningProgressExport,
  mergeLearningProgress,
  parseLearningProgressExport,
  readLearningProgress,
  replaceLearningProgress,
  type LearningProgressExport,
} from "@/lib/learning-progress";

const MAX_IMPORT_BYTES = 64 * 1024;

const copy = {
  es: {
    summary: "Llevar mi progreso a otro navegador",
    body: "Descarga un archivo JSON o restaura uno anterior. Contiene tu ruta, progreso, días activos y las evidencias que decidiste guardar; no incluye respuestas temporales, búsquedas ni contadores.",
    download: "Descargar progreso", choose: "Elegir archivo", none: "Todavía no hay progreso local que descargar.",
    invalid: "El archivo no es un progreso válido de Aulafy o usa una versión incompatible.", large: "El archivo supera el límite de 64 KB.", read: "No se pudo leer el archivo.",
    preview: "Vista previa antes de importar", last: "Último punto", chosen: "Ruta elegida", started: "Misiones iniciadas", completed: "Pasos completados", saved: "Elementos guardados", evidence: "Evidencias", exported: "Exportado", combine: "Combinar", replace: "Reemplazar", cancel: "Cancelar",
    combined: "Progreso combinado correctamente.", replaced: "Progreso reemplazado correctamente.",
  },
  en: {
    summary: "Move my progress to another browser",
    body: "Download a JSON file or restore an earlier one. It contains your path, progress, active days, and evidence you chose to save, not temporary answers, searches, or counters.",
    download: "Download progress", choose: "Choose file", none: "There is no local progress to download yet.",
    invalid: "This is not a valid Aulafy progress file or it uses an incompatible version.", large: "The file exceeds the 64 KB limit.", read: "The file could not be read.",
    preview: "Preview before importing", last: "Last point", chosen: "Chosen path", started: "Missions started", completed: "Completed steps", saved: "Saved items", evidence: "Evidence", exported: "Exported", combine: "Combine", replace: "Replace", cancel: "Cancel",
    combined: "Progress combined successfully.", replaced: "Progress replaced successfully.",
  },
};

export default function ProgressTransfer({ locale = "es" }: { locale?: "es" | "en" }) {
  const text = copy[locale];
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<LearningProgressExport | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  function download() {
    const progress = readLearningProgress();
    if (!progress) {
      setError(true); setMessage(text.none); return;
    }
    const document = createLearningProgressExport(progress);
    const blob = new Blob([`${JSON.stringify(document, null, 2)}\n`], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = window.document.createElement("a");
    anchor.href = url;
    anchor.download = `aulafy-progress-${document.exportedAt.slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setError(false); setMessage("");
  }

  async function chooseFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setPreview(null); setMessage(""); setError(false);
    if (!file) return;
    if (file.size > MAX_IMPORT_BYTES) {
      setError(true); setMessage(text.large); event.target.value = ""; return;
    }
    try {
      const parsed = parseLearningProgressExport(JSON.parse(await file.text()));
      if (!parsed) {
        setError(true); setMessage(text.invalid); event.target.value = ""; return;
      }
      setPreview(parsed);
    } catch {
      setError(true); setMessage(text.read); event.target.value = "";
    }
  }

  function finish(mode: "combine" | "replace") {
    if (!preview) return;
    const next = mode === "combine" ? mergeLearningProgress(readLearningProgress(), preview.progress) : preview.progress;
    if (!replaceLearningProgress(next)) {
      setError(true); setMessage(text.invalid); return;
    }
    setPreview(null); setError(false); setMessage(mode === "combine" ? text.combined : text.replaced);
    if (inputRef.current) inputRef.current.value = "";
  }

  function cancel() {
    setPreview(null); setMessage(""); setError(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <details className="aula-panel mt-5 p-5 sm:p-6">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-bold text-white">
        <span><Icon name="download" className="mr-2 text-cyan-300" /> {text.summary}</span><Icon name="chevronRight" className="aula-disclosure-icon text-zinc-500" />
      </summary>
      <div className="mt-5 border-t border-zinc-800 pt-5">
        <p className="max-w-3xl text-sm leading-relaxed text-zinc-400">{text.body}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={download} className="aula-button aula-button-secondary"><Icon name="download" /> {text.download}</button>
          <label className="aula-button aula-button-secondary cursor-pointer"><Icon name="upload" /> {text.choose}<input ref={inputRef} type="file" accept="application/json,.json" onChange={chooseFile} className="sr-only" /></label>
        </div>
        {message && <p role={error ? "alert" : "status"} className={`mt-4 text-sm ${error ? "text-amber-300" : "text-emerald-300"}`}>{message}</p>}
        {preview && <section className="mt-5 rounded-md border border-cyan-400/30 bg-cyan-400/5 p-4" aria-labelledby="progress-import-preview">
          <h3 id="progress-import-preview" className="font-display font-bold text-white">{text.preview}</h3>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <div><dt className="aula-meta text-zinc-500">{text.last}</dt><dd className="mt-1 text-zinc-200">{preview.progress.courseTitle}: {preview.progress.title}</dd></div>
            <div><dt className="aula-meta text-zinc-500">{text.completed}</dt><dd className="mt-1 text-zinc-200">{preview.progress.completedLessons.length}</dd></div>
            <div><dt className="aula-meta text-zinc-500">{text.started}</dt><dd className="mt-1 text-zinc-200">{preview.progress.startedLessons.length}</dd></div>
            <div><dt className="aula-meta text-zinc-500">{text.saved}</dt><dd className="mt-1 text-zinc-200">{preview.progress.savedItems.length}</dd></div>
            <div><dt className="aula-meta text-zinc-500">{text.evidence}</dt><dd className="mt-1 text-zinc-200">{preview.progress.evidenceItems.length}</dd></div>
            <div><dt className="aula-meta text-zinc-500">{text.chosen}</dt><dd className="mt-1 text-zinc-200">{preview.progress.selectedPath?.title ?? "—"}</dd></div>
            <div><dt className="aula-meta text-zinc-500">{text.exported}</dt><dd className="mt-1 text-zinc-200">{new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "es-ES", { dateStyle: "medium" }).format(new Date(preview.exportedAt))}</dd></div>
          </dl>
          <div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={() => finish("combine")} className="aula-button aula-button-primary"><Icon name="recycle" /> {text.combine}</button><button type="button" onClick={() => finish("replace")} className="aula-button aula-button-secondary"><Icon name="refresh" /> {text.replace}</button><button type="button" onClick={cancel} className="aula-button aula-button-secondary"><Icon name="close" /> {text.cancel}</button></div>
        </section>}
      </div>
    </details>
  );
}
