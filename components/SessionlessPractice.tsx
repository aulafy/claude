"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import type { SessionlessPractice as Practice } from "@/lib/sessionless-practices";

export default function SessionlessPractice({ practice }: { practice: Practice }) {
  const [checked, setChecked] = useState<boolean[]>(() => practice.steps.map(() => false));
  const [selected, setSelected] = useState<number | null>(null);
  const chosen = selected === null ? null : practice.options[selected];
  const done = checked.filter(Boolean).length;

  return (
    <section className="sessionless-practice" aria-labelledby="practice-title">
      <div className="sessionless-practice__header">
        <div>
          <span className="aula-section-label"><Icon name="lab" /> misión práctica</span>
          <h2 id="practice-title">Aprende haciendo una decisión pequeña</h2>
          <p>{practice.mission}</p>
        </div>
        <div className="sessionless-practice__privacy"><Icon name="shield" /> Sin cuenta, cookies ni seguimiento</div>
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
              onChange={() => setChecked((current) => current.map((value, item) => item === index ? !value : value))}
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
              onClick={() => setSelected(index)}
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

      <details className="sessionless-practice__evidence">
        <summary>Plantilla de evidencia para copiar en tus apuntes</summary>
        <pre>{practice.evidence}</pre>
      </details>

      <p className="sessionless-practice__footnote">Esta actividad solo usa memoria temporal de la página. Al recargar, olvida las respuestas. Contenido CC BY-SA 4.0 · código MIT.</p>
    </section>
  );
}
