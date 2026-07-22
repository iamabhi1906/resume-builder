import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { Resume } from './resume.types';
import { User } from 'next-auth';
import { saveResumeStore } from '../resumes/resumes.action';

export const saveResume = createAsyncThunk<
  Resume,
  User,
  {
    state: RootState;
    rejectValue: string;
  }
>('resume/saveResume', async (user, { getState, rejectWithValue, dispatch }) => {
  try {
    const state = getState().resume;
    if (!state.templateId) {
      return rejectWithValue('Please select a resume template.');
    }
    if (!user.email) {
      return rejectWithValue('User email is missing.');
    }
    const id = crypto.randomUUID();
    const payload: Resume = {
      id,
      title: 'Untitled Resume',
      templateId: state.templateId,
      personalInfo: state.personalInfo,
      projects: state.projects,
      education: state.education,
      experiences: state.experiences,
      skills: state.skills,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };

    localStorage.setItem(`${user.email}:${id}`, JSON.stringify(payload));
    dispatch(saveResumeStore({ userId: user.email, resume: payload }));
    return payload;
  } catch {
    return rejectWithValue('Failed to save resume.');
  }
});
