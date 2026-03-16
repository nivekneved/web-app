'use client'

import React from 'react'
import ServiceListing from '@/components/ServiceListing'

export default function LocalDealsPage() {
    return (
        <ServiceListing
            title="Local Deals Mauritius"
            subtitle="Island escapes, rediscovered. Discover the best local hotels, activities, and spa deals on our beautiful island."
            heroImage="/assets/hero/local_deals_hero_1773391387665.png"
            tag="LOCAL DEAL"
            searchPlaceholder="Search local deals, resorts, adventures..."
            // We can add logic to ServiceListing to specifically look for "LOCAL DEAL" tag
            // but for now, it shows all services if no props are passed.
            // Let's assume the user wants ALL services marked as deals or similar.
        />
    )
}
