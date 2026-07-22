import { z } from 'zod';

export const skillFormSchema = z.object({
  name: z.string().trim().min(1, 'Category name is required').max(50, 'Category name is too long'),

  skills: z
    .array(
      z.object({
        value: z.string().trim().min(1, 'Skill cannot be empty').max(50, 'Skill name is too long'),
      }),
    )
    .min(1, 'Add at least one skill'),
});

export type SkillFormData = z.infer<typeof skillFormSchema>;

export const skillDefaultValues: SkillFormData = {
  name: '',
  skills: [
    {
      value: '',
    },
  ],
};
