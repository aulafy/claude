import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  isSocialPreviewMode,
  isSupabaseConfigured,
  SOCIAL_PILOT_UNITS,
} from "@/lib/social/config";
import { DEMO_PROJECT_DETAIL, DEMO_PROJECTS, getDemoProfile } from "@/lib/social/demo";
import type {
  CurrentMember,
  LearningProject,
  LearningUnit,
  ProjectDetail,
  ProjectReview,
  PublicProfile,
} from "@/lib/social/types";

type ProfileRow = {
  id: string;
  username: string;
  display_name: string;
  bio: string | null;
  website: string | null;
  interests: string[] | null;
  created_at: string;
};

type UnitRow = {
  course_slug: string;
  lesson_slug: string;
  course_title: string;
  lesson_title: string;
  project_prompt: string;
};

type ProjectRow = {
  id: string;
  author_id: string;
  course_slug: string;
  lesson_slug: string;
  title: string;
  summary: string;
  what_built: string;
  what_learned: string;
  obstacles: string | null;
  technologies: string[] | null;
  difficulty: "principiante" | "intermedio" | "avanzado";
  repository_url: string | null;
  demo_url: string | null;
  status: "draft" | "published" | "hidden" | "removed";
  published_at: string | null;
  created_at: string;
};

type ReviewRow = {
  id: string;
  project_id: string;
  reviewer_id: string;
  works_correctly: "yes" | "partly" | "not_tested";
  explanation_rating: number;
  educational_value: number;
  feedback: string;
  suggestion: string | null;
  created_at: string;
};

export type ModerationReport = {
  id: string;
  reporterId: string;
  targetType: "project" | "review" | "profile";
  targetId: string;
  reason: string;
  details: string | null;
  status: "open" | "reviewing" | "resolved" | "dismissed";
  createdAt: string;
  reporter: PublicProfile | null;
  targetLabel: string;
};

export async function getCurrentMember(): Promise<CurrentMember | null> {
  if (isSocialPreviewMode()) {
    const profile = getDemoProfile("laura_aprende");
    return profile ? { id: profile.id, email: "preview@aulafy.local", profile, role: "admin" } : null;
  }
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || typeof data?.claims?.sub !== "string") return null;

  const id = data.claims.sub;
  const [{ data: profileData }, { data: roleData }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", id).maybeSingle(),
    supabase.from("user_roles").select("role").eq("user_id", id).maybeSingle(),
  ]);

  const role = roleData?.role;
  return {
    id,
    email: typeof data.claims.email === "string" ? data.claims.email : null,
    profile: profileData ? mapProfile(profileData as ProfileRow) : null,
    role: role === "moderator" || role === "admin" ? role : "member",
  };
}

export async function getPublicProjects(limit = 24): Promise<LearningProject[]> {
  if (isSocialPreviewMode()) return DEMO_PROJECTS;
  if (!isSupabaseConfigured()) return [];

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("learning_projects")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`No se pudieron cargar los proyectos: ${error.message}`);

  return hydrateProjects(supabase, (data ?? []) as ProjectRow[]);
}

export async function getProjectDetail(id: string): Promise<ProjectDetail | null> {
  if (isSocialPreviewMode()) {
    if (id === DEMO_PROJECT_DETAIL.id) return DEMO_PROJECT_DETAIL;
    const project = DEMO_PROJECTS.find((item) => item.id === id);
    return project ? { ...project, reviews: [] } : null;
  }
  if (!isSupabaseConfigured()) return null;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("learning_projects").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(`No se pudo cargar el proyecto: ${error.message}`);
  if (!data) return null;

  const projects = await hydrateProjects(supabase, [data as ProjectRow]);
  const project = projects[0];
  if (!project) return null;

  const { data: reviewData, error: reviewError } = await supabase
    .from("project_reviews")
    .select("*")
    .eq("project_id", id)
    .eq("status", "published")
    .order("created_at", { ascending: true });
  if (reviewError) throw new Error(`No se pudieron cargar las revisiones: ${reviewError.message}`);

  const reviewRows = (reviewData ?? []) as ReviewRow[];
  const reviewerIds = [...new Set(reviewRows.map((review) => review.reviewer_id))];
  const reviewers = await fetchProfiles(supabase, reviewerIds);

  return {
    ...project,
    reviews: reviewRows.flatMap((review) => {
      const reviewer = reviewers.get(review.reviewer_id);
      return reviewer ? [mapReview(review, reviewer)] : [];
    }),
  };
}

