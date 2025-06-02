import { useState, useEffect, useCallback, useRef } from 'react';
import { DetectedFace, FaceDetectionConfig, FaceDetectionHookReturn } from '@/types/faceDetection';
import { FaceDetectionService } from '@/services/faceDetection';

export const useFaceDetection = (config: FaceDetectionConfig = {}): FaceDetectionHookReturn => {
  const [faces, setFaces] = useState<DetectedFace[]>([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useRef<FaceDetectionService>();
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    serviceRef.current = new FaceDetectionService(config);
    serviceRef.current.initialize().catch(err => {
      setError(`Failed to initialize face detection: ${err.message}`);
    });

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const start = useCallback(() => {
    if (isDetecting || !serviceRef.current) return;
    
    setIsDetecting(true);
    setError(null);
    
    // For web, start continuous detection from video element
    if (typeof window !== 'undefined' && window.document) {
      const videoElement = document.querySelector('video') as HTMLVideoElement;
      if (videoElement) {
        intervalRef.current = setInterval(async () => {
          try {
            const detectedFaces = await serviceRef.current!.detectFromVideoElement(videoElement);
            setFaces(detectedFaces);
          } catch (err: any) {
            setError(err.message);
            setIsDetecting(false);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
          }
        }, config.minDetectionInterval || 100);
      }
    }
  }, [isDetecting, config.minDetectionInterval]);

  const stop = useCallback(() => {
    setIsDetecting(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
    setFaces([]);
  }, []);

  const detectFromImage = useCallback(async (imageUri: string): Promise<DetectedFace[]> => {
    if (!serviceRef.current) {
      throw new Error('Face detection service not initialized');
    }

    try {
      setError(null);
      const detectedFaces = await serviceRef.current.detectFromImage(imageUri);
      return detectedFaces;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    faces,
    isDetecting,
    error,
    start,
    stop,
    detectFromImage,
  };
};