'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, useTheme, Avatar, Tab, Tabs } from '@mui/material';
import { motion } from 'framer-motion';

function Typewriter({ texts, speed = 80, pause = 1200 }: { texts: string[]; speed?: number; pause?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const currentText = texts[textIdx];
    if (!isDeleting && charIdx < currentText.length) {
      timeout = setTimeout(() => setCharIdx(charIdx + 1), speed);
      setDisplayed(currentText.slice(0, charIdx + 1));
    } else if (!isDeleting && charIdx === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(charIdx - 1), speed / 2);
      setDisplayed(currentText.slice(0, charIdx - 1));
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setTextIdx((textIdx + 1) % texts.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, textIdx, texts, speed, pause]);

  return (
    <span style={{ borderRight: '2px solid #F44336', paddingRight: 2 }}>{displayed}</span>
  );
}

function MfLogoPlaceholder() {
  return (
    <Typography
      sx={{
        fontFamily: 'monospace',
        fontWeight: 700,
        fontSize: '2rem',
        color: 'transparent',
        WebkitTextStroke: '1.5px #F44336',
        mx: 2,
        userSelect: 'none',
        pointerEvents: 'none',
        lineHeight: 1,
      }}
    >
      Mf
    </Typography>
  );
}

export default function Home() {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const accentBg = 'rgba(244,67,54,0.18)';
  const accentShadow = '0 0 12px 2px rgba(244,67,54,0.15)';
  const tabBg = 'transparent';
  const typewriterTexts = [
    'a developer.',
    'a problem solver.',
    'a lifelong learner.',
    'passionate about tech.',
    'open to new opportunities.'
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Pill-shaped tab navigation at the top */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 999,
          px: 2,
          py: 1,
          mb: 6,
          mt: 2,
          display: 'flex',
          alignItems: 'center',
          background: '#18191a',
          boxShadow: `0 0 0 2px rgba(244,67,54,0.06)`,
          border: `1.5px solid rgba(244,67,54,0.10)`,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          TabIndicatorProps={{ style: { display: 'none' } }}
          sx={{
            minHeight: 0,
            '& .MuiTabs-flexContainer': {
              alignItems: 'center',
            },
          }}
        >
          <Tab
            label="Home"
            disableRipple
            sx={{
              minWidth: 120,
              px: 4,
              py: 1.5,
              borderRadius: 999,
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#fff !important',
              background: tabBg,
              boxShadow: 'none',
              border: 'none',
              transition: 'all 0.25s cubic-bezier(.4,1.3,.6,1)',
              position: 'relative',
              zIndex: 1,
              '&:hover': {
                background: accentBg,
                color: '#fff !important',
                boxShadow: accentShadow,
              },
            }}
          />
        </Tabs>
        <MfLogoPlaceholder />
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          TabIndicatorProps={{ style: { display: 'none' } }}
          sx={{
            minHeight: 0,
            '& .MuiTabs-flexContainer': {
              alignItems: 'center',
            },
          }}
        >
          <Tab
            label="About"
            disableRipple
            sx={{
              minWidth: 120,
              px: 4,
              py: 1.5,
              borderRadius: 999,
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#fff !important',
              background: tabBg,
              boxShadow: 'none',
              border: 'none',
              transition: 'all 0.25s cubic-bezier(.4,1.3,.6,1)',
              position: 'relative',
              zIndex: 1,
              '&:hover': {
                background: accentBg,
                color: '#fff !important',
                boxShadow: accentShadow,
              },
            }}
          />
        </Tabs>
      </Paper>

      {/* Intro section: left-aligned text, right photo placeholder */}
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 1200,
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 8 },
          background: 'transparent',
          boxShadow: 'none',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 4, md: 8 },
          }}
        >
          {/* Left: Text */}
          <Box sx={{ flex: 1, minWidth: 0, alignItems: 'flex-start', textAlign: { xs: 'center', md: 'left' } }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 400,
                  color: theme.palette.text.secondary,
                  mb: 1,
                  letterSpacing: 1,
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                Hello World! I&apos;m
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  mb: 2,
                  lineHeight: 1.1,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                Rodney Okyere
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 500,
                  color: theme.palette.text.secondary,
                  mb: 3,
                  minHeight: '2.5rem',
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                <Typewriter texts={typewriterTexts} />
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  maxWidth: 600,
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  lineHeight: 1.7,
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                {/* Placeholder for your intro paragraph */}
                I&apos;m passionate about building meaningful digital experiences that connect people and ideas. (You can edit this text!)
              </Typography>
            </motion.div>
          </Box>
          {/* Right: Photo placeholder */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 220 }}>
            <Avatar
              src={''}
              alt="Your photo"
              sx={{ width: 180, height: 220, borderRadius: 6, bgcolor: '#eee', boxShadow: 2 }}
            >
              {/* Placeholder initials or icon */}
              <Typography variant="h2" sx={{ color: '#bbb' }}>RO</Typography>
            </Avatar>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
} 