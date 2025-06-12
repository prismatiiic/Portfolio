'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, useTheme, Avatar, Tab, Tabs, Chip, Button } from '@mui/material';
import { motion } from 'framer-motion';
import React, { UIEvent, WheelEvent } from 'react';

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

const projects = [
  {
    title: 'PAER: Peer-AI Editing Repository',
    description: "Elevate your cooking skills to the next level! Whether you're new to cooking or a professional, new AI always has something new for you to learn.",
    tags: ['Onboarding', 'Culinary Education', 'Mobile App'],
    image: '',
    link: '#',
  },
  {
    title: 'Music Diary',
    description: 'A virtual kitchen experience for learning and sharing recipes with friends and family.',
    tags: ['UX', 'Web App'],
    image: '',
    link: '#',
  },
  {
    title: 'DISC.',
    description: 'A travel platform for seamless booking and trip management.',
    tags: ['Travel', 'Mobile App'],
    image: '',
    link: '#',
  },
  {
    title: 'Project Fellowship',
    description: 'A project management tool for agile teams.',
    tags: ['Agile', 'Productivity'],
    image: '',
    link: '#',
  },
  {
    title: 'Online Learning Productivity Station',
    description: 'A collection of my graphic design works.',
    tags: ['Design', 'Gallery'],
    image: '',
    link: '#',
  },
  {
    title: 'Inspecting Dynamics in Discord Communities',
    description: 'A platform for connecting Echolab alumni and sharing experiences.',
    tags: ['Community', 'Web App'],
    image: '',
    link: '#',
  },
];

export default function Home() {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const accentBg = 'rgba(244,67,54,0.18)';
  const accentShadow = '0 0 12px 2px rgba(244,67,54,0.15)';
  const tabBg = 'transparent';
  const typewriterTexts = [
    'a software developer.',
    'an HCI researcher.',
    'a follower of Jesus Christ.',
    'a double Hokie.',
    'an echolab alumni.',
    'a lifelong learner.',
    'a manga enthusiast.',
    'a curator.',
    'a DJ.',
    'a gamer.'
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Pill-shaped tab navigation at the top */}
      <Box sx={{ width: '100vw', display: 'flex', justifyContent: 'center', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10, pt: 2 }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 999,
            px: 0.5,
            py: 0.25,
            mb: 1,
            display: 'inline-flex',
            alignItems: 'center',
            background: '#18191a',
            boxShadow: `0 0 0 2px rgba(244,67,54,0.06)`,
            border: `1.5px solid rgba(244,67,54,0.10)`,
            minWidth: 0,
            maxWidth: '100vw',
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
                minWidth: 70,
                px: 1.5,
                py: 0.25,
                borderRadius: 999,
                fontWeight: 700,
                fontSize: '0.95rem',
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
                minWidth: 70,
                px: 1.5,
                py: 0.25,
                borderRadius: 999,
                fontWeight: 700,
                fontSize: '0.95rem',
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
      </Box>

      {/* Main scrollable area with scroll-snap */}
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          overflowY: 'auto',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
        }}
      >
        {/* Slide 1: Intro */}
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 10, scrollSnapAlign: 'start' }}>
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
                    I&apos;m deeply interested in understanding how thoughtful design and technology can bridge human connections and create engaging, intuitive experiences.
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
                  <Typography variant="h2" sx={{ color: '#bbb' }}>RO</Typography>
                </Avatar>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Slide 2: Projects */}
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 10, bgcolor: 'background.default', scrollSnapAlign: 'start' }}>
          <Paper
            elevation={0}
            sx={{
              width: '100%',
              maxWidth: 1400,
              py: { xs: 4, md: 6 },
              px: { xs: 1, md: 4 },
              background: 'transparent',
              boxShadow: 'none',
              display: 'flex',
              flexDirection: 'row',
              gap: 4,
              height: { md: '80vh' },
            }}
          >
            {/* Projects Grid */}
            <Box sx={{ flex: 1, overflowY: 'auto', pl: { md: 4 }, pr: 2, maxHeight: { md: '70vh' } }}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 4 }}>Projects</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 4 }}>
                {projects.slice(0, 6).map((project, idx) => (
                  <Paper key={idx} elevation={2} sx={{ borderRadius: 4, p: 3, display: 'flex', flexDirection: 'column', gap: 2, minHeight: 320 }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>{project.title}</Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                          {project.tags.map((tag, i) => (
                            <Chip key={i} label={tag} size="small" sx={{ bgcolor: 'rgba(244,67,54,0.08)', color: '#F44336', fontWeight: 500 }} />
                          ))}
                        </Box>
                      </Box>
                      {/* Project image placeholder */}
                      <Box sx={{ width: 80, height: 140, bgcolor: '#f5f5f5', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        {/* Replace with <img src={project.image} ... /> if you have images */}
                        <Typography variant="caption" color="text.secondary">Image</Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" sx={{ color: 'text.secondary', flex: 1 }}>{project.description}</Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button href={project.link} endIcon={<span>&rarr;</span>} sx={{ color: '#F44336', fontWeight: 600 }}>
                        View Project
                      </Button>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Slide 3: Skills (placeholder) */}
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 10, scrollSnapAlign: 'start' }}>
          <Typography variant="h2">Skills (Coming Soon)</Typography>
        </Box>

        {/* Slide 4: Contact/Resume (placeholder) */}
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 10, scrollSnapAlign: 'start' }}>
          <Typography variant="h2">Contact / Resume (Coming Soon)</Typography>
        </Box>
      </Box>
    </Box>
  );
} 