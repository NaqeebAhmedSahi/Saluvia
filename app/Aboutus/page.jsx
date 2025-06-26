'use client';

import React, { useRef } from 'react';
import { Box, Typography, Container, useTheme, Grid, Avatar, Stack, Button } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const AboutUsPage = () => {
  const theme = useTheme();
  
  // Create separate refs for each section
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const missionRef = useRef(null);
  const teamRef = useRef(null);
  
  // Separate inView checks for each section
  const isHeroInView = useInView(heroRef, { once: false, margin: '-100px' });
  const isStatsInView = useInView(statsRef, { once: false, margin: '-100px' });
  const isValuesInView = useInView(valuesRef, { once: false, margin: '-100px' });
  const isMissionInView = useInView(missionRef, { once: false, margin: '-100px' });
  const isTeamInView = useInView(teamRef, { once: false, margin: '-100px' });

  // Core values data
  const coreValues = [
    {
      icon: '🧬',
      title: 'Innovation',
      description: 'Pioneering cutting-edge medical solutions'
    },
    {
      icon: '❤️',
      title: 'Patient Care',
      description: 'Putting patient outcomes at the forefront'
    },
    {
      icon: '🌎',
      title: 'Global Reach',
      description: 'Serving healthcare needs worldwide'
    },
    {
      icon: '🔬',
      title: 'Research',
      description: 'Continuous advancement through R&D'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const fadeInUp = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.1, 0.7, 0.3, 1]
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  };

  const statItemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.1, 0.7, 0.3, 1]
      }
    })
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      overflow: 'hidden',
      background: '#0a0a0a',
      color: '#fff'
    }}>
      {/* Hero Section - with its own ref and inView check */}
      <Box 
        ref={heroRef}
        sx={{
          pt: 15,
          pb: 10,
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(135deg, #0a0a0a 0%, ${theme.palette.primary.dark} 100%)`
        }}
      >
        {/* Glow effects */}
        <Box sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: theme.palette.primary.main,
          filter: 'blur(100px)',
          zIndex: 0,
          opacity: 0.2
        }} />
        
        <Box sx={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: theme.palette.secondary.main,
          filter: 'blur(80px)',
          zIndex: 0,
          opacity: 0.2
        }} />

        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div variants={fadeInUp}>
              <Typography variant="overline" sx={{
                mb: 2,
                display: 'block',
                fontWeight: 'bold',
                letterSpacing: '3px',
                color: 'rgba(255,255,255,0.8)'
              }}>
                OUR JOURNEY
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography variant="h2" sx={{
                mb: 3,
                fontWeight: 'bold',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2
              }}>
                Transforming <span style={{ color: theme.palette.primary.main }}>Healthcare</span> Through Innovation
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography variant="body1" sx={{
                mb: 4,
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '700px'
              }}>
                Founded in 2002, MedTech Innovations has grown from a small startup to a global leader in medical technology. 
                Our journey has been marked by groundbreaking discoveries and an unwavering commitment to improving patient care.
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  backgroundColor: '#000',
                  color: '#fff',
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': {
                    backgroundColor: '#111'
                  }
                }}
              >
                Learn Our Story
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Stats Section - with its own ref and inView check */}
      <Box 
        ref={statsRef}
        sx={{ 
          py: 10,
          position: 'relative',
          background: '#111'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate={isStatsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <Grid container spacing={4} justifyContent="center">
              {[
                { number: '20+', label: 'Years of Experience' },
                { number: '50+', label: 'Countries Served' },
                { number: '10,000+', label: 'Happy Clients' }
              ].map((stat, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <motion.div
                    custom={i}
                    variants={statItemVariants}
                  >
                    <Box sx={{
                      background: 'rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '16px',
                      p: 4,
                      height: '100%',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        background: 'rgba(255,255,255,0.1)'
                      }
                    }}>
                      <Typography variant="h2" sx={{ 
                        fontWeight: 'bold',
                        color: theme.palette.primary.main,
                        mb: 2
                      }}>
                        {stat.number}
                      </Typography>
                      <Typography variant="h6" sx={{ 
                        color: 'rgba(255,255,255,0.8)',
                        fontWeight: 'medium'
                      }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Core Values Section - with its own ref and inView check */}
      <Box 
        ref={valuesRef}
        sx={{ 
          py: 10,
          position: 'relative',
          background: '#0a0a0a'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate={isValuesInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '60px' }}>
              <Typography variant="overline" sx={{
                mb: 2,
                display: 'block',
                fontWeight: 'bold',
                letterSpacing: '3px',
                color: theme.palette.primary.main
              }}>
                OUR FOUNDATION
              </Typography>
              <Typography variant="h3" sx={{ 
                fontWeight: 'bold',
                mb: 3
              }}>
                Core <span style={{ color: theme.palette.primary.main }}>Values</span>
              </Typography>
            </motion.div>

            <Grid container spacing={4}>
              {coreValues.map((value, i) => (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <motion.div
                    custom={i}
                    variants={statItemVariants}
                  >
                    <Box sx={{
                      background: '#111',
                      borderRadius: '16px',
                      p: 4,
                      height: '100%',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: `0 15px 40px ${theme.palette.primary.main}20`
                      }
                    }}>
                      <Avatar sx={{ 
                        width: 80, 
                        height: 80, 
                        mb: 3,
                        background: 'rgba(255,255,255,0.1)',
                        color: theme.palette.primary.main,
                        fontSize: '2rem'
                      }}>
                        {value.icon}
                      </Avatar>
                      <Typography variant="h5" sx={{ 
                        fontWeight: 'bold',
                        mb: 2,
                        color: '#fff'
                      }}>
                        {value.title}
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        color: 'rgba(255,255,255,0.7)'
                      }}>
                        {value.description}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Mission Section - with its own ref and inView check */}
      <Box 
        ref={missionRef}
        sx={{ 
          py: 15,
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(to right, #0a0a0a 0%, ${theme.palette.primary.dark} 100%)`
        }}
      >
        <Container maxWidth="lg">
          <Grid container alignItems="center" spacing={6}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                animate={isMissionInView ? "visible" : "hidden"}
                variants={containerVariants}
              >
                <motion.div variants={fadeInUp}>
                  <Typography variant="overline" sx={{
                    mb: 2,
                    display: 'block',
                    fontWeight: 'bold',
                    letterSpacing: '3px',
                    color: theme.palette.primary.main
                  }}>
                    OUR MISSION
                  </Typography>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Typography variant="h3" sx={{ 
                    fontWeight: 'bold',
                    mb: 3,
                    color: '#fff'
                  }}>
                    Advancing <span style={{ color: theme.palette.primary.main }}>Medical</span> Technology
                  </Typography>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Typography variant="body1" sx={{ 
                    mb: 4,
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '1.1rem',
                    lineHeight: 1.8
                  }}>
                    We're committed to developing innovative solutions that address the most pressing challenges in healthcare. 
                    Our team of experts works tirelessly to bridge the gap between medical needs and technological possibilities.
                  </Typography>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      backgroundColor: '#000',
                      color: '#fff',
                      textTransform: 'none',
                      fontSize: '1rem',
                      '&:hover': {
                        backgroundColor: '#111'
                      }
                    }}
                  >
                    Our Technologies
                  </Button>
                </motion.div>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                animate={isMissionInView ? "visible" : "hidden"}
                variants={scaleIn}
                style={{
                  position: 'relative',
                  height: '400px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
              >
                <Image
                  src="/images/slider1.jpg"
                  alt="Medical Technology"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Team Section - with its own ref and inView check */}
      <Box 
        ref={teamRef}
        sx={{ 
          py: 10,
          position: 'relative',
          background: '#0a0a0a'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate={isTeamInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '60px' }}>
              <Typography variant="overline" sx={{
                mb: 2,
                display: 'block',
                fontWeight: 'bold',
                letterSpacing: '3px',
                color: theme.palette.primary.main
              }}>
                MEET THE TEAM
              </Typography>
              <Typography variant="h3" sx={{ 
                fontWeight: 'bold',
                mb: 3,
                color: '#fff'
              }}>
                Our <span style={{ color: theme.palette.primary.main }}>Leadership</span>
              </Typography>
              <Typography variant="body1" sx={{ 
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '700px',
                margin: '0 auto'
              }}>
                The brilliant minds driving innovation and excellence in medical technology.
              </Typography>
            </motion.div>

            <Grid container spacing={4} justifyContent="center">
              {[1, 2, 3, 4].map((_, i) => (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <motion.div
                    custom={i}
                    variants={statItemVariants}
                  >
                    <Box sx={{
                      background: '#111',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)'
                      }
                    }}>
                      <Box sx={{ 
                        height: '250px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <Image
                          src="/images/slider1.jpg"
                          alt="Team Member"
                          fill
                          className="object-cover"
                        />
                      </Box>
                      <Box sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
                          Dr. Sarah Johnson
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.primary.main }}>
                          Chief Medical Officer
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutUsPage;