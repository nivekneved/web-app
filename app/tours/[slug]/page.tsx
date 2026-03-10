'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import PackageDetail from '@/components/PackageDetail'

export default function TourDetailPage() {
    const params = useParams()

    const mockData = {
        title: "Thailand Discovery",
        subtitle: "Bangkok & Phuket Adventure",
        description: "From the bustling streets of Bangkok to the pristine beaches of Phuket, this tour offers the perfect balance of culture, adventure, and relaxation.",
        price: "Rs 48,000",
        images: ["/hero-adventure.png", "/hero-adventure.png", "/hero-adventure.png"],
        highlights: [
            "Grand Palace Tour in Bangkok",
            "Floating Market Excursion",
            "Phi Phi Island Tour",
            "Elephant Sanctuary Visit"
        ],
        itinerary: [
            { day: "Day 1", title: "Arrival Bangkok", desc: "Transfer to hotel. Evening Chao Phraya Dinner Cruise." },
            { day: "Day 2", title: "Bangkok City Tour", desc: "Visit Wat Arun, Grand Palace and Emerald Buddha." },
            { day: "Day 3", title: "Flight to Phuket", desc: "Transfer to Phuket. Free afternoon at Patong Beach." },
            { day: "Day 4", title: "Phi Phi Islands", desc: "Full day speedboat tour to Maya Bay and Monkey Beach." }
        ],
        meta: {
            duration: "8 Days",
            location: "Thailand",
            date: "Selected Dates"
        }
    }

    return <PackageDetail {...mockData} />
}
