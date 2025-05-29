import { BorderRadius, Colors, Spacing, Theme, Typography } from "@/types/theme";


export const colors: Colors = {
  primary: '#007bff',
  secondary: '#6c757d',
  background: '#f8f9fa',
  white: '#fff',
  text: '#212529',
  textSecondary: '#6c757d',
  danger: '#dc3545',
  success: '#28a745',
  warning: '#ffc107',
};

export const spacing: Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const typography: Typography = {
  fontSize: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
    xxlarge: 30,
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    bold: '700',
  },
  lineHeight: {
    small: 16,
    medium: 20,
    large: 24,
    xlarge: 28,
  },
};

export const borderRadius: BorderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  full: 9999,
};

export const theme: Theme = {
  colors,
  spacing,
  typography,
  borderRadius,
};