// app/categories/page.jsx
import Link from 'next/link';
import Image from 'next/image';
import { getAllCategories } from '@/lib/categories';

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="py-12 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-2">Our Medical Categories</h1>
        <p className="text-gray-400 mb-12">Explore our specialized medical equipment categories</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group"
            >
              <div className="relative h-64 rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-400 transition-all duration-300">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h2 className="text-2xl font-bold text-white mb-2">{category.name}</h2>
                  <p className="text-gray-300">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}