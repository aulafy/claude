"use client";

import { useActionState } from "react";
import { reportContent } from "@/app/comunidad/actions";
import ActionMessage from "@/components/social/ActionMessage";
import Icon from "@/components/Icon";
import { INITIAL_ACTION_STATE } from "@/lib/social/types";

export default function ReportForm({ targetType, targetId }: { targetType: "project" | "review" | "profile"; targetId: string }) {
  const [state, action, pending] = useActionState(reportContent, INITIAL_ACTION_STATE);
  return (
    <details className="border-t border-zinc-800 pt-4">
      <summary className="cursor-pointer text-sm text-zinc-500 hover:text-zinc-300"><Icon name="warning" /> Denunciar contenido</summary>
      <form action={action} className="mt-4 space-y-3 max-w-xl">
        <input type="hidden" name="targetType" value={targetType} />
        <input type="hidden" name="targetId" value={targetId} />
        <div>
          <label className="social-label" htmlFor={`reason-${targetId}`}>Motivo</label>
          <select className="social-select" id={`reason-${targetId}`} name="reason" defaultValue="spam">
            <option value="spam">Spam</option>
            <option value="malware">Código malicioso o claves expuestas</option>
            <option value="harassment">Acoso</option>
            <option value="privacy">Privacidad</option>
            <option value="copyright">Propiedad intelectual</option>
            <option value="illegal">Contenido ilegal</option>
            <option value="other">Otro</option>
          </select>
        </div>
        <div>
          <label className="social-label" htmlFor={`details-${targetId}`}>Detalles <span className="text-zinc-500">(opcional)</span></label>
          <textarea className="social-textarea min-h-20" id={`details-${targetId}`} name="details" maxLength={1500} />
        </div>
        <ActionMessage state={state} />
        <button className="aula-button aula-button-secondary" type="submit" disabled={pending}>
          {pending ? "Enviando…" : "Enviar denuncia"}
        </button>
      </form>
    </details>
  );
}
