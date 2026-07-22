'use client';
import { useEffect } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/app/store';

import ExperienceForm from './experience-form';
import { addExperience, updateExperience } from '../resume.slice';
import { Experience } from './experience.schema';
import { experienceDefaultValues, ExperienceFormData, experienceFormSchema } from './experience-form.types';

interface ExperienceDialogProps {
  open: boolean;
  onClose: () => void;
  experience?: Experience | null;
}

export default function ExperienceDialog({ open, onClose, experience }: ExperienceDialogProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isEditMode = Boolean(experience);
  const form = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: experienceDefaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (!open) return;

    if (experience) {
      const { id: _id, ...formData } = experience;
      reset(formData);
      return;
    }

    reset(experienceDefaultValues);
  }, [open, experience, reset]);

  const handleClose = () => {
    reset(experienceDefaultValues);
    onClose();
  };

  const onSubmit = (data: ExperienceFormData) => {
    if (experience) {
      dispatch(
        updateExperience({
          ...data,
          id: experience.id,
        }),
      );
    } else {
      dispatch(addExperience(data));
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle>
          {isEditMode ? 'Edit Experience' : 'Add Experience'}

          <IconButton
            onClick={handleClose}
            aria-label="Close"
            sx={{
              position: 'absolute',
              right: 12,
              top: 12,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <ExperienceForm form={form} />
        </DialogContent>

        <DialogActions>
          <Button type="button" onClick={handleClose} color="inherit">
            Cancel
          </Button>

          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isEditMode ? 'Save Changes' : 'Add Experience'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
