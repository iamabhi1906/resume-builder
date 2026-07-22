import z from 'zod';

export const educationFormSchema = z
  .object({
    institution: z.string().trim().min(1, 'Institution name is required').max(150, 'Institution name is too long'),
    degree: z.string().trim().min(1, 'Degree is required').max(100, 'Degree is too long'),
    location: z.string().trim().max(100, 'Location is too long').optional(),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().optional(),
    isCurrent: z.boolean(),
    grade: z.string().trim().max(50, 'Grade is too long').optional(),
  })
  .refine((data) => data.isCurrent || Boolean(data.endDate), {
    message: 'End date is required',
    path: ['endDate'],
  });

export type EducationFormData = z.infer<typeof educationFormSchema>;

export const educationDefaultValues: EducationFormData = {
  institution: '',
  degree: '',
  location: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  grade: '',
};
