"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import Icon from "@/components/Icon";
import type { BookLocale, ChapterMetadata } from "@/lib/living-book/schema";
import styles from "./Book.module.css";

const KEY = "aulafy-living-book:progress:v1";
const EVENT = "aulafy-book-progress";
function subscribe(callback: () => void) { window.addEventListener("storage", callback); window.addEventListener(EVENT, callback); return () => { window.removeEventListener("storage", callback); window.removeEventListener(EVENT, callback); }; }
function snapshot() { try { return window.localStorage.getItem(KEY) || ""; } catch { return ""; } }
function parseProgress(value: string): Record<string, string> { try { const data = JSON.parse(value); if (!data || typeof data !== "object" || Array.isArray(data)) return {}; return Object.fromEntries(Object.entries(data).filter(([key, hash]) => /^[a-z0-9-]+:(es|en)$/.test(key) && typeof hash === "string" && /^[a-f0-9]{64}$/.test(hash)).slice(0, 1000)) as Record<string, string>; } catch { return {}; } }

export function ReaderTools({ locale, id }: { locale: BookLocale; id: string }) {
  const en = locale === "en";
  return <div className={styles.readerTools}><a href={`/book/${locale}/${id}/chapter.md`} download title={en ? "Download Markdown" : "Descargar Markdown"} aria-label={en ? "Download Markdown" : "Descargar Markdown"}><Icon name="download" /></a><button className={styles.printButton} onClick={() => window.print()} title={en ? "Print chapter" : "Imprimir capítulo"} aria-label={en ? "Print chapter" : "Imprimir capítulo"}><Icon name="document" />{en ? "Print" : "Imprimir"}</button></div>;
}
export function CopyBlock({ children, locale }: { children: React.ReactNode; locale: BookLocale }) {
  const ref = useRef<HTMLPreElement>(null);
  const [message, setMessage] = useState("");
  const en = locale === "en";
  const copy = async () => { try { await navigator.clipboard.writeText(ref.current?.textContent || ""); setMessage(en ? "Copied" : "Copiado"); } catch { setMessage(en ? "Clipboard unavailable" : "Portapapeles no disponible"); } };
  return <div className={styles.codeBlock}><div><span>{en ? "EXERCISE" : "EJERCICIO"}</span><span role="status">{message}</span><button onClick={copy} title={en ? "Copy exercise" : "Copiar ejercicio"} aria-label={en ? "Copy exercise" : "Copiar ejercicio"}><Icon name="copy" /></button></div><pre ref={ref}>{children}</pre></div>;
}
export default function Practice({ metadata, hash, locale }: { metadata: ChapterMetadata; hash: string; locale: BookLocale }) {
  const en = locale === "en";
  const raw = useSyncExternalStore(subscribe, snapshot, () => "");
  const progress = useMemo(() => parseProgress(raw), [raw]);
  const current = progress[`${metadata.id}:${locale}`];
  const complete = current === hash;
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [practised, setPractised] = useState(false);
  const [error, setError] = useState("");
  const exercise = metadata.localized[locale].exercise;
  function save() {
    if (!checked || choice !== exercise.correct || !practised) return;
    try { window.localStorage.setItem(KEY, JSON.stringify({ ...progress, [`${metadata.id}:${locale}`]: hash })); window.dispatchEvent(new Event(EVENT)); setError(""); }
    catch { setError(en ? "Your browser did not allow local progress storage." : "El navegador no ha permitido guardar el progreso local."); }
  }
  function clear() { try { window.localStorage.removeItem(KEY); window.dispatchEvent(new Event(EVENT)); setPractised(false); setChecked(false); setChoice(null); } catch { setError(en ? "Could not clear local progress." : "No se ha podido borrar el progreso local."); } }
  return <section id="practice" className={styles.practice}>
    <div className={styles.sectionLabel}>{en ? "CHECK YOUR UNDERSTANDING" : "COMPRUEBA LO APRENDIDO"}<Icon name="listCheck" /></div>
    {current && !complete && <p role="status" className={styles.reviewNote}>{en ? "This chapter has changed since your last practice." : "Este capítulo cambió desde tu última práctica."}</p>}
    <fieldset><legend>{exercise.question}</legend>{exercise.options.map((option, index) => <label key={option} className={styles.option}><input type="radio" name={`${metadata.id}-answer`} checked={choice === index} onChange={() => { setChoice(index); setChecked(false); }} /><span>{option}</span></label>)}</fieldset>
    <button className={styles.secondary} disabled={choice === null} onClick={() => setChecked(true)}>{en ? "Check answer" : "Comprobar respuesta"}</button>
    {checked && <div className={choice === exercise.correct ? styles.correct : styles.incorrect} role="status"><strong>{choice === exercise.correct ? (en ? "Correct. " : "Correcto. ") : (en ? "Review the source. " : "Vuelve a la fuente. ")}</strong>{exercise.explanation}</div>}
    <div className={styles.completion}><label><input type="checkbox" checked={practised} onChange={event => setPractised(event.target.checked)} />{en ? "I completed the practical exercise and checked the result." : "He realizado la práctica y comprobado el resultado."}</label><button className={styles.primary} disabled={complete || !practised || !checked || choice !== exercise.correct} onClick={save}><Icon name="check" />{complete ? (en ? "Completed on this device" : "Completado en este dispositivo") : (en ? "Mark as completed" : "Marcar como completado")}</button><button className={styles.clear} onClick={clear}>{en ? "Clear local progress" : "Borrar progreso local"}</button>{error && <p role="alert">{error}</p>}</div>
  </section>;
}
