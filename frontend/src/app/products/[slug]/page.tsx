import { getProduct } from '@/lib/api'
import ProductGallery from '@/components/ProductGallery'
import ProductDetail from '@/components/ProductDetail'
import Link from 'next/link'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16 md:py-24 lg:py-32">
      <nav className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
        <Link href="/shop" className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-accent transition-colors flex items-center gap-2 sm:gap-3 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Shop
        </Link>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-24">
        <section>
          <ProductGallery images={product.images} name={product.name} />
        </section>

        <section>
          <ProductDetail product={product} />
        </section>
      </div>
    </main>
  )
}
