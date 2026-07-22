'use client';

import { useState } from 'react';
import { Box, Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import PersonalInfoDialog from './personal-info-dialog';

export default function PersonalInfoSection() {
  const [open, setOpen] = useState(false);
  const personalInfo = useSelector((state: RootState) => state.resume.personalInfo);
  const hasPersonalInfo = Boolean(personalInfo.firstName.trim() || personalInfo.lastName.trim() || personalInfo.email.trim());
  const fullName = [personalInfo.firstName, personalInfo.lastName].filter(Boolean).join(' ');

  return (
    <>
      <Stack spacing={3}>
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
              Personal Information
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Add your personal, contact, and professional information.
            </Typography>
          </Box>

          <Button
            type="button"
            variant={hasPersonalInfo ? 'outlined' : 'contained'}
            startIcon={hasPersonalInfo ? <EditOutlinedIcon /> : <PersonAddOutlinedIcon />}
            onClick={() => setOpen(true)}
          >
            {hasPersonalInfo ? 'Edit Information' : 'Add Information'}
          </Button>
        </Stack>

        {!hasPersonalInfo && (
          <Box
            sx={{
              border: 1,
              borderStyle: 'dashed',
              borderColor: 'divider',
              borderRadius: 2,
              p: 5,
              textAlign: 'center',
              bgcolor: 'action.hover',
            }}
          >
            <PersonAddOutlinedIcon
              sx={{
                fontSize: 40,
                color: 'text.secondary',
                mb: 1,
              }}
            />

            <Typography variant="subtitle1">Add your personal information</Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
                mb: 2,
              }}
            >
              Your name, contact information, and professional links will appear on your resume.
            </Typography>

            <Button type="button" variant="contained" startIcon={<PersonAddOutlinedIcon />} onClick={() => setOpen(true)}>
              Add Information
            </Button>
          </Box>
        )}

        {hasPersonalInfo && (
          <Card variant="outlined">
            <CardContent>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h6">{fullName || 'Unnamed'}</Typography>

                  {personalInfo.headline && (
                    <Typography variant="body2" color="text.secondary">
                      {personalInfo.headline}
                    </Typography>
                  )}
                </Box>

                <Divider />

                <Stack
                  direction={{
                    xs: 'column',
                    sm: 'row',
                  }}
                  spacing={{
                    xs: 1,
                    sm: 3,
                  }}
                >
                  {personalInfo.email && <Typography variant="body2">{personalInfo.email}</Typography>}

                  {personalInfo.phone && <Typography variant="body2">{personalInfo.phone}</Typography>}

                  {personalInfo.location && <Typography variant="body2">{personalInfo.location}</Typography>}
                </Stack>

                {(personalInfo.website?.label || personalInfo.linkedin?.label || personalInfo.github?.label) && (
                  <>
                    <Divider />

                    <Stack direction="row" spacing={2}>
                      {personalInfo.website?.label && (
                        <Typography variant="body2" color="primary">
                          {personalInfo.website.label}
                        </Typography>
                      )}

                      {personalInfo.linkedin?.label && (
                        <Typography variant="body2" color="primary">
                          {personalInfo.linkedin.label}
                        </Typography>
                      )}

                      {personalInfo.github?.label && (
                        <Typography variant="body2" color="primary">
                          {personalInfo.github.label}
                        </Typography>
                      )}
                    </Stack>
                  </>
                )}

                {personalInfo.summary && (
                  <>
                    <Divider />

                    <Box>
                      <Typography variant="subtitle2">Professional Summary</Typography>

                      <Typography variant="body2" color="text.secondary">
                        {personalInfo.summary}
                      </Typography>
                    </Box>
                  </>
                )}
              </Stack>
            </CardContent>
          </Card>
        )}
      </Stack>

      <PersonalInfoDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
