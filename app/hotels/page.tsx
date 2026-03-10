'use client'

import React from 'react'
import Image from 'next/image'
import ServiceCard from '@/components/ServiceCard'

const hotels = [
    {
        id: 1,
        title: "Lux* Grand Baie",
        location: "Grand Baie, Mauritius",
        price: "Rs 15,000 / night",
        image: "/hero-hotel.png",
        duration: "5 Stars",
        link: "/hotels/lux-grand-baie",
        tag: "Luxury"
    },
    {
        id: 2,
        title: "Constance Belle Mare Plage",
        location: "Belle Mare, Mauritius",
        price: "Rs 12,500 / night",
        image: "/hero-hotel.png",
        duration: "5 Stars",
        link: "/hotels/constance-belle-mare",
        tag: "Golf Resort"
    },
    {
        id: 3,
        title: "Heritage Le Telfair",
        location: "Bel Ombre, Mauritius",
        price: "Rs 14,000 / night",
        image: "/hero-hotel.png",
        duration: "5 Stars",
        link: "/hotels/heritage-le-telfair",
        tag: "Wellness"
    },
    {
        id: 4,
        title: "Trou aux Biches Beachcomber",
        location: "Trou aux Biches, Mauritius",
        price: "Rs 16,000 / night",
        image: "/hero-hotel.png",
        duration: "5 Stars",
        link: "/hotels/trou-aux-biches",
        tag: "Honeymoon"
    }
]

export default function HotelsPage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/hero-hotel.png"
                    alt="Hotels"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-6xl font-black mb-4">Exquisite Stays</h1>
                    <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto">
                        Discover world-class hospitality in the most stunning locations.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 -mt-20 relative z-20">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 mb-12">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-900">Featured Resorts</h2>
                        <div className="flex gap-2">
                            <button className="px-6 py-2 bg-slate-100 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors">By Price</button>
                            <button className="px-6 py-2 bg-slate-100 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors">By Stars</button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {hotels.map(hotel => (
                        <ServiceCard key={hotel.id} {...hotel} />
                    ))}
                </div>
            </div>
        </div>
    )
}
