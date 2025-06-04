import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface SplashProps {
  onAnimationComplete?: () => void;
}


const ui = StyleSheet.create({
  splashContainer: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%'
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
    // Add shadow for floating effect
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
    // Fade in animation
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Hold for a moment
      Animated.delay(1500),
      // Fade out animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start(() => {
      // Animation complete callback
      if( onAnimationComplete ) {
        onAnimationComplete?.();
      }
    });
  }, [fadeAnim, onAnimationComplete]);

  return (
    <View style={[styles.containerCentered, ui.splashContainer]}>
      {/* Background Image */}
      <Image
        source={require('@/assets/images/splash-bg.png')} // Update path to your background image
        style={ui.backgroundImage}
        resizeMode="cover"
      />
      <View style={ui.overlay} />
      

      {/* Floating Logo with Animation */}
      <View style={[ui.logoContainer, { opacity: fadeAnim }]}>
        <Image
          source={require('@/assets/images/logo.png')} // Update path to your logo
          style={ui.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};
