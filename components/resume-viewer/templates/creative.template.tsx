import { Resume } from '@/features/resume/resume.types';
import styles from './creative.template.module.css';
import type { ReactNode } from 'react';

export default function CreativeTemplate({ resume }: { resume: Resume }) {
  const { personalInfo, experiences, education, projects, skills } = resume;
  const name = [personalInfo.firstName, personalInfo.lastName].filter(Boolean).join(' ') || 'Your Name';
  return <main className={styles.page}><header className={styles.header}>{personalInfo.photoUrl && <img className={styles.photo} src={personalInfo.photoUrl} alt={`${name} profile`} />}<div><h1>{name}</h1><p>{personalInfo.headline}</p><small>{[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join('  •  ')}</small></div></header>{personalInfo.summary && <Section title="About"><p>{personalInfo.summary}</p></Section>}<Section title="Experience">{experiences.map((item) => <article key={item.id}><h3>{item.position} <span>— {item.company}</span></h3><small>{item.startDate} — {item.isCurrent ? 'Present' : item.endDate}</small><p>{item.description}</p></article>)}</Section><Section title="Projects">{projects.map((item) => <article key={item.id}><h3>{item.name}</h3><p>{item.description}</p></article>)}</Section><Section title="Education">{education.map((item) => <p key={item.id}>{item.institution} · {item.startDate} — {item.isCurrent ? 'Present' : item.endDate}</p>)}</Section><Section title="Skills">{skills.map((group) => <p key={group.id}><b>{group.name}</b> · {group.skills.join(' · ')}</p>)}</Section></main>;
}
function Section({ title, children }: { title: string; children: ReactNode }) { return <section className={styles.section}><h2>{title}</h2>{children}</section>; }
