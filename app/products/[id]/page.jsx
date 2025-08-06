// app/products/[id]/page.jsx
'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const imageVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "backOut"
    }
  }
};

export default function ProductPage({ params, searchParams }) {
  const { id } = params;
  
  // Reconstruct the product object from searchParams
  const product = {
    _id: id,
    name: decodeURIComponent(searchParams.name || ''),
    description: decodeURIComponent(searchParams.description || ''),
    image_path: decodeURIComponent(searchParams.image_path || ''),
    // Add other fields you passed
  };

  // Clean up image path
  const imageSrc = `/${product.image_path.replace(/\\/g, '/')}`;

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
            {/* Product Image */}
            <motion.div
              variants={imageVariants}
              className="relative h-80 md:h-full rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center"
            >
              <img
                src={imageSrc}
                alt={product.name}
                className="w-full h-full object-contain object-center p-4"
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none"
              />
            </motion.div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="w-20 h-1 bg-blue-500 rounded-full mb-6" />
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="prose prose-lg max-w-none text-gray-600 mb-8"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />

              <motion.div
                variants={itemVariants}
                className="mt-auto"
              >
                <div className="flex items-center space-x-4">
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Add to Cart
                  </button>
                  <button className="px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg shadow-sm transition duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                    Contact Supplier
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Additional Information Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 bg-white rounded-3xl shadow-xl overflow-hidden p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Product ID</span>
                <span className="font-medium">{product._id}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Category</span>
                <span className="font-medium">Medical Instruments</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Material</span>
                <span className="font-medium">Stainless Steel</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Sterilization</span>
                <span className="font-medium">Autoclavable</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}