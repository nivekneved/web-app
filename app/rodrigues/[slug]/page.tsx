'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import PackageDetail from '@/components/PackageDetail'

export default function RodriguesDetailPage() {
    const params = useParams()

    const mockData = {
        title: "Tekoma Boutik Hotel",
        subtitle: "Barefoot Luxury in Rodrigues",
        description: "Nestled on the beautiful Anse Ally beach, Tekoma offers an intimate and exclusive experience. Discover the authentic charm of Rodrigues in a setting of understated luxury.",
        price: "Rs 18,000",
        images: ["/hero-hotel.png", "/hero-hotel.png", "/hero-hotel.png"],
        highlights: [
            "Direct beach access",
            "Private terrace with sea view",
            "Traditional Rodriguan cuisine",
            "Wellness centre"
        ],
        itinerary: [
            { day: "Day 1", title: "Arrival", desc: "Transfer from Plaine Corail Airport. Welcome dinner." },
            { day: "Day 2", title: "Island Discovery", desc: "Optional tour to Port Mathurin market and Caverne Patate." },
            { day: "Day 3", title: "Leisure", desc: "Relax by the pool or hike to Trou d'Argent." }
        ],
        meta: {
            duration: "3 Nights",
            location: "Anse Ally",
            date: "Flexible"
        }
    }

    return <PackageDetail {...mockData} />
}
