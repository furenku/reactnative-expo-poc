import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { Text } from '../ui/Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { AppHeader } from '../AppHeader/AppHeader';
import { BiometricOverlay } from '../BiometricOverlay/BiometricOverlay';
import { AppFooter } from '../AppFooter/AppFooter';
import { Animated } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context';



interface MainLayoutProps {
  userName?: string;
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  avatar?: string;
  biometrics?: 'pending' | 'enabled' | 'disabled';
  onBiometricActivate?: () => void;
  onBiometricDismiss?: () => void;
  onHomePress?: () => void;
  onScanPress?: () => void;
  onCabiPress?: () => void;
  customInsets?: {
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
  };
  useSafeArea?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  userName, 
  showHeader,
  showFooter, 
  children, 
  avatar, 
  biometrics,
  onBiometricActivate,
  onBiometricDismiss,
  onHomePress,
  onScanPress,
  onCabiPress,
  customInsets,
  useSafeArea = true
}) => {

  const {theme, styles} = useTheme()

  const fadeAnim = useRef(new Animated.Value(showHeader ? 1 : 0)).current;

  const safeAreaInsets = useSafeAreaInsets();

  const insets = useSafeArea
    ? safeAreaInsets
    : {
    top: (customInsets?.top && safeAreaInsets.top) || 0,
    bottom: (customInsets?.bottom && safeAreaInsets.bottom) || 0,
    left: (customInsets?.left && safeAreaInsets.left) || 0,
    right: (customInsets?.right && safeAreaInsets.right) || 0
  };
  
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
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
  });
  
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
        ui.container,
        { flex: 1 }
      ]} 
    >
        
      { showHeader && <AppHeader userName={userName} avatar={avatar}/> }

      {/* Main Content */}
      <ScrollView style={styles.container} contentContainerStyle={[styles.container]}>
        {children}
      </ScrollView>

      { showFooter && <AppFooter /> }
      
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