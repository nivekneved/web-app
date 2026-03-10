'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import PackageDetail from '@/components/PackageDetail'

export default function CruiseDetailPage() {
    const params = useParams()
    // In a real app, fetch data based on params.slug
    // For now, we mock it
    const slug = params.slug

    const mockData = {
        title: "Mediterranean Discovery",
        subtitle: "7 Nights aboard Costa Toscana",
        description: "Experience the magic of the Mediterranean on this unforgettable voyage. Visit historic cities, relax on pristine beaches, and indulge in world-class cuisine aboard the magnificent Costa Toscana.",
        price: "Rs 55,000",
        images: ["/hero-cruise.png", "/hero-cruise.png", "/hero-cruise.png"],
        highlights: [
            "Visit Barcelona, Marseille, and Genoa",
            "All-inclusive dining options",
            "Broadwan-style entertainment",
            "Premium ocean-view cabins available"
        ],
        itinerary: [
            { day: "Day 1", title: "Barcelona, Spain", desc: "Embarkation. Welcome cocktail and dinner." },
            { day: "Day 2", title: "Palma de Mallorca", desc: "Explore the Gothic cathedral and historic streets." },
            { day: "Day 3", title: "At Sea", desc: "Enjoy the ship's amenities, pools, and spa." },
            { day: "Day 4", title: "Palermo, Sicily", desc: "Discover rich history and street food." },
            { day: "Day 5", title: "Civitavecchia (Rome)", desc: "Optional excursion to the Eternal City." },
            { day: "Day 6", title: "Savona", desc: "Visit the charming port city." },
            { day: "Day 7", title: "Marseille, France", desc: "Tour the Old Port and Notre-Dame de la Garde." }
        ],
        meta: {
            duration: "7 Nights",
            location: "Western Med",
            date: "Nov 2026 - Mar 2027"
        }
    }

    return <PackageDetail {...mockData} />
}
