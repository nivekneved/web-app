'use client'

import React from 'react'
import ServiceListing from '@/components/ServiceListing'

export default function GroupToursPage() {
    return (
        <ServiceListing
            title="Guided Group Travel"
            subtitle="Join like-minded people and explore the island with our local experts. Everything is planned so you can relax."
            heroImage="/assets/hero/group_tours_hero_1773391421071.png"
            categorySlug="guided-group-tours"
            tag="GROUP TOUR"
            searchPlaceholder="Search group tours, destinations..."
        />
    )
}
