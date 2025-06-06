import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Text } from '../ui/Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

interface FooterIconsProps {
  onHomePress?: () => void;
  onScanPress?: () => void;
  onCabiPress?: () => void;
}

export const FooterIcons: React.FC<FooterIconsProps> = ({
  onHomePress,
  onScanPress,
  onCabiPress
}) => {
  const { theme } = useTheme();

  const ui = StyleSheet.create({
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 40,
      paddingVertical: 20,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
    },
    footerButton: {
      alignItems: 'center',
      gap: 4,
    },
    footerIcon: {
      width: 32,
      height: 32,
      borderRadius: 4,
    },
    footerIconInactive: {
      width: 32,
      height: 32,
      backgroundColor: '#9ca3af',
      borderRadius: 4,
    },
    footerText: {
      fontSize: 12,
      color: theme.colors.primary,
      fontWeight: '500',
    },
    footerTextInactive: {
      fontSize: 12,
      color: theme.colors.neutralDarkMid,
    },
    fabButton: {
      width: 56,
      height: 56,
      backgroundColor: theme.colors.primary,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    cabiIcon: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
  });

  return (
    <View style={ui.footer}>
      <TouchableOpacity style={ui.footerButton} onPress={onHomePress}>
        <View style={ui.footerIcon}>
          <MaterialCommunityIcons name="id-card" size={32} style={{ color: theme.colors.neutralDarkMid }} />                  
        </View>
        <Text style={ui.footerTextInactive}>Inicio</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={ui.fabButton} onPress={onScanPress}>
        <MaterialCommunityIcons name="qrcode-scan" size={32} color="#fff" />                  
      </TouchableOpacity>
      
      <TouchableOpacity style={ui.footerButton} onPress={onCabiPress}>
        <View style={ui.footerIcon}>
          <Image
            source={require('@/assets/images/onboarding/cabi-logo.png')}
            style={ui.cabiIcon}
            resizeMode="contain"              
          />
        </View>
        <Text style={ui.footerTextInactive}>CABI</Text>
      </TouchableOpacity>
    </View>
  );
};