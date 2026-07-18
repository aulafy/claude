"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  getLearningLabScenario,
  type LabStation,
  type LearningLabScenario,
} from "@/lib/learning-lab-scenarios";

const ThreeLearningRoom = dynamic(() => import("./ThreeLearningRoom"), {
  ssr: false,
  loading: () => <div className="learning-room__loading">Preparando el espacio…</div>,
});

const stations: Array<{ id: LabStation; number: string; label: string; help: string }> = [
  { id: "brief", number: "01", label: "Libreta", help: "Entiende el encargo" },
  { id: "prompt", number: "02", label: "Pantalla", help: "Construye la instrucción" },
  { id: "review", number: "03", label: "Revisión", help: "Detecta el riesgo" },
];

export default function InteractiveLearningLab() {
  const [scenarioId, setScenarioId] = useState<LearningLabScenario["id"]>("pyme");
  const [activeStation, setActiveStation] = useState<LabStation>("brief");
  const [essentialView, setEssentialView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [objectiveAttempt, setObjectiveAttempt] = useState<number | null>(null);
  const [objectiveComplete, setObjectiveComplete] = useState(false);
  const [promptAttempts, setPromptAttempts] = useState<Record<string, number>>({});
  const [promptComplete, setPromptComplete] = useState<Record<string, boolean>>({});
  const [reviewAttempt, setReviewAttempt] = useState<number | null>(null);
  const [reviewComplete, setReviewComplete] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  const scenario = getLearningLabScenario(scenarioId);
  const completedPromptParts = Object.values(promptComplete).filter(Boolean).length;
  const completedSteps = Number(objectiveComplete) + completedPromptParts + Number(reviewComplete);
  const totalSteps = scenario.promptDecisions.length + 2;
  const progress = Math.round((completedSteps / totalSteps) * 100);
  const promptReady = completedPromptParts === scenario.promptDecisions.length;

  const resetMission = useCallback((nextScenario: LearningLabScenario["id"] = scenarioId) => {
    setScenarioId(nextScenario);
    setActiveStation("brief");
    setObjectiveAttempt(null);
    setObjectiveComplete(false);
    setPromptAttempts({});
    setPromptComplete({});
    setReviewAttempt(null);
    setReviewComplete(false);
    setCopyStatus("");
  }, [scenarioId]);

  const handleSceneAvailability = useCallback((available: boolean) => {
    setWebglAvailable(available);
    if (!available) setEssentialView(true);
  }, []);

  const evidence = useMemo(() => [
    `MISIÓN: ${scenario.title}`,
    "",
    "INSTRUCCIÓN PROBADA",
    scenario.assembledPrompt,
    "",
    "CONTROL APLICADO",
    scenario.simulatedOutput.find((line) => line.unsupported)?.explanation ?? "Respuesta revisada.",
    "",
    "LO QUE ME LLEVO",
    ...scenario.notebook.map((note) => `- ${note}`),
  ].join("\n"), [scenario]);

  const copyEvidence = async () => {
    try {
      await navigator.clipboard.writeText(evidence);
      setCopyStatus("Copiado. Puedes pegarlo en tus notas.");
    } catch {
      setCopyStatus("No se pudo copiar automáticamente. Selecciona el texto de la libreta.");
    }
  };

  return (
    <main className="learning-lab" id="main-content">
      <header className="learning-lab__hero">
        <div>
          <p className="learning-lab__eyebrow">Laboratorio interactivo · prototipo abierto</p>
          <h1>Aprende a dirigir una IA dentro de una situación real</h1>
          <p>
            Recorre tres estaciones: entiende el problema, construye una instrucción y revisa el resultado.
            No necesitas cuenta. Nada de lo que hagas sale de este navegador.
          </p>
        </div>
        <div className="learning-lab__privacy" aria-label="Privacidad del laboratorio">
          <span aria-hidden="true">◉</span>
          <strong>Sin cookies ni datos enviados</strong>
          <small>El progreso desaparece al cerrar o recargar.</small>
        </div>
      </header>

      <section className="learning-lab__scenario" aria-labelledby="scenario-title">
        <div>
          <p className="learning-lab__section-label">Elige una situación</p>
          <h2 id="scenario-title">El mismo criterio, en dos vidas distintas</h2>
        </div>
        <div className="learning-lab__scenario-switch" role="group" aria-label="Situación de aprendizaje">
          {(["pyme", "estudiante"] as LearningLabScenario["id"][]).map((id) => {
            const item = getLearningLabScenario(id);
            return (
              <button
                key={id}
                type="button"
                className={scenarioId === id ? "is-active" : ""}
                aria-pressed={scenarioId === id}
                onClick={() => resetMission(id)}
              >
                <span>{item.shortLabel}</span>
                <small>{item.place}</small>
              </button>
            );
          })}
        </div>
      </section>

      <section className="learning-lab__shell" aria-label={`Misión: ${scenario.title}`}>
        <div className="learning-room">
          <div className="learning-room__topbar">
            <div>
              <span className="learning-room__status-dot" aria-hidden="true" />
              ENTORNO {scenarioId === "pyme" ? "OFICINA" : "CAMPUS"}
            </div>
            <div className="learning-room__view-controls">
              {!essentialView && webglAvailable ? (
                <button type="button" onClick={() => setPaused((value) => !value)} aria-pressed={paused}>
                  {paused ? "Reanudar movimiento" : "Pausar movimiento"}
                </button>
              ) : null}
              <button type="button" onClick={() => setEssentialView((value) => !value)} aria-pressed={essentialView}>
                {essentialView ? "Mostrar espacio 3D" : "Vista esencial"}
              </button>
            </div>
          </div>

          <div className={`learning-room__viewport${essentialView ? " is-essential" : ""}`}>
            {!essentialView ? (
              <ThreeLearningRoom
                activeStation={activeStation}
                scenarioId={scenarioId}
                paused={paused}
                onSelectStation={setActiveStation}
                onAvailabilityChange={handleSceneAvailability}
              />
            ) : (
              <div className="learning-room__fallback">
                <span aria-hidden="true">A → B → C</span>
                <strong>La misión completa sigue disponible</strong>
                <p>Usa las estaciones inferiores. Esta vista reduce consumo de batería, movimiento y carga gráfica.</p>
              </div>
            )}
            <div className="learning-room__mission-tag">
              <span>MISIÓN ACTIVA</span>
              <strong>{scenario.title}</strong>
            </div>
          </div>

          <nav className="learning-room__stations" aria-label="Estaciones del laboratorio">
            {stations.map((station) => {
              const done = station.id === "brief" ? objectiveComplete : station.id === "prompt" ? promptReady : reviewComplete;
              return (
                <button
                  key={station.id}
                  type="button"
                  className={activeStation === station.id ? "is-active" : ""}
                  aria-current={activeStation === station.id ? "step" : undefined}
                  onClick={() => setActiveStation(station.id)}
                >
                  <span className="learning-room__station-number">{done ? "✓" : station.number}</span>
                  <span><strong>{station.label}</strong><small>{station.help}</small></span>
                </button>
              );
            })}
          </nav>
        </div>

        <aside className="learning-mission">
          <div className="learning-mission__progress">
            <div>
              <span>Progreso de esta visita</span>
              <strong>{completedSteps} de {totalSteps} decisiones</strong>
            </div>
            <div className="learning-mission__progress-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${progress}% completado`}>
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>

          {activeStation === "brief" ? (
            <div className="learning-mission__panel">
              <p className="learning-lab__section-label">Estación 01 · Libreta</p>
              <h2>Primero: separa hechos y objetivo</h2>
              <p className="learning-mission__intro">{scenario.mission}</p>
              <div className="learning-mission__context">
                <strong>Lo que sabemos</strong>
                <ul>{scenario.context.map((fact) => <li key={fact}>{fact}</li>)}</ul>
              </div>
              <fieldset className="learning-mission__question">
                <legend>{scenario.objectiveQuestion}</legend>
                <div className="learning-mission__answers">
                  {scenario.objectiveChoices.map((choice, index) => {
                    const attempted = objectiveAttempt === index;
                    const answerState = attempted ? (choice.correct ? "is-correct" : "is-wrong") : "";
                    return (
                      <button
                        key={choice.text}
                        type="button"
                        className={answerState}
                        disabled={objectiveComplete && !choice.correct}
                        onClick={() => {
                          setObjectiveAttempt(index);
                          if (choice.correct) setObjectiveComplete(true);
                        }}
                      >
                        <span aria-hidden="true">{String.fromCharCode(65 + index)}</span>{choice.text}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              {objectiveAttempt !== null ? (
                <p role="status" className={`learning-mission__feedback ${scenario.objectiveChoices[objectiveAttempt].correct ? "is-correct" : "is-wrong"}`}>
                  {scenario.objectiveChoices[objectiveAttempt].feedback}
                </p>
              ) : null}
              {objectiveComplete ? (
                <button className="learning-mission__next" type="button" onClick={() => setActiveStation("prompt")}>
                  Ir a la pantalla <span aria-hidden="true">→</span>
                </button>
              ) : null}
            </div>
          ) : null}

          {activeStation === "prompt" ? (
            <div className="learning-mission__panel">
              <p className="learning-lab__section-label">Estación 02 · Pantalla</p>
              <h2>Construye una instrucción controlable</h2>
              {!objectiveComplete ? (
                <div className="learning-mission__locked">
                  <strong>Antes abre la libreta</strong>
                  <p>Definir el objetivo evita optimizar una tarea equivocada.</p>
                  <button type="button" onClick={() => setActiveStation("brief")}>Volver a la estación 01</button>
                </div>
              ) : (
                <>
                  <div className="learning-mission__builder">
                    {scenario.promptDecisions.map((decision, decisionIndex) => {
                      const attempt = promptAttempts[decision.id];
                      const complete = promptComplete[decision.id];
                      return (
                        <fieldset key={decision.id}>
                          <legend><span>{decisionIndex + 1}</span><strong>{decision.label}</strong> {decision.question}</legend>
                          <div>
                            {decision.choices.map((choice, choiceIndex) => {
                              const attempted = attempt === choiceIndex;
                              return (
                                <button
                                  key={choice.text}
                                  type="button"
                                  className={attempted ? (choice.correct ? "is-correct" : "is-wrong") : ""}
                                  disabled={complete && !choice.correct}
                                  onClick={() => {
                                    setPromptAttempts((current) => ({ ...current, [decision.id]: choiceIndex }));
                                    if (choice.correct) setPromptComplete((current) => ({ ...current, [decision.id]: true }));
                                  }}
                                >
                                  {choice.text}
                                </button>
                              );
                            })}
                          </div>
                          {attempt !== undefined ? (
                            <small className={decision.choices[attempt].correct ? "is-correct" : "is-wrong"}>{decision.choices[attempt].feedback}</small>
                          ) : null}
                        </fieldset>
                      );
                    })}
                  </div>
                  {promptReady ? (
                    <div className="learning-mission__prompt-preview">
                      <div><strong>Instrucción ensamblada</strong><span>Lista para probar</span></div>
                      <pre>{scenario.assembledPrompt}</pre>
                      <button className="learning-mission__next" type="button" onClick={() => setActiveStation("review")}>
                        Enviar al simulador <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          ) : null}

          {activeStation === "review" ? (
            <div className="learning-mission__panel">
              <p className="learning-lab__section-label">Estación 03 · Revisión</p>
              <h2>Una respuesta fluida también puede fallar</h2>
              {!promptReady ? (
                <div className="learning-mission__locked">
                  <strong>La respuesta todavía no existe</strong>
                  <p>Construye primero las cuatro partes de la instrucción.</p>
                  <button type="button" onClick={() => setActiveStation(objectiveComplete ? "prompt" : "brief")}>Ir al paso pendiente</button>
                </div>
              ) : (
                <>
                  <p className="learning-mission__intro">Pulsa la frase que no está respaldada por el contexto.</p>
                  <div className="learning-mission__output" role="group" aria-label="Respuesta simulada para revisar">
                    <div><span>Respuesta simulada</span><small>No se ha llamado a ningún modelo real</small></div>
                    {scenario.simulatedOutput.map((line, index) => {
                      const attempted = reviewAttempt === index;
                      return (
                        <button
                          key={line.text}
                          type="button"
                          className={attempted ? (line.unsupported ? "is-correct" : "is-wrong") : ""}
                          disabled={reviewComplete && !line.unsupported}
                          onClick={() => {
                            setReviewAttempt(index);
                            if (line.unsupported) setReviewComplete(true);
                          }}
                        >
                          <span>{index + 1}</span>{line.text}
                        </button>
                      );
                    })}
                  </div>
                  {reviewAttempt !== null ? (
                    <p role="status" className={`learning-mission__feedback ${scenario.simulatedOutput[reviewAttempt].unsupported ? "is-correct" : "is-wrong"}`}>
                      {scenario.simulatedOutput[reviewAttempt].explanation}
                    </p>
                  ) : null}
                  {reviewComplete ? (
                    <div className="learning-mission__completion">
                      <p className="learning-lab__section-label">Misión completada</p>
                      <h3>No has aprendido a “usar un chat”. Has aplicado control.</h3>
                      <ul>{scenario.notebook.map((note) => <li key={note}>{note}</li>)}</ul>
                      <details>
                        <summary>Ver mi libreta de evidencia</summary>
                        <pre>{evidence}</pre>
                      </details>
                      <div>
                        <button type="button" onClick={copyEvidence}>Copiar evidencia</button>
                        <button type="button" onClick={() => resetMission()}>Repetir misión</button>
                      </div>
                      {copyStatus ? <p className="learning-mission__copy-status" role="status">{copyStatus}</p> : null}
                    </div>
                  ) : null}
                </>
              )}
            </div>
          ) : null}
        </aside>
      </section>

      <footer className="learning-lab__footer">
        <div>
          <p className="learning-lab__section-label">Qué demuestra este prototipo</p>
          <h2>El entorno cambia. El método permanece.</h2>
          <p>
            Esta estructura puede convertirse en una clínica, un despacho, una tienda o un aula. El 3D aporta
            contexto; las decisiones, el feedback y la evidencia producen aprendizaje.
          </p>
        </div>
        <div>
          <Link href="/cursos/ia-desde-cero/pedir-resultados-utiles">Leer la lección relacionada</Link>
          <Link href="/cursos/ia-desde-cero/alucinaciones-verificar">Aprender a verificar respuestas</Link>
        </div>
      </footer>
    </main>
  );
}
