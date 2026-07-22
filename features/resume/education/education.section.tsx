'use client';
import { useState } from 'react';
import { Box, Card, CardContent, IconButton, Stack, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/store';
import { removeEducation } from '../resume.slice';
import type { Education } from './education.schema';
import SectionHeader from '@/components/section-header';
import EmptyState from '@/components/empty-state';
import { DeleteOutlined } from '@mui/icons-material';
import EducationDialog from './education.dialog';

export default function EducationSection() {
  const dispatch = useDispatch<AppDispatch>();

  const education = useSelector((state: RootState) => state.resume.education);

  const [open, setOpen] = useState(false);

  const [selectedEducation, setSelectedEducation] = useState<Education | null>(null);

  const handleAdd = () => {
    setSelectedEducation(null);
    setOpen(true);
  };

  const handleEdit = (education: Education) => {
    setSelectedEducation(education);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEducation(null);
  };

  const handleDelete = (id: string) => {
    dispatch(removeEducation(id));
  };

  return (
    <>
      <Stack spacing={2}>
        <SectionHeader title="Education" description="Add your academic background." onAdd={handleAdd} />

        {education.length === 0 ? (
          <EmptyState text="No education added yet." onAdd={handleAdd} />
        ) : (
          education.map((item) => (
            <Card key={item.id} variant="outlined">
              <CardContent>
                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                  <Box>
                    <Typography>{item.degree}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.institution}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.startDate} - {item.isCurrent ? 'Present' : item.endDate}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={2}>
                    <IconButton size="small" aria-label="Edit education" onClick={() => handleEdit(item)}>
                      <EditOutlinedIcon />
                    </IconButton>

                    <IconButton size="small" color="error" aria-label="Delete education" onClick={() => handleDelete(item.id)}>
                      <DeleteOutlined />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>

      <EducationDialog open={open} onClose={handleClose} education={selectedEducation} />
    </>
  );
}
