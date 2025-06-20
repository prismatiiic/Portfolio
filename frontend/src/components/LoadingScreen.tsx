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
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef(false);
  const textCompleteRef = useRef(false);

  // Critical images to preload
  const criticalImages = [
    `${basePath}/images/IMG_8060.JPG`,
    `${basePath}/images/IMG_8105.JPG`,
    `${basePath}/gifs/PAER.gif`,
    `${basePath}/gifs/Disc.gif`,
    `${basePath}/gifs/projectfellowshipCROPPED.gif`,
    `${basePath}/images/MusicDiaryLogo.png`,
    `${basePath}/images/DiscLogo.png`,
    `${basePath}/images/ProjectFellowshipLogowoTag.png`,
    `${basePath}/images/RVPortfolio.png`,
    `${basePath}/images/DiscordLogo.png`,
  ];

  useEffect(() => {
    // Preload all critical images
    setTotalImages(criticalImages.length);
    
    const loadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          setImagesLoaded(prev => prev + 1);
          resolve();
        };
        img.onerror = () => {
          // Still count as loaded to prevent infinite waiting
          setImagesLoaded(prev => prev + 1);
          resolve();
        };
        img.src = src;
      });
    };

    // Load all images in parallel
    Promise.all(criticalImages.map(loadImage));
  }, []);

  useEffect(() => {
    // Play DJ tag sound after a 2 second delay, only once
    const audioTimeout = setTimeout(() => {
      if (!hasPlayedRef.current && audioRef.current && window.innerWidth > 768) {
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
        textCompleteRef.current = true;
        // Check if we can complete loading
        checkCompletion();
      }
    }, 200);

    return () => {
      clearInterval(interval);
      clearTimeout(audioTimeout);
    };
  }, [fullText]);

  const checkCompletion = () => {
    // Only complete if both text is done AND images are loaded
    if (textCompleteRef.current && imagesLoaded >= totalImages) {
      // Wait for 1 second after everything is complete before fading out
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(onLoadingComplete, 500);
      }, 1000);
    }
  };

  // Check completion whenever images load
  useEffect(() => {
    if (textCompleteRef.current) {
      checkCompletion();
    }
  }, [imagesLoaded, totalImages]);

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