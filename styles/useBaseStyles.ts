import { useTheme } from '@/context/ThemeContext';
import { createBaseStyles } from './base';

export const useBaseStyles = () => {
  const { theme } = useTheme();
  
  return createBaseStyles(theme);
};