'use client';

import { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [currentText, setCurrentText] = useState('');
  const fullText = 'YTYKM';
  const [isComplete, setIsComplete] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    // Play DJ tag sound after a 2 second delay, only once
    const audioTimeout = setTimeout(() => {
      if (!hasPlayedRef.current && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
        hasPlayedRef.current = true;
      }
    }, 2000);
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setCurrentText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        // Wait for 2 seconds after text is complete before fading out
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onLoadingComplete, 500);
        }, 2000);
      }
    }, 200);

    return () => {
      clearInterval(interval);
      clearTimeout(audioTimeout);
    };
  }, [fullText, onLoadingComplete]);

  return (
    <>
      <audio ref={audioRef} src={`${basePath}/sounds/IntroTag.wav`} preload="auto" />
      <AnimatePresence>
        {!isComplete && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#000000',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Typography
                variant="h1"
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                sx={{
                  fontFamily: 'monospace',
                  fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                  fontWeight: 'bold',
                  letterSpacing: '0.5rem',
                  color: '#ffffff',
                }}
              >
                {currentText}
              </Typography>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                style={{
                  height: '2px',
                  backgroundColor: '#ff0000',
                  marginTop: '1rem',
                }}
              />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 