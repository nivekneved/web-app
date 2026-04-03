'use client'

import React, { Suspense } from 'react'
import ServiceListing from '@/components/ServiceListing'
import SearchBar from '@/components/SearchBar'
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
    const type = searchParams.get('type')
    
    // Construct a title/subtitle that shows the user's search context
    const guestLabel = (Number(adults) || 2) + (Number(children) || 0)
    let searchSubtitle = 'Discover amazing deals and experiences worldwide'
    if (checkIn && checkOut) {
        searchSubtitle = `Available stays from ${checkIn} to ${checkOut} for ${guestLabel} travelers`
    }

    return (
        <div className="bg-[#F2F5F7] min-h-screen">
            {/* Context Search Form */}
            <div className="bg-white border-b border-slate-200 py-6 sticky top-0 z-[100] shadow-sm">
                <div className="container mx-auto">
                    <SearchBar />
                </div>
            </div>

            <ServiceListing 
                title="Search Results"
                subtitle={searchSubtitle}
                heroImage="/hero-hotel.png" // Fallback hero
                tag="Global Search"
                searchPlaceholder="Refine search by name or location..."
                compactHero={true}
                categorySlug={type || undefined}
            />
        </div>
    )
}
