import { Resume } from '@/features/resume/resume.types';
import ModernTemplate from './templates/modern/modern.template';
import SidebarTemplate from './templates/sidebar.template';
import CreativeTemplate from './templates/creative.template';
import ClassicTemplate from './templates/classic.template';
import MinimalTemplate from './templates/minimal.template';

interface ResumeTemplateProps {
  resume: Resume;
}

export default function ResumeTemplate({ resume }: ResumeTemplateProps) {
  switch (resume.templateId) {
    case 't1':
      return <CreativeTemplate resume={resume} />;

    case 't2':
      return <ClassicTemplate resume={resume} />;

    case 't3':
      return <SidebarTemplate resume={resume} />;
    case 't4':
      return <SidebarTemplate resume={resume} />;
    case 't5':
      return <CreativeTemplate resume={resume} />;
    default:
      return <ModernTemplate resume={resume} />;
  }
}
