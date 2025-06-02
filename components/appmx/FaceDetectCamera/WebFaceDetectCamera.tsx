import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useFaceDetection } from '@/hooks/useFaceDetection';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Props {
  onPictureTaken: (uri: string) => void;
}

export const WebFaceDetectCamera: React.FC<Props> = ({ onPictureTaken }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const { theme } = useTheme();
  const { faces, isDetecting, error, start, stop } = useFaceDetection({
    mode: 'fast',
    maxFaces: 1,
    minConfidence: 0.5,
    minDetectionInterval: 100,
  });

  // Position for face detection oval
  const OVAL_CENTER_X = screenWidth / 2;
  const OVAL_CENTER_Y = screenHeight / 2 - 100;
  const OVAL_RADIUS_X = 100;
  const OVAL_RADIUS_Y = 150;

  const isInsideOval = (x: number, y: number) => {
    return (
      ((x - OVAL_CENTER_X) ** 2) / (OVAL_RADIUS_X ** 2) +
      ((y - OVAL_CENTER_Y) ** 2) / (OVAL_RADIUS_Y ** 2) <=
      1
    );
  };

  // Check if any face is inside the oval
  const faceInsideOval = faces.some(face => {
    const centerX = face.bounds.x + face.bounds.width / 2;
    const centerY = face.bounds.y + face.bounds.height / 2;
    return isInsideOval(centerX, centerY);
  });

  // Initialize camera
  useEffect(() => {
    const initCamera = async () => {
      try {
        console.log('🎥 Requesting camera access...');
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user' // Front camera
          }
        });

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setIsCameraReady(true);
            console.log('✅ Camera ready');
          };
        }

        setStream(mediaStream);
        setHasPermission(true);
      } catch (error) {
        console.error('❌ Camera access denied:', error);
        setHasPermission(false);
      }
    };

    initCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Start face detection when camera is ready
  useEffect(() => {
    if (isCameraReady && !isDetecting) {
      start();
    }

    return () => {
      if (isDetecting) {
        stop();
      }
    };
  }, [isCameraReady, start, stop, isDetecting]);

  const takePicture = async () => {
    if (!videoRef.current || !canvasRef.current) {
      console.error('❌ Video or canvas ref not available');
      return;
    }

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw current video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to blob and create URL
      return new Promise<void>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const uri = URL.createObjectURL(blob);
            console.log('✅ Picture captured:', uri);
            onPictureTaken(uri);
          }
          resolve();
        }, 'image/jpeg', 0.8);
      });
    } catch (error) {
      console.error('❌ Error taking picture:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    videoContainer: {
      flex: 1,
      width: '100%',
      height: '100%',
      position: 'relative',
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    captureButton: {
      position: 'absolute',
      bottom: theme.spacing.xxl + theme.spacing.sm,
      left: '50%',
      transform: 'translateX(-50%)',
      width: theme.spacing.xxl * 2,
      height: theme.spacing.xxl * 2,
      borderRadius: theme.spacing.xxl,
      backgroundColor: theme.colors.captureButton,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 5,
      borderColor: theme.colors.white,
      zIndex: 999,
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
      borderColor: faceInsideOval ? theme.colors.success : theme.colors.danger,
      zIndex: 998,
      pointerEvents: 'none',
    },
    debugText: {
      position: 'absolute',
      top: 50,
      left: 10,
      right: 10,
      color: theme.colors.white,
      backgroundColor: 'rgba(0,0,0,0.7)',
      padding: 10,
      fontSize: 12,
      zIndex: 1000,
      borderRadius: 8,
      pointerEvents: 'none',
    },
    errorText: {
      color: theme.colors.danger,
      fontSize: theme.typography.fontSize.medium,
      textAlign: 'center',
      fontFamily: theme.typography.fonts.regular,
      padding: theme.spacing.lg,
    },
    text: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.medium,
      textAlign: 'center',
      fontFamily: theme.typography.fonts.regular,
    },
    hiddenCanvas: {
      position: 'absolute',
      top: -9999,
      left: -9999,
      // visibility: 'hidden',
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
        <Text style={styles.errorText}>
          Camera access denied. Please allow camera permissions and reload the page.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <video
          ref={videoRef}
          style={styles.video}
          autoPlay
          playsInline
          muted
        />
        
        {/* Debug info overlay */}
        <Text style={styles.debugText}>
          Camera: {isCameraReady ? 'Ready' : 'Loading'} | 
          Detection: {isDetecting ? 'Active' : 'Stopped'} | 
          Faces: {faces.length} | 
          Face Inside: {faceInsideOval ? 'Yes' : 'No'}
          {error && ` | Error: ${error}`}
        </Text>

        {/* Face detection oval */}
        <View style={styles.oval} />

        {/* Capture button */}
        <TouchableOpacity 
          style={styles.captureButton} 
          onPress={takePicture}
          disabled={!isCameraReady}
        >
          <View style={styles.innerButton} />
        </TouchableOpacity>

        {/* Hidden canvas for capturing photos */}
        <canvas
          ref={canvasRef}
          style={styles.hiddenCanvas}
        />
      </View>
    </View>
  );
};