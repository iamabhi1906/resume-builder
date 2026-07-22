import { z } from 'zod';

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, 'Category name is required').max(50, 'Category name is too long'),
  skills: z.array(z.string().trim().min(1, 'Skill cannot be empty').max(50, 'Skill name is too long')).min(1, 'Add at least one skill'),
});

export type Skill = z.infer<typeof skillSchema>;
