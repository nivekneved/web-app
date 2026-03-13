import { createClient } from '@/lib/supabaseServer'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HotelClientWrapper from '@/components/HotelClientWrapper'

interface Props {
    params: Promise<{ id: string }>
}

async function getHotel(id: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('services')
        .select('id, name, description, location, region, base_price, rating, image_url, amenities, room_types')
        .eq('id', id)
        .eq('service_type', 'hotel')
        .single()

    if (error || !data) return null
    return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const hotel = await getHotel(id)

    if (!hotel) {
        return {
            title: 'Hotel Not Found | Travel Lounge',
        }
    }

    return {
        title: `${hotel.name} | Travel Lounge Mauritius`,
        description: hotel.description?.substring(0, 160) || `Book your stay at ${hotel.name} in ${hotel.location}, Mauritius.`,
        openGraph: {
            title: hotel.name,
            description: hotel.description,
            images: [hotel.image_url],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: hotel.name,
            description: hotel.description,
            images: [hotel.image_url],
        }
    }
}

export default async function HotelDetailPage({ params }: Props) {
    const { id } = await params
    const hotel = await getHotel(id)

    if (!hotel) {
        notFound()
    }

    return <HotelClientWrapper hotel={hotel} />
}
