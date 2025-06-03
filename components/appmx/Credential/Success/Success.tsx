import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Easing, Image } from 'react-native';
import { useBaseStyles } from '@/styles/useBaseStyles';
import { Theme } from '@/types/theme';
import { useTheme } from '@/context/ThemeContext';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';

interface SuccessProps {
  onComplete?: () => void;
}

export const Success: React.FC<SuccessProps> = ({ onComplete }) => {
  const ui = useBaseStyles();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const scaleValue = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Scale animation for the check icon
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 400,
        easing: Easing.bezier(0.68, -0.55, 0.265, 1.55),
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    // Fade in animation for text
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 600,
      delay: 300,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [scaleValue, fadeValue]);

  return (
    <View style={[ui.container, ui.containerCentered]}>
      <View style={styles.iconContainer}>
        <Animated.View style={[
          { transform: [{ scale: scaleValue }] }
        ]}>
          <View style={{
            width: 100,
            height: 100
          }}>
            <Image
              style={{flex: 1}}
              source={require('@assets/images/illustrations/illustration-credential-ready.png')}
              resizeMode="contain"                
            />
          </View>
        </Animated.View>
      </View>

      <Animated.View style={[styles.textContainer, { opacity: fadeValue }]}>
        <Text style={[ui.text, ui.semiBold, styles.title]}>
          Tu credencial de identidad digital se creó exitosamente
        </Text>
        <Text style={[ui.text, styles.subtitle]}>
          Ya puedes comenzar a usarla para identificarte ante instituciones públicas.
        </Text>
      </Animated.View>

      
      <Animated.View style={[styles.textContainer, { opacity: fadeValue, position: 'absolute', bottom: 16}]}>
        <Button onPress={onComplete||(() => {})} title="Continuar" />
      </Animated.View>

      

    </View>
  );
};

const createStyles = (theme: Theme) => StyleSheet.create({
  iconContainer: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.success || '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: theme.colors.success || '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  checkIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  textContainer: {
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 20,
  },
  title: {
    color: theme.colors.text,
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 32,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
});