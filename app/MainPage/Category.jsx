'use client';
import React, { useRef } from 'react';
import { motion, useInView, useTransform } from 'framer-motion';
import Image from 'next/image';

const CyberMedCategories = () => {
  const categories = [
    {
      title: "NEUROSURGERY",
      image: "/images/slider1.jpg",
      stats: "23 Systems",
      color: "bg-[#8A2BE2]",
      delay: 0.1
    },
    {
      title: "CARDIAC",
      image: "/images/slider1.jpg",
      stats: "18 Devices",
      color: "bg-[#FF2D75]",
      delay: 0.2
    },
    {
      title: "ORTHOPEDIC",
      image: "/images/slider1.jpg",
      stats: "32 Implants",
      color: "bg-[#00F5FF]",
      delay: 0.3
    },
    {
      title: "DIAGNOSTIC",
      image: "/images/slider1.jpg",
      stats: "27 Machines",
      color: "bg-[#FFA500]",
      delay: 0.4
    },
    {
      title: "RECOVERY",
      image: "/images/slider1.jpg",
      stats: "15 Solutions",
      color: "bg-[#32CD32]",
      delay: 0.5
    },
    {
      title: "EMERGENCY",
      image: "/images/slider1.jpg",
      stats: "42 Kits",
      color: "bg-[#FF4500]",
      delay: 0.6
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Holographic effect components
  const HolographicGlow = ({ color, size = 200 }) => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 0.4 } : {}}
      transition={{ duration: 1.5 }}
      className={`absolute rounded-full ${color} blur-[80px]`}
      style={{ width: size, height: size }}
    />
  );

  return (
    <div 
      ref={ref}
      className="relative overflow-hidden bg-black py-20 px-4"
      style={{
        background: `radial-gradient(circle at center, #0A0A2A 0%, #000000 100%)`
      }}
    >
      {/* Floating cyber grid */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            className="absolute border border-blue-500/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              rotate: Math.random() * 360
            }}
          />
        ))}
      </div>

      {/* Holographic glows */}
      <HolographicGlow color="bg-purple-600" size={300} style={{ top: '10%', left: '10%' }} />
      <HolographicGlow color="bg-cyan-500" size={400} style={{ bottom: '5%', right: '15%' }} />
      <HolographicGlow color="bg-pink-600" size={250} style={{ top: '30%', right: '20%' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center text-5xl md:text-7xl font-bold mb-16"
          style={{
            background: "linear-gradient(90deg, #FFFFFF 30%, #AAAAAA 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 15px rgba(100, 200, 255, 0.3)"
          }}
        >
          MEDICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">DIVISIONS</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: category.delay, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              {/* Cyber border */}
              <div className={`absolute inset-0 rounded-xl ${category.color} opacity-20 group-hover:opacity-40 transition-all duration-500`} />
              <div className={`absolute inset-0 border-2 ${category.color} rounded-xl opacity-30 group-hover:opacity-70 transition-all duration-500`} />
              
              {/* Animated scan line */}
              <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{
                  duration: 2,
                  delay: 0.5 + i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className={`absolute left-0 right-0 h-[2px] ${category.color} opacity-70`}
              />

              <div className="relative overflow-hidden rounded-xl h-[300px] border border-white/10 backdrop-blur-sm">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                />

                {/* Glowing overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent ${category.color} opacity-30 mix-blend-overlay`} />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <motion.h3 
                    className="text-3xl font-bold mb-2"
                    style={{
                      textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                      background: "linear-gradient(90deg, #FFFFFF 0%, #DDDDDD 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}
                  >
                    {category.title}
                  </motion.h3>
                  <motion.p 
                    className="text-lg font-mono"
                    style={{
                      color: category.color.replace('bg-', 'text-')
                    }}
                  >
                    {category.stats}
                  </motion.p>

                  {/* Cyber circle indicator */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`absolute top-6 right-6 w-12 h-12 rounded-full ${category.color} flex items-center justify-center border-2 border-white/30`}
                  >
                    <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                  </motion.div>
                </div>

                {/* Binary code animation */}
                <div className="absolute top-4 left-4 opacity-70">
                  {[1,2,3,4].map((line) => (
                    <motion.div
                      key={line}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.7, 0] }}
                      transition={{
                        duration: 3,
                        delay: line * 0.3,
                        repeat: Infinity
                      }}
                      className="font-mono text-xs text-white"
                    >
                      {Array(12).fill(0).map(() => Math.round(Math.random())).join('')}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cyberpunk button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="flex justify-center mt-16"
        >
          <button className="relative px-12 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg overflow-hidden group">
            <span className="relative z-10">EXPLORE ALL DIVISIONS</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Button glitch effect */}
            <motion.span
              animate={{ x: [0, 2, -2, 0] }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                repeatType: "mirror"
              }}
              className="absolute inset-0 border border-white/30 rounded-full pointer-events-none opacity-0 group-hover:opacity-100"
            />
            
            {/* Button scan line */}
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="absolute left-0 right-0 h-[1px] bg-white/50"
            />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CyberMedCategories;