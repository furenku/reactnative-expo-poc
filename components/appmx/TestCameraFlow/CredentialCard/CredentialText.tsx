import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

interface CustomTextProps extends TextProps {
  variant?: 'default' | 'small' | 'large' | 'heading' | 'headingLarge' | 'secondary';
  style?: any;
}
  

export const Text: React.FC<CustomTextProps> = ({ 
  style, 
  variant = 'default', 
  ...props 
}) => {
  const { styles } = useTheme();
  console.log("styles.credentialText", styles);
  
  const getVariantStyle = () => {
    switch (variant) {
      case 'small': return styles.textSmall;
      case 'large': return styles.textLarge;
      case 'heading': return styles.heading;
      case 'headingLarge': return styles.headingLarge;
      case 'secondary': return styles.textSecondary;
      default: return styles.credentialText;
    }
  };

  return (
    <RNText 
      style={[ getVariantStyle(), style]} 
      {...props} 
    />
  );
};