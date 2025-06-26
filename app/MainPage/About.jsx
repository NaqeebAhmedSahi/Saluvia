'use client';

import React, { useRef } from 'react';
import { Box, Typography, Container, useTheme, Button, Stack } from '@mui/material';
import { motion, useInView, useAnimation } from 'framer-motion';
import Image from 'next/image';

const CompanyIntroSection = () => {
  const theme = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const controls = useAnimation();

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

  const textVariants = {
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

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -5 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: [0.1, 0.7, 0.3, 1],
        delay: 0.3
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [-10, 10],
      transition: {
        y: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      }
    }
  };

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 0.4, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <Box sx={{
      position: 'relative',
      overflow: 'hidden',
      py: { xs: 8, md: 15 },
      background: `linear-gradient(135deg, #0a0a0a 0%, ${theme.palette.primary.dark} 100%, ${theme.palette.primary.main} 50%)`,
      color: '#fff'
    }} ref={ref}>
      {/* Glow effects */}
      <motion.div
        variants={glowVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: theme.palette.secondary.main,
          filter: 'blur(100px)',
          zIndex: 0
        }}
      />
      
      <motion.div
        variants={glowVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: theme.palette.primary.light,
          filter: 'blur(100px)',
          zIndex: 0
        }}
      />

      <Container maxWidth="lg">
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 6,
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Text content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div variants={textVariants}>
              <Typography variant="overline" sx={{
                mb: 2,
                display: 'block',
                fontWeight: 'bold',
                letterSpacing: '3px',
                color: 'rgba(255,255,255,0.8)'
              }}>
                INNOVATING HEALTHCARE
              </Typography>
            </motion.div>

            <motion.div variants={textVariants}>
              <Typography variant="h2" sx={{
                mb: 3,
                fontWeight: 'bold',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2,
                textShadow: '0 4px 20px rgba(0,0,0,0.2)'
              }}>
                Pioneering <span style={{ color: '#000' }}>Medical</span> Technology Solutions
              </Typography>
            </motion.div>

            <motion.div variants={textVariants}>
              <Typography variant="body1" sx={{
                mb: 4,
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '90%'
              }}>
                At MedTech Innovations, we're revolutionizing healthcare through cutting-edge technology. 
                Our team of experts combines medical expertise with advanced engineering to create solutions 
                that improve patient outcomes and streamline clinical workflows.
              </Typography>
            </motion.div>

            <Stack direction="row" spacing={3} sx={{ mt: 4 }}>
              <motion.div
                variants={textVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                //   color="black"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    backgroundColor: '#000', 
                    textTransform: 'none',
                    fontSize: '1rem',
                    boxShadow: `0 8px 24px ${theme.palette.secondary.main}40`,
                  }}
                >
                  Our Products
                </Button>
              </motion.div>
              
              <motion.div
                variants={textVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '1rem',
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,0.3)',
                    '&:hover': {
                      borderColor: '#fff',
                      background: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Learn More
                </Button>
              </motion.div>
            </Stack>
          </motion.div>

          {/* Image content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            style={{ position: 'relative', height: '100%' }}
          >
            {/* Main image */}
            <motion.div 
              variants={imageVariants}
              style={{
                position: 'relative',
                height: '500px',
                width: '100%',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
                transform: 'perspective(1000px) rotateX(5deg) rotateY(-5deg)',
                transformStyle: 'preserve-3d'
              }}
            >
              <Image
                src="/images/slider1.jpg" // Replace with your image
                alt="Medical Technology"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Floating elements */}
            <motion.div
              variants={floatingVariants}
              animate="float"
              style={{
                position: 'absolute',
                top: '-50px',
                right: '-30px',
                width: '150px',
                height: '150px',
                zIndex: -1
              }}
            >
              <Image
                 src="/images/slider1.jpg" // Replace with decorative icon
                alt="Technology Icon"
                width={150}
                height={150}
                className="object-contain"
              />
            </motion.div>

            <motion.div
              variants={floatingVariants}
              animate="float"
              transition={{ delay: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '-40px',
                left: '-30px',
                width: '120px',
                height: '120px',
                zIndex: -1
              }}
            >
              <Image
                src="/images/slider1.jpg"  // Replace with decorative icon
                alt="Technology Icon"
                width={120}
                height={120}
                className="object-contain"
              />
            </motion.div>

            {/* Stats cards */}
            <motion.div
              variants={imageVariants}
              style={{
                position: 'absolute',
                bottom: '-40px',
                right: '40px',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                width: '180px'
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black' }}>
                15+
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Years of Innovation
              </Typography>
            </motion.div>
          </motion.div>
        </Box>
      </Container>

      {/* Animated particles background */}
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <motion.div
          key={i}
          initial={{ y: 0, x: Math.random() * 100 - 50, opacity: 0 }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 0.4, 0],
            transition: {
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 5
            }
          }}
          style={{
            position: 'absolute',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: '#fff',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 0
          }}
        />
      ))}
    </Box>
  );
};

export default CompanyIntroSection;