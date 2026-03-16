'use client'

import React from 'react'
import ServiceListing from '@/components/ServiceListing'

export default function TransfersPage() {
    return (
        <ServiceListing
            title="Seamless Comfort"
            subtitle="Door-to-door luxury. From airport arrivals to hotel departures, enjoy stress-free transportation with our modern fleet."
            heroImage="/hero-adventure.png"
            serviceTypes={['transfer']}
            tag="TRANSFER"
            searchPlaceholder="Search transfers, routes..."
        />
    )
}
