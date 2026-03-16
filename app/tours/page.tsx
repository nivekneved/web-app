'use client'

import React from 'react'
import ServiceListing from '@/components/ServiceListing'

export default function ToursPage() {
    return (
        <ServiceListing
            title="Global Adventures"
            subtitle="Explore the world with like-minded travelers on our expertly guided group tours."
            heroImage="/hero-adventure.png"
            serviceTypes={['tour']}
            tag="TOUR"
            searchPlaceholder="Search tours, regions, destinations..."
        />
    )
}
