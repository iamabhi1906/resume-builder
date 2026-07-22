import { z } from 'zod';

const fieldItemSchema = z.object({
  value: z.string().trim().min(1, 'Value cannot be empty'),
});

export const projectFormSchema = z.object({
  name: z.string().trim().min(1, 'Project name is required').max(100, 'Project name is too long'),
  description: z.string().trim().min(1, 'Project description is required').max(2000, 'Description is too long'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  isCurrent: z.boolean(),
  projectUrl: z.url('Enter a valid project URL').or(z.literal('')).optional(),
  repositoryUrl: z.url('Enter a valid repository URL').or(z.literal('')).optional(),
  technologies: z.array(
    fieldItemSchema.extend({
      value: z.string().trim().min(1, 'Technology cannot be empty').max(50, 'Technology is too long'),
    }),
  ),
  highlights: z.array(
    fieldItemSchema.extend({
      value: z.string().trim().min(1, 'Highlight cannot be empty').max(500, 'Highlight is too long'),
    }),
  ),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;

export const projectDefaultValues: ProjectFormData = {
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  projectUrl: '',
  repositoryUrl: '',
  technologies: [],
  highlights: [],
};
