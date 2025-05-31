import { BorderRadius, Colors, Spacing, Theme, Typography } from '@/types/theme';

import {
  useFonts,
  // Mulish_200ExtraLight,
  // Mulish_300Light,
  Mulish_400Regular,
  Mulish_500Medium,
  Mulish_600SemiBold,
  Mulish_700Bold,
  Mulish_800ExtraBold,
  // Mulish_900Black,
  // Mulish_200ExtraLight_Italic,
  // Mulish_300Light_Italic,
  // Mulish_400Regular_Italic,
  // Mulish_500Medium_Italic,
  // Mulish_600SemiBold_Italic,
  // Mulish_700Bold_Italic,
  // Mulish_800ExtraBold_Italic,
  // Mulish_900Black_Italic,
} from '@expo-google-fonts/mulish';


import {
  useFonts as useMFonts,
    // Mulish_200ExtraLight,
    // Mulish_300Light,
    Montserrat_400Regular ,
    // Mulish_500Medium,
    // Mulish_600SemiBold,
    // Mulish_700Bold,
    // Mulish_800ExtraBold,
    // Mulish_900Black,
    // Mulish_200ExtraLight_Italic,
    // Mulish_300Light_Italic,
    // Mulish_400Regular_Italic,
    // Mulish_500Medium_Italic,
    // Mulish_600SemiBold_Italic,
    // Mulish_700Bold_Italic,
    // Mulish_800ExtraBold_Italic,
    // Mulish_900Black_Italic,
  } from '@expo-google-fonts/montserrat';



export const colors: Colors = {
  primary: '#611232',
  primaryLight: '#ff8ab0',
  primaryLighter: '#ffc4d8',
  primaryDark: '#d10038',
  primaryDarker: '#990029',
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
  fonts: {
    // extraLight: 'Mulish_200ExtraLight',
    // light: 'Mulish_300Light',
    regular: 'Mulish_400Regular' as const,
    medium: 'Mulish_500Medium' as const,
    semiBold: 'Mulish_600SemiBold' as const,
    bold: 'Mulish_700Bold' as const,
    extraBold: 'Mulish_800ExtraBold' as const,
    // black: 'Mulish_900Black',
    // extraLightItalic: 'Mulish_200ExtraLight_Italic',
    // lightItalic: 'Mulish_300Light_Italic',
    // regularItalic: 'Mulish_400Regular_Italic',
    // mediumItalic: 'Mulish_500Medium_Italic',
    // semiBoldItalic: 'Mulish_600SemiBold_Italic',
    // boldItalic: 'Mulish_700Bold_Italic',
    // extraBoldItalic: 'Mulish_800ExtraBold_Italic',
    // blackItalic: 'Mulish_900Black_Italic',
    credential: {
      regular: 'Montserrat_400Regular' as const,
    }
  },
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

export const useFontsHook = () => {
  const [fontsLoaded1] = useFonts({
    // Mulish_200ExtraLight,
    // Mulish_300Light,
    Mulish_400Regular,
    Mulish_500Medium,
    Mulish_600SemiBold,
    Mulish_700Bold,
    Mulish_800ExtraBold,
    // Mulish_900Black,
    // Mulish_200ExtraLight_Italic,
    // Mulish_300Light_Italic,
    // Mulish_400Regular_Italic,
    // Mulish_500Medium_Italic,
    // Mulish_600SemiBold_Italic,
    // Mulish_700Bold_Italic,
    // Mulish_800ExtraBold_Italic,
    // Mulish_900Black_Italic,
    
  });

  const [fontsLoaded2] = useMFonts({
    Montserrat_400Regular    
  });


  return fontsLoaded1 && fontsLoaded2;
};
