'use client';

import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useFieldArray, type UseFormReturn } from 'react-hook-form';
import { SkillFormData } from './skills-form.schema';
import { DeleteOutlined } from '@mui/icons-material';

interface SkillFormProps {
  form: UseFormReturn<SkillFormData>;
}

export default function SkillForm({ form }: SkillFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  return (
    <Stack spacing={3}>
      <TextField
        {...register('name')}
        label="Category"
        placeholder="Frontend"
        fullWidth
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
      />

      <Box>
        <Stack direction="row" sx={{ justifyContent: 'space-between', marginBottom: 2 }}>
          <Box>
            <Typography variant="subtitle1">Skills</Typography>
            <Typography variant="body2" color="text.secondary">
              Add skills under this category.
            </Typography>
          </Box>

          <Button
            type="button"
            size="small"
            startIcon={<AddIcon />}
            onClick={() =>
              append({
                value: '',
              })
            }
          >
            Add Skill
          </Button>
        </Stack>

        <Stack spacing={2}>
          {fields.map((field, index) => (
            <Stack key={field.id} direction="row" spacing={1}>
              <TextField
                {...register(`skills.${index}.value`)}
                label={`Skill ${index + 1}`}
                placeholder="React"
                fullWidth
                error={Boolean(errors.skills?.[index]?.value)}
                helperText={errors.skills?.[index]?.value?.message}
              />

              <IconButton type="button" color="error" aria-label="Remove skill" disabled={fields.length === 1} onClick={() => remove(index)}>
                <DeleteOutlined />
              </IconButton>
            </Stack>
          ))}
        </Stack>

        {errors.skills?.root?.message && (
          <Typography variant="caption" color="error">
            {errors.skills.root.message}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
