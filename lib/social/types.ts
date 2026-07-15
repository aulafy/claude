export type PublicProfile = {
  id: string;
  username: string;
  displayName: string;
  bio: string | null;
  website: string | null;
  interests: string[];
  createdAt: string;
};

export type LearningUnit = {
  courseSlug: string;
  lessonSlug: string;
  courseTitle: string;
  lessonTitle: string;
  projectPrompt: string;
};

export type LearningProject = {
  id: string;
  authorId: string;
  courseSlug: string;
  lessonSlug: string;
  title: string;
  summary: string;
  whatBuilt: string;
  whatLearned: string;
  obstacles: string | null;
  technologies: string[];
  difficulty: "principiante" | "intermedio" | "avanzado";
  repositoryUrl: string | null;
  demoUrl: string | null;
  status: "draft" | "published" | "hidden" | "removed";
  publishedAt: string | null;
  createdAt: string;
  author: PublicProfile;
  unit: LearningUnit;
  reviewCount: number;
};

export type ProjectReview = {
  id: string;
  projectId: string;
  reviewerId: string;
  worksCorrectly: "yes" | "partly" | "not_tested";
  explanationRating: number;
  educationalValue: number;
  feedback: string;
  suggestion: string | null;
  createdAt: string;
  reviewer: PublicProfile;
};

export type ProjectDetail = LearningProject & {
  reviews: ProjectReview[];
};

export type CurrentMember = {
  id: string;
  email: string | null;
  profile: PublicProfile | null;
  role: "member" | "moderator" | "admin";
};

export type ActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export const INITIAL_ACTION_STATE: ActionState = { status: "idle", message: "" };
