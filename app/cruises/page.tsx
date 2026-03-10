'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import ServiceCard from '@/components/ServiceCard'
import { createClient } from '@/lib/supabase'

const supabase = createClient()

type Cruise = {
    id: string
    name: string
    location: string
    base_price: number
    image_url: string
    duration_days: number
    service_type: string
}

export default function CruisesPage() {
    const [cruises, setCruises] = useState<Cruise[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadCruises()
    }, [])

    async function loadCruises() {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('service_type', 'cruise')
                .order('name', { ascending: true })

            if (error) throw error
            setCruises(data || [])
        } catch (error) {
            console.error('Error loading cruises:', error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/hero-cruise.png"
                    alt="Cruises"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-6xl font-black mb-4">Luxury Cruises</h1>
                    <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto">
                        Set sail for extraordinary destinations with our premium cruise partners.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 -mt-20 relative z-20">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 mb-12">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-900">Available Packages</h2>
                        <div className="flex gap-2">
                            <button className="px-6 py-2 bg-slate-100 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors">Filter</button>
                            <button className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-red-600 transition-colors">Sort By</button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        [...Array(3)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-3xl h-96 border border-slate-100" />
                        ))
                    ) : (
                        cruises.map(cruise => (
                            <ServiceCard
                                key={cruise.id}
                                title={cruise.name}
                                location={cruise.location}
                                price={`Rs ${cruise.base_price.toLocaleString()}`}
                                image={cruise.image_url || "/hero-cruise.png"}
                                duration={`${cruise.duration_days} Days`}
                                link={`/cruises/${cruise.id}`}
                                tag="CRUISE"
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
