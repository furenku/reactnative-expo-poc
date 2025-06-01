import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, ViewStyle, Animated } from 'react-native';
import { colors } from '@/theme/appmxTheme';
import { useBaseStyles } from '@/styles/useBaseStyles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  disabled?: boolean;
}

export function Button({ title, onPress, variant = 'primary', disabled = false, style }: ButtonProps) {
  const baseStyles = useBaseStyles();
  const animatedValue = useRef(new Animated.Value(disabled ? 0 : 1)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: disabled ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [disabled, animatedValue]);

  // Get the base colors for interpolation
  const primaryColor = colors.primary; // Adjust to your actual primary color
  const secondaryColor = colors.secondary; // Adjust to your actual secondary color
  const disabledColor = colors.neutralLight; // Your disabled color

  const baseColor = variant === 'primary' ? primaryColor : secondaryColor;
  const animatedButtonStyle = {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [disabledColor, baseColor],
    })
  };

  const animatedTextColor = {
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.neutral, colors.white],
    }),
  };

  const baseButtonStyle = variant === 'primary' ? baseStyles.button : baseStyles.buttonSecondary;

  return (
    <Animated.View style={[baseButtonStyle, animatedButtonStyle, style]}>
      <TouchableOpacity
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Animated.Text style={[baseStyles.buttonText, animatedTextColor]}>
          {title}
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
