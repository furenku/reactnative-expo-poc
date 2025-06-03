import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { useBaseStyles } from '@/styles/useBaseStyles';
import { Theme } from '@/types/theme';
import { useTheme } from '@/context/ThemeContext';
import { Text } from '@/components/ui/Text';

interface ProcessingProps {
  onComplete?: () => void;
}

export const Processing: React.FC<ProcessingProps> = ({ onComplete }) => {
  const ui = useBaseStyles();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const spinValue = useRef(new Animated.Value(0)).current;


  setTimeout(() => {
    onComplete && onComplete()
  }, 3000);

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => spin());
    };

    spin();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[ui.container, ui.containerCentered]}>
      <View style={styles.spinnerContainer}>
        <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]}>
          {Array.from({ length: 12 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  transform: [
                    { rotate: `${index * 30}deg` },
                    { translateY: -20 },
                  ],
                  opacity: 1 - (index * 0.08),
                },
              ]}
            />
          ))}
        </Animated.View>
      </View>

      <View style={styles.textContainer}>
        <Text style={[ui.text, ui.semiBold, styles.title]}>
          Validación en proceso
        </Text>
        <Text style={[ui.text, styles.subtitle]}>
          Esto tomará solo unos segundos
        </Text>
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) => StyleSheet.create({
  spinnerContainer: {
    marginBottom: 40,
  },
  spinner: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.text,
  },
  textContainer: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: theme.colors.text,
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});