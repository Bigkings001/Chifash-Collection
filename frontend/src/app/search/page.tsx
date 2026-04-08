import Link from 'next/link'

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-black pt-16 sm:pt-20 md:pt-24 lg:pt-28 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 italic font-serif">Search Products</h1>
        
        {/* Search Bar */}
        <div className="mb-8 sm:mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for items, categories, or styles..."
              className="w-full bg-zinc-900 border border-white/20 rounded-sm px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors duration-200"
            />
            <button className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-amber-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-sm font-bold text-xs sm:text-sm hover:bg-amber-300 transition-colors duration-200 min-h-10">
              Search
            </button>
          </div>
        </div>

        {/* Placeholder */}
        <div className="text-center py-16 sm:py-20">
          <svg className="w-12 h-12 sm:w-16 sm:h-16 text-zinc-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-zinc-400 text-base md:text-lg mb-6">Start searching to find products</p>
          <Link
            href="/shop"
            className="inline-block bg-white text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-sm font-bold text-xs sm:text-sm hover:bg-amber-400 transition-colors duration-200 min-h-10 md:min-h-11 flex items-center justify-center"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  )
}
