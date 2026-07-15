"use client";

import { useActionState } from "react";
import { requestMagicLink } from "@/app/acceso/actions";
import ActionMessage from "@/components/social/ActionMessage";
import Icon from "@/components/Icon";
import { INITIAL_ACTION_STATE } from "@/lib/social/types";

export default function AuthForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(requestMagicLink, INITIAL_ACTION_STATE);

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      <div>
        <label className="social-label" htmlFor="email">Email</label>
        <input
          className="social-input"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="tu@email.com"
          maxLength={254}
          required
        />
      </div>
      <button className="aula-button aula-button-primary w-full" type="submit" disabled={pending}>
        <Icon name="email" /> {pending ? "Enviando…" : "Recibir enlace para entrar"}
      </button>
      <ActionMessage state={state} />
    </form>
  );
}
