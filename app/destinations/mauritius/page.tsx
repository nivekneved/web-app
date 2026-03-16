import React from 'react'
import DestinationListing from '@/components/DestinationListing'

export const metadata = {
    title: 'Mauritius - Discover the Island | Travel Lounge',
    description: 'Explore our curated list of hotels, activities, and packages in Mauritius.',
}

export default function MauritiusDestinationPage() {
    return (
        <DestinationListing
            title="Mauritius Island"
            subtitle="Explore the breathtaking beauty of our tropical island. From pristine beaches to lush interior landscapes."
            heroImage="/assets/hero/mauritius_destination_hero_1773391482617.png"
            regions={['North', 'East', 'South', 'West', 'Mauritius', 'North Coast', 'East Coast', 'South Coast', 'West Coast']}
            tag="" // Will fallback to service type
        />
    )
}
