import type { StorybookConfig } from '@storybook/react-native-web-vite';

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../pages/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-onboarding"
  ],
  "framework": {
    "name": "@storybook/react-native-web-vite",
    "options": {}
  }
};
export default config;