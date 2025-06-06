import { BorderRadius, Colors, Spacing, Theme, Typography } from '@/types/theme';

import {
  useFonts,
  // NotoSans_200ExtraLight,
  // NotoSans_300Light,
  NotoSans_400Regular,
  NotoSans_500Medium,
  NotoSans_600SemiBold,
  NotoSans_700Bold,
  NotoSans_800ExtraBold,
  // NotoSans_900Black,
  // NotoSans_200ExtraLight_Italic,
  // NotoSans_300Light_Italic,
  // NotoSans_400Regular_Italic,
  // NotoSans_500Medium_Italic,
  // NotoSans_600SemiBold_Italic,
  // NotoSans_700Bold_Italic,
  // NotoSans_800ExtraBold_Italic,
  // NotoSans_900Black_Italic,
} from '@expo-google-fonts/noto-sans';




import {
  useFonts as useMFonts,
  Montserrat_400Regular ,
  Montserrat_600SemiBold,
} from '@expo-google-fonts/montserrat';



export const colors: Colors = {
  surface: '#ffffff',
  primary: '#006657',
  secondary: '#000000',
  primaryLight: '#ff8ab0',
  primaryLighter: '#ffc4d8',
  primaryDark: '#d10038',
  primaryDarker: '#990029',
  background: '#ffffff',
  white: '#fff',
  text: '#212529',
  textSecondary: '#6c757d',
  danger: '#dc3545',
  success: '#2a872a',
  warning: '#ffc107',
  credential: '#611232',
  neutral: '#AAAAAA',
  neutralDarker: '#161a1d',
  neutralDark: '#434343',
  neutralLight: '#DDDDDD',
  neutralLighter: '#f9f9f9',
  secondaryGold: '#a57f2c'
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
    // extraLight: 'NotoSans_200ExtraLight',
    // light: 'NotoSans_300Light',
    regular: 'NotoSans_400Regular' as const,
    medium: 'NotoSans_500Medium' as const,
    semiBold: 'NotoSans_600SemiBold' as const,
    bold: 'NotoSans_700Bold' as const,
    extraBold: 'NotoSans_800ExtraBold' as const,
    // black: 'NotoSans_900Black',
    // extraLightItalic: 'NotoSans_200ExtraLight_Italic',
    // lightItalic: 'NotoSans_300Light_Italic',
    // regularItalic: 'NotoSans_400Regular_Italic',
    // mediumItalic: 'NotoSans_500Medium_Italic',
    // semiBoldItalic: 'NotoSans_600SemiBold_Italic',
    // boldItalic: 'NotoSans_700Bold_Italic',
    // extraBoldItalic: 'NotoSans_800ExtraBold_Italic',
    // blackItalic: 'NotoSans_900Black_Italic',
    credential: {
      regular: 'Montserrat_400Regular' as const,
      semiBold: 'Montserrat_600SemiBold' as const,
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
    semiBold: '600',
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
  const [fontsLoaded1, error1] = useFonts({
    // NotoSans_200ExtraLight,
    // NotoSans_300Light,
    NotoSans_400Regular,
    NotoSans_500Medium,
    NotoSans_600SemiBold,
    NotoSans_700Bold,
    NotoSans_800ExtraBold,
    // NotoSans_900Black,
    // NotoSans_200ExtraLight_Italic,
    // NotoSans_300Light_Italic,
    // NotoSans_400Regular_Italic,
    // NotoSans_500Medium_Italic,
    // NotoSans_600SemiBold_Italic,
    // NotoSans_700Bold_Italic,
    // NotoSans_800ExtraBold_Italic,
    // NotoSans_900Black_Italic,
    
  });

  const [fontsLoaded2, error2] = useMFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold    
  });

  return fontsLoaded1 && fontsLoaded2;
};
