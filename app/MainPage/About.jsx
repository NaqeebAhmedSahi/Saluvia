'use client';

import React, { useRef } from 'react';
import { Box, Typography, Container, useTheme, Button, Grid, Chip, Stack } from '@mui/material';
import { motion, useInView, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Hexagon from '@mui/icons-material/Hexagon';
import CircuitBoard from '@mui/icons-material/Memory';
import Atom from '@mui/icons-material/Science';
import Brain from '@mui/icons-material/Psychology';
import Pulse from '@mui/icons-material/MonitorHeart';
import PrecisionManufacturing from '@mui/icons-material/PrecisionManufacturing';
import VerifiedUser from '@mui/icons-material/VerifiedUser';
import Innovation from '@mui/icons-material/AutoAwesome';
import Collaboration from '@mui/icons-material/Handshake';

const AboutSection = () => {
    const theme = useTheme();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: '-100px' });

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                when: "beforeChildren"
            }
        }
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 }
        }
    };

    const scaleIn = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.6 }
        }
    };

    return (
        <Box sx={{
            position: 'relative',
            overflow: 'hidden',
            py: 12,
            background: '#000',
            color: '#fff'
        }} ref={ref}>
            
            {/* Animated grid overlay */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                opacity: 0.3,
                zIndex: 0
            }} />

            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    <Grid container spacing={8} alignItems="center">
                        {/* Left Column - Company Showcase */}
                        <Grid item xs={12} md={6}>
                            <motion.div variants={fadeIn}>
                                <Chip 
                                    label="ABOUT NEUROTECH SOLUTIONS" 
                                    sx={{ 
                                        mb: 3,
                                        background: 'rgba(0, 255, 255, 0.1)',
                                        color: '#00ffcc',
                                        border: '1px solid #00ffcc',
                                        fontWeight: 'bold',
                                        letterSpacing: '1px',
                                        fontSize: '0.8rem',
                                        height: '32px'
                                    }} 
                                />
                            </motion.div>

                            <motion.div variants={fadeIn}>
                                <Typography variant="h2" sx={{ 
                                    mb: 3, 
                                    fontWeight: 800,
                                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                                    lineHeight: 1.1,
                                    background: 'linear-gradient(90deg, #ffffff 30%, #00ffcc 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>
                                    Precision Medical Instruments for the Future
                                </Typography>
                            </motion.div>

                            <motion.div variants={fadeIn}>
                                <Typography variant="body1" sx={{ 
                                    mb: 4, 
                                    fontSize: '1.1rem',
                                    lineHeight: 1.8,
                                    color: 'rgba(255,255,255,0.8)'
                                }}>
                                    Since 2012, NeuroTech Solutions has been at the forefront of <strong>neurological diagnostic equipment</strong> and <strong>surgical robotics</strong>. Our FDA-approved devices are trusted by leading hospitals and research institutions worldwide.
                                </Typography>
                            </motion.div>

                            {/* Core Services */}
                            <motion.div variants={fadeIn}>
                                <Typography variant="h6" sx={{ 
                                    mb: 2,
                                    fontWeight: 700,
                                    color: '#00ffcc'
                                }}>
                                    OUR SPECIALIZED SOLUTIONS
                                </Typography>
                                
                                <Grid container spacing={2} sx={{ mb: 4 }}>
                                    {[
                                        { icon: <Brain fontSize="small" />, title: "NeuroMapping Systems", desc: "Advanced brain activity visualization" },
                                        { icon: <Pulse fontSize="small" />, title: "VitalSync Monitors", desc: "Real-time patient vitals tracking" },
                                        { icon: <PrecisionManufacturing fontSize="small" />, title: "Surgical Robotics", desc: "Precision-guided surgical assistants" },
                                        { icon: <CircuitBoard fontSize="small" />, title: "LabTech Analyzers", desc: "AI-powered diagnostic equipment" }
                                    ].map((service, index) => (
                                        <Grid item xs={6} key={index}>
                                            <Box sx={{ 
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                mb: 2
                                            }}>
                                                <Box sx={{ 
                                                    color: '#00ffcc',
                                                    mr: 2,
                                                    mt: '2px'
                                                }}>
                                                    {service.icon}
                                                </Box>
                                                <Box>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                        {service.title}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ 
                                                        color: 'rgba(255,255,255,0.7)',
                                                        fontSize: '0.9rem'
                                                    }}>
                                                        {service.desc}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </motion.div>
                        </Grid>

                        {/* Right Column - Image & Values */}
                        <Grid item xs={12} md={6}>
                            <motion.div variants={scaleIn} style={{ position: 'relative' }}>
                                <Box sx={{
                                    position: 'relative',
                                    height: { xs: '400px', md: '600px' },
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(0, 255, 255, 0.2)',
                                    boxShadow: '0 0 30px rgba(0, 255, 255, 0.1)'
                                }}>
                                    <Image
                                        src="/images/medical-lab.jpg"
                                        alt="NeuroTech medical laboratory"
                                        fill
                                        className="object-cover"
                                        style={{ filter: 'grayscale(30%) contrast(110%)' }}
                                    />
                                    <Box sx={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to top, #000000 0%, transparent 50%)'
                                    }} />
                                </Box>

                                {/* Core Values Floating Panel */}
                                <Box sx={{
                                    position: 'absolute',
                                    bottom: '-40px',
                                    right: '40px',
                                    width: '80%',
                                    background: 'rgba(0, 20, 30, 0.8)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '12px',
                                    p: 4,
                                    border: '1px solid rgba(0, 255, 255, 0.2)',
                                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
                                }}>
                                    <Typography variant="h6" sx={{ 
                                        mb: 3,
                                        fontWeight: 700,
                                        color: '#00ffcc'
                                    }}>
                                        OUR CORE VALUES
                                    </Typography>
                                    
                                    <Grid container spacing={2}>
                                        {[
                                            { icon: <VerifiedUser fontSize="small" />, title: "Precision", desc: "Sub-micron accuracy in all instruments" },
                                            { icon: <Innovation fontSize="small" />, title: "Innovation", desc: "Pioneering new medical technologies" },
                                            { icon: <Collaboration fontSize="small" />, title: "Partnership", desc: "Working closely with medical professionals" }
                                        ].map((value, index) => (
                                            <Grid item xs={12} sm={4} key={index}>
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <Box sx={{
                                                        width: '50px',
                                                        height: '50px',
                                                        borderRadius: '50%',
                                                        background: 'rgba(0, 255, 255, 0.1)',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: '#00ffcc',
                                                        mb: 1.5
                                                    }}>
                                                        {value.icon}
                                                    </Box>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                                        {value.title}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ 
                                                        color: 'rgba(255,255,255,0.7)',
                                                        fontSize: '0.8rem'
                                                    }}>
                                                        {value.desc}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>

                    {/* Company Description */}
                    <Box sx={{ mt: 15, textAlign: 'center' }}>
                        <motion.div variants={fadeIn}>
                            <Typography variant="h3" sx={{ 
                                mb: 3,
                                fontWeight: 700,
                                fontSize: { xs: '2rem', md: '2.5rem' }
                            }}>
                                Transforming Healthcare Through Technology
                            </Typography>
                        </motion.div>

                        <motion.div variants={fadeIn}>
                            <Typography variant="body1" sx={{ 
                                maxWidth: '800px',
                                mx: 'auto',
                                mb: 6,
                                fontSize: '1.1rem',
                                lineHeight: 1.8,
                                color: 'rgba(255,255,255,0.8)'
                            }}>
                                At NeuroTech Solutions, we combine <strong>cutting-edge engineering</strong> with <strong>medical expertise</strong> to develop instruments that enhance diagnostic accuracy and improve surgical outcomes. Our ISO 13485 certified manufacturing facilities produce equipment that meets the highest standards of quality and reliability, serving over 500 medical institutions across 35 countries.
                            </Typography>
                        </motion.div>

                        <motion.div variants={fadeIn}>
                            <Button 
                                variant="outlined"
                                size="large"
                                sx={{
                                    px: 6,
                                    py: 1.5,
                                    borderRadius: '50px',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    color: '#00ffcc',
                                    borderColor: '#00ffcc',
                                    '&:hover': {
                                        background: 'rgba(0, 255, 255, 0.1)',
                                        borderColor: '#00ffcc',
                                        boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
                                    },
                                    transition: 'all 0.3s'
                                }}
                            >
                                Download Company Profile
                            </Button>
                        </motion.div>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

export default AboutSection;