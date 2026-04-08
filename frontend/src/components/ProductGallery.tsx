'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ProductImage } from '@/types/product'

interface ProductGalleryProps {
  images?: ProductImage[]
  name: string
}

export default function ProductGallery({ images = [], name }: ProductGalleryProps) {
  // Helper to get URL from ProductImage object
  const getUrl = (img: ProductImage) => img.image_url || img.image || ''

  const [mainImage, setMainImage] = useState(
    getUrl(images.find(img => img.is_primary) || images[0] || { id: 0, image: '', image_url: '', is_primary: false })
  )
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [selectedThumbnail, setSelectedThumbnail] = useState(0)

  if (images.length === 0) {
    return (
      <div className="aspect-3/4 bg-zinc-900 rounded-lg flex items-center justify-center text-zinc-700 uppercase tracking-widest text-xs border border-white/10">
        <div className="animate-pulse flex flex-col items-center gap-2">
          <div>No Images Available</div>
          <div className="text-[10px] text-zinc-600">Loading images...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
      {/* Main Image with Zoom Effect */}
      <div className="aspect-3/4 relative overflow-hidden bg-zinc-900 border border-white/10 hover:border-amber-400/30 transition-colors duration-300 group rounded-lg">
        {/* Loading Skeleton */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-linear-to-b from-zinc-800/50 to-zinc-900/50 animate-pulse z-10" />
        )}

        <Image
          src={mainImage}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-all duration-500 group-hover:scale-102 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          priority
          onLoadingComplete={() => setIsImageLoaded(true)}
        />

        {/* Zoom Indicator */}
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-sm text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          ZOOM
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="space-y-2 md:space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">View all images</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 gap-1.5 sm:gap-2 md:gap-3">
            {images.map((img, idx) => {
              const url = getUrl(img)
              const isSelected = selectedThumbnail === idx

              return (
                <button
                  key={img.id}
                  onClick={() => {
                    setMainImage(url)
                    setSelectedThumbnail(idx)
                    setIsImageLoaded(false)
                  }}
                  className={`relative shrink-0 aspect-3/4 rounded-md overflow-hidden border-2 transition-all duration-300 group/thumb ${ 
                    isSelected
                      ? 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                  }`}
                  aria-label={`View image ${idx + 1} of ${images.length}`}
                  aria-current={isSelected}
                >
                  <Image
                    src={url}
                    alt={`${name} view ${idx + 1}`}
                    fill
                    sizes="100px"
                    className="object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                  />

                  {/* Number Badge */}
                  <div className="absolute bottom-1 left-1 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                    {idx + 1}
                  </div>

                  {/* Active Indicator */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-amber-400/5 pointer-events-none" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Image Counter */}
          <p className="text-xs text-zinc-500 text-right tracking-wider">
            {selectedThumbnail + 1} of {images.length}
          </p>
        </div>
      )}

      {/* Product Info Banner */}
      <div className="bg-amber-400/5 border border-amber-400/20 rounded-lg p-4 space-y-2">
        <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Premium Imagery</p>
        <p className="text-xs text-zinc-400">All photos are taken in natural light to showcase authentic colors and textures.</p>
      </div>
    </div>
  )
}
