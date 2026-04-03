'use client'

import { useState, useEffect } from 'react'
import { MapPin, Check, ArrowLeft, Clock, Heart } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useWishlist } from '@/contexts/WishlistContext'
import BookingWizard, { BookingWizardData } from '@/components/BookingWizard'
import { createBookingRequest } from '@/lib/bookingService'
import StarRating from '@/components/ui/StarRating'
import ReviewsSection from '@/components/ReviewsSection'
import { useSettings } from '@/contexts/SettingsContext'
import { createClient } from '@/lib/supabase'

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
    highlights?: string[]
    included?: string[]
    not_included?: string[]
    cancellation_policy?: string
    terms_and_conditions?: string
    meal_plans?: { id: string; label: string; price: number }[]
    child_price?: number
    child_age_limit?: number
    max_adults?: number
    max_children?: number
}

interface UserProfile {
    id: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    user_metadata?: {
        first_name?: string;
        last_name?: string;
    };
}

export default function ActivityClientWrapper({ activity }: { activity: ActivityService }) {
    const { generalConfig: config } = useSettings()
    const labels = (config?.ui_labels || {}) as Record<string, string>
    const router = useRouter()
    const [date, setDate] = useState('')
    const [participants, setParticipants] = useState(2)
    const [showWizard, setShowWizard] = useState(false)
    const [bookingLoading, setBookingLoading] = useState(false)
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

    useEffect(() => {
        async function fetchUser() {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()
                setUserProfile(profile || user)
            }
        }
        fetchUser()
    }, [])

    function toggleWishlist() {
        if (isInWishlist(activity.id)) {
            removeFromWishlist(activity.id)
            toast.success(labels.wishlist_removed || 'Removed from wishlist')
        } else {
            addToWishlist({
                id: activity.id,
                service_type: 'activity',
                name: activity.name,
                image_url: activity.image_url,
                base_price: activity.base_price,
                location: activity.location
            })
            toast.success(labels.wishlist_added || 'Added to wishlist')
        }
    }

    function handleBookNow() {
        if (!date) {
            toast.error(labels.select_date_error || 'Please select a date')
            return
        }
        setShowWizard(true)
    }

    async function handleBookingComplete(data: BookingWizardData, totalAmount: number) {
        setBookingLoading(true)
        
        const result = await createBookingRequest({
            serviceId: activity.id,
            serviceName: activity.name,
            serviceCategory: 'activity',
            amount: totalAmount,
            startDate: data.checkIn || date,
            endDate: data.checkOut,
            paxAdults: data.adults || participants,
            paxChildren: 0,
            travelers: data.travelers as Record<string, unknown>[],
            specialRequests: data.notes,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone
        })

        if (result.success) {
            toast.success(labels.booking_success || 'Booking request submitted successfully!')
            router.push(`/booking-confirmation?id=${result.bookingId}&service=${encodeURIComponent(activity.name)}&amount=${totalAmount}`)
        } else {
            toast.error(result.error || labels.booking_error || 'Failed to submit booking request')
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
                                childPrice={activity.child_price}
                                serviceCategory="activity"
                                onComplete={handleBookingComplete}
                                isLoading={bookingLoading}
                                showRoomSelection={false}
                                mealPlans={activity.meal_plans}
                                initialData={{
                                    checkIn: date,
                                    adults: participants,
                                    children: 0,
                                    firstName: userProfile?.first_name || userProfile?.user_metadata?.first_name || '',
                                    lastName: userProfile?.last_name || userProfile?.user_metadata?.last_name || '',
                                    email: userProfile?.email || '',
                                    phone: userProfile?.phone || ''
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
                        {labels.back_to_activities || 'Back to Activities'}
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
                                                    <span className="font-medium">{activity.duration_hours} {labels.hours || 'hours'}</span>
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

                                <div className="lg:w-96 bg-slate-50 rounded-2xl p-6 border border-slate-300">
                                    <div className="text-center mb-6">
                                        <div className="text-sm text-slate-500 mb-1">{labels.starting_from || 'Starting from'}</div>
                                        <div className="text-4xl font-black text-slate-900">Rs {activity.base_price?.toLocaleString()}</div>
                                        <div className="text-sm text-slate-500">{labels.per_person || 'per person'}</div>
                                        {activity.child_price && activity.child_price > 0 && (
                                            <div className="mt-2 flex items-center justify-between p-3 bg-white/50 rounded-xl border border-slate-200 border-dashed">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{labels.child_rate || 'Child Rate'}</span>
                                                    <span className="text-xs font-bold text-red-600">MUR {activity.child_price.toLocaleString()}</span>
                                                </div>
                                                {activity.child_age_limit && (
                                                    <span className="text-[8px] font-black p-1 bg-slate-100 rounded text-slate-400 uppercase">Under {activity.child_age_limit} yrs</span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
                                                {labels.date_label || 'Date'}
                                            </label>
                                            <input
                                                type="date"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 focus:border-red-600 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
                                                {labels.participants_label || 'Participants'}
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={participants}
                                                onChange={(e) => setParticipants(parseInt(e.target.value))}
                                                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 focus:border-red-600 transition-all"
                                            />
                                        </div>

                                        <button
                                            onClick={handleBookNow}
                                            className="w-full px-6 py-4 bg-red-600 text-white rounded-xl font-black uppercase tracking-wider hover:bg-slate-900 transition-all shadow-lg shadow-red-600/20"
                                        >
                                            {labels.book_now || 'Book Now'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                {/* Activity Content Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                     {/* Highlights */}
                    {activity.highlights && activity.highlights.length > 0 && (
                        <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm">
                            <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-6">Key Highlights</h2>
                            <ul className="space-y-4">
                                {activity.highlights.map((h, i) => (
                                    <li key={i} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all">
                                        <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                                            <Check size={16} />
                                        </div>
                                        <span className="font-bold text-slate-700">{h}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Quick Inclusions */}
                    <div className="bg-slate-900 rounded-[2rem] p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl -mr-16 -mt-16" />
                        <h2 className="text-xs font-black text-red-500 uppercase tracking-[0.4em] mb-6">Experience Value</h2>
                        <div className="space-y-8 relative">
                            {activity.included && activity.included.length > 0 && (
                                <div>
                                    <h3 className="text-white font-black uppercase text-[10px] tracking-widest mb-4">Included In This Price</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {activity.included.map((inc, i) => (
                                            <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/80 text-xs font-black tracking-widest">{inc}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {activity.not_included && activity.not_included.length > 0 && (
                                <div>
                                    <h3 className="text-white/40 font-black uppercase text-[10px] tracking-widest mb-4">Important: Not Included</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {activity.not_included.map((not, i) => (
                                            <span key={i} className="px-4 py-2 bg-white/5 border border-white/5 border-dashed rounded-full text-white/40 text-xs font-black tracking-widest">{not}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Itinerary Section */}
                {activity.itinerary && activity.itinerary.length > 0 && (
                    <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm mb-12">
                        <section>
                            <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-6">{labels.experience_label || 'Experience'}</h2>
                            <h3 className="text-4xl font-black text-slate-900 mb-10 leading-tight">{labels.detailed_itinerary || 'Detailed Itinerary'}</h3>
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

                {/* Policies Section */}
                <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm mb-12 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-700" />
                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {activity.cancellation_policy && (
                            <section>
                                <h2 className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em] mb-4">Refund Policy</h2>
                                <h3 className="text-3xl font-black text-slate-900 mb-6">Cancellation</h3>
                                <p className="text-slate-500 font-medium leading-relaxed whitespace-pre-line">{activity.cancellation_policy}</p>
                            </section>
                        )}
                        {activity.terms_and_conditions && (
                            <section>
                                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Legal Notice</h2>
                                <h3 className="text-3xl font-black text-slate-900 mb-6">Terms & Conditions</h3>
                                <p className="text-slate-500 font-medium leading-relaxed whitespace-pre-line">{activity.terms_and_conditions}</p>
                            </section>
                        )}
                    </div>
                </div>

                <div className="mb-12">
                    <ReviewsSection serviceId={activity.id} serviceType="activity" />
                </div>
            </div>
        </div>
    )
}
