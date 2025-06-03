import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Camera, CameraType, CameraView } from 'expo-camera';
import { useTheme } from '@/context/ThemeContext';

interface Props {
  onPictureTaken: (uri: string) => void;
}

export const TestCamera: React.FC<Props> = ({ onPictureTaken }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  
  const { theme, styles: baseStyles } = useTheme();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

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
      >
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.innerButton} />
          </TouchableOpacity>
        </View> */}
      </CameraView>
    </View>
  );
};