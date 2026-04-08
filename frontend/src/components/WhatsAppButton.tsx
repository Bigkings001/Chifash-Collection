'use client'

import { useState } from 'react'

interface WhatsAppButtonProps {
  productName: string
  selectedSize: string
  quantity: number
}

export default function WhatsAppButton({ productName, selectedSize, quantity }: WhatsAppButtonProps) {
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER
  const [error, setError] = useState(false)

  const handleOrder = () => {
    if (!selectedSize) {
      setError(true)
      setTimeout(() => setError(false), 2000)
      return
    }
    const message = encodeURIComponent(
      `Hi! I'd like to order from the Chifash Collection:\n\n✨ Item: ${productName}\n📏 Size: ${selectedSize}\n📦 Qty: ${quantity}\n\nPlease confirm availability and share payment details.`
    )
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank')
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleOrder}
        className={`w-full py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-500 flex items-center justify-center gap-3
                   ${error 
                      ? 'bg-red-900/20 border-red-500 text-red-500' 
                      : 'bg-white text-black hover:bg-accent ring-1 ring-white/10 hover:ring-accent shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-accent/40 hover:-translate-y-1'}`}
      >
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current">
          <path d="M17.472 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.298-.771.968-.94 1.157-.17.189-.338.212-.638.062-.3-.15-1.272-.469-2.426-1.493-.896-.798-1.5-1.784-1.674-2.082-.174-.3-.022-.462.128-.612.135-.135.301-.35.451-.525.149-.174.198-.298.298-.497.1-.199.05-.374-.025-.524-.075-.15-.673-1.62-.922-2.213-.242-.581-.487-.502-.673-.512-.173-.008-.372-.01-.572-.01-.2 0-.524.075-.798.374-.275.3-.1.742-.1 1.05 0 .285.3 1.05.3 1.76 0 .71-.9 2.5 1.5 4.3 1.2 1.1 2.3 1.8 3.5 2.1 1.2.3 2.1.2 2.6.2.6 0 1.2-.4 1.7-.8.5-.4.7-1.1.7-1.7s-.2-1.3-.3-1.7c-.1-.4-.2-.5-.5-.62zM12.004 20c-1.448 0-2.86-.33-4.129-.96l-.297-.15-3.078.808.822-3.004-.165-.263C4.522 15.163 4 13.623 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm0-18C6.477 2 2 6.477 2 12c0 1.9.524 3.682 1.433 5.217L2 22l4.908-1.288c1.51.82 3.203 1.288 5.092 1.288 5.523 0 10-4.477 10-10S17.523 2 12.004 2z"/>
        </svg>
        {error ? 'Please Select a Size' : 'Secure with Styling Access'}
      </button>
      <p className="text-[10px] text-zinc-600 text-center uppercase tracking-[0.2em] font-medium">
        Fast Global Logistics • Secure In-Chat Checkout
      </p>
    </div>
  )
}
