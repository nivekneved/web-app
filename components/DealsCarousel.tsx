'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { GridSkeleton } from '@/components/LoadingSkeleton'

const supabase = createClient()

type Deal = {
    id: string
    name: string
    base_price: number
    image_url: string
    duration_days?: number
    duration_hours?: number
    service_type: string
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
                .select('id, name, base_price, image_url, duration_days, duration_hours, service_type, rating')
                .limit(4)
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
        <section className="py-12 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
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
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={deal.image_url || "/hero-hotel.png"}
                                        alt={deal.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        Limited Time
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-3">
                                        <Clock size={14} />
                                        {deal.duration_days ? `${deal.duration_days} Days` : deal.duration_hours ? `${deal.duration_hours} Hours` : 'Special'}
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-red-600 transition-colors">
                                        {deal.name}
                                    </h4>
                                    <div className="flex items-end justify-between mt-6">
                                        <div>
                                            <span className="text-xs text-slate-400 font-bold block">From</span>
                                            <span className="text-xl font-black text-slate-900">Rs {deal.base_price.toLocaleString()}</span>
                                        </div>
                                        <Link href={`/${deal.service_type}s/${deal.id}`} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-red-600 group-hover:text-white transition-all">
                                            <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
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
