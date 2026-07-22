import { Resume } from '@/features/resume/resume.types';
import { Box, Link, Stack, Typography } from '@mui/material';

interface ModernTemplateProps {
  resume: Resume;
}

export default function ModernTemplate({ resume }: ModernTemplateProps) {
  const { personalInfo, experiences, education, projects, skills } = resume;

  const fullName = [personalInfo.firstName, personalInfo.lastName].filter(Boolean).join(' ');

  return (
    <Box
      sx={{
        p: '14mm 16mm',
        fontFamily: 'Arial, sans-serif',
        '& a': {
          color: 'inherit',
        },
      }}
    >
      <Box
        sx={{
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
          }}
        >
          {fullName}
        </Typography>

        {personalInfo.headline && (
          <Typography
            sx={{
              mt: 0.75,
              fontSize: 14,
              fontWeight: 500,
              color: 'text.secondary',
            }}
          >
            {personalInfo.headline}
          </Typography>
        )}

        <Stack
          direction="row"
          sx={{
            mt: 1.5,
            gap: 1.5,
            flexWrap: 'wrap',
          }}
        >
          {personalInfo.email && <Typography sx={{ fontSize: 10 }}>{personalInfo.email}</Typography>}

          {personalInfo.phone && <Typography sx={{ fontSize: 10 }}>{personalInfo.phone}</Typography>}

          {personalInfo.location && <Typography sx={{ fontSize: 10 }}>{personalInfo.location}</Typography>}

          {personalInfo.github?.url && (
            <Link href={personalInfo.github.url} target="_blank" underline="none" sx={{ fontSize: 10 }}>
              {personalInfo.github.label || 'GitHub'}
            </Link>
          )}

          {personalInfo.linkedin?.url && (
            <Link href={personalInfo.linkedin.url} target="_blank" underline="none" sx={{ fontSize: 10 }}>
              {personalInfo.linkedin.label || 'LinkedIn'}
            </Link>
          )}

          {personalInfo.website?.url && (
            <Link href={personalInfo.website.url} target="_blank" underline="none" sx={{ fontSize: 10 }}>
              {personalInfo.website.label || 'Portfolio'}
            </Link>
          )}
        </Stack>
      </Box>

      {personalInfo.summary && (
        <ResumeSection title="Summary">
          <Typography sx={{ fontSize: 10.5, lineHeight: 10 }}>{personalInfo.summary}</Typography>
        </ResumeSection>
      )}

      {experiences.length > 0 && (
        <ResumeSection title="Experience">
          <Stack spacing={2.2}>
            {experiences.map((experience) => (
              <Box key={experience.id}>
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography sx={{ fontSize: 11.5, fontWeight: 700 }}>{experience.position}</Typography>

                    <Typography sx={{ fontSize: 10, fontWeight: 600 }}>
                      {experience.company}

                      {experience.location && ` · ${experience.location}`}
                    </Typography>
                  </Box>

                  <Typography sx={{ fontSize: 9, whiteSpace: 'nowrap' }}>
                    {experience.startDate} — {experience.isCurrent ? 'Present' : experience.endDate}
                  </Typography>
                </Stack>

                {experience.description && <Typography sx={{ fontSize: 10, lineHeight: 1.5, mt: 0.75 }}>{experience.description}</Typography>}

                {experience.highlights.length > 0 && (
                  <Box
                    component="ul"
                    sx={{
                      my: 0.75,
                      pl: 2.2,
                    }}
                  >
                    {experience.highlights.map((highlight, index) => (
                      <Typography key={index} component={'li'}>
                        {highlight.value}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Stack>
        </ResumeSection>
      )}

      {education.length > 0 && (
        <ResumeSection title="Education">
          <Stack spacing={1.5}>
            {education.map((item) => (
              <Stack key={item.id} direction="row" sx={{ justifyContent: 'space-between' }}>
                <Box>
                  <Typography sx={{ fontSize: 10 }}>{item.institution}</Typography>
                </Box>

                <Typography sx={{ fontSize: 9, whiteSpace: 'nowrap' }}>
                  {item.startDate} — {item.isCurrent ? 'Present' : item.endDate}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </ResumeSection>
      )}

      {projects.length > 0 && (
        <ResumeSection title="Projects">
          <Stack spacing={2}>
            {projects.map((project) => (
              <Box key={project.id}>
                <Typography sx={{ fontSize: 11, fontWeight: 700 }}>{project.name}</Typography>

                <Typography sx={{ fontSize: 10, lineHeight: 1.5 }}>{project.description}</Typography>

                {project.technologies.length > 0 && (
                  <Typography sx={{ fontSize: 9.5, mt: 0.5 }}>
                    <strong>Technologies:</strong> {project.technologies.join(', ')}
                  </Typography>
                )}
              </Box>
            ))}
          </Stack>
        </ResumeSection>
      )}

      {/* Skills */}

      {skills.length > 0 && (
        <ResumeSection title="Skills">
          <Stack spacing={0.6}>
            {skills.map((group) => (
              <Typography key={group.id} sx={{ fontSize: 10 }}>
                <strong>{group.name}:</strong> {group.skills.join(', ')}
              </Typography>
            ))}
          </Stack>
        </ResumeSection>
      )}
    </Box>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box
      sx={{
        mb: 2.8,
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',

          borderBottom: '1.5px solid #18181b',

          pb: 0.5,
          mb: 1.3,
        }}
      >
        {title}
      </Typography>

      {children}
    </Box>
  );
}
