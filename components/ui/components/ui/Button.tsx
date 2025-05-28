import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { baseStyles } from '../../styles/base';
import { colors, spacing, borderRadius } from '../../theme/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary',
  style,
  textStyle 
}) => {
  const buttonStyle = variant === 'primary' ? baseStyles.button : baseStyles.buttonSecondary;
  
  return (
    <TouchableOpacity 
      style={[buttonStyle, style]} 
      onPress={onPress}
    >
      <Text style={[baseStyles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};