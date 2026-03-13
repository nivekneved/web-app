'use client'

import { useState } from 'react'
import { MapPin, Star, Check, ArrowLeft, Calendar, Users, Heart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { useWishlist } from '@/contexts/WishlistContext'
import ReviewsSection from '@/components/ReviewsSection'
import BookingWizard, { BookingWizardData } from '@/components/BookingWizard'
import { createBookingRequest } from '@/lib/bookingService'

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
    room_types?: { type: string; price: number }[]
}

export default function HotelClientWrapper({ hotel }: { hotel: Hotel }) {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
    
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState(2)
    const [showWizard, setShowWizard] = useState(false)
    const [bookingLoading, setBookingLoading] = useState(false)

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

    function handleBookNow() {
        if (!checkIn || !checkOut) {
            toast.error('Please select check-in and check-out dates')
            return
        }
        setShowWizard(true)
    }

    const onBookingConfirm = async (formData: BookingWizardData) => {
        setBookingLoading(true)
        try {
            const { success, error } = await createBookingRequest({
                serviceId: hotel.id,
                serviceName: hotel.name,
                serviceCategory: 'hotel',
                amount: hotel.base_price,
                startDate: formData.checkIn || checkIn,
                endDate: formData.checkOut || checkOut,
                paxAdults: formData.guests || guests,
                paxChildren: 0,
                travelers: formData.travelers as Record<string, unknown>[],
                specialRequests: formData.specialRequests
            })

            if (success) {
                toast.success('Booking request sent successfully!')
                setShowWizard(false)
            } else {
                throw new Error(error || 'Booking failed')
            }
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to send booking request'
            console.error('Booking error:', error)
            toast.error(message)
        } finally {
            setBookingLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="relative h-[60vh] w-full">
                <Image
                    src={hotel.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945'}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
                    <Link
                        href="/hotels"
                        className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
                    >
                        <ArrowLeft size={24} />
                    </Link>
                    <button
                        onClick={toggleWishlist}
                        className={`p-3 backdrop-blur-md rounded-full transition-all ${
                            isInWishlist(hotel.id) ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/40'
                        }`}
                    >
                        <Heart size={24} fill={isInWishlist(hotel.id) ? 'currentColor' : 'none'} />
                    </button>
                </div>
                <div className="absolute bottom-12 left-8 right-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="px-4 py-1.5 bg-brand-red text-white text-xs font-bold rounded-full uppercase tracking-wider">
                                Luxury Stay
                            </span>
                            <div className="flex items-center gap-1 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold">
                                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                {hotel.rating} Rating
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
                            {hotel.name}
                        </h1>
                        <div className="flex items-center gap-2 text-white/90 font-medium">
                            <MapPin size={20} className="text-brand-red" />
                            {hotel.location}, {hotel.region}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                        <section className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">About this hotel</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {hotel.description}
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Premium Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {hotel.amenities?.map((amenity, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-red shadow-sm">
                                            <Check size={20} />
                                        </div>
                                        <span className="font-semibold text-gray-700">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <ReviewsSection serviceId={hotel.id} serviceType="hotel" />
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-[2.5rem] border border-gray-200 p-8 shadow-2xl shadow-gray-200/50">
                                <div className="flex items-end gap-2 mb-8">
                                    <span className="text-4xl font-bold text-gray-900">MUR {hotel.base_price.toLocaleString()}</span>
                                    <span className="text-gray-500 font-medium mb-1">/ night</span>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Check In</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input
                                                    type="date"
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-red font-semibold transition-all"
                                                    value={checkIn}
                                                    onChange={(e) => setCheckIn(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Check Out</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input
                                                    type="date"
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-red font-semibold transition-all"
                                                    value={checkOut}
                                                    onChange={(e) => setCheckOut(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Number of Guests</label>
                                        <div className="relative">
                                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <select
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-red font-semibold appearance-none transition-all"
                                                value={guests}
                                                onChange={(e) => setGuests(parseInt(e.target.value))}
                                            >
                                                {[1, 2, 3, 4, 5, 6].map(n => (
                                                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleBookNow}
                                        className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-brand-red transition-all shadow-xl shadow-gray-200 mt-4 active:scale-[0.98]"
                                    >
                                        Reserve Now
                                    </button>

                                    <p className="text-center text-gray-400 text-sm font-medium">
                                        No payment required at this stage
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showWizard && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative p-8">
                        <button 
                            onClick={() => setShowWizard(false)}
                            className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-all"
                        >
                             <ArrowLeft className="rotate-90" />
                        </button>
                        <BookingWizard
                            serviceId={hotel.id}
                            serviceName={hotel.name}
                            servicePrice={hotel.base_price}
                            serviceCategory="hotel"
                            onComplete={onBookingConfirm}
                            isLoading={bookingLoading}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
