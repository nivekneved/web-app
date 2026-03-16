'use client'

import React from 'react'
import ServiceListing from '@/components/ServiceListing'

export default function HotelDayPackagesPage() {
    return (
        <ServiceListing
            title="Resort Day Passes"
            subtitle="Indulge in the finest resort facilities without the overnight stay."
            heroImage="/assets/hero/day_packages_hero_1773391515388.png"
            categorySlug="hotel-day-packages"
            tag="HOTEL DAY PASS"
            searchPlaceholder="Search hotel day passes, resorts..."
        />
    )
}
