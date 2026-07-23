'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { deleteResumeStore } from '@/features/resumes/resumes.action';
import { Resume } from '@/features/resume/resume.types';

interface DeleteResumeDialogProps {
  userId: string;
  resume: Resume;
}

export default function DeleteDialog({ userId, resume }: DeleteResumeDialogProps) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    dispatch(deleteResumeStore({ userId, resume }));
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} startIcon={<DeleteForeverIcon />} color="error">
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" role="alertdialog">
        <DialogTitle id="alert-dialog-title">{'Confirm Delete'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the resume titled {resume.title}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus variant="outlined" color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} autoFocus variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
