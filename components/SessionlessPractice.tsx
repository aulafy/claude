"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { trackLearningEvent } from "@/lib/learning-events";
import { canCompleteMission } from "@/lib/mission-completion";
import { completeLearningStep, readLearningProgress, setLearningEvidence, startLearningStep } from "@/lib/learning-progress";
import type { SessionlessPractice as Practice } from "@/lib/sessionless-practices";

export default function SessionlessPractice({ practice, href, title, next }: { practice: Practice; href: string; title: string; next: { href: string; title: string } }) {
  const [checked, setChecked] = useState<boolean[]>(() => practice.steps.map(() => false));
  const [selected, setSelected] = useState<number | null>(null);
  const [evidence, setEvidence] = useState(practice.evidence);
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");
  const [completed, setCompleted] = useState(false);
  const chosen = selected === null ? null : practice.options[selected];
  const done = checked.filter(Boolean).length;
  const canComplete = canCompleteMission(checked, chosen?.correct);

  useEffect(() => {
    const existing = readLearningProgress()?.evidenceItems.find((item) => item.href === href);
    if (existing) {
      setEvidence(existing.content);
      setSaved(true);
    }
    setCompleted(readLearningProgress()?.completedLessons.includes(href) ?? false);
  }, [href]);

  function finishMission() {
    if (!canComplete || completed) return;
    completeLearningStep(href);
    trackLearningEvent("mission_complete");
    setCompleted(true);
  }

  function beginMission() {
    if (startLearningStep(href)) trackLearningEvent("mission_start");
  }

  function saveEvidence() {
    if (!evidence.trim()) return;
    const stored = setLearningEvidence({ href, title, content: evidence, locale: "es" }, href);
    setSaved(stored);
    setMessage(stored ? "Guardado solo en este dispositivo." : "No se pudo guardar. Recarga la página e inténtalo de nuevo.");
  }

  function removeEvidence() {
    if (!setLearningEvidence(null, href)) return;
    setEvidence(practice.evidence);
    setSaved(false);
    setMessage("Evidencia local eliminada.");
  }

  return (
    <section id="practica" className="sessionless-practice scroll-mt-24" aria-labelledby="practice-title">
      <div className="sessionless-practice__header">
        <div>
          <span className="aula-section-label"><Icon name="lab" /> misión práctica</span>
          <h2 id="practice-title">Aprende haciendo una decisión pequeña</h2>
          <p>{practice.mission}</p>
        </div>
        <div className="sessionless-practice__privacy"><Icon name="shield" /> Sin cuenta, cookies ni seguimiento personal</div>
      </div>

      <div className="sessionless-practice__result">
        <strong>Resultado de esta misión</strong>
        <span>{practice.result}</span>
      </div>

      <fieldset className="sessionless-practice__steps">
        <legend>Hazlo en tres pasos <span>{done}/3 durante esta visita</span></legend>
        {practice.steps.map((step, index) => (
          <label key={step} className={checked[index] ? "is-checked" : ""}>
            <input
              type="checkbox"
              checked={checked[index]}
              onChange={() => { beginMission(); setChecked((current) => current.map((value, item) => item === index ? !value : value)); }}
            />
            <span className="sessionless-practice__step-number">{checked[index] ? <Icon name="check" /> : index + 1}</span>
            <span>{step}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="sessionless-practice__question">
        <legend>Comprueba tu criterio</legend>
        <p>{practice.question}</p>
        <div className="sessionless-practice__options">
          {practice.options.map((option, index) => (
            <button
              key={option.label}
              type="button"
              aria-pressed={selected === index}
              onClick={() => { beginMission(); setSelected(index); }}
              className={selected === index ? (option.correct ? "is-correct" : "is-wrong") : ""}
            >
              <span>{String.fromCharCode(65 + index)}</span>{option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className={`sessionless-practice__feedback ${chosen ? (chosen.correct ? "is-correct" : "is-wrong") : ""}`} aria-live="polite">
        {chosen ? <><Icon name={chosen.correct ? "check" : "warning"} /><span>{chosen.explanation}</span></> : <><Icon name="idea" /><span>Elige una respuesta. Recibirás una explicación, no una puntuación.</span></>}
      </div>

      <section className={`sessionless-practice__completion ${completed ? "is-complete" : ""}`} aria-labelledby="mission-completion-title">
        <div><span><Icon name={completed ? "check" : "listCheck"} /></span><div><h3 id="mission-completion-title">{completed ? "Misión completada" : "Termina la misión cuando puedas demostrarlo"}</h3><p>{completed ? "El progreso y el día activo se han guardado en este navegador." : `${done}/3 pasos · ${chosen?.correct ? "criterio comprobado" : "falta elegir la respuesta correcta"}`}</p></div></div>
        {completed ? <Link href={next.href}>Siguiente: {next.title} <Icon name="chevronRight" /></Link> : <button type="button" disabled={!canComplete} onClick={finishMission}><Icon name="check" /> Dar misión por completada</button>}
      </section>

      <details className="sessionless-practice__evidence">
        <summary>{saved ? "Evidencia guardada en este dispositivo" : "Completa y guarda una evidencia opcional"}</summary>
        <p>Escribe solo información ficticia o no confidencial. El texto no sale de este navegador salvo que exportes tu progreso.</p>
        <label htmlFor={`evidence-${href.replaceAll("/", "-")}`}>Tu evidencia</label>
        <textarea id={`evidence-${href.replaceAll("/", "-")}`} value={evidence} maxLength={2000} rows={8} onChange={(event) => { setEvidence(event.target.value); setSaved(false); setMessage(""); }} />
        <div><span>{evidence.length}/2000</span><button type="button" onClick={saveEvidence} disabled={!evidence.trim()}><Icon name="save" /> Guardar en este dispositivo</button>{saved ? <button type="button" onClick={removeEvidence}><Icon name="close" /> Borrar</button> : null}</div>
        {message ? <p role="status">{message}</p> : null}
      </details>

      <p className="sessionless-practice__footnote">Los pasos y respuestas usan memoria temporal. Solo la evidencia se conserva cuando pulsas el botón de guardar. Contenido CC BY 4.0 · código MIT.</p>
    </section>
  );
}
