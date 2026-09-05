import { z } from "zod";
import { contentStatuses, contentTypes, levels } from "./types.ts";

export const contentFrontmatterSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  type: z.enum(contentTypes),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  description: z.string().min(1),
  course: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  module: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  level: z.enum(levels).optional(),
  estimatedMinutes: z.number().int().positive().optional(),
  status: z.enum(contentStatuses),
  concepts: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)),
  skills: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)),
  prerequisites: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  lessons: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).optional(),
});

export type ContentFrontmatter = z.infer<typeof contentFrontmatterSchema>;
