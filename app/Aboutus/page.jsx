'use client';

import React from 'react';
import { Box, Typography, Container, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <Box sx={{
      background: 'linear-gradient(to bottom, #000000, #1a1a1a, #000000)',
      color: 'white',
      py: 10,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Container maxWidth="xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              lineHeight: 1.2,
              mb: 2
            }}>
              About Us
            </Typography>
            <Typography variant="subtitle1" sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '1.25rem',
              maxWidth: '800px',
              mx: 'auto',
              mb: 3
            }}>
              Excellence in Medical Instruments for Over 20 Years
            </Typography>
            <Box sx={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(to right, #00ff88, #0099ff)',
              mx: 'auto',
              borderRadius: '2px'
            }} />
          </motion.div>
        </motion.div>

        {/* Content Section */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 10 }}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Typography variant="h3" sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 'bold',
                mb: 3
              }}>
                Precision, Experience, and Trust
              </Typography>
              <Typography variant="body1" sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: 1.8,
                mb: 3
              }}>
                For over two decades, we have been revolutionizing the medical instruments industry with cutting-edge designs and top-notch quality. Our tools are engineered with precision to support healthcare professionals globally.
              </Typography>
              <Box component="ul" sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                pl: 2,
                mb: 4,
                '& li': {
                  mb: 1,
                  lineHeight: 1.6
                }
              }}>
                <li>High-quality medical instruments for various healthcare disciplines</li>
                <li>Trusted by top medical professionals and healthcare institutions</li>
                <li>Continuous innovation to meet modern healthcare needs</li>
              </Box>
              <Button
                variant="contained"
                href="/contact"
                sx={{
                  background: 'linear-gradient(to right, #00ff88, #0099ff)',
                  color: 'black',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(0, 255, 136, 0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Learn More
              </Button>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}
            >
              <Box sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7))',
                zIndex: 1
              }} />
              <Image
                src="/images/slider1.jpg"
                alt="Medical Instruments"
                width={800}
                height={600}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: '12px'
                }}
              />
              <Box sx={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                zIndex: 2
              }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Excellence in Every Instrument
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Built with precision, trusted by professionals.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Core Values Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginTop: '5rem', textAlign: 'center' }}
        >
          <Typography variant="h3" sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 'bold',
            mb: 6
          }}>
            Our Core Values
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: "Quality",
                description: "We ensure that every instrument meets the highest industry standards, guaranteeing durability and precision."
              },
              {
                title: "Innovation",
                description: "Our research-driven approach allows us to deliver cutting-edge medical instruments for modern healthcare needs."
              },
              {
                title: "Integrity",
                description: "We are committed to ethical practices and building trust with every product we deliver."
              }
            ].map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  style={{ height: '100%' }}
                >
                  <Box sx={{
                    p: 4,
                    height: '100%',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.06)',
                      boxShadow: '0 10px 30px rgba(0, 255, 136, 0.1)'
                    }
                  }}>
                    <Typography variant="h4" sx={{
                      fontWeight: 'bold',
                      mb: 2,
                      color: '#00ff88'
                    }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body1" sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: 1.7
                    }}>
                      {value.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Stats Section */}
        <Box sx={{
          mt: 10,
          textAlign: 'center'
        }}>
          <Grid container spacing={4}>
            {[
              { value: "20+", label: "Years of Experience" },
              { value: "50+", label: "Countries Served" },
              { value: "10K+", label: "Happy Clients" }
            ].map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <Typography variant="h2" sx={{
                    fontWeight: 'bold',
                    color: '#00ff88',
                    mb: 1
                  }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" sx={{
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}>
                    {stat.label}
                  </Typography>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginTop: '5rem' }}
        >
          <Box sx={{
            background: 'linear-gradient(to right, #007350, #005a8c)',
            color: 'white',
            py: 6,
            px: 4,
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
          }}>
            <Typography variant="h3" sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 'bold',
              mb: 3
            }}>
              Ready to Elevate Medical Precision?
            </Typography>
            <Typography variant="body1" sx={{
              fontSize: '1.1rem',
              mb: 4,
              maxWidth: '700px',
              mx: 'auto',
              color: 'rgba(255, 255, 255, 0.9)'
            }}>
              Discover how our instruments can transform patient care in your practice.
            </Typography>
            <Button
              variant="contained"
              href="/contact"
              sx={{
                backgroundColor: 'white',
                color: 'black',
                fontWeight: 'bold',
                px: 5,
                py: 1.5,
                borderRadius: '8px',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  backgroundColor: '#f0f0f0',
                  boxShadow: '0 4px 20px rgba(255, 255, 255, 0.2)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Contact Us Today
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AboutPage;