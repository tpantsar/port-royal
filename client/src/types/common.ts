import { AlertColor } from '@mui/material';

export interface SnackbarOptions {
  title: string;
  message: string;
  severity: AlertColor;
  autohide?: boolean; // Whether to autohide the snackbar after given time
}
