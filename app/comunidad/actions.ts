"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/social/config";
import { getCurrentMember } from "@/lib/social/queries";
import { checkSocialRateLimit } from "@/lib/social/ratelimit";
import type { ActionState } from "@/lib/social/types";
import {
  formValues,
  moderationSchema,
  profileSchema,
  projectSchema,
  reportSchema,
  reviewSchema,
} from "@/lib/social/validation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createProject(_state: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = projectSchema.safeParse(
    formValues(formData, [
      "courseSlug",
      "lessonSlug",
      "title",
      "summary",
      "whatBuilt",
      "whatLearned",
      "obstacles",
      "technologies",
      "difficulty",
      "repositoryUrl",
      "demoUrl",
      "intent",
    ]),
  );
  if (!parsed.success) return validationFailure(parsed.error.flatten().fieldErrors);

  const member = await requireMember();
  if (!member) return authFailure();
  const limit = await checkSocialRateLimit("project", member.id);
  if (!limit.allowed) return rateFailure(limit.retryAfter);

  const supabase = await createSupabaseServerClient();
  const value = parsed.data;
  const { data, error } = await supabase
    .from("learning_projects")
    .insert({
      author_id: member.id,
      course_slug: value.courseSlug,
      lesson_slug: value.lessonSlug,
      title: value.title,
      summary: value.summary,
      what_built: value.whatBuilt,
      what_learned: value.whatLearned,
      obstacles: value.obstacles,
      technologies: value.technologies,
      difficulty: value.difficulty,
      repository_url: value.repositoryUrl,
      demo_url: value.demoUrl,
      status: value.intent,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { status: "error", message: "No se pudo guardar el proyecto. Revisa los campos e inténtalo de nuevo." };
  }

  revalidatePath("/comunidad");
  revalidatePath(`/perfil/${member.profile?.username ?? ""}`);
  redirect(`/proyectos/${data.id}?creado=${value.intent}`);
}

export async function createReview(_state: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = reviewSchema.safeParse(
    formValues(formData, [
      "projectId",
      "worksCorrectly",
      "explanationRating",
      "educationalValue",
      "feedback",
      "suggestion",
    ]),
  );
  if (!parsed.success) return validationFailure(parsed.error.flatten().fieldErrors);

  const member = await requireMember();
  if (!member) return authFailure();
  const limit = await checkSocialRateLimit("review", member.id);
  if (!limit.allowed) return rateFailure(limit.retryAfter);

  const value = parsed.data;
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("project_reviews").insert({
    project_id: value.projectId,
    reviewer_id: member.id,
    works_correctly: value.worksCorrectly,
    explanation_rating: value.explanationRating,
    educational_value: value.educationalValue,
    feedback: value.feedback,
    suggestion: value.suggestion,
  });

  if (error?.code === "23505") {
    return { status: "error", message: "Ya has revisado este proyecto. En el piloto se admite una revisión por persona." };
  }
  if (error) return { status: "error", message: "No se pudo publicar la revisión." };

  revalidatePath(`/proyectos/${value.projectId}`);
  return { status: "success", message: "Revisión publicada. Gracias por aportar feedback concreto." };
}

export async function reportContent(_state: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = reportSchema.safeParse(
    formValues(formData, ["targetType", "targetId", "reason", "details"]),
  );
  if (!parsed.success) return validationFailure(parsed.error.flatten().fieldErrors);

  const member = await requireMember();
  if (!member) return authFailure();
  const limit = await checkSocialRateLimit("report", member.id);
  if (!limit.allowed) return rateFailure(limit.retryAfter);

  const value = parsed.data;
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("content_reports").insert({
    reporter_id: member.id,
    target_type: value.targetType,
    target_id: value.targetId,
    reason: value.reason,
    details: value.details,
  });

  if (error?.code === "23505") return { status: "error", message: "Ya existe una denuncia abierta sobre este contenido." };
  if (error) return { status: "error", message: "No se pudo registrar la denuncia." };
  return { status: "success", message: "Denuncia recibida. La revisaremos y registraremos la decisión." };
}

export async function updateProfile(_state: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = profileSchema.safeParse(
    formValues(formData, ["username", "displayName", "bio", "website", "interests"]),
  );
  if (!parsed.success) return validationFailure(parsed.error.flatten().fieldErrors);

  const member = await requireMember();
  if (!member) return authFailure();
  const value = parsed.data;
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("profiles")
    .update({
      username: value.username,
      display_name: value.displayName,
      bio: value.bio,
      website: value.website,
      interests: value.interests,
    })
    .eq("id", member.id);

  if (error?.code === "23505") return { status: "error", message: "Ese nombre de usuario ya está ocupado." };
  if (error) return { status: "error", message: "No se pudo actualizar el perfil." };

  revalidatePath(`/perfil/${value.username}`);
  revalidatePath("/cuenta/perfil");
  return { status: "success", message: "Perfil actualizado." };
}

export async function moderateReport(_state: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = moderationSchema.safeParse(
    formValues(formData, ["reportId", "targetType", "targetId", "decision", "reason"]),
  );
  if (!parsed.success) return validationFailure(parsed.error.flatten().fieldErrors);

  const member = await requireMember();
  if (!member || member.role === "member") return { status: "error", message: "No autorizado." };

  const value = parsed.data;
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("moderate_report", {
    report_id: value.reportId,
    expected_target_type: value.targetType,
    expected_target_id: value.targetId,
    decision: value.decision,
    decision_reason: value.reason,
  });
  if (error) return { status: "error", message: `No se pudo aplicar la decisión: ${error.message}` };

  revalidatePath("/admin/moderacion");
  revalidatePath("/comunidad");
  if (value.targetType === "project") revalidatePath(`/proyectos/${value.targetId}`);
  return { status: "success", message: "Decisión aplicada y registrada." };
}

async function requireMember() {
  if (!isSupabaseConfigured()) return null;
  return getCurrentMember();
}

function authFailure(): ActionState {
  return { status: "error", message: "Tu sesión no está activa. Entra de nuevo para continuar." };
}

function rateFailure(retryAfter: number): ActionState {
  const minutes = Math.max(1, Math.ceil(retryAfter / 60));
  return { status: "error", message: `Has realizado demasiadas acciones seguidas. Inténtalo dentro de ${minutes} min.` };
}

function validationFailure(fieldErrors: Record<string, string[] | undefined>): ActionState {
  const cleaned = Object.fromEntries(
    Object.entries(fieldErrors).flatMap(([field, errors]) => (errors?.length ? [[field, errors]] : [])),
  );
  return {
    status: "error",
    message: "Revisa los campos marcados.",
    fieldErrors: cleaned,
  };
}
