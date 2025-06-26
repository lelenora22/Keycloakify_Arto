import { PaletteOptions } from '@mui/material';
 
export const THEMES = {
  DARK: 'DARK',
  LIGHT: 'LIGHT',
} as const;
 
const lightVariant: VariantType = {
  palette: {
    mode: 'light',
    primary: {
      main: '#ED6C84',
    },
    secondary: {
      main: '#ECE9EA',
    },
    background: {
      default: '#ffffff',
      paper: '#fbfafa',
    },
    text: {
      secondary: '#ED6C84',
    },
  },
};
 
export const darkVariant: VariantType = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#ED6C84',
    },
    secondary: {
      main: '#ECE9EA',
    },
    background: {
      default: '#121212',
      paper: '#232323',
    },
    text: {
      secondary: '#ED6C84',
    },
  },
};
 
const variants: Record<keyof typeof THEMES, VariantType> = {
  DARK: darkVariant,
  LIGHT: lightVariant,
};
 
export default variants;
 
export type VariantType = {
  palette: PaletteOptions;
};
 
 