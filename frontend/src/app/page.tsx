'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Paper, useTheme, Avatar, Tab, Tabs, Chip, Button, IconButton, useMediaQuery } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import React, { UIEvent, WheelEvent } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
    description: "Collaborative writing in academia is already challenging due to the difficulty of sharing context about document changes, and isolated AI usage by each member further amplifies this issue.\n We introduce PAER — our AI-Peer Editing Repository designed to streamline collaborative writing.",
    tags: ['AI Writing Assistant', 'Collaborative Writing', 'Full-Stack Web App'],
    image: '/images/manq-thumb.jpg',
    videoPreview: '/gifs/PAER.gif',
    link: '#',
  },
  {
    title: 'Music Diary',
    description: 'Music Diary is a web based platform where users can log their favorite song daily, regardless of their streaming platform of choice!\n Similar to a diary, you log your music choices and your thoughts about your favorite (or least favorite) songs. This is your centralized space to curate and document your unique music taste as you reflect on your listening history!',
    tags: ['Music Discovery', 'Social Platform', 'Full-Stack Web App'],
    image: '/images/MusicDiaryLogo.png',
    videoPreview: '',
    link: '#',
  },
  {
    title: 'DISC.',
    description: 'Discover, or DISC. for short, is a revolutionary music app that aims to connect people through the power of music. \n Whether you are a die-hard fan of a particular artist or love discovering new music, Discover makes it easy to connect with like-minded people and share your thoughts!',
    tags: ['Music Discovery', 'Social Platform', 'Creative Computing', 'Full-Stack Web App'],
    image: '/images/DiscLogo.png',
    videoPreview: '/gifs/Disc.gif',
    link: '#',
  },
  {
    title: 'Project Fellowship',
    description: 'Project Fellowship aims to provide students of all levels and all working levels an easy and engaging experience through a one of a kind massive multiplayer online role playing game when searching for roommates that best suit their living style and budgets.\n It allows new users to input their living preferences, lifestyle, and the semester for needed housing and determines a match between students who share the most similarities that are also looking for roommates. ',
    tags: ['Roommate Matching', 'UX/UI Design', 'User Research', 'Mobile App'],
    image: '/images/ProjectFellowshipLogowoTag.png',
    videoPreview: '/gifs/projectfellowshipCROPPED.gif',
    link: '#',
  },
];

// Publications data
const publications = [
  {
    title: "REACTING TO...: Understanding The Motivations, Participatory Culture, and Spectatorship Behind Reaction Videos",
    venue: "Master's Thesis, Virginia Tech, 2025",
    description:
      "Have you ever listened to a new album, had a particular track stick with you and thought to yourself, 'I wonder who else is resonating with this like I am'? So, you proceed to look up reactions to that album with the hopes that someone else is reacting and giving the same amount, if not more, praise to that same track? Perhaps, you felt this way about a movie? TV Show? Don't worry, you're not alone. Reaction videos (RVs) are a genre of video in which an individual, known as a reactor, watches and responds to original content (OC), typically expressing their emotions, opinions, and critiques as they engage with the content. Reaction videos are surging in popularity, emerging as a distinctive facet of participatory culture on current-day social video-sharing platforms such as YouTube, Tiktok, and Twitch. This study looks into why so many people enjoy watching these 'watch-along', and sometimes 'listen-along', videos. We wanted to understand what motivations led viewers into tuning in, as well as their participation in reaction video culture. Through 16 semi-structured interviews with people who identified as regular consumers of reaction videos, we were able to provide a more nuanced understanding of viewer engagement with both 'reactors' and other viewers, as well as the values that drove their motivations into watching these videos. This research gives us a peek behind the screen as to how we watch and share media in today's digital world.",
    image: "/images/RVPortfolio.png",
    link: "https://vtechworks.lib.vt.edu/items/4c929f73-3812-4b64-a74a-a34d950e9273",
    linkLabel: "View Thesis",
  },
  {
    title: "Inspecting Individuals' Dynamics within Online Communities and Groups on Discord",
    venue: "CS 5734: Social Computing and Computer-supported Cooperative Work Final Course Project, Virginia Tech, Fall 2023",
    description:
      "As many teenagers and young adults will confirm, online communities and virtual communications are some of the most common methods of engaging with peers, friends, and partners. Many find a greater sense of community in these online spaces, specifically Discord, since like-minded people are able to communicate without the limits of physical or temporal proximity. These relationships are largely unexplored, particularly compared to the development of relationships in a face-to-face context. Within these communities, there are often established rules and normalized behaviors, with information shared between community members. However, current existing literature on Discord explores its usage in academic and educational settings, rather than on its social and community aspects. In light of this, this study seeks to understand the establishment and development of relationships, collective behaviors, and information dissemination within the context of Discord communities.",
    image: "/images/DiscordLogo.png",
  },
];