export async function getPublicProfile(username: string) {
  if (isSocialPreviewMode()) {
    const profile = getDemoProfile(username);
    return profile
      ? { profile, projects: DEMO_PROJECTS.filter((project) => project.authorId === profile.id) }
      : null;
  }
  if (!isSupabaseConfigured()) return null;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username.toLowerCase())
    .maybeSingle();
  if (error) throw new Error(`No se pudo cargar el perfil: ${error.message}`);
  if (!data) return null;

  const profile = mapProfile(data as ProfileRow);
  const { data: projectData, error: projectError } = await supabase
    .from("learning_projects")
    .select("*")
    .eq("author_id", profile.id)
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (projectError) throw new Error(`No se pudieron cargar los proyectos: ${projectError.message}`);

  return { profile, projects: await hydrateProjects(supabase, (projectData ?? []) as ProjectRow[]) };
}

export async function getLearningUnits(): Promise<LearningUnit[]> {
  if (!isSupabaseConfigured()) {
    return SOCIAL_PILOT_UNITS.map((unit) => ({
      courseSlug: unit.courseSlug,
      lessonSlug: unit.lessonSlug,
      courseTitle: unit.courseTitle,
      lessonTitle: unit.lessonTitle,
      projectPrompt: unit.prompt,
    }));
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("social_learning_units")
    .select("*")
    .eq("enabled", true)
    .order("created_at", { ascending: true });
  if (error) throw new Error(`No se pudieron cargar las lecciones piloto: ${error.message}`);
  return ((data ?? []) as UnitRow[]).map(mapUnit);
}

export async function getModerationReports(): Promise<ModerationReport[]> {
  const member = await getCurrentMember();
  if (!member || member.role === "member") return [];
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("content_reports")
    .select("*")
    .in("status", ["open", "reviewing"])
    .order("created_at", { ascending: true });
  if (error) throw new Error(`No se pudo cargar la cola: ${error.message}`);

  const rows = (data ?? []) as Array<{
    id: string;
    reporter_id: string;
    target_type: "project" | "review" | "profile";
    target_id: string;
    reason: string;
    details: string | null;
    status: "open" | "reviewing" | "resolved" | "dismissed";
    created_at: string;
  }>;
  const reporters = await fetchProfiles(supabase, [...new Set(rows.map((row) => row.reporter_id))]);

  return Promise.all(
    rows.map(async (row) => ({
      id: row.id,
      reporterId: row.reporter_id,
      targetType: row.target_type,
      targetId: row.target_id,
      reason: row.reason,
      details: row.details,
      status: row.status,
      createdAt: row.created_at,
      reporter: reporters.get(row.reporter_id) ?? null,
      targetLabel: await getTargetLabel(supabase, row.target_type, row.target_id),
    })),
  );
}

async function hydrateProjects(supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>, rows: ProjectRow[]) {
  if (!rows.length) return [];
  const [profiles, units, reviewCounts] = await Promise.all([
    fetchProfiles(supabase, [...new Set(rows.map((row) => row.author_id))]),
    fetchUnits(supabase),
    fetchReviewCounts(supabase, rows.map((row) => row.id)),
  ]);

  return rows.flatMap((row) => {
    const author = profiles.get(row.author_id);
    const unit = units.get(unitKey(row.course_slug, row.lesson_slug));
    return author && unit ? [mapProject(row, author, unit, reviewCounts.get(row.id) ?? 0)] : [];
  });
}

async function fetchProfiles(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  ids: string[],
) {
  const result = new Map<string, PublicProfile>();
  if (!ids.length) return result;
  const { data, error } = await supabase.from("profiles").select("*").in("id", ids);
  if (error) throw new Error(`No se pudieron cargar los autores: ${error.message}`);
  ((data ?? []) as ProfileRow[]).forEach((row) => result.set(row.id, mapProfile(row)));
  return result;
}

async function fetchUnits(supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>) {
  const result = new Map<string, LearningUnit>();
  const { data, error } = await supabase.from("social_learning_units").select("*");
  if (error) throw new Error(`No se pudieron cargar las lecciones: ${error.message}`);
  ((data ?? []) as UnitRow[]).forEach((row) => {
    const unit = mapUnit(row);
    result.set(unitKey(unit.courseSlug, unit.lessonSlug), unit);
  });
  return result;
}

async function fetchReviewCounts(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  projectIds: string[],
) {
  const counts = new Map<string, number>();
  if (!projectIds.length) return counts;
  const { data, error } = await supabase
    .from("project_reviews")
    .select("project_id")
    .in("project_id", projectIds)
    .eq("status", "published");
  if (error) throw new Error(`No se pudieron contar las revisiones: ${error.message}`);
  ((data ?? []) as Array<{ project_id: string }>).forEach((row) => {
    counts.set(row.project_id, (counts.get(row.project_id) ?? 0) + 1);
  });
  return counts;
}

async function getTargetLabel(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  targetType: "project" | "review" | "profile",
  targetId: string,
) {
  let value = "Contenido no disponible";
  if (targetType === "project") {
    const { data } = await supabase.from("learning_projects").select("title").eq("id", targetId).maybeSingle();
    if (typeof data?.title === "string") value = data.title;
  } else if (targetType === "review") {
    const { data } = await supabase.from("project_reviews").select("feedback").eq("id", targetId).maybeSingle();
    if (typeof data?.feedback === "string") value = data.feedback;
  } else {
    const { data } = await supabase.from("profiles").select("username").eq("id", targetId).maybeSingle();
    if (typeof data?.username === "string") value = data.username;
  }
  return value.length > 120 ? `${value.slice(0, 117)}…` : value;
}

function mapProfile(row: ProfileRow): PublicProfile {
  return {
    id: row.id,
    username: row.username,
    displayName: row.display_name,
    bio: row.bio,
    website: row.website,
    interests: row.interests ?? [],
    createdAt: row.created_at,
  };
}

function mapUnit(row: UnitRow): LearningUnit {
  return {
    courseSlug: row.course_slug,
    lessonSlug: row.lesson_slug,
    courseTitle: row.course_title,
    lessonTitle: row.lesson_title,
    projectPrompt: row.project_prompt,
  };
}

function mapProject(
  row: ProjectRow,
  author: PublicProfile,
  unit: LearningUnit,
  reviewCount: number,
): LearningProject {
  return {
    id: row.id,
    authorId: row.author_id,
    courseSlug: row.course_slug,
    lessonSlug: row.lesson_slug,
    title: row.title,
    summary: row.summary,
    whatBuilt: row.what_built,
    whatLearned: row.what_learned,
    obstacles: row.obstacles,
    technologies: row.technologies ?? [],
    difficulty: row.difficulty,
    repositoryUrl: row.repository_url,
    demoUrl: row.demo_url,
    status: row.status,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    author,
    unit,
    reviewCount,
  };
}

function mapReview(row: ReviewRow, reviewer: PublicProfile): ProjectReview {
  return {
    id: row.id,
    projectId: row.project_id,
    reviewerId: row.reviewer_id,
    worksCorrectly: row.works_correctly,
    explanationRating: row.explanation_rating,
    educationalValue: row.educational_value,
    feedback: row.feedback,
    suggestion: row.suggestion,
    createdAt: row.created_at,
    reviewer,
  };
}

function unitKey(courseSlug: string, lessonSlug: string) {
  return `${courseSlug}/${lessonSlug}`;
}
