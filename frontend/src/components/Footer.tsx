'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://web.facebook.com/profile.php?id=100063595659945',
      icon: 'facebook'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/chifash_collection/',
      icon: 'instagram'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: 'twitter'
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/2348133644838',
      icon: 'whatsapp'
    }
  ];

  return (
    <footer className="bg-[#000000] border-t border-white/5 pt-20 pb-10 px-4 sm:px-6 md:px-8 mt-20 sm:mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          {/* Brand & About Text */}
          <div className="lg:col-span-4 space-y-8">
            <div className="relative w-32 h-16">
              <Image
                src="/logo-dark.png"
                alt="CHIFASH Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm font-medium">
              Chifash Collection's defines the intersection of African heritage and contemporary high-fashion. Our mission is to empower the modern trendsetter through exclusive, artisan-crafted designs.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-amber-400 border border-white/10 hover:border-amber-400/50 rounded-full transition-all duration-300"
                >
                  {link.icon === 'instagram' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                    </svg>
                  )}
                  {link.name === 'WhatsApp' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.825 0-3.74.735-5.109 2.103-1.37 1.369-2.113 3.268-2.113 5.093 0 1.823.743 3.721 2.113 5.09 1.369 1.369 3.284 2.104 5.109 2.104 1.823 0 3.74-.735 5.108-2.104 1.37-1.369 2.113-3.267 2.113-5.09 0-1.825-.743-3.724-2.113-5.093-1.369-1.368-3.285-2.103-5.108-2.103m5.109 17.883h-.016c-1.892 0-3.744-.755-5.125-2.127C6.755 20.244 6 18.392 6 16.5c0-2.108.756-4.059 2.125-5.43 1.37-1.371 3.237-2.126 5.109-2.126.033 0 .066 0 .098.003 1.853.03 3.662.776 5.031 2.151 1.369 1.375 2.127 3.217 2.127 5.129 0 1.88-.757 3.74-2.127 5.11-1.369 1.371-3.178 2.117-5.031 2.148"/>
                    </svg>
                  )}
                  {link.name === 'Facebook' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-zinc-500 hover:text-amber-400 text-sm transition-colors uppercase tracking-widest font-medium">Home</Link></li>
              <li><Link href="/shop" className="text-zinc-500 hover:text-amber-400 text-sm transition-colors uppercase tracking-widest font-medium">Collections</Link></li>
              <li><Link href="/about" className="text-zinc-500 hover:text-amber-400 text-sm transition-colors uppercase tracking-widest font-medium">Our Story</Link></li>
              <li><Link href="/account" className="text-zinc-500 hover:text-amber-400 text-sm transition-colors uppercase tracking-widest font-medium">Account</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Support</h4>
            <ul className="space-y-4 text-sm font-medium text-zinc-500">
              <li><a href="#" className="hover:text-amber-400 transition-colors uppercase tracking-widest">FAQ</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors uppercase tracking-widest">Shipping</a></li>
              <li><a href="mailto:chifashcollection@gmail.com" className="hover:text-amber-400 transition-colors">chifashcollection@gmail.com</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Newsletter</h4>
            <p className="text-zinc-400 text-sm font-medium">
              Join the elite. Get early access to limited collections and private sales.
            </p>
            <form className="relative max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border-b border-white/20 px-0 py-3 text-white text-xs tracking-widest focus:outline-none focus:border-amber-400 transition-colors placeholder:text-zinc-600"
              />
              <button className="absolute right-0 bottom-3 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors tracking-widest uppercase">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em] font-bold">
            © {currentYear} CHIFASH COLLECTION. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-zinc-600 text-[10px] uppercase tracking-[0.2em] font-bold">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
