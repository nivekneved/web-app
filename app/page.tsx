'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Globe,
  Award,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import CategoryGrid from '@/components/CategoryGrid'
import DealsCarousel from '@/components/DealsCarousel'
import AnnouncementPopup from '@/components/AnnouncementPopup'

import { toast } from 'sonner'
import { createClient } from '@/lib/supabase'

const supabase = createClient()

type HeroSlide = {
  title: string
  subtitle: string
  cta_text?: string
  cta_link?: string
  image_url: string
  media_type: string
  video_url: string | null
  tag?: string
  cta?: string
  link?: string
  image?: string
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadHeroSlides() {
      try {
        const { data, error } = await supabase
          .from('hero_slides')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true })

        if (error) throw error
        if (data && data.length > 0) {
          setHeroSlides(data.map(slide => ({
            ...slide,
            subtitle: slide.subtitle || slide.description || '',
            cta: slide.cta_text || 'Explore',
            link: slide.cta_link || '/search',
            image: slide.image_url,
            tag: 'PREMIUM TRAVEL',
          })))
        } else {
          // Fallback to defaults if no data
          setHeroSlides([
            {
              title: "Elevate Your Journey",
              subtitle: "Experience luxury travel redefined with our exclusive flight deals.",
              cta: "Book Your Flight",
              link: "/flights",
              image: "/hero-flight.png",
              tag: "PREMIUM TRAVEL",
              media_type: 'image',
              video_url: null,
              image_url: "/hero-flight.png"
            }
          ])
        }
      } catch (error) {
        console.error('Error loading hero slides:', error)
      } finally {
        setLoading(false)
      }
    }

    loadHeroSlides()
  }, [])

  useEffect(() => {
    if (heroSlides.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  return (
    <div className="min-h-screen bg-white selection:bg-red-100 selection:text-red-900">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          {!loading && heroSlides.length > 0 && (
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              {heroSlides[currentSlide].media_type === 'video' && heroSlides[currentSlide].video_url ? (
                <video
                  src={heroSlides[currentSlide].video_url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover scale-105"
                />
              ) : (
                <Image
                  src={heroSlides[currentSlide]?.image_url || heroSlides[currentSlide]?.image || '/hero-placeholder.png'}
                  alt={heroSlides[currentSlide]?.title || 'Hero Slide'}
                  fill
                  className="object-cover scale-105"
                  priority
                  unoptimized
                />
              )}
              {/* Darker overlay for better text contrast */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Text Content */}
              <div className="absolute inset-0 flex items-center justify-center text-center z-10">
                <div className="max-w-4xl mx-auto px-4">
                  {heroSlides[currentSlide].tag && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6"
                    >
                      {heroSlides[currentSlide].tag}
                    </motion.div>
                  )}

                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-lg"
                  >
                    {heroSlides[currentSlide].title}
                  </motion.h1>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl md:text-2xl text-white/90 font-medium mb-10 max-w-2xl mx-auto drop-shadow-md"
                    dangerouslySetInnerHTML={{ __html: heroSlides[currentSlide].subtitle }}
                  />

                  {heroSlides[currentSlide].cta && heroSlides[currentSlide].link && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <a
                        href={heroSlides[currentSlide].link}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-white hover:text-slate-900 transition-all transform hover:scale-105 shadow-xl shadow-red-600/20"
                      >
                        {heroSlides[currentSlide].cta}
                      </a>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 transition-all duration-500 rounded-full shadow-lg ${i === currentSlide ? 'bg-red-600 w-12' : 'bg-white/50 w-6 hover:bg-white'}`}
            />
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <div className="-mt-16 relative z-30">
        <CategoryGrid />
      </div>

      {/* Deals Carousel */}
      <DealsCarousel />

      {/* Trust & Experience Section (Kept for Premium Feel) */}
      <section className="py-24 relative overflow-hidden bg-slate-900 text-white">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-sm font-bold text-red-500 uppercase tracking-[0.3em] mb-4">Why Travel Lounge</h2>
              <p className="text-4xl lg:text-5xl font-black mb-8 leading-tight">
                Authentic experiences <br />
                <span className="text-slate-400">crafted with care.</span>
              </p>
              <p className="text-lg text-slate-400 mb-12 leading-relaxed max-w-xl">
                As an IATA accredited travel provider, we&apos;ve spent over 15 years perfecting the art of travel.
              </p>

              <div className="grid grid-cols-2 gap-8">
                {[
                  { label: "Years Experience", value: "15+" },
                  { label: "Global Partners", value: "500+" },
                  { label: "Happy Travelers", value: "10K+" },
                  { label: "Accreditation", value: "IATA" }
                ].map((stat, i) => (
                  <div key={i} className="border-l-2 border-red-600 pl-6">
                    <div className="text-3xl font-black mb-1">{stat.value}</div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="aspect-square relative rounded-[3rem] overflow-hidden border-8 border-slate-800 shadow-2xl">
                <Image
                  src="/hero-hotel.png"
                  alt="Premium Experience"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-red-600 p-10 rounded-3xl shadow-2xl">
                <Award size={40} className="text-white mb-4" />
                <p className="text-white font-black text-lg leading-tight">
                  Award Winning <br />Service 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-slate-50 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <Globe size={300} strokeWidth={1} />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Join the Elite Club</h2>
              <p className="text-lg text-slate-500 mb-10">
                Receive exclusive travel inspirations, hidden gems, and premium offers directly in your inbox.
              </p>
              <form onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const form = e.currentTarget;
                const emailInput = form.elements.namedItem('email') as HTMLInputElement;
                const email = emailInput?.value;
                if (!email) return;

                const submitButton = form.querySelector('button') as HTMLButtonElement;
                submitButton.disabled = true;
                submitButton.innerHTML = 'Subscribing...';

                try {
                  const { error } = await supabase
                    .from('subscribers')
                    .insert([{ email }]);

                  if (error) {
                    if (error.code === '23505') {
                      toast.error('You are already subscribed!');
                    } else {
                      throw error;
                    }
                  } else {
                    toast.success('Thank you for subscribing!');
                    form.reset();
                  }
                } catch (err) {
                  console.error('Error subscribing:', err);
                  toast.error('Failed to subscribe. Please try again.');
                } finally {
                  submitButton.disabled = false;
                  submitButton.innerHTML = 'Subscribe';
                }
              }} className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-600 transition-all font-medium text-slate-900"
                />
                <button type="submit" className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-red-600 transition-all transform hover:scale-105">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <AnnouncementPopup />
    </div>
  )
}
