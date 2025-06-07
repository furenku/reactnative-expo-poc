import React, { useState, useEffect } from 'react';
import { Animated, SafeAreaView, View } from 'react-native';
import { Splash } from './Splash/Splash';
import { Onboarding } from '@pages/Onboarding/Onboarding';
import { CredentialFlow } from '@/pages/appmx/CredentialFlow/CredentialFlow';
import { ThemeProvider } from '@/context/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainLayout } from './MainLayout/MainLayout';

export const App = () => {
  
  const [showSplash, setShowSplash] = useState(true);
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [biometrics, setBiometrics] = useState<'pending' | 'enabled' | 'disabled' | null>(null);

  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // After 2.5 seconds, start fade out and hide splash
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setShowSplash(false);
        // Show biometric prompt after splash
        setBiometrics('pending');
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleBiometricActivate = () => {
    setBiometrics('enabled');
    // Add your biometric activation logic here
  };

  const handleBiometricDismiss = () => {
    setBiometrics('disabled');
  };

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <View style={{
          flex: 1,          
          backgroundColor: '#ffffff',
        }}>
        {showSplash ? (
            <Animated.View style={{ opacity: fadeAnim, position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
              <Splash />
            </Animated.View>
          ): onboardingDone ? (
            <CredentialFlow
              biometrics='enabled'
              onBiometricActivate={handleBiometricActivate}
              onBiometricDismiss={handleBiometricDismiss}
            />
          ) : (
            <MainLayout useSafeArea={false} customInsets={{
              bottom: true
            }}>
              <Onboarding 
                onDone={() => setOnboardingDone(true)}
              />
            </MainLayout>
        )}
        </View>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}