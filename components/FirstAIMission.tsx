"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { completeLearningStep, saveLearningProgress } from "@/lib/learning-progress";
import { trackLearningEvent } from "@/lib/learning-events";

const tasks = {
  es: [
    { id: "email", label: "Mejorar un email", input: "Necesito pedir a un compañero que revise un documento antes del viernes.", output: "Redacta un borrador cordial de menos de 100 palabras. No inventes nombres, fechas ni acuerdos. Señala con [COMPLETAR] cualquier dato que falte." },
    { id: "summary", label: "Resumir unas notas", input: "Reunión: revisar presupuesto, confirmar responsable y decidir fecha de entrega.", output: "Resume estas notas en tres puntos. Separa decisiones confirmadas de asuntos pendientes y no añadas información." },
    { id: "ideas", label: "Ordenar ideas", input: "Quiero aprender IA, pero no sé por dónde empezar ni qué herramienta elegir.", output: "Organiza este objetivo en tres acciones pequeñas para una semana. Evita recomendar compras y explica qué resultado comprobar en cada acción." },
  ],
  en: [
    { id: "email", label: "Improve an email", input: "I need to ask a colleague to review a document before Friday.", output: "Draft a friendly email under 100 words. Do not invent names, dates, or agreements. Mark missing details as [COMPLETE]." },
    { id: "summary", label: "Summarize notes", input: "Meeting: review budget, confirm owner, and decide delivery date.", output: "Summarize these notes in three points. Separate confirmed decisions from open questions and add no information." },
    { id: "ideas", label: "Organize ideas", input: "I want to learn AI, but I do not know where to start or which tool to choose.", output: "Turn this goal into three small actions for one week. Avoid purchase recommendations and explain what result to verify in each action." },
  ],
} as const;

export default function FirstAIMission({ locale = "es" }: { locale?: "es" | "en" }) {
  const [selected, setSelected] = useState(0);
  const [checks, setChecks] = useState([false, false, false]);
  const [copied, setCopied] = useState(false);
  const [finished, setFinished] = useState(false);
  const english = locale === "en";
  const task = tasks[locale][selected];
  const nextHref = english ? "/en/ai-course#que-es-ia-generativa" : "/cursos/ia-desde-cero/que-puede-hacer-ia-generativa";
  const prompt = useMemo(() => `${english ? "Task" : "Tarea"}: ${task.output}\n\n${english ? "Allowed context" : "Contexto permitido"}: ${task.input}\n\n${english ? "I will verify facts, missing details, and tone before using the result." : "Comprobaré los hechos, los datos que faltan y el tono antes de usar el resultado."}`, [english, task]);

  useEffect(() => {
    trackLearningEvent("mission_start");
    saveLearningProgress({
      href: english ? "/en/start" : "/empezar",
      title: english ? "Your first useful AI task" : "Tu primera tarea útil con IA",
      courseTitle: english ? "Aulafy beginner path" : "Ruta inicial de Aulafy",
      locale,
      visitedAt: new Date().toISOString(),
    });
  }, [english, locale]);

  const complete = () => {
    trackLearningEvent("mission_complete");
    completeLearningStep(english ? "/en/start" : "/empezar");
    saveLearningProgress({
      href: nextHref,
      title: english ? "What generative AI can and should not do" : "Qué puede hacer la IA generativa y qué no conviene delegarle",
      courseTitle: english ? "AI from zero" : "IA desde cero",
      locale,
      visitedAt: new Date().toISOString(),
    });
    setFinished(true);
  };

  return (
    <div className="first-ai-mission">
      <section aria-labelledby="mission-task-title">
        <span>1</span>
        <div>
          <h2 id="mission-task-title">{english ? "Choose a small, reversible task" : "Elige una tarea pequeña y reversible"}</h2>
          <p>{english ? "Use the prepared example. Do not enter personal or confidential data." : "Usa el ejemplo preparado. No introduzcas datos personales ni confidenciales."}</p>
          <div className="first-ai-mission__choices">
            {tasks[locale].map((item, index) => <button type="button" aria-pressed={selected === index} key={item.id} onClick={() => setSelected(index)}>{item.label}</button>)}
          </div>
        </div>
      </section>

      <section aria-labelledby="mission-prompt-title">
        <span>2</span>
        <div>
          <h2 id="mission-prompt-title">{english ? "Try one clear instruction" : "Prueba una instrucción clara"}</h2>
          <p>{english ? "Paste it into the AI assistant you already use, or simply inspect its structure." : "Pégala en el asistente de IA que ya uses o limítate a observar su estructura."}</p>
          <pre>{prompt}</pre>
          <button type="button" onClick={async () => {
            try {
              await navigator.clipboard.writeText(prompt);
              setCopied(true);
            } catch {
              setCopied(false);
            }
          }}><Icon name={copied ? "check" : "copy"} /> {copied ? (english ? "Copied" : "Copiada") : (english ? "Copy instruction" : "Copiar instrucción")}</button>
        </div>
      </section>

      <section aria-labelledby="mission-check-title">
        <span>3</span>
        <div>
          <h2 id="mission-check-title">{english ? "Keep the decision human" : "Mantén la decisión en manos humanas"}</h2>
          <p>{english ? "Before using any answer, confirm all three." : "Antes de usar cualquier respuesta, confirma las tres comprobaciones."}</p>
          {(english
            ? ["I checked that no facts were invented.", "I corrected missing details and tone.", "I remain responsible for the final decision."]
            : ["He comprobado que no se inventan hechos.", "He corregido los datos que faltan y el tono.", "La decisión final sigue siendo responsabilidad mía."]
          ).map((label, index) => (
            <label key={label}><input type="checkbox" checked={checks[index]} onChange={(event) => setChecks((current) => current.map((value, itemIndex) => itemIndex === index ? event.target.checked : value))} /> <span>{label}</span></label>
          ))}
          <button type="button" disabled={!checks.every(Boolean)} onClick={complete}><Icon name="check" /> {english ? "Complete mission" : "Completar misión"}</button>
        </div>
      </section>

      {finished ? (
        <aside aria-live="polite">
          <Icon name="star" />
          <div><h2>{english ? "First useful mission completed" : "Primera misión útil completada"}</h2><p>{english ? "You prepared, checked, and kept control of a small task. Now learn why this method works." : "Has preparado, comprobado y mantenido el control de una tarea pequeña. Ahora aprende por qué funciona este método."}</p></div>
          <div className="first-ai-mission__finish-actions">
            <Link href={nextHref}>{english ? "Continue to lesson 1" : "Continuar a la lección 1"} <Icon name="chevronRight" /></Link>
            <Link href={english ? "/en/my-path" : "/mi-ruta"}>{english ? "View my full path" : "Ver mi ruta completa"}</Link>
          </div>
        </aside>
      ) : null}
    </div>
  );
}
