import React from 'react';
import type { Preview } from '@storybook/react-native-web-vite'

import { ThemeProvider } from "../context/ThemeContext"
import { View } from 'react-native';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={{ width: 375, height: 812,  backgroundColor: '#000',  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;