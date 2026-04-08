'use client'

import { useState } from 'react'
import WhatsAppButton from './WhatsAppButton'

interface SizeSelectorProps {
  sizes: string[]
  productName: string
}

export default function SizeSelector({ sizes, productName }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  return (
    <div className="space-y-6 md:space-y-8 lg:space-y-12">
      {/* Size Selection */}
      <div className="space-y-3 md:space-y-4 lg:space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
          <label htmlFor="size-select" className="text-xs font-bold text-zinc-300 uppercase tracking-[0.3em]">
            Select Size
          </label>
          <button 
            onClick={() => setShowSizeGuide(!showSizeGuide)}
            className="text-xs text-amber-400 hover:text-amber-300 uppercase tracking-wider font-semibold transition-colors self-start sm:self-auto"
          >
            Size Guide
          </button>
        </div>

        {/* Size Guide Dropdown */}
        {showSizeGuide && (
          <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-4 md:p-6 text-sm text-zinc-400 space-y-2">
            <p><strong>XS:</strong> Extra Small (32-34)</p>
            <p><strong>S:</strong> Small (34-36)</p>
            <p><strong>M:</strong> Medium (36-38)</p>
            <p><strong>L:</strong> Large (38-40)</p>
            <p><strong>XL:</strong> Extra Large (40-42)</p>
          </div>
        )}

        {/* Size Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 sm:gap-2 md:gap-3">
          {sizes.length > 0 ? (
            sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2.5 md:py-3 lg:py-4 text-xs md:text-sm font-bold rounded-md border-2 transition-all duration-300 uppercase tracking-widest min-h-10 md:min-h-11 ${ 
                  selectedSize === size 
                    ? 'bg-amber-400 border-amber-400 text-black shadow-[0_0_20px_rgba(251,191,36,0.3)]' 
                    : 'bg-zinc-900/50 border-white/10 text-zinc-400 hover:border-amber-400/50 hover:text-white'
                }`}
                aria-pressed={selectedSize === size}
              >
                {size}
              </button>
            ))
          ) : (
            <p className="col-span-full text-center text-zinc-500 text-xs">Sizes not available</p>
          )}
        </div>

        {/* Selection Feedback */}
        {selectedSize && (
          <p className="text-xs text-amber-400 font-semibold tracking-wider animate-pulse">
            ✓ Size {selectedSize} selected
          </p>
        )}
      </div>

      {/* Quantity Selector */}
      <div className="space-y-3 md:space-y-4">
        <label htmlFor="quantity" className="text-xs font-bold text-zinc-300 uppercase tracking-[0.3em] block">
          Quantity
        </label>
        <div className="flex items-center gap-3 sm:gap-4 bg-zinc-900/30 p-3 sm:p-4 md:p-6 rounded-lg border border-white/10">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-md border border-white/20 text-zinc-400 hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-200 active:scale-95 font-bold text-lg min-h-10 md:min-h-11"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input 
            id="quantity"
            type="number" 
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-12 sm:w-14 text-center font-bold text-white text-lg bg-transparent outline-none border-b border-amber-400/30 focus:border-amber-400 transition-colors"
            min="1"
            max="99"
          />
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-md border border-white/20 text-zinc-400 hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-200 active:scale-95 font-bold text-lg min-h-10 md:min-h-11"
            aria-label="Increase quantity"
          >
            +
          </button>
          <span className="text-xs text-zinc-500 ml-auto">
            {quantity > 1 ? `Total: ${quantity} items` : 'Single item'}
          </span>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <WhatsAppButton 
        productName={productName} 
        selectedSize={selectedSize} 
        quantity={quantity} 
      />

      {/* Info Box */}
      <div className="bg-amber-400/5 border border-amber-400/20 rounded-lg p-4 md:p-6 space-y-2">
        <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Pro Tip</p>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Message us via WhatsApp for instant availability check, payment options, and priority delivery to any location in Nigeria.
        </p>
      </div>
    </div>
  )
}
