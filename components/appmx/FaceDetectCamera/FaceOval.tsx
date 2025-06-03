import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface FaceOvalProps {
  faceInsideOval: boolean;
  OVAL_CENTER_X: number;
  OVAL_CENTER_Y: number;
  OVAL_RADIUS_X: number;
  OVAL_RADIUS_Y: number;
}

export const FaceOval: React.FC<FaceOvalProps> = ({
  faceInsideOval,
  OVAL_CENTER_X,
  OVAL_CENTER_Y,
  OVAL_RADIUS_X,
  OVAL_RADIUS_Y,
}) => {
  const { theme } = useTheme();
  const ovalStyles = StyleSheet.create({
    oval: {
      position: 'absolute',
      top: OVAL_CENTER_Y - OVAL_RADIUS_Y,
      left: OVAL_CENTER_X - OVAL_RADIUS_X,
      width: OVAL_RADIUS_X * 2,
      height: OVAL_RADIUS_Y * 2,
      borderWidth: 4,
      borderRadius: 999,
      borderColor: faceInsideOval ? theme.colors.success : theme.colors.danger,
      zIndex: 998,
    },
  });
  return <View style={ovalStyles.oval} testID="face-oval" />;
};
