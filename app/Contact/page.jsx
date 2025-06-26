'use client';

import React, { useRef } from 'react';
import { Box, Typography, Container, useTheme, Button, TextField, Grid } from '@mui/material';
import { motion, useInView, useAnimation } from 'framer-motion';
import Image from 'next/image';
// import { Mail, Phone, MapPin } from 'react-feather';
import Mail from '@mui/icons-material/Mail';
import Phone from '@mui/icons-material/Phone';
import MapPin from '@mui/icons-material/LocationOn';

const ContactPage = () => {
  const theme = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
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

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.1, 0.7, 0.3, 1]
      }
    }
  };

  const imageVariants = {
    hidden: { x: -50, opacity: 0, rotate: -3 },
    visible: {
      x: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.1, 0.7, 0.3, 1]
      }
    }
  };

  const contactCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.15,
        duration: 0.6,
        type: 'spring',
        stiffness: 100
      }
    })
  };

  return (
    <Container maxWidth="lg" sx={{ py: 12 }} ref={ref}>
      {/* Grid Layout */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 8,
        alignItems: 'center'
      }}>
        {/* Image Column - Animated on scroll */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          style={{ position: 'relative', height: '100%', minHeight: '450px' }}
        >
          {/* Main Image */}
          <motion.div variants={imageVariants} style={{ height: '100%', width: '100%', position: 'relative' }}>
            <Image
              src="/images/slider1.jpg" // Replace with your contact image
              alt="Our contact information"
              fill
              className="object-cover rounded-xl shadow-2xl"
              priority
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                transform: 'perspective(1000px) rotateX(5deg) rotateY(0deg) scale(0.98)',
                transformStyle: 'preserve-3d',
                willChange: 'transform'
              }}
            />
          </motion.div>

          {/* Floating contact cards */}
          <motion.div
            variants={contactCardVariants}
            custom={0}
            style={{
              position: 'absolute',
              bottom: '-40px',
              left: '20px',
              width: 'calc(100% - 40px)',
              padding: '24px',
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '16px',
              boxShadow: theme.shadows[10],
              zIndex: 2,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' ,  color: 'text.secondary',}}>
              Contact Information
            </Typography>

            <Grid container spacing={2}>
              {[
                { icon: <Mail size={20} />, title: 'Email', value: 'info@medicaltech.com' },
                { icon: <Phone size={20} />, title: 'Phone', value: '+1 (555) 123-4567' },
                { icon: <MapPin size={20} />, title: 'Address', value: '123 Medical Ave, Boston, MA 02115' }
              ].map((item, index) => (
                <Grid item xs={12} key={index}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Box sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: theme.palette.primary.light,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme.palette.primary.main
                    }}>
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{
                        color: 'text.secondary',
                        fontSize: '0.75rem',
                        fontWeight: 'medium',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        display: 'block'
                      }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' , color: 'text.secondary', }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: theme.palette.primary.light,
              filter: 'blur(40px)',
              zIndex: 0,
              opacity: 0.6
            }}
          />
        </motion.div>

        {/* Form Column */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Typography variant="overline" color="primary" sx={{
              mb: 2,
              display: 'block',
              fontWeight: 'bold',
              letterSpacing: '2px'
            }}>
              GET IN TOUCH
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography variant="h3" sx={{
              mb: 3,
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '2.5rem' },
              lineHeight: 1.2
            }}>
              Let's Talk About <span style={{ color: theme.palette.primary.main }}>Your Needs</span>
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography variant="body1" sx={{
              mb: 4,
              fontSize: '1.1rem',
              lineHeight: 1.7
            }}>
              Have questions about our medical equipment or services? Fill out the form and our team will get back to you within 24 hours.
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    variant="outlined"
                    InputLabelProps={{
                      sx: { color: '#fff' }, // Label color
                    }}
                    InputProps={{
                      sx: {
                        color: '#fff', // Input text color
                        borderRadius: '12px',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.2)', // White-ish border
                        },
                        '&:hover fieldset': {
                          borderColor: '#fff',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    InputLabelProps={{
                      sx: { color: '#fff' },
                    }}
                    InputProps={{
                      sx: {
                        color: '#fff',
                        borderRadius: '12px',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#fff',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    variant="outlined"
                    InputLabelProps={{
                      sx: { color: '#fff' },
                    }}
                    InputProps={{
                      sx: {
                        color: '#fff',
                        borderRadius: '12px',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#fff',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Message"
                    variant="outlined"
                    multiline
                    rows={4}
                    InputLabelProps={{
                      sx: { color: '#fff' },
                    }}
                    InputProps={{
                      sx: {
                        color: '#fff',
                        borderRadius: '12px',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#fff',
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '1rem',
                    alignSelf: 'flex-start',
                    color: '#fff', // Button text color white
                    boxShadow: `0 4px 20px ${theme.palette.primary.main}40`,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 6px 25px ${theme.palette.primary.main}60`,
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Send Message
                </Button>
              </motion.div>
            </Box>

          </motion.div>
        </motion.div>
      </Box>
    </Container>
  );
};

export default ContactPage;