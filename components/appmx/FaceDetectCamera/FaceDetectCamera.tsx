import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, Dimensions, UIManager, findNodeHandle, Platform, LayoutChangeEvent } from 'react-native';
import { Camera, CameraType, CameraView } from 'expo-camera';
import { useTheme } from '@/context/ThemeContext';
import { faceDetection } from '@/services/faceDetection';
import { DetectedFace } from '@/types/faceDetection';
import { isMobile } from '@/utils/platform';
import { nativeFaceDetection } from '@/services/faceDetection/mobile';
import { FaceOval } from './FaceOval';
import { useFaceDetection } from './useFaceDetection';

import { } from 'expo-face-detector'

const version = '0.0.11'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Props {
  onPictureTaken: (uri: string) => void;
}





export const FaceDetectCamera: React.FC<Props> = ({ onPictureTaken }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const containerRef = useRef<View>(null);
  const [facing, setFacing] = useState<CameraType>('front');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { theme } = useTheme();

  
  
  const [containerSize, setContainerSize] = useState({ 
    width: screenWidth,
    height: screenHeight,
  });
  
  // Native layout (iOS/Android)
  const handleLayout = (event: LayoutChangeEvent) => {
    if (Platform.OS !== 'web') {
      const { width, height } = event.nativeEvent.layout;
      setContainerSize({ width, height });
    }
  };

  // Web layout using ResizeObserver
  useEffect(() => {
    if (Platform.OS === 'web' && containerRef.current) {
      const el = containerRef.current as unknown as HTMLElement;


      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          setContainerSize({ width, height });
        }
      });

      observer.observe(el);

      return () => {
        observer.disconnect();
      };
    }
  }, [containerRef.current]);




  // Calculate ovals based on container size
  const OVAL_CENTER_X = containerSize.width / 2;
  const OVAL_CENTER_Y = containerSize.height * 1/3;
  const OVAL_RADIUS_X = containerSize.width * 0.33;
  const OVAL_RADIUS_Y = containerSize.height * 0.22;

  // console.log(
  //   "oval!!", OVAL_CENTER_X, OVAL_CENTER_Y, OVAL_RADIUS_X, OVAL_RADIUS_Y, containerSize
  // );
  

  // Use custom face detection hook
  const {
    faceInsideOval,
    faceDetectionCount,
    lastFaceDetectionTime,
    faceDetectorStatus,
    setFaceDetectorStatus,
    faceInfo,
    handleFacesDetected,
  } = useFaceDetection({
    oval: {
      centerX: OVAL_CENTER_X,
      centerY: OVAL_CENTER_Y,
      radiusX: OVAL_RADIUS_X,
      radiusY: OVAL_RADIUS_Y,
    },
  });

  console.log("faceInfo", faceInfo)

  // Initialize face detection service
  useEffect(() => {
    const initializeFaceDetection = async () => {
      try {
        await faceDetection.initialize();
        setFaceDetectorStatus('initialized');
        console.log('✅ Face detection service initialized');
      } catch (error) {
        console.error('❌ Failed to initialize face detection:', error);
        setFaceDetectorStatus('error');
      }
    };

    initializeFaceDetection();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraReady = () => {
    setIsCameraReady(true);
    setFaceDetectorStatus('camera-ready');
  };

  const handleMountError = (error: any) => {
    console.error('❌ Camera mount error:', error);
    setFaceDetectorStatus('error');
  };

  // Function to capture and analyze frame for face detection
  const analyzeFrame = async () => {
    if (!cameraRef.current || isProcessing) return;

    try {
      setIsProcessing(true);
      
      // Take a picture for analysis (lower quality for performance)
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
        skipProcessing: true,
        imageType: 'jpg',
        exif: false,
        shutterSound: false
      });

      // Analyze the image for faces
      const faces = await nativeFaceDetection.detectFromImage(photo.uri);

      // Use unified detection handler
      handleFacesDetected({ faces });
    } catch (error) {
      console.error('Face detection error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (!isCameraReady) return;

    const interval = setInterval(() => {
      analyzeFrame();
    }, 1000); // Reduce frequency to every 1000ms to be less intrusive

    return () => clearInterval(interval);
  }, [isCameraReady, isProcessing]);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });

        // Optionally run face detection on the captured photo
        if (faceDetectorStatus === 'working') {
          try {
            const detectedFaces = await faceDetection.detectFromImage(photo.uri);
            console.log('📸 Faces detected in photo:', detectedFaces.length);
          } catch (error) {
            console.warn('⚠️ Could not detect faces in captured photo:', error);
          }
        }
        
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
      // Add minimum dimensions to ensure layout is triggered
      minWidth: 100,
      minHeight: 100,
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
    
    <View
      style={[styles.container, { backgroundColor: 'rgba(255,0,0,0.1)' }]} // Add debug background
      ref={containerRef}
      onLayout={handleLayout}
    >
      
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
        onCameraReady={handleCameraReady}
        enableTorch={false}
        autofocus={'on'}
        onLayout={e => {
          console.log("📹 Camera onLayout triggered!");
          const { width, height } = e.nativeEvent.layout;
          console.log("📏 Camera dimensions:", width, height);
        }}
        flash='off'
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.innerButton} />
          </TouchableOpacity>
        </View>
      </CameraView>

      {/* Debug info overlay */}
      <Text style={styles.debugText}>
        v{version} - FD Status: {faceDetectorStatus} | Detections: {faceDetectionCount} | Camera Ready: {isCameraReady ? 'Yes' : 'No'} | Face Inside: {faceInsideOval ? 'Yes' : 'No'}
        {lastFaceDetectionTime && ` | Last: ${lastFaceDetectionTime.toLocaleTimeString()}`}
        Faces: {JSON.stringify(faceInfo)}
      </Text>

      <FaceOval
        faceInsideOval={faceInsideOval}
        OVAL_CENTER_X={OVAL_CENTER_X}
        OVAL_CENTER_Y={OVAL_CENTER_Y}
        OVAL_RADIUS_X={OVAL_RADIUS_X}
        OVAL_RADIUS_Y={OVAL_RADIUS_Y}
      />

      <View>
        <Text>
        </Text>
      </View>
    </View>
  );
};

