'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
    <footer className="bg-white border-t border-gray-200 py-12 sm:py-16 md:py-20 px-4 sm:px-6 mt-16 sm:mt-20 md:mt-32">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <div className="relative w-24 h-12">
              <Image
                src="/images/Logo/dark mode logo.png"
                alt="CHIFASH Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Premium fashion for the modern trendsetter.
            </p>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">CONTACT US</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+2348133644838" className="hover:text-gray-900 transition-colors">0813 364 4838</a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:chifashcollection@gmail.com" className="hover:text-gray-900 transition-colors">chifashcollection@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-gray-900 transition-colors">Home</Link></li>
              <li><Link href="/account" className="hover:text-gray-900 transition-colors">Account</Link></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">FOLLOW US</h4>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors border border-gray-200 hover:border-gray-900 rounded"
                >
                  {link.icon === 'facebook' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5c-.563-.074-2.313-.471-4.369-.471-4.952 0-6.631 3.125-6.631 8.834v2.667z"/>
                    </svg>
                  )}
                  {link.icon === 'instagram' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                    </svg>
                  )}
                  {link.icon === 'twitter' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 002.856-3.915 9.964 9.964 0 01-2.824.856 4.958 4.958 0 00-8.604 4.514c-4.165-.172-7.948-2.213-10.466-5.252a4.934 4.934 0 00-.666 2.489c0 1.717.87 3.229 2.188 4.112a4.929 4.929 0 01-2.224-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  )}
                  {link.icon === 'whatsapp' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.825 0-3.74.735-5.109 2.103-1.37 1.369-2.113 3.268-2.113 5.093 0 1.823.743 3.721 2.113 5.09 1.369 1.369 3.284 2.104 5.109 2.104 1.823 0 3.74-.735 5.108-2.104 1.37-1.369 2.113-3.267 2.113-5.09 0-1.825-.743-3.724-2.113-5.093-1.369-1.368-3.285-2.103-5.108-2.103m5.109 17.883h-.016c-1.892 0-3.744-.755-5.125-2.127C6.755 20.244 6 18.392 6 16.5c0-2.108.756-4.059 2.125-5.43 1.37-1.371 3.237-2.126 5.109-2.126.033 0 .066 0 .098.003 1.853.03 3.662.776 5.031 2.151 1.369 1.375 2.127 3.217 2.127 5.129 0 1.88-.757 3.74-2.127 5.11-1.369 1.371-3.178 2.117-5.031 2.148"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 py-6" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            © {currentYear} Chifash Collection's. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
