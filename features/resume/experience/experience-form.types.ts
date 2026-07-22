import { z } from 'zod';
import { EmploymentType } from './experience.types';

export const experienceFormSchema = z
  .object({
    company: z.string().trim().min(1, 'Company name is required').max(100, 'Company name is too long'),

    position: z.string().trim().min(1, 'Position is required').max(100, 'Position is too long'),

    location: z.string().trim().max(100, 'Location is too long').optional(),
    employmentType: z.enum(EmploymentType),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().optional(),
    isCurrent: z.boolean(),
    description: z.string().trim().max(2000, 'Description is too long').optional(),

    highlights: z.array(
      z.object({
        value: z.string().trim().min(1, 'Highlight cannot be empty').max(500, 'Highlight is too long'),
      }),
    ),
  })
  .refine(
    (data) => {
      if (data.isCurrent) {
        return true;
      }

      return Boolean(data.endDate);
    },
    {
      message: 'End date is required',
      path: ['endDate'],
    },
  );

export type ExperienceFormData = z.infer<typeof experienceFormSchema>;

export const experienceDefaultValues: ExperienceFormData = {
  company: '',
  position: '',
  location: '',
  employmentType: EmploymentType.INTERNSHIP,
  startDate: '',
  endDate: '',
  isCurrent: false,
  description: '',
  highlights: [],
};
