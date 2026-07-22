'use client';

import { Box, Button, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

interface EmptyStateProps {
  title?: string;
  text: string;
  addLabel?: string;
  onAdd: () => void;
}

export default function EmptyState({ title, text, addLabel = 'Add', onAdd }: EmptyStateProps) {
  return (
    <Box
      sx={{
        border: 1,
        borderStyle: 'dashed',
        borderColor: 'divider',
        borderRadius: 2,

        px: 3,
        py: 5,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        textAlign: 'center',

        bgcolor: 'action.hover',
      }}
    >
      {title && <Typography variant="subtitle1">{title}</Typography>}

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          maxWidth: 400,
          mb: 2,
        }}
      >
        {text}
      </Typography>

      <Button type="button" variant="contained" size="small" startIcon={<AddIcon />} onClick={onAdd}>
        {addLabel}
      </Button>
    </Box>
  );
}
