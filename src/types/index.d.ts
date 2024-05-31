import {Theme} from '@react-navigation/native';
import {FontStyles} from '../theme/fonts';

interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

interface FontSize {
  text: number;
  small: number;
  h1: number;
  medium: number;
  large: number;
}

export interface ExtendedTheme extends Theme {
  colors: Theme['colors'] & {
    dark: string;
    accent: string;
    secondary: string;
    success: string;
    formBackground: string;
    formText: string;
    error: string;
    transparent: string;
    lightBackground: string;
  };
  spacing: Spacing;
  fonts: FontStyles;
  fontSize: FontSize;
}

declare module '@react-navigation/native' {
  export function useTheme(): ExtendedTheme;
}
