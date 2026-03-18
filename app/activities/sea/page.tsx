'use client'

import React from 'react'
import ServiceListing from '@/components/ServiceListing'

export default function SeaActivitiesPage() {
    return (
        <ServiceListing
            title="Sea Adventures"
            subtitle="Explore the crystal clear waters with our premium sea activities and excursions."
            heroImage="/assets/hero/rodrigues_hotels_hero_1773391499243.png" // Using the adventurous hero image
            serviceTypes={['sea_activity']}
            tag="SEA ADVENTURE"
            searchPlaceholder="Search for dolphin watching, cruises, water sports..."
        />
    )
}
