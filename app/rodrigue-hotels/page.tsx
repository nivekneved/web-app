'use client'

import React from 'react'
import ServiceListing from '@/components/ServiceListing'

export default function RodriguesHotelsPage() {
    return (
        <ServiceListing
            title="Island Living, Rodrigues"
            subtitle="Experience genuine hospitality in our curated selection of Rodrigues stays. Peace, serenity, and local charm."
            heroImage="/assets/hero/rodrigues_hotels_hero_1773391499243.png"
            serviceTypes={['hotel']}
            includeRegions={['Rodrigues']}
            tag="RODRIGUES"
            searchPlaceholder="Search Rodrigues hotels..."
        />
    )
}
