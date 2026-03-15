'use client'

import React, { useState, useEffect, useMemo } from 'react'
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
    const [sortBy, setSortBy] = useState<string>('name-asc')
    const [filterPrice, setFilterPrice] = useState<number | null>(null)

    useEffect(() => {
        loadCruises()
    }, [])

    async function loadCruises() {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('id, name, location, base_price, image_url, duration_days, service_type')
                .eq('service_type', 'cruise')

            if (error) throw error
            setCruises(data || [])
        } catch (error) {
            console.error('Error loading cruises:', error)
        } finally {
            setLoading(false)
        }
    }

    const processedCruises = useMemo(() => {
        let result = [...cruises]

        if (filterPrice) {
            result = result.filter(c => c.base_price <= filterPrice)
        }

        result.sort((a, b) => {
            if (sortBy === 'price-asc') return a.base_price - b.base_price
            if (sortBy === 'price-desc') return b.base_price - a.base_price
            if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
            return 0
        })

        return result
    }, [cruises, sortBy, filterPrice])
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
                        <h2 className="text-2xl font-bold text-slate-900">Available Packages ({processedCruises.length})</h2>
                        <div className="flex gap-4">
                            <select 
                                onChange={(e) => setFilterPrice(e.target.value ? Number(e.target.value) : null)}
                                className="px-6 py-2 bg-slate-50 border-none rounded-lg font-bold text-slate-600 focus:ring-2 focus:ring-red-600 appearance-none cursor-pointer"
                            >
                                <option value="">All Prices</option>
                                <option value="50000">Under Rs 50k</option>
                                <option value="100000">Under Rs 100k</option>
                                <option value="200000">Under Rs 200k</option>
                            </select>
                            <select 
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold focus:ring-2 focus:ring-red-600 cursor-pointer"
                            >
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="price-asc">Price (Low to High)</option>
                                <option value="price-desc">Price (High to Low)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        [...Array(3)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-3xl h-96 border border-slate-100" />
                        ))
                    ) : processedCruises.length === 0 ? (
                        <div className="col-span-full py-20 text-center text-slate-400 font-bold">
                            No cruise packages found matching your criteria.
                        </div>
                    ) : (
                        processedCruises.map(cruise => (
                            <ServiceCard
                                key={cruise.id}
                                id={cruise.id}
                                title={cruise.name}
                                location={cruise.location}
                                price={cruise.base_price}
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
