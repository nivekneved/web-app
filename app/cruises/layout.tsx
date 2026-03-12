import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Luxury Cruises | Travel Lounge Mauritius',
    description: 'Set sail for extraordinary destinations with our premium cruise partners. Browse our selection of luxury cruise packages.',
}

export default function CruisesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
