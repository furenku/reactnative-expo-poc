import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import { useBaseStyles } from '@/styles/useBaseStyles';

interface Props {
  onAnimationComplete?: () => void;
}

export const Splash: React.FC<Props> = ({ onAnimationComplete }) => {
  const ui = useBaseStyles();
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
      onAnimationComplete?.();
    });
  }, [fadeAnim, onAnimationComplete]);

  return (
    <View style={[ui.containerCentered, styles.splashContainer]}>
      {/* Background Image */}
      <Image
        source={require('@/assets/images/splash-bg.png')} // Update path to your background image
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      

      {/* Floating Logo with Animation */}
      <View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Image
          source={require('@/assets/images/logo.png')} // Update path to your logo
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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