import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { useBaseStyles } from '@/styles/useBaseStyles';
import { Text } from '../ui/Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { AppHeader } from '../AppHeader/AppHeader';
import { Animated } from 'react-native'

interface MainLayoutProps {
  userName?: string;
  children: React.ReactNode;
  showHeader?: boolean;
  avatar?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ userName, showHeader, children, avatar }) => {
  const ui = useBaseStyles();
  const theme = useTheme()



const fadeAnim = useRef(new Animated.Value(showHeader ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showHeader ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showHeader, fadeAnim]);


  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: '#f5f5f5',
      padding: 0
    },
    header: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: '#fff',
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
    <View 
      style={[ ui.container, { minHeight: '100%', flex: 1 }]} 
    >
        
      { showHeader && <AppHeader userName={userName} avatar={avatar}/> }


      {/* Main Content */}
      <ScrollView style={{flex: 1}} contentContainerStyle={[ui.container]}>
        {children}
      </ScrollView>

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
    </View>
  );
};
