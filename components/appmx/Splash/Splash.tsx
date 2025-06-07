import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

interface SplashProps {
  onAnimationComplete?: () => void;
}

const ui = StyleSheet.create({
  splashContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1    
  },
  backgroundImage: {
    position: 'absolute',
    objectFit: 'cover',
    width: '100%',
    height: '100%'
  },
  logoContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    zIndex: 2
  },
  logo: {
    width: 150,
    height: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 9999
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    zIndex: 1
  },
});

export const Splash: React.FC<SplashProps> = ({ onAnimationComplete }) => {
  const { styles } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    });
  }, [fadeAnim, onAnimationComplete]);

  return (
    <View style={[styles.containerCentered, ui.splashContainer]}>
      <StatusBar hidden />
      <Image
        source={require('@/assets/images/splash-bg.png')}
        style={ui.backgroundImage}
        resizeMode="cover"
      />
      <View style={ui.overlay} />
      
      {/* Use Animated.View instead of regular View with opacity */}
      <Animated.View style={[ui.logoContainer, { opacity: fadeAnim }]}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={ui.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};