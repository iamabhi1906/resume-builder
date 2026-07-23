'use client';

import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Menu, MenuItem, Button, Stack } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { User } from 'next-auth';
import { useState } from 'react';
import styles from './navbar.module.css';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  user: User;
}

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const canGoBack = typeof window !== 'undefined' && window.history.length > 1;

  return (
    <AppBar position="fixed" className={styles.navbar} elevation={0}>
      <Toolbar className={styles.toolbar}>
        <Stack direction="row" spacing={1}>
          {canGoBack && (
            <Button startIcon={<ArrowBack />} onClick={() => router.back()} color="inherit">
              Back
            </Button>
          )}

          <Box className={styles.left} component={Link} href="/">
            <Typography variant="h6">Resume Builder</Typography>
          </Box>
        </Stack>

        <Box className={styles.right}>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar src={user.image ?? undefined}>{!user.image && user.name?.charAt(0)}</Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            transformOrigin={{
              horizontal: 'right',
              vertical: 'top',
            }}
            anchorOrigin={{
              horizontal: 'right',
              vertical: 'bottom',
            }}
          >
            <MenuItem disabled>{user.name}</MenuItem>
            <MenuItem disabled>{user.email}</MenuItem>
            <MenuItem
              onClick={() =>
                signOut({
                  callbackUrl: '/',
                })
              }
            >
              Sign Out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
