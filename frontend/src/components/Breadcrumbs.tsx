'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Breadcrumbs() {
  const pathname = usePathname()

  // Skip breadcrumbs on home page
  if (pathname === '/') {
    return null
  }

  const segments = pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      const decoded = decodeURIComponent(segment)
      return {
        name: decoded.charAt(0).toUpperCase() + decoded.slice(1).replace('-', ' '),
        href: '/' + pathname.split('/').slice(1, pathname.split('/').indexOf(segment) + 1).join('/'),
      }
    })

  return (
    <nav className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-xs text-zinc-500 tracking-wider">
        <li>
          <Link href="/" className="hover:text-amber-400 transition-colors">
            HOME
          </Link>
        </li>

        {segments.map((segment, idx) => (
          <li key={segment.href} className="flex items-center gap-2">
            <span className="text-zinc-700">•</span>
            {idx === segments.length - 1 ? (
              <span className="text-white font-semibold uppercase">{segment.name}</span>
            ) : (
              <Link href={segment.href} className="hover:text-amber-400 transition-colors uppercase font-semibold">
                {segment.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
