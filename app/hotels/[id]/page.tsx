'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useParams } from 'next/navigation'
import { MapPin, Star, Check, ArrowLeft, Calendar, Users, Heart } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useWishlist } from '@/contexts/WishlistContext'
import ReviewsSection from '@/components/ReviewsSection'

const supabase = createClient()

type Hotel = {
    id: string
    name: string
    description: string
    location: string
    region: string
    base_price: number
    rating: number
    image_url: string
    amenities: string[]
}

export default function HotelDetailPage() {
    const params = useParams()
    const [hotel, setHotel] = useState<Hotel | null>(null)
    const [loading, setLoading] = useState(true)
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState(2)
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

    function toggleWishlist() {
        if (!hotel) return
        if (isInWishlist(hotel.id)) {
            removeFromWishlist(hotel.id)
            toast.success('Removed from wishlist')
        } else {
            addToWishlist({
                id: hotel.id,
                service_type: 'hotel',
                name: hotel.name,
                image_url: hotel.image_url,
                base_price: hotel.base_price,
                location: hotel.location
            })
            toast.success('Added to wishlist')
        }
    }

    useEffect(() => {
        if (params.id) {
            loadHotel(params.id as string)
        }
    }, [params.id])

    async function loadHotel(id: string) {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('id', id)
                .eq('service_type', 'hotel')
                .single()

            if (error) throw error
            setHotel(data)
        } catch (error) {
            console.error('Error loading hotel:', error)
            toast.error('Hotel not found')
        } finally {
            setLoading(false)
        }
    }

    function handleBookNow() {
        if (!checkIn || !checkOut) {
            toast.error('Please select check-in and check-out dates')
            return
        }
        toast.success('Booking feature coming soon!')
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
            </div>
        )
    }

    if (!hotel) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-slate-900 mb-4">Hotel Not Found</h1>
                    <Link href="/hotels" className="text-red-600 font-bold hover:underline">
                        ← Back to Hotels
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Back Button */}
            <div className="bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link href="/hotels" className="inline-flex items-center gap-2 text-slate-600 hover:text-red-600 font-medium transition-colors">
                        <ArrowLeft size={18} />
                        Back to Hotels
                    </Link>
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-[500px]">
                {hotel.image_url ? (
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${hotel.image_url})` }} />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-slate-900" />
                )}
                <div className="absolute inset-0 bg-black/30" />

                {/* Floating Info Card */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-1/2">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-[3rem] shadow-2xl p-8 border border-slate-100">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-3 mb-4">
                                        <div>
                                            <h1 className="text-4xl font-black text-slate-900 mb-2">{hotel.name}</h1>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1 text-slate-600">
                                                    <MapPin size={18} />
                                                    <span className="font-medium">{hotel.location}</span>
                                                </div>
                                                {hotel.rating && (
                                                    <div className="flex items-center gap-1 px-3 py-1 bg-amber-50 rounded-lg">
                                                        <Star size={16} className="text-amber-600 fill-amber-600" />
                                                        <span className="font-bold text-amber-700">{hotel.rating}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={toggleWishlist}
                                            className="p-3 hover:bg-red-50 rounded-xl transition-colors"
                                        >
                                            <Heart
                                                size={24}
                                                className={isInWishlist(hotel.id) ? 'text-red-600 fill-red-600' : 'text-slate-400'}
                                            />
                                        </button>
                                    </div>

                                    {hotel.description && (
                                        <p className="text-slate-600 leading-relaxed">{hotel.description}</p>
                                    )}
                                </div>

                                <div className="lg:w-96 bg-slate-50 rounded-2xl p-6 border border-slate-200">
                                    <div className="text-center mb-6">
                                        <div className="text-sm text-slate-500 mb-1">Starting from</div>
                                        <div className="text-4xl font-black text-slate-900">Rs {hotel.base_price?.toLocaleString()}</div>
                                        <div className="text-sm text-slate-500">per night</div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
                                                <Calendar size={14} className="inline mr-1" />
                                                Check-in
                                            </label>
                                            <input
                                                type="date"
                                                value={checkIn}
                                                onChange={(e) => setCheckIn(e.target.value)}
                                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 focus:border-red-600 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
                                                <Calendar size={14} className="inline mr-1" />
                                                Check-out
                                            </label>
                                            <input
                                                type="date"
                                                value={checkOut}
                                                onChange={(e) => setCheckOut(e.target.value)}
                                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 focus:border-red-600 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
                                                <Users size={14} className="inline mr-1" />
                                                Guests
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={guests}
                                                onChange={(e) => setGuests(parseInt(e.target.value))}
                                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 focus:border-red-600 transition-all"
                                            />
                                        </div>

                                        <button
                                            onClick={handleBookNow}
                                            className="w-full px-6 py-4 bg-red-600 text-white rounded-xl font-black uppercase tracking-wider hover:bg-slate-900 transition-all shadow-lg shadow-red-600/20"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-64 pb-20">
                {/* Amenities */}
                {hotel.amenities && hotel.amenities.length > 0 && (
                    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                        <h2 className="text-2xl font-black text-slate-900 mb-6">Amenities</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {hotel.amenities.map((amenity, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="p-2 bg-red-50 rounded-lg">
                                        <Check size={16} className="text-red-600" />
                                    </div>
                                    <span className="text-slate-700 font-medium">{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Reviews */}
                <ReviewsSection serviceId={hotel.id} serviceType="hotel" />
            </div>
        </div>
    )
}
