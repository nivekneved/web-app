import { Metadata } from 'next'
import { createClient } from '@/lib/supabase'
import HotelClientWrapper from '@/components/HotelClientWrapper'
import { notFound } from 'next/navigation'

type RoomType = {
  id: string;
  name: string;
  type: string;
  price_per_night: number;
  total_units: number;
  size?: string;
  bed?: string;
  view?: string;
  features?: string[];
  image_url?: string;
  max_occupancy?: number;
  meal_plan?: string;
  cancellation_policy?: string;
  deposit_policy?: string;
  is_active?: boolean;
  min_stay_days?: number;
  prices?: {
    [key: string]: string;
  };
  // Properties required by HotelClientWrapper
  price: number;  // Required in HotelClientWrapper
}

type HotelDetails = {
  id: string;
  name: string;
  description: string;
  location: string;
  region: string;
  base_price: number;
  rating: number;
  image_url?: string;
  secondary_image_url?: string;
  amenities?: string[];
  service_type: string;
  duration_days?: number;
  duration_hours?: number;
  max_group_size?: number;
  room_types?: RoomType[];
  gallery_images?: string[];
  meta_title?: string;
  meta_description?: string;
  special_features?: string[];
  highlights?: string[];
  included?: string[];
  not_included?: string[];
  cancellation_policy?: string;
  terms_and_conditions?: string;
  thumbnail_url?: string;
  banner_url?: string;
  featured?: boolean;
  priority?: number;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const supabase = createClient()
  const { data: hotel } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single()

  if (!hotel) {
    return {}
  }

  return {
    title: hotel.meta_title || hotel.name,
    description: hotel.meta_description || hotel.description,
    openGraph: {
      title: hotel.meta_title || hotel.name,
      description: hotel.meta_description || hotel.description,
      images: hotel.image_url ? [hotel.image_url!] : [], // Assert as non-null since we checked
    },
    twitter: {
      card: 'summary_large_image',
      title: hotel.meta_title || hotel.name,
      description: hotel.meta_description || hotel.description,
      images: hotel.image_url ? [hotel.image_url!] : [], // Assert as non-null since we checked
    }
  }
}

export default async function HotelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createClient()

  const { data: hotelData, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !hotelData) {
    notFound()
  }

  // Process room types for the client component
  let mappedRoomTypes: RoomType[] = []
  if (hotelData.room_types && Array.isArray(hotelData.room_types) && hotelData.room_types.length > 0) {
    mappedRoomTypes = hotelData.room_types.map((room: any) => ({
      id: room.id || '',
      name: room.name || room.type || 'Standard Room',
      type: room.type || 'standard',
      price_per_night: parseFloat(room.prices?.mon || room.price_per_night || '0'),
      total_units: room.total_units || 1,
      size: room.size,
      bed: room.bed,
      view: room.view,
      features: room.features,
      image_url: room.image_url,
      max_occupancy: room.max_occupancy || 2,
      meal_plan: room.meal_plan || 'Room Only',
      cancellation_policy: room.cancellation_policy,
      deposit_policy: room.deposit_policy,
      is_active: room.is_active !== undefined ? room.is_active : true,
      min_stay_days: room.min_stay_days || 1,
      prices: room.prices,
      price: parseFloat(room.prices?.mon || room.price_per_night || '0') // Add the required price property
    }))
  } else {
    // Fallback to default room type if needed
    const rooms: any[] = hotelData.room_types || []
    mappedRoomTypes = rooms.map((room, index) => ({
      id: `default-${index}`,
      name: room.name || 'Standard Room',
      type: room.type || 'standard',
      price_per_night: parseFloat(room.price || room.price_per_night || hotelData.base_price || '0'),
      total_units: room.total_units || 1,
      size: room.size,
      bed: room.bed,
      view: room.view,
      features: room.features || [],
      image_url: room.image_url || hotelData.image_url,
      max_occupancy: room.max_occupancy || 2,
      meal_plan: room.meal_plan || 'Room Only',
      cancellation_policy: room.cancellation_policy,
      deposit_policy: room.deposit_policy,
      is_active: room.is_active !== undefined ? room.is_active : true,
      min_stay_days: room.min_stay_days || 1,
      prices: room.prices,
      price: parseFloat(room.price || room.price_per_night || hotelData.base_price || '0') // Add the required price property
    }))
  }

  // Update the hotel data with processed room types, ensuring image_url is defined
  const hotel: HotelDetails = {
    ...hotelData,
    image_url: hotelData.image_url || '/placeholder-hotel.jpg', // Provide a default image
    amenities: hotelData.amenities || [], // Ensure amenities is not undefined
    room_types: mappedRoomTypes
  }

  return <HotelClientWrapper hotel={hotel} />
}