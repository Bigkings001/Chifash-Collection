'use client'

import { Product, Category } from '@/types/product'
import ProductCard from './ProductCard'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'

interface ProductGridProps {
  products: Product[]
  categories: Category[]
  activeCategory?: string
}

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular'

export default function ProductGrid({ products, categories }: ProductGridProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeCategory = searchParams.get('category')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000])

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return Number(a.price) - Number(b.price)
      case 'price-desc':
        return Number(b.price) - Number(a.price)
      case 'newest':
      default:
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    }
  })

  // Filter by price range
  const filteredProducts = sortedProducts.filter(
    (p) => Number(p.price) >= priceRange[0] && Number(p.price) <= priceRange[1]
  )

  const handleFilterChange = (newCategory: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (newCategory) {
      params.set('category', newCategory)
    } else {
      params.delete('category')
    }
    router.push(`/shop?${params.toString()}`)
  }

  return (
    <div className="flex gap-6 md:gap-12 lg:gap-16">
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden fixed bottom-8 right-6 z-40 bg-amber-400 hover:bg-amber-300 text-black font-bold px-6 py-3 rounded-full text-sm tracking-wider transition-colors duration-200"
      >
        {showFilters ? 'Hide Filters' : 'Filters'}
      </button>

      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex md:flex-col md:w-64 lg:w-80 shrink-0 ${showFilters ? 'block' : ''}`}>
        <div className="space-y-10 sticky top-24">
          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">Categories</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleFilterChange(null)}
                className={`block text-left text-sm transition-colors duration-200 pb-2 border-b ${ 
                  !activeCategory ? 'text-amber-400 border-amber-400/30' : 'text-zinc-400 hover:text-white border-amber-400/0 hover:border-amber-400/30'
                }`}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleFilterChange(cat.slug)}
                  className={`block text-left text-sm transition-colors duration-200 pb-2 border-b ${
                    activeCategory === cat.slug ? 'text-amber-400 border-amber-400/30' : 'text-zinc-400 hover:text-white border-amber-400/0 hover:border-amber-400/30'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">Price Range</h3>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="5000000"
                step="100000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-xs text-zinc-400">
                <span>₦{priceRange[0].toLocaleString()}</span>
                <span>₦{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">Sort By</h3>
            <div className="space-y-3">
              {[
                { value: 'newest', label: 'Newest Arrivals' },
                { value: 'price-asc', label: 'Price: Low to High' },
                { value: 'price-desc', label: 'Price: High to Low' },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={sortBy === option.value}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-4 h-4 accent-amber-400 cursor-pointer"
                  />
                  <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {(activeCategory || priceRange[1] < 5000000) && (
            <button
              onClick={() => {
                handleFilterChange(null)
                setPriceRange([0, 5000000])
              }}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold tracking-widest uppercase transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header with Sort */}
        <div className="flex items-center justify-between pb-8 mb-8 border-b border-white/5">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Item' : 'Items'} Available
            </p>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="hidden sm:block bg-zinc-900 text-zinc-300 text-xs px-4 py-2 rounded-sm border border-white/10 hover:border-white/20 transition-colors cursor-pointer focus:outline-none focus:border-amber-400"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center border border-dashed border-white/10 rounded-lg">
            <p className="text-zinc-500 text-sm tracking-widest uppercase font-bold">No items found</p>
            <p className="text-zinc-600 text-xs mt-2 uppercase tracking-tight">
              Try adjusting your filters or view all items
            </p>
            <button
              onClick={() => {
                handleFilterChange(null)
                setPriceRange([0, 5000000])
              }}
              className="mt-6 text-xs font-bold text-amber-400 hover:text-amber-300 uppercase tracking-widest transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
