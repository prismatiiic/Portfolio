'use client';

import React, { createContext, useState, useMemo, useContext, ReactNode, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface ThemeContextType {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

const getTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    ...(mode === 'light' ? {
      // Light mode palette
      primary: { main: '#7f00ff' },
      secondary: { main: '#FF00CC' },
      background: {
        default: '#ffffff',
        paper: '#f5f5f7',
      },
      text: {
        primary: '#1d1d1f',
        secondary: '#515152',
      },
    } : {
      // Dark mode palette
      primary: { main: '#D7263D' },
      secondary: { main: '#FF00CC' },
      background: {
        default: '#0a0a0a',
        paper: 'rgba(20,20,20,0.92)',
      },
      text: {
        primary: '#fff',
        secondary: '#cccccc',
      },
    }),
  },
  typography: {
    fontFamily: "'Inter', Helvetica, Arial, sans-serif",
  },
});


export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 