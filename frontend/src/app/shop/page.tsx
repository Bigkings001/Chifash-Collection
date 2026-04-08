import ProductsByCategory from '@/components/ProductsByCategory'

export default async function ShopPage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24">
        <header className="mb-12 sm:mb-16 md:mb-20 space-y-3 sm:space-y-4 md:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">Curated Collection</h1>
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl">Discover refined pieces selected for quality, craftsmanship, and timeless style.</p>
        </header>
        <ProductsByCategory />
      </div>
    </main>
  )
}
