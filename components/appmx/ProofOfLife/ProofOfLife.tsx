import React from 'react';
import { StyleSheet, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useBaseStyles } from '@/styles/useBaseStyles';
import { Text } from '../ui/Text';
import Svg, { Rect, Ellipse, Mask, Defs } from 'react-native-svg';
import { TestCamera } from '../TestCameraFlow/TestCamera/TestCamera';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ProofOfLifeProps {
  onComplete: () => void;
}
export const ProofOfLife: React.FC<ProofOfLifeProps> = ({ onComplete }) => {
  const ui = useBaseStyles();

  const handlePictureTaken = (uri: string) => {
            console.log('Picture taken:', uri);
    // Process the image and then call onComplete
    onComplete();
};

  return (
    <TouchableOpacity style={[ui.container, styles.container]} onPress={onComplete}>
        
      <View style={[StyleSheet.absoluteFillObject, {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }]}>
        <TestCamera onPictureTaken={handlePictureTaken} />
      </View>

      <View style={[ui.container, {
        backgroundColor: 'transparent'
      } ]}>
        {/* SVG overlay with oval cutout */}
        <Svg style={[ {
            width: '100%',
            height: '100%',
            // position: 'absolute',
            // top: 0,
            // left: 0,
        }]}>
            <Defs>
            <Mask id="mask">
                {/* White background means visible */}
                <Rect x="0" y="0" width="100%" height="100%" fill="white" />
                {/* Black oval means transparent cutout */}
                <Ellipse
                cx={375 / 2}
                cy={812 * 2/5}
                rx={375 / 3}
                ry={812 / 5}
                fill="black"
                />
            </Mask>
            </Defs>
            {/* Semi-transparent background with clipped oval */}
            <Rect
                x="0"
                y="0"
                width='100%'
                height='100%'
                fill="#161a1daa" // Semi-transparent black
                mask="url(#mask)"
                
            />
        </Svg>

        {/* Oval border outline */}
        <Svg height='100%' width='100%' style={StyleSheet.absoluteFillObject}>
            <Ellipse
            cx={375 / 2}
            cy={812 * 2/5}
            rx={375 / 3}
            ry={812 / 5}
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeDasharray="10,5"
            />
        </Svg>
      </View>

      <TouchableOpacity style={styles.instructionContainer}>
        <Text style={[ui.text, ui.bold, styles.instructionText]}>
          Ubica tu rostro y{'\n'}toca para continuar
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  instructionContainer: {
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    zIndex: 2,
  },
  instructionText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});