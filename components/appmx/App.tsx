import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { Splash } from './Splash/Splash';
import { Test } from '../Test/Test';
import { TestCameraFlow } from './TestCameraFlow/TestCameraFlow';
import { Onboarding } from './Onboarding/Onboarding';
import { CredentialFlow } from '@/pages/appmx/CredentialFlow/CredentialFlow';

export const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [onboardingDone, setOnboardingDone] = useState(false);
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
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash ? (
        <Animated.View style={{ opacity: fadeAnim, position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
          <Splash />
        </Animated.View>
      ): onboardingDone ? (
        <CredentialFlow/>
      ) : (
        <Onboarding onDone={() => setOnboardingDone(true)} />
      )}
    </>
  );
}