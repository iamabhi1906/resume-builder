import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { PersonalInfo, personalInfoDefaultValues } from '@/features/resume/personal-info/personal-info.schema';
import { Education } from './education/education.schema';
import { Project } from './projects/project.schema';
import { Skill } from './skills/skills.schema';
import { ResumeState, TemplateId } from './resume.types';
import { Experience } from './experience/experience.schema';
import { saveResume } from './resume.action';

const initialState: ResumeState = {
  templateId: null,
  personalInfo: personalInfoDefaultValues,
  experiences: [],
  education: [],
  projects: [],
  skills: [],
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    selectResumeTemplate: (state, action: PayloadAction<TemplateId>) => {
      state.templateId = action.payload;
    },

    updatePersonalInfo: (state, action: PayloadAction<Partial<PersonalInfo>>) => {
      state.personalInfo = {
        ...state.personalInfo,
        ...action.payload,
      };
    },

    setPersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
      state.personalInfo = action.payload;
    },

    addExperience: {
      reducer: (state, action: PayloadAction<Experience>) => {
        state.experiences.push(action.payload);
      },

      prepare: (experience: Omit<Experience, 'id'>) => ({
        payload: {
          ...experience,
          id: crypto.randomUUID(),
        },
      }),
    },

    updateExperience: (state, action: PayloadAction<Experience>) => {
      const index = state.experiences.findIndex((item) => item.id === action.payload.id);

      if (index !== -1) {
        state.experiences[index] = action.payload;
      }
    },

    removeExperience: (state, action: PayloadAction<string>) => {
      state.experiences = state.experiences.filter((item) => item.id !== action.payload);
    },

    addEducation: {
      reducer: (state, action: PayloadAction<Education>) => {
        state.education.push(action.payload);
      },

      prepare: (education: Omit<Education, 'id'>) => ({
        payload: {
          ...education,
          id: crypto.randomUUID(),
        },
      }),
    },

    updateEducation: (state, action: PayloadAction<Education>) => {
      const index = state.education.findIndex((item) => item.id === action.payload.id);

      if (index !== -1) {
        state.education[index] = action.payload;
      }
    },

    removeEducation: (state, action: PayloadAction<string>) => {
      state.education = state.education.filter((item) => item.id !== action.payload);
    },

    addProject: {
      reducer: (state, action: PayloadAction<Project>) => {
        state.projects.push(action.payload);
      },

      prepare: (project: Omit<Project, 'id'>) => ({
        payload: {
          ...project,
          id: crypto.randomUUID(),
        },
      }),
    },

    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex((item) => item.id === action.payload.id);

      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },

    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter((item) => item.id !== action.payload);
    },

    addSkill: {
      reducer: (state, action: PayloadAction<Skill>) => {
        state.skills.push(action.payload);
      },

      prepare: (skill: Omit<Skill, 'id'>) => ({
        payload: {
          ...skill,
          id: crypto.randomUUID(),
        },
      }),
    },

    updateSkill: (state, action: PayloadAction<Skill>) => {
      const index = state.skills.findIndex((item) => item.id === action.payload.id);

      if (index !== -1) {
        state.skills[index] = action.payload;
      }
    },

    removeSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter((item) => item.id !== action.payload);
    },

    setResume: (_state, action: PayloadAction<ResumeState>) => {
      return action.payload;
    },

    resetResume: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveResume.fulfilled, () => {
      return initialState;
    });
  },
});

export const {
  selectResumeTemplate,

  updatePersonalInfo,
  setPersonalInfo,

  addExperience,
  updateExperience,
  removeExperience,

  addEducation,
  updateEducation,
  removeEducation,

  addProject,
  updateProject,
  removeProject,

  addSkill,
  updateSkill,
  removeSkill,

  setResume,
  resetResume,
} = resumeSlice.actions;

const resumeReducer = resumeSlice.reducer;

export default resumeReducer;
