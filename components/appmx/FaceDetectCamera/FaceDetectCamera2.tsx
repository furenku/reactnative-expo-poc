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
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [faceDetectionCount, setFaceDetectionCount] = useState(0);
  const [lastFaceDetectionTime, setLastFaceDetectionTime] = useState<Date | null>(null);
  const [faceDetectorStatus, setFaceDetectorStatus] = useState<string>('unknown');
  
  const { theme, styles: baseStyles } = useTheme();

  useEffect(() => {
    (async () => {
      console.log('🚀 Requesting camera permissions...');
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log('📷 Camera permission status:', status);
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Use more conservative positioning - offset from top
  const OVAL_CENTER_X = screenWidth / 2;
  const OVAL_CENTER_Y = screenHeight / 2 - 100; // Move up a bit from center
  const OVAL_RADIUS_X = 100;
  const OVAL_RADIUS_Y = 150;

  // Add this useEffect to test if face detection is enabled
  useEffect(() => {
    console.log('🎬 FaceDetectCamera component mounted');
    console.log('📱 Screen dimensions:', { width: screenWidth, height: screenHeight });
    console.log('⭕ Oval config:', {
      centerX: OVAL_CENTER_X,
      centerY: OVAL_CENTER_Y,
      radiusX: OVAL_RADIUS_X,
      radiusY: OVAL_RADIUS_Y
    });
  }, []);

  // Check what's available in FaceDetector
  useEffect(() => {
    console.log('🤖 Available FaceDetector methods:', Object.keys(FaceDetector));
    console.log('🔧 FaceDetector modes:', FaceDetector.FaceDetectorMode);
    console.log('🏷️ FaceDetector landmarks:', FaceDetector.FaceDetectorLandmarks);
    console.log('🎯 FaceDetector classifications:', FaceDetector.FaceDetectorClassifications);
    setFaceDetectorStatus('initialized');
  }, []);

  // Enhanced logging for face detection state
  useEffect(() => {
    console.log('📊 Face detection stats:', {
      faceInsideOval,
      detectionCount: faceDetectionCount,
      lastDetection: lastFaceDetectionTime?.toLocaleTimeString(),
      detectorStatus: faceDetectorStatus,
      cameraReady: isCameraReady
    });
  }, [faceInsideOval, faceDetectionCount, lastFaceDetectionTime, faceDetectorStatus, isCameraReady]);

  // Add interval to check if face detection is running
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeSinceLastDetection = lastFaceDetectionTime 
        ? now.getTime() - lastFaceDetectionTime.getTime()
        : null;
      
      console.log('⏰ Face detection health check:', {
        totalDetections: faceDetectionCount,
        timeSinceLastDetection: timeSinceLastDetection ? `${timeSinceLastDetection}ms` : 'never',
        isRunning: timeSinceLastDetection ? timeSinceLastDetection < 5000 : false,
        detectorStatus: faceDetectorStatus,
        cameraReady: isCameraReady
      });
      
      if (faceDetectionCount === 0 && isCameraReady) {
        console.warn('⚠️ Camera is ready but no face detection callbacks received yet');
      } else if (timeSinceLastDetection && timeSinceLastDetection > 10000) {
        console.warn('⚠️ Face detection appears to have stopped - no callbacks in 10+ seconds');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [faceDetectionCount, lastFaceDetectionTime, faceDetectorStatus, isCameraReady]);

  const isInsideOval = (x: number, y: number) => {
    return (
      ((x - OVAL_CENTER_X) ** 2) / (OVAL_RADIUS_X ** 2) +
      ((y - OVAL_CENTER_Y) ** 2) / (OVAL_RADIUS_Y ** 2) <=
      1
    );
  };

  const handleFacesDetected = ({ faces }: FaceDetector.FaceDetectionResult) => {
    const now = new Date();
    setFaceDetectionCount(prev => prev + 1);
    setLastFaceDetectionTime(now);
    
    // First detection means face detection is working
    if (faceDetectionCount === 0) {
      console.log('🎉 FIRST FACE DETECTION CALLBACK RECEIVED - Face detection is working!');
      setFaceDetectorStatus('working');
    }
    
    console.log('🔍 Face detection callback triggered:', {
      timestamp: now.toLocaleTimeString(),
      detectionNumber: faceDetectionCount + 1,
      facesFound: faces.length,
      cameraReady: isCameraReady
    });

    if (faces.length > 0) {
      const face = faces[0];
      console.log('👤 Face data:', {
        bounds: face.bounds,
        size: face.bounds.size,
        origin: face.bounds.origin,
        faceID: face.faceID || 'unknown',
        rollAngle: face.rollAngle || 'unknown',
        yawAngle: face.yawAngle || 'unknown'
      });

      const centerX = face.bounds.origin.x + face.bounds.size.width / 2;
      const centerY = face.bounds.origin.y + face.bounds.size.height / 2;
      const insideOval = isInsideOval(centerX, centerY);
      
      console.log('🎯 Face positioning:', {
        faceCenter: { x: centerX, y: centerY },
        ovalCenter: { x: OVAL_CENTER_X, y: OVAL_CENTER_Y },
        isInsideOval: insideOval,
        previousState: faceInsideOval
      });
      
      setFaceInsideOval(insideOval);
    } else {
      console.log('❌ No faces detected in frame');
      setFaceInsideOval(false);
    }
  };

  const handleCameraReady = () => {
    console.log('📸 Camera is ready for face detection');
    setIsCameraReady(true);
    setFaceDetectorStatus('camera-ready');
  };

  const handleMountError = (error: any) => {
    console.error('❌ Camera mount error:', error);
    setFaceDetectorStatus('error');
  };

  // Test face detection with a timeout
  useEffect(() => {
    if (isCameraReady) {
      console.log('⏳ Camera is ready, waiting for face detection callbacks...');
      
      const timeout = setTimeout(() => {
        if (faceDetectionCount === 0) {
          console.error('❌ No face detection callbacks received after 10 seconds. Face detection may not be working.');
          setFaceDetectorStatus('not-working');
        }
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [isCameraReady, faceDetectionCount]);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        console.log('📸 Taking picture...');
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });

        console.log('✅ Picture taken:', photo.uri);
        onPictureTaken(photo.uri);
      } catch (error) {
        console.error('❌ Error taking picture:', error);
      }
    } else {
      console.error('❌ Camera ref not available');
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
      width: theme.spacing.xxl * 2,
      height: theme.spacing.xxl * 2,
      borderRadius: theme.spacing.xxl,
      backgroundColor: theme.colors.captureButton,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 5,
      borderColor: theme.colors.white,
      zIndex: 999,
      position: 'absolute',
      bottom: theme.spacing.xxl + theme.spacing.sm,
    },
    innerButton: {
      width: theme.spacing.xxl + theme.spacing.lg - theme.spacing.xs,
      height: theme.spacing.xxl + theme.spacing.lg - theme.spacing.xs,
      borderRadius: (theme.spacing.xxl + theme.spacing.lg - theme.spacing.xs) / 2,
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
      zIndex: 998,
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
    debugText: {
      position: 'absolute',
      top: 50,
      left: 10,
      right: 10,
      color: theme.colors.white,
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 10,
      fontSize: 12,
      zIndex: 1000,
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
        onCameraReady={handleCameraReady}
        onMountError={handleMountError}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.innerButton} />
          </TouchableOpacity>
        </View>
      </CameraView>
      
      {/* Debug info overlay */}
      <Text style={styles.debugText}>
        FD Status: {faceDetectorStatus} | Detections: {faceDetectionCount} | Camera Ready: {isCameraReady ? 'Yes' : 'No'} | Face Inside: {faceInsideOval ? 'Yes' : 'No'}
        {lastFaceDetectionTime && ` | Last: ${lastFaceDetectionTime.toLocaleTimeString()}`}
      </Text>
      
      <View
        style={[
          styles.oval,
          { borderColor: faceInsideOval ? theme.colors.success : theme.colors.danger },
        ]}
      />
    </View>
  );
};