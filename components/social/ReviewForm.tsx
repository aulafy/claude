"use client";

import { useActionState } from "react";
import { createReview } from "@/app/comunidad/actions";
import ActionMessage from "@/components/social/ActionMessage";
import FieldError from "@/components/social/FieldError";
import Icon from "@/components/Icon";
import { INITIAL_ACTION_STATE } from "@/lib/social/types";

export default function ReviewForm({ projectId }: { projectId: string }) {
  const [state, action, pending] = useActionState(createReview, INITIAL_ACTION_STATE);

  return (
    <form action={action} className="aula-panel p-5 sm:p-6 space-y-5">
      <input type="hidden" name="projectId" value={projectId} />
      <div>
        <p className="aula-section-label"><Icon name="chat" /> Revisión educativa</p>
        <h2 className="font-display text-2xl font-bold text-white mt-2">Ayuda a mejorar este proyecto</h2>
        <p className="mt-2 text-sm text-zinc-400">Evalúa la explicación, no a la persona. Si no has probado el resultado, indícalo.</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="social-label" htmlFor="worksCorrectly">¿Lo has probado?</label>
          <select className="social-select" id="worksCorrectly" name="worksCorrectly" defaultValue="not_tested">
            <option value="not_tested">No lo he probado</option>
            <option value="yes">Sí, funciona</option>
            <option value="partly">Solo en parte</option>
          </select>
        </div>
        <RatingSelect id="explanationRating" label="Claridad" />
        <RatingSelect id="educationalValue" label="Valor educativo" />
      </div>
      <div>
        <label className="social-label" htmlFor="feedback">Qué está bien explicado y por qué</label>
        <textarea className="social-textarea min-h-32" id="feedback" name="feedback" minLength={40} maxLength={2000} required />
        <FieldError errors={state.fieldErrors?.feedback} />
      </div>
      <div>
        <label className="social-label" htmlFor="suggestion">Una mejora concreta <span className="text-zinc-500">(opcional)</span></label>
        <textarea className="social-textarea min-h-24" id="suggestion" name="suggestion" maxLength={1200} />
      </div>
      <ActionMessage state={state} />
      <button className="aula-button aula-button-primary" type="submit" disabled={pending}>
        <Icon name="paperPlane" /> {pending ? "Publicando…" : "Publicar revisión"}
      </button>
    </form>
  );
}

function RatingSelect({ id, label }: { id: string; label: string }) {
  return (
    <div>
      <label className="social-label" htmlFor={id}>{label}</label>
      <select className="social-select" id={id} name={id} defaultValue="4">
        <option value="1">1 · Muy mejorable</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5 · Excelente</option>
      </select>
    </div>
  );
}
