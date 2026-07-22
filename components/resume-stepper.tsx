'use client';

import { useState } from 'react';
import { Box, Button, Paper, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import ExperienceSection from '@/features/resume/experience/experience-section';
import EducationSection from '@/features/resume/education/education.section';
import PersonalInfoSection from '@/features/resume/personal-info/personal-info.section';
import ProjectSection from '@/features/resume/projects/project.section';
import SkillSection from '@/features/resume/skills/skills.section';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { User } from 'next-auth';
import { saveResume } from '@/features/resume/resume.action';
import { useRouter } from 'next/navigation';

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
}

export default function ResumeStepper({ user }: ResumeStepperProps) {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const { resume } = useSelector((state: RootState) => state.resumes);
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
    <Paper
      variant="outlined"
      sx={{
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          px: {
            xs: 2,
            md: 4,
          },
          py: 3,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={step.label} completed={activeStep > index}>
              <StepLabel
                onClick={() => handleStepClick(index)}
                sx={{
                  cursor: 'pointer',
                }}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box
        sx={{
          p: { xs: 2, md: 4 },
          minHeight: 500,
        }}
      >
        <StepContent activeStep={activeStep} />
      </Box>

      <Stack
        direction="row"
        sx={{
          px: {
            xs: 2,
            md: 4,
          },
          py: 2,
          borderTop: 1,
          borderColor: 'divider',
          justifyContent: 'space-between',
        }}
      >
        <Button type="button" startIcon={<ArrowBackIcon />} disabled={isFirstStep} onClick={handleBack}>
          Back
        </Button>

        <Typography variant="body2" color="text.secondary">
          Step {activeStep + 1} of {steps.length}
        </Typography>

        {isLastStep ? (
          <Button
            type="button"
            variant="contained"
            startIcon={<CheckIcon />}
            onClick={async () => {
              const resume = await dispatch(saveResume(user)).unwrap();
              router.replace(`/resume/${resume.id}`);
            }}
          >
            Finish
          </Button>
        ) : (
          <Button type="button" variant="contained" endIcon={<ArrowForwardIcon />} onClick={handleNext}>
            Next
          </Button>
        )}
      </Stack>
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
