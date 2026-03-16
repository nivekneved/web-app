'use client'

import React from 'react'
import ServiceListing from '@/components/ServiceListing'

export default function ActivitiesPage() {
    return (
        <ServiceListing
            title="Activities & Experiences"
            subtitle="Unique adventures and unforgettable moments across the most beautiful islands."
            heroImage="/assets/hero/rodrigues_hotels_hero_1773391499243.png" // Using a high-quality adventure image
            serviceTypes={['activity']}
            tag="ACTIVITY"
            searchPlaceholder="Search for activities, locations..."
        />
    )
}
