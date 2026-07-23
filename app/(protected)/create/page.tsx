'use client';
import { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useSession } from 'next-auth/react';

import styles from './page.module.css';
import ResumeStepper from '@/components/resume-stepper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { resetResume, selectResumeTemplate } from '@/features/resume/resume.slice';
import { TemplateId } from '@/features/resume/resume.types';
import ResumeTemplate from '@/components/resume-viewer/resume-template';
import Image from 'next/image';

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
    image: '/r1.jpg',
  },
  {
    templateId: 't2',
    name: 'Template 2',
    description: 'A clean and simple layout focused entirely on your content.',
    image: '/r2.png',
  },
  {
    templateId: 't3',
    name: 'Template 3',
    description: 'A bold, contemporary layout for creative and product roles.',
    image: '/r3.png',
  },
];

export default function CreateResumePage() {
  const { data: session, status } = useSession();
  const { templateId } = useSelector((state: RootState) => state.resume);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId | null>(templateId);

  if (status === 'loading' || !session?.user) return <p>Loading...</p>;

  if (templateId) {
    return (
      <Box className={styles.page}>
        <Stack direction={'row'} spacing={2} className={styles.actions}>
          <Button>Go back</Button>
          <Button variant={'contained'} onClick={() => dispatch(resetResume())}>
            Clear
          </Button>
        </Stack>
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
            <Box
              key={template.templateId}
              className={`${styles.templateCard} ${selected ? styles.selectedTemplate : ''}`}
              onClick={() => setSelectedTemplate(template.templateId)}
            >
              {selected && <CheckCircleRoundedIcon color="primary" className={styles.checkIcon} />}
              <Box className={styles.previewViewport}>
                <Image src={template.image} alt={template.name} fill className={styles.resumeImage} loading="eager" sizes="100%" />
              </Box>
            </Box>
          );
        })}
      </Box>

      <Stack direction="row" className={styles.actions}>
        {/* <Button
          variant="outlined"
          size="large"
          startIcon={<VisibilityOutlinedIcon />}
          disabled={!selectedTemplate}
          onClick={() => setPreviewOpen(true)}
        >
          Preview
        </Button> */}
        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowForwardRoundedIcon />}
          disabled={!selectedTemplate}
          onClick={() => selectedTemplate && dispatch(selectResumeTemplate(selectedTemplate))}
        >
          Continue
        </Button>
      </Stack>
      {/* <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Resume preview</DialogTitle>
        <DialogContent className={styles.dialogPreviewContent}>
          {selectedTemplate && (
            <div className={styles.dialogPreviewPaper}>
              <Image src={templates.find((t) => t.templateId === selectedTemplate)?.image} alt="Resume Preview" layout="fill" objectFit="cover" />
            </div>
          )}
        </DialogContent>
      </Dialog> */}
    </Box>
  );
}
