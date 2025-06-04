import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MyCamera } from './TestCamera/TestCamera';
import { PhotoPreview } from './PhotoPreview/PhotoPreview';
import { CredentialCard } from '../Credential/CredentialCard/CredentialCard';

type FlowStep = 'camera' | 'preview' | 'credential';

export const TestCameraFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('camera');
  const [capturedPhotoUri, setCapturedPhotoUri] = useState<string>('');

  const handlePictureTaken = (uri: string) => {
    setCapturedPhotoUri(uri);
    setCurrentStep('preview');
  };

  const handlePhotoAccepted = () => {
    setCurrentStep('credential');
  };

  const handleRetakePhoto = () => {
    setCurrentStep('camera');
    setCapturedPhotoUri('');
  };

  const handleDone = () => {
    setCurrentStep('camera');
    setCapturedPhotoUri('');
  };

  return (
    <View style={styles.container}>
      {currentStep === 'camera' && (
        <MyCamera onPictureTaken={handlePictureTaken} />
      )}
      
      {currentStep === 'preview' && (
        <PhotoPreview
          photoUri={capturedPhotoUri}
          onAccept={handlePhotoAccepted}
          onRetake={handleRetakePhoto}
        />
      )}
      
      {currentStep === 'credential' && (
        <CredentialCard
          photoUri={capturedPhotoUri}
          onDone={handleDone}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});