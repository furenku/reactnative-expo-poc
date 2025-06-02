import { Platform } from 'react-native';

export const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('storybook');

export const PlatformType = {
  WEB: 'web',
  MOBILE: 'mobile',
  STORYBOOK: 'storybook'
} as const;

export const getCurrentPlatform = () => {
  if (isStorybook) return PlatformType.STORYBOOK;
  if (isWeb) return PlatformType.WEB;
  return PlatformType.MOBILE;
};