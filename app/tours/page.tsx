'use client'

import React from 'react'
import Image from 'next/image'
import ServiceCard from '@/components/ServiceCard'

const tours = [
    {
        id: 1,
        title: "Thailand Discovery",
        location: "Bangkok & Phuket",
        price: "Rs 48,000",
        image: "/hero-adventure.png",
        duration: "8 Days",
        link: "/tours/thailand-discovery",
        tag: "Best Seller"
    },
    {
        id: 2,
        title: "Magnificent Dubai",
        location: "Dubai, UAE",
        price: "Rs 38,000",
        image: "/hero-flight.png",
        duration: "6 Days",
        link: "/tours/dubai-magnificent",
        tag: "City Break"
    },
    {
        id: 3,
        title: "European Grand Tour",
        location: "France, Italy, Switzerland",
        price: "Rs 110,000",
        image: "/hero-adventure.png",
        duration: "14 Days",
        link: "/tours/european-grand",
        tag: "Premium"
    },
    {
        id: 4,
        title: "Malaysia Truly Asia",
        location: "Kuala Lumpur & Langkawi",
        price: "Rs 42,000",
        image: "/hero-adventure.png",
        duration: "9 Days",
        link: "/tours/malaysia",
        tag: "Culture"
    }
]

export default function ToursPage() {
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
                            <button className="px-6 py-2 bg-slate-100 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors">Asia</button>
                            <button className="px-6 py-2 bg-slate-100 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors">Europe</button>
                            <button className="px-6 py-2 bg-slate-100 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors">Middle East</button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tours.map(tour => (
                        <ServiceCard key={tour.id} {...tour} />
                    ))}
                </div>
            </div>
        </div>
    )
}
