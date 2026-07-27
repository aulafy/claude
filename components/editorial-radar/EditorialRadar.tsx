"use client";

import { useMemo, useState } from "react";
import {
  evaluateEditorialIntake,
  type EditorialAudience,
  type EditorialEvaluation,
  type EditorialIntent,
  type EditorialIntake,
} from "@/lib/editorial-intake";
import styles from "./EditorialRadar.module.css";

type ApiResponse = {
  evaluation?: EditorialEvaluation;
  queued?: boolean;
  queueMessage?: string;
  filename?: string;
  error?: string;
};

const initialForm = {
  title: "",
  content: "",
  linksText: "",
  audience: "principiante" as EditorialAudience,
  intent: "auto" as EditorialIntent,
  existingPath: "",
  desiredOutcome: "",
};

export default function EditorialRadar() {
  const [form, setForm] = useState(initialForm);
  const [evaluation, setEvaluation] = useState<EditorialEvaluation | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const intake = useMemo<EditorialIntake>(
    () => ({
      title: form.title.trim(),
      content: form.content.trim(),
      links: form.linksText.split(/\s+/).map((link) => link.trim()).filter(Boolean),
      audience: form.audience,
      intent: form.intent,
      existingPath: form.existingPath.trim() || undefined,
      desiredOutcome: form.desiredOutcome.trim(),
    }),
    [form],
  );

  async function submit(event: { preventDefault(): void }, queue: boolean) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (intake.title.length < 5 || intake.content.length < 30 || intake.desiredOutcome.length < 10) {
      setError("Completa el título, el texto y el resultado educativo antes de evaluar.");
      return;
    }

    if (!queue) {
      setEvaluation(evaluateEditorialIntake(intake));
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/editorial-intake", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...intake, queue: true }),
      });
      const data = (await response.json()) as ApiResponse;
      if (data.evaluation) setEvaluation(data.evaluation);
      if (!response.ok || data.error) throw new Error(data.error || "No se pudo evaluar la entrada.");
      setMessage(
        data.filename
          ? `${data.queueMessage} Archivo: ${data.filename}`
          : data.queueMessage || "Evaluación terminada.",
      );
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "No se pudo conectar con el evaluador.");
    } finally {
      setPending(false);
    }
  }

  function reset() {
    setForm(initialForm);
    setEvaluation(null);
    setMessage("");
    setError("");
  }

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Laboratorio · radar editorial</p>
        <h1 className={styles.title}>¿Esto merece un tutorial?</h1>
        <p className={styles.lead}>
          Pega una señal de Grok, X, Reddit, GitHub o una documentación. El sistema
          medirá evidencia, utilidad práctica y riesgos antes de gastar tiempo en redactar.
        </p>
        <p className={styles.privacy}>
          <span aria-hidden="true">○</span>
          Sin cuenta, cookies ni publicación automática. No pegues secretos ni datos personales.
        </p>
      </header>

      <div className={styles.workspace}>
        <section className={styles.panel} aria-labelledby="intake-title">
          <form className={styles.form} onSubmit={(event) => submit(event, false)}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="intake-title">Título de la idea</label>
              <input
                className={styles.input}
                id="intake-title"
                maxLength={180}
                required
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                placeholder="Ej.: Nuevo método para evaluar respuestas RAG"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="intake-content">Texto o investigación</label>
              <textarea
                className={styles.textarea}
                id="intake-content"
                maxLength={40_000}
                required
                value={form.content}
                onChange={(event) => setForm({ ...form, content: event.target.value })}
                placeholder="Pega aquí el texto de Grok, un hilo, tus notas o una descripción técnica…"
              />
              <span className={styles.hint}>{form.content.length.toLocaleString("es")} / 40.000 caracteres</span>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="intake-links">Enlaces, uno por línea</label>
              <textarea
                className={`${styles.textarea} ${styles.textareaSmall}`}
                id="intake-links"
                value={form.linksText}
                onChange={(event) => setForm({ ...form, linksText: event.target.value })}
                placeholder={"https://documentacion-oficial.example\nhttps://github.com/organizacion/proyecto"}
              />
              <span className={styles.hint}>Se clasifican; no se descargan ni se consideran verificados.</span>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="intake-audience">Para quién</label>
                <select
                  className={styles.select}
                  id="intake-audience"
                  value={form.audience}
                  onChange={(event) => setForm({ ...form, audience: event.target.value as EditorialAudience })}
                >
                  <option value="principiante">Principiante</option>
                  <option value="estudiante">Estudiante</option>
                  <option value="pyme">Pyme u oficina</option>
                  <option value="tecnico">Perfil técnico</option>
                  <option value="avanzado">Avanzado</option>
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="intake-intent">Qué debería ocurrir</label>
                <select
                  className={styles.select}
                  id="intake-intent"
                  value={form.intent}
                  onChange={(event) => setForm({ ...form, intent: event.target.value as EditorialIntent })}
                >
                  <option value="auto">Que lo decida el sistema</option>
                  <option value="crear">Crear tutorial</option>
                  <option value="actualizar">Actualizar contenido</option>
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="intake-path">Página o curso relacionado</label>
              <input
                className={styles.input}
                id="intake-path"
                maxLength={500}
                value={form.existingPath}
                onChange={(event) => setForm({ ...form, existingPath: event.target.value })}
                placeholder="/cursos/rag-seguro/evals-metricas (opcional)"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="intake-outcome">Qué debería conseguir el alumno</label>
              <textarea
                className={`${styles.textarea} ${styles.textareaSmall}`}
                id="intake-outcome"
                maxLength={1_000}
                required
                value={form.desiredOutcome}
                onChange={(event) => setForm({ ...form, desiredOutcome: event.target.value })}
                placeholder="Al terminar podrá ejecutar…, comparar… y demostrar el resultado mediante…"
              />
            </div>

            <div className={styles.actions}>
              <button className={styles.primary} type="submit" disabled={pending}>
                Evaluar material
              </button>
              <button
                className={styles.secondary}
                type="button"
                disabled={pending}
                onClick={(event) => submit(event, true)}
              >
                {pending ? "Guardando…" : "Evaluar y enviar a la cola"}
              </button>
              <button className={styles.secondary} type="button" disabled={pending} onClick={reset}>
                Limpiar
              </button>
            </div>
          </form>
        </section>

        <aside className={`${styles.panel} ${styles.result}`} aria-live="polite">
          {!evaluation ? (
            <div className={styles.empty}>
              <strong>Evaluación previa</strong>
              <p>
                Buscaremos contexto, fuente primaria, resultado observable, práctica,
                riesgos y encaje con el contenido existente.
              </p>
            </div>
          ) : (
            <>
              <div className={styles.scoreHeader}>
                <div className={styles.scoreLine}>
                  <span className={styles.score}>{evaluation.score}/{evaluation.maximum}</span>
                  <span
                    className={`${styles.verdict} ${
                      evaluation.verdict === "suficiente"
                        ? styles.verdictReady
                        : evaluation.verdict === "insuficiente"
                          ? styles.verdictWeak
                          : ""
                    }`}
                  >
                    {evaluation.verdict}
                  </span>
                </div>
                <p className={styles.summary}>{evaluation.summary}</p>
              </div>
              <div className={styles.criteria}>
                {evaluation.criteria.map((criterion) => (
                  <div className={styles.criterion} key={criterion.id}>
                    <span className={`${styles.mark} ${criterion.passed ? "" : styles.markMissing}`} aria-hidden="true">
                      {criterion.passed ? "✓" : "·"}
                    </span>
                    <div>
                      <p className={styles.criterionTitle}>{criterion.label}</p>
                      <p className={styles.criterionDetail}>{criterion.detail}</p>
                    </div>
                    <span className={styles.points}>{criterion.points}/{criterion.maximum}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {message && <p className={styles.notice}>{message}</p>}
          {error && <p className={styles.error}>{error}</p>}
        </aside>
      </div>
    </div>
  );
}
