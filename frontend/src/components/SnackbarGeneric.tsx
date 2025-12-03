import { useAppDispatch, useAppSelector } from '../hooks/common';
import { closeSnackbar } from '../reducers/snackbarReducer';
import type { RootState } from '../store';

import React from 'react';

import { Alert, Snackbar, Typography } from '@mui/material';

export default function SnackbarGeneric() {
  const dispatch = useAppDispatch();
  const { open, title, message, severity, autohide } = useAppSelector(
    (state: RootState) => state.snackbars,
  );

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={autohide ? 4000 : null}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        marginBottom: '40px',
        zIndex: 200000,
      }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '90%', textAlign: 'left' }}>
        <Typography sx={{ fontWeight: 500 }}>{title}</Typography>
        <Typography>{message}</Typography>
      </Alert>
    </Snackbar>
  );
}
