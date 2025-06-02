import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, Dimensions } from 'react-native';
import { Camera, CameraType, CameraView } from 'expo-camera';
import { useTheme } from '@/context/ThemeContext';
import { faceDetection } from '@/services/faceDetection';
import { DetectedFace } from '@/types/faceDetection';
import { isMobile } from '@/utils/platform';
import { nativeFaceDetection } from '@/services/faceDetection/mobile';



const version = '0.0.11'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Props {
  onPictureTaken: (uri: string) => void;
}

export const FaceDetectCamera: React.FC<Props> = ({ onPictureTaken }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>('front');
  const [faceInsideOval, setFaceInsideOval] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [faceDetectionCount, setFaceDetectionCount] = useState(0);
  const [lastFaceDetectionTime, setLastFaceDetectionTime] = useState<Date | null>(null);
  const [faceDetectorStatus, setFaceDetectorStatus] = useState<string>('initializing');
  const [faceInfo, setFaceInfo] = useState<string>('');
  
  const { theme } = useTheme();

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

  // ... existing useEffects for permissions and debugging ...
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
  const OVAL_RADIUS_X = 300;
  const OVAL_RADIUS_Y = 450;

  const isInsideOval = (x: number, y: number) => {
    
    setFaceInfo( JSON.stringify({x, y, OVAL_CENTER_X, OVAL_CENTER_Y, OVAL_RADIUS_X, OVAL_RADIUS_Y}));
    
    return (
      ((x - OVAL_CENTER_X) ** 2) / (OVAL_RADIUS_X ** 2) +
      ((y - OVAL_CENTER_Y) ** 2) / (OVAL_RADIUS_Y ** 2) <=
      1
    );
  };

  // Updated face detection handler using unified service
  
  const handleFacesDetected = (result: any) => {
    const now = new Date();
    setFaceDetectionCount(prev => prev + 1);
    setLastFaceDetectionTime(now);
    
    if (faceDetectionCount === 0) {
      console.log('🎉 FIRST FACE DETECTION CALLBACK RECEIVED - Face detection is working!');
      setFaceDetectorStatus('working');
    }

    
    // Process faces from expo-face-detector
    const faces: DetectedFace[] = result.faces ? result.faces.map((face: any) => {
      // Transform coordinates from camera space to screen space
      const scaleX = screenWidth / 1080; // Adjust based on your camera resolution
      const scaleY = screenHeight / 1920; // Adjust based on your camera resolution
      
      return {
        id: face.faceID?.toString(),
        bounds: {
          x: face.bounds.origin.x * scaleX,
          y: face.bounds.origin.y * scaleY,
          width: face.bounds.size.width * scaleX,
          height: face.bounds.size.height * scaleY,
        },
        landmarks: face.landmarks ? {
          leftEye: face.landmarks.leftEyePosition,
          rightEye: face.landmarks.rightEyePosition,
          nose: face.landmarks.noseBasePosition,
          mouth: face.landmarks.bottomMouthPosition,
        } : undefined,
        rollAngle: face.rollAngle,
        yawAngle: face.yawAngle,
      }
    }) : [];

    console.log('🔍 Transformed face detection:', {
      timestamp: now.toLocaleTimeString(),
      detectionNumber: faceDetectionCount + 1,
      facesFound: faces.length,
      screenDimensions: { width: screenWidth, height: screenHeight },
      ovalCenter: { x: OVAL_CENTER_X, y: OVAL_CENTER_Y },
    });

    if (faces.length > 0) {
      const face = faces[0];
      const centerX = face.bounds.x + face.bounds.width / 2;
      const centerY = face.bounds.y + face.bounds.height / 2;
      const insideOval = isInsideOval(centerX, centerY);
      
      console.log('🎯 Face positioning:', {
        originalBounds: result.faces[0].bounds,
        transformedBounds: face.bounds,
        faceCenter: { x: centerX, y: centerY },
        ovalCenter: { x: OVAL_CENTER_X, y: OVAL_CENTER_Y },
        isInsideOval: insideOval,
      });
      
      setFaceInsideOval(insideOval);
    } else {
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

  // ... existing debugging useEffects ...

  const [isProcessing, setIsProcessing] = useState(false);

  // Remove the faceDetection service initialization since we'll use expo-face-detector directly

  // Function to capture and analyze frame for face detection
  const analyzeFrame = async () => {
    if (!cameraRef.current || isProcessing) return;

    try {
      setIsProcessing(true);
      
      // Take a picture for analysis (lower quality for performance)
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8, // Lower quality for faster processing
        base64: false,
        skipProcessing: true,
        imageType: 'jpg',
        exif: false,
        shutterSound: false,
        // fastMode: true,

      });

      // Analyze the image for faces
      const faces = await nativeFaceDetection.detectFromImage(photo.uri);


      // Process the results
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
        console.log('📸 Taking picture...');
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });

        console.log('✅ Picture taken:', photo.uri);
        
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

  // ... existing styles ...
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
        onCameraReady={handleCameraReady}
        // Disable camera sound if available
        enableTorch={false}
        autofocus={'on'}
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
        { faceInfo }
      </Text>
      
      <View
          style={[
            styles.oval,
          { borderColor: faceInsideOval ? theme.colors.success : theme.colors.danger },
        ]}
      />
      <View>
        <Text>
        </Text>
      </View>
    </View>
  );
};


