'use client'

import React from 'react'
import Image from 'next/image'
import ServiceCard from '@/components/ServiceCard'

const packages = [
    {
        id: 1,
        title: "Catamaran Cruise to Île aux Cerfs",
        location: "East Coast",
        price: "Rs 1,800",
        image: "/hero-cruise.png",
        duration: "Full Day",
        link: "/packages/catamaran-east",
        tag: "Best Seller"
    },
    {
        id: 2,
        title: "Dolphin Watch & Swim",
        location: "West Coast",
        price: "Rs 2,200",
        image: "/hero-cruise.png",
        duration: "Half Day",
        link: "/packages/dolphin-swim",
        tag: "Wildlife"
    },
    {
        id: 3,
        title: "Chamarel 7 Coloured Earth",
        location: "South West",
        price: "Rs 3,500",
        image: "/hero-adventure.png",
        duration: "Full Day",
        link: "/packages/chamarel",
        tag: "Nature"
    },
    {
        id: 4,
        title: "Casela Nature Parks",
        location: "Flic en Flac",
        price: "Rs 1,200",
        image: "/hero-adventure.png",
        duration: "Full Day",
        link: "/packages/casela",
        tag: "Adventure"
    },
    {
        id: 5,
        title: "Subscooter Adventure",
        location: "Grand Baie",
        price: "Rs 4,500",
        image: "/hero-cruise.png",
        duration: "2 Hours",
        link: "/packages/subscooter",
        tag: "Unique"
    }
]

export default function PackagesPage() {
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
                    {packages.map(pkg => (
                        <ServiceCard key={pkg.id} {...pkg} />
                    ))}
                </div>
            </div>
        </div>
    )
}
