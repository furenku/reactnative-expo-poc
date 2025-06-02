import { DetectedFace, FaceDetectionConfig } from '@/types/faceDetection';

export class MockFaceDetection {
  private config: FaceDetectionConfig;

  constructor(config: FaceDetectionConfig = {}) {
    this.config = config;
  }

  async detectFromImage(imageUri: string): Promise<DetectedFace[]> {
    // Return mock face data for testing
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate processing time
    
    return [
      {
        id: 'mock-face-1',
        bounds: {
          x: 100,
          y: 150,
          width: 200,
          height: 250,
        },
        landmarks: {
          leftEye: { x: 150, y: 200 },
          rightEye: { x: 250, y: 200 },
          nose: { x: 200, y: 250 },
          mouth: { x: 200, y: 300 },
        },
        confidence: 0.95,
      },
    ];
  }

  async detectFromVideoElement(video: HTMLVideoElement): Promise<DetectedFace[]> {
    return this.detectFromImage('mock://video-frame');
  }
}