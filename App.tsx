import React, { useState } from 'react';
import { Login } from './components/Login/Login';
import { MyCamera } from './components/MyCamera/MyCamera';
import { PhotoResult } from './components/PhotoResult/PhotoResult';
import { CameraCapturedPicture } from 'expo-camera';
import { useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

  const handlePictureTaken = (uri: string) => {
    setCapturedPhoto(uri);
  };

  const handleSavePhoto = async () => {
    if (capturedPhoto) {
      try {
        const asset = await MediaLibrary.createAssetAsync(capturedPhoto);
        await MediaLibrary.createAlbumAsync('MyAppPhotos', asset, false);
        console.log('Photo saved to gallery:', asset.uri);
        
        // Reset to camera view after saving
        setCapturedPhoto(null);
      } catch (error) {
        console.error('Error saving photo:', error);
      }
    }
  };

  const handleRetakePhoto = () => {
    setCapturedPhoto(null);
  };

  if (!isLoggedIn) {
    return <Login onSuccess={() => setIsLoggedIn(true)} />;
  }

  if (capturedPhoto) {
    return (
      <PhotoResult
        imageUri={capturedPhoto}
        onRetake={handleRetakePhoto}
        onSave={handleSavePhoto}
      />
    );
  }

  return <MyCamera onPictureTaken={handlePictureTaken} />;
};

export default App;