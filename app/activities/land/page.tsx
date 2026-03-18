'use client'

import React from 'react'
import ServiceListing from '@/components/ServiceListing'

export default function LandActivitiesPage() {
    return (
        <ServiceListing
            title="Land Adventures"
            subtitle="Discover the landscapes with our premium land activities and excursions."
            heroImage="/assets/hero/rodrigues_hotels_hero_1773391499243.png" // Reusing the adventure hero image
            serviceTypes={['land_activity']}
            tag="LAND ADVENTURE"
            searchPlaceholder="Search for quad biking, hiking, tours..."
        />
    )
}
