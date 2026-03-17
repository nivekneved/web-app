import { createClient } from '@/lib/supabaseServer'
import { notFound } from 'next/navigation'
import TourClientWrapper from '@/components/TourClientWrapper'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Props {
    params: Promise<{ id: string }>
}

async function getTour(id: string) {
    const supabase = await createClient()
    
    const { data, error } = await supabase
        .from('services')
        .select('id, name, description, location, region, base_price, rating, image_url, amenities, duration_days, max_group_size, service_type, itinerary')
        .eq('id', id)
        .eq('service_type', 'tour')
        .single()

    if (error || !data) return null
    return data
}

export default async function TourDetailPage({ params }: Props) {
    const { id } = await params
    const tour = await getTour(id)

    if (!tour) {
        notFound()
    }

    return <TourClientWrapper tour={tour} />
}
