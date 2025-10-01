import { createTheme, ThemeOptions } from '@mui/material/styles';
import muiThemeOptions from '../tokens/muiTheme';

// Use the merged design tokens as the base theme
export const themeOptions: ThemeOptions = muiThemeOptions;

// Create and export the theme
export const theme = createTheme(themeOptions);

// Export theme creation function for customization
export const createCustomTheme = (options: ThemeOptions = {}) => {
  return createTheme({
    ...themeOptions,
    ...options,
  });
};
