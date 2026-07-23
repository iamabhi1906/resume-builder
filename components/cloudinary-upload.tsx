'use client';

import { useEffect, useState } from 'react';
import { Alert, Button, CircularProgress } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import styles from './cloudinary-upload.module.css';

declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (options: Record<string, unknown>, callback: (error: unknown, result: { event: string; info?: { secure_url?: string } }) => void) => { open: () => void };
    };
  }
}

interface CloudinaryUploadProps {
  value?: string;
  onChange: (url: string) => void;
}

export default function CloudinaryUpload({ value, onChange }: CloudinaryUploadProps) {
  const [ready, setReady] = useState(() => typeof window !== 'undefined' && Boolean(window.cloudinary));
  const [error, setError] = useState('');
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    if (window.cloudinary) return;
    const script = document.createElement('script');
    script.src = 'https://upload-widget.cloudinary.com/global/all.js';
    script.async = true;
    script.onload = () => setReady(true);
    script.onerror = () => setError('Could not load the Cloudinary upload widget.');
    document.body.appendChild(script);
    return () => script.remove();
  }, []);

  const openWidget = () => {
    if (!cloudName || !uploadPreset) {
      setError('Cloudinary cloud name or upload preset is missing.');
      return;
    }
    if (!window.cloudinary) return;
    window.cloudinary.createUploadWidget({ cloudName, uploadPreset, sources: ['local', 'camera'], multiple: false, cropping: true, croppingAspectRatio: 1, resourceType: 'image', clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'], folder: 'resume-builder/profile-images' }, (widgetError, result) => {
      if (widgetError) { setError('Image upload failed. Please try again.'); return; }
      if (result.event === 'success' && result.info?.secure_url) onChange(result.info.secure_url);
    }).open();
  };

  return <div className={styles.wrapper}>
    <div className={styles.preview}>{value ? <img src={value} alt="Profile preview" /> : <span>No profile photo</span>}</div>
    <div><Button type="button" variant="outlined" startIcon={ready ? <CloudUploadOutlinedIcon /> : <CircularProgress size={16} />} onClick={openWidget} disabled={!ready}>Upload profile photo</Button><p className={styles.help}>Optional. A square JPG, PNG, or WebP works best.</p>{error && <Alert severity="error" className={styles.error}>{error}</Alert>}</div>
  </div>;
}
