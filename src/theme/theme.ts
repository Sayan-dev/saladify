import type {ExtendedTheme} from '../types';
import fonts from './fonts';

const AppTheme: ExtendedTheme = {
  dark: false,
  colors: {
    background: '#F8F8FA',
    dark: '#171C2B',
    lightBackground: '#FFF2E7',
    formBackground: '#F3F1F1',
    card: '#070707',
    text: '#27214D',
    formText: '#C2BDBD',
    border: '#F4F4F4',
    primary: '#FFA451',
    accent: '#27214D',
    success: '#4CD964',
    secondary: '#F08626',
    error: '#FF3B30',
    notification: '#070707',
    transparent: 'transparent',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  fonts,
  fontSize: {
    text: 16,
    small: 14,
    medium: 16,
    large: 20,
    h1: 24,
  },
};

export default AppTheme;
