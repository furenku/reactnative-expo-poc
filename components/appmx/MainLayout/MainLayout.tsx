import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useBaseStyles } from '@/styles/useBaseStyles';
import { Text } from '../ui/Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const ui = useBaseStyles();
  const theme = useTheme()

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f5f5f5',
      flexDirection: 'column',
      justifyContent: 'space-between',
      
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: '#fff',
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    logo: {
      width: 32,
      height: 32,
      borderRadius: 8,
    },
    greeting: {
      fontSize: 18,
      color: '#1f2937',
    },
    profileButton: {
      padding: 8,
    },
    profileIcon: {
      width: 32,
      height: 32,
      backgroundColor: '#e5e7eb',
      borderRadius: 16,
    },
    content: {
      paddingHorizontal: 20,
    },
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
      width: 24,
      height: 24,
      backgroundColor: theme.theme.colors.primary,
      borderRadius: 4,
    },
    footerIconInactive: {
      width: 24,
      height: 24,
      backgroundColor: '#9ca3af',
      borderRadius: 4,
    },
    footerText: {
      fontSize: 12,
      color: theme.theme.colors.primary,
      fontWeight: '500',
    },
    footerTextInactive: {
      fontSize: 12,
      color: '#9ca3af',
    },
    fabButton: {
      width: 56,
      height: 56,
      backgroundColor: theme.theme.colors.primary,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    fabIcon: {
      width: 24,
      height: 24,
      backgroundColor: '#fff',
      borderRadius: 2,
    },
  });
  
  return (
    <SafeAreaView style={[ui.container, styles.container]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
            <View style={{
                width: 32,
                height: 32
            }}>
                <Image
                    source={require('@assets/images/atdt-logo-small.png')}
                    style={styles.logo}
                />
            </View>
          <Text style={[ui.text, styles.greeting]}>Hola, 
          <Text style={[ui.text, styles.greeting, ui.bold]}> buenas tardes</Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
            <MaterialCommunityIcons name="account-outline" size={32} color="#666" />        
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={[styles.content]}>
        {children}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <View style={styles.footerIcon} />
          <Text style={styles.footerText}>Inicio</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.fabButton}>
            <MaterialCommunityIcons name="qrcode-scan" size={32} color="#fff" />                  
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.footerButton}>
          <View style={styles.footerIconInactive} />
          <Text style={styles.footerTextInactive}>CABI</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

