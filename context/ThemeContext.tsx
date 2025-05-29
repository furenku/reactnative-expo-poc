import React, { createContext, useContext, useState } from 'react';
import { View } from 'react-native';
import { Theme } from '@/types/theme';
import { theme as defaultTheme } from '@/theme/theme';
import { useFontsHook } from '@/theme/theme';
import { createBaseStyles } from '@/styles/base';

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  styles: any;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  isDark: false,
  toggleTheme: () => {},
  styles: {},
});

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  
  const fontsLoaded = useFontsHook();

  const theme = {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      background: isDark ? '#121212' : defaultTheme.colors.background,
      text: isDark ? '#ffffff' : defaultTheme.colors.text,
    }
  };


  const styles = createBaseStyles(theme);

  if( ! fontsLoaded ) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{
      theme,
      isDark,
      toggleTheme: () => setIsDark(!isDark),
      styles
    }}>
      <View style={styles.container}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);