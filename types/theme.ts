export interface Colors {
  surface: string;
  background: string;
  primary: string;
  secondary: string;
  secondaryGold: string;
  primaryLight: string;
  primaryLighter: string;
  primaryDark: string;
  primaryDarker: string;
  white: string;
  text: string;
  textSecondary: string;
  danger: string;
  success: string;
  warning: string;
  neutral: string;
  neutralDarker: string;
  neutralDark: string;
  neutralLight: string;
  neutralLighter: string;
  credential: string;
  captureButton: string;
  captureButtonInner: string;
}

export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface Typography {
  fonts: {
    // extraLight: string;
    // light: string;
    regular: string;
    medium: string;
    semiBold: string;
    bold: string;
    extraBold: string;
    // black: string;
    // extraLightItalic: string;
    // lightItalic: string;
    // regularItalic: string;
    // mediumItalic: string;
    // semiBoldItalic: string;
    // boldItalic: string;
    // extraBoldItalic: string;
    // blackItalic: string;
    credential: {
      regular: string
      semiBold: string
    }
  };
  fontSize: {
    small: number;
    medium: number;
    large: number;
    xlarge: number;
    xxlarge: number;
  };
  fontWeight: {
    normal: string;
    medium: string;
    bold: string;
  };
  lineHeight: {
    small: number;
    medium: number;
    large: number;
    xlarge: number;
  };
}

export interface BorderRadius {
  sm: number;
  md: number;
  lg: number;
  full: number;
}

export interface Theme {
  colors: Colors;
  spacing: Spacing;
  typography: Typography;
  borderRadius: BorderRadius;
}