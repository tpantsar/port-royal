import { createTheme } from '@mui/material';

export type PaletteMode = 'light' | 'dark';

export const getDesignTokens = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#1565c0' }, // deep blue
      secondary: { main: '#ffb300' }, // warm accent
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            textTransform: 'none',
          },
        },
      },
    },
  });
