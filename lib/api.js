// lib/api.js
export async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return res.json();
}