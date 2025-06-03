import { useState, useCallback, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { DetectedFace, FaceDetectionConfig, FaceDetectionHookReturn } from '@/types/faceDetection';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');





// Remove these exports as they'll be calculated in the component
// export const OVAL_CENTER_X = screenWidth / 2;
// export const OVAL_CENTER_Y = screenHeight / 2 - 100;
// export const OVAL_RADIUS_X = 300;
// export const OVAL_RADIUS_Y = 450;









export const useFaceDetection = (config: FaceDetectionConfig = {}): FaceDetectionHookReturn => {
  
  const oval = config.oval;

  if( ! oval ) {
    throw new Error( "no oval" )
  }
  
  // console.log("oval", oval);
  

  const [faceInsideOval, setFaceInsideOval] = useState(false);
  const [faceDetectionCount, setFaceDetectionCount] = useState(0);
  const [lastFaceDetectionTime, setLastFaceDetectionTime] = useState<Date | null>(null);
  const [faceDetectorStatus, setFaceDetectorStatus] = useState<string>('initializing');
  const [faceInfo, setFaceInfo] = useState<string>('');

  // Helper function to check if point is inside oval
  const isInsideOval = useCallback((x: number, y: number) => {
    
    return (
      ((x - oval.centerX) ** 2) / (oval.radiusX ** 2) +
      ((y - oval.centerY) ** 2) / (oval.radiusY ** 2) <=
      1
    );
  }, [oval]);

  const handleFacesDetected = useCallback((result: any) => {
    const now = new Date();
    setFaceDetectionCount((prev) => prev + 1);
    setLastFaceDetectionTime(now);
    if (faceDetectionCount === 0) {
      setFaceDetectorStatus('working');
    }
    const faces: DetectedFace[] = result.faces
      ? result.faces.map((face: any) => {
          const scaleX = screenWidth / 1080;
          const scaleY = screenHeight / 1920;
          return {
            id: face.faceID?.toString(),
            bounds: {
              x: face.bounds.origin.x * scaleX,
              y: face.bounds.origin.y * scaleY,
              width: face.bounds.size.width * scaleX,
              height: face.bounds.size.height * scaleY,
            },
            landmarks: face.landmarks
              ? {
                  leftEye: face.landmarks.leftEyePosition,
                  rightEye: face.landmarks.rightEyePosition,
                  nose: face.landmarks.noseBasePosition,
                  mouth: face.landmarks.bottomMouthPosition,
                }
              : undefined,
            rollAngle: face.rollAngle,
            yawAngle: face.yawAngle,
          };
        })
      : [];
    if (faces.length > 0) {
      const face = faces[0];
      const centerX = face.bounds.x + face.bounds.width / 2;
      const centerY = face.bounds.y + face.bounds.height / 2;
      const insideOval = isInsideOval(centerX, centerY);



      
      const ovalInfo = oval 
        ? { x: centerX, y: centerY, centerX: oval.centerX, centerY: oval.centerY, radiusX: oval.radiusX, radiusY: oval.radiusY }
        : { x: centerX, y: centerY, centerX: screenWidth / 2, centerY: screenHeight / 2 - 100, radiusX: 300, radiusY: 450 };
        
      setFaceInfo(JSON.stringify(ovalInfo));
      setFaceInsideOval(insideOval);
    } else {
      setFaceInsideOval(false);
      setFaceInfo('');
    }

  }, [faceDetectionCount, isInsideOval]);
























  return {
    faceInsideOval,
    faceDetectionCount,
    lastFaceDetectionTime,
    faceDetectorStatus,
    setFaceDetectorStatus,
    faceInfo,
    handleFacesDetected,
  };
};