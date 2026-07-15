"use client";

import { useActionState } from "react";
import { updateProfile } from "@/app/comunidad/actions";
import ActionMessage from "@/components/social/ActionMessage";
import FieldError from "@/components/social/FieldError";
import Icon from "@/components/Icon";
import type { PublicProfile } from "@/lib/social/types";
import { INITIAL_ACTION_STATE } from "@/lib/social/types";

export default function ProfileForm({ profile }: { profile: PublicProfile }) {
  const [state, action, pending] = useActionState(updateProfile, INITIAL_ACTION_STATE);
  return (
    <form action={action} className="aula-panel p-5 sm:p-7 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="social-label" htmlFor="displayName">Nombre visible</label>
          <input className="social-input" id="displayName" name="displayName" defaultValue={profile.displayName} minLength={2} maxLength={80} required />
          <FieldError errors={state.fieldErrors?.displayName} />
        </div>
        <div>
          <label className="social-label" htmlFor="username">Usuario</label>
          <div className="relative"><span className="absolute left-3 top-3 text-zinc-500">@</span><input className="social-input pl-8" id="username" name="username" defaultValue={profile.username} pattern="[a-z0-9_]{3,30}" required /></div>
          <FieldError errors={state.fieldErrors?.username} />
        </div>
      </div>
      <div>
        <label className="social-label" htmlFor="bio">Biografía</label>
        <textarea className="social-textarea min-h-28" id="bio" name="bio" defaultValue={profile.bio ?? ""} maxLength={500} placeholder="Qué estás aprendiendo y qué te gustaría construir." />
      </div>
      <div>
        <label className="social-label" htmlFor="interests">Intereses, separados por comas</label>
        <input className="social-input" id="interests" name="interests" defaultValue={profile.interests.join(", ")} maxLength={240} placeholder="codex, ia local, automatización" />
      </div>
      <div>
        <label className="social-label" htmlFor="website">Web o portfolio <span className="text-zinc-500">(opcional)</span></label>
        <input className="social-input" id="website" name="website" type="url" defaultValue={profile.website ?? ""} maxLength={300} placeholder="https://…" />
        <FieldError errors={state.fieldErrors?.website} />
      </div>
      <ActionMessage state={state} />
      <button className="aula-button aula-button-primary" type="submit" disabled={pending}><Icon name="save" /> {pending ? "Guardando…" : "Guardar perfil"}</button>
    </form>
  );
}
