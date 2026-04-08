import { getProducts } from '@/lib/api'
import ProductCard from '@/components/ProductCard'
import HeroCarousel from '@/components/HeroCarousel'
import { Product } from '@/types/product'
import Link from 'next/link'

export default async function HomePage() {
  const { results: featured } = await getProducts({ featured: true })

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Carousel Section */}
      <HeroCarousel />

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32 lg:py-40 bg-black">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 md:mb-20 gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white italic font-serif">Featured Pieces</h2>
            <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-lg tracking-wide leading-relaxed">
              A carefully curated selection of our most sought-after essentials, handpicked for the discerning individual.
            </p>
          </div>
          <Link href="/shop" className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400 hover:text-amber-300 transition-all min-h-10 flex items-center">
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {featured?.length > 0 ? (
            featured.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-white/5 rounded-lg">
              <p className="text-zinc-600 text-sm tracking-widest uppercase">New arrivals coming soon</p>
            </div>
          )}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-[#050505] border-y border-white/5 py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 sm:gap-16 md:gap-20">
          <div className="space-y-4 md:space-y-6">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-medium tracking-wide text-white">Premium Quality</h3>
            <p className="text-sm text-zinc-500 leading-loose">
              Every piece is vetted for superior craftsmanship and material durability. We curate, not compromise.
            </p>
          </div>
          <div className="space-y-4 md:space-y-6">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5-4a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-medium tracking-wide text-white">Personal Service</h3>
            <p className="text-sm text-zinc-500 leading-loose">
              Direct WhatsApp access to stylists for personalized assistance, sizing guidance, and convenient delivery.
            </p>
          </div>
          <div className="space-y-4 md:space-y-6">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-medium tracking-wide text-white">Authentic Style</h3>
            <p className="text-sm text-zinc-500 leading-loose">
              Carefully selected collections that represent contemporary elegance and timeless sophistication for Nigeria.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
