import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { TextInput as RNTextInput, TextInputProps } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  variant?: 'default' | 'password' | 'search' | 'large';
  style?: any;
}

export const TextInput: React.FC<CustomTextInputProps> = ({ 
  style, 
  variant = 'default', 
  ...props 
}) => {
  const { styles } = useTheme();
  
  const getVariantStyle = () => {
    switch (variant) {
      case 'password': return styles.textInputPassword;
      case 'search': return styles.textInputSearch;
      case 'large': return styles.textInputLarge;
      default: return styles.textInput;
    }
  };

  return (
    <RNTextInput 
      style={[getVariantStyle(), style]} 
      placeholderTextColor={styles.textSecondary.color}
      {...props} 
    />
  );
};