export interface DetectedFace {
  id?: string;
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  landmarks?: {
    leftEye?: { x: number; y: number };
    rightEye?: { x: number; y: number };
    nose?: { x: number; y: number };
    mouth?: { x: number; y: number };
  };
  rollAngle?: number;
  yawAngle?: number;
  confidence?: number;
}

export interface FaceDetectorSettings {
  mode?: 'fast' | 'accurate';
  detectLandmarks?: 'all' | 'none';
  runClassifications?: 'all' | 'none';
  minDetectionConfidence?: number;
  tracking?: boolean;
}