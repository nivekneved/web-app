'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import PackageDetail from '@/components/PackageDetail'

export default function HotelDetailPage() {
    const params = useParams()

    // Mock Data for Hotel
    const mockData = {
        title: "Lux* Grand Baie",
        subtitle: "A New Generation Boutique Resort",
        description: "Experience the epitome of modern luxury at Lux* Grand Baie. Located on one of the island's most coveted beaches, this resort offers a unique blend of sophisticated design, exceptional culinary experiences, and vibrant nightlife.",
        price: "Rs 15,000 / night",
        images: ["/hero-hotel.png", "/hero-hotel.png", "/hero-hotel.png"],
        highlights: [
            "Rooftop infinity pool and bar",
            "Ai KISU Asian restaurant",
            "Bisou Rooftop",
            "Technogym & Wellness Centre"
        ],
        itinerary: [
            { day: "Check-in", title: "Welcome to Paradise", desc: "Arrive and enjoy a welcome drink at the rooftop bar." },
            { day: "Stay", title: "Relax & Unwind", desc: "Enjoy the beach, spa treatments, or water sports." },
            { day: "Dining", title: "Culinary Journey", desc: "Dinner at one of our 3 world-class restaurants." }
        ],
        meta: {
            duration: "Per Night",
            location: "Grand Baie",
            date: "Year Round"
        }
    }

    return <PackageDetail {...mockData} />
}
