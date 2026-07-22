'use client';

import { useState } from 'react';
import { Box, Card, CardContent, IconButton, Stack, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/store';
import { removeExperience } from '../resume.slice';
import type { Experience } from './experience.schema';
import ExperienceDialog from './experience-dialog';
import SectionHeader from '@/components/section-header';
import EmptyState from '@/components/empty-state';
import { DeleteOutlined } from '@mui/icons-material';

export default function ExperienceSection() {
  const dispatch = useDispatch<AppDispatch>();

  const experiences = useSelector((state: RootState) => state.resume.experiences);

  const [open, setOpen] = useState(false);

  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  const handleAdd = () => {
    setSelectedExperience(null);
    setOpen(true);
  };

  const handleEdit = (experience: Experience) => {
    setSelectedExperience(experience);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedExperience(null);
  };

  const handleDelete = (id: string) => {
    dispatch(removeExperience(id));
  };

  return (
    <>
      <Stack spacing={2}>
        <SectionHeader title="Experience" description="Add your professional work experience." onAdd={handleAdd} />
        {experiences.length === 0 ? (
          <EmptyState text="No experience added yet." onAdd={handleAdd} />
        ) : (
          experiences.map((experience) => (
            <Card key={experience.id} variant="outlined">
              <CardContent>
                <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
                  <Box>
                    <Typography>{experience.position}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {experience.company}
                      {experience.location && ` - ${experience.location}`}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      {experience.startDate}-{experience.isCurrent ? 'Present' : experience.endDate}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={2}>
                    <IconButton size="small" aria-label="Edit experience" onClick={() => handleEdit(experience)}>
                      <EditOutlinedIcon />
                    </IconButton>

                    <IconButton size="small" color="error" aria-label="Delete experience" onClick={() => handleDelete(experience.id)}>
                      <DeleteOutlined />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>

      <ExperienceDialog open={open} onClose={handleClose} experience={selectedExperience} />
    </>
  );
}
