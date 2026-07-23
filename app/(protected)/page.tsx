import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import styles from './page.module.css';
import ResumeDashboard from '@/components/resume-dashboard';

export default async function HomePage() {
  return (
    <Box className={styles.page}>
      <Container maxWidth="lg" className={styles.container}>
        <Paper elevation={0} className={styles.hero}>
          <Box className={styles.heroContent}>
            <Typography component="h1" className={styles.heroTitle}>
              Build your next
              <br />
              <span>great resume.</span>
            </Typography>

            <Typography className={styles.heroDescription}>
              Build a professional resume that highlights your experience, skills, education, and projects.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button variant="contained" size="large" startIcon={<AddRoundedIcon />} className={styles.primaryButton} href="/create">
                Create Resume
              </Button>

              <Button variant="text" size="large" endIcon={<ArrowForwardRoundedIcon />} className={styles.secondaryButton} href="#resumes">
                View My Resumes
              </Button>
            </Stack>
          </Box>

          <Box className={styles.previewArea}>
            <Paper elevation={0} className={styles.resumePreview}>
              <Box className={styles.previewHeader}>
                <Box className={styles.previewAvatar} />
                <Box>
                  <Box className={styles.previewTitle} />
                  <Box className={styles.previewSubtitle} />
                </Box>
              </Box>
              <Box className={styles.previewDivider} />
              <Box className={styles.previewSection} />
              <Box className={styles.previewLine} />
              <Box className={styles.previewLineShort} />
              <Box className={styles.previewSection} />
              <Box className={styles.previewLine} />
              <Box className={styles.previewLine} />
              <Box className={styles.previewLineShort} />
            </Paper>
          </Box>
        </Paper>
        <Box id="resumes" className={styles.resumeSection}>
          <Typography variant="h4" className={styles.resumeHeading}>My resumes</Typography>
          <ResumeDashboard />
        </Box>
      </Container>
    </Box>
  );
}
