import { useTheme } from '@/context/ThemeContext';
import { createBaseStyles } from './base';

export const useBaseStyles = () => {
  const { theme } = useTheme();
  

  console.log('Current Theme:', theme); // Debugging line to check the theme object
  
  
  return createBaseStyles(theme);
};