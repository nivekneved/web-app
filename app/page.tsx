'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { sanitizeHtml } from '@/lib/sanitize'
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
import { resolveImageUrl } from '@/lib/image'
import { useSettings } from '@/contexts/SettingsContext'

type HeroSlide = {
  title: string
  subtitle: string
  cta_text?: string
  cta_link?: string
  image_url: string
  media_type: string
  video_url: string | null
  animation_type?: string
  duration?: number
  start_date?: string
  end_date?: string
  mobile_image_url?: string
  badge_text?: string
  badge_color?: string
  tag?: string
  cta?: string
  link?: string
  image?: string
}

export default function HomePage() {
  const { generalConfig: settings } = useSettings()
  const labels = (settings?.ui_labels || {}) as Record<string, string>
  
  const [currentSlide, setCurrentSlide] = useState(0)
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([])
  const [content, setContent] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  
  const supabase = useMemo(() => createClient(), [])
  const targetRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    async function loadHeroSlides() {
      try {
        const { data, error } = await supabase
          .from('hero_slides')
          .select('id, title, subtitle, description, cta_text, cta_link, image_url, media_type, video_url, order_index, animation_type, duration, start_date, end_date, mobile_image_url, badge_text, badge_color')
          .eq('is_active', true)
          .order('order_index', { ascending: true })

        if (error) throw error
        if (data && data.length > 0) {
          const now = new Date();
          const filteredData = data.filter(slide => {
            const start = slide.start_date ? new Date(slide.start_date) : null;
            const end = slide.end_date ? new Date(slide.end_date) : null;
            if (start && start > now) return false;
            if (end && end < now) return false;
            return true;
          });

          setHeroSlides(filteredData.map(slide => ({
            ...slide,
            subtitle: slide.subtitle || slide.description || '',
            cta: slide.cta_text || labels.hero_default_cta || 'Explore',
            link: slide.cta_link || '/search',
            image: slide.image_url,
            tag: slide.badge_text || labels.hero_default_tag || 'TRAVEL DEALS',
          })))
        } else {
          setHeroSlides([
            {
              title: labels.hero_fallback_title || "Elevate Your Journey",
              subtitle: labels.hero_fallback_subtitle || "Travel with ease and comfort with our best flight deals.",
              cta: labels.hero_fallback_cta || "Book Your Flight",
              link: "/flights",
              image: "/assets/placeholders/hero-flight.png",
              tag: labels.hero_fallback_tag || "TRAVEL DEALS",
              media_type: 'image',
              video_url: null,
              image_url: "/assets/placeholders/hero-flight.png"
            }
          ])
        }
      } catch (error) {
        console.error('Error loading hero slides:', error)
      } finally {
        setLoading(false)
      }
    }

    async function loadContent() {
      try {
        const { data } = await supabase
          .from('content_blocks')
          .select('section_key, content')
          .eq('page_slug', 'home')
        if (data) {
          const blocks: Record<string, any> = {}
          data.forEach(b => blocks[b.section_key] = b.content)
          setContent(blocks)
        }
      } catch (err) {
        console.error('Error loading home content:', err)
      }
    }

    const init = async () => {
      await Promise.all([loadHeroSlides(), loadContent()])
    }

    init()
  }, [supabase, labels])

  useEffect(() => {
    if (heroSlides.length === 0) return
    const autoPlayDuration = heroSlides[currentSlide]?.duration || 6000;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, autoPlayDuration)
    return () => clearInterval(timer)
  }, [heroSlides, currentSlide])

  return (
    <div className="min-h-screen bg-white selection:bg-red-100 selection:text-red-900 overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <section ref={targetRef} className="relative h-[55vh] min-h-[400px] flex items-center overflow-hidden bg-slate-900">
        <AnimatePresence mode="wait">
          {!loading && heroSlides.length > 0 && (
            <motion.div
              key={currentSlide}
              style={{ y, opacity }}
              initial={{ 
                opacity: 0,
                scale: heroSlides[currentSlide].animation_type === 'ken-burns' ? 1.2 : 1.05,
                x: heroSlides[currentSlide].animation_type === 'parallax-shift' ? 20 : 0,
                y: heroSlides[currentSlide].animation_type === 'slide-up' ? 50 : 0
              }}
              animate={{ 
                opacity: 1,
                scale: heroSlides[currentSlide].animation_type === 'ken-burns' ? 1.05 : 1,
                x: 0,
                y: 0
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1.5, 
                ease: "easeOut",
                scale: { duration: heroSlides[currentSlide].duration ? heroSlides[currentSlide].duration / 1000 : 6 }
              }}
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
                <picture className="absolute inset-0">
                  {heroSlides[currentSlide]?.mobile_image_url && (
                    <source
                      media="(max-width: 640px)"
                      srcSet={heroSlides[currentSlide].mobile_image_url}
                    />
                  )}
                  <Image
                    src={resolveImageUrl(heroSlides[currentSlide]?.image_url || heroSlides[currentSlide]?.image, '/assets/placeholders/hero-placeholder.png')}
                    alt={heroSlides[currentSlide]?.title || 'Hero Slide'}
                    fill
                    className="object-cover"
                    priority
                  />
                </picture>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Text Content - Minimalist */}
        <div className="absolute inset-0 flex items-center justify-center text-center z-10 pt-10">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {!loading && (heroSlides[currentSlide]?.tag || heroSlides[currentSlide]?.badge_text) && (
                <span 
                    style={{ 
                        backgroundColor: heroSlides[currentSlide]?.badge_color || 'rgba(255,255,255,0.05)',
                        borderColor: heroSlides[currentSlide]?.badge_color ? 'transparent' : 'rgba(255,255,255,0.1)'
                    }}
                    className="inline-block py-2 px-6 rounded-full backdrop-blur-sm border text-white text-[10px] font-black uppercase tracking-[0.4em] mb-4"
                >
                  {heroSlides[currentSlide].badge_text || heroSlides[currentSlide].tag}
                </span>
              )}
              
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-[1.05]">
                {heroSlides[currentSlide]?.title}
              </h1>
              <p className="text-lg md:text-2xl text-white font-bold mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                {heroSlides[currentSlide]?.subtitle ? heroSlides[currentSlide].subtitle.replace('<br />', ' ') : ''}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6">
                <Link
                  href={heroSlides[currentSlide]?.link || '#'}
                  className="px-10 py-5 bg-red-600 text-white rounded-full font-black text-xs tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all transform hover:scale-105 shadow-2xl shadow-red-600/40 uppercase outline-none focus:ring-4 focus:ring-red-600/50"
                  aria-label={`Explore ${heroSlides[currentSlide]?.title}`}
                >
                  {heroSlides[currentSlide]?.cta || labels.hero_explore_cta || 'Explore Now'}
                </Link>
                <Link
                  href="/about"
                  className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-black text-xs tracking-[0.2em] hover:bg-white/20 transition-all uppercase outline-none focus:ring-4 focus:ring-white/50"
                  aria-label="Discover more about our travel services"
                >
                  {labels.hero_secondary_cta || 'Discover More'}
                </Link>
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
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">{labels.scroll_label || 'Scroll'}</span>
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

      {/* Luxury Intro Section */}
      <section className="py-10 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-6">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="max-w-2xl"
            >
                <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.5em] mb-6">
                    {content.services?.label}
                </h2>
                <h3 
                    className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(content.services?.title || '') }}
                />
            </motion.div>
            <motion.p 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="max-w-md text-slate-500 font-medium leading-relaxed"
            >
                {content.services?.description}
            </motion.p>
          </div>

          <div className="relative z-30">
            <CategoryGrid />
          </div>
        </div>
      </section>

      {/* Deals Carousel */}
      <section className="bg-slate-50 py-10 overflow-hidden">
         <DealsCarousel />
      </section>

      {/* Enhanced Experience Section */}
      <section className="py-10 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative"
            >
              <div className="aspect-[4/3] relative rounded-[2rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)]">
                 <Image
                  src={resolveImageUrl(settings?.experienceSectionImage, "/assets/placeholders/hero-hotel.png")}
                  alt="Modern Experience"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-slate-900 p-12 rounded-[2rem] shadow-2xl text-white">
                <Award size={40} className="text-red-600 mb-6" />
                <p className="font-black text-2xl leading-tight mb-2 tracking-tight">
                  {labels.accredited_title || 'Accredited & Awarded'}
                </p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{labels.global_excellence_label || 'Global Travel Excellence 2024'}</p>
              </div>
            </motion.div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-[10px] font-black text-red-600 uppercase tracking-[0.5em]">
                    {content.advantage?.label}
                </h2>
                <h3 
                    className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(content.advantage?.title || '') }}
                />
                <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
                  {content.advantage?.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-12 pt-8">
                {(content.advantage?.stats || []).map((stat: { label: string; value: string }, i: number) => (
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

      {/* Partner Slider */}
      <section className="bg-slate-50 py-10 text-slate-900">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-8 mb-6">
             <div className="h-px flex-1 bg-slate-200" />
             <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400">
                {content.partners?.label}
             </h2>
             <div className="h-px flex-1 bg-slate-200" />
           </div>
          <PartnerSlider />
        </div>
      </section>

      <AnnouncementPopup />
    </div>
  )
}
