
'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import ServiceCard from '@/components/ServiceCard'
import { createClient } from '@/lib/supabase'
import { GridSkeleton } from '@/components/LoadingSkeleton'

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

export default function HotelPackagesPage() {
    const [hotels, setHotels] = useState<Hotel[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadHotels()
    }, [])

    async function loadHotels() {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('id, name, location, base_price, image_url, rating, service_type')
                .eq('service_type', 'hotel')
                .eq('region', 'Mauritius') // Local Deals focus on Mauritius
                .order('name', { ascending: true })

            if (error) throw error
            setHotels(data || [])
        } catch (error) {
            console.error('Error loading hotels:', error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/hero-hotel.png"
                    alt="Local Hotel Deals"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-6xl font-black mb-4 italic font-serif">Local Island Escapes</h1>
                    <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto">
                        Special hotel stays and resident offers across Mauritius.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 -mt-20 relative z-20">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 mb-12">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-900">Featured Local Stays</h2>
                        <div className="flex gap-2">
                            <span className="px-6 py-2 bg-red-50 text-red-600 rounded-full font-bold text-sm">Mauritius Residents Only</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <GridSkeleton count={3} />
                    ) : (
                        hotels.map(hotel => (
                            <ServiceCard
                                key={hotel.id}
                                id={hotel.id}
                                title={hotel.name}
                                location={hotel.location}
                                price={hotel.base_price}
                                image={hotel.image_url || "/hero-hotel.png"}
                                duration={`${hotel.rating} Stars`}
                                link={`/hotels/${hotel.id}`}
                                tag="LOCAL DEAL"
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
