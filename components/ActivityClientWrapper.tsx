'use client'

import { useState } from 'react'
import { MapPin, Check, ArrowLeft, Clock, Heart } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useWishlist } from '@/contexts/WishlistContext'
import BookingWizard, { BookingWizardData } from '@/components/BookingWizard'
import { createBookingRequest } from '@/lib/bookingService'
import StarRating from '@/components/ui/StarRating'
import ReviewsSection from '@/components/ReviewsSection'
import SocialShare from '@/components/SocialShare'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'

type ActivityService = {
    id: string
    name: string
    description: string
    location: string
    region: string
    base_price: number
    rating: number
    image_url: string
    amenities: string[]
    duration_hours: number
    itinerary?: { time: string; title: string; description: string }[]
}

export default function ActivityClientWrapper({ activity }: { activity: ActivityService }) {
    const router = useRouter()
    const [date, setDate] = useState('')
    const [participants, setParticipants] = useState(2)
    const [showWizard, setShowWizard] = useState(false)
    const [bookingLoading, setBookingLoading] = useState(false)
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

    function toggleWishlist() {
        if (isInWishlist(activity.id)) {
            removeFromWishlist(activity.id)
            toast.success('Removed from wishlist')
        } else {
            addToWishlist({
                id: activity.id,
                service_type: 'activity',
                name: activity.name,
                image_url: activity.image_url,
                base_price: activity.base_price,
                location: activity.location
            })
            toast.success('Added to wishlist')
        }
    }

    function handleBookNow() {
        if (!date) {
            toast.error('Please select a date')
            return
        }
        setShowWizard(true)
    }

    async function handleBookingComplete(data: BookingWizardData) {
        setBookingLoading(true)
        
        const result = await createBookingRequest({
            serviceId: activity.id,
            serviceName: activity.name,
            serviceCategory: 'activity',
            amount: activity.base_price,
            startDate: data.checkIn || date,
            endDate: data.checkOut,
            paxAdults: data.guests || participants,
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
            router.push(`/booking-confirmation?id=${result.bookingId}&service=${encodeURIComponent(activity.name)}&amount=${activity.base_price}`)
        } else {
            toast.error(result.error || 'Failed to submit booking request')
        }
        setBookingLoading(false)
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
                                serviceId={activity.id}
                                serviceName={activity.name}
                                servicePrice={activity.base_price}
                                serviceCategory="activity"
                                onComplete={handleBookingComplete}
                                isLoading={bookingLoading}
                                showRoomSelection={false}
                                initialData={{
                                    checkIn: date,
                                    guests: participants
                                }}
                            />

                        </div>
                    </div>
                </div>
            )}
            {/* Back Button */}
            <div className="bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link href="/activities" className="inline-flex items-center gap-2 text-slate-600 hover:text-red-600 font-medium transition-colors">
                        <ArrowLeft size={18} />
                        Back to Activities
                    </Link>
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-[500px]">
                {activity.image_url ? (
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${activity.image_url})` }} />
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
                                            <h1 className="text-4xl font-black text-slate-900 mb-2">{activity.name}</h1>
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <div className="flex items-center gap-1 text-slate-600">
                                                    <MapPin size={18} />
                                                    <span className="font-medium">{activity.location}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-slate-600">
                                                    <Clock size={18} />
                                                    <span className="font-medium">{activity.duration_hours} hours</span>
                                                </div>
                                                <div className="flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full border border-amber-100">
                                                    <StarRating rating={activity.rating} size={16} />
                                                    <span className="font-bold text-xs text-amber-700">{activity.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={toggleWishlist}
                                            className="p-3 hover:bg-red-50 rounded-xl transition-colors"
                                        >
                                            <Heart
                                                size={24}
                                                className={isInWishlist(activity.id) ? 'text-red-600 fill-red-600' : 'text-slate-400'}
                                            />
                                        </button>
                                    </div>

                                    {activity.description && (
                                        <p className="text-slate-600 leading-relaxed">{activity.description}</p>
                                    )}
                                </div>

                                <div className="lg:w-96 bg-slate-50 rounded-2xl p-6 border border-slate-200">
                                    <div className="text-center mb-6">
                                        <div className="text-sm text-slate-500 mb-1">Starting from</div>
                                        <div className="text-4xl font-black text-slate-900">Rs {activity.base_price?.toLocaleString()}</div>
                                        <div className="text-sm text-slate-500">per person</div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
                                                Date
                                            </label>
                                            <input
                                                type="date"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 focus:border-red-600 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
                                                Participants
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={participants}
                                                onChange={(e) => setParticipants(parseInt(e.target.value))}
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

                {/* Itinerary Section */}
                {activity.itinerary && activity.itinerary.length > 0 && (
                    <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm mb-12">
                        <section>
                            <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-6">Experience</h2>
                            <h3 className="text-4xl font-black text-slate-900 mb-10 leading-tight">Detailed Itinerary</h3>
                            <div className="space-y-0">
                                {activity.itinerary.map((item, idx) => (
                                    <div key={idx} className="relative pl-12 pb-12 last:pb-0">
                                        {/* Timeline Line */}
                                        {idx !== activity.itinerary!.length - 1 && (
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
                                            <p className="text-slate-500 font-medium leading-relaxed max-w-3xl">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {/* Inclusions */}
                {activity.amenities && activity.amenities.length > 0 && (
                    <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm mb-12">
                        <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-6">Service Details</h2>
                        <h3 className="text-4xl font-black text-slate-900 mb-10 leading-tight">What&apos;s Included</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activity.amenities.map((amenity, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-600 shadow-sm">
                                        <Check size={18} />
                                    </div>
                                    <span className="font-black text-xs uppercase tracking-widest text-slate-600">{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mb-12">
                    <ReviewsSection serviceId={activity.id} serviceType="activity" />
                </div>
            </div>
        </div>
    )
}
