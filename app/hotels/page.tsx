'use client'

import React from 'react'
import ServiceListing from '@/components/ServiceListing'

export default function HotelsPage() {
    return (
        <ServiceListing
            title="Exquisite Stays"
            subtitle="Discover excellent hospitality in the most stunning locations across Mauritius and beyond."
            heroImage="/hero-hotel.png"
            serviceTypes={['hotel']}
            excludeRegions={['Rodrigues']}
            tag="HOTEL"
            searchPlaceholder="Search hotels, resorts, locations..."
        />
    )
}
