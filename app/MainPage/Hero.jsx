'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton,
  useTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, PlayArrow, Pause } from '@mui/icons-material';

const heroSlides = [
  {
    id: 1,
    title: "Precision Diagnostic Equipment",
    subtitle: "Advanced imaging solutions for accurate diagnoses",
    description: "Cutting-edge MRI, CT, and ultrasound systems with AI-assisted analysis",
    image: "/images/slider1.jpg",
    color: "from-blue-600/90 to-blue-800/90",
    cta: "Explore Imaging"
  },
  {
    id: 2,
    title: "Surgical Innovation",
    subtitle: "Next-generation operating room technology",
    description: "Robotic-assisted surgical systems with enhanced precision and control",
    image: "/images/slider1.jpg",
    color: "from-emerald-600/90 to-emerald-800/90",
    cta: "View Surgical Tools"
  },
  {
    id: 3,
    title: "Patient Monitoring",
    subtitle: "Smart monitoring for better outcomes",
    description: "Real-time vital sign tracking with predictive analytics",
    image: "/images/slider1.jpg",
    color: "from-violet-600/90 to-violet-800/90",
    cta: "See Monitors"
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const controls = useAnimation();
  const textControls = useAnimation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const sliderRef = useRef(null);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    resetTimeout();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    resetTimeout();
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    resetTimeout();
  };

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (isPlaying) {
      timeoutRef.current = setTimeout(nextSlide, 6000);
    }
  };

  useEffect(() => {
    resetTimeout();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentSlide, isPlaying]);

  useEffect(() => {
    // Reset text animations on slide change
    textControls.set(i => ({
      opacity: 0,
      scale: 1.5,
      y: 20
    }));

    // Start new animations
    controls.start({
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 }
    });

    textControls.start(i => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }));
  }, [currentSlide, controls, textControls]);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: 100,
      rotateY: -30,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      rotateY: 30,
      scale: 0.8,
      transition: { duration: 0.5 }
    }
  };

  const bgVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1 }
    }
  };

  // Split text into words for animation
  const titleWords = heroSlides[currentSlide].title.split(" ");
  const subtitleWords = heroSlides[currentSlide].subtitle.split(" ");
  const descriptionWords = heroSlides[currentSlide].description.split(" ");

  return (
    <Box 
      className="relative h-screen overflow-hidden"
      ref={sliderRef}
    >
      {/* Background Layer */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={heroSlides[currentSlide].id}
          variants={bgVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={`absolute inset-0 bg-gradient-to-b ${heroSlides[currentSlide].color} z-0`}
        >
          <motion.img
            src={heroSlides[currentSlide].image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1 }}
          />
          
          {/* Animated floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50]
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 5
              }}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 5 + 2}px`,
                height: `${Math.random() * 5 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <Box className="relative z-10 h-full flex items-center">
        <Container maxWidth="lg" className="py-20">
          <Box className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              key={`text-${heroSlides[currentSlide].id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white"
            >
              {/* Subtitle with word-by-word animation */}
              <Typography 
                variant="overline" 
                className="block mb-4 font-medium tracking-wider"
                sx={{ color: 'rgba(255,255,255,0.8)' }}
                component="div"
              >
                {subtitleWords.map((word, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    initial={{ opacity: 0, scale: 1.5, y: 20 }}
                    animate={textControls}
                    className="inline-block mr-2"
                  >
                    {word}
                  </motion.span>
                ))}
              </Typography>
              
              {/* Title with dazzling word animation */}
              <Typography 
                variant={isMobile ? 'h3' : 'h2'} 
                component="h1"
                className="font-bold mb-6 leading-tight"
                sx={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                {titleWords.map((word, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    initial={{ opacity: 0, scale: 2, y: 40 }}
                    animate={textControls}
                    transition={{ 
                      type: "spring",
                      damping: 10,
                      stiffness: 100,
                      delay: i * 0.1 + 0.3
                    }}
                    className="inline-block mr-3"
                    style={{
                      display: 'inline-block',
                      background: i % 2 === 0 
                        ? 'linear-gradient(90deg, #ffffff, #c2e9fb)'
                        : 'linear-gradient(90deg, #c2e9fb, #ffffff)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </Typography>
              
              {/* Description with staggered animation */}
              <Typography 
                variant="h6" 
                className="mb-8 max-w-lg"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 400
                }}
                component="div"
              >
                {descriptionWords.map((word, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    initial={{ opacity: 0, scale: 1.3 }}
                    animate={textControls}
                    transition={{ 
                      delay: i * 0.05 + 0.6,
                      type: "spring",
                      stiffness: 300
                    }}
                    className="inline-block mr-2"
                  >
                    {word}
                  </motion.span>
                ))}
              </Typography>
              
              <Box className="flex flex-wrap gap-4">
                <motion.div 
                  key={`button1-${heroSlides[currentSlide].id}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className="bg-white text-blue-800 hover:bg-gray-100"
                    sx={{
                      borderRadius: '8px',
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  >
                    {heroSlides[currentSlide].cta}
                  </Button>
                </motion.div>
                
                <motion.div 
                  key={`button2-${heroSlides[currentSlide].id}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1, type: "spring" }}
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    className="text-white border-white hover:bg-white/10"
                    sx={{
                      borderRadius: '8px',
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      borderWidth: 2
                    }}
                  >
                    Request Demo
                  </Button>
                </motion.div>
              </Box>
            </motion.div>

            {/* 3D Card Slider */}
            <div className="relative h-96 lg:h-[500px]">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={`card-${heroSlides[currentSlide].id}`}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute inset-0 bg-white rounded-2xl shadow-2xl overflow-hidden"
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                >
                  <img 
                    src={heroSlides[currentSlide].image} 
                    alt={heroSlides[currentSlide].title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Floating badge */}
                  <motion.div
                    key={`badge-${heroSlides[currentSlide].id}`}
                    initial={{ opacity: 0, y: 20, rotate: -10 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ delay: 1.2, type: "spring" }}
                    className="absolute top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
                  >
                    <Typography variant="caption" className="font-bold">
                      New Technology
                    </Typography>
                  </motion.div>
                  
                  {/* Card reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  
                  {/* Holographic effect */}
                  <motion.div
                    key={`holographic-${heroSlides[currentSlide].id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 1.5 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${heroSlides[currentSlide].color.replace('from-', '').split(' ')[0]} 0%, transparent 100%)`,
                      mixBlendMode: 'overlay'
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </Box>
        </Container>
      </Box>

      {/* Controls */}
      <Box className="absolute bottom-8 left-0 right-0 z-20">
        <Container maxWidth="lg">
          <Box className="flex items-center justify-between">
            {/* Dots */}
            <div className="flex gap-2">
              {heroSlides.map((slide, index) => (
                <motion.button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: currentSlide === index ? 1.3 : 1,
                    backgroundColor: currentSlide === index ? '#ffffff' : 'rgba(255,255,255,0.5)'
                  }}
                  className={`w-3 h-3 rounded-full transition-all`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Navigation */}
            <Box className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconButton
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white bg-black/20 hover:bg-black/30"
                  size="medium"
                  sx={{
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>
              </motion.div>
              
              <Box className="flex gap-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    onClick={prevSlide}
                    className="text-white bg-black/20 hover:bg-black/30"
                    size="medium"
                    sx={{
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <ChevronLeft />
                  </IconButton>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    onClick={nextSlide}
                    className="text-white bg-black/20 hover:bg-black/30"
                    size="medium"
                    sx={{
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <ChevronRight />
                  </IconButton>
                </motion.div>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Decorative elements */}
      <motion.div 
        key={`decorative-${heroSlides[currentSlide].id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1 }}
        className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-white blur-3xl -translate-x-1/2 -translate-y-1/2"
      />
      
      {/* Floating tech circles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`circle-${i}-${heroSlides[currentSlide].id}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ delay: i * 0.3 + 0.5, duration: 1 }}
          className="absolute border border-white/20 rounded-full pointer-events-none"
          style={{
            width: `${200 + i * 200}px`,
            height: `${200 + i * 200}px`,
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%)`
          }}
        />
      ))}
    </Box>
  );
};

export default HeroSection;