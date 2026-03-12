'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import { useParams, useRouter } from 'next/navigation'
import { MapPin, Star, Check, ArrowLeft, Calendar, Users, Heart } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useWishlist } from '@/contexts/WishlistContext'
import ReviewsSection from '@/components/ReviewsSection'
import BookingWizard, { BookingWizardData } from '@/components/BookingWizard'
import { createBookingRequest } from '@/lib/bookingService'

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
    room_types?: {
        type: string
        available: boolean
        prices: {
            mon: string
            tue: string
            wed: string
            thu: string
            fri: string
            sat: string
            sun: string
        }
    }[]
}

export default function HotelDetailPage() {
    const router = useRouter()
    const params = useParams()
    const [hotel, setHotel] = useState<Hotel | null>(null)
    const [loading, setLoading] = useState(true)
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState(2)
    const [selectedRoom, setSelectedRoom] = useState<number>(0)
    const [calculatedPrice, setCalculatedPrice] = useState<number>(0)
    const [showWizard, setShowWizard] = useState(false)
    const [bookingLoading, setBookingLoading] = useState(false)
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

        const room = hotel?.room_types?.[selectedRoom]
        if (room && !room.available) {
            toast.error('This room is currently unavailable')
            return
        }

        setShowWizard(true)
    }

    async function handleBookingComplete(data: BookingWizardData) {
        if (!hotel) return
        setBookingLoading(true)
        
        const result = await createBookingRequest({
            serviceId: hotel.id,
            serviceName: hotel.name,
            serviceCategory: 'hotel',
            amount: calculatedPrice || hotel.base_price,
            startDate: data.checkIn,
            endDate: data.checkOut,
            paxAdults: data.guests,
            paxChildren: 0,
            travelers: data.travelers,
            specialRequests: data.specialRequests
        })

        if (result.success) {
            toast.success('Booking request submitted successfully!')
            setShowWizard(false)
            router.push(`/booking-confirmation?id=${result.bookingId}&service=${encodeURIComponent(hotel.name)}&amount=${calculatedPrice || hotel.base_price}`)
        } else {
            toast.error(result.error || 'Failed to submit booking request')
        }
        setBookingLoading(false)
    }

    const calculateDynamicPrice = useCallback(() => {
        if (!hotel || !checkIn) return

        const date = new Date(checkIn)
        const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
        const day = dayNames[date.getDay()]

        const room = hotel.room_types?.[selectedRoom]
        if (room && room.prices && room.prices[day as keyof typeof room.prices]) {
            setCalculatedPrice(Number(room.prices[day as keyof typeof room.prices]))
        } else {
            setCalculatedPrice(hotel.base_price)
        }
    }, [hotel, checkIn, selectedRoom])

    useEffect(() => {
        calculateDynamicPrice()
    }, [calculateDynamicPrice])

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
            {/* Booking Wizard Modal */}
            {showWizard && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-1 relative shadow-2xl">
                        <button 
                            onClick={() => setShowWizard(false)}
                            className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors z-10"
                        >
                            <ArrowLeft size={24} className="rotate-90 sm:rotate-0" />
                        </button>
                        <div className="p-8">
                            <BookingWizard 
                                serviceId={hotel.id}
                                serviceName={hotel.name}
                                servicePrice={calculatedPrice || hotel.base_price}
                                serviceCategory="hotel"
                                onComplete={handleBookingComplete}
                                isLoading={bookingLoading}
                            />
                        </div>
                    </div>
                </div>
            )}
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
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-64 pb-20">
                {/* Floating Info Card */}
                <div className="bg-white rounded-[3rem] shadow-2xl p-8 border border-slate-100 mb-12">
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
                                        <div className="text-sm text-slate-500 mb-1">
                                            {checkIn ? 'Price for selected date' : 'Starting from'}
                                        </div>
                                        <div className="text-4xl font-black text-slate-900">
                                            Rs {(calculatedPrice || hotel.base_price).toLocaleString()}
                                        </div>
                                        <div className="text-sm text-slate-500">per night</div>
                                    </div>

                                    <div className="space-y-4">
                                        {hotel.room_types && hotel.room_types.length > 0 && (
                                            <div>
                                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
                                                    Select Room Type
                                                </label>
                                                <div className="grid grid-cols-1 gap-2">
                                                    {hotel.room_types.map((room, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => setSelectedRoom(idx)}
                                                            className={`text-left px-4 py-3 rounded-xl border transition-all ${selectedRoom === idx
                                                                ? 'border-red-600 bg-red-50 ring-2 ring-red-600/10'
                                                                : 'border-slate-200 bg-white hover:border-slate-300'
                                                                } ${!room.available ? 'opacity-50 grayscale' : ''}`}
                                                        >
                                                            <div className="flex justify-between items-center">
                                                                <span className="font-bold text-slate-900">{room.type}</span>
                                                                {!room.available && (
                                                                    <span className="text-[10px] font-black uppercase text-red-600 bg-red-50 px-2 py-0.5 rounded">Unavailable</span>
                                                                )}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
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
