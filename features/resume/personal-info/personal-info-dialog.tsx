'use client';

import { useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/store';
import { setPersonalInfo } from '../resume.slice';
import { personalInfoDefaultValues, personalInfoSchema, type PersonalInfo } from './personal-info.schema';
import PersonalInfoForm from './personal-info.form';

interface PersonalInfoDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function PersonalInfoDialog({ open, onClose }: PersonalInfoDialogProps) {
  const dispatch = useDispatch<AppDispatch>();

  const personalInfo = useSelector((state: RootState) => state.resume.personalInfo);

  const form = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),

    defaultValues: personalInfoDefaultValues,
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

    reset(personalInfo ?? personalInfoDefaultValues);
  }, [open, personalInfo, reset]);

  const handleClose = () => {
    reset(personalInfo ?? personalInfoDefaultValues);
    onClose();
  };

  const onSubmit = (data: PersonalInfo) => {
    dispatch(setPersonalInfo(data));

    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle>
          Personal Information
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
          <PersonalInfoForm form={form} />
        </DialogContent>

        <DialogActions>
          <Button type="button" color="inherit" onClick={handleClose}>
            Cancel
          </Button>

          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Save Information
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
