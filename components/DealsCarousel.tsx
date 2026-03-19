'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
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
}

export default function DealsCarousel() {
    const [deals, setDeals] = useState<Deal[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadDeals()
    }, [])

    async function loadDeals() {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('id, name, base_price, image_url, duration_days, duration_hours, service_type, rating, deal_note')
                .eq('is_seasonal_deal', true)
                .limit(8)
                .order('rating', { ascending: false })

            if (error) throw error
            setDeals(data || [])
        } catch (error) {
            console.error('Error loading deals:', error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <section className="py-8 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2">Exclusive Offers</h2>
                        <h3 className="text-4xl font-black text-slate-900">Seasonal Deals</h3>
                    </div>
                    <Link href="/packages" className="hidden md:flex items-center gap-2 text-slate-900 font-bold hover:text-red-600 transition-colors">
                        View All Offers <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {loading ? (
                        <GridSkeleton count={4} />
                    ) : (
                        deals.map((deal, index) => (
                            <motion.div
                                key={deal.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ServiceCard
                                    id={deal.id}
                                    title={deal.name}
                                    price={deal.base_price}
                                    image={deal.image_url || "/hero-hotel.png"}
                                    duration={deal.duration_days ? `${deal.duration_days} Days` : deal.duration_hours ? `${deal.duration_hours} Hours` : 'Special'}
                                    link={`/${deal.service_type === 'hotel' ? 'hotels' : 'search/details'}/${deal.id}`}
                                    tag={deal.service_type.toUpperCase()}
                                    rating={deal.rating}
                                    service_type={deal.service_type}
                                    isSeasonal={true}
                                    dealNote={deal.deal_note}
                                />
                            </motion.div>
                        ))
                    )}
                </div>

                <div className="mt-6 text-center md:hidden">
                    <Link href="/packages" className="inline-flex items-center gap-2 text-slate-900 font-bold hover:text-red-600 transition-colors">
                        View All Offers <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    )
}
