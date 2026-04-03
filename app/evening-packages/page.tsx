'use client'

import React from 'react'
import ServiceListing from '@/components/ServiceListing'

export default function EveningPackagesPage() {
    return (
        <ServiceListing
            title="Night Magic"
            subtitle="Explore our curated collection of evening escapes, romantic dinners, and sunset journeys."
            heroImage="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2071&auto=format&fit=crop"
            categorySlug="evening-packages"
            tag="EVENING"
            searchPlaceholder="Search evening escapes, dinner cruises..."
        />
    )
}
