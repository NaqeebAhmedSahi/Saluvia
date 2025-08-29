'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const CyberMedCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`/api/categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden bg-black py-20 px-4"
      style={{ background: `radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)` }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center text-5xl md:text-7xl font-bold mb-16"
          style={{
            background: 'linear-gradient(90deg, #FFFFFF 30%, #AAAAAA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 15px rgba(100, 200, 255, 0.3)'
          }}
        >
          MEDICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">DIVISIONS</span>
        </motion.h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  whileHover={{ scale: 1.03 }}
                  className="relative rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm group h-64" // Added fixed height here
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 z-10" />
                  <Image
                    src={
                      category.image_path
                        ? '/' + category.image_path.replace(/\\/g, '/').replace(/^public\//, '')
                        : '/images/slider1.jpg'
                    }
                    alt={category.name || 'Medical category'}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority={index < 3} // Only prioritize first few images
                  />
                  <div className="absolute bottom-0 left-0 p-6 z-20">
                    <h3
                      className="text-3xl font-bold mb-2 text-white"
                      style={{
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                        background: 'linear-gradient(90deg, #FFFFFF 0%, #DDDDDD 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/80">Explore related instruments</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="flex justify-center mt-16"
            >
              <button className="relative px-12 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg overflow-hidden group">
                <span className="relative z-10">EXPLORE ALL DIVISIONS</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  className="absolute left-0 right-0 h-[1px] bg-white/50"
                />
              </button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default CyberMedCategories;