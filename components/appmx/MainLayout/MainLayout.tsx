import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { Text } from '../ui/Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { AppHeader } from '../AppHeader/AppHeader';
import { BiometricOverlay } from '../BiometricOverlay/BiometricOverlay';
import { Animated } from 'react-native'

interface MainLayoutProps {
  userName?: string;
  children: React.ReactNode;
  showHeader?: boolean;
  avatar?: string;
  biometrics?: 'pending' | 'enabled' | 'disabled';
  onBiometricActivate?: () => void;
  onBiometricDismiss?: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  userName, 
  showHeader, 
  children, 
  avatar, 
  biometrics,
  onBiometricActivate,
  onBiometricDismiss
}) => {

  const {theme, styles} = useTheme()

  const fadeAnim = useRef(new Animated.Value(showHeader ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showHeader ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showHeader, fadeAnim]);


  const ui = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      padding: 0,      
      minHeight: Dimensions.get('window').height, // Add fallback height

    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
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
      // position: 'absolute',
      // bottom: 0,
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
      backgroundColor: theme.colors.primary,
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
      color: theme.colors.primary,
      fontWeight: '500',
    },
    footerTextInactive: {
      fontSize: 12,
      color: '#9ca3af',
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
    fabIcon: {
      width: 24,
      height: 24,
      backgroundColor: '#fff',
      borderRadius: 2,
    },
  });
  
  const width = '100%'
  const height = '100%'

  const backdropOpacity = useRef(new Animated.Value(0)).current;
  
  // useEffect(() => {
    if (biometrics === 'pending' ) {
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  // }, [visible]);

  
  return (
    <View 
      style={[
        styles.container,
      ]} 
    >
        
      { showHeader && <AppHeader userName={userName} avatar={avatar}/> }

      {/* Main Content */}
      <ScrollView style={[styles.container]} contentContainerStyle={[styles.container]}>
        {children}
      </ScrollView>

      {/* Footer */}
      <View style={ui.footer}>
        <TouchableOpacity style={ui.footerButton}>
          <View style={ui.footerIcon} />
          <Text style={ui.footerText}>Inicio</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={ui.fabButton}>
            <MaterialCommunityIcons name="qrcode-scan" size={32} color="#fff" />                  
        </TouchableOpacity>
        
        <TouchableOpacity style={ui.footerButton}>
          <View style={ui.footerIconInactive} />
          <Text style={ui.footerTextInactive}>CABI</Text>
        </TouchableOpacity>
      </View>

{/* Fixed backdrop that fades in/out */}
      {biometrics === 'pending' && (
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            ui.backdrop,
            { opacity: backdropOpacity }
          ]}
          pointerEvents="none"
        />
      )}

      {/* Biometric Overlay */}
      <BiometricOverlay
        visible={biometrics === 'pending'}
        onActivate={() => onBiometricActivate?.()}
        onDismiss={() => onBiometricDismiss?.()}
      />
    </View>
  );
};