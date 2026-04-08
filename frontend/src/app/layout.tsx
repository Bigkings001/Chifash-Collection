import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from './providers';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CHIFASH | Midnight Premium Boutique",
  description: "Curated high-fashion collections from Nigeria. Browse and order seamlessly via WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-foreground antialiased selection:bg-amber-400 selection:text-black`}>
        <Providers>
          {/* Navigation */}
          <Header />

          <main className="pt-22 md:pt-26 min-h-screen bg-black">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
