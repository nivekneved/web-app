'use client'

import React from 'react'
import Image from 'next/image'
import ServiceCard from '@/components/ServiceCard'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { GridSkeleton } from '@/components/LoadingSkeleton'

const supabase = createClient()

type Package = {
    id: string
    name: string
    location: string
    base_price: number
    image_url: string
    duration_hours: number | null
    service_type: string
}

export default function PackagesPage() {
    const [packages, setPackages] = useState<Package[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'sea' | 'land'>('all')

    useEffect(() => {
        async function loadPackages() {
            try {
                setLoading(true)
                let query = supabase
                    .from('services')
                    .select('id, name, location, base_price, image_url, duration_hours, service_type, amenities')
                    .eq('service_type', 'activity')

                if (filter === 'sea') {
                    query = query.contains('amenities', ['Sea Adventure'])
                } else if (filter === 'land') {
                    query = query.contains('amenities', ['Land Adventure'])
                }

                const { data, error } = await query.order('name', { ascending: true })

                if (error) throw error
                setPackages(data || [])
            } catch (error) {
                console.error('Error loading packages:', error)
            } finally {
                setLoading(false)
            }
        }

        loadPackages()
    }, [filter])

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero */}
            <div className="relative h-[450px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/hero-adventure.png"
                    alt="Day Packages"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="relative z-10 text-center text-white px-4 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Day Packages</h1>
                    <p className="text-xl md:text-2xl text-slate-200 font-medium">
                        Make every day an adventure with our curated activities. 
                        From the heights of Chamarel to the depths of the Indian Ocean.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 mb-12">
                    <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 mb-2">Explore Mauritius</h2>
                            <p className="text-slate-500 font-medium">Find your perfect daily escape</p>
                        </div>
                        <div className="flex p-1.5 bg-slate-100 rounded-2xl w-full md:w-auto">
                            <button
                                onClick={() => setFilter('all')}
                                className={`flex-1 md:flex-none px-8 py-3 rounded-[1.25rem] font-bold transition-all duration-300 ${filter === 'all' ? 'bg-white text-red-600 shadow-md scale-100' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter('sea')}
                                className={`flex-1 md:flex-none px-8 py-3 rounded-[1.25rem] font-bold transition-all duration-300 ${filter === 'sea' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Sea Adventures
                            </button>
                            <button
                                onClick={() => setFilter('land')}
                                className={`flex-1 md:flex-none px-8 py-3 rounded-[1.25rem] font-bold transition-all duration-300 ${filter === 'land' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Land Adventures
                            </button>
                        </div>
                    </div>
                </div>

                {packages.length === 0 && !loading ? (
                    <div className="bg-white rounded-[2.5rem] p-20 text-center shadow-xl border border-slate-100">
                        <p className="text-slate-400 text-xl italic font-medium">Looking for more adventures? Coming soon...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {loading ? (
                            <GridSkeleton count={3} />
                        ) : (
                            packages.map(pkg => (
                                <ServiceCard
                                    key={pkg.id}
                                    id={pkg.id}
                                    title={pkg.name}
                                    location={pkg.location}
                                    price={pkg.base_price}
                                    image={pkg.image_url || "/hero-adventure.png"}
                                    duration={pkg.duration_hours ? `${pkg.duration_hours} Hours` : "Varied"}
                                    link={`/activities/${pkg.id}`}
                                    tag="ACTIVITY"
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}