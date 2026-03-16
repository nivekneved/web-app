'use client'

import React from 'react'
import ServiceListing from '@/components/ServiceListing'

export default function FlightsPage() {
    return (
        <ServiceListing
            title="Book Your Flight"
            subtitle="Search hundreds of airlines and find the perfect connection to your dream destination."
            heroImage="/hero-flight.png"
            serviceTypes={['flight']}
            tag="FLIGHT"
            searchPlaceholder="Search flights, airlines, destinations..."
        />
    )
}
