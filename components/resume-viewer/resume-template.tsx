import { Resume } from '@/features/resume/resume.types';
import ModernTemplate from './templates/modern/modern.template';

interface ResumeTemplateProps {
  resume: Resume;
}

export default function ResumeTemplate({ resume }: ResumeTemplateProps) {
  switch (resume.templateId) {
    case 't1':
      return <ModernTemplate resume={resume} />;

    case 't2':
      return <ModernTemplate resume={resume} />;

    case 't3':
    default:
      return <ModernTemplate resume={resume} />;
  }
}
