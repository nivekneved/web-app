import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingSocial from '@/components/FloatingSocial'
import { AuthProvider } from '@/contexts/AuthContext'
import { WishlistProvider } from '@/contexts/WishlistContext'
import { ThemeProvider } from 'next-themes'
import { CurrencyProvider } from '@/contexts/CurrencyContext'
import BackToTop from '@/components/BackToTop'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'


import { createClient } from '@/lib/supabaseServer'

const font = Outfit({ 
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

    const seo = data?.value as {metaTitle?: string, metaDescription?: string, metaKeywords?: string, ogImage?: string} || {}

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

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: currentLocale } = await params
  
  // Providing all locales for static generation
  const messages = (await getMessages({locale: currentLocale})) as {[key: string]: string}

  return (
    <html lang={currentLocale}>
      <body className={font.className}>
        <NextIntlClientProvider locale={currentLocale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <CurrencyProvider>
              <AuthProvider>
                <WishlistProvider>
                  <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-grow">
                      {children}
                    </main>
                    <FloatingSocial />
                    <Footer />
                    <BackToTop />
                  </div>
                </WishlistProvider>
              </AuthProvider>
            </CurrencyProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}