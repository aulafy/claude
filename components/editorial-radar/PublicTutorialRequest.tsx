"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  buildGitHubTutorialIssueUrl,
  evaluateEditorialIntake,
  type EditorialAudience,
  type EditorialIntent,
} from "@/lib/editorial-intake";
import styles from "./EditorialRadar.module.css";

export default function PublicTutorialRequest() {
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [linksText, setLinksText] = useState("");
  const [outcome, setOutcome] = useState("");
  const [existingPath, setExistingPath] = useState("");
  const [audience, setAudience] = useState<EditorialAudience>("principiante");
  const [intent, setIntent] = useState<EditorialIntent>("auto");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [evaluationVisible, setEvaluationVisible] = useState(false);
  const [error, setError] = useState("");

  const links = useMemo(
    () => linksText.split(/\s+/).map((link) => link.trim()).filter(Boolean),
    [linksText],
  );
  const evaluation = useMemo(
    () =>
      evaluateEditorialIntake({
        title,
        content: problem,
        links,
        audience,
        intent,
        existingPath: existingPath || undefined,
        desiredOutcome: outcome,
      }),
    [audience, existingPath, intent, links, outcome, problem, title],
  );

  function evaluate(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (title.trim().length < 5 || problem.trim().length < 30 || outcome.trim().length < 10) {
      setError("Completa el título, el problema y el resultado esperado.");
      return;
    }
    setEvaluationVisible(true);
  }

  const canContinue =
    evaluationVisible &&
    evaluation.verdict !== "insuficiente" &&
    privacyAccepted;

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Aulafy · participación abierta</p>
        <h1 className={styles.title}>Pide el tutorial que necesitas</h1>
        <p className={styles.lead}>
          Describe una necesidad real. Aulafy comprobará si la propuesta tiene suficiente
          contexto antes de prepararla como un Issue público de GitHub.
        </p>
        <p className={styles.privacy}>
          <span aria-hidden="true">○</span>
          Aulafy no guarda el formulario. GitHub requiere una cuenta para publicar la solicitud.
        </p>
      </header>

      <div className={styles.workspace}>
        <section className={styles.panel} aria-labelledby="request-title">
          <form className={styles.form} onSubmit={evaluate}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="request-title">Título de la petición</label>
              <input
                className={styles.input}
                id="request-title"
                maxLength={180}
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Ej.: Cómo comprobar las respuestas de una IA"
              />
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="request-audience">Para quién</label>
                <select
                  className={styles.select}
                  id="request-audience"
                  value={audience}
                  onChange={(event) => setAudience(event.target.value as EditorialAudience)}
                >
                  <option value="principiante">Principiante</option>
                  <option value="estudiante">Estudiante</option>
                  <option value="pyme">Pyme u oficina</option>
                  <option value="tecnico">Perfil técnico</option>
                  <option value="avanzado">Avanzado</option>
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="request-intent">Tipo de petición</label>
                <select
                  className={styles.select}
                  id="request-intent"
                  value={intent}
                  onChange={(event) => setIntent(event.target.value as EditorialIntent)}
                >
                  <option value="auto">No estoy seguro</option>
                  <option value="crear">Tutorial nuevo</option>
                  <option value="actualizar">Actualizar uno existente</option>
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="request-problem">¿Qué problema debería resolver?</label>
              <textarea
                className={styles.textarea}
                id="request-problem"
                maxLength={4_000}
                required
                value={problem}
                onChange={(event) => setProblem(event.target.value)}
                placeholder="Explica qué intentas hacer, dónde te atascas y por qué el contenido actual no basta…"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="request-outcome">Resultado esperado</label>
              <textarea
                className={`${styles.textarea} ${styles.textareaSmall}`}
                id="request-outcome"
                maxLength={1_000}
                required
                value={outcome}
                onChange={(event) => setOutcome(event.target.value)}
                placeholder="Al terminar podré ejecutar…, comparar… o demostrar…"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="request-links">Fuentes o ejemplos, uno por línea</label>
              <textarea
                className={`${styles.textarea} ${styles.textareaSmall}`}
                id="request-links"
                value={linksText}
                onChange={(event) => setLinksText(event.target.value)}
                placeholder={"https://documentacion-oficial.example\nhttps://github.com/organizacion/proyecto"}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="request-existing">Página relacionada</label>
              <input
                className={styles.input}
                id="request-existing"
                maxLength={500}
                value={existingPath}
                onChange={(event) => setExistingPath(event.target.value)}
                placeholder="https://www.aulafy.net/cursos/… (opcional)"
              />
            </div>

            <label className={styles.consent}>
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(event) => setPrivacyAccepted(event.target.checked)}
              />
              <span>
                Entiendo que la petición será pública en GitHub y no contiene datos personales,
                documentos privados, claves ni secretos.
              </span>
            </label>

            <div className={styles.actions}>
              <button className={styles.primary} type="submit">Evaluar petición</button>
              <a
                className={`${styles.secondary} ${canContinue ? "" : styles.disabledLink}`}
                href={canContinue
                  ? buildGitHubTutorialIssueUrl(
                      {
                        title,
                        content: problem,
                        links,
                        audience,
                        intent,
                        existingPath: existingPath || undefined,
                        desiredOutcome: outcome,
                      },
                      evaluation,
                    )
                  : undefined}
                target="_blank"
                rel="noreferrer"
                aria-disabled={!canContinue}
              >
                Revisar y publicar en GitHub
              </a>
            </div>
          </form>
        </section>

        <aside className={`${styles.panel} ${styles.result}`} aria-live="polite">
          {!evaluationVisible ? (
            <div className={styles.empty}>
              <strong>Antes de abrir el Issue</strong>
              <p>
                Comprobaremos si se entiende la necesidad, existe una fuente consultable y
                el resultado puede convertirse en una práctica.
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
          {error && <p className={styles.error}>{error}</p>}
        </aside>
      </div>
    </div>
  );
}
