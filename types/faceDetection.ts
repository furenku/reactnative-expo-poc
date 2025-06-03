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

export interface FaceDetectionConfig {
  minDetectionInterval?: number;
  oval?: {
    centerX: number;
    centerY: number;
    radiusX: number;
    radiusY: number;
  };
}

export interface FaceDetectionHookReturn {
  faceInsideOval: boolean;
  faceDetectionCount: number;
  lastFaceDetectionTime: Date | null;
  faceDetectorStatus: string;
  setFaceDetectorStatus: (status: string) => void;
  faceInfo: string;
  handleFacesDetected: (result: any) => void;
  detectedFaces: DetectedFace[];
}

