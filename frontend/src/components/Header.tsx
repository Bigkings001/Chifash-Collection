'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import CartDrawer from './CartDrawer'
import { Product } from '@/types/product'

interface Category {
  id: number
  name: string
  slug: string
}

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Search States
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('http://127.0.0.1:8000/api/products/categories/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (response.ok) {
          const data = await response.json()
          setCategories(Array.isArray(data) ? data : data.results || [])
        } else {
          console.error('Failed to fetch categories:', response.status)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Search Logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        setIsSearching(true)
        const response = await fetch(`http://127.0.0.1:8000/api/products/?search=${encodeURIComponent(searchQuery)}`)
        if (response.ok) {
          const data = await response.json()
          setSearchResults(Array.isArray(data) ? data.slice(0, 5) : (data.results?.slice(0, 5) || []))
        }
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  // Focus input when open
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex items-center justify-between min-h-fit">
        {/* Logo */}
        <Link 
          href="/" 
          className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 hover:opacity-80 transition-opacity duration-300 flex-shrink-0 -my-2 sm:-my-3 md:-my-4"
          title="CHIFASH Home"
        >
          <Image 
            src="/logo-dark.png" 
            alt="CHIFASH Logo" 
            fill
            className="object-contain"
            priority
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/shop" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">New Arrivals</Link>
          <Link href="/shop?category=native" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Native Wear</Link>
          <Link href="/shop?category=footwear" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Footwear</Link>
        </nav>

        {/* WhatsApp CTA (Desktop) */}
        <div className="hidden lg:block">
          <a 
            href="https://wa.me/2340000000000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-amber-400 hover:bg-amber-300 text-black px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_4px_20px_rgba(251,191,36,0.2)] hover:shadow-[0_4px_25px_rgba(251,191,36,0.3)] hover:-translate-y-0.5"
          >
            WhatsApp Styling
          </a>
        </div>

        {/* Collections Dropdown (Desktop) */}
        <div 
          className="hidden md:block relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button
            className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white border border-white/20 hover:border-amber-400 px-4 md:px-6 py-2.5 md:py-3 rounded-sm transition-all duration-200 hover:text-amber-400 flex items-center gap-2"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            Collections
            <svg 
              className={`w-3 h-3 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-56 bg-zinc-950 border border-white/10 rounded-sm shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="px-4 py-6 text-xs text-zinc-500 text-center">
                  <div className="animate-spin inline-block w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full mb-2"></div>
                  <p>Loading...</p>
                </div>
              ) : categories.length > 0 ? (
                categories.map((category, index) => (
                  <Link
                    key={category.slug}
                    href={`/shop?category=${category.slug}`}
                    onClick={() => setIsDropdownOpen(false)}
                    className={`block px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-amber-400 hover:bg-black/50 transition-colors duration-150 ${
                      index !== categories.length - 1 ? 'border-b border-white/5' : ''
                    }`}
                  >
                    {category.name}
                  </Link>
                ))
              ) : (
                <div className="px-4 py-3 text-xs text-zinc-500">No categories found</div>
              )}
            </div>
          )}
        </div>

        {/* CTA Buttons and Icons */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-6">
          {/* Search Section */}
          <div className="relative flex items-center">
            {isSearchOpen && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-zinc-900 border border-white/10 rounded-full px-4 py-1.5 w-64 sm:w-80 md:w-96 animate-in fade-in slide-in-from-right-4 duration-300 z-50">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white text-xs w-full focus:outline-none placeholder:text-zinc-500"
                />
                <button 
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                  className="ml-2 text-zinc-400 hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Search Results Dropdown */}
                {(searchQuery.trim() || isSearching) && (
                  <div className="absolute top-full right-0 mt-3 w-full bg-zinc-950 border border-white/10 rounded-sm shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {isSearching ? (
                      <div className="px-4 py-6 text-center">
                        <div className="animate-spin inline-block w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full mb-2"></div>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Searching...</p>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="divide-y divide-white/5">
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                          >
                            <div className="relative w-10 h-10 rounded-xs overflow-hidden bg-zinc-900 flex-shrink-0">
                              {product.primary_image && (
                                <Image src={product.primary_image} alt={product.name} fill className="object-cover" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-bold text-white truncate group-hover:text-amber-400 transition-colors">{product.name}</p>
                              <p className="text-[10px] text-amber-400/80 font-medium">₦{Number(product.price).toLocaleString()}</p>
                            </div>
                          </Link>
                        ))}
                        <Link 
                          href={`/shop?search=${encodeURIComponent(searchQuery)}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="block px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-widest text-amber-400 hover:bg-amber-400 hover:text-black transition-all"
                        >
                          View All Results
                        </Link>
                      </div>
                    ) : searchQuery.trim() && (
                      <div className="px-4 py-6 text-center text-zinc-500">
                        <p className="text-[10px] uppercase tracking-widest">No products found</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`text-white hover:text-amber-400 transition-colors duration-200 p-2 hover:bg-white/5 rounded-sm min-h-10 min-w-10 flex items-center justify-center ${isSearchOpen ? 'opacity-0' : 'opacity-100'}`}
              title="Search"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-white hover:text-amber-400 transition-colors duration-200 p-2 hover:bg-white/5 rounded-sm relative min-h-10 min-w-10 flex items-center justify-center"
            title="Cart"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {/* Cart Badge */}
            <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">0</span>
          </button>

          {/* Account Icon */}
          <Link
            href="/account"
            className="text-white hover:text-amber-400 transition-colors duration-200 p-2 hover:bg-white/5 rounded-sm min-h-10 min-w-10 flex items-center justify-center"
            title="Account"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          </Link>

          {/* Mobile Collections Button */}
          <div 
            className="md:hidden relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link
              href="/shop"
              className="text-[10px] font-bold uppercase tracking-wider text-white border border-white/20 hover:border-amber-400 px-3 py-2 rounded-sm transition-all duration-200 hover:text-amber-400"
            >
              Collections
            </Link>
          </div>
        </div>
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}
