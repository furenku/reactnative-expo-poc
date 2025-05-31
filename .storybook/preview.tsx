import React from 'react';
import type { Preview } from '@storybook/react-native-web-vite'

import { ThemeProvider } from "../context/ThemeContext"

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;