'use client';

import React, { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Typography, Alert, Box, CircularProgress } from '@mui/material';
import styles from './page.module.css';
import { Google } from '@mui/icons-material';
import { useSession } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [status, router]);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password. Please try again.');
      } else {
        router.push('/');
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { redirectTo: '/' });
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.card}>
        <Typography variant="body2" color="textSecondary" align="center">
          Sign in to continue building your resume
        </Typography>

        {error && (
          <Alert severity="error" sx={{ marginTop: 2 }}>
            {error}
          </Alert>
        )}

        <form className={styles.form} onSubmit={handleCredentialsSubmit}>
          <TextField
            label="Email Address"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <Button type="submit" variant="contained" color="primary" size="large" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>
        </form>

        <Box className={styles.dividerContainer}>
          <Typography variant="body2">OR</Typography>
        </Box>

        <Button
          variant="outlined"
          color="inherit"
          size="large"
          fullWidth
          startIcon={<Google />}
          onClick={handleGoogleSignIn}
          className={styles.oauthButton}
          disabled={loading}
        >
          Continue with Google
        </Button>
      </Box>
    </Box>
  );
}
