import { createClient } from '@/lib/supabaseServer'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HotelClientWrapper from '@/components/HotelClientWrapper'

interface Props {
    params: Promise<{ id: string }>
}

async function getHotel(id: string) {
    const supabase = await createClient()
    
    // Fetch hotel details
    const { data: hotel, error: hotelError } = await supabase
        .from('services')
        .select('id, name, description, location, region, base_price, rating, image_url, amenities')
        .eq('id', id)
        .eq('service_type', 'hotel')
        .single()

    if (hotelError || !hotel) return null

    // Fetch room types from dedicated table
    const { data: rooms } = await supabase
        .from('room_types')
        .select('*')
        .eq('service_id', id)

    // Map room_types table data to the structure expected by HotelClientWrapper
    const mappedRoomTypes = (rooms || []).map(room => ({
        type: room.name,
        price: parseFloat(room.weekday_price || '0'),
        prices: {
            mon: room.weekday_price,
            tue: room.weekday_price,
            wed: room.weekday_price,
            thu: room.weekday_price,
            fri: room.weekday_price,
            sat: room.weekend_price,
            sun: room.weekend_price
        },
        image_url: room.image_url,
        features: room.amenities || []
    }))

    return {
        ...hotel,
        room_types: mappedRoomTypes
    }
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
