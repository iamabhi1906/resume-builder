'use client';

import { Stack, TextField, Typography } from '@mui/material';
import type { UseFormRegisterReturn } from 'react-hook-form';
interface LinkFieldsProps {
  title: string;
  labelRegister: UseFormRegisterReturn;
  urlRegister: UseFormRegisterReturn;
  labelError?: string;
  urlError?: string;
  labelPlaceholder?: string;
  urlPlaceholder?: string;
}

export default function LinkFields({ title, labelRegister, urlRegister, labelError, urlError, labelPlaceholder, urlPlaceholder }: LinkFieldsProps) {
  return (
    <Stack spacing={1}>
      <Typography variant="body2">{title}</Typography>
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={2}
      >
        <TextField {...labelRegister} placeholder={labelPlaceholder} fullWidth error={Boolean(labelError)} helperText={labelError} />

        <TextField {...urlRegister} label="URL" placeholder={urlPlaceholder} fullWidth error={Boolean(urlError)} helperText={urlError} />
      </Stack>
    </Stack>
  );
}
