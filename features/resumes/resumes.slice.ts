import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavedResumesState } from './resumes.types';
import { fetchSavedResumes, saveResumeStore, updateResumeStore } from './resumes.action';

const initialState: SavedResumesState = {
  resumes: [],
  resume: null,
  loading: false,
  error: null,
};

const resumesSlice = createSlice({
  name: 'resumes',
  initialState,
  reducers: {
    clearSavedResumes: (state) => {
      state.resumes = [];
      state.error = null;
    },
    selectResume: (state, action: PayloadAction<string>) => {
      state.resume = state.resumes.find((resume) => resume.id === action.payload) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedResumes.fulfilled, (state, action) => {
        state.loading = false;

        state.resumes = action.payload;
      })
      .addCase(fetchSavedResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load resumes';
      })
      .addCase(saveResumeStore.fulfilled, (state, action) => {
        state.resumes.push(action.payload);
        state.resume = action.payload;
      })
      .addCase(updateResumeStore.fulfilled, (state, action) => {
        const index = state.resumes.findIndex((resume) => resume.id === action.payload.id);
        if (index !== -1) state.resumes[index] = action.payload;
        state.resume = action.payload;
      });
  },
});
export const { clearSavedResumes, selectResume } = resumesSlice.actions;

const resumesReducer = resumesSlice.reducer;
export default resumesReducer;
