// Auto-generated MUI theme from merged design tokens
import { createTheme, ThemeOptions } from '@mui/material/styles';

export const muiThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#2c49ef',
      light: '#94b4ff',
      dark: '#182556',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#3ecfe2',
      light: '#b9f7ff',
      dark: '#228b99',
      contrastText: '#ffffff',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#ffffff',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ef6c00',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#ffffff',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#000000de',
      secondary: '#00000099',
      disabled: '#00000061',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    action: {
      active: '#0000008f',
      hover: '#0000000a',
      selected: '#00000014',
      disabled: '#00000061',
      focus: '#0000001f',
      disabledBackground: '#0000001f',
    },
  },
  typography: {
    fontFamily: 'Inter, Nunito, Roboto, Roboto Mono, Arial, Material Icons',
  },
  shape: {
    borderRadius: 24,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0px 4px 5px rgba(0,0,0,0.5)',
        },
      },
    },
  },
};

export const muiTheme = createTheme(muiThemeOptions);
export default muiTheme;
