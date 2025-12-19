// src/contexts/ThemeContext.tsx
import { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { i18n } = useTranslation();
  
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      return savedTheme;
    }
    
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove old theme class
    root.classList.remove('light', 'dark');
    
    // Add new theme class
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle RTL/LTR based on language
  useEffect(() => {
    const root = window.document.documentElement;
    const isRTL = i18n.language === 'fa';
    
    if (isRTL) {
      root.setAttribute('dir', 'rtl');
      root.classList.add('rtl');
    } else {
      root.setAttribute('dir', 'ltr');
      root.classList.remove('rtl');
    }
  }, [i18n.language]);

  // ⚡ CRITICAL FIX: Memoize toggleTheme and setTheme functions
  const toggleTheme = useMemo(() => {
    return () => {
      setThemeState(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };
  }, []);

  const setTheme = useMemo(() => {
    return (newTheme: Theme) => {
      setThemeState(newTheme);
    };
  }, []);

  // ⚡ CRITICAL FIX: Memoize context value
  const value = useMemo(() => ({
    theme,
    toggleTheme,
    setTheme,
  }), [theme, toggleTheme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}