'use client';

import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { fetchSavedResumes } from '@/features/resumes/resumes.action';
import { setResume } from '@/features/resume/resume.slice';
import ResumeStepper from '@/components/resume-stepper';
import styles from './page.module.css';

export default function EditResumePage() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { resumes } = useSelector((state: RootState) => state.resumes);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!session?.user?.email) return;
    dispatch(fetchSavedResumes({ userId: session.user.email })).unwrap().then((saved) => {
      const resume = saved.find((item) => item.id === id);
      if (!resume) return router.replace('/');
      dispatch(setResume({ templateId: resume.templateId, personalInfo: resume.personalInfo, experiences: resume.experiences, education: resume.education, projects: resume.projects, skills: resume.skills }));
      setReady(true);
    });
  }, [dispatch, id, router, session?.user?.email]);
  if (!session?.user || !ready) return <Box className={styles.loading}><CircularProgress /><Typography>Loading editor…</Typography></Box>;
  return <Box className={styles.page}><ResumeStepper user={session.user} resumeId={id} /></Box>;
}
