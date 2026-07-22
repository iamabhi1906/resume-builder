import type { Resume } from '../resume/resume.types';

export interface SavedResumesState {
  resumes: Resume[];
  resume: Resume | null;
  loading: boolean;
  error: string | null;
}
