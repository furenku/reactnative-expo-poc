import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, ViewStyle, Animated } from 'react-native';
import { colors } from '@/theme/appmxTheme';
import { useBaseStyles } from '@/styles/useBaseStyles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
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
  const primaryColor = colors.primary;
  const secondaryColor = colors.secondary;
  const disabledColor = colors.neutralLight;

  const getBaseColor = () => {
    if (variant === 'outline') return 'transparent';
    return variant === 'primary' ? primaryColor : secondaryColor;
  };

  const animatedButtonStyle = {
    backgroundColor: variant === 'outline' ? 'transparent' : animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [disabledColor, getBaseColor()],
    }),
    ...(variant === 'outline' && {
      borderWidth: 1,
      borderColor: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [disabledColor, primaryColor],
      }),
    })
  };

  const animatedTextColor = {
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.neutral, variant === 'outline' ? colors.primary : colors.white],
    }),
  };

  const baseButtonStyle = variant === 'primary' ? baseStyles.button : baseStyles.buttonSecondary;

  return (
    <Animated.View style={[baseButtonStyle, animatedButtonStyle, style]}>
      <TouchableOpacity
        style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}
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