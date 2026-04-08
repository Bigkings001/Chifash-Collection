'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types/product'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
  isLoading?: boolean
}


function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="relative overflow-hidden bg-slate-800 aspect-3/4 mb-3 sm:mb-4 md:mb-6 rounded-sm" />
      <div className="space-y-2 md:space-y-3">
        <div className="h-2.5 sm:h-3 bg-slate-800 w-24 rounded-sm" />
        <div className="h-3 sm:h-3.5 bg-slate-800 w-32 rounded-sm" />
        <div className="h-3 sm:h-3.5 bg-slate-800 w-20 rounded-sm" />
      </div>
    </div>
  )
}

export default function ProductCard({ product, isLoading = false }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  if (isLoading) {
    return <LoadingSkeleton />
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div 
        className="h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden bg-slate-950 aspect-3/4 mb-3 sm:mb-4 md:mb-6 rounded-sm shrink-0 border border-zinc-800 group-hover:border-amber-400/30 transition-colors duration-300">
          {/* Stock Badge */}
          <div className="absolute top-3 left-3 z-20">
            {product.stock > 0 ? (
              <span className="bg-white/90 backdrop-blur-sm text-[10px] text-black font-bold px-2 py-1 uppercase tracking-widest rounded-xs">
                In Stock
              </span>
            ) : (
              <span className="bg-red-500/90 backdrop-blur-sm text-[10px] text-white font-bold px-2 py-1 uppercase tracking-widest rounded-xs">
                Sold Out
              </span>
            )}
          </div>
          {/* Main Image */}
          {product.primary_image ? (
            <>
              <Image
                src={product.primary_image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={`object-cover transition-all duration-500 ${
                  imageLoaded ? 'scale-100' : 'scale-110'
                } ${isHovered ? 'scale-105' : 'scale-100'}`}
                onLoadingComplete={() => setImageLoaded(true)}
              />
              
              {/* Hover Overlay */}
              <div className={`absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
                  {/* Size Selector */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-zinc-300 tracking-widest uppercase">Available Sizes</p>
                    <div className="flex gap-2 flex-wrap">
                      {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                        <span key={size} className="text-xs bg-zinc-700/60 hover:bg-amber-400/80 text-zinc-100 px-2.5 py-1 rounded-xs transition-colors font-medium cursor-pointer">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-2">
                    <button onClick={(e) => { e.preventDefault(); }} className="bg-white hover:bg-zinc-200 text-black font-bold py-2 sm:py-2.5 px-2 sm:px-3 rounded-xs text-[10px] tracking-widest transition-colors duration-200 active:scale-95 min-h-10 md:min-h-11">
                      ADD TO CART
                    </button>
                    <button onClick={(e) => { e.preventDefault(); }} className="bg-zinc-800/80 hover:bg-zinc-700 text-white font-bold py-2 sm:py-2.5 px-2 sm:px-3 rounded-xs text-[10px] tracking-widest transition-colors duration-200 active:scale-95 min-h-10 md:min-h-11 border border-white/20">
                      QUICK VIEW
                    </button>
                  </div>
                </div>
              </div>

              {/* Loading Skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-slate-800 animate-pulse" />
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-700 uppercase tracking-widest text-xs">
              No Image
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2 flex-1 flex flex-col justify-between">
          {/* Category */}
          <p className="text-xs md:text-sm text-amber-400 uppercase tracking-widest font-bold">
            {product.category?.name || 'UNCATEGORIZED'}
          </p>

          {/* Name */}
          <h3 className="text-base md:text-lg font-semibold tracking-tight leading-snug transition-colors duration-200 group-hover:text-amber-400 text-zinc-100 line-clamp-2">
            {product.name}
          </h3>

          {/* Price & Stock info */}
          <div className="space-y-1 mt-1">
            <div className="flex items-baseline gap-2">
              <p className="text-base md:text-lg font-bold text-white">
                ₦{Number(product.price).toLocaleString()}
              </p>
              {product.originalPrice && (
                <p className="text-xs md:text-sm text-zinc-500 line-through">
                  ₦{Number(product.originalPrice).toLocaleString()}
                </p>
              )}
            </div>
            {product.stock > 0 && product.stock <= 5 && (
              <p className="text-[10px] font-bold text-amber-400 uppercase tracking-tighter">
                Only {product.stock} left in stock
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
