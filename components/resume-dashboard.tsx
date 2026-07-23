'use client';

import { useEffect } from 'react';
import { Box, Button, Chip, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { fetchSavedResumes } from '@/features/resumes/resumes.action';
import styles from '@/app/(protected)/page.module.css';

export default function ResumeDashboard() {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const { resumes, loading } = useSelector((state: RootState) => state.resumes);
  useEffect(() => { if (session?.user?.email) dispatch(fetchSavedResumes({ userId: session.user.email })); }, [dispatch, session?.user?.email]);
  if (loading) return <Box className={styles.loading}><CircularProgress size={28} /></Box>;
  if (!resumes.length) return <Paper elevation={0} className={styles.emptyState}><Box className={styles.iconWrapper}><DescriptionOutlinedIcon /></Box><Typography variant="h5" className={styles.emptyTitle}>No resumes yet</Typography><Typography className={styles.emptyDescription}>Choose a template and create your first professional resume.</Typography><Button href="/create" variant="contained" startIcon={<AddRoundedIcon />} className={styles.emptyButton}>Create Resume</Button></Paper>;
  return <Box className={styles.resumeGrid}>{resumes.map((resume) => <Paper key={resume.id} elevation={0} className={styles.resumeCard}><Stack direction="row" className={styles.cardHeader}><Box className={styles.cardIcon}><DescriptionOutlinedIcon /></Box><Chip size="small" label={resume.templateId.toUpperCase()} /></Stack><Typography variant="h6" className={styles.cardTitle}>{resume.title}</Typography><Typography variant="body2" color="text.secondary">Updated {new Date(Number(resume.updatedAt)).toLocaleDateString()}</Typography><Button href={`/resume/${resume.id}`} size="small" endIcon={<ArrowForwardRoundedIcon />} className={styles.viewButton}>View resume</Button></Paper>)}</Box>;
}
