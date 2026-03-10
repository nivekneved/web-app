'use client'

import React from 'react'
import Image from 'next/image'
import ServiceCard from '@/components/ServiceCard'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

const supabase = createClient()

type Package = {
    id: string
    name: string
    location: string
    base_price: number
    image_url: string
    duration: string
    service_type: string
}

export default function PackagesPage() {
    const [packages, setPackages] = useState<Package[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadPackages() {
            try {
                const { data, error } = await supabase
                    .from('services')
                    .select('*')
                    .eq('service_type', 'activity')
                    .order('name', { ascending: true })

                if (error) throw error
                setPackages(data || [])
            } catch (error) {
                console.error('Error loading packages:', error)
            } finally {
                setLoading(false)
            }
        }

        loadPackages()
    }, [])
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/hero-adventure.png"
                    alt="Day Packages"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-6xl font-black mb-4">Day Packages</h1>
                    <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto">
                        Make every day an adventure with our curated activities.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 -mt-20 relative z-20">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 mb-12">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-900">Explore Mauritius</h2>
                        <div className="flex gap-2">
                            <button className="px-6 py-2 bg-slate-100 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors">Sea Activities</button>
                            <button className="px-6 py-2 bg-slate-100 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors">Land Activities</button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        [...Array(3)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-3xl h-96 border border-slate-100" />
                        ))
                    ) : (
                        packages.map(pkg => (
                            <ServiceCard
                                key={pkg.id}
                                title={pkg.name}
                                location={pkg.location}
                                price={`Rs ${pkg.base_price.toLocaleString()}`}
                                image={pkg.image_url || "/hero-adventure.png"}
                                duration={pkg.duration || 'Full Day'}
                                link={`/packages/${pkg.id}`}
                                tag={pkg.service_type.toUpperCase()}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
