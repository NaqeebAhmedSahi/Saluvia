'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Collapse,
  Container,
  Box,
  useScrollTrigger,
  Slide,
  Paper,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  Menu as MenuIcon,
  MedicalServices as MedicalServicesIcon,
  ArrowDropDown
} from '@mui/icons-material';
import Link from 'next/link';

const otherNavItems = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/Aboutus' },
  { name: 'Contact', path: '/Contact' },
];

function HideOnScroll({ children }) {
  const [mounted, setMounted] = useState(false);
  const trigger = useScrollTrigger();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

async function fetchCategories() {
  try {
    const response = await fetch(`/api/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [productCategories, setProductCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const categories = await fetchCategories();
      setProductCategories(categories);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (!mounted) return null;

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          elevation={scrolled ? 4 : 0}
          sx={{
            backdropFilter: 'blur(10px)',
            background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
            py: 0.5,
            transition: 'all 0.3s ease',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
              <Link href="/" passHref>
                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <Box sx={{ width: 40, height: 40, bgcolor: '#1976d2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1.5 }}>
                    <MedicalServicesIcon sx={{ color: 'white', fontSize: 24 }} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      display: { xs: 'none', md: 'block' },
                      fontWeight: 'bold',
                      background: 'linear-gradient(90deg, #1976d2 0%, #4caf50 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    MedTech Pro
                  </Typography>
                </Box>
              </Link>

              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
                {otherNavItems.map((item) => (
                  <Link key={item.name} href={item.path} passHref>
                    <Button
                      sx={{
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: scrolled ? '#1e293b' : 'white',
                        '&:hover': { color: '#1976d2' },
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}

                {/* Categories Dropdown */}
                <Box
                  onMouseEnter={() => setOpenCategory(true)}
                  onMouseLeave={() => setOpenCategory(false)}
                  sx={{ position: 'relative' }}
                >
                  <Button
                    sx={{
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: scrolled ? '#1e293b' : 'white',
                      '&:hover': { color: '#1976d2' },
                      position: 'relative',
                    }}
                    endIcon={<ArrowDropDown />}
                  >
                    Categories
                  </Button>

                  <Collapse
                    in={openCategory}
                    timeout="auto"
                    unmountOnExit
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      zIndex: 1200,
                      width: 400,
                    }}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        mt: 1,
                        p: 2,
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%)'
                      }}
                      onClick={() => setOpenCategory(false)}
                    >
                      {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                          <CircularProgress size={24} />
                        </Box>
                      ) : (
                        <>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2', mb: 1, pl: 1 }}>
                            Browse Categories
                          </Typography>
                          <Divider sx={{ mb: 2 }} />
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            {productCategories.map((category) => (
                              <Link
                                key={category.name}
                                href={`/categories/${encodeURIComponent(category.category)}`}
                                passHref
                                legacyBehavior
                              >
                                <Box
                                  sx={{
                                    flex: '1 1 200px',
                                    minWidth: 0,
                                    cursor: 'pointer',
                                    '&:hover': {
                                      backgroundColor: '#f0f7ff',
                                      borderRadius: '4px'
                                    }
                                  }}
                                >
                                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, p: 1 }}>
                                    {category.image_url && (
                                      <img
                                        src={category.image_url}
                                        alt={category.name}
                                        style={{
                                          width: 40,
                                          height: 40,
                                          objectFit: 'cover',
                                          borderRadius: 4,
                                          marginRight: 8
                                        }}
                                      />
                                    )}
                                    <Typography
                                      variant="subtitle1"
                                      sx={{
                                        fontWeight: 600,
                                        color: '#1e293b',
                                        borderLeft: '3px solid #1976d2',
                                        pl: 1
                                      }}
                                    >
                                      {category.name}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Link>
                            ))}
                          </Box>
                        </>
                      )}
                    </Paper>
                  </Collapse>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    textTransform: 'none',
                    borderRadius: '8px',
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    boxShadow: '0 4px 6px rgba(25, 118, 210, 0.2)',
                    '&:hover': {
                      boxShadow: '0 6px 8px rgba(25, 118, 210, 0.3)',
                      bgcolor: '#1565c0'
                    }
                  }}
                >
                  Get a Quote
                </Button>
              </Box>

              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ display: { md: 'none' }, color: scrolled ? '#1e293b' : 'white' }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </>
  );
}
