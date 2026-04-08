'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import SizeSelector from '@/components/SizeSelector';
import AddToCartButton from '@/components/AddToCartButton';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-8 sm:space-y-10 md:space-y-12">
      <div className="space-y-3 sm:space-y-4 md:space-y-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="h-px w-6 sm:w-8 bg-accent/30" />
          <p className="text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-accent">
            {product.category?.name}
          </p>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none italic font-serif">
          {product.name}
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-300 tracking-tight">
          ₦{Number(product.price).toLocaleString()}
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8 border-t border-white/5 pt-8 sm:pt-10">
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">
            The Details
          </h3>
          <p className="text-zinc-500 leading-relaxed text-sm whitespace-pre-wrap font-light">
            {product.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:gap-8 text-xs uppercase tracking-[0.2em] text-zinc-600 font-bold">
          <div className="space-y-1">
            <p className="text-zinc-500">Material</p>
            <p className="text-zinc-300">{product.material || 'Premium Blend'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-zinc-500">Fit</p>
            <p className="text-zinc-300">{product.fit || 'Contemporary'}</p>
          </div>
        </div>

        {product.care_instructions && (
          <div className="space-y-3 md:space-y-4 pt-8 sm:pt-10 border-t border-white/5">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">
              Care Instructions
            </h3>
            <p className="text-zinc-500 text-xs leading-loose font-light">
              {product.care_instructions}
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-white/5 pt-8 sm:pt-10">
        <div className="space-y-6 md:space-y-8 lg:space-y-12">
          {/* Size Selection */}
          <div className="space-y-3 md:space-y-4 lg:space-y-6">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-[0.3em] block">
              Select Size
            </label>

            {/* Size Guide */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-4 md:p-6 text-sm text-zinc-400 space-y-2">
              <p>
                <strong>XS:</strong> Extra Small (32-34)
              </p>
              <p>
                <strong>S:</strong> Small (34-36)
              </p>
              <p>
                <strong>M:</strong> Medium (36-38)
              </p>
              <p>
                <strong>L:</strong> Large (38-40)
              </p>
              <p>
                <strong>XL:</strong> Extra Large (40-42)
              </p>
            </div>

            {/* Size Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 sm:gap-2 md:gap-3">
              {product.available_sizes && product.available_sizes.length > 0 ? (
                product.available_sizes.map((size) => (
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
                <p className="col-span-full text-center text-zinc-500 text-xs">
                  Sizes not available
                </p>
              )}
            </div>

            {selectedSize && (
              <p className="text-xs text-amber-400 font-semibold tracking-wider animate-pulse">
                ✓ Size {selectedSize} selected
              </p>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="space-y-3 md:space-y-4">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-[0.3em] block">
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
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
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
        </div>
      </div>

      {/* Add to Cart Button */}
      <div>
        <AddToCartButton
          product={product}
          selectedSize={selectedSize}
          quantity={quantity}
        />
      </div>

      {/* Order via WhatsApp */}
      <a
        href={`https://wa.me/2348133644838?text=I%20am%20interested%20in%20ordering%20the%20${encodeURIComponent(
          product.name
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-zinc-900/50 hover:bg-zinc-800/50 text-white border border-white/20 font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-full uppercase tracking-[0.3em] text-xs sm:text-sm transition-colors duration-200 text-center min-h-12 md:min-h-14 flex items-center justify-center"
      >
        Contact us via WhatsApp
      </a>

      <div className="bg-zinc-900/50 rounded-lg md:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/5 space-y-3 md:space-y-4">
        <div className="flex items-start gap-3 sm:gap-4 md:gap-5">
          <span className="text-xl md:text-2xl opacity-80 flex-shrink-0">✦</span>
          <div className="space-y-1 md:space-y-2">
            <h4 className="text-xs font-bold text-accent uppercase tracking-[0.3em]">
              Concierge Service
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Our artisans are ready to assist. Click the WhatsApp button to discuss sizing,
              bespoke adjustments, and global delivery logistics with a dedicated stylist.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
