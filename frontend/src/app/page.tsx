'use client';

import { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { Box, Container, Typography, Paper, useTheme, Avatar, Tab, Tabs, Chip, Button, IconButton, useMediaQuery, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import React, { UIEvent, WheelEvent } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '@/context/ThemeContext';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

function Typewriter({ texts, speed = 80, pause = 1200 }: { texts: string[]; speed?: number; pause?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const theme = useTheme();

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
    <span style={{ borderRight: `2px solid ${theme.palette.primary.main}`, paddingRight: 2 }}>{displayed}</span>
  );
}

const projects = [
  {
    title: 'PAER: Peer-AI Editing Repository',
    description: "Collaborative writing in academia is already challenging due to the difficulty of sharing context about document changes, and isolated AI usage by each member further amplifies this issue.\n We introduce PAER — our AI-Peer Editing Repository designed to streamline collaborative writing.",
    tags: ['AI Writing Assistant', 'Collaborative Writing', 'Full-Stack Web App'],
    image: '',
    videoPreview: `${basePath}/gifs/PAER.gif`,
    link: '#',
  },
  {
    title: 'Music Diary',
    description: 'Music Diary is a web based platform where users can log their favorite song daily, regardless of their streaming platform of choice!\n Similar to a diary, you log your music choices and your thoughts about your favorite (or least favorite) songs. This is your centralized space to curate and document your unique music taste as you reflect on your listening history!',
    tags: ['Music Discovery', 'Social Platform', 'Full-Stack Web App'],
    image: `${basePath}/images/MusicDiaryLogo.png`,
    videoPreview: '',
    link: '#',
  },
  {
    title: 'DISC.',
    description: 'Discover, or DISC. for short, is a revolutionary music app that aims to connect people through the power of music. \n Whether you are a die-hard fan of a particular artist or love discovering new music, Discover makes it easy to connect with like-minded people and share your thoughts!',
    tags: ['Music Discovery', 'Social Platform', 'Creative Computing', 'Full-Stack Web App'],
    image: `${basePath}/images/DiscLogo.png`,
    videoPreview: `${basePath}/gifs/Disc.gif`,
    link: '#',
  },
  {
    title: 'Project Fellowship',
    description: 'Project Fellowship aims to provide students of all levels and all working levels an easy and engaging experience through a one of a kind massive multiplayer online role playing game when searching for roommates that best suit their living style and budgets.\n It allows new users to input their living preferences, lifestyle, and the semester for needed housing and determines a match between students who share the most similarities that are also looking for roommates. ',
    tags: ['Roommate Matching', 'UX/UI Design', 'User Research', 'Mobile App'],
    image: `${basePath}/images/ProjectFellowshipLogowoTag.png`,
    videoPreview: `${basePath}/gifs/projectfellowshipCROPPED.gif`,
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
    image: `${basePath}/images/RVPortfolio.png`,
    link: "https://vtechworks.lib.vt.edu/items/4c929f73-3812-4b64-a74a-a34d950e9273",
    linkLabel: "Read!",
  },
  {
    title: "Inspecting Individuals' Dynamics within Online Communities and Groups on Discord",
    venue: "CS 5734: Social Computing and Computer-supported Cooperative Work Final Course Project, Virginia Tech, Fall 2023",
    description:
      "As many teenagers and young adults will confirm, online communities and virtual communications are some of the most common methods of engaging with peers, friends, and partners. Many find a greater sense of community in these online spaces, specifically Discord, since like-minded people are able to communicate without the limits of physical or temporal proximity. These relationships are largely unexplored, particularly compared to the development of relationships in a face-to-face context. Within these communities, there are often established rules and normalized behaviors, with information shared between community members. However, current existing literature on Discord explores its usage in academic and educational settings, rather than on its social and community aspects. In light of this, this study seeks to understand the establishment and development of relationships, collective behaviors, and information dissemination within the context of Discord communities.",
    image: `${basePath}/images/DiscordLogo.png`,
  },
];

// Skills data
const skills = {
  "Programming Languages": ["Java", "Python", "C", "C++", "C#", "Kotlin", "SQL", "JavaScript", "HTML/CSS"],
  "Frameworks, Software, & Tools": ["React", "Next.js", "Node.js", "Bootstrap", "Linux", "Powershell", "Docker", "Flask", "Git", "OpenAI API", "Miro", "Balsamiq", "Figma"],
  "Databases": ["PostgreSQL", "MongoDB", "Microsoft SQL Server"],
  "Miscellaneous": ["Technical Writing", "Public Speaking", "Photoshop", "Premiere Pro", "After Effects", "Vegas Pro", "Serato DJ Pro"]
};

const musicMixes: { soundcloud: string; embedHtml?: string }[] = [
  {
    soundcloud: 'https://soundcloud.com/mgf221/friendsflings-vol-25',
    embedHtml: `<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2112960165&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/mgf221" title="RKO" target="_blank" style="color: #cccccc; text-decoration: none;">RKO</a> · <a href="https://soundcloud.com/mgf221/friendsflings-vol-25" title="FRIENDS&amp;FLINGS VOL. 2.5" target="_blank" style="color: #cccccc; text-decoration: none;">FRIENDS&amp;FLINGS VOL. 2.5</a></div>`
  },
  {
    soundcloud: 'https://soundcloud.com/mgf221/wintry-warmth-vol-ii',
    embedHtml: `<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2003699791&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/mgf221" title="RKO" target="_blank" style="color: #cccccc; text-decoration: none;">RKO</a> · <a href="https://soundcloud.com/mgf221/wintry-warmth-vol-ii" title="WINTRY WARMTH VOL. II" target="_blank" style="color: #cccccc; text-decoration: none;">WINTRY WARMTH VOL. II</a></div>`
  },
  {
    soundcloud: 'https://soundcloud.com/mgf221/rk2groooovy-club-rko-mini-mix-2',
    embedHtml: `<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1593170217&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/mgf221" title="RKO" target="_blank" style="color: #cccccc; text-decoration: none;">RKO</a> · <a href="https://soundcloud.com/mgf221/rk2groooovy-club-rko-mini-mix-2" title="RK2GROOOOVY [CLUB RKO MINI MIX #2]" target="_blank" style="color: #cccccc; text-decoration: none;">RK2GROOOOVY [CLUB RKO MINI MIX #2]</a></div>`
  },
  {
    soundcloud: 'https://soundcloud.com/mgf221/wintry-warmth-vol-i',
    embedHtml: `<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1707664320&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/mgf221" title="RKO" target="_blank" style="color: #cccccc; text-decoration: none;">RKO</a> · <a href="https://soundcloud.com/mgf221/wintry-warmth-vol-i" title="WINTRY WARMTH VOL. I" target="_blank" style="color: #cccccc; text-decoration: none;">WINTRY WARMTH VOL. I</a></div>`
  },
  {
    soundcloud: 'https://soundcloud.com/mgf221/friendsflings-vol-2',
    embedHtml: `<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1531833634&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href=\"https://soundcloud.com/mgf221\" title=\"RKO\" target=\"_blank\" style=\"color: #cccccc; text-decoration: none;\">RKO</a> · <a href=\"https://soundcloud.com/mgf221/friendsflings-vol-2\" title=\"FRIENDS&amp;FLINGS VOL. 2\" target=\"_blank\" style=\"color: #cccccc; text-decoration: none;\">FRIENDS&amp;FLINGS VOL. 2</a></div>`
  },
  {
    soundcloud: 'https://soundcloud.com/mgf221/sets/rated-rko-radio',
    embedHtml: `<iframe width=\"100%\" height=\"450\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1500834493&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true\"></iframe><div style=\"font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;\"><a href=\"https://soundcloud.com/mgf221\" title=\"RKO\" target=\"_blank\" style=\"color: #cccccc; text-decoration: none;\">RKO</a> · <a href=\"https://soundcloud.com/mgf221/sets/rated-rko-radio\" title=\"RATED RKO RADIO\" target=\"_blank\" style=\"color: #cccccc; text-decoration: none;\">RATED RKO RADIO</a></div>`
  },
];

const MusicSection = memo(function MusicSection({
  musicCarouselRef,
  musicIndex,
  isMusicAtEnd,
  handleMusicPrev,
  handleMusicNext,
  handleMusicCarouselScroll
}: any) {
  const theme = useTheme();
  const soundCloudPlayers = useMemo(() => (
    musicMixes.map((mix, idx) => (
      <Paper key={idx} elevation={2} role="music-card" sx={{
        borderRadius: 4,
        p: 0,
        display: 'block',
        width: { xs: '95vw', sm: '80vw', md: 600 },
        maxWidth: 600,
        minWidth: 320,
        scrollSnapAlign: 'center',
        overflow: 'hidden',
        boxSizing: 'border-box',
        bgcolor: 'rgba(255,255,255,0.08)',
        textAlign: 'center',
        justifyContent: 'center',
      }}>
        {mix.embedHtml ? (
          <Box sx={{ width: '100%' }} dangerouslySetInnerHTML={{ __html: mix.embedHtml }} />
        ) : (
          <iframe width="100%" height="450" scrolling="no" frameBorder="no" allow="autoplay" src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(mix.soundcloud)}&color=%23ff5500&auto_play=false`} />
        )}
      </Paper>
    ))
  ), []);

  return (
    <Box id="music-section" sx={{ width: '100%', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 10, pb: 8, bgcolor: 'background.default', position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ width: '100%', maxWidth: 1200, px: { xs: 2, md: 6 }, py: { xs: 6, md: 10 }, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
        <Typography variant="h2" sx={{ fontWeight: 700, color: 'text.primary', mb: 2, textAlign: 'center', width: '100%' }}>
          Music
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.primary', fontWeight: 500, mb: 2, textAlign: 'center', width: '100%', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
          From curating mixes to being an on-air FM DJ for WUVT-FM 90.7 Blacksburg, I'm reinventing MY sound everyday! Feel free to check out my latest mixes as well as my archive of WUVT sets!
        </Typography>
        <Box sx={{ width: '100%', maxWidth: '100vw', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
          {/* Left Arrow Column */}
          <Box sx={{ width: { xs: 40, md: 64 }, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            {musicIndex > 0 && (
              <IconButton
                onClick={handleMusicPrev}
                sx={{
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(30,30,30,0.85)' : '#f0f0f0',
                  borderRadius: 999,
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)',
                  width: 48,
                  height: 48,
                  color: theme.palette.primary.main,
                  border: theme.palette.mode === 'light' ? `1px solid ${theme.palette.divider}` : 'none',
                  '&:hover': { bgcolor: theme.palette.mode === 'dark' ? 'rgba(30,30,30,0.95)' : '#e0e0e0' },
                }}
              >
                <ChevronLeftIcon fontSize="large" />
              </IconButton>
            )}
          </Box>
          {/* Carousel Column */}
          <Box
            ref={musicCarouselRef}
            onScroll={handleMusicCarouselScroll}
            sx={{
              width: '100%',
              maxWidth: 'calc(100vw - 128px)',
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
            }}
          >
            {soundCloudPlayers}
          </Box>
          {/* Right Arrow Column */}
          {!isMusicAtEnd && (
            <Box sx={{ width: { xs: 40, md: 64 }, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <IconButton
                onClick={handleMusicNext}
                sx={{
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(30,30,30,0.85)' : '#f0f0f0',
                  borderRadius: 999,
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)',
                  width: 48,
                  height: 48,
                  color: theme.palette.primary.main,
                  border: theme.palette.mode === 'light' ? `1px solid ${theme.palette.divider}` : 'none',
                  '&:hover': { bgcolor: theme.palette.mode === 'dark' ? 'rgba(30,30,30,0.95)' : '#e0e0e0' },
                }}
              >
                <ChevronRightIcon fontSize="large" />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
});
MusicSection.displayName = 'MusicSection';

function useIsMobile() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
}

export default function Home() {
  const { mode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const isMobile = useIsMobile();
  const flexDirection = isMobile ? 'column' : 'row';
  const gap = isMobile ? 24 : 64;
  const padding = isMobile ? 16 : 32;
  const [tabValue, setTabValue] = useState(0);
  const accentBg = useMemo(() => {
    const color = theme.palette.primary.main;
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, 0.18)`;
  }, [theme.palette.primary.main]);
  const accentShadow = useMemo(() => {
    const color = theme.palette.primary.main;
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `0 0 12px 2px rgba(${r}, ${g}, ${b}, 0.15)`;
  }, [theme.palette.primary.main]);
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

  const directionRef = useRef<'next' | 'prev'>('next');

  const sectionIds = [
    'home-section',
    'research-section',
    'projects-section',
    'skills-section',
    'music-section',
    'contact-section',
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    const section = document.getElementById(sectionIds[newValue]);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      const cards = carouselRef.current.children;
      if (cards.length > 0) {
        const cardWidth = (cards[0] as HTMLElement).offsetWidth + 32; // 32px gap
        carouselRef.current.scrollBy({ left: cardWidth * projectsPerView, behavior: 'smooth' });
      }
    }
  };
  const handlePrev = () => {
    if (carouselRef.current) {
      const cards = carouselRef.current.children;
      if (cards.length > 0) {
        const cardWidth = (cards[0] as HTMLElement).offsetWidth + 32;
        carouselRef.current.scrollBy({ left: -cardWidth * projectsPerView, behavior: 'smooth' });
      }
    }
  };

  const handleCarouselScroll = () => {
    if (carouselRef.current) {
      const cards = carouselRef.current.children;
      if (cards.length > 0) {
        const cardWidth = (cards[0] as HTMLElement).offsetWidth + 32;
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


  const [musicIndex, setMusicIndex] = useState(0);
  const musicCarouselRef = useRef<HTMLDivElement>(null);

  const [isMusicAtEnd, setIsMusicAtEnd] = useState(false);
  const handleMusicNext = useCallback(() => {
    if (musicCarouselRef.current) {
      const card = musicCarouselRef.current.querySelector('div[role="music-card"]');
      if (card) {
        const cardWidth = (card as HTMLElement).offsetWidth + 32; // 32px gap
        const maxScrollLeft = musicCarouselRef.current.scrollWidth - musicCarouselRef.current.clientWidth;
        const nextScrollLeft = musicCarouselRef.current.scrollLeft + cardWidth;
        if (nextScrollLeft >= maxScrollLeft) {
          musicCarouselRef.current.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
        } else {
          musicCarouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }
  }, []);
  const handleMusicPrev = useCallback(() => {
    if (musicCarouselRef.current) {
      const card = musicCarouselRef.current.querySelector('div[role="music-card"]');
      if (card) {
        const cardWidth = (card as HTMLElement).offsetWidth + 32;
        musicCarouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      }
    }
  }, []);
  const handleMusicCarouselScroll = useCallback(() => {
    if (musicCarouselRef.current) {
      const card = musicCarouselRef.current.querySelector('div[role="music-card"]');
      if (card) {
        const cardWidth = (card as HTMLElement).offsetWidth + 32;
        const scrollLeft = musicCarouselRef.current.scrollLeft;
        const clientWidth = musicCarouselRef.current.clientWidth;
        const scrollWidth = musicCarouselRef.current.scrollWidth;
        // Calculate index for enabling/disabling arrows
        const newIndex = Math.round(scrollLeft / cardWidth);
        setMusicIndex(newIndex);
        // Check if at end (allowing for a small margin)
        setIsMusicAtEnd(scrollLeft + clientWidth >= scrollWidth - 8);
      }
    }
  }, []);

  const mixesPerView = 1;
  const maxMusicIndex = Math.max(0, musicMixes.length - mixesPerView);

  const mainScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const toolbarOffset = 80;
      let activeIdx = 0;
      const container = mainScrollRef.current;
      if (!container) return;
      const scrollTop = container.scrollTop;
      sectionIds.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (el && container) {
          // Get the section's offsetTop relative to the scroll container
          const sectionTop = el.offsetTop;
          if (scrollTop + toolbarOffset >= sectionTop) {
            activeIdx = idx;
          }
        }
      });
      setTabValue(activeIdx);
    };
    const container = mainScrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const [flippedCards, setFlippedCards] = useState<{ [idx: number]: boolean }>({});
  const projectVideos: { [title: string]: string } = {
    'PAER: Peer-AI Editing Repository': `${basePath}/videos/PAERPortfolioVid.mp4`,
    'Music Diary': `${basePath}/videos/MusicDiaryWalkthrough.mp4`,
    'DISC.': `${basePath}/videos/DISCPortfolioAd.mp4`,
    'Project Fellowship': `${basePath}/videos/ProjectFellowshipWalkthrough.mp4`,
  };

  const TabStyle = {
    minWidth: 90,
    px: 2,
    py: 0.5,
    borderRadius: 999,
    fontWeight: 700,
    fontSize: '1.05rem',
    color: 'text.primary',
    background: tabBg,
    boxShadow: 'none',
    border: 'none',
    transition: 'all 0.25s cubic-bezier(.4,1.3,.6,1)',
    position: 'relative',
    zIndex: 1,
    '&:hover': {
      background: accentBg,
      color: theme.palette.primary.contrastText,
      boxShadow: accentShadow
    },
    '&.Mui-selected': {
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      boxShadow: accentShadow
    }
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh', overflow: 'hidden', bgcolor: 'background.default' }}>
      {/* Pill-shaped tab navigation at the top */}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10, pt: 2 }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 999,
            px: 2,
            py: 0.25,
            mb: 1,
            display: 'inline-flex',
            alignItems: 'center',
            background: mode === 'dark' ? '#18191a' : 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(12px)',
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
            <Tab label="Home" disableRipple sx={{...TabStyle, minWidth: 90}} />
            <Tab label="Research & Publications" disableRipple sx={{...TabStyle, minWidth: 170}} />
            <Tab label="Projects" disableRipple sx={{...TabStyle, minWidth: 100}} />
            <Tab label="Skills" disableRipple sx={{...TabStyle, minWidth: 90}} />
            <Tab label="Music" disableRipple sx={{...TabStyle, minWidth: 90}} />
            <Tab label="Contact" disableRipple sx={{...TabStyle, minWidth: 90}} />
          </Tabs>
          <IconButton sx={{ ml: 1, color: 'text.primary' }} onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Paper>
      </Box>

      
      <Box
        ref={mainScrollRef}
        sx={{
          width: '100%',
          height: '100vh',
          overflowY: 'auto',
          scrollBehavior: 'smooth',
        }}
      >
        {/* Slide 1: Intro */}
        <Box id="home-section" sx={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 0, pb: 0 }}>
          <Paper
            elevation={0}
            sx={{
              width: '100%',
              maxWidth: 1600,
              py: { xs: 10, md: 14 },
              px: { xs: 2, md: 10 },
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
                gap: { xs: 6, md: 12 },
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
                      color: 'text.primary',
                      mb: 2,
                      letterSpacing: 1,
                      textAlign: { xs: 'center', md: 'left' },
                      fontSize: { xs: '2rem', md: '2.7rem' },
                    }}
                  >
                    Hello World! I&apos;m
                  </Typography>
                  <Typography
                    variant="h1"
                    className={`${mode === 'dark' ? 'name-text-dark' : 'name-text-light'} no-underline`}
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '3.5rem', sm: '5rem', md: '6.5rem' },
                      mb: 3,
                      lineHeight: 1.1,
                      textAlign: { xs: 'center', md: 'left' },
                    }}
                  >
                    Rodney Okyere
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 500,
                      color: 'text.primary',
                      mb: 4,
                      minHeight: '2.5rem',
                      textAlign: { xs: 'center', md: 'left' },
                      fontSize: { xs: '1.5rem', md: '2.2rem' },
                    }}
                  >
                    <Typewriter texts={typewriterTexts} />
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.primary',
                      maxWidth: 700,
                      fontSize: { xs: '1.3rem', md: '1.7rem' },
                      lineHeight: 1.7,
                      textAlign: { xs: 'center', md: 'left' },
                    }}
                  >
                    I&apos;m deeply interested in understanding how thoughtful design and technology can bridge human connections and create engaging, intuitive experiences.
                  </Typography>
                </motion.div>
              </Box>
              {/* Right: Photo */}
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 320 }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: 420,
                    height: 540,
                    borderRadius: 24,
                    boxShadow: '0 12px 48px rgba(0,0,0,0.14)',
                    background: '#eee',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={`${basePath}/images/IMG_8060.JPG`}
                    alt="Rodney Okyere Dark"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: mode === 'dark' ? 1 : 0,
                      transition: 'opacity 0.5s ease-in-out',
                    }}
                  />
                  <img
                    src={`${basePath}/images/IMG_8105.JPG`}
                    alt="Rodney Okyere Light"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: mode === 'light' ? 1 : 0,
                      transition: 'opacity 0.5s ease-in-out',
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                  <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 400, mr: 1, fontSize: '1.25rem' }}>
                    based in
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', border: '1.5px solid #222', borderRadius: 999, px: 2, py: 0.5, bgcolor: 'rgba(255,255,255,0.85)', color: '#222', fontWeight: 600, fontSize: '1.25rem', boxShadow: '0 1px 4px 0 rgba(31,38,135,0.08)', transition: 'transform 0.2s cubic-bezier(.4,1.3,.6,1), box-shadow 0.2s cubic-bezier(.4,1.3,.6,1)', '&:hover': { transform: 'scale(1.07)', boxShadow: '0 4px 16px 0 rgba(31,38,135,0.16)' } }}>
                    <svg width="22" height="22" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                      <path d="M11 20s6-5.5 6-10A6 6 0 1 0 5 10c0 4.5 6 10 6 10z"/>
                      <circle cx="11" cy="10" r="2"/>
                    </svg>
                    Virginia
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Slide 1: Research & Publications */}
        <Box id="research-section" sx={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 10, pb: 8, bgcolor: 'background.default', position: 'relative', overflow: 'hidden' }}>
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
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', width: '100%' }}>Research & Publications</Typography>
            
            {pubIndex > 0 && (
              <IconButton
                onClick={handlePubPrev}
                sx={{
                  position: 'absolute',
                  left: 24,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(30,30,30,0.85)' : '#f0f0f0',
                  borderRadius: 999,
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)',
                  width: 48,
                  height: 48,
                  color: theme.palette.primary.main,
                  border: theme.palette.mode === 'light' ? `1px solid ${theme.palette.divider}` : 'none',
                  '&:hover': { bgcolor: theme.palette.mode === 'dark' ? 'rgba(30,30,30,0.95)' : '#e0e0e0' },
                }}
              >
                <ChevronLeftIcon fontSize="large" />
              </IconButton>
            )}
            {pubIndex < totalPubs - 1 && (
              <IconButton
                onClick={handlePubNext}
                sx={{
                  position: 'absolute',
                  right: 24,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(30,30,30,0.85)' : '#f0f0f0',
                  borderRadius: 999,
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)',
                  width: 48,
                  height: 48,
                  color: theme.palette.primary.main,
                  border: theme.palette.mode === 'light' ? `1px solid ${theme.palette.divider}` : 'none',
                  '&:hover': { bgcolor: theme.palette.mode === 'dark' ? 'rgba(30,30,30,0.95)' : '#e0e0e0' },
                }}
              >
                <ChevronRightIcon fontSize="large" />
              </IconButton>
            )}
            <Box sx={{ position: 'relative', width: { xs: '98vw', sm: '90vw', md: 1200 }, maxWidth: 1200, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             
              <Box ref={pubCarouselRef} onScroll={handlePubCarouselScroll} sx={{
                width: '100%',
                maxWidth: 1200,
                margin: '0 auto',
                overflowX: 'auto',
                overflowY: 'hidden',
                scrollSnapType: 'x mandatory',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
                gap: 0,
                pb: 0,
                boxSizing: 'border-box',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}>
                {publications.map((pub, idx) => (
                  <Box key={idx} role="pub-card" sx={{
                    width: { xs: '90vw', sm: '70vw', md: 1200 },
                    maxWidth: 1200,
                    mx: 'auto',
                    scrollSnapAlign: 'center',
                    flex: '0 0 100%',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'flex-start',
                    bgcolor: 'transparent',
                    p: { xs: 2, md: 4 },
                    minHeight: 'unset',
                    height: 'auto',
                  }}>
                    {/* Left: Textual content */}
                    <Box sx={{ flex: 1.2, pr: { md: 6 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' } }}>
                      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>{pub.title}</Typography>
                      <Typography variant="subtitle2" sx={{ color: 'text.primary', mb: 2 }}>{pub.venue}</Typography>
                      <Typography variant="body1" sx={{ color: 'text.primary', mb: 2, maxWidth: { xs: '100%', md: 'none' } }}>{pub.description}</Typography>
                      {pub.link && (
                        <Button href={pub.link} target="_blank" rel="noopener" variant="outlined" sx={{ mt: 1 }}>
                          {pub.linkLabel || 'View Publication'}
                        </Button>
                      )}
                    </Box>
                    {/* Right: Image */}
                    <Box sx={{ flex: 0.8, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: { xs: 260, md: 420 } }}>
                      <img
                        src={pub.image}
                        alt={pub.title}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 12, background: 'transparent', maxHeight: 520 }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Slide 2: Projects */}
        <Box id="projects-section" sx={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 10, pb: 8, bgcolor: 'background.default', position: 'relative', overflow: 'hidden' }}>
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
            
            {carouselIndex > 0 && (
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: 'absolute',
                  left: 24,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(30,30,30,0.85)' : '#f0f0f0',
                  borderRadius: 999,
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)',
                  width: 48,
                  height: 48,
                  color: theme.palette.primary.main,
                  border: theme.palette.mode === 'light' ? `1px solid ${theme.palette.divider}` : 'none',
                  '&:hover': { bgcolor: theme.palette.mode === 'dark' ? 'rgba(30,30,30,0.95)' : '#e0e0e0' },
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
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(30,30,30,0.85)' : '#f0f0f0',
                  borderRadius: 999,
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)',
                  width: 48,
                  height: 48,
                  color: theme.palette.primary.main,
                  border: theme.palette.mode === 'light' ? `1px solid ${theme.palette.divider}` : 'none',
                  '&:hover': { bgcolor: theme.palette.mode === 'dark' ? 'rgba(30,30,30,0.95)' : '#e0e0e0' },
                }}
              >
                <ChevronRightIcon fontSize="large" />
              </IconButton>
            )}
            <Box ref={carouselRef} onScroll={handleCarouselScroll} sx={{
              width: '100%',
              maxWidth: { xs: 'calc(100vw - 48px)', md: 'calc(100vw - 64px)' },
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
              px: { xs: 2, md: 0 },
              mx: 'auto',
              boxSizing: 'border-box',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}>
              {projects.slice(0, 6).map((project, idx) => {
                const hasVideo = projectVideos[project.title];
                if (hasVideo) {
                  return (
                    <Box key={idx} sx={{ perspective: 1200, width: { xs: '100%', sm: '70vw', md: 900 }, maxWidth: 900, height: { xs: 'auto', sm: '60vh' }, maxHeight: { xs: 'none', sm: 500 }, minHeight: { xs: 'auto', sm: 400 }, flex: '0 0 auto', scrollSnapAlign: 'center' }}>
                      <Box
                        sx={{
                          position: 'relative',
                          width: '100%',
                          height: { xs: 'auto', sm: '100%' },
                          transformStyle: 'preserve-3d',
                          transition: 'transform 0.7s cubic-bezier(.4,1.3,.6,1)',
                          transform: flippedCards[idx] ? 'rotateY(180deg)' : 'none',
                        }}
                      >
                        {/* Front Side */}
                        <Paper elevation={2} className="project-card" sx={{
                          position: 'absolute',
                          width: '100%',
                          height: { xs: 'auto', sm: '100%' },
                          backfaceVisibility: 'hidden',
                          borderRadius: 4,
                          p: 0,
                          display: 'flex',
                          flexDirection: { xs: 'column', sm: 'row' },
                          alignItems: 'center',
                          bgcolor: 'background.paper',
                          textAlign: 'left',
                          justifyContent: 'center',
                        }}>
                          <Box sx={{ flex: { xs: 'none', sm: 1 }, p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minWidth: 0 }}>
                            <Typography variant="h5" sx={{ fontWeight: 600, maxWidth: '100%', whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: 1.2 }}>{project.title}</Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                              {project.tags.map((tag, i) => (
                                <Chip key={i} label={tag} size="small" sx={{ bgcolor: accentBg, color: theme.palette.primary.main, fontWeight: 500 }} />
                              ))}
                            </Box>
                            {project.description.split('\n').map((para, idx) => (
                              <Typography key={idx} variant="body1" sx={{ color: 'text.primary', mt: idx === 0 ? 2 : 1 }}>{para}</Typography>
                            ))}
                            <Box sx={{ mt: 'auto', pt: 2, display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-end' }}>
                              <Button onClick={() => setFlippedCards(f => ({ ...f, [idx]: true }))} sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                                Learn More
                              </Button>
                            </Box>
                          </Box>
                          <Box sx={{ flex: { xs: 'none', sm: 1 }, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'transparent', p: { xs: 2, sm: 3 }, maxHeight: { xs: 250, sm: 'none' } }}>
                            {project.videoPreview ? (
                              <img src={project.videoPreview} alt={project.title} style={{ width: '100%', maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
                            ) : project.image ? (
                              <img src={project.image} alt={project.title} style={{ width: '100%', maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
                            ) : null}
                          </Box>
                        </Paper>
                        {/* Back Side */}
                        <Paper elevation={2} sx={{
                          position: 'absolute',
                          width: '100%',
                          height: { xs: 'auto', sm: '100%' },
                          backfaceVisibility: 'hidden',
                          borderRadius: 4,
                          p: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'background.paper',
                          transform: 'rotateY(180deg)',
                        }}>
                          <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3 }}>
                            <video width="100%" height="100%" controls style={{ borderRadius: 8, maxHeight: 340, background: '#000' }}>
                              <source src={projectVideos[project.title]} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                            {project.title === 'DISC.' && (
                              <Button
                                href="https://disc-music.com"
                                target="_blank"
                                rel="noopener"
                                sx={{ mt: 2, color: theme.palette.primary.main, fontWeight: 600, textTransform: 'none', fontSize: '1.1rem' }}
                              >
                                Visit!
                              </Button>
                            )}
                            <Button onClick={() => setFlippedCards(f => ({ ...f, [idx]: false }))} sx={{ mt: 2, color: theme.palette.primary.main, fontWeight: 600 }}>
                              Back
                            </Button>
                          </Box>
                        </Paper>
                      </Box>
                    </Box>
                  );
                }
                // Fallback for projects without a video
                return (
                  <Paper key={idx} elevation={2} className="project-card" sx={{
                    borderRadius: 4,
                    p: 0,
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    width: { xs: '100%', sm: '70vw', md: 900 },
                    maxWidth: 900,
                    height: { xs: 'auto', sm: '60vh' },
                    maxHeight: { xs: 'none', sm: 500 },
                    minHeight: { xs: 'auto', sm: 400 },
                    scrollSnapAlign: 'center',
                    overflow: 'hidden',
                    flex: '0 0 auto',
                    boxSizing: 'border-box',
                    alignItems: 'center',
                  }}>
                    {/* Left: Textual content */}
                    <Box sx={{ flex: { xs: 'none', sm: 1 }, p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minWidth: 0 }}>
                      <Typography variant="h5" sx={{ fontWeight: 600, maxWidth: '100%', whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: 1.2 }}>{project.title}</Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                        {project.tags.map((tag, i) => (
                          <Chip key={i} label={tag} size="small" sx={{ bgcolor: accentBg, color: theme.palette.primary.main, fontWeight: 500 }} />
                        ))}
                      </Box>
                      {project.description.split('\n').map((para, idx) => (
                        <Typography key={idx} variant="body1" sx={{ color: 'text.primary', mt: idx === 0 ? 2 : 1 }}>{para}</Typography>
                      ))}
                      <Box sx={{ mt: 'auto', pt: 2, display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-end' }}>
                        <Button href={project.link} sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                          Learn More
                        </Button>
                      </Box>
                    </Box>
                    {/* Right: Image/GIF */}
                    <Box sx={{ flex: { xs: 'none', sm: 1 }, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'transparent', p: { xs: 2, sm: 3 }, maxHeight: { xs: 250, sm: 'none' } }}>
                      {project.videoPreview ? (
                        <img src={project.videoPreview} alt={project.title} style={{ width: '100%', maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
                      ) : project.image ? (
                        <img src={project.image} alt={project.title} style={{ width: '100%', maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
                      ) : null}
                    </Box>
                  </Paper>
                );
              })}
            </Box>
          </Paper>
        </Box>

        {/* Slide: Skills */}
        <Box id="skills-section" sx={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 10, pb: 8, bgcolor: 'background.default', position: 'relative', overflow: 'hidden' }}>
          <Box sx={{ width: '100%', maxWidth: 1200, px: { xs: 2, md: 6 }, py: { xs: 6, md: 10 }, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <Typography variant="h2" sx={{ fontWeight: 700, color: 'text.primary', mb: 2, textAlign: 'center', width: '100%' }}>
              Skills
            </Typography>
            <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mt: 2 }}>
              {Object.entries(skills).map(([category, skillList]) => (
                <Paper key={category} elevation={0} sx={{ 
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' :'background.paper',
                  borderRadius: 4, 
                  p: 3, 
                  backdropFilter: 'blur(12px)', 
                  border: `1.5px solid ${alpha(theme.palette.text.primary, 0.13)}`, 
                  boxShadow: `0 8px 32px 0 ${alpha(theme.palette.text.primary, 0.12)}`,
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.045)',
                    boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.2)}, 0 6px 6px ${alpha(theme.palette.primary.main, 0.23)}`
                  }
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 2, textAlign: 'center' }}>
                    {category}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                    {skillList.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          bgcolor: accentBg,
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                          border: `1px solid ${theme.palette.primary.main}4D`, // 4D is hex for 30% opacity
                          '&:hover': {
                            bgcolor: `rgba(${parseInt(theme.palette.primary.main.slice(1, 3), 16)}, ${parseInt(theme.palette.primary.main.slice(3, 5), 16)}, ${parseInt(theme.palette.primary.main.slice(5, 7), 16)}, 0.25)`,
                            transform: 'scale(1.05)',
                          },
                          transition: 'all 0.2s cubic-bezier(.4,1.3,.6,1)',
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Slide: Music */}
        <MusicSection
          musicCarouselRef={musicCarouselRef}
          musicIndex={musicIndex}
          isMusicAtEnd={isMusicAtEnd}
          handleMusicPrev={handleMusicPrev}
          handleMusicNext={handleMusicNext}
          handleMusicCarouselScroll={handleMusicCarouselScroll}
        />

        {/* Slide 4: Let's Connect! */}
        <Box id="contact-section" sx={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 10, bgcolor: 'background.default' }}>
          <Box sx={{
            width: '100%',
            maxWidth: 1000,
            mx: 'auto',
            px: { xs: 2, md: 6 },
            py: { xs: 4, md: 7 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}>
            <Typography variant="h2" sx={{ fontWeight: 700, color: 'text.primary', mb: 2, textAlign: 'center', width: '100%' }}>
              Let's Connect!
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.primary', fontWeight: 500, mb: 4, textAlign: 'center', width: '100%', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
              Feel free to reach out regarding any opportunities, questions, or if you simply want to chop it up about music, manga, and/or more!
            </Typography>
            <Box sx={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2,
              mb: 0,
              justifyItems: 'center',
            }}>
              {/* Resume Card */}
              <Paper elevation={0} sx={{ 
                width: '100%', maxWidth: 280, minHeight: 90, 
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'background.paper', 
                borderRadius: 4, p: 2, display: 'flex', alignItems: 'center', gap: 1, 
                backdropFilter: 'blur(12px)', 
                border: `1.5px solid ${alpha(theme.palette.text.primary, 0.13)}`, 
                boxShadow: `0 8px 32px 0 ${alpha(theme.palette.text.primary, 0.12)}`, 
                transition: 'transform 0.2s cubic-bezier(.4,1.3,.6,1), box-shadow 0.2s cubic-bezier(.4,1.3,.6,1), background-color 0.3s ease-in-out', 
                textAlign: 'center', flexDirection: 'column', justifyContent: 'center',
                '&:hover': {
                  transform: 'scale(1.045)',
                  boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.2)}, 0 6px 6px ${alpha(theme.palette.primary.main, 0.23)}`
                },
                '& a:hover': {
                  textShadow: 'none !important',
                  textDecoration: 'underline',
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2, width: 48, height: 48 }}>
                  
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke={theme.palette.primary.main} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="3"/>
                    <path d="M9 6h6M9 10h6M9 14h2"/>
                  </svg>
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>Resumes</Typography>
                  <a href={`${basePath}/resumes/UserResearcherResume.pdf`} target="_blank" rel="noopener noreferrer" style={{ color: theme.palette.primary.main, fontWeight: 500, fontSize: '1.1rem', textDecoration: 'none' }}>User Researcher Resume</a>
                  <a href={`${basePath}/resumes/SoftwareResume.pdf`} target="_blank" rel="noopener noreferrer" style={{ color: theme.palette.primary.main, fontWeight: 500, fontSize: '1.1rem', textDecoration: 'none' }}>Software Developer Resume</a>
                </Box>
              </Paper>
              {/* Email Card */}
              <Paper elevation={0} sx={{ width: '100%', maxWidth: 280, minHeight: 90, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'background.paper', borderRadius: 4, p: 2, display: 'flex', alignItems: 'center', gap: 1, backdropFilter: 'blur(12px)', border: `1.5px solid ${alpha(theme.palette.text.primary, 0.13)}`, boxShadow: `0 8px 32px 0 ${alpha(theme.palette.text.primary, 0.12)}`, transition: 'transform 0.2s cubic-bezier(.4,1.3,.6,1), box-shadow 0.2s cubic-bezier(.4,1.3,.6,1), background-color 0.3s ease-in-out', textAlign: 'center', flexDirection: 'column', justifyContent: 'center',
                '&:hover': {
                  transform: 'scale(1.045)',
                  boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.2)}, 0 6px 6px ${alpha(theme.palette.primary.main, 0.23)}`
                },
                '& a:hover': {
                  textShadow: 'none !important',
                  textDecoration: 'underline',
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2, width: 48, height: 48 }}>
                  <svg width="32" height="32" fill="none" stroke={theme.palette.primary.main} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="24" height="14" rx="3"/><path d="M4 10l12 10 12-10"/></svg>
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>Emails</Typography>
                  <a href="mailto:www.rodney1@gmail.com" style={{ color: theme.palette.primary.main, fontWeight: 500, fontSize: '1.1rem', textDecoration: 'none', display: 'block' }}>www.rodney1@gmail.com</a>
                  <a href="mailto:Okyerero19@vt.edu" style={{ color: theme.palette.primary.main, fontWeight: 500, fontSize: '1.1rem', textDecoration: 'none', display: 'block' }}>Okyerero19@vt.edu</a>
                </Box>
              </Paper>
              {/* LinkedIn Card */}
              <Paper elevation={0} sx={{ width: '100%', maxWidth: 280, minHeight: 90, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'background.paper', borderRadius: 4, p: 2, display: 'flex', alignItems: 'center', gap: 1, backdropFilter: 'blur(12px)', border: `1.5px solid ${alpha(theme.palette.text.primary, 0.13)}`, boxShadow: `0 8px 32px 0 ${alpha(theme.palette.text.primary, 0.12)}`, transition: 'transform 0.2s cubic-bezier(.4,1.3,.6,1), box-shadow 0.2s cubic-bezier(.4,1.3,.6,1), background-color 0.3s ease-in-out', textAlign: 'center', flexDirection: 'column', justifyContent: 'center',
                '&:hover': {
                  transform: 'scale(1.045)',
                  boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.2)}, 0 6px 6px ${alpha(theme.palette.primary.main, 0.23)}`
                },
                '& a:hover': {
                  textShadow: 'none !important',
                  textDecoration: 'underline',
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2, width: 48, height: 48 }}>
                  
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="8" fill="#0077B5"/>
                    <path d="M12.5 16.5H16V28.5H12.5V16.5ZM14.25 14.5C13.29 14.5 12.5 13.71 12.5 12.75C12.5 11.79 13.29 11 14.25 11C15.21 11 16 11.79 16 12.75C16 13.71 15.21 14.5 14.25 14.5ZM18.5 16.5H22V18.1C22.56 17.13 23.7 16.5 25.09 16.5C28.09 16.5 28.5 18.29 28.5 21.09V28.5H25V21.75C25 20.42 25 18.75 23.25 18.75C21.5 18.75 21.5 20.25 21.5 21.75V28.5H18.5V16.5Z" fill="white"/>
                  </svg>
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>LinkedIn</Typography>
                  <a href="https://www.linkedin.com/in/rodney-okyere" target="_blank" rel="noopener" style={{ color: '#0077B5', fontWeight: 500, fontSize: '1.1rem', textDecoration: 'none' }}>@RodneyOkyere</a>
                </Box>
              </Paper>
              {/* GitHub Card */}
              <Paper elevation={0} sx={{ width: '100%', maxWidth: 280, minHeight: 90, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'background.paper', borderRadius: 4, p: 2, display: 'flex', alignItems: 'center', gap: 1, backdropFilter: 'blur(12px)', border: `1.5px solid ${alpha(theme.palette.text.primary, 0.13)}`, boxShadow: `0 8px 32px 0 ${alpha(theme.palette.text.primary, 0.12)}`, transition: 'transform 0.2s cubic-bezier(.4,1.3,.6,1), box-shadow 0.2s cubic-bezier(.4,1.3,.6,1), background-color 0.3s ease-in-out', textAlign: 'center', flexDirection: 'column', justifyContent: 'center',
                '&:hover': {
                  transform: 'scale(1.045)',
                  boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.2)}, 0 6px 6px ${alpha(theme.palette.primary.main, 0.23)}`
                },
                '& a:hover': {
                  textShadow: 'none !important',
                  textDecoration: 'underline',
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2, width: 48, height: 48 }}>
                  {/* Official GitHub SVG Icon */}
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#18171C"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 10C15.0294 10 11 14.0294 11 19C11 22.866 13.8656 26.0932 17.4375 27.0938C17.9375 27.1875 18.125 26.9062 18.125 26.6562C18.125 26.4375 18.1188 25.7938 18.1188 25.0438C15.75 25.5438 15.1875 24.0938 15.1875 24.0938C14.75 23.0438 14.125 22.7812 14.125 22.7812C13.25 22.2188 14.1875 22.2188 14.1875 22.2188C15.1562 22.2938 15.6562 23.2188 15.6562 23.2188C16.5 24.6875 17.9062 24.2812 18.4375 24.0312C18.5312 23.4062 18.7812 22.9688 19.0625 22.75C17.3125 22.5312 15.4375 21.8438 15.4375 18.9688C15.4375 18.1562 15.75 17.5 16.25 16.9688C16.1562 16.75 15.875 15.9062 16.3438 14.7812C16.3438 14.7812 17.0625 14.5312 18.125 15.375C18.8125 15.1875 19.5625 15.0938 20.3125 15.0938C21.0625 15.0938 21.8125 15.1875 22.5 15.375C23.5625 14.5312 24.2812 14.7812 24.2812 14.7812C24.75 15.9062 24.4688 16.75 24.375 16.9688C24.875 17.5 25.1875 18.1562 25.1875 18.9688C25.1875 21.8438 23.3125 22.5312 21.5625 22.75C21.9375 23.0312 22.25 23.5938 22.25 24.4062C22.25 25.5312 22.2375 26.3438 22.2375 26.6562C22.2375 26.9062 22.425 27.1875 22.9375 27.0938C26.5094 26.0932 29.375 22.866 29.375 19C29.375 14.0294 25.3456 10 20.375 10H20Z" fill="#fff"/>
                  </svg>
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>GitHub</Typography>
                  <a href="https://github.com/prismatiiic" target="_blank" rel="noopener" style={{ color: mode === 'dark' ? '#fff' : '#1d1d1f', fontWeight: 500, fontSize: '1.1rem', textDecoration: 'none' }}>@prismatiiic</a>
                </Box>
              </Paper>
            </Box>
            <Box sx={{ width: { xs: '100%', sm: 400 }, display: 'flex', justifyContent: 'center', mt: 0.2 }}>
              <Paper elevation={0} sx={{ width: '100%', maxWidth: 280, minHeight: 90, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'background.paper', borderRadius: 4, p: 2, display: 'flex', alignItems: 'center', gap: 1, backdropFilter: 'blur(12px)', border: `1.5px solid ${alpha(theme.palette.text.primary, 0.13)}`, boxShadow: `0 8px 32px 0 ${alpha(theme.palette.text.primary, 0.12)}`, transition: 'transform 0.2s cubic-bezier(.4,1.3,.6,1), box-shadow 0.2s cubic-bezier(.4,1.3,.6,1), background-color 0.3s ease-in-out', textAlign: 'center', flexDirection: 'column', justifyContent: 'center',
                '&:hover': {
                  transform: 'scale(1.045)',
                  boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.2)}, 0 6px 6px ${alpha(theme.palette.primary.main, 0.23)}`
                },
                '& a:hover': {
                  textShadow: 'none !important',
                  textDecoration: 'underline',
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2, width: 48, height: 48 }}>
                  
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 33.51" width="40" height="40"><g id="Layer_2" data-name="Layer 2"><g id="Orange"><path d="M75,23.6a10.5,10.5,0,0,1-10.63,9.91H38.82a2.14,2.14,0,0,1-2.12-2.13V3.87a2.34,2.34,0,0,1,1.41-2.24S40.46,0,45.41,0A16.74,16.74,0,0,1,54,2.36a17,17,0,0,1,8,11.08,9.8,9.8,0,0,1,2.71-.37A10.23,10.23,0,0,1,75,23.6Z" fill="#FF5500"/><path d="M33.51,5.61a.83.83,0,1,0-1.65,0c-.7,9.25-1.24,17.92,0,27.14a.83.83,0,0,0,1.65,0C34.84,23.45,34.28,14.94,33.51,5.61Z" fill="#FF5500"/><path d="M28.35,8.81a.87.87,0,0,0-1.73,0,103.7,103.7,0,0,0,0,23.95.87.87,0,0,0,1.72,0A93.2,93.2,0,0,0,28.35,8.81Z" fill="#FF5500"/><path d="M23.16,8a.84.84,0,0,0-1.67,0c-.79,8.44-1.19,16.32,0,24.74a.83.83,0,0,0,1.66,0C24.38,24.21,24,16.55,23.16,8Z" fill="#FF5500"/><path d="M18,10.41a.86.86,0,0,0-1.72,0,87.61,87.61,0,0,0,0,22.36.85.85,0,0,0,1.69,0A81.68,81.68,0,0,0,18,10.41Z" fill="#FF5500"/><path d="M12.79,16a.85.85,0,0,0-1.7,0c-1.23,5.76-.65,11,.05,16.83a.81.81,0,0,0,1.6,0C13.51,26.92,14.1,21.8,12.79,16Z" fill="#FF5500"/><path d="M7.62,15.12a.88.88,0,0,0-1.75,0C4.78,21,5.14,26.18,5.9,32.05c.08.89,1.59.88,1.69,0C8.43,26.09,8.82,21.06,7.62,15.12Z" fill="#FF5500"/><path d="M2.4,18A.88.88,0,0,0,.65,18c-1,3.95-.69,7.22.07,11.18a.82.82,0,0,0,1.63,0C3.23,25.14,3.66,21.94,2.4,18Z" fill="#FF5500"/></g></g></svg>
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>SoundCloud</Typography>
                  <a href="https://soundcloud.com/mgf221" target="_blank" rel="noopener" style={{ color: '#FF5500', fontWeight: 500, fontSize: '1.1rem', textDecoration: 'none' }}>@RKO</a>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
} 