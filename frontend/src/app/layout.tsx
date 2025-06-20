'use client';

import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
          {!isLoading && children}
        </ThemeProvider>
      </body>
    </html>
  );
} 