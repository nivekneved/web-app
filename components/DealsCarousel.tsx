'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { GridSkeleton } from '@/components/LoadingSkeleton'
import ServiceCard from './ServiceCard'

const supabase = createClient()

type Deal = {
    id: string
    name: string
    base_price: number
    image_url: string
    duration_days?: number
    duration_hours?: number
    service_type: string
    rating?: number
    is_seasonal_deal?: boolean
    deal_note?: string
    region?: string
    location?: string
    description?: string
    short_description?: string
}

export default function DealsCarousel({ data: externalData }: { data?: Deal[] }) {
    const [deals, setDeals] = useState<Deal[]>(externalData || [])
    const [loading, setLoading] = useState(!externalData)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [itemsPerPage, setItemsPerPage] = useState(4)

    // Handle responsiveness
    useEffect(() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth >= 1280) setItemsPerPage(4)
            else if (window.innerWidth >= 1024) setItemsPerPage(3)
            else if (window.innerWidth >= 768) setItemsPerPage(2)
            else setItemsPerPage(1)
        }
        updateItemsPerPage()
        window.addEventListener('resize', updateItemsPerPage)
        return () => window.removeEventListener('resize', updateItemsPerPage)
    }, [])

    useEffect(() => {
        if (externalData) {
            setDeals(externalData)
            setLoading(false)
            return
        }
        loadDeals()
    }, [externalData])

    async function loadDeals() {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('id, name, base_price, image_url, duration_days, duration_hours, service_type, rating, deal_note, region, location, description, short_description')
                .eq('is_seasonal_deal', true)
                .limit(12) // increase limit for better slider experience
                .order('rating', { ascending: false })

            if (error) throw error
            setDeals(data || [])
        } catch (error) {
            console.error('Error loading deals:', error)
        } finally {
            setLoading(false)
        }
    }

    const nextSlide = useCallback(() => {
        if (deals.length === 0) return
        setCurrentIndex((prev) => (prev + 1) % Math.max(1, deals.length - itemsPerPage + 1))
    }, [deals.length, itemsPerPage])

    const prevSlide = () => {
        if (deals.length === 0) return
        setCurrentIndex((prev) => (prev - 1 + Math.max(1, deals.length - itemsPerPage + 1)) % Math.max(1, deals.length - itemsPerPage + 1))
    }

    // Auto-slide logic
    useEffect(() => {
        if (isPaused || loading || deals.length <= itemsPerPage) return
        const interval = setInterval(nextSlide, 4000)
        return () => clearInterval(interval)
    }, [isPaused, loading, deals.length, itemsPerPage, nextSlide])

    if (loading) return <section className="py-8 bg-slate-50"><div className="container mx-auto px-4"><GridSkeleton count={4} /></div></section>

    return (
        <section className="py-12 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.5em] mb-4">Exclusive Offers</h2>
                        <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">Seasonal Deals</h3>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <Link href="/packages" className="hidden md:flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] hover:text-red-600 transition-all mr-6">
                            View All <ArrowRight size={14} />
                        </Link>
                        
                        <div className="flex items-center gap-2">
                             <button 
                                onClick={prevSlide}
                                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-red-600 hover:text-white hover:bg-red-600 transition-all shadow-sm"
                                aria-label="Previous slide"
                             >
                                <ChevronLeft size={20} />
                             </button>
                             <button 
                                onClick={nextSlide}
                                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-red-600 hover:text-white hover:bg-red-600 transition-all shadow-sm"
                                aria-label="Next slide"
                             >
                                <ChevronRight size={20} />
                             </button>
                        </div>
                    </div>
                </div>

                <div 
                    className="relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="overflow-hidden">
                        <motion.div 
                            className="flex gap-8"
                            animate={{ x: `-${currentIndex * (100 / itemsPerPage)}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            style={{ width: `${(deals.length / itemsPerPage) * 100}%` }}
                        >
                            {deals.map((deal) => (
                                <div 
                                    key={deal.id} 
                                    className="flex-shrink-0"
                                    style={{ width: `calc(${100 / (deals.length)}% - ${(8 * (deals.length - 1)) / deals.length}px)` }}
                                >
                                    <ServiceCard
                                        id={deal.id}
                                        title={deal.name}
                                        price={deal.base_price}
                                        image={deal.image_url || "/assets/placeholders/hero-hotel.png"}
                                        duration={deal.duration_days ? `${deal.duration_days} Days` : deal.duration_hours ? `${deal.duration_hours} Hours` : 'Special'}
                                        link={`/${deal.service_type === 'hotel' ? 'hotels' : 'search/details'}/${deal.id}`}
                                        tag={deal.service_type.toUpperCase()}
                                        rating={deal.rating}
                                        service_type={deal.service_type}
                                        isSeasonal={true}
                                        dealNote={deal.deal_note}
                                        region={deal.region}
                                        location={deal.location}
                                        description={deal.description}
                                        short_description={deal.short_description}
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-3 mt-12">
                        {Array.from({ length: Math.max(1, deals.length - itemsPerPage + 1) }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`h-1.5 transition-all duration-500 rounded-full ${currentIndex === i ? 'bg-red-600 w-10' : 'bg-slate-200 w-4 hover:bg-slate-300'}`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="/packages" className="inline-flex items-center gap-2 text-slate-900 font-bold hover:text-red-600 transition-colors">
                        View All Offers <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    )
}
