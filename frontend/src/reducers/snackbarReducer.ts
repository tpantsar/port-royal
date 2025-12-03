import type { SnackbarOptions } from '../types/common.ts';

import type { AlertColor } from '@mui/material';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  title: '',
  message: '',
  severity: 'info' as AlertColor,
  autohide: true, // Autohide the snackbar by default
};

const snackbarsSlice = createSlice({
  name: 'snackbars',
  initialState: initialState,
  reducers: {
    openSnackbar: (state, action: PayloadAction<SnackbarOptions>) => {
      const { title, message, severity, autohide = true } = action.payload;
      state.open = true;
      state.title = title;
      state.message = message;
      state.severity = severity;
      state.autohide = autohide;
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarsSlice.actions;
export default snackbarsSlice.reducer;
