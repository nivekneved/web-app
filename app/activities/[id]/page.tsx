import { createClient } from '@/lib/supabaseServer'
import { notFound } from 'next/navigation'
import ActivityClientWrapper from '@/components/ActivityClientWrapper'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Props {
    params: Promise<{ id: string }>
}

async function getActivity(id: string) {
    const supabase = await createClient()
    
    const { data, error } = await supabase
        .from('services')
        .select('id, name, description, location, region, base_price, rating, image_url, amenities, duration_hours, itinerary')
        .eq('id', id)
        .eq('service_type', 'activity')
        .single()

    if (error || !data) return null
    return data
}

export default async function ActivityDetailPage({ params }: Props) {
    const { id } = await params
    const activity = await getActivity(id)

    if (!activity) {
        notFound()
    }

    return <ActivityClientWrapper activity={activity} />
}
