'use client';

import { Checkbox, FormControlLabel, Stack, TextField } from '@mui/material';

import { Controller, type UseFormReturn } from 'react-hook-form';
import { EducationFormData } from './education-form.schema';

interface EducationFormProps {
  form: UseFormReturn<EducationFormData>;
}

export default function EducationForm({ form }: EducationFormProps) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const isCurrent = watch('isCurrent');

  return (
    <Stack spacing={3}>
      <TextField
        {...register('institution')}
        label="Institution"
        placeholder="Lovely Professional University"
        fullWidth
        error={Boolean(errors.institution)}
        helperText={errors.institution?.message}
      />

      <TextField
        {...register('degree')}
        label="Degree"
        placeholder="Bachelor of Technology"
        fullWidth
        error={Boolean(errors.degree)}
        helperText={errors.degree?.message}
      />

      <TextField
        {...register('location')}
        label="Location"
        placeholder="Punjab, India"
        fullWidth
        error={Boolean(errors.location)}
        helperText={errors.location?.message}
      />
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
            label="I currently study here"
          />
        )}
      />

      <TextField
        {...register('grade')}
        label="Grade / CGPA"
        placeholder="8.4 CGPA"
        fullWidth
        error={Boolean(errors.grade)}
        helperText={errors.grade?.message}
      />
    </Stack>
  );
}
