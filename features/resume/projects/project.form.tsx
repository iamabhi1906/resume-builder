'use client';

import { Box, Button, Checkbox, FormControlLabel, IconButton, Stack, TextField, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { Controller, useFieldArray, type UseFormReturn } from 'react-hook-form';

import type { ProjectFormData } from './project-form.schema';
import { DeleteOutlined } from '@mui/icons-material';

interface ProjectFormProps {
  form: UseFormReturn<ProjectFormData>;
}

export default function ProjectForm({ form }: ProjectFormProps) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const isCurrent = watch('isCurrent');

  const {
    fields: technologyFields,
    append: appendTechnology,
    remove: removeTechnology,
  } = useFieldArray({
    control,
    name: 'technologies',
  });

  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({
    control,
    name: 'highlights',
  });

  return (
    <Stack spacing={3}>
      <TextField {...register('name')} label="Project Name" fullWidth error={Boolean(errors.name)} helperText={errors.name?.message} />

      <TextField
        {...register('description')}
        label="Description"
        placeholder="Describe what the project"
        fullWidth
        multiline
        minRows={4}
        error={Boolean(errors.description)}
        helperText={errors.description?.message}
      />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          {...register('startDate')}
          label="Start Date"
          type="month"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          error={Boolean(errors.startDate)}
          helperText={errors.startDate?.message}
        />

        <TextField
          {...register('endDate')}
          label="End Date"
          type="month"
          fullWidth
          disabled={isCurrent}
          slotProps={{ inputLabel: { shrink: true } }}
          error={Boolean(errors.endDate)}
          helperText={errors.endDate?.message}
        />
      </Stack>

      <Controller
        name="isCurrent"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={field.value}
                onChange={(event) => {
                  const checked = event.target.checked;

                  field.onChange(checked);

                  if (checked) {
                    setValue('endDate', '');
                  }
                }}
              />
            }
            label="I am currently working on this project"
          />
        )}
      />

      <TextField
        {...register('projectUrl')}
        label="Project URL"
        placeholder="https://example.com"
        fullWidth
        error={Boolean(errors.projectUrl)}
        helperText={errors.projectUrl?.message}
      />

      <TextField
        {...register('repositoryUrl')}
        label="Repository URL"
        placeholder="https://github.com/username/project"
        fullWidth
        error={Boolean(errors.repositoryUrl)}
        helperText={errors.repositoryUrl?.message}
      />

      <Box>
        <Stack direction="row" sx={{ justifyContent: 'space-between', marginBottom: 2 }}>
          <Box>
            <Typography variant="subtitle1">Technologies</Typography>
            <Typography variant="body2" color="text.secondary">
              Add technologies used in this project.
            </Typography>
          </Box>

          <Button
            type="button"
            size="small"
            startIcon={<AddIcon />}
            onClick={() =>
              appendTechnology({
                value: '',
              })
            }
          >
            Add
          </Button>
        </Stack>

        <Stack spacing={2}>
          {technologyFields.map((field, index) => (
            <Stack key={field.id} direction="row" spacing={1}>
              <TextField
                {...register(`technologies.${index}.value`)}
                label={`Technology ${index + 1}`}
                placeholder="Next.js"
                fullWidth
                error={Boolean(errors.technologies?.[index]?.value)}
                helperText={errors.technologies?.[index]?.value?.message}
              />

              <IconButton type="button" color="error" aria-label="Remove technology" onClick={() => removeTechnology(index)}>
                <DeleteOutlined />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </Box>

      <Box>
        <Stack direction="row" sx={{ justifyContent: 'space-between', marginBottom: 2 }}>
          <Box>
            <Typography variant="subtitle1">Highlights</Typography>
            <Typography variant="body2" color="text.secondary">
              Add key features or achievements.
            </Typography>
          </Box>

          <Button
            type="button"
            size="small"
            startIcon={<AddIcon />}
            onClick={() =>
              appendHighlight({
                value: '',
              })
            }
          >
            Add
          </Button>
        </Stack>

        <Stack spacing={2}>
          {highlightFields.map((field, index) => (
            <Stack key={field.id} direction="row" spacing={1}>
              <TextField
                {...register(`highlights.${index}.value`)}
                label={`Highlight ${index + 1}`}
                placeholder="Implemented QR-based event check-in..."
                fullWidth
                multiline
                error={Boolean(errors.highlights?.[index]?.value)}
                helperText={errors.highlights?.[index]?.value?.message}
              />

              <IconButton type="button" color="error" aria-label="Remove highlight" onClick={() => removeHighlight(index)}>
                <DeleteOutlined />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
