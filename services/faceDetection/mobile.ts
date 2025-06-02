import * as FaceDetector from 'expo-face-detector';
import { DetectedFace, FaceDetectionResult, FaceDetectionConfig } from '@/types/faceDetection';

export class MobileFaceDetection {

  private isInitialized = false;
  private isAvailable = false;


  
  private config: FaceDetectionConfig;

  constructor(config: FaceDetectionConfig = {}) {
    this.config = {
      mode: 'fast',
      maxFaces: 1,
      minDetectionInterval: 100,
      tracking: true,
      ...config
    };
    
  }

  async initialize(): Promise<void> {
    try {
      // Check if face detector is available
      if (!FaceDetector) {
        throw new Error('expo-face-detector is not available');
      }
      
      // Test if the native module is properly linked
      if (!FaceDetector.Constants) {
        throw new Error('expo-face-detector native module not found');
      }
      
      this.isAvailable = true;
      this.isInitialized = true;
      console.log('✅ Mobile face detection initialized successfully');
    } catch (error) {
      this.isAvailable = false;
      this.isInitialized = false;
      console.error('❌ Mobile face detection not available:', error);
      throw error;
    }
  }


  getDetectorSettings(): FaceDetector.FaceDetectorSettings {
    return {
      mode: this.config.mode === 'fast' 
        ? FaceDetector.FaceDetectorMode.fast 
        : FaceDetector.FaceDetectorMode.accurate,
      detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
      runClassifications: FaceDetector.FaceDetectorClassifications.all,
      minDetectionInterval: this.config.minDetectionInterval || 100,
      tracking: this.config.tracking || true,
    };
  }

  convertFaceDetectionResult(result: FaceDetector.FaceDetectionResult): FaceDetectionResult {
    const faces: DetectedFace[] = result.faces.map(face => ({
      id: face.faceID?.toString(),
      bounds: {
        x: face.bounds.origin.x,
        y: face.bounds.origin.y,
        width: face.bounds.size.width,
        height: face.bounds.size.height,
      },
      landmarks: face.landmarks ? {
        leftEye: face.landmarks.leftEyePosition,
        rightEye: face.landmarks.rightEyePosition,
        nose: face.landmarks.noseBasePosition,
        mouth: face.landmarks.bottomMouthPosition,
        ...face.landmarks
      } : undefined,
      rollAngle: face.rollAngle,
      yawAngle: face.yawAngle,
    }));

    return {
      faces: faces.slice(0, this.config.maxFaces || faces.length),
      imageWidth: result.image?.width,
      imageHeight: result.image?.height,
    };
  }

  async detectFromImage(imageUri: string): Promise<DetectedFace[]> {
    try {
      const result = await FaceDetector.detectFacesAsync(imageUri, this.getDetectorSettings());
      return this.convertFaceDetectionResult(result).faces;
    } catch (error) {
      console.error('Mobile face detection error:', error);
      return [];
    }
  }

  getMobileDetectorSettings() {
    if (!this.isAvailable) {
      return undefined;
    }
    
    return {
      mode: FaceDetector.FaceDetectorMode.accurate,
      detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
      runClassifications: FaceDetector.FaceDetectorClassifications.all,
      minDetectionInterval: 100,
      tracking: true,
    };
  }

  
}

export const nativeFaceDetection = new MobileFaceDetection();
