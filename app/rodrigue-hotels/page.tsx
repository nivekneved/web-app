'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import ServiceCard from '@/components/ServiceCard'
import { createClient } from '@/lib/supabase'

const supabase = createClient()

type Hotel = {
    id: string
    name: string
    location: string
    base_price: number
    image_url: string
    rating: number
    service_type: string
}

export default function RodriguesHotelsPage() {
    const [hotels, setHotels] = useState<Hotel[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadHotels()
    }, [])

    async function loadHotels() {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('service_type', 'hotel')
                .eq('region', 'Rodrigues')
                .order('name', { ascending: true })

            if (error) throw error
            setHotels(data || [])
        } catch (error) {
            console.error('Error loading Rodrigues hotels:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/assets/hero/rodrigues_hotels_hero_1773391499243.png"
                    alt="Rodrigues Hotels"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-6xl font-black mb-4">Island Living, Rodrigues Style</h1>
                    <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto">
                        Experience genuine hospitality in our curated selection of Rodrigues stays.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 -mt-20 relative z-20">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 mb-12">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-900">Authentic Stays</h2>
                        <div className="flex gap-2">
                            <button className="px-6 py-2 bg-slate-100 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors">By Price</button>
                            <button className="px-6 py-2 bg-slate-100 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors">By Stars</button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        [...Array(3)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-3xl h-96 border border-slate-100" />
                        ))
                    ) : hotels.length > 0 ? (
                        hotels.map(hotel => (
                            <ServiceCard
                                key={hotel.id}
                                title={hotel.name}
                                location={hotel.location}
                                price={`Rs ${hotel.base_price.toLocaleString()} / night`}
                                image={hotel.image_url || "/assets/hero/rodrigues_hotels_hero_1773391499243.png"}
                                duration={`${hotel.rating} Stars`}
                                link={`/hotels/${hotel.id}`}
                                tag="RODRIGUES"
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-slate-100">
                            <p className="text-slate-500 text-lg">No hotels found in Rodrigues at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
