import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, ViewStyle, Animated, View, Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  style?: ViewStyle;
  disabled?: boolean;
}

export function Button({ title, onPress, variant = 'primary', disabled = false, style }: ButtonProps) {
  const { theme: { colors }, styles } = useTheme()

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
    if (variant === 'outline' || variant === 'text') return 'transparent';
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

  const buttonStyle = variant === 'primary' ? styles.button : styles.buttonSecondary;

  return (
    <View style={[buttonStyle, style]}>
      <TouchableOpacity
        style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText + disabled ? [styles.buttonDisabledText, styles.buttonDisabled] : {}, {  height: 32}]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}