import { z } from 'zod';

export const resumeLinkSchema = z.object({
  label: z.string().trim().max(100, 'Display text is too long'),
  url: z.url('Enter a valid URL').or(z.literal('')),
});

export const personalInfoSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(50),

  lastName: z.string().trim().min(1, 'Last name is required').max(50),

  headline: z.string().trim().max(100, 'Headline is too long').optional(),

  email: z.email('Enter a valid email address'),

  phone: z.string().trim().max(30, 'Phone number is too long').optional(),

  location: z.string().trim().max(100, 'Location is too long').optional(),

  photoUrl: z.url('Enter a valid image URL').or(z.literal('')).optional(),

  website: resumeLinkSchema.optional(),

  linkedin: resumeLinkSchema.optional(),

  github: resumeLinkSchema.optional(),

  summary: z.string().trim().max(2000, 'Summary is too long').optional(),
});

export type ResumeLink = z.infer<typeof resumeLinkSchema>;

export type PersonalInfo = z.infer<typeof personalInfoSchema>;

export const personalInfoDefaultValues: PersonalInfo = {
  firstName: '',
  lastName: '',
  headline: '',
  email: '',
  phone: '',
  location: '',
  photoUrl: '',

  website: {
    label: '',
    url: '',
  },

  linkedin: {
    label: '',
    url: '',
  },

  github: {
    label: '',
    url: '',
  },

  summary: '',
};
