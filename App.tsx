import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Login } from './components/Login/Login';
import { MyCamera } from './components/MyCamera/MyCamera';
import { PhotoResult } from './components/PhotoResult/PhotoResult';
import { CameraCapturedPicture } from 'expo-camera';
import { useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { getData } from './utils/storage';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

  // Check login state on app startup
  useEffect(() => {
    checkLoginState();
  }, []);

  const checkLoginState = async () => {
    const loggedInStatus = await getData('isLoggedIn');
    setIsLoggedIn(loggedInStatus || false);
    setIsLoading(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

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

  // Show loading screen while checking login state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!isLoggedIn) {
    return <Login onSuccess={handleLoginSuccess} />;
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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;