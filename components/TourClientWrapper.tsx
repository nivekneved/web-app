'use client'

import { useState } from 'react'
import { MapPin, Check, ArrowLeft, Calendar, Users, Heart, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useWishlist } from '@/contexts/WishlistContext'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import StarRating from '@/components/ui/StarRating'
import ReviewsSection from '@/components/ReviewsSection'
import BookingWizard, { BookingWizardData } from '@/components/BookingWizard'
import { createBookingRequest } from '@/lib/bookingService'
import SocialShare from '@/components/SocialShare'

type Tour = {
    id: string
    name: string
    description: string
    location: string
    region: string
    base_price: number
    rating: number
    image_url: string
    amenities: string[]
    duration_days: number
    max_group_size: number
    itinerary?: { time: string; title: string; description: string }[]
}

export default function TourClientWrapper({ tour }: { tour: Tour }) {
    const [startDate, setStartDate] = useState('')
    const [guests, setGuests] = useState(2)
    const [showWizard, setShowWizard] = useState(false)
    const [bookingLoading, setBookingLoading] = useState(false)
    const router = useRouter()
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

    function toggleWishlist() {
        if (isInWishlist(tour.id)) {
            removeFromWishlist(tour.id)
            toast.success('Removed from wishlist')
        } else {
            addToWishlist({
                id: tour.id,
                service_type: 'tour',
                name: tour.name,
                image_url: tour.image_url,
                base_price: tour.base_price,
                location: tour.location
            })
            toast.success('Added to wishlist')
        }
    }

    function handleBookNow() {
        if (!startDate) {
            toast.error('Please select a start date')
            return
        }
        if (tour?.max_group_size && guests > tour.max_group_size) {
            toast.error(`Maximum group size is ${tour.max_group_size}`)
            return
        }
        setShowWizard(true)
    }

    async function handleBookingComplete(data: BookingWizardData) {
        setBookingLoading(true)
        
        const result = await createBookingRequest({
            serviceId: tour.id,
            serviceName: tour.name,
            serviceCategory: 'tour',
            amount: tour.base_price,
            startDate: data.checkIn || startDate,
            endDate: data.checkOut,
            paxAdults: data.guests || guests,
            paxChildren: 0,
            travelers: data.travelers as Record<string, unknown>[],
            specialRequests: data.notes,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone
        })

        if (result.success) {
            toast.success('Booking request submitted successfully!')
            setShowWizard(false)
            router.push(`/booking-confirmation?id=${result.bookingId}&service=${encodeURIComponent(tour.name)}&amount=${tour.base_price}`)
        } else {
            toast.error(result.error || 'Failed to submit booking request')
        }
        setBookingLoading(false)
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Booking Wizard Modal */}
            {showWizard && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-1 relative shadow-2xl">
                        <button 
                            onClick={() => setShowWizard(false)}
                            className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors z-10"
                        >
                            <X size={24} className="rotate-90 sm:rotate-0" />
                        </button>
                        <div className="p-8">
                            <BookingWizard 
                                serviceId={tour.id}
                                serviceName={tour.name}
                                servicePrice={tour.base_price}
                                serviceCategory="tour"
                                onComplete={handleBookingComplete}
                                isLoading={bookingLoading}
                                showRoomSelection={false}
                                initialData={{
                                    checkIn: startDate,
                                    guests: guests
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
            {/* Hero Section */}

            <div className="relative h-[65vh] w-full overflow-hidden">
                <Image
                    src={tour.image_url || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5'}
                    alt={tour.name}
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
                        <Link href="/tours">
                            <ArrowLeft size={20} />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleWishlist}
                        className={cn(
                            "backdrop-blur-md rounded-full text-white transition-all",
                            isInWishlist(tour.id) ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 hover:bg-white/30'
                        )}
                        aria-label={isInWishlist(tour.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        <Heart size={20} fill={isInWishlist(tour.id) ? 'currentColor' : 'none'} />
                    </Button>
                    <div className="backdrop-blur-md bg-white/10 p-1 rounded-full border border-white/20">
                        <SocialShare 
                            url={typeof window !== 'undefined' ? window.location.href : ''} 
                            title={tour.name} 
                        />
                    </div>
                </div>

                <div className="absolute bottom-16 left-8 right-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <Badge variant="warning" className="px-4 py-1.5 shadow-xl shadow-amber-600/20">
                                Top Rated Tour
                            </Badge>
                            <div className="flex items-center gap-2">
                                <StarRating rating={tour.rating} size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/90">{tour.rating} Rating</span>
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
                            {tour.name}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/90 font-medium text-lg">
                            <div className="flex items-center gap-2">
                                <MapPin size={22} className="text-red-500" />
                                {tour.location}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={22} className="text-white/60" />
                                {tour.duration_days} Days
                            </div>
                            <div className="flex items-center gap-2">
                                <Users size={22} className="text-white/60" />
                                Max {tour.max_group_size} People
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 pb-32">
                <Breadcrumbs 
                    items={[
                        { label: 'Tours', href: '/tours' },
                        { label: tour.name, active: true }
                    ]}
                    className="mb-12 mt-8"
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
                    <div className="lg:col-span-2 space-y-20">
                        {/* Description */}
                        <section>
                            <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-6">Discovery</h2>
                            <h3 className="text-4xl font-black text-slate-900 mb-8 leading-tight">About this tour</h3>
                            <p className="text-xl text-slate-500 leading-relaxed font-medium">
                                {tour.description}
                            </p>
                        </section>

                        {/* Itinerary Section */}
                        {tour.itinerary && tour.itinerary.length > 0 && (
                            <section className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                                <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-6">Experience</h2>
                                <h3 className="text-4xl font-black text-slate-900 mb-10 leading-tight">Detailed Itinerary</h3>
                                <div className="space-y-0">
                                    {tour.itinerary.map((item, idx) => (
                                        <div key={idx} className="relative pl-12 pb-12 last:pb-0">
                                            {/* Timeline Line */}
                                            {idx !== tour.itinerary!.length - 1 && (
                                                <div className="absolute left-[15px] top-[30px] bottom-0 w-0.5 bg-slate-100" />
                                            )}
                                            {/* Timeline Dot */}
                                            <div className="absolute left-0 top-1.5 w-8 h-8 bg-white border-2 border-red-600 rounded-full flex items-center justify-center z-10">
                                                <div className="w-2 h-2 bg-red-600 rounded-full" />
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                        {item.time}
                                                    </span>
                                                    <h4 className="text-xl font-black text-slate-900 leading-none">{item.title}</h4>
                                                </div>
                                                <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Inclusions */}
                        {tour.amenities && tour.amenities.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-6">Features</h2>
                                <h3 className="text-4xl font-black text-slate-900 mb-10 leading-tight">What&apos;s Included</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {tour.amenities.map((amenity, idx) => (
                                        <div key={idx} className="flex items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm">
                                                <Check size={20} />
                                            </div>
                                            <span className="font-black text-xs uppercase tracking-widest text-slate-600">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)]">
                                <div className="flex items-end gap-2 mb-10">
                                    <span className="text-5xl font-black text-slate-900 tracking-tighter">MUR {tour.base_price?.toLocaleString()}</span>
                                    <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-3">/ person</span>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Start Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                            <input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Number of People</label>
                                        <div className="relative">
                                            <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                            <input
                                                type="number"
                                                min="1"
                                                max={tour.max_group_size}
                                                value={guests}
                                                onChange={(e) => setGuests(parseInt(e.target.value))}
                                                className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm transition-all"
                                            />
                                            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2 ml-2">Limit: {tour.max_group_size} people</div>
                                        </div>
                                    </div>

                                    <Button
                                        size="xl"
                                        onClick={handleBookNow}
                                        className="w-full shadow-2xl shadow-red-600/20"
                                    >
                                        Book This Tour
                                    </Button>

                                    <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                        Limited spots available
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-20">
                    <ReviewsSection serviceId={tour.id} serviceType="tour" />
                </div>
            </div>
        </div>
    )
}
