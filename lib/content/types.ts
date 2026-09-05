export const contentTypes = ["course", "lesson", "project"] as const;
export type ContentType = (typeof contentTypes)[number];
export const contentStatuses = ["draft", "published", "archived"] as const;
export type ContentStatus = (typeof contentStatuses)[number];
export const levels = ["beginner", "intermediate", "advanced"] as const;
export type ContentLevel = (typeof levels)[number];

export type ContentMetadata = {
  id: string;
  type: ContentType;
  slug: string;
  title: string;
  description: string;
  course?: string;
  module?: string;
  level?: ContentLevel;
  estimatedMinutes?: number;
  status: ContentStatus;
  concepts: string[];
  skills: string[];
  prerequisites: string[];
  updated: string;
  lessons?: string[];
};

export type CanonicalContentDocument = ContentMetadata & {
  body: string;
  sourcePath: string;
  contentHash: string;
};
