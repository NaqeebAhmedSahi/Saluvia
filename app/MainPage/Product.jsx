'use client';

import React, { useRef, useState } from 'react';
import { Box, Typography, Container, IconButton, useTheme } from '@mui/material';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const ProductSection = () => {
    const theme = useTheme();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    
    // Sample product data
    const newArrivals = [
        {
            id: 1,
            name: "Advanced MRI Scanner",
            price: "$250,000",
            image: "/images/slider1.jpg",
            tag: "New"
        },
        {
            id: 2,
            name: "Portable Ultrasound",
            price: "$45,000",
            image: "/images/slider1.jpg",
            tag: "Featured"
        },
        {
            id: 3,
            name: "Digital X-Ray System",
            price: "$180,000",
            image: "/images/slider1.jpg",
            tag: "Limited"
        },
        {
            id: 4,
            name: "ECG Monitor Pro",
            price: "$12,500",
            image: "/images/slider1.jpg",
            tag: "New"
        },
    ];

    const hotProducts = [
        {
            id: 5,
            name: "Surgical Robot",
            price: "$1.2M",
            image: "/images/slider1.jpg",
            tag: "Bestseller"
        },
        {
            id: 6,
            name: "AI Diagnostic Tool",
            price: "$85,000",
            image: "/images/slider1.jpg",
            tag: "Trending"
        },
        {
            id: 7,
            name: "Neonatal Incubator",
            price: "$32,000",
            image: "/images/slider1.jpg",
            tag: "Popular"
        },
        {
            id: 8,
            name: "Defibrillator Plus",
            price: "$8,500",
            image: "/images/slider1.jpg",
            tag: "Hot"
        },
    ];

    const [currentNewArrival, setCurrentNewArrival] = useState(0);
    const [currentHotProduct, setCurrentHotProduct] = useState(0);
    const [direction, setDirection] = useState('right');

    const handleNext = (type) => {
        setDirection('right');
        if (type === 'new') {
            setCurrentNewArrival(prev => (prev + 1) % newArrivals.length);
        } else {
            setCurrentHotProduct(prev => (prev + 1) % hotProducts.length);
        }
    };

    const handlePrev = (type) => {
        setDirection('left');
        if (type === 'new') {
            setCurrentNewArrival(prev => (prev - 1 + newArrivals.length) % newArrivals.length);
        } else {
            setCurrentHotProduct(prev => (prev - 1 + hotProducts.length) % hotProducts.length);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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

    const carouselVariants = {
        enter: (direction) => ({
            x: direction === 'right' ? 300 : -300,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.1, 0.7, 0.3, 1]
            }
        },
        exit: (direction) => ({
            x: direction === 'right' ? -300 : 300,
            opacity: 0,
            scale: 0.9,
            transition: {
                duration: 0.5,
                ease: [0.1, 0.7, 0.3, 1]
            }
        })
    };

    return (
        <Box sx={{ 
            backgroundColor: 'white', 
            py: 10,
            position: 'relative',
            overflow: 'hidden'
        }} ref={ref}>
            {/* Decorative elements */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: theme.palette.primary.light,
                filter: 'blur(100px)',
                opacity: 0.15,
                zIndex: 0
            }} />
            
            <Container maxWidth="lg">
                {/* New Arrivals Section */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants}>
                        <Typography variant="h4" sx={{ 
                            mb: 1,
                            fontWeight: 'bold',
                            color: 'text.primary'
                        }}>
                            New Arrivals
                        </Typography>
                        <Typography variant="body1" sx={{ 
                            mb: 4,
                            color: 'text.secondary'
                        }}>
                            Discover our latest medical innovations
                        </Typography>
                    </motion.div>

                    <Box sx={{ 
                        position: 'relative', 
                        minHeight: '400px',
                        mb: 8
                    }}>
                        <AnimatePresence custom={direction} mode="wait">
                            <motion.div
                                key={currentNewArrival}
                                custom={direction}
                                variants={carouselVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%'
                                }}
                            >
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', md: 'row' },
                                    gap: 4,
                                    height: '100%'
                                }}>
                                    {/* Product Image */}
                                    <Box sx={{
                                        flex: 1,
                                        position: 'relative',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                        minHeight: '300px'
                                    }}>
                                        <Image
                                            src={newArrivals[currentNewArrival].image}
                                            alt={newArrivals[currentNewArrival].name}
                                            fill
                                            className="object-cover"
                                        />
                                        <Box sx={{
                                            position: 'absolute',
                                            top: 16,
                                            right: 16,
                                            backgroundColor: theme.palette.primary.main,
                                            color: 'white',
                                            px: 2,
                                            py: 1,
                                            borderRadius: '8px',
                                            fontWeight: 'bold',
                                            fontSize: '0.8rem'
                                        }}>
                                            {newArrivals[currentNewArrival].tag}
                                        </Box>
                                        <Box sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                                            p: 3,
                                            color: 'white'
                                        }}>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                {newArrivals[currentNewArrival].name}
                                            </Typography>
                                            <Typography variant="body1">
                                                {newArrivals[currentNewArrival].price}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Product Details */}
                                    <Box sx={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        p: 3
                                    }}>
                                        <Typography variant="h4" sx={{ 
                                            mb: 2,
                                            fontWeight: 'bold',
                                            color: 'text.primary'
                                        }}>
                                            {newArrivals[currentNewArrival].name}
                                        </Typography>
                                        <Typography variant="body1" sx={{ 
                                            mb: 3,
                                            color: 'text.secondary',
                                            fontSize: '1.1rem',
                                            lineHeight: 1.7
                                        }}>
                                            Cutting-edge technology with precision engineering for accurate diagnostics and improved patient outcomes. FDA-approved and trusted by leading hospitals worldwide.
                                        </Typography>
                                        <Typography variant="h5" sx={{ 
                                            mb: 3,
                                            fontWeight: 'bold',
                                            color: theme.palette.primary.main
                                        }}>
                                            {newArrivals[currentNewArrival].price}
                                        </Typography>
                                        <Box>
                                            <button style={{
                                                backgroundColor: theme.palette.primary.main,
                                                color: 'white',
                                                border: 'none',
                                                padding: '12px 24px',
                                                borderRadius: '12px',
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                cursor: 'pointer',
                                                boxShadow: `0 4px 20px ${theme.palette.primary.main}40`,
                                                transition: 'all 0.3s ease',
                                                ':hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: `0 6px 25px ${theme.palette.primary.main}60`
                                                }
                                            }}>
                                                View Details
                                            </button>
                                        </Box>
                                    </Box>
                                </Box>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <IconButton
                            onClick={() => handlePrev('new')}
                            sx={{
                                position: 'absolute',
                                left: { xs: 10, md: -60 },
                                top: '50%',
                                backgroundColor: 'white',
                                color: theme.palette.primary.main,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                width: '50px',
                                height: '50px',
                                zIndex: 2,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.light
                                }
                            }}
                        >
                            <ArrowBackIosNewIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => handleNext('new')}
                            sx={{
                                position: 'absolute',
                                right: { xs: 10, md: -60 },
                                top: '50%',
                                backgroundColor: 'white',
                                color: theme.palette.primary.main,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                width: '50px',
                                height: '50px',
                                zIndex: 2,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.light
                                }
                            }}
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Box>
                </motion.div>

                {/* Hot Products Section */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants}>
                        <Typography variant="h4" sx={{ 
                            mb: 1,
                            fontWeight: 'bold',
                            color: 'text.primary'
                        }}>
                            Hot Products
                        </Typography>
                        <Typography variant="body1" sx={{ 
                            mb: 4,
                            color: 'text.secondary'
                        }}>
                            Most popular in our catalog
                        </Typography>
                    </motion.div>

                    <Box sx={{ 
                        position: 'relative', 
                        minHeight: '400px'
                    }}>
                        <AnimatePresence custom={direction} mode="wait">
                            <motion.div
                                key={currentHotProduct}
                                custom={direction}
                                variants={carouselVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%'
                                }}
                            >
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column-reverse', md: 'row' },
                                    gap: 4,
                                    height: '100%'
                                }}>
                                    {/* Product Details */}
                                    <Box sx={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        p: 3
                                    }}>
                                        <Box sx={{
                                            display: 'inline-block',
                                            mb: 2,
                                            backgroundColor: theme.palette.error.light,
                                            color: theme.palette.error.main,
                                            px: 2,
                                            py: 1,
                                            borderRadius: '8px',
                                            fontWeight: 'bold',
                                            fontSize: '0.8rem'
                                        }}>
                                            {hotProducts[currentHotProduct].tag}
                                        </Box>
                                        <Typography variant="h4" sx={{ 
                                            mb: 2,
                                            fontWeight: 'bold',
                                            color: 'text.primary'
                                        }}>
                                            {hotProducts[currentHotProduct].name}
                                        </Typography>
                                        <Typography variant="body1" sx={{ 
                                            mb: 3,
                                            color: 'text.secondary',
                                            fontSize: '1.1rem',
                                            lineHeight: 1.7
                                        }}>
                                            Industry-leading performance with revolutionary features that set new standards in medical technology. Used by top healthcare providers in 40+ countries.
                                        </Typography>
                                        <Typography variant="h5" sx={{ 
                                            mb: 3,
                                            fontWeight: 'bold',
                                            color: theme.palette.error.main
                                        }}>
                                            {hotProducts[currentHotProduct].price}
                                        </Typography>
                                        <Box>
                                            <button style={{
                                                backgroundColor: theme.palette.error.main,
                                                color: 'white',
                                                border: 'none',
                                                padding: '12px 24px',
                                                borderRadius: '12px',
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                cursor: 'pointer',
                                                boxShadow: `0 4px 20px ${theme.palette.error.main}40`,
                                                transition: 'all 0.3s ease',
                                                ':hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: `0 6px 25px ${theme.palette.error.main}60`
                                                }
                                            }}>
                                                Order Now
                                            </button>
                                        </Box>
                                    </Box>

                                    {/* Product Image */}
                                    <Box sx={{
                                        flex: 1,
                                        position: 'relative',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                        minHeight: '300px'
                                    }}>
                                        <Image
                                            src={hotProducts[currentHotProduct].image}
                                            alt={hotProducts[currentHotProduct].name}
                                            fill
                                            className="object-cover"
                                        />
                                        <Box sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: `linear-gradient(135deg, ${theme.palette.error.main}20 0%, transparent 100%)`
                                        }} />
                                    </Box>
                                </Box>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <IconButton
                            onClick={() => handlePrev('hot')}
                            sx={{
                                position: 'absolute',
                                left: { xs: 10, md: -60 },
                                top: '50%',
                                backgroundColor: 'white',
                                color: theme.palette.error.main,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                width: '50px',
                                height: '50px',
                                zIndex: 2,
                                '&:hover': {
                                    backgroundColor: theme.palette.error.light
                                }
                            }}
                        >
                            <ArrowBackIosNewIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => handleNext('hot')}
                            sx={{
                                position: 'absolute',
                                right: { xs: 10, md: -60 },
                                top: '50%',
                                backgroundColor: 'white',
                                color: theme.palette.error.main,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                width: '50px',
                                height: '50px',
                                zIndex: 2,
                                '&:hover': {
                                    backgroundColor: theme.palette.error.light
                                }
                            }}
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

export default ProductSection;