'use client';

import { useState } from 'react';
import { Card, CardContent, Chip, IconButton, Stack, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/store';
import { Skill } from './skills.schema';
import { removeSkill } from '../resume.slice';
import SectionHeader from '@/components/section-header';
import EmptyState from '@/components/empty-state';
import { DeleteOutlined } from '@mui/icons-material';
import SkillDialog from './skills.dialog';

export default function SkillSection() {
  const dispatch = useDispatch<AppDispatch>();

  const skillGroups = useSelector((state: RootState) => state.resume.skills);

  const [open, setOpen] = useState(false);

  const [selectedSkillGroup, setSelectedSkillGroup] = useState<Skill | null>(null);

  const handleAdd = () => {
    setSelectedSkillGroup(null);
    setOpen(true);
  };

  const handleEdit = (skillGroup: Skill) => {
    setSelectedSkillGroup(skillGroup);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSkillGroup(null);
  };

  const handleDelete = (id: string) => {
    dispatch(removeSkill(id));
  };

  return (
    <>
      <Stack spacing={2}>
        <SectionHeader title="Skills" description="Organize your skills into categories." onAdd={handleAdd} />

        {skillGroups.length === 0 ? (
          <EmptyState text="No skill groups added yet." onAdd={handleAdd} />
        ) : (
          skillGroups.map((group) => (
            <Card key={group.id} variant="outlined">
              <CardContent>
                <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
                  <Stack spacing={1}>
                    <Typography>{group.name}</Typography>

                    <Stack direction="row" spacing={1}>
                      {group.skills.map((skill) => (
                        <Chip key={skill} label={skill} size="small" variant="outlined" />
                      ))}
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <IconButton size="small" aria-label="Edit skill group" onClick={() => handleEdit(group)}>
                      <EditOutlinedIcon />
                    </IconButton>

                    <IconButton size="small" color="error" aria-label="Delete skill group" onClick={() => handleDelete(group.id)}>
                      <DeleteOutlined />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>

      <SkillDialog open={open} onClose={handleClose} skills={selectedSkillGroup} />
    </>
  );
}
