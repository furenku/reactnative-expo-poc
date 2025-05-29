import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useBaseStyles } from '@/styles/useBaseStyles';
import { Splash } from './Splash/Splash';


export const App: React.FC = () => {
  const ui = useBaseStyles();
 
  return (
    <View style={[ ui.containerCentered, ui.column, styles.customContainer]}>
      <Splash/>
    </View>
  );
};

const styles = StyleSheet.create({
  customContainer: {
    gap: 8
  }
});