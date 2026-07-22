'use client';

import { useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/app/store';
import { Skill } from './skills.schema';
import { skillDefaultValues, SkillFormData, skillFormSchema } from './skills-form.schema';
import { addSkill, updateSkill } from '../resume.slice';
import SkillForm from './skills.form';

interface SkillDialogProps {
  open: boolean;
  onClose: () => void;
  skills?: Skill | null;
}

export default function SkillDialog({ open, onClose, skills }: SkillDialogProps) {
  const dispatch = useDispatch<AppDispatch>();

  const isEditMode = Boolean(skills);

  const form = useForm<SkillFormData>({
    resolver: zodResolver(skillFormSchema),

    defaultValues: skillDefaultValues,
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

    if (skills) {
      reset({
        name: skills.name,
        skills: skills.skills.map((skill) => ({
          value: skill,
        })),
      });

      return;
    }

    reset(skillDefaultValues);
  }, [open, skills, reset]);

  const handleClose = () => {
    reset(skillDefaultValues);

    onClose();
  };

  const onSubmit = (data: SkillFormData) => {
    const payload = {
      name: data.name,
      skills: data.skills.map((item) => item.value),
    };

    if (skills) {
      dispatch(
        updateSkill({
          ...payload,
          id: skills.id,
        }),
      );
    } else {
      dispatch(addSkill(payload));
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle>
          {isEditMode ? 'Edit Skill Group' : 'Add Skill Group'}
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
          <SkillForm form={form} />
        </DialogContent>

        <DialogActions>
          <Button type="button" color="inherit" onClick={handleClose}>
            Cancel
          </Button>

          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isEditMode ? 'Save Changes' : 'Add Skill Group'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
