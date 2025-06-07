import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useBaseStyles } from '@/styles/useBaseStyles';
import { Theme } from '@/types/theme';
import { useTheme } from '@/context/ThemeContext';
import { Text } from '@/components/ui/Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';



export const AppFooter: React.FC = () => {
  const { theme, styles } = useTheme();
  const ui = createStyles(theme);

  return (
    <View style={ui.footer}>

        <TouchableOpacity style={ui.footerButton}>
        

            <View style={{
            width: 24,
            height: 24
            }}>
            <Image
                style={{
                    width: '100%',
                    height: '100%',
                }}
                source={require('@assets/images/onboarding/cabi-logo.png')}
                resizeMode="contain"                
            />
            </View>
                    
            <Text style={[styles.text, styles.semiBold, {color: theme.colors.primary}]}>
            079
            </Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={ui.footerButton}
        onPress={()=>{}}
        >
        <MaterialCommunityIcons name="qrcode-scan" size={24} color={theme.colors.primary} />
        <View>
            <Text style={[styles.text, {color: theme.colors.primary}, styles.semiBold, ui.title]}>Validar</Text>
            <Text style={[styles.text, {color: theme.colors.primary}, ui.subtitle]}>credencial</Text>
        </View>
        </TouchableOpacity>
    </View>

    
  );
};
const createStyles = (theme: Theme) => StyleSheet.create({
  
  footer: {
    alignItems: 'center',    
    flexShrink: 1,
    flexDirection: 'row',
    gap: theme.spacing.md,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    backgroundColor: theme.colors.white,

  },
  
  footerButton: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: theme.colors.neutralLighter,
    borderWidth: 1,
    borderColor: theme.colors.neutralLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.sm,
    elevation: 2,
    shadowColor: theme.colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    color: theme.colors.primary,
    height: 2 * theme.spacing.xxl,
  },

  title: {
    fontSize: theme.typography.fontSize.medium,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.small,
  },
});