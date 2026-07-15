"use client";

import { useActionState } from "react";
import { moderateReport } from "@/app/comunidad/actions";
import ActionMessage from "@/components/social/ActionMessage";
import { INITIAL_ACTION_STATE } from "@/lib/social/types";
import type { ModerationReport } from "@/lib/social/queries";

export default function ModerationForm({ report }: { report: ModerationReport }) {
  const [state, action, pending] = useActionState(moderateReport, INITIAL_ACTION_STATE);
  return (
    <form action={action} className="mt-5 space-y-4">
      <input type="hidden" name="reportId" value={report.id} />
      <input type="hidden" name="targetType" value={report.targetType} />
      <input type="hidden" name="targetId" value={report.targetId} />
      <div>
        <label className="social-label" htmlFor={`reason-${report.id}`}>Motivo de la decisión</label>
        <textarea className="social-textarea min-h-24" id={`reason-${report.id}`} name="reason" minLength={10} maxLength={1000} required />
      </div>
      <ActionMessage state={state} />
      <div className="flex flex-wrap gap-2">
        {report.targetType !== "profile" && (
          <>
            <button className="aula-button aula-button-secondary" type="submit" name="decision" value="hide" disabled={pending}>Ocultar</button>
            <button className="aula-button aula-button-secondary" type="submit" name="decision" value="restore" disabled={pending}>Restaurar</button>
            <button className="aula-button border border-rose-500/40 bg-rose-500/10 text-rose-200" type="submit" name="decision" value="remove" disabled={pending}>Retirar</button>
          </>
        )}
        <button className="aula-button aula-button-secondary" type="submit" name="decision" value="dismiss_report" disabled={pending}>Desestimar denuncia</button>
      </div>
    </form>
  );
}
