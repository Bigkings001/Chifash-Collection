'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function ProductsByCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products/categories/');
        if (response.ok) {
          const data = await response.json();
          const cats = Array.isArray(data) ? data : data.results || [];
          setCategories(cats);
          if (cats.length > 0) {
            setSelectedCategory(cats[0].slug);
          }
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products by category
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/api/products/?category__slug=${selectedCategory}`
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(Array.isArray(data) ? data : data.results || []);
          setError('');
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Error loading products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 overflow-x-auto pb-3 sm:pb-4 -mx-4 sm:mx-0 px-4 sm:px-0 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-sm font-bold uppercase text-xs sm:text-sm transition-all duration-200 whitespace-nowrap min-h-10 ${
              selectedCategory === cat.slug
                ? 'bg-amber-400 text-black'
                : 'border border-white/20 text-white hover:border-amber-400 hover:text-amber-400'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-16 sm:py-20">
          <div className="inline-block">
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-zinc-400 mt-3 sm:mt-4 text-sm">Loading products...</p>
        </div>
      ) : error ? (
        <div className="text-center py-16 sm:py-20">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 sm:py-20 border border-dashed border-white/10 rounded-lg">
          <p className="text-zinc-500 text-sm md:text-lg">No products found in this category</p>
        </div>
      )}
    </div>
  );
}
