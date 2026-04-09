'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 sm:pt-32">
      {/* Section 1: The Hero - Brand Essence */}
      <section className="relative px-4 sm:px-6 md:px-8 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-block px-3 py-1 bg-amber-400/10 border border-amber-400/20 rounded-full">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em]">Our Essence</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight tracking-tight">
              Defining <br />
              <span className="text-zinc-600">African</span> Elegance.
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl font-medium max-w-xl leading-relaxed">
              CHIFASH COLLECTION'S is more than a fashion house; it is a movement that bridges the gap between traditional heritage and the global avant-garde.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/shop" className="bg-white hover:bg-zinc-200 text-black px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 text-center">
                Explore The Collection
              </Link>
            </div>
          </div>
          
          <div className="relative aspect-3/4 rounded-2xl overflow-hidden border border-white/5 group">
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/60 z-10 transition-opacity duration-700 opacity-60 group-hover:opacity-40"></div>
            <Image 
              src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070&auto=format&fit=crop" 
              alt="Premium High Fashion" 
              fill
              className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Our Legacy - The Story */}
      <section className="py-32 bg-zinc-950/30 border-y border-white/5 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-5 space-y-12">
              <h2 className="text-3xl font-bold text-white uppercase tracking-[0.1em] border-l-2 border-amber-400 pl-6">
                From Local Roots <br />
                To Global Presence
              </h2>
              <div className="space-y-6 text-zinc-400 font-medium leading-relaxed">
                <p>
                  Born of a desire to see Nigerian artisan craftsmanship recognized on the world stage, CHIFASH began as a small boutique focused on bespoke native wear. We saw beauty where the world saw tradition, and we saw luxury where others saw simplicity.
                </p>
                <p>
                  Today, we have evolved into a complete lifestyle brand, offering everything from signature native ensembles to premium footwear, each piece carrying the soul of its creator and the pride of its heritage.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-xl overflow-hidden border border-white/5 mt-12 hover:-translate-y-2 transition-transform duration-500">
                <Image src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop" alt="Legacy Fabric" fill className="object-cover" />
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden border border-white/5 hover:-translate-y-2 transition-transform duration-500">
                <Image src="https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935&auto=format&fit=crop" alt="Premium Leather" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Artisan Excellence - The Craft */}
      <section className="px-4 sm:px-6 md:px-8 py-32">
        <div className="max-w-7xl mx-auto text-center space-y-20">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">The Artisan's Touch</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full"></div>
            <p className="text-zinc-500 font-medium text-lg italic">"A CHIFASH piece is not manufactured; it is composed."</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-6 p-8 bg-white/5 rounded-2xl border border-white/5 hover:border-amber-400/20 transition-all duration-300">
              <div className="text-amber-400 font-bold text-4xl">01</div>
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Material Sourcing</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">We scour the continent for the finest fabrics, ensuring each thread meets our rigorous standards for comfort and durability.</p>
            </div>
            <div className="space-y-6 p-8 bg-white/5 rounded-2xl border border-white/5 hover:border-amber-400/20 transition-all duration-300">
              <div className="text-amber-400 font-bold text-4xl">02</div>
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Precision Design</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">Every cut is intentional. Every button is placed with purpose. Our designs favor the silhouette of the modern achiever.</p>
            </div>
            <div className="space-y-6 p-8 bg-white/5 rounded-2xl border border-white/5 hover:border-amber-400/20 transition-all duration-300">
              <div className="text-amber-400 font-bold text-4xl">03</div>
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Finishing Details</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">Our master tailors and cobblers spend hours on final polish, ensuring the "Exclusive" label is earned by every single piece.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: The Vision - Modern Trendsetter */}
      <section className="relative px-4 sm:px-6 md:px-8 py-40 bg-linear-to-b from-black to-zinc-950">
        <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400/20 via-transparent to-transparent blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
          <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tighter">
            Join the <span className="text-amber-400">Elite</span> Circle.
          </h2>
          <p className="text-zinc-400 text-xl font-medium leading-relaxed">
            CHIFASH is for those who treat style as a legacy. Those who don't just follow trends, but define them. Experience the ultimate in African luxury.
          </p>
          <div className="pt-8">
            <Link href="/shop" className="group relative inline-flex items-center gap-4 text-white text-xs font-bold uppercase tracking-[0.3em] overflow-hidden">
              <span className="relative z-10">New Arrivals</span>
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
