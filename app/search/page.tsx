'use client'

import React, { Suspense } from 'react'
import ServiceListing from '@/components/ServiceListing'
import { useSearchParams } from 'next/navigation'

export default function GlobalSearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#F2F5F7] animate-pulse" />}>
            <SearchPageContent />
        </Suspense>
    )
}

function SearchPageContent() {
    const searchParams = useSearchParams()
    const checkIn = searchParams.get('checkIn')
    const checkOut = searchParams.get('checkOut')
    const adults = searchParams.get('adults')
    const children = searchParams.get('children')
    
    // Construct a title/subtitle that shows the user's search context
    const guestLabel = (Number(adults) || 2) + (Number(children) || 0)
    let searchSubtitle = 'Discover amazing deals and experiences worldwide'
    if (checkIn && checkOut) {
        searchSubtitle = `Available stays from ${checkIn} to ${checkOut} for ${guestLabel} travelers`
    }

    return (
        <ServiceListing 
            title="Search Results"
            subtitle={searchSubtitle}
            heroImage="/hero-hotel.png" // Fallback hero
            tag="Global Search"
            searchPlaceholder="Search everything..."
        />
    )
}
