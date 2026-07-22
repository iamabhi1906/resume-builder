import { z } from "zod";

export const projectSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .trim()
    .min(1, "Project name is required")
    .max(100, "Project name is too long"),
  description: z
    .string()
    .trim()
    .min(1, "Project description is required")
    .max(2000, "Description is too long"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  isCurrent: z.boolean().default(false),
  projectUrl: z.url("Enter a valid project URL").optional(),
  repositoryUrl: z.url("Enter a valid repository URL").optional(),

  technologies: z
    .array(z.string().trim().min(1, "Technology cannot be empty"))
    .default([]),

  highlights: z
    .array(
      z
        .string()
        .trim()
        .min(1, "Highlight cannot be empty")
        .max(500, "Highlight is too long"),
    )
    .default([]),
});



export type Project = z.infer<typeof projectSchema>;