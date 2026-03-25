'use client'

import React from 'react'
import ServiceListing from '@/components/ServiceListing'
import { usePageContent } from '@/hooks/usePageContent'
import { resolveImageUrl } from '@/lib/image'

export default function ActivitiesPage() {
    const { content } = usePageContent('activities')
    const hero = content.hero || {}

    return (
        <ServiceListing
            title={hero.title || "Activities & Experiences"}
            subtitle={hero.description || "Unique adventures and unforgettable moments across the most beautiful islands."}
            heroImage={resolveImageUrl(hero.image_url, "/assets/hero/rodrigues_hotels_hero_1773391499243.png")}
            serviceTypes={['activity', 'sea_activity', 'land_activity']}
            tag="ACTIVITY"
            searchPlaceholder="Search for activities, locations..."
        />
    )
}
