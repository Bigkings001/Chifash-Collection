'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Hero slides data
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1539618651481-b34be7f84921?w=1400&q=80',
      alt: 'Premium Fashion Collection',
      title: 'Luxury Redefined',
      subtitle: 'Discover our exclusive collection',
      cta: 'Shop Now'
    },
    {
      image: 'https://images.unsplash.com/photo-1504439773649-fc7dc9eb91e7?w=1400&q=80',
      alt: 'Trending Styles',
      title: 'Timeless Elegance',
      subtitle: 'Curated pieces for the modern wardrobe',
      cta: 'Explore'
    },
    {
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=80',
      alt: 'Summer Collection',
      title: 'Season\'s Finest',
      subtitle: 'Limited edition selections available',
      cta: 'Browse'
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoplay, slides.length]);

  // Handle manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoplay(true);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoplay(true);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoplay(true);
  };

  return (
    <section className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[32rem] overflow-hidden bg-black">
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div className="relative w-full h-full bg-gradient-to-r from-black/60 to-black/40">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-start px-4 sm:px-6 md:px-12 lg:px-20">
              <div className="max-w-2xl animate-in fade-in slide-in-from-left-8 duration-700">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 tracking-tight">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-zinc-300 mb-4 md:mb-8">
                  {slide.subtitle}
                </p>
                <Link
                  href="/shop"
                  className="inline-block px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 bg-amber-400 text-black font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 min-h-10 sm:min-h-11 md:min-h-12 flex items-center justify-center"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        onMouseEnter={() => setIsAutoplay(false)}
        onMouseLeave={() => setIsAutoplay(true)}
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/10 hover:bg-white/30 text-white transition-all duration-200 group min-h-10 min-w-10 md:min-h-12 md:min-w-12 flex items-center justify-center"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        onMouseEnter={() => setIsAutoplay(false)}
        onMouseLeave={() => setIsAutoplay(true)}
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/10 hover:bg-white/30 text-white transition-all duration-200 min-h-10 min-w-10 md:min-h-12 md:min-w-12 flex items-center justify-center"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 md:gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 md:h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-amber-400 w-8'
                : 'bg-white/50 w-2 md:w-3 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 z-20 text-white text-xs font-mono bg-black/40 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded">
        {currentSlide + 1} / {slides.length}
      </div>
    </section>
  );
}
