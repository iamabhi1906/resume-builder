'use client';

import { useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/app/store';
import { addEducation, updateEducation } from '../resume.slice';
import EducationForm from './education.form';
import { Education } from './education.schema';
import { educationDefaultValues, EducationFormData, educationFormSchema } from './education-form.schema';

interface EducationDialogProps {
  open: boolean;
  onClose: () => void;
  education?: Education | null;
}

export default function EducationDialog({ open, onClose, education }: EducationDialogProps) {
  const dispatch = useDispatch<AppDispatch>();

  const isEditMode = Boolean(education);

  const form = useForm<EducationFormData>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: educationDefaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (!open) {
      return;
    }

    if (education) {
      reset({
        institution: education.institution,
        degree: education.degree,
        location: education.location ?? '',
        startDate: education.startDate,
        endDate: education.endDate ?? '',
        isCurrent: education.isCurrent,
        grade: education.grade ?? '',
      });

      return;
    }

    reset(educationDefaultValues);
  }, [open, education, reset]);

  const handleClose = () => {
    reset(educationDefaultValues);
    onClose();
  };

  const onSubmit = (payload: EducationFormData) => {
    if (education) {
      dispatch(
        updateEducation({
          ...payload,
          id: education.id,
        }),
      );
    } else {
      dispatch(addEducation(payload));
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle>
          {isEditMode ? 'Edit Education' : 'Add Education'}

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
          <EducationForm form={form} />
        </DialogContent>

        <DialogActions>
          <Button type="button" color="inherit" onClick={handleClose}>
            Cancel
          </Button>

          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isEditMode ? 'Save Changes' : 'Add Education'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
