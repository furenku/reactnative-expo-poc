import { StyleSheet } from 'react-native';
import { Theme } from '@/types/theme';


// Convert static styles to a function that accepts theme
export const createBaseStyles = (theme: Theme) => StyleSheet.create({
  app: {
    fontFamily: theme.typography.fonts?.extraBold || 'System'
  },
  container: {
    width: '100%',
    height: '100%',
    flex: 1,    
    backgroundColor: theme.colors.background,
    position: 'relative'
  },
  containerCentered: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    position: 'relative'
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

  textDark: {
    color: theme.colors.neutralDark,
  },
  textLight: {
    color: theme.colors.neutralLight,
  },
  textDarker: {
    color: theme.colors.neutralDark,
  },
  textLighter: {
    color: theme.colors.neutralLight,
  },

  credentialText: {
    fontFamily: theme.typography.fonts.credential.regular,
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.medium,
    lineHeight: theme.typography.lineHeight.medium,
  },
  

  medium: {
    fontFamily: theme.typography.fonts.medium,
  },
  semiBold: {
    fontFamily: theme.typography.fonts.semiBold,
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
    fontFamily: theme.typography.fonts.semiBold,
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
    flexDirection: "row",
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',     
  },

  buttonPrimary: {    
    backgroundColor: theme.colors.primary,
    color: 'white'
  },

  buttonDisabled: {
    backgroundColor: theme.colors.neutralLight,    
  },

  buttonSecondary: {
    backgroundColor: theme.colors.secondary,
    color: 'white'
  },

  buttonOutline: {    
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: 'transparent'
  },

  buttonOutlineText: {    
    color: theme.colors.primary    
  },


  buttonText: {
    height: '100%',
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.medium,
    lineHeight: theme.typography.fontSize.medium,    
    fontFamily: theme.typography.fonts.semiBold,
  },
  buttonDisabledText: {
    color: theme.colors.neutralDark
  },


  
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    fontFamily: theme.typography.fonts.regular,

  },


  // Cards and surfaces
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },


  
});