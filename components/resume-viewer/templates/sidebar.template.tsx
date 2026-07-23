import { Resume } from '@/features/resume/resume.types';
import styles from './sidebar.template.module.css';
import type { ReactNode } from 'react';

export default function SidebarTemplate({ resume }: { resume: Resume }) {
  const { personalInfo, experiences, education, projects, skills } = resume;
  const name = [personalInfo.firstName, personalInfo.lastName].filter(Boolean).join(' ') || 'Your Name';
  return <main className={styles.page}><aside className={styles.sidebar}>{personalInfo.photoUrl && <img className={styles.photo} src={personalInfo.photoUrl} alt={`${name} profile`} />}<h1>{name}</h1><p className={styles.headline}>{personalInfo.headline}</p><Side title="Contact">{[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).map((value) => <p key={value}>{value}</p>)}</Side>{skills.length > 0 && <Side title="Skills">{skills.map((group) => <p key={group.id}><b>{group.name}</b>: {group.skills.join(', ')}</p>)}</Side>}{personalInfo.summary && <Side title="Profile"><p>{personalInfo.summary}</p></Side>}</aside><div className={styles.content}><Section title="Experience">{experiences.map((item) => <article key={item.id}><h3>{item.position}</h3><p className={styles.meta}>{item.company} · {item.startDate} — {item.isCurrent ? 'Present' : item.endDate}</p><p>{item.description}</p></article>)}</Section><Section title="Education">{education.map((item) => <article key={item.id}><h3>{item.institution}</h3><p>{item.startDate} — {item.isCurrent ? 'Present' : item.endDate}</p></article>)}</Section><Section title="Projects">{projects.map((item) => <article key={item.id}><h3>{item.name}</h3><p>{item.description}</p></article>)}</Section></div></main>;
}
function Side({ title, children }: { title: string; children: ReactNode }) { return <section className={styles.sideSection}><h2>{title}</h2>{children}</section>; }
function Section({ title, children }: { title: string; children: ReactNode }) { return <section className={styles.section}>{children && <><h2>{title}</h2>{children}</>}</section>; }
