// lib/categories.js
import categoriesData from '@/data/categories.json';
import productsData from '@/data/products.json';

export function getAllCategories() {
  return categoriesData;
}

export function getCategoryBySlug(slug) {
  return categoriesData.find(category => category.slug === slug);
}

export function getProductsByCategory(slug) {
  return productsData.filter(product => product.category === slug);
}