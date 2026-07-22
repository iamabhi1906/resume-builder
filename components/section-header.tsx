'use client';

import { Box, Button, Stack, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

interface SectionHeaderProps {
  title: string;
  description?: string;
  addLabel?: string;
  onAdd: () => void;
}

export default function SectionHeader({ title, description, addLabel = 'Add', onAdd }: SectionHeaderProps) {
  return (
    <Stack
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      spacing={2}
      sx={{ justifyContent: 'space-between' }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
            }}
          >
            {description}
          </Typography>
        )}
      </Box>

      <Button
        type="button"
        variant="outlined"
        size="small"
        startIcon={<AddIcon />}
        onClick={onAdd}
        sx={{
          flexShrink: 0,
          alignSelf: {
            xs: 'flex-start',
            sm: 'center',
          },
        }}
      >
        {addLabel}
      </Button>
    </Stack>
  );
}
