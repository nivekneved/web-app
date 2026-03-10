'use client'

import React from 'react'
import Image from 'next/image'
import ServiceCard from '@/components/ServiceCard'

const packages = [
    {
        id: 1,
        title: "Tekoma Boutik Hotel",
        location: "Anse Ally",
        price: "Rs 18,000",
        image: "/hero-hotel.png",
        duration: "3 Nights",
        link: "/rodrigues/tekoma",
        tag: "Luxury"
    },
    {
        id: 2,
        title: "Cotton Bay Resort",
        location: "Pointe Coton",
        price: "Rs 14,500",
        image: "/hero-hotel.png",
        duration: "3 Nights",
        link: "/rodrigues/cotton-bay",
        tag: "Beachfront"
    },
    {
        id: 3,
        title: "Mourouk Ebony Hotel",
        location: "Mourouk",
        price: "Rs 12,000",
        image: "/hero-hotel.png",
        duration: "3 Nights",
        link: "/rodrigues/mourouk",
        tag: "Kitesurfing"
    },
    {
        id: 4,
        title: "Rodrigues Discovery Tour",
        location: "Island Wide",
        price: "Rs 5,000",
        image: "/hero-adventure.png",
        duration: "Full Day",
        link: "/rodrigues/island-tour",
        tag: "Excursion"
    }
]

export default function RodriguesPage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/hero-hotel.png" // Ideally a specific Rodrigues image
                    alt="Rodrigues"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-6xl font-black mb-4">Rodrigues Island</h1>
                    <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto">
                        Experience the authentic charm of our sister island.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 -mt-20 relative z-20">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 mb-12">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-900">Island Getaways</h2>
                        <button className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-slate-900 transition-colors">Flight + Hotel Packages</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map(pkg => (
                        <ServiceCard key={pkg.id} {...pkg} />
                    ))}
                </div>
            </div>
        </div>
    )
}
