import Link from 'next/link'

export default function CartPage() {
  return (
    <div className="min-h-screen bg-black pt-16 sm:pt-20 md:pt-24 lg:pt-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-12 italic font-serif">Shopping Cart</h1>
        
        {/* Empty Cart State */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-8 sm:p-12 text-center">
          <svg className="w-16 h-16 sm:w-20 sm:h-20 text-zinc-600 mx-auto mb-4 sm:mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3">Your cart is empty</h2>
          <p className="text-zinc-400 mb-6 sm:mb-8 text-sm md:text-lg">Start shopping to add items to your cart</p>
          <Link
            href="/shop"
            className="inline-block bg-amber-400 text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-sm font-bold hover:bg-amber-300 transition-colors duration-200 text-xs sm:text-sm min-h-10 md:min-h-11 flex items-center"
          >
            Start Shopping
          </Link>
        </div>

        {/* Cart Summary (for future use) */}
        <div className="mt-8 sm:mt-12 grid md:grid-cols-3 gap-6 md:gap-8">
          <div className="md:col-span-2">
            <div className="border border-white/10 rounded-lg p-6 text-center text-zinc-400 text-sm">
              <p>Cart items will appear here</p>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="border border-white/10 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-6">Order Summary</h3>
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>₦0.00</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>
                <span>₦0.00</span>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between text-white font-semibold">
                <span>Total</span>
                <span>₦0.00</span>
              </div>
            </div>
            <button className="w-full bg-zinc-700 text-white py-3 rounded-sm font-bold cursor-not-allowed opacity-50 min-h-11">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
