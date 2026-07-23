import { Resume } from '@/features/resume/resume.types';
import styles from '../resume-base.module.css';
import type { ReactNode } from 'react';

export default function ModernTemplate({ resume }: { resume: Resume }) { return <ResumeBody resume={resume} />; }

export function ResumeBody({ resume, variant = '' }: { resume: Resume; variant?: string }) {
  const { personalInfo, experiences, education, projects, skills } = resume;
  const name = [personalInfo.firstName, personalInfo.lastName].filter(Boolean).join(' ') || 'Your Name';
  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean);
  return <main className={`${styles.page} ${variant}`}>
    <header className={styles.header}>{personalInfo.photoUrl && <img className={styles.photo} src={personalInfo.photoUrl} alt={`${name} profile`} />}<div><h1 className={styles.name}>{name}</h1>{personalInfo.headline && <p className={styles.headline}>{personalInfo.headline}</p>}<div className={styles.contact}>{contacts.map((value) => <span key={value}>{value}</span>)}{[personalInfo.github, personalInfo.linkedin, personalInfo.website].filter((link) => link?.url).map((link) => <a key={link!.url} href={link!.url} target="_blank">{link!.label || link!.url}</a>)}</div></div></header>
    {personalInfo.summary && <Section title="Summary"><p className={styles.description}>{personalInfo.summary}</p></Section>}
    {experiences.length > 0 && <Section title="Experience">{experiences.map((item) => <article key={item.id} className={styles.entry}><div className={styles.entryHeader}><div><h3 className={styles.entryTitle}>{item.position}</h3><p className={styles.entryMeta}>{item.company}{item.location ? ` · ${item.location}` : ''}</p></div><time className={styles.date}>{item.startDate} — {item.isCurrent ? 'Present' : item.endDate}</time></div>{item.description && <p className={styles.description}>{item.description}</p>}{item.highlights.length > 0 && <ul className={styles.highlights}>{item.highlights.map((highlight, index) => <li key={`${highlight.value}-${index}`}>{highlight.value}</li>)}</ul>}</article>)}</Section>}
    {education.length > 0 && <Section title="Education">{education.map((item) => <article key={item.id} className={styles.entry}><div className={styles.entryHeader}><h3 className={styles.entryTitle}>{item.institution}</h3><time className={styles.date}>{item.startDate} — {item.isCurrent ? 'Present' : item.endDate}</time></div></article>)}</Section>}
    {projects.length > 0 && <Section title="Projects">{projects.map((item) => <article key={item.id} className={styles.entry}><h3 className={styles.projectTitle}>{item.name}</h3><p className={styles.description}>{item.description}</p>{item.technologies.length > 0 && <p className={styles.description}><strong>Technologies:</strong> {item.technologies.join(', ')}</p>}</article>)}</Section>}
    {skills.length > 0 && <Section title="Skills">{skills.map((group) => <p key={group.id} className={styles.skillLine}><strong>{group.name}:</strong> {group.skills.join(', ')}</p>)}</Section>}
  </main>;
}
function Section({ title, children }: { title: string; children: ReactNode }) { return <section className={styles.section}><h2 className={styles.sectionTitle}>{title}</h2>{children}</section>; }
