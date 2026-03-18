'use client'

import React from 'react'
import ServiceListing from '@/components/ServiceListing'

export default function PackagesPage() {
    return (
        <ServiceListing
            title="Island Adventures"
            subtitle="Explore Mauritius with our curated day packages. From the heights of Chamarel to the depths of the Indian Ocean."
            heroImage="/hero-adventure.png"
            serviceTypes={['activity']}
            tag="ACTIVITY"
            searchPlaceholder="Search activities, adventures..."
        />
    )
}
