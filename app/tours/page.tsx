'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import ServiceCard from '@/components/ServiceCard'
import { createClient } from '@/lib/supabase'

const supabase = createClient()

type Tour = {
    id: string
    name: string
    location: string
    base_price: number
    image_url: string
    duration_days: number
}

export default function ToursPage() {
    const [tours, setTours] = useState<Tour[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'Asia' | 'Europe' | 'Middle East'>('all')

    const loadTours = React.useCallback(async () => {
        try {
            setLoading(true)
            let query = supabase
                .from('services')
                .select('*')
                .eq('service_type', 'tour')

            if (filter !== 'all') {
                query = query.eq('region', filter)
            }

            const { data, error } = await query.order('name', { ascending: true })

            if (error) throw error
            setTours(data || [])
        } catch (error) {
            console.error('Error loading tours:', error)
        } finally {
            setLoading(false)
        }
    }, [filter])

    useEffect(() => {
        loadTours()
    }, [loadTours])
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/hero-adventure.png"
                    alt="Group Tours"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-6xl font-black mb-4">Group Tours</h1>
                    <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto">
                        Explore the world with like-minded travelers on our expertly guided tours.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 -mt-20 relative z-20">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 mb-12">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-900">Upcoming Departures</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setFilter(filter === 'Asia' ? 'all' : 'Asia')}
                                className={`px-6 py-2 rounded-lg font-bold transition-colors ${filter === 'Asia' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                            >
                                Asia
                            </button>
                            <button
                                onClick={() => setFilter(filter === 'Europe' ? 'all' : 'Europe')}
                                className={`px-6 py-2 rounded-lg font-bold transition-colors ${filter === 'Europe' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                            >
                                Europe
                            </button>
                            <button
                                onClick={() => setFilter(filter === 'Middle East' ? 'all' : 'Middle East')}
                                className={`px-6 py-2 rounded-lg font-bold transition-colors ${filter === 'Middle East' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                            >
                                Middle East
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        [...Array(3)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-3xl h-96 border border-slate-100" />
                        ))
                    ) : tours.length > 0 ? (
                        tours.map(tour => (
                            <ServiceCard
                                key={tour.id}
                                title={tour.name}
                                location={tour.location}
                                price={`Rs ${tour.base_price.toLocaleString()}`}
                                image={tour.image_url || "/hero-adventure.png"}
                                duration={`${tour.duration_days} Days`}
                                link={`/tours/${tour.id}`}
                                tag="GROUP TOUR"
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
                            <p className="text-slate-500 text-lg">No tours found for this region.</p>
                            <button onClick={() => setFilter('all')} className="mt-4 text-red-600 font-bold hover:underline">Show all tours</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
