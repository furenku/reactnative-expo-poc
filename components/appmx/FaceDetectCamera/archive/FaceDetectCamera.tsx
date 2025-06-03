import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, LayoutChangeEvent } from "react-native";
import { Camera, CameraView, CameraType } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { useTheme } from '@/context/ThemeContext';
import { useBaseStyles } from '@/styles/useBaseStyles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export function FaceDetectCamera() {
  const cameraRef = useRef<CameraView | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [faceInsideOval, setFaceInsideOval] = useState(false);
  const [facing, setFacing] = useState<CameraType>('front');
  
  const { theme } = useTheme();
  const baseStyles = useBaseStyles();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    camera: {
      flex: 1,
      width: '100%',
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
    text: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.medium,
      textAlign: 'center',
      fontFamily: theme.typography.fonts.regular,
    },
    permissionContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  if (hasPermission === null) {
    return (
      <View style={[styles.container, styles.permissionContainer]}>
        <Text style={styles.text}>Requesting permissions...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={[styles.container, styles.permissionContainer]}>
        <Text style={styles.text}>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
        }}
      />
      <View
        style={[
          styles.oval,
          { borderColor: faceInsideOval ? theme.colors.success : theme.colors.danger },
        ]}
      />
    </View>
  );
}