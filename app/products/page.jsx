// app/products/page.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import products from '@/data/products.json';

const ProductsPage = () => {
  return (
    <div className="py-12 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-2">Our Medical Products</h1>
        <p className="text-gray-400 mb-12">Cutting-edge solutions for modern healthcare</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="relative h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  <span className="text-xs font-semibold px-2 py-1 bg-cyan-600 rounded-md">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2">{product.name}</h2>
                <p className="text-gray-400 mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-cyan-400">
                    ${product.price.toLocaleString()}
                  </span>
                  <Link 
                    href={`/products/${product.slug}`}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md text-white font-medium transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;