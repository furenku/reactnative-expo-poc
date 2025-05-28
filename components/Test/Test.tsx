import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { baseStyles } from '@/styles/base';
import { colors, spacing, typography } from '@/theme/theme';

export const Test: React.FC = () => {
  return (
    <View style={[baseStyles.containerCentered, styles.customContainer]}>
      <Text style={[baseStyles.headingLarge, styles.customText]}>Test</Text>
      <Text style={[baseStyles.textSecondary, styles.subtitle]}>
        Design System Demo
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  customContainer: {
    backgroundColor: colors.white,
  },
  customText: {
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.medium,
  },
});