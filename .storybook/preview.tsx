import React from 'react';
import type { Preview } from '@storybook/react-native-web-vite'

import { ThemeProvider } from "../context/ThemeContext"
import { Dimensions, SafeAreaView, View } from 'react-native';

const preview: Preview = {
  decorators: [
    (Story) => {
      const { width, height } = Dimensions.get('window');

      return (
      <ThemeProvider>
        <SafeAreaView style={{ 
          display: 'flex',
          width,
          height, 
          backgroundColor: '#a00',
          padding: 0
        }}>
          <Story />
        </SafeAreaView>
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