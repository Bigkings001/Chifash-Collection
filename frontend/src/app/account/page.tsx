import Link from 'next/link'

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-black pt-16 sm:pt-20 md:pt-24 lg:pt-28 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-12 italic font-serif">My Account</h1>
        
        {/* Account Not Authenticated State */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-8 sm:p-12 text-center">
          <svg className="w-16 h-16 sm:w-20 sm:h-20 text-zinc-600 mx-auto mb-4 sm:mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3">Sign in to your account</h2>
          <p className="text-zinc-400 mb-6 sm:mb-8 text-sm md:text-lg">View your orders, manage your profile, and track deliveries</p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/login"
              className="bg-amber-400 text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-sm font-bold hover:bg-amber-300 transition-colors duration-200 text-xs sm:text-sm min-h-10 md:min-h-11 flex items-center justify-center"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="border border-amber-400 text-amber-400 px-6 sm:px-8 py-2.5 sm:py-3 rounded-sm font-bold hover:bg-amber-400/10 transition-colors duration-200 text-xs sm:text-sm min-h-10 md:min-h-11 flex items-center justify-center"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Account Features Preview */}
        <div className="mt-8 sm:mt-12 grid md:grid-cols-3 gap-4 sm:gap-6">
          <div className="border border-white/10 rounded-lg p-6">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-400/10 rounded-lg flex items-center justify-center mb-4 shrink-0">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2 text-sm md:text-base">Order History</h3>
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">View all your previous purchases and track current orders</p>
          </div>

          <div className="border border-white/10 rounded-lg p-6">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-400/10 rounded-lg flex items-center justify-center mb-4 shrink-0">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Profile Settings</h3>
            <p className="text-zinc-400 text-sm">Update your personal information and preferences</p>
          </div>

          <div className="border border-white/10 rounded-lg p-6">
            <div className="w-12 h-12 bg-amber-400/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Saved Items</h3>
            <p className="text-zinc-400 text-sm">Keep track of your favorite products and wishlist</p>
          </div>
        </div>

        {/* Return to Shop */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="text-amber-400 hover:text-amber-300 font-semibold text-sm uppercase tracking-wider transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