// Touch swipe support for publications
function useSwipeableCarousel(
  currentIndex: number,
  setIndex: (idx: number) => void,
  maxIndex: number
) {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
  };
  const onTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const delta = touchEndX.current - touchStartX.current;
      if (delta > 60 && currentIndex > 0) {
        setIndex(currentIndex - 1);
      } else if (delta < -60 && currentIndex < maxIndex) {
        setIndex(currentIndex + 1);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };
  return { onTouchStart, onTouchMove, onTouchEnd };
}

// Custom hook for mobile detection
function useIsMobile() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
}

export default function Home() {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const flexDirection = isMobile ? 'column' : 'row';
  const gap = isMobile ? 24 : 64;
  const padding = isMobile ? 16 : 32;
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
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const projectsPerView = 2;
  const totalProjects = projects.length;
  const maxIndex = Math.max(0, Math.ceil(totalProjects / projectsPerView) - 1);

  // Publications carousel state
  const [pubIndex, setPubIndex] = useState(0);
  const pubCarouselRef = useRef<HTMLDivElement>(null);
  const totalPubs = publications.length;

  // Add directionRef to track navigation direction
  const directionRef = useRef<'next' | 'prev'>('next');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleNext = () => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelector('div[role="project-card"]');
      if (card) {
        const cardWidth = (card as HTMLElement).offsetWidth + 32; // 32px gap
        carouselRef.current.scrollBy({ left: cardWidth * projectsPerView, behavior: 'smooth' });
      }
    }
  };
  const handlePrev = () => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelector('div[role="project-card"]');
      if (card) {
        const cardWidth = (card as HTMLElement).offsetWidth + 32;
        carouselRef.current.scrollBy({ left: -cardWidth * projectsPerView, behavior: 'smooth' });
      }
    }
  };
  // Sync carouselIndex with manual scroll
  const handleCarouselScroll = () => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelector('div[role="project-card"]');
      if (card) {
        const cardWidth = (card as HTMLElement).offsetWidth + 32;
        const scrollLeft = carouselRef.current.scrollLeft;
        const newIndex = Math.round(scrollLeft / (cardWidth * projectsPerView));
        setCarouselIndex(Math.max(0, Math.min(newIndex, maxIndex)));
      }
    }
  };

  const handlePubNext = () => {
    if (pubCarouselRef.current) {
      const card = pubCarouselRef.current.querySelector('div[role="pub-card"]');
      if (card) {
        const cardWidth = (card as HTMLElement).offsetWidth + 32;
        pubCarouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }
  };
  const handlePubPrev = () => {
    if (pubCarouselRef.current) {
      const card = pubCarouselRef.current.querySelector('div[role="pub-card"]');
      if (card) {
        const cardWidth = (card as HTMLElement).offsetWidth + 32;
        pubCarouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      }
    }
  };
  // Sync pubIndex with manual scroll
  const handlePubCarouselScroll = () => {
    if (pubCarouselRef.current) {
      const card = pubCarouselRef.current.querySelector('div[role="pub-card"]');
      if (card) {
        const cardWidth = (card as HTMLElement).offsetWidth + 32;
        const scrollLeft = pubCarouselRef.current.scrollLeft;
        const newIndex = Math.round(scrollLeft / cardWidth);
        setPubIndex(Math.max(0, Math.min(newIndex, totalPubs - 1)));
      }
    }
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
        <Box sx={{ width: '100vw', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 10, pb: 8, scrollSnapAlign: 'start' }}>
          <Paper
            elevation={0}
            sx={{
              width: '100%',
              maxWidth: 1600,
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

        {/* Slide 1.5: Research & Publications */}
        <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: 'background.paper', scrollSnapAlign: 'start', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mt: { xs: 12, md: 14 }, mb: 6, textAlign: 'center', width: '100%' }}>
            Research & Publications
          </Typography>
          <Box sx={{ width: '100vw', height: { xs: 'auto', md: '70vh' }, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flex: 1 }}>
            {/* Carousel Arrows */}
            {pubIndex > 0 && (
              <IconButton
                onClick={() => {
                  setPubIndex((idx) => Math.max(idx - 1, 0));
                  directionRef.current = 'prev';
                }}
                sx={{
                  position: 'absolute',
                  left: { xs: 0, md: 32 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 20,
                  bgcolor: '#fff',
                  borderRadius: 999,
                  boxShadow: 2,
                  width: 48,
                  height: 48,
                  '&:hover': { bgcolor: 'rgba(244,67,54,0.08)' },
                }}
              >
                <ChevronLeftIcon fontSize="large" />
              </IconButton>
            )}
            {pubIndex < totalPubs - 1 && (
              <IconButton
                onClick={() => {
                  setPubIndex((idx) => Math.min(idx + 1, totalPubs - 1));
                  directionRef.current = 'next';
                }}
                sx={{
                  position: 'absolute',
                  right: { xs: 0, md: 32 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 20,
                  bgcolor: '#fff',
                  borderRadius: 999,
                  boxShadow: 2,
                  width: 48,
                  height: 48,
                  '&:hover': { bgcolor: 'rgba(244,67,54,0.08)' },
                }}
              >
                <ChevronRightIcon fontSize="large" />
              </IconButton>
            )}
            {/* Touch swipe support */}
            {(() => {
              const swipeHandlers = useSwipeableCarousel(pubIndex, setPubIndex, totalPubs - 1);
              return (
                <Box
                  {...swipeHandlers}
                  sx={{
                    width: '90vw',
                    minHeight: 400,
                    height: { xs: 400, md: '70vh' },
                    maxHeight: 700,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                    background: 'transparent',
                    flexDirection,
                    gap,
                    p: padding,
                  }}
                >
                  <AnimatePresence initial={false} custom={pubIndex}>
                    <motion.div
                      key={pubIndex}
                      role="pub-card"
                      initial={{ x: directionRef.current === 'next' ? 100 : -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: directionRef.current === 'next' ? -100 : 100, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.5 }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection,
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap,
                        boxSizing: 'border-box',
                      }}
                    >
                      {/* Text */}
                      <Box sx={{ flex: 1.2, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' }, pr: { md: 6 } }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                          {publications[pubIndex].title}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 2 }}>
                          {publications[pubIndex].venue}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, maxWidth: { xs: '100%', md: 'none' } }}>
                          {publications[pubIndex].description}
                        </Typography>
                        {publications[pubIndex].link && (
                          <Button href={publications[pubIndex].link} target="_blank" rel="noopener" variant="outlined" sx={{ mt: 1 }}>
                            {publications[pubIndex].linkLabel || 'View Publication'}
                          </Button>
                        )}
                      </Box>
                      {/* Image */}
                      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', height: isMobile ? 240 : '100%', width: '100%' }}>
                        <img
                          src={publications[pubIndex].image}
                          alt={publications[pubIndex].title}
                          style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 12, background: '#fafafa' }}
                        />
                      </Box>
                    </motion.div>
                  </AnimatePresence>
                </Box>
              );
            })()}
          </Box>
        </Box>

        {/* Slide 2: Projects */}
        <Box sx={{ width: '100vw', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 10, pb: 8, bgcolor: 'background.default', scrollSnapAlign: 'start', position: 'relative', overflow: 'hidden' }}>
          <Paper
            elevation={0}
            sx={{
              width: '100%',
              maxWidth: '100vw',
              py: { xs: 4, md: 6 },
              px: { xs: 1, md: 4 },
              background: 'transparent',
              boxShadow: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 4,
              boxSizing: 'border-box',
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', width: '100%' }}>Projects</Typography>
            {/* Carousel Arrows */}
            {carouselIndex > 0 && (
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: 'absolute',
                  left: 24,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  bgcolor: '#fff',
                  borderRadius: 999,
                  boxShadow: 2,
                  width: 48,
                  height: 48,
                  '&:hover': { bgcolor: 'rgba(244,67,54,0.08)' },
                }}
              >
                <ChevronLeftIcon fontSize="large" />
              </IconButton>
            )}
            {carouselIndex < maxIndex && (
              <IconButton
                onClick={handleNext}
                sx={{
                  position: 'absolute',
                  right: 24,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  bgcolor: '#fff',
                  borderRadius: 999,
                  boxShadow: 2,
                  width: 48,
                  height: 48,
                  '&:hover': { bgcolor: 'rgba(244,67,54,0.08)' },
                }}
              >
                <ChevronRightIcon fontSize="large" />
              </IconButton>
            )}
            <Box ref={carouselRef} onScroll={handleCarouselScroll} sx={{
              width: '100vw',
              maxWidth: 'calc(100vw - 64px)',
              height: '60vh',
              maxHeight: 500,
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollSnapType: 'x mandatory',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'stretch',
              gap: 4,
              pb: 2,
              boxSizing: 'border-box',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}>
              {projects.slice(0, 6).map((project, idx) => (
                <Paper key={idx} elevation={2} role="project-card" sx={{
                  borderRadius: 4,
                  p: 0,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  width: { xs: '90vw', sm: '70vw', md: 900 },
                  maxWidth: 900,
                  height: '60vh',
                  maxHeight: 500,
                  minHeight: 400,
                  scrollSnapAlign: 'center',
                  overflow: 'hidden',
                  flex: '0 0 auto',
                  boxSizing: 'border-box',
                  alignItems: 'flex-start',
                }}>
                  {/* Left: Textual content */}
                  <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minWidth: 0 }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 600, 
                        maxWidth: '100%', 
                        whiteSpace: 'normal', 
                        wordBreak: 'break-word',
                        lineHeight: 1.2
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                      {project.tags.map((tag, i) => (
                        <Chip key={i} label={tag} size="small" sx={{ bgcolor: 'rgba(244,67,54,0.08)', color: '#F44336', fontWeight: 500 }} />
                      ))}
                    </Box>
                    {/* Description with even tighter paragraph spacing */}
                    {project.description.split('\n').map((para, idx) => (
                      <Typography key={idx} variant="body1" sx={{ color: 'text.secondary', flex: 1, mt: idx === 0 ? 2 : 1 }}>
                        {para}
                      </Typography>
                    ))}
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button href={project.link} endIcon={<span>&rarr;</span>} sx={{ color: '#F44336', fontWeight: 600 }}>
                        View Project
                      </Button>
                    </Box>
                  </Box>
                  {/* Right: Image/GIF */}
                  <Box sx={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', bgcolor: 'transparent', height: '100%', p: { xs: 2, sm: 3 } }}>
                    {project.videoPreview ? (
                      <img
                        src={project.videoPreview}
                        alt={project.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          maxWidth: '90%',
                          maxHeight: '90%',
                          objectFit: 'contain',
                          display: 'block',
                          margin: '0 auto',
                        }}
                      />
                    ) : project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          maxWidth: '90%',
                          maxHeight: '90%',
                          objectFit: 'contain',
                          display: 'block',
                          margin: '0 auto',
                        }}
                      />
                    ) : null}
                  </Box>
                </Paper>
              ))}
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