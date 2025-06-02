import { DetectedFace } from '@/types/faceDetection';
import { isMobile } from '@/utils/platform';

class FaceDetectionService {
  private isInitialized = false;
  private webModel: any = null;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      if (!isMobile) {
        // Web implementation - you can add face-api.js or MediaPipe here
        await this.initializeWebDetection();
      }
      // Mobile uses expo-face-detector, no pre-initialization needed
      
      this.isInitialized = true;
      console.log('✅ Face detection service initialized');
    } catch (error) {
      console.error('❌ Failed to initialize face detection:', error);
      throw error;
    }
  }

  private async initializeWebDetection(): Promise<void> {
    // For web, you would initialize face-api.js or MediaPipe here
    // This is a placeholder for now
    console.log('🌐 Web face detection initialized');
  }

  getMobileDetectorSettings() {
    if (!isMobile) return undefined;
    
    return {
      mode: 'fast',
      detectLandmarks: 'all',
      runClassifications: 'none',
      minDetectionConfidence: 0.5,
      tracking: true,
    };
  }

  async detectFromImage(imageUri: string): Promise<DetectedFace[]> {
    if (!this.isInitialized) {
      throw new Error('Face detection service not initialized');
    }

    if (isMobile) {
      // For mobile, you'd need to use a different approach
      // This is typically done through the camera's onFacesDetected
      console.log('📱 Mobile image detection not implemented yet');
      return [];
    } else {
      // Web implementation would go here
      console.log('🌐 Web image detection not implemented yet');
      return [];
    }
  }

  isReady(): boolean {
    return this.isInitialized;
  }
}

export const faceDetection = new FaceDetectionService();