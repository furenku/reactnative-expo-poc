import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Text } from '@components/appmx/ui/Text';
import Svg, { Path } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

export const Onboarding2: React.FC = () => {
  const { theme, styles: baseStyles } = useTheme();
 
  return (
    <View style={styles.container}>
      {/* Image Section with Curved Bottom */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://picsum.photos/400/500?random=1' }}
          style={styles.image}
          resizeMode="cover"
        />
        
        {/* Curved Mask */}
        <View style={styles.curveMask}>
          <Svg
            height="50"
            width={screenWidth}
            style={styles.svg}
          >
            <Path
              d={`M 0 50 Q ${screenWidth / 2} 0 ${screenWidth} 50 L ${screenWidth} 50 L 0 50 Z`}
              fill={theme.colors.background}
            />
          </Svg>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={[styles.icon]}>
            <Image
              source={require('@/assets/images/onboarding/IMSS-Bienestar-logo.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Title */}
        <Text style={[baseStyles.text, styles.title]}>
          onb2
        </Text>

        {/* Subtitle */}
        <Text style={[baseStyles.text, styles.subtitle]}>
          Comienza a usarla para identificarte ante instituciones públicas.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 0.6,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  curveMask: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
  },
  svg: {
    position: 'absolute',
    bottom: 0,
  },
  contentContainer: {
    flex: 0.4,
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    marginBottom: 24,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 22,
  },
});