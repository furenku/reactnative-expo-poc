import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, Dimensions } from 'react-native';
import { Camera, CameraType, CameraView } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { useTheme } from '@/context/ThemeContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Props {
  onPictureTaken: (uri: string) => void;
}

export const FaceDetectCamera: React.FC<Props> = ({ onPictureTaken }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [faceInsideOval, setFaceInsideOval] = useState(false);
  
  const { theme, styles: baseStyles } = useTheme();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const OVAL_CENTER_X = screenWidth / 2;
  const OVAL_CENTER_Y = screenHeight / 2;
  const OVAL_RADIUS_X = 100;
  const OVAL_RADIUS_Y = 150;

  const isInsideOval = (x: number, y: number) => {
    return (
      ((x - OVAL_CENTER_X) ** 2) / (OVAL_RADIUS_X ** 2) +
      ((y - OVAL_CENTER_Y) ** 2) / (OVAL_RADIUS_Y ** 2) <=
      1
    );
  };

  const handleFacesDetected = ({ faces }: FaceDetector.FaceDetectionResult) => {
    if (faces.length > 0) {
      const face = faces[0];
      const centerX = face.bounds.origin.x + face.bounds.size.width / 2;
      const centerY = face.bounds.origin.y + face.bounds.size.height / 2;
      setFaceInsideOval(isInsideOval(centerX, centerY));
    } else {
      setFaceInsideOval(false);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });

        onPictureTaken(photo.uri);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    camera: {
      flex: 1,
      width: '100%',
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: theme.spacing.xxl + theme.spacing.sm,
    },
    captureButton: {
      width: theme.spacing.xxl * 2, // 80px (40 * 2)
      height: theme.spacing.xxl * 2, // 80px
      borderRadius: theme.spacing.xxl, // 40px
      backgroundColor: theme.colors.captureButton,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 5,
      borderColor: theme.colors.white,
      zIndex: 999,
      position: 'absolute',
      bottom: theme.spacing.xxl + theme.spacing.sm, // 48px
    },
    innerButton: {
      width: theme.spacing.xxl + theme.spacing.lg - theme.spacing.xs, // 60px (40 + 24 - 4)
      height: theme.spacing.xxl + theme.spacing.lg - theme.spacing.xs, // 60px
      borderRadius: (theme.spacing.xxl + theme.spacing.lg - theme.spacing.xs) / 2, // 30px
      backgroundColor: theme.colors.captureButtonInner,
    },
    oval: {
      position: "absolute",
      top: OVAL_CENTER_Y - OVAL_RADIUS_Y,
      left: OVAL_CENTER_X - OVAL_RADIUS_X,
      width: OVAL_RADIUS_X * 2,
      height: OVAL_RADIUS_Y * 2,
      borderWidth: 4,
      borderRadius: 999,
      borderColor: theme.colors.danger,
    },
    errorText: {
      color: theme.colors.danger,
      fontSize: theme.typography.fontSize.medium,
      textAlign: 'center',
      fontFamily: theme.typography.fonts.regular,
    },
    text: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.medium,
      textAlign: 'center',
      fontFamily: theme.typography.fonts.regular,
    },
  });

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera} 
        facing={facing} 
        ref={cameraRef}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.innerButton} />
          </TouchableOpacity>
        </View>
      </CameraView>
      <View
        style={[
          styles.oval,
          { borderColor: faceInsideOval ? theme.colors.success : theme.colors.danger },
        ]}
      />
    </View>
  );
};