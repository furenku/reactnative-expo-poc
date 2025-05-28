import { StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../theme/theme';

export const baseStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  containerCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },

  // Typography
  text: {
    color: colors.text,
    fontSize: typography.fontSize.medium,
    lineHeight: typography.lineHeight.medium,
  },
  textSmall: {
    color: colors.text,
    fontSize: typography.fontSize.small,
    lineHeight: typography.lineHeight.small,
  },
  textLarge: {
    color: colors.text,
    fontSize: typography.fontSize.large,
    lineHeight: typography.lineHeight.large,
  },
  heading: {
    fontSize: typography.fontSize.xlarge,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    lineHeight: typography.lineHeight.xlarge,
  },
  headingLarge: {
    fontSize: typography.fontSize.xxlarge,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  textSecondary: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.medium,
  },

  // Buttons
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold,
  },

  // Cards and surfaces
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
});