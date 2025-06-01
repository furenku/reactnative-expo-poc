import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius } from '@/theme/theme';
import { useBaseStyles } from '@/styles/useBaseStyles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary',
  style,
  textStyle 
}) => {

  const baseStyles = useBaseStyles();

  const buttonStyle = variant === 'primary' ? baseStyles.button : baseStyles.buttonSecondary;
  
  return (
    <TouchableOpacity 
      style={[buttonStyle, style]} 
      onPress={onPress}
    >
      <Text style={[baseStyles.buttonText, baseStyles.buttonText]}>{title}</Text>
    </TouchableOpacity>
  );
};