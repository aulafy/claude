"use client";

import { useActionState } from "react";
import { createProject } from "@/app/comunidad/actions";
import ActionMessage from "@/components/social/ActionMessage";
import FieldError from "@/components/social/FieldError";
import Icon from "@/components/Icon";
import type { LearningUnit } from "@/lib/social/types";
import { INITIAL_ACTION_STATE } from "@/lib/social/types";

export default function ProjectForm({ units, selectedKey }: { units: LearningUnit[]; selectedKey?: string }) {
  const [state, action, pending] = useActionState(createProject, INITIAL_ACTION_STATE);
  const initial = units.find((unit) => `${unit.courseSlug}/${unit.lessonSlug}` === selectedKey) ?? units[0];

  return (
    <form action={action} className="space-y-7">
      <section className="aula-panel p-5 sm:p-6 space-y-5">
        <div>
          <p className="aula-section-label"><Icon name="book" /> 1 · Vincula el aprendizaje</p>
          <h2 className="font-display text-2xl font-bold text-white mt-2">¿De qué lección nace?</h2>
        </div>
        <div>
          <label className="social-label" htmlFor="unit">Lección del piloto</label>
          <select
            id="unit"
            className="social-select"
            defaultValue={initial ? `${initial.courseSlug}|${initial.lessonSlug}` : ""}
            onChange={(event) => {
              const [course, lesson] = event.currentTarget.value.split("|");
              const form = event.currentTarget.form;
              if (form) {
                (form.elements.namedItem("courseSlug") as HTMLInputElement).value = course;
                (form.elements.namedItem("lessonSlug") as HTMLInputElement).value = lesson;
              }
            }}
          >
            {units.map((unit) => (
              <option key={`${unit.courseSlug}/${unit.lessonSlug}`} value={`${unit.courseSlug}|${unit.lessonSlug}`}>
                {unit.courseTitle} · {unit.lessonTitle}
              </option>
            ))}
          </select>
          <input type="hidden" name="courseSlug" defaultValue={initial?.courseSlug} />
          <input type="hidden" name="lessonSlug" defaultValue={initial?.lessonSlug} />
          <FieldError errors={state.fieldErrors?.lessonSlug} />
        </div>
      </section>

      <section className="aula-panel p-5 sm:p-6 space-y-5">
        <div>
          <p className="aula-section-label"><Icon name="experiment" /> 2 · Enseña el resultado</p>
          <h2 className="font-display text-2xl font-bold text-white mt-2">Qué has construido</h2>
        </div>
        <div>
          <label className="social-label" htmlFor="title">Título</label>
          <input className="social-input" id="title" name="title" minLength={6} maxLength={120} required placeholder="Ej.: Organizador seguro de facturas" />
          <FieldError errors={state.fieldErrors?.title} />
        </div>
        <div>
          <label className="social-label" htmlFor="summary">Resumen breve</label>
          <textarea className="social-textarea min-h-24" id="summary" name="summary" minLength={20} maxLength={320} required placeholder="Qué hace y para quién resulta útil." />
          <FieldError errors={state.fieldErrors?.summary} />
        </div>
        <div>
          <label className="social-label" htmlFor="whatBuilt">Resultado reproducible</label>
          <textarea className="social-textarea min-h-44" id="whatBuilt" name="whatBuilt" minLength={40} maxLength={4000} required placeholder="Explica el proceso, el resultado y cómo comprobaste que funciona." />
          <FieldError errors={state.fieldErrors?.whatBuilt} />
        </div>
      </section>

      <section className="aula-panel p-5 sm:p-6 space-y-5">
        <div>
          <p className="aula-section-label"><Icon name="idea" /> 3 · Haz visible el aprendizaje</p>
          <h2 className="font-display text-2xl font-bold text-white mt-2">Decisiones, errores y enlaces</h2>
        </div>
        <div>
          <label className="social-label" htmlFor="whatLearned">Qué has aprendido</label>
          <textarea className="social-textarea min-h-32" id="whatLearned" name="whatLearned" minLength={20} maxLength={2000} required />
          <FieldError errors={state.fieldErrors?.whatLearned} />
        </div>
        <div>
          <label className="social-label" htmlFor="obstacles">Qué salió mal o qué mejorarías <span className="text-zinc-500">(opcional)</span></label>
          <textarea className="social-textarea min-h-28" id="obstacles" name="obstacles" maxLength={2000} />
          <FieldError errors={state.fieldErrors?.obstacles} />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="social-label" htmlFor="technologies">Herramientas, separadas por comas</label>
            <input className="social-input" id="technologies" name="technologies" maxLength={240} placeholder="codex, html, csv" />
          </div>
          <div>
            <label className="social-label" htmlFor="difficulty">Dificultad que experimentaste</label>
            <select className="social-select" id="difficulty" name="difficulty" defaultValue="principiante">
              <option value="principiante">Principiante</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
            </select>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="social-label" htmlFor="repositoryUrl">Repositorio <span className="text-zinc-500">(opcional)</span></label>
            <input className="social-input" id="repositoryUrl" name="repositoryUrl" type="url" maxLength={500} placeholder="https://github.com/…" />
            <FieldError errors={state.fieldErrors?.repositoryUrl} />
          </div>
          <div>
            <label className="social-label" htmlFor="demoUrl">Demostración <span className="text-zinc-500">(opcional)</span></label>
            <input className="social-input" id="demoUrl" name="demoUrl" type="url" maxLength={500} placeholder="https://…" />
            <FieldError errors={state.fieldErrors?.demoUrl} />
          </div>
        </div>
      </section>

      <ActionMessage state={state} />
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
        <button className="aula-button aula-button-secondary" type="submit" name="intent" value="draft" disabled={pending}>
          <Icon name="save" /> Guardar borrador
        </button>
        <button className="aula-button aula-button-primary" type="submit" name="intent" value="published" disabled={pending}>
          <Icon name="upload" /> {pending ? "Guardando…" : "Publicar evidencia"}
        </button>
      </div>
    </form>
  );
}
