'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import Image from 'next/image';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-1/5 bg-black border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 md:p-4 border-b border-white/10">
          <h2 className="text-xs md:text-sm font-bold text-white uppercase tracking-widest">Cart</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-amber-400 transition-colors duration-200 p-1 min-h-9 min-w-9 flex items-center justify-center flex-shrink-0"
            aria-label="Close cart"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-[calc(100%-70px)]">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-3 md:p-4 text-center">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-zinc-600 mb-2 md:mb-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-zinc-400 mb-3 md:mb-4 text-xs md:text-sm leading-tight">Your cart is empty</p>
              <Link
                href="/shop"
                onClick={onClose}
                className="bg-amber-400 text-black px-4 md:px-5 py-2 rounded-sm font-bold hover:bg-amber-300 transition-colors duration-200 text-xs md:text-sm min-h-9 md:min-h-10 flex items-center justify-center whitespace-nowrap"
              >
                Shop
              </Link>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-2 md:gap-3 pb-3 md:pb-4 border-b border-white/10 last:border-b-0"
                  >
                    {/* Item Image */}
                    {item.image && (
                      <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0 rounded bg-zinc-800 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs md:text-sm font-bold text-white truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-zinc-500">Size: {item.size}</p>
                      <p className="text-xs text-amber-400 font-semibold">
                        ₦{Number(item.price).toLocaleString()}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded border border-white/20 text-zinc-400 hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all text-xs"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="text-xs font-semibold text-white w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded border border-white/20 text-zinc-400 hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all text-xs"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-xs text-zinc-500 hover:text-red-400 transition-colors"
                          aria-label="Remove item"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 p-3 md:p-4 space-y-3">
                <div className="flex justify-between text-white text-xs md:text-sm mb-3">
                  <span className="font-semibold">Total:</span>
                  <span className="text-amber-400 font-bold">
                    ₦{Number(total).toLocaleString()}
                  </span>
                </div>
                <a 
                  href="https://wa.me/2348133644838?text=I%20would%20like%20to%20place%20an%20order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-amber-400 text-black py-2 rounded-sm font-bold hover:bg-amber-300 transition-colors duration-200 uppercase tracking-widest text-center text-xs min-h-10 flex items-center justify-center"
                >
                  Order
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
