'use client';

import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Container, IconButton, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { useRouter } from 'next/navigation';

import styles from './resume-viewer.module.css';
import ResumeTemplate from './resume-template';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { selectResume } from '@/features/resumes/resumes.slice';
import { useDispatch } from 'react-redux';
import { fetchSavedResumes, updateResumeStore } from '@/features/resumes/resumes.action';
import { useSession } from 'next-auth/react';

interface ResumeViewerProps {
  resumeId: string;
}

export default function ResumeViewer({ resumeId }: ResumeViewerProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState('');
  const [savingTitle, setSavingTitle] = useState(false);
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const { resume } = useSelector((state: RootState) => state.resumes);

  useEffect(() => {
    if (!session?.user?.email) return;
    setLoading(true);
    dispatch(fetchSavedResumes({ userId: session.user.email }))
      .unwrap()
      .then((resumes) => {
        if (resumes.some((item) => item.id === resumeId)) dispatch(selectResume(resumeId));
      })
      .catch((error) => console.error('Failed to load resume:', error))
      .finally(() => setLoading(false));
  }, [dispatch, resumeId, session?.user?.email]);

  const handleExportPDF = () => {
    window.print();
  };

  const saveTitle = async () => {
    if (!resume || !session?.user?.email) return;
    const nextTitle = title.trim();
    if (!nextTitle || nextTitle === resume.title) {
      setEditingTitle(false);
      return;
    }
    setSavingTitle(true);
    try {
      await dispatch(updateResumeStore({ userId: session.user.email, resume: { ...resume, title: nextTitle, updatedAt: Date.now().toString() } })).unwrap();
      setEditingTitle(false);
    } finally {
      setSavingTitle(false);
    }
  };

  if (loading) {
    return (
      <Box className={styles.loadingPage}>
        <CircularProgress size={32} />

        <Typography color="text.secondary">Loading resume...</Typography>
      </Box>
    );
  }

  if (!resume) {
    return (
      <Box className={styles.notFoundPage}>
        <Paper elevation={0} className={styles.notFoundCard}>
          <Box className={styles.notFoundIcon}>
            <DescriptionOutlinedIcon />
          </Box>

          <Typography variant="h5">Resume not found</Typography>

          <Button variant="contained" onClick={() => router.push('/')}>
            Back to Resumes
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box className={styles.page}>
      <Box className={styles.toolbar}>
        <Container maxWidth="xl">
          <Stack direction="row" spacing={2} className={styles.toolbarRow}>
            <Stack direction="row" spacing={1.5}>
              <Tooltip title="Back">
                <IconButton onClick={() => router.back()}>
                  <ArrowBackRoundedIcon />
                </IconButton>
              </Tooltip>

              <Box>
                {editingTitle ? (
                  <Stack direction="row" spacing={0.5} className={styles.titleEditor}>
                    <TextField
                      autoFocus
                      value={title}
                      size="small"
                      onChange={(event) => setTitle(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') saveTitle();
                        if (event.key === 'Escape') setEditingTitle(false);
                      }}
                      slotProps={{ htmlInput: { maxLength: 80, 'aria-label': 'Resume name' } }}
                      className={styles.titleInput}
                    />
                    <IconButton size="small" disabled={savingTitle} onClick={saveTitle} aria-label="Save resume name"><CheckRoundedIcon fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => setEditingTitle(false)} aria-label="Cancel"><CloseRoundedIcon fontSize="small" /></IconButton>
                  </Stack>
                ) : (
                  <Stack direction="row" spacing={0.25} className={styles.titleEditor}>
                    <Typography noWrap>{resume.title}</Typography>
                    <Tooltip title="Rename resume"><IconButton size="small" onClick={() => { setTitle(resume.title); setEditingTitle(true); }} aria-label="Rename resume"><EditOutlinedIcon className={styles.renameIcon} /></IconButton></Tooltip>
                  </Stack>
                )}

                <Typography variant="caption" color="text.secondary">
                  Resume Preview
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                startIcon={<EditOutlinedIcon />}
                onClick={() => router.push(`/resume/${resume.id}/edit`)}
                className={styles.desktopAction}
              >
                Edit
              </Button>

              <Tooltip title="Print">
                <IconButton className={styles.mobileAction} onClick={handleExportPDF}>
                  <PrintOutlinedIcon />
                </IconButton>
              </Tooltip>

              <Button variant="contained" startIcon={<DownloadRoundedIcon />} onClick={handleExportPDF}>
                Export PDF
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Box className={styles.workspace}>
        <Box className={styles.resumeContainer}>
          <Paper elevation={0} className={styles.resumePaper} id="resume-print-area">
            <ResumeTemplate resume={resume} />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
