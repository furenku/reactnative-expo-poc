import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useBaseStyles } from '@/styles/useBaseStyles';
// import { Text } from '../ui/Text';
import { Text } from '../ui/Text';


export const Test: React.FC = () => {
  const ui = useBaseStyles();
 
  return (
    <View style={[ ui.containerCentered, ui.column, styles.customContainer]}>
      <Text style={[ui.text, ui.bold]}>Test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  customContainer: {
    gap: 8
  }
});