'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Award,
} from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import CategoryGrid from '@/components/CategoryGrid'
import DealsCarousel from '@/components/DealsCarousel'
import AnnouncementPopup from '@/components/AnnouncementPopup'
import PartnerSlider from '@/components/PartnerSlider'

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
  
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2])

  useEffect(() => {
    async function loadHeroSlides() {
      try {
        const { data, error } = await supabase
          .from('hero_slides')
          .select('id, title, subtitle, description, cta_text, cta_link, image_url, media_type, video_url, order_index')
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
    <div className="min-h-screen bg-white selection:bg-red-100 selection:text-red-900 overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <section ref={targetRef} className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden bg-slate-900">
        <AnimatePresence mode="wait">
          {!loading && heroSlides.length > 0 && (
            <motion.div
              key={currentSlide}
              style={{ y, opacity, scale }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {heroSlides[currentSlide].media_type === 'video' && heroSlides[currentSlide].video_url ? (
                <video
                  src={heroSlides[currentSlide].video_url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={heroSlides[currentSlide]?.image_url || heroSlides[currentSlide]?.image || '/hero-placeholder.png'}
                  alt={heroSlides[currentSlide]?.title || 'Hero Slide'}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Text Content - Minimalist */}
        <div className="absolute inset-0 flex items-center justify-center text-center z-10 pt-20">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {!loading && heroSlides[currentSlide]?.tag && (
                <span className="inline-block py-2 px-6 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                  {heroSlides[currentSlide].tag}
                </span>
              )}
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.05] tracking-tight">
                {heroSlides[currentSlide]?.title}
              </h1>

              <p className="text-lg md:text-xl text-white/70 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                {heroSlides[currentSlide]?.subtitle ? heroSlides[currentSlide].subtitle.replace('<br />', ' ') : ''}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6">
                <Link
                  href={heroSlides[currentSlide]?.link || '#'}
                  className="px-10 py-4 bg-red-600 text-white rounded-full font-black text-xs tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all transform hover:scale-105 shadow-2xl shadow-red-600/20 uppercase"
                >
                  {heroSlides[currentSlide]?.cta || 'Explore Now'}
                </Link>
                <button className="px-10 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full font-black text-xs tracking-[0.2em] hover:bg-white/10 transition-all uppercase">
                  Discover More
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
        >
            <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">Scroll</span>
        </motion.div>

        {/* Slide Indicators - Minimalist */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 transition-all duration-700 rounded-full ${i === currentSlide ? 'bg-red-600 w-8' : 'bg-white/20 w-4 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* Luxury Intro Section - More Whitespace */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-20">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="max-w-2xl"
            >
                <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.5em] mb-6">Premium Travel</h2>
                <h3 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                    Crafting Unforgettable <br /> 
                    <span className="text-slate-300">Global Vacations.</span>
                </h3>
            </motion.div>
            <motion.p 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="max-w-md text-slate-500 font-medium leading-relaxed"
            >
                We specialize in luxury escapes that go beyond the ordinary. 
                From private islands to hidden cultural gems, every journey 
                is meticulously planned for the discerning traveler.
            </motion.p>
          </div>

          <div className="relative z-30">
            <CategoryGrid />
          </div>
        </div>
      </section>

      {/* Deals Carousel with clean background */}
      <section className="bg-slate-50 py-32 overflow-hidden">
         <DealsCarousel />
      </section>

      {/* Enhanced Experience Section */}
      <section className="py-32 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative"
            >
              <div className="aspect-[4/5] relative rounded-[2rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)]">
                <Image
                  src="/hero-hotel.png"
                  alt="Premium Experience"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-slate-900 p-12 rounded-[2rem] shadow-2xl text-white">
                <Award size={40} className="text-red-600 mb-6" />
                <p className="font-black text-2xl leading-tight mb-2 tracking-tight">
                  Accredited & <br />Awarded
                </p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Travel Excellence 2024</p>
              </div>
            </motion.div>

            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-[10px] font-black text-red-600 uppercase tracking-[0.5em]">The TL Advantage</h2>
                <p className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                  Where Expertise Meets <br />
                  <span className="text-slate-300 italic">Pure Inspiration.</span>
                </p>
                <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
                  As IATA accredited travel agents, we provide an unparalleled level of security, 
                  access, and personalization. Join over 10,000 satisfied travelers who have 
                  discovered the world through our lens.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-12 pt-8">
                {[
                  { label: "Elite Partners", value: "500+" },
                  { label: "Client Satisfaction", value: "99%" },
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Slider - Minimalist Overlay */}
      <section className="bg-slate-900 py-32 text-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-8 mb-20">
             <div className="h-px flex-1 bg-white/10" />
             <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40">Our Global Partners</h2>
             <div className="h-px flex-1 bg-white/10" />
          </div>
          <PartnerSlider />
        </div>
      </section>

      <AnnouncementPopup />
    </div>
  )
}
