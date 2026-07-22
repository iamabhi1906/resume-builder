import { createAsyncThunk } from '@reduxjs/toolkit';

import type { Resume } from '../resume/resume.types';

interface SaveResumePayload {
  userId: string;
  resume: Resume;
}

interface FetchResumesPayload {
  userId: string;
}

export const fetchSavedResumes = createAsyncThunk<Resume[], FetchResumesPayload>('savedResumes/fetch', async ({ userId }) => {
  const key = `resumes:${userId}`;

  const data = localStorage.getItem(key);

  if (!data) {
    return [];
  }

  return JSON.parse(data) as Resume[];
});

export const saveResumeStore = createAsyncThunk<Resume, SaveResumePayload>('savedResumes/save', async ({ userId, resume }) => {
  const key = `resumes:${userId}`;
  const existing = localStorage.getItem(key);
  const resumes: Resume[] = existing ? JSON.parse(existing) : [];
  const updatedResumes = [...resumes, resume];
  localStorage.setItem(key, JSON.stringify(updatedResumes));
  return resume;
});
