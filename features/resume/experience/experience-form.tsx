'use client';

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { Controller, useFieldArray, type UseFormReturn } from 'react-hook-form';

import { EmploymentType } from './experience.types';
import type { ExperienceFormData } from './experience-form.types';

interface ExperienceFormProps {
  form: UseFormReturn<ExperienceFormData>;
}

export default function ExperienceForm({ form }: ExperienceFormProps) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const isCurrent = watch('isCurrent');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'highlights',
  });

  return (
    <Stack spacing={3}>
      {/* Position */}

      <TextField
        {...register('position')}
        label="Position"
        placeholder="Full Stack Developer"
        fullWidth
        error={Boolean(errors.position)}
        helperText={errors.position?.message}
      />

      {/* Company */}

      <TextField
        {...register('company')}
        label="Company"
        placeholder="Company name"
        fullWidth
        error={Boolean(errors.company)}
        helperText={errors.company?.message}
      />

      {/* Location */}

      <TextField
        {...register('location')}
        label="Location"
        placeholder="Punjab, India"
        fullWidth
        error={Boolean(errors.location)}
        helperText={errors.location?.message}
      />

      {/* Employment Type */}

      <Controller
        name="employmentType"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={Boolean(errors.employmentType)}>
            <InputLabel id="employment-type-label">Employment Type</InputLabel>

            <Select {...field} labelId="employment-type-label" label="Employment Type">
              <MenuItem value={EmploymentType.FULL_TIME}>Full Time</MenuItem>

              <MenuItem value={EmploymentType.PART_TIME}>Part Time</MenuItem>

              <MenuItem value={EmploymentType.INTERNSHIP}>Internship</MenuItem>

              <MenuItem value={EmploymentType.FREELANCE}>Freelance</MenuItem>

              <MenuItem value={EmploymentType.CONTRACT}>Contract</MenuItem>

              <MenuItem value={EmploymentType.SELF_EMPLOYED}>Self Employed</MenuItem>

              <MenuItem value={EmploymentType.VOLUNTEER}>Volunteer</MenuItem>
            </Select>

            {errors.employmentType?.message && <FormHelperText>{errors.employmentType.message}</FormHelperText>}
          </FormControl>
        )}
      />

      {/* Dates */}

      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={2}
      >
        <TextField
          {...register('startDate')}
          label="Start Date"
          type="month"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          error={Boolean(errors.startDate)}
          helperText={errors.startDate?.message}
        />

        <TextField
          {...register('endDate')}
          label="End Date"
          type="month"
          fullWidth
          disabled={isCurrent}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          error={Boolean(errors.endDate)}
          helperText={errors.endDate?.message}
        />
      </Stack>

      {/* Current Employment */}

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
            label="I currently work here"
          />
        )}
      />

      {/* Description */}

      <TextField
        {...register('description')}
        label="Description"
        placeholder="Briefly describe your role..."
        fullWidth
        multiline
        minRows={4}
        error={Boolean(errors.description)}
        helperText={errors.description?.message}
      />

      <Box>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle1">Highlights</Typography>

            <Typography variant="body2" color="text.secondary">
              Add key achievements or responsibilities.
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
            Add
          </Button>
        </Stack>

        <Stack spacing={2} sx={{ marginTop: 5 }}>
          {fields.map((field, index) => (
            <Stack key={field.id} direction="row" spacing={1}>
              <TextField
                {...register(`highlights.${index}.value`)}
                label={`Highlight ${index + 1}`}
                placeholder="Built scalable REST APIs..."
                fullWidth
                multiline
                minRows={2}
                error={Boolean(errors.highlights?.[index]?.value)}
                helperText={errors.highlights?.[index]?.value?.message}
              />

              <IconButton type="button" color="error" onClick={() => remove(index)} aria-label="Remove highlight">
                <DeleteOutlinedIcon />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
