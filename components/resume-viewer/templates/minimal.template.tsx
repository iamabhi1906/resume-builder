import { Resume } from '@/features/resume/resume.types';
import { ResumeBody } from './modern/modern.template';
import styles from './resume-base.module.css';
export default function MinimalTemplate({ resume }: { resume: Resume }) { return <ResumeBody resume={resume} variant={styles.minimal} />; }
