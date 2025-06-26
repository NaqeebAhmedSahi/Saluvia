// app/products/[slug]/page.jsx
import React from 'react';
import Image from 'next/image';
import products from '@/data/products.json';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug
  }));
}

const ProductDetailPage = ({ params }) => {
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="py-12 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden border border-gray-700">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div className="text-white">
            <span className="text-sm font-semibold px-3 py-1 bg-cyan-600 rounded-full inline-block mb-4">
              {product.category}
            </span>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl text-cyan-400 font-bold mb-6">${product.price.toLocaleString()}</p>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-300">{product.description}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Key Features</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-cyan-400 mr-2">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Technical Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm capitalize">{key}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-bold transition-colors">
              Request Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;