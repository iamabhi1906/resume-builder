'use client';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useSession } from 'next-auth/react';

import styles from './page.module.css';
import ResumeStepper from '@/components/resume-stepper';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { selectResumeTemplate } from '@/features/resume/resume.slice';
import { TemplateId } from '@/features/resume/resume.types';

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
];

export default function CreateResumePage() {
  const { data: session, status } = useSession();

  const { templateId } = useSelector((state: RootState) => state.resume);
  const dispatch = useDispatch<AppDispatch>();

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
          const selected = templateId === template.templateId;
          return (
            <Paper
              key={template.templateId}
              elevation={0}
              className={`${styles.templateCard} ${selected ? styles.selectedTemplate : ''}`}
              onClick={() => dispatch(selectResumeTemplate(template.templateId))}
            >
              {selected && <CheckCircleRoundedIcon color="primary" className={styles.checkIcon} />}
              <Image src={template.image} alt={template.templateId} width={210} height={297} />
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
        <Button variant="contained" size="large" endIcon={<ArrowForwardRoundedIcon />} disabled={!templateId}>
          Continue
        </Button>
      </Stack>
    </Box>
  );
}
