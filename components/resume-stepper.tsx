'use client';

import { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, Paper, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ExperienceSection from '@/features/resume/experience/experience-section';
import EducationSection from '@/features/resume/education/education.section';
import PersonalInfoSection from '@/features/resume/personal-info/personal-info.section';
import ProjectSection from '@/features/resume/projects/project.section';
import SkillSection from '@/features/resume/skills/skills.section';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { User } from 'next-auth';
import { saveResume, updateResume } from '@/features/resume/resume.action';
import { useRouter } from 'next/navigation';
import ResumeTemplate from '@/components/resume-viewer/resume-template';
import styles from './resume-stepper.module.css';

const steps = [
  {
    label: 'Personal Info',
    description: 'Basic information',
  },
  {
    label: 'Experience',
    description: 'Work experience',
  },
  {
    label: 'Education',
    description: 'Academic background',
  },
  {
    label: 'Projects',
    description: 'Your best projects',
  },
  {
    label: 'Skills',
    description: 'Technical skills',
  },
];

interface ResumeStepperProps {
  user: User;
  resumeId?: string;
}

export default function ResumeStepper({ user, resumeId }: ResumeStepperProps) {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const resumeState = useSelector((state: RootState) => state.resume);
  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;
  const dispatch = useDispatch<AppDispatch>();
  const handleNext = () => {
    if (isLastStep) {
      return;
    }
    setActiveStep((current) => current + 1);
  };
  const handleBack = () => {
    if (isFirstStep) {
      return;
    }
    setActiveStep((current) => current - 1);
  };
  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  return (
    <Paper variant="outlined" className={styles.stepper}>
      <Box className={styles.header}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={step.label} completed={activeStep > index}>
              <StepLabel
                onClick={() => handleStepClick(index)}
                className={styles.stepLabel}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box className={styles.content}>
        <StepContent activeStep={activeStep} />
      </Box>

      <Stack direction="row" className={styles.footer}>
        <Button type="button" startIcon={<ArrowBackIcon />} disabled={isFirstStep} onClick={handleBack}>
          Back
        </Button>

        <Typography variant="body2" color="text.secondary">
          Step {activeStep + 1} of {steps.length}
        </Typography>

        <Button type="button" startIcon={<VisibilityOutlinedIcon />} onClick={() => setPreviewOpen(true)} className={styles.previewButton}>Preview</Button>

        {isLastStep ? (
          <Button
            type="button"
            variant="contained"
            startIcon={<CheckIcon />}
            onClick={async () => {
              const resume = resumeId ? await dispatch(updateResume({ user, id: resumeId })).unwrap() : await dispatch(saveResume(user)).unwrap();
              router.replace(`/resume/${resume.id}`);
            }}
          >
            {resumeId ? 'Save changes' : 'Finish'}
          </Button>
        ) : (
          <Button type="button" variant="contained" endIcon={<ArrowForwardIcon />} onClick={handleNext}>
            Next
          </Button>
        )}
      </Stack>
      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Live resume preview</DialogTitle>
        <DialogContent className={styles.previewDialog}>
          {resumeState.templateId && <div className={styles.previewPaper}><ResumeTemplate resume={{ ...resumeState, id: resumeId ?? 'preview', title: 'Preview', templateId: resumeState.templateId, createdAt: '', updatedAt: '' }} /></div>}
        </DialogContent>
      </Dialog>
    </Paper>
  );
}

interface StepContentProps {
  activeStep: number;
}

function StepContent({ activeStep }: StepContentProps) {
  switch (activeStep) {
    case 0:
      return <PersonalInfoSection />;

    case 1:
      return <ExperienceSection />;

    case 2:
      return <EducationSection />;

    case 3:
      return <ProjectSection />;

    case 4:
      return <SkillSection />;

    default:
      return null;
  }
}
