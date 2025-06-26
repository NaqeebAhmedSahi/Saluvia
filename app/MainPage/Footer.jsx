'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CyberMedFooter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="relative overflow-hidden bg-black pt-20 pb-10 px-4 border-t border-gray-800">
      {/* Floating tech particles */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute rounded-full bg-blue-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`
            }}
          />
        ))}
      </div>

      {/* Holographic glows */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-purple-600 blur-[100px] opacity-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-cyan-500 blur-[120px] opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Newsletter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 p-8 rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-900/50 to-gray-800/20 backdrop-blur-sm"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                MEDICAL INNOVATION UPDATES
              </h3>
              <p className="text-gray-400 max-w-lg">
                Subscribe to our neuro-network for breakthrough medical tech news, exclusive offers, and research updates.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative flex-1 w-full max-w-xl">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="neuro@email.com"
                  required
                  className="w-full px-6 py-4 pr-16 rounded-full bg-gray-800 border border-gray-700 focus:border-cyan-400 focus:outline-none text-white placeholder-gray-500 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center"
                >
                  {subscribed ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-white"
                    >
                      <SendIcon className="text-xl" />
                    </motion.div>
                  ) : (
                    <ArrowForwardIcon className="text-xl" />
                  )}
                </motion.button>
              </div>

              {subscribed && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute -bottom-8 left-0 text-cyan-400 text-sm font-medium mt-2 flex items-center"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse mr-2"></span>
                  Subscribed to neuro-network!
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-xl font-bold mb-4 text-white flex items-center">
              <span className="w-3 h-3 rounded-full bg-cyan-500 mr-2 animate-pulse"></span>
              MED-TECH INNOVATIONS
            </h4>
            <p className="text-gray-400 mb-4">
              Pioneering the future of medical technology with cutting-edge solutions for modern healthcare.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map((social) => (
                <motion.a
                  key={social}
                  whileHover={{ y: -3, color: '#00FFFF' }}
                  className="text-gray-400 hover:text-cyan-400 cursor-pointer"
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          {['Products', 'Services', 'Research'].map((category, i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4 text-white">{category}</h4>
              <ul className="space-y-3">
                {Array(4).fill(0).map((_, j) => (
                  <motion.li
                    key={j}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center">
                      <span className="text-cyan-500 mr-2 text-xs">◉</span>
                      {`${category} Item ${j + 1}`}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8"
        />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 text-sm mb-4 md:mb-0"
          >
            © {new Date().getFullYear()} Med-Tech Innovations. All neuro-rights reserved.
          </motion.p>

          <div className="flex space-x-6">
            {['Privacy', 'Terms', 'Security', 'Cookies'].map((item, i) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ color: '#00FFFF' }}
                className="text-gray-400 hover:text-cyan-400 text-sm cursor-pointer"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Floating medic symbol */}
      <motion.div
        animate={{
          rotate: 360,
          y: [0, 20, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute right-10 bottom-10 opacity-10"
      >
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-cyan-400">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      </motion.div>
    </div>
  );
};

export default CyberMedFooter;