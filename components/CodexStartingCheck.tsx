"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Icon from "@/components/Icon";

const questions = [
  {
    prompt: "Recibes una petición vaga: «ordena estos archivos». ¿Qué harías primero?",
    options: [
      "Pedir que la IA empiece y corregir después.",
      "Acordar resultado, límites, carpeta de prueba y forma de comprobarlo.",
      "Mover todo a la nube para que la IA tenga más contexto.",
    ],
    correct: 1,
    explanation: "Una tarea verificable define el resultado, protege los originales y permite revisar antes de aplicar cambios.",
  },
  {
    prompt: "Codex propone borrar varios archivos. ¿Cuál es la respuesta más segura?",
    options: [
      "Autorizar porque el modelo ya analizó el proyecto.",
      "Cancelar siempre cualquier borrado.",
      "Pedir una vista previa, comprobar copias y autorizar solo lo necesario.",
    ],
    correct: 2,
    explanation: "La seguridad no consiste en bloquearlo todo: consiste en entender el alcance, poder recuperar y conceder el mínimo permiso.",
  },
  {
    prompt: "Necesitas un dato que puede haber cambiado esta semana. ¿Qué evidencia pedirías?",
    options: [
      "Una respuesta convincente basada en el conocimiento del modelo.",
      "Una búsqueda actual y enlaces a fuentes primarias que puedas abrir.",
      "Tres respuestas de modelos distintos sin consultar fuentes.",
    ],
    correct: 1,
    explanation: "Cuando la información cambia, hay que consultar fuentes actuales y verificar que respaldan exactamente la afirmación.",
  },
  {
    prompt: "El agente dice que ha terminado una web. ¿Qué cierra bien la tarea?",
    options: [
      "Comprobar el resultado, revisar cambios y ejecutar las verificaciones adecuadas.",
      "Aceptar si no aparece ningún error en el chat.",
      "Publicar primero y revisar solo si un usuario avisa.",
    ],
    correct: 0,
    explanation: "Terminar significa aportar evidencia: resultado visible, cambios revisados y pruebas proporcionales al riesgo.",
  },
] as const;

export default function CodexStartingCheck() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const answered = Object.keys(answers).length;
  const score = useMemo(() => questions.reduce((sum, question, index) => sum + Number(answers[index] === question.correct), 0), [answers]);
  const complete = answered === questions.length;
  const advanced = score === questions.length;

  return (
    <section className="aula-panel p-6 sm:p-8 mb-12" aria-labelledby="starting-check-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="aula-section-label"><Icon name="listCheck" /> Comprobación inicial · 3 minutos</span>
          <h2 id="starting-check-title" className="mt-3 font-display text-2xl font-bold text-white">Comprueba cómo decides, no cuánto vocabulario recuerdas</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">Responde cuatro situaciones reales. Recibirás una explicación inmediata y una recomendación; no bloquea el curso ni guarda datos.</p>
        </div>
        <span className="aula-chip" data-tone="cyan">{answered}/{questions.length}</span>
      </div>

      <div className="mt-7 grid gap-6">
        {questions.map((question, questionIndex) => {
          const selected = answers[questionIndex];
          const hasAnswer = selected !== undefined;
          const isCorrect = selected === question.correct;
          return (
            <fieldset key={question.prompt} className="rounded-lg border border-zinc-800 bg-zinc-950/35 p-4 sm:p-5">
              <legend className="px-1 font-semibold text-zinc-100">{questionIndex + 1}. {question.prompt}</legend>
              <div className="mt-3 grid gap-2">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={selected === optionIndex}
                    onClick={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))}
                    className={`rounded-md border px-4 py-3 text-left text-sm leading-relaxed transition-colors ${selected === optionIndex ? "border-cyan-400/65 bg-cyan-400/10 text-white" : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {hasAnswer && (
                <p className={`mt-3 text-sm leading-relaxed ${isCorrect ? "text-emerald-300" : "text-amber-300"}`} role="status">
                  <strong>{isCorrect ? "Bien razonado." : "Revísalo."}</strong> {question.explanation}
                </p>
              )}
            </fieldset>
          );
        })}
      </div>

      {complete && (
        <div className="mt-7 rounded-lg border border-emerald-400/30 bg-emerald-400/8 p-5" aria-live="polite">
          <span className="aula-section-label text-emerald-300"><Icon name="check" /> Resultado orientativo: {score}/{questions.length}</span>
          <h3 className="mt-3 font-display text-xl font-bold text-white">{advanced ? "Ya aplicas un criterio inicial sólido" : "El curso empieza exactamente donde lo necesitas"}</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            {advanced
              ? "Revisa el primer módulo para conocer las superficies de Codex y salta después a la primera práctica segura."
              : "Empieza por la primera lección y repite esta comprobación cuando termines el módulo «Tu primer resultado seguro»."}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={advanced ? "/cursos/codex-desde-cero/primera-carpeta" : "/cursos/codex-desde-cero/que-es-codex"} className="aula-button aula-button-primary">
              <Icon name="rocket" /> {advanced ? "Ir a la primera práctica" : "Empezar por la primera lección"}
            </Link>
            <button type="button" onClick={() => setAnswers({})} className="aula-button aula-button-secondary"><Icon name="refresh" /> Repetir</button>
          </div>
        </div>
      )}
    </section>
  );
}
