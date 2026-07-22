'use client';

import { useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/app/store';
import { addProject, updateProject } from '../resume.slice';
import type { Project } from './project.schema';
import { projectDefaultValues, projectFormSchema, type ProjectFormData } from './project-form.schema';
import ProjectForm from './project.form';

interface ProjectDialogProps {
  open: boolean;
  onClose: () => void;
  project?: Project | null;
}

export default function ProjectDialog({ open, onClose, project }: ProjectDialogProps) {
  const dispatch = useDispatch<AppDispatch>();

  const isEditMode = Boolean(project);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: projectDefaultValues,
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

    if (project) {
      reset({
        name: project.name,
        description: project.description,
        startDate: project.startDate ?? '',
        endDate: project.endDate ?? '',
        isCurrent: project.isCurrent,
        projectUrl: project.projectUrl ?? '',
        repositoryUrl: project.repositoryUrl ?? '',
        technologies: project.technologies.map((technology) => ({
          value: technology,
        })),
        highlights: project.highlights.map((highlight) => ({
          value: highlight,
        })),
      });

      return;
    }

    reset(projectDefaultValues);
  }, [open, project, reset]);

  const handleClose = () => {
    reset(projectDefaultValues);
    onClose();
  };

  const onSubmit = (data: ProjectFormData) => {
    const payload = {
      ...data,
      technologies: data.technologies.map((item) => item.value),
      highlights: data.highlights.map((item) => item.value),
    };

    if (project) {
      dispatch(
        updateProject({
          ...payload,
          id: project.id,
        }),
      );
    } else {
      dispatch(addProject(payload));
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle>
          {isEditMode ? 'Edit Project' : 'Add Project'}

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
          <ProjectForm form={form} />
        </DialogContent>

        <DialogActions>
          <Button type="button" color="inherit" onClick={handleClose}>
            Cancel
          </Button>

          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isEditMode ? 'Save Changes' : 'Add Project'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
