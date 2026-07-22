'use client';

import { useState } from 'react';
import { Card, CardContent, Chip, IconButton, Stack, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/store';
import { removeProject } from '../resume.slice';

import type { Project } from './project.schema';
import SectionHeader from '@/components/section-header';
import EmptyState from '@/components/empty-state';
import { DeleteOutlined } from '@mui/icons-material';
import ProjectDialog from './project.dialog';

export default function ProjectSection() {
  const dispatch = useDispatch<AppDispatch>();

  const projects = useSelector((state: RootState) => state.resume.projects);

  const [open, setOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleAdd = () => {
    setSelectedProject(null);
    setOpen(true);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProject(null);
  };

  const handleDelete = (id: string) => {
    dispatch(removeProject(id));
  };

  return (
    <>
      <Stack spacing={2}>
        <SectionHeader title="Projects" description="Showcase your best projects." onAdd={handleAdd} />

        {projects.length === 0 ? (
          <EmptyState text="No projects added yet." onAdd={handleAdd} />
        ) : (
          projects.map((project) => (
            <Card key={project.id} variant="outlined">
              <CardContent>
                <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
                  <Stack spacing={1}>
                    <Typography>{project.name}</Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 0.5,
                      }}
                    >
                      {project.description}
                    </Typography>

                    {project.technologies.length > 0 && (
                      <Stack direction="row" spacing={1}>
                        {project.technologies.map((technology) => (
                          <Chip key={technology} label={technology} size="small" variant="outlined" />
                        ))}
                      </Stack>
                    )}
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <IconButton size="small" aria-label="Edit project" onClick={() => handleEdit(project)}>
                      <EditOutlinedIcon />
                    </IconButton>

                    <IconButton size="small" color="error" aria-label="Delete project" onClick={() => handleDelete(project.id)}>
                      <DeleteOutlined />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>

      <ProjectDialog open={open} onClose={handleClose} project={selectedProject} />
    </>
  );
}
