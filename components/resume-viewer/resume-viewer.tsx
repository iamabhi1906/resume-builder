'use client';

import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Container, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

import { useRouter } from 'next/navigation';

import styles from './resume-viewer.module.css';
import ResumeTemplate from './resume-template';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { selectResume } from '@/features/resumes/resumes.slice';

interface ResumeViewerProps {
  resumeId: string;
}

export default function ResumeViewer({ resumeId }: ResumeViewerProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const { resume } = useSelector((state: RootState) => state.resumes);

  useEffect(() => {
    try {
      selectResume(resumeId);
    } catch (error) {
      console.error('Failed to load resume:', error);
    } finally {
      setLoading(false);
    }
  }, [resumeId]);

  const handleExportPDF = () => {
    window.print();
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
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
            <Stack direction="row" spacing={1.5}>
              <Tooltip title="Back">
                <IconButton onClick={() => router.back()}>
                  <ArrowBackRoundedIcon />
                </IconButton>
              </Tooltip>

              <Box>
                <Typography noWrap>{resume.title}</Typography>

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
