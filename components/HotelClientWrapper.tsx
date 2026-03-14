'use client'

import { useState } from 'react'
import { MapPin, Star, Check, ArrowLeft, Calendar, Users, Heart, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { useWishlist } from '@/contexts/WishlistContext'
import ReviewsSection from '@/components/ReviewsSection'
import BookingWizard, { BookingWizardData } from '@/components/BookingWizard'
import { createBookingRequest } from '@/lib/bookingService'
import { Breadcrumbs } from './ui/Breadcrumbs'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'

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
                specialRequests: formData.notes
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
            <div className="relative h-[65vh] w-full overflow-hidden">
                <Image
                    src={hotel.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945'}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                
                <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-10">
                    <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="bg-white/10 backdrop-blur-md text-white hover:bg-white/30 rounded-full"
                    >
                        <Link href="/hotels">
                            <ArrowLeft size={20} />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleWishlist}
                        className={cn(
                            "backdrop-blur-md rounded-full text-white transition-all",
                            isInWishlist(hotel.id) ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 hover:bg-white/30'
                        )}
                        aria-label={isInWishlist(hotel.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        <Heart size={20} fill={isInWishlist(hotel.id) ? 'currentColor' : 'none'} />
                    </Button>
                </div>

                <div className="absolute bottom-16 left-8 right-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <Badge variant="destructive" className="px-4 py-1.5 shadow-xl shadow-red-600/20">
                                Luxury Stay
                            </Badge>
                            <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-black uppercase tracking-widest">
                                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                {hotel.rating} Rating
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
                            {hotel.name}
                        </h1>
                        <div className="flex items-center gap-3 text-white/90 font-medium text-lg">
                            <MapPin size={22} className="text-red-500" />
                            {hotel.location}, {hotel.region}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 pb-32">
                <Breadcrumbs 
                    items={[
                        { label: 'Hotels', href: '/hotels' },
                        { label: hotel.name, active: true }
                    ]}
                    className="mb-8"
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
                    <div className="lg:col-span-2 space-y-20">
                        <section>
                            <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-6">Introduction</h2>
                            <h3 className="text-4xl font-black text-slate-900 mb-8 leading-tight">About this destination</h3>
                            <p className="text-xl text-slate-500 leading-relaxed font-medium">
                                {hotel.description}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-6">Experience</h2>
                            <h3 className="text-4xl font-black text-slate-900 mb-10 leading-tight">Premium Amenities</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {hotel.amenities?.map((amenity, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm">
                                            <Check size={20} />
                                        </div>
                                        <span className="font-black text-xs uppercase tracking-widest text-slate-600">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <ReviewsSection serviceId={hotel.id} serviceType="hotel" />
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)]">
                                <div className="flex items-end gap-2 mb-10">
                                    <span className="text-5xl font-black text-slate-900 tracking-tighter">MUR {hotel.base_price.toLocaleString()}</span>
                                    <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-3">/ night</span>
                                </div>

                                <div className="space-y-8">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Check In</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                                <input
                                                    type="date"
                                                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm transition-all"
                                                    value={checkIn}
                                                    onChange={(e) => setCheckIn(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Check Out</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                                <input
                                                    type="date"
                                                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm transition-all"
                                                    value={checkOut}
                                                    onChange={(e) => setCheckOut(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Number of Guests</label>
                                        <div className="relative">
                                            <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                            <select
                                                className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm appearance-none transition-all"
                                                value={guests}
                                                onChange={(e) => setGuests(parseInt(e.target.value))}
                                            >
                                                {[1, 2, 3, 4, 5, 6].map(n => (
                                                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <Button
                                        size="xl"
                                        onClick={handleBookNow}
                                        className="w-full"
                                    >
                                        Reserve Now
                                    </Button>

                                    <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                        No payment required at this stage
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showWizard && (
                <div className="fixed inset-0 z-[100] bg-white dark:bg-slate-900 overflow-y-auto animate-in fade-in slide-in-from-bottom duration-500">
                    <div className="max-w-7xl mx-auto px-4 py-12 md:px-8 md:py-20 relative">
                        <button 
                            onClick={() => setShowWizard(false)}
                            className="absolute top-12 right-8 md:right-12 p-3 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors z-[110]"
                        >
                            <X size={28} />
                        </button>
                        <div className="mb-12">
                            <h2 className="text-sm font-black text-red-600 uppercase tracking-[0.4em] mb-4">Reservation</h2>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">Your Stay at {hotel.name}</h1>
                        </div>
                        <BookingWizard
                            serviceId={hotel.id}
                            serviceName={hotel.name}
                            servicePrice={hotel.base_price}
                            serviceCategory="hotel"
                            initialData={{
                                checkIn,
                                checkOut,
                                guests
                            }}
                            onComplete={onBookingConfirm}
                            isLoading={bookingLoading}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
