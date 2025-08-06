'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton,
  useTheme,
  useMediaQuery,
  Container,
  Card,
  CardContent,
  CardMedia,
  Skeleton
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Favorite, Share } from '@mui/icons-material';

const Product = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const carouselRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Number of items to show at once
  const itemsToShow = isMobile ? 1 : 4;

  useEffect(() => {
    async function fetchSubcategories() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories`);
        if (!response.ok) throw new Error('Failed to fetch subcategories');
        const data = await response.json();
        if (Array.isArray(data)) {
          setSubcategories(data);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setError(error.message);
        setSubcategories([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSubcategories();
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prev => 
      prev >= subcategories.length - itemsToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prev => 
      prev <= 0 ? subcategories.length - itemsToShow : prev - 1
    );
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.5 }
    }
  };

  const shimmerVariants = {
    initial: { backgroundPosition: '-200% 0' },
    animate: { 
      backgroundPosition: '200% 0',
      transition: { 
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  const visibleItems = subcategories.slice(currentIndex, currentIndex + itemsToShow);

  if (error) {
    return (
      <Box className="py-20 text-center">
        <Typography variant="h5" color="error">
          Error loading subcategories: {error}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ delay: 1 }}
        className="absolute left-1/4 top-0 w-64 h-64 rounded-full bg-blue-400 blur-3xl -z-10"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ delay: 1.2 }}
        className="absolute right-1/4 bottom-0 w-64 h-64 rounded-full bg-purple-400 blur-3xl -z-10"
      />
      
      <Container maxWidth="xl" ref={carouselRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Typography 
            variant="overline" 
            className="block mb-2 font-medium tracking-wider"
            sx={{ color: 'primary.main' }}
          >
            Medical Equipment Categories
          </Typography>
          <Typography 
            variant={isMobile ? 'h3' : 'h2'} 
            component="h2"
            className="font-bold mb-4"
            sx={{
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Specialized Instruments
          </Typography>
        </motion.div>

        {/* Carousel Container */}
        <Box className="relative">
          {/* Navigation Arrows */}
          {!loading && subcategories.length > itemsToShow && (
            <>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10"
              >
                <IconButton
                  onClick={prevSlide}
                  sx={{ 
                    backgroundColor: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    '&:hover': { backgroundColor: 'grey.100' }
                  }}
                >
                  <ChevronLeft sx={{ fontSize: '2rem', color: 'primary.main' }} />
                </IconButton>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10"
              >
                <IconButton
                  onClick={nextSlide}
                  sx={{ 
                    backgroundColor: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    '&:hover': { backgroundColor: 'grey.100' }
                  }}
                >
                  <ChevronRight sx={{ fontSize: '2rem', color: 'primary.main' }} />
                </IconButton>
              </motion.div>
            </>
          )}

          {/* Carousel Items */}
          <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-2">
            {loading ? (
              Array.from({ length: itemsToShow }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  style={{
                    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                    backgroundSize: '400% 100%',
                    borderRadius: '12px',
                    height: '320px'
                  }}
                />
              ))
            ) : (
              <AnimatePresence mode="wait">
                {visibleItems.map((item, index) => (
                  <motion.div
                    key={item.id || index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    variants={cardVariants}
                    onHoverStart={() => setHoveredCard(item.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="h-full"
                  >
                    <Card 
                      sx={{ 
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        border: '1px solid rgba(0,0,0,0.05)'
                      }}
                    >
                      {/* Image with hover effect */}
                      <motion.div
                        variants={imageVariants}
                        style={{ overflow: 'hidden', height: '180px', position: 'relative' }}
                      >
                        <CardMedia
                          component="img"
                          image={item.image_path || '/images/medical-placeholder.jpg'}
                          alt={item.title}
                          sx={{ 
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease'
                          }}
                        />
                        
                        {/* Category badge */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          sx={{
                            position: 'absolute',
                            bottom: 16,
                            left: 16,
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {item.category}
                        </motion.div>
                        
                        {/* Action buttons */}
                        <Box sx={{ 
                          position: 'absolute', 
                          top: 12, 
                          right: 12,
                          display: 'flex',
                          gap: 1
                        }}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                              opacity: hoveredCard === item.id ? 1 : 0.7,
                              scale: hoveredCard === item.id ? 1.1 : 1
                            }}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <IconButton
                              aria-label="add to favorites"
                              sx={{ 
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
                                p: 0.5
                              }}
                            >
                              <Favorite sx={{ fontSize: '1rem', color: 'error.main' }} />
                            </IconButton>
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                              opacity: hoveredCard === item.id ? 1 : 0.7,
                              scale: hoveredCard === item.id ? 1.1 : 1
                            }}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <IconButton
                              aria-label="share"
                              sx={{ 
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
                                p: 0.5
                              }}
                            >
                              <Share sx={{ fontSize: '1rem', color: 'primary.main' }} />
                            </IconButton>
                          </motion.div>
                        </Box>
                      </motion.div>

                      {/* Content */}
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Typography 
                          variant="h6" 
                          component="h3"
                          sx={{ 
                            fontWeight: 700,
                            mb: 1,
                            minHeight: '3em',
                            lineHeight: 1.3
                          }}
                        >
                          {item.title}
                        </Typography>
                        
                        <motion.div
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="text"
                            color="primary"
                            size="small"
                            endIcon={<ArrowRight />}
                            sx={{
                              fontWeight: 600,
                              px: 0,
                              textTransform: 'none',
                              justifyContent: 'flex-start',
                              '&:hover': { 
                                backgroundColor: 'transparent',
                                textDecoration: 'underline'
                              }
                            }}
                              href={`/subcategories/${item.slug || item.subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            View Products
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </Box>
        </Box>

        {/* View All Button */}
        {!loading && subcategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button
              variant="outlined"
              color="primary"
              size="large"
              endIcon={<ArrowRight />}
              sx={{
                borderRadius: '8px',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderWidth: 2,
                '&:hover': { borderWidth: 2 }
              }}
            >
              Browse All Categories
            </Button>
          </motion.div>
        )}
      </Container>
    </Box>
  );
};

export default Product;