'use client';

import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Alert, Box, Button, Typography } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import styles from './cloudinary-upload.module.css';
import Image from 'next/image';

interface CloudinaryUploadProps {
  value?: string;
  onChange: (url: string) => void;
}

export default function CloudinaryUpload({ value, onChange }: CloudinaryUploadProps) {
  const [error, setError] = useState('');

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!uploadPreset) {
    return <Alert severity="error">Cloudinary upload preset is missing.</Alert>;
  }

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.preview}>
        {value ? <Image src={value} alt="Profile preview" width={100} height={100} /> : <span>No profile photo</span>}
      </Box>

      <Box>
        <CldUploadWidget
          uploadPreset={uploadPreset}
          options={{
            sources: ['local', 'camera'],
            multiple: false,
            cropping: true,
            croppingAspectRatio: 1,
            resourceType: 'image',
            clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
            folder: 'resume-builder/profile-images',
          }}
          onSuccess={(result) => {
            const info = result.info as { secure_url?: string };

            if (info?.secure_url) {
              setError('');
              onChange(info.secure_url);
            }
          }}
          onError={() => {
            setError('Image upload failed. Please try again.');
          }}
        >
          {({ open }) => (
            <Button type="button" variant="outlined" startIcon={<CloudUploadOutlinedIcon />} onClick={() => open()}>
              Upload profile photo
            </Button>
          )}
        </CldUploadWidget>

        <Typography className={styles.help}>Optional. A square JPG, PNG, or WebP works best.</Typography>

        {error && (
          <Alert severity="error" className={styles.error}>
            {error}
          </Alert>
        )}
      </Box>
    </Box>
  );
}
