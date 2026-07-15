"use server";

import { redirect } from "next/navigation";
import { isGoogleAuthEnabled, isSupabaseConfigured } from "@/lib/social/config";
import type { ActionState } from "@/lib/social/types";
import { safeInternalPath, siteUrl } from "@/lib/social/urls";
import { emailSchema } from "@/lib/social/validation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requestMagicLink(_state: ActionState, formData: FormData): Promise<ActionState> {
  if (!isSupabaseConfigured()) return unavailable();

  const parsed = emailSchema.safeParse(String(formData.get("email") ?? ""));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Email no válido." };
  }

  const next = safeInternalPath(formData.get("next"));
  const callback = new URL("/auth/callback", siteUrl());
  callback.searchParams.set("next", next);

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data,
    options: { emailRedirectTo: callback.toString(), shouldCreateUser: true },
  });

  if (error) return { status: "error", message: "No se pudo enviar el enlace. Inténtalo de nuevo en unos minutos." };
  return {
    status: "success",
    message: "Revisa tu correo. Te hemos enviado un enlace seguro para entrar, sin contraseña.",
  };
}

export async function signInWithGoogle(formData: FormData) {
  if (!isSupabaseConfigured() || !isGoogleAuthEnabled()) redirect("/acceso?error=configuracion");

  const next = safeInternalPath(formData.get("next"));
  const callback = new URL("/auth/callback", siteUrl());
  callback.searchParams.set("next", next);

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: callback.toString() },
  });

  if (error || !data.url) redirect("/acceso?error=oauth");
  redirect(data.url);
}

export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }
  redirect("/comunidad");
}

function unavailable(): ActionState {
  return {
    status: "error",
    message: "La comunidad está preparada, pero todavía falta conectar el proyecto de Supabase.",
  };
}
