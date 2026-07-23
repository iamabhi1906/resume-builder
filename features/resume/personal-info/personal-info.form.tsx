'use client';
import { Box, Divider, Stack, TextField, Typography } from '@mui/material';
import type { UseFormReturn } from 'react-hook-form';
import type { PersonalInfo } from './personal-info.schema';
import LinkFields from './link-field';
import CloudinaryUpload from '@/components/cloudinary-upload';

interface PersonalInfoFormProps {
  form: UseFormReturn<PersonalInfo>;
}

export default function PersonalInfoForm({ form }: PersonalInfoFormProps) {
  const {
    register, setValue, watch,
    formState: { errors },
  } = form;

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle1">Basic Information</Typography>

        <Typography variant="body2" color="text.secondary">
          Add your basic personal and professional information.
        </Typography>
      </Box>

      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={2}
      >
        <TextField
          {...register('firstName')}
          label="First Name"
          placeholder="Abhishek"
          fullWidth
          error={Boolean(errors.firstName)}
          helperText={errors.firstName?.message}
        />

        <TextField
          {...register('lastName')}
          label="Last Name"
          placeholder="Kumar"
          fullWidth
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
        />
      </Stack>

      <TextField
        {...register('headline')}
        label="Professional Headline"
        placeholder="Full Stack Developer"
        fullWidth
        error={Boolean(errors.headline)}
        helperText={errors.headline?.message}
      />

      <Box>
        <Typography variant="subtitle1">Profile Photo</Typography>
        <CloudinaryUpload value={watch('photoUrl')} onChange={(url) => setValue('photoUrl', url, { shouldDirty: true })} />
      </Box>

      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={2}
      >
        <TextField
          {...register('email')}
          label="Email"
          type="email"
          placeholder="abhi@gmail.com"
          fullWidth
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />

        <TextField
          {...register('phone')}
          label="Phone"
          placeholder="+91 99999 99999"
          fullWidth
          error={Boolean(errors.phone)}
          helperText={errors.phone?.message}
        />
      </Stack>

      <TextField
        {...register('location')}
        label="Location"
        placeholder="Punjab, India"
        fullWidth
        error={Boolean(errors.location)}
        helperText={errors.location?.message}
      />

      <TextField
        {...register('summary')}
        label="Summary"
        placeholder="Write a summary"
        fullWidth
        multiline
        minRows={4}
        error={Boolean(errors.summary)}
        helperText={errors.summary?.message}
      />

      <Divider />

      <Box>
        <Typography variant="subtitle1">Professional Links</Typography>
      </Box>

      <LinkFields
        title="Website / Portfolio"
        labelRegister={register('website.label')}
        urlRegister={register('website.url')}
        labelError={errors.website?.label?.message}
        urlError={errors.website?.url?.message}
        labelPlaceholder="iamabhi.dev"
        urlPlaceholder="https://www.iamabhi.dev"
      />

      <LinkFields
        title="LinkedIn"
        labelRegister={register('linkedin.label')}
        urlRegister={register('linkedin.url')}
        labelError={errors.linkedin?.label?.message}
        urlError={errors.linkedin?.url?.message}
        labelPlaceholder="iamabhi"
        urlPlaceholder="https://linkedin.com/in/iamabhi"
      />

      <LinkFields
        title="GitHub"
        labelRegister={register('github.label')}
        urlRegister={register('github.url')}
        labelError={errors.github?.label?.message}
        urlError={errors.github?.url?.message}
        labelPlaceholder="iamabhi"
        urlPlaceholder="https://github.com/iamabhi"
      />
    </Stack>
  );
}
