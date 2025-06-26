'use client';

import React, { useState, useEffect } from 'react';
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Box,
  useScrollTrigger,
  Slide
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Close as CloseIcon,
  MedicalServices as MedicalServicesIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Link from 'next/link';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'About Us', path: '/Aboutus' },
  { name: 'Contact', path: '/Contact' },
];

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <>
      <HideOnScroll>
        <AppBar 
          position="fixed" 
          elevation={scrolled ? 4 : 0}
          className={`transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}
          sx={{
            backdropFilter: 'blur(10px)',
            background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
            py: 0.5,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar className="flex justify-between py-4">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link href="/" className="flex items-center">
                  <div className="w-10 h-10 bg-[#1976d2] rounded-full flex items-center justify-center mr-3">
                    <MedicalServicesIcon className="text-white text-xl" />
                  </div>
                  <Typography 
                    variant="h6" 
                    className="font-bold text-[#1e293b]"
                    sx={{ 
                      display: { xs: 'none', md: 'block' },
                      background: 'linear-gradient(90deg, #1976d2 0%, #4caf50 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    MedTech Pro
                  </Typography>
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <Box sx={{ display: { xs: 'none', md: 'flex' } }} className="items-center gap-6">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href={item.path}>
                      <Button
                        className={`font-medium ${scrolled ? 'text-[#1e293b] hover:text-[#1976d2]' : 'text-white hover:text-[#1976d2]'}`}
                        sx={{
                          textTransform: 'none',
                          fontSize: '1rem',
                          fontWeight: 500,
                          position: 'relative',
                          '&:after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '0%',
                            height: '2px',
                            backgroundColor: '#1976d2',
                            transition: 'width 0.3s ease',
                          },
                          '&:hover:after': {
                            width: '100%',
                          }
                        }}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    className="bg-[#1976d2] hover:bg-[#1565c0] text-white"
                    sx={{
                      textTransform: 'none',
                      borderRadius: '8px',
                      padding: '8px 24px',
                      fontWeight: 600,
                      boxShadow: '0 4px 6px rgba(25, 118, 210, 0.2)',
                      '&:hover': {
                        boxShadow: '0 6px 8px rgba(25, 118, 210, 0.3)',
                      }
                    }}
                  >
                    Get a Quote
                  </Button>
                </motion.div>
              </Box>

              {/* Mobile Menu Button */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ display: { md: 'none' } }}
                className={scrolled ? 'text-[#1e293b]' : 'text-white'}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: mobileOpen ? 0 : '100%' }}
        transition={{ type: 'tween' }}
        className={`fixed inset-0 z-40 bg-white w-3/4 max-w-sm h-screen shadow-2xl md:hidden ${mobileOpen ? 'block' : 'hidden'}`}
      >
        <div className="flex justify-end p-4">
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon className="text-[#1e293b]" />
          </IconButton>
        </div>
        <div className="flex flex-col p-6 space-y-6">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={item.path} onClick={handleDrawerToggle}>
                <Typography 
                  variant="h6" 
                  className="text-[#1e293b] hover:text-[#1976d2] py-2"
                  sx={{ fontWeight: 500 }}
                >
                  {item.name}
                </Typography>
              </Link>
            </motion.div>
          ))}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8"
          >
            <Button
              variant="contained"
              fullWidth
              className="bg-[#1976d2] hover:bg-[#1565c0] text-white py-3"
              sx={{
                textTransform: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              Contact Sales
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Backdrop for mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleDrawerToggle}
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
        />
      )}
    </>
  );
}