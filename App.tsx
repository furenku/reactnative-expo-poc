import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Login } from './components/Login/Login';
import { MyCamera, TestCamera } from './components/appmx/TestCameraFlow/TestCamera/TestCamera';
import { PhotoResult } from './components/PhotoResult/PhotoResult';
import { CameraCapturedPicture } from 'expo-camera';
import { useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { getData } from './utils/storage';
import { useFontsHook } from './theme/theme';
import { App as Appmx } from './components/appmx/App';
import { ThemeProvider } from '@/context/ThemeContext';
import { FaceDetectCamera } from './components/appmx/FaceDetectCamera/FaceDetectCamera2';


const App: React.FC = () => {

  return <FaceDetectCamera onPictureTaken={() => {}}/>

  // return <TestCamera onPictureTaken={() => {}}/>
  // return <Appmx />
};

export default App;