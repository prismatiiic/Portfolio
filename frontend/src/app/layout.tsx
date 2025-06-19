'use client';

import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoadingScreen from '@/components/LoadingScreen';
import './globals.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D7263D',
    },
    secondary: {
      main: '#FF00CC',
    },
    background: {
      default: '#0a0a0a',
      paper: 'rgba(20,20,20,0.92)',
    },
    text: {
      primary: '#fff',
      secondary: '#cccccc',
    },
  },
  typography: {
    fontFamily: "'Inter', Helvetica, Arial, sans-serif",
    h1: { fontFamily: "'Inter', Helvetica, Arial, sans-serif" },
    h2: { fontFamily: "'Inter', Helvetica, Arial, sans-serif" },
    h3: { fontFamily: "'Inter', Helvetica, Arial, sans-serif" },
    h4: { fontFamily: "'Inter', Helvetica, Arial, sans-serif" },
    h5: { fontFamily: "'Inter', Helvetica, Arial, sans-serif" },
    h6: { fontFamily: "'Inter', Helvetica, Arial, sans-serif" },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
          {!isLoading && children}
        </ThemeProvider>
      </body>
    </html>
  );
} 