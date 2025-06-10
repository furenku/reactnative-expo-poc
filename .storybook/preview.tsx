import React from 'react';
import type { Preview } from '@storybook/react-native-web-vite'

import { ThemeProvider } from "../context/ThemeContext"
import { Dimensions, SafeAreaView, View } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';


const preview: Preview = {
  decorators: [
    (Story) => {
      const { width, height } = Dimensions.get('window');

      return (
      <ThemeProvider>
        <SafeAreaProvider>
          <View style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width,
            height, 
            padding: 0
          }}>
            <Story />
          </View>
        </SafeAreaProvider>
      </ThemeProvider>
    )},
  ],
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;