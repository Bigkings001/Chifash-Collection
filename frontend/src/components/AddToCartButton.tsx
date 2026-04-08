'use client';

import { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { Product } from '@/types/product';

interface AddToCartButtonProps {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export default function AddToCartButton({
  product,
  selectedSize,
  quantity,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    setIsAdding(true);

    try {
      // Create a unique ID for the cart item
      const cartItemId = `${product.id}-${selectedSize}-${Date.now()}`;

      addItem({
        id: cartItemId,
        productId: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        quantity,
        image: product.primary_image,
      });

      setIsAdded(true);

      // Reset the added confirmation after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-full uppercase tracking-[0.3em] text-xs sm:text-sm transition-all duration-200 text-center min-h-12 md:min-h-14 flex items-center justify-center font-bold ${
        isAdded
          ? 'bg-green-500 hover:bg-green-600 text-white'
          : 'bg-accent hover:bg-accent/90 text-white'
      } ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isAdding ? 'Adding...' : isAdded ? '✓ Added to Cart' : 'Add to Cart'}
    </button>
  );
}
