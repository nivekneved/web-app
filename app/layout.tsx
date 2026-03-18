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


import { createClient } from '@/lib/supabaseServer'

const outfit = Outfit({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export async function generateMetadata(): Promise<Metadata> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'seo_config')
      .single()

    const seo = data?.value as any || {}

    return {
      title: seo.metaTitle || 'Travel Lounge | Your Gateway to Extraordinary Journeys',
      description: seo.metaDescription || 'Discover amazing hotels, cruises, tours, and travel experiences worldwide',
      keywords: seo.metaKeywords || 'travel, mauritius, holidays',
      openGraph: {
        title: seo.metaTitle,
        description: seo.metaDescription,
        images: seo.ogImage ? [{ url: seo.ogImage }] : [],
      }
    }
  } catch (error) {
    return {
      title: 'Travel Lounge | Your Gateway to Extraordinary Journeys',
      description: 'Discover amazing hotels, cruises, tours, and travel experiences worldwide',
    }
  }
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
