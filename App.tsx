import React, { useState } from 'react';
import { Login } from './components/Login/Login';
import { MyCamera } from './components/MyCamera/MyCamera';
import { CameraCapturedPicture } from 'expo-camera';
import { useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

  if (isLoggedIn) {
    return (
      <MyCamera onPictureTaken={async (uri: string) => {

        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('MyAppPhotos', asset, false);
  
        console.log('Photo saved to gallery:', asset.uri); 
      }} />
    );
  }

  return <Login onSuccess={() => setIsLoggedIn(true)} />;
};

export default App;