import { Education } from './education/education.schema';
import { Experience } from './experience/experience.schema';
import { PersonalInfo } from './personal-info/personal-info.schema';
import { Project } from './projects/project.schema';
import { Skill } from './skills/skills.schema';

export interface ResumeState {
  templateId: TemplateId | null;
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
}

export type TemplateId = 't1' | 't2' | 't3' | 't4' | 't5';

export interface Resume {
  id: string;
  title: string;
  templateId: TemplateId;
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];

  createdAt: string;
  updatedAt: string;
}
