'use client'

import React from 'react'
import ServiceListing from '@/components/ServiceListing'

export default function DayPackagesPage() {
    return (
        <ServiceListing
            title="One Perfect Day"
            subtitle="Enjoy our resort lifestyle for the day. High quality amenities and great dining included."
            heroImage="/assets/hero/day_packages_hero_1773391515388.png"
            categorySlug="day-packages"
            tag="DAY PASS"
            searchPlaceholder="Search day passes, resorts..."
        />
    )
}
