'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import ServiceCard from '@/components/ServiceCard'
import { createClient } from '@/lib/supabase'

const supabase = createClient()

type Service = {
    id: string
    name: string
    location: string
    base_price: number
    image_url: string
    rating: number
    service_type: string
}

export default function DayPackagesPage() {
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadServices()
    }, [])

    async function loadServices() {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('id, name, location, base_price, image_url, rating, service_type')
                .eq('service_type', 'activity') // Assuming day packages are categorized as activities or we filter by category
                // For now, let's fetch services and maybe there's a specific 'Day Package' tag or category
                // Looking at the database schema, we might need to filter by a specific category name
                .order('name', { ascending: true })

            if (error) throw error
            setServices(data || [])
        } catch (error) {
            console.error('Error loading day packages:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/assets/hero/day_packages_hero_1773391515388.png"
                    alt="Day Packages"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tight">One Perfect Day</h1>
                    <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto font-light">
                        Enjoy our resort lifestyle for the day. High quality amenities and great dining included.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 -mt-20 relative z-20">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 mb-12">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-900">Featured Day Passes</h2>
                        <div className="flex gap-2">
                            <button className="px-6 py-2 bg-slate-100 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors">Popular</button>
                            <button className="px-6 py-2 bg-slate-100 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors">Newest</button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        [...Array(3)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-3xl h-96 border border-slate-100" />
                        ))
                    ) : services.length > 0 ? (
                        services.map(service => (
                            <ServiceCard
                                key={service.id}
                                id={service.id}
                                title={service.name}
                                location={service.location}
                                price={service.base_price}
                                image={service.image_url || "/assets/hero/day_packages_hero_1773391515388.png"}
                                duration="Full Day"
                                link={`/activities/${service.id}`}
                                tag="DAY PASS"
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-slate-100">
                            <p className="text-slate-500 text-lg">No day packages found at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
