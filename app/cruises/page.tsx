'use client'

import React from 'react'
import ServiceListing from '@/components/ServiceListing'

export default function CruisesPage() {
    return (
        <ServiceListing
            title="Cruise Holidays"
            subtitle="Set sail for amazing destinations with our trusted cruise partners. Luxury, adventure, and serenity."
            heroImage="/hero-cruise.png"
            serviceTypes={['cruise']}
            tag="CRUISE"
            searchPlaceholder="Search cruise packages, ships, destinations..."
        />
    )
}
