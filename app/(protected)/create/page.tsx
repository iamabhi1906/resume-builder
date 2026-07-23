'use client';
import { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, Paper, Stack, Typography } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useSession } from 'next-auth/react';

import styles from './page.module.css';
import ResumeStepper from '@/components/resume-stepper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { selectResumeTemplate } from '@/features/resume/resume.slice';
import { TemplateId } from '@/features/resume/resume.types';
import ResumeTemplate from '@/components/resume-viewer/resume-template';

interface ResumeTemplate {
  templateId: TemplateId;
  name: string;
  description: string;
  image: string;
}

const templates: ResumeTemplate[] = [
  {
    templateId: 't1',
    name: 'Template 1',
    description: 'A traditional resume layout suitable for most professional roles.',
    image: '/r1.png',
  },
  {
    templateId: 't2',
    name: 'Template 2',
    description: 'A modern layout with strong typography and clear sections.',
    image: '/r2.png',
  },
  {
    templateId: 't3',
    name: 'Template 3',
    description: 'A clean and simple layout focused entirely on your content.',
    image: '/r3.png',
  },
  {
    templateId: 't4',
    name: 'Template 4',
    description: 'A refined editorial layout with a focused profile sidebar.',
    image: '',
  },
  {
    templateId: 't5',
    name: 'Template 5',
    description: 'A bold, contemporary layout for creative and product roles.',
    image: '',
  },
];

export default function CreateResumePage() {
  const { data: session, status } = useSession();

  const { templateId } = useSelector((state: RootState) => state.resume);
  const resumeState = useSelector((state: RootState) => state.resume);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId | null>(templateId);
  const [previewOpen, setPreviewOpen] = useState(false);

  if (status === 'loading' || !session?.user) return <p>Loading...</p>;

  if (templateId) {
    return (
      <Box className={styles.page}>
        <ResumeStepper user={session?.user} />
      </Box>
    );
  }

  return (
    <Box className={styles.page}>
      <Box className={styles.header}>
        <Typography component="h1" className={styles.title}>
          Choose your resume template
        </Typography>
      </Box>

      <Box className={styles.templateGrid}>
        {templates.map((template) => {
          const selected = selectedTemplate === template.templateId;
          return (
            <Paper
              key={template.templateId}
              elevation={0}
              className={`${styles.templateCard} ${selected ? styles.selectedTemplate : ''}`}
              onClick={() => setSelectedTemplate(template.templateId)}
            >
              {selected && <CheckCircleRoundedIcon color="primary" className={styles.checkIcon} />}
              <div className={styles.previewViewport}>
                <div className={styles.livePreview}><ResumeTemplate resume={{ ...resumeState, id: 'preview', title: 'Preview', templateId: template.templateId, createdAt: '', updatedAt: '' }} /></div>
              </div>
              <Box className={styles.templateInfo}>
                <Typography variant="h6">{template.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {template.description}
                </Typography>
              </Box>
            </Paper>
          );
        })}
      </Box>

      <Stack direction="row" className={styles.actions}>
        <Button variant="outlined" size="large" startIcon={<VisibilityOutlinedIcon />} disabled={!selectedTemplate} onClick={() => setPreviewOpen(true)}>Preview</Button>
        <Button variant="contained" size="large" endIcon={<ArrowForwardRoundedIcon />} disabled={!selectedTemplate} onClick={() => selectedTemplate && dispatch(selectResumeTemplate(selectedTemplate))}>
          Continue
        </Button>
      </Stack>
      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Resume preview</DialogTitle>
        <DialogContent className={styles.dialogPreviewContent}>
          {selectedTemplate && <div className={styles.dialogPreviewPaper}><ResumeTemplate resume={{ ...resumeState, id: 'preview', title: 'Preview', templateId: selectedTemplate, createdAt: '', updatedAt: '' }} /></div>}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
