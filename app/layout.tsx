import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingSocial from '@/components/FloatingSocial'
import { AuthProvider } from '@/contexts/AuthContext'
import { WishlistProvider } from '@/contexts/WishlistContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { CurrencyProvider } from '@/contexts/CurrencyContext'
import BackToTop from '@/components/BackToTop'


const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Travel Lounge | Your Gateway to Extraordinary Journeys',
  description: 'Discover amazing hotels, cruises, tours, and travel experiences worldwide',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <ThemeProvider>
          <CurrencyProvider>
            <AuthProvider>
              <WishlistProvider>
                <Navbar />
                <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
                  {children}
                </main>
                <Footer />
                <BackToTop />
                <FloatingSocial />
                <Toaster position="top-right" richColors />
              </WishlistProvider>
            </AuthProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>

  )
}
