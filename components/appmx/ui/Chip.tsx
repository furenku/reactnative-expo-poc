import React from 'react';
import { TouchableOpacity, Text, View, ViewStyle, TextStyle } from 'react-native';
import { useBaseStyles } from '@/styles/useBaseStyles';
import { useTheme } from '@/context/ThemeContext';

interface ChipProps {
  children?: React.ReactNode;
  label: string;
  variant?: 'default' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  onPress?: () => void;
  disabled?: boolean;
}

export function Chip({ 
  children, 
  label, 
  variant = 'default', 
  size = 'md',
  onPress,
  disabled = false
}: ChipProps) {

  const { theme, styles } = useTheme()

  const getChipStyle = () => {
    const baseStyle = {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      borderRadius: 20,
      gap: 4,
    
      backgroundColor: '#CDA5DD',
      
    
      
    };

    // Size styles
    const sizeStyles = {
      sm: { paddingHorizontal: 10, paddingVertical: 4 },
      md: { paddingHorizontal: 12, paddingVertical: 6 },
      lg: { paddingHorizontal: 16, paddingVertical: 8 },
    };

    // Variant styles
    const variantStyles = {
      default: {
        backgroundColor: theme.colors.primary + '1A', // 10% opacity
      },
      secondary: {
        backgroundColor: theme.colors.secondary,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary,
      },
    };

    // Disabled styles
    const disabledStyle = disabled ? {
      backgroundColor: theme.colors.neutralLight,
      borderColor: theme.colors.neutralLight,
      opacity: 0.6,
    } : {};

    return [
      baseStyle,
      sizeStyles[size],
      variantStyles[variant],
      disabledStyle,
    ];
  };

  const getTextStyle = () => {
    const sizeTextStyles = {
      sm: { fontSize: 12 },
      md: { fontSize: 14 },
      lg: { fontSize: 16 },
    };

    const variantTextStyles = {
      default: { color: theme.colors.primary },
      secondary: { color: theme.colors.white },
      outline: { color: theme.colors.primary },
    };

    const disabledTextStyle = disabled ? {
      color: theme.colors.neutral,
    } : {};

    return [
      { fontWeight: '500' as const },
      sizeTextStyles[size],
      variantTextStyles[variant],
      disabledTextStyle,
    ];
  };

  const iconSize = {
    sm: 12,
    md: 16,
    lg: 20,
  }[size];

  const ChipContent = () => (
    <>
      {children && (
        <View style={{ width: iconSize, height: iconSize }}>
          {children}
        </View>
      )}
      <Text style={[getTextStyle(),  styles.text, styles.semiBold, styles.textSmall, {
        color: theme.colors.primary
      } ]}>
        {label}
      </Text>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={[getChipStyle()]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <ChipContent />
      </TouchableOpacity>
    );
  }

  return (
    <View style={[getChipStyle(), ]}>
      <ChipContent />
    </View>
  );
}