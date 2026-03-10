'use client'

import React from 'react'
import Image from 'next/image'
import ServiceCard from '@/components/ServiceCard'

const cruises = [
    {
        id: 1,
        title: "Mediterranean Discovery",
        location: "Barcelona, Spain",
        price: "Rs 55,000",
        image: "/hero-cruise.png",
        duration: "7 Nights",
        link: "/cruises/mediterranean-discovery",
        tag: "Costa Cruises"
    },
    {
        id: 2,
        title: "Caribbean Dream",
        location: "Miami, USA",
        price: "Rs 75,000",
        image: "/hero-cruise.png", // utilizing existing asset
        duration: "10 Nights",
        link: "/cruises/caribbean-dream",
        tag: "MSC Cruises"
    },
    {
        id: 3,
        title: "Indian Ocean Gems",
        location: "Port Louis, Mauritius",
        price: "Rs 35,000",
        image: "/hero-cruise.png",
        duration: "5 Nights",
        link: "/cruises/indian-ocean",
        tag: "Local Favorite"
    },
    {
        id: 4,
        title: "Northern Europe Explorer",
        location: "Copenhagen, Denmark",
        price: "Rs 82,000",
        image: "/hero-cruise.png",
        duration: "12 Nights",
        link: "/cruises/northern-europe",
        tag: "Premium"
    }
]

export default function CruisesPage() {
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
                    {cruises.map(cruise => (
                        <ServiceCard key={cruise.id} {...cruise} />
                    ))}
                </div>
            </div>
        </div>
    )
}
