'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const CategoryPage = ({ params }) => {
  const [categoryData, setCategoryData] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const response = await fetch(`/api/categories/${params.category}`);
        if (!response.ok) throw new Error('Failed to fetch category data');
        const data = await response.json();
        setCategoryData(data.category);
        setSubcategories(data.subcategories);
        console.log("Sub Categories ",data.subcategories);
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategoryData();
  }, [params.category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h2 className="text-3xl">Category not found</h2>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Banner Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-96 w-full overflow-hidden"
      >
        <Image
          src={
            categoryData.image_path
              ? '/' + categoryData.image_path.replace(/\\/g, '/').replace(/^public\//, '')
              : '/images/slider1.jpg'
          }
          alt={categoryData.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        <div className="relative z-10 h-full flex items-end pb-16">
          <div className="container mx-auto px-4">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-4"
              style={{
                background: 'linear-gradient(90deg, #FFFFFF 30%, #AAAAAA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {categoryData.title}
            </motion.h1>
          </div>
        </div>
      </motion.div>

      {/* Description Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
        className="py-16 container mx-auto px-4"
      >
        <div 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: categoryData.description }} 
        />
      </motion.section>

      {/* Subcategories Section */}
      {subcategories.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="py-16 bg-gradient-to-b from-black to-gray-900"
        >
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-12 text-center"
              style={{
                background: 'linear-gradient(90deg, #FFFFFF 30%, #AAAAAA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Subdivisions
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subcategories.map((subcategory, index) => (
                <Link href={`/subCategories/${subcategory.slug || subcategory.name.toLowerCase().replace(/\s+/g, '-')}`} key={index} passHref>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.03 }}
                    className="relative rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm group h-64 cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 z-10" />
                    <Image
                      src={
                        subcategory.image_path
                          ? '/' + subcategory.image_path.replace(/\\/g, '/').replace(/^public\//, '')
                          : '/images/slider1.jpg'
                      }
                      alt={subcategory.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 p-6 z-20">
                      <h3 className="text-2xl font-bold mb-2 text-white">
                        {subcategory.title}
                      </h3>
                      {/* <p className="text-sm text-white/80">{</p> */}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 bg-gradient-to-r from-cyan-900/30 to-blue-900/30"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Need more information?
          </motion.h2>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 text-lg max-w-2xl mx-auto"
          >
            Contact our specialists for detailed information about our {categoryData.title} instruments and solutions.
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <button className="relative px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold overflow-hidden group">
              <span className="relative z-10">CONTACT US</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default CategoryPage;