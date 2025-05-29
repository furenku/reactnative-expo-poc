import { StyleSheet } from 'react-native';
import { Theme } from '@/types/theme';

// Convert static styles to a function that accepts theme
export const createBaseStyles = (theme: Theme) => StyleSheet.create({
  app: {
    fontFamily: theme.typography.fonts?.extraBold || 'System'
  },
  container: {
    flex: 1,    
    backgroundColor: theme.colors.background    
  },
  containerCentered: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },

  
  text: {
    fontFamily: theme.typography.fonts.regular,
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.medium,
    lineHeight: theme.typography.lineHeight.medium,
  },

  bold: {
    fontFamily: theme.typography.fonts.bold,
  },

  textSmall: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.small,
    lineHeight: theme.typography.lineHeight.small,
  },
  textLarge: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.large,
    lineHeight: theme.typography.lineHeight.large,
  },
  heading: {
    fontSize: theme.typography.fontSize.xlarge,
    fontFamily: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    lineHeight: theme.typography.lineHeight.xlarge,
  },
  headingLarge: {
    fontSize: theme.typography.fontSize.xxlarge,
    fontFamily: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  textSecondary: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.medium,
  },

  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondary: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.medium,
    fontFamily: theme.typography.fontWeight.bold,
  },

  
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
  },


  // Cards and surfaces
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
});