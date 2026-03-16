'use client'

import React from 'react'
import ServiceListing from '@/components/ServiceListing'

export default function VisaServicesPage() {
    return (
        <ServiceListing
            title="Visa Assistance"
            subtitle="Expert guidance for Schengen, UK, USA, and South Africa visas. As an IATA accredited agency, we ensure your journey starts without stress."
            heroImage="/assets/hero/visa_services_hero_1773391463549.png"
            serviceTypes={['visa']}
            tag="VISA"
            searchPlaceholder="Search visa types, destinations..."
        />
    )
}
