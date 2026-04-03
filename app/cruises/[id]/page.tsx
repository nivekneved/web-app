'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useParams } from 'next/navigation'
import { MapPin, Check, ArrowLeft, Calendar, Users, Ship, X } from 'lucide-react'

import Link from 'next/link'
import { toast } from 'sonner'
import StarRating from '@/components/ui/StarRating'
import ReviewsSection from '@/components/ReviewsSection'
import BookingWizard, { BookingWizardData } from '@/components/BookingWizard'
import { createBookingRequest } from '@/lib/bookingService'
import { useRouter } from 'next/navigation'



const supabase = createClient()

type Cruise = {
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
    itinerary?: { time: string; title: string; description: string }[]
}

export default function CruiseDetailPage() {
    const params = useParams()
    const [cruise, setCruise] = useState<Cruise | null>(null)
    const [loading, setLoading] = useState(true)
    const [departureDate, setDepartureDate] = useState('')
    const [guests, setGuests] = useState(2)

    const [showWizard, setShowWizard] = useState(false)
    const [bookingLoading, setBookingLoading] = useState(false)
    const router = useRouter()


    useEffect(() => {
        if (params.id) {
            loadCruise(params.id as string)
        }
    }, [params.id])

    async function loadCruise(id: string) {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('id, name, description, location, region, base_price, rating, image_url, amenities, duration_days, itinerary')
                .eq('id', id)
                .eq('service_type', 'cruise')
                .single()

            if (error) throw error
            setCruise(data)
        } catch (error) {
            console.error('Error loading cruise:', error)
            toast.error('Cruise not found')
        } finally {
            setLoading(false)
        }
    }

    function handleBookNow() {
        if (!departureDate) {
            toast.error('Please select a departure date')
            return
        }
        setShowWizard(true)
    }

    async function handleBookingComplete(data: BookingWizardData) {
        if (!cruise) return
        setBookingLoading(true)
        
        const result = await createBookingRequest({
            serviceId: cruise.id,
            serviceName: cruise.name,
            serviceCategory: 'cruise',
            amount: cruise.base_price,
            startDate: data.checkIn || departureDate,
            endDate: data.checkOut,
            paxAdults: data.adults || guests,
            paxChildren: data.children || 0,
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
            router.push(`/booking-confirmation?id=${result.bookingId}&service=${encodeURIComponent(cruise.name)}&amount=${cruise.base_price}`)
        } else {
            toast.error(result.error || 'Failed to submit booking request')
        }
        setBookingLoading(false)
    }


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
            </div>
        )
    }

    if (!cruise) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-slate-900 mb-4">Cruise Not Found</h1>
                    <Link href="/cruises" className="text-red-600 font-bold hover:underline">
                        ← Back to Cruises
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
                            <X size={24} />
                        </button>
                        <div className="p-8">
                            <BookingWizard 
                                serviceId={cruise.id}
                                serviceName={cruise.name}
                                servicePrice={cruise.base_price}
                                serviceCategory="cruise"
                                onComplete={handleBookingComplete}
                                isLoading={bookingLoading}
                                initialData={{
                                    checkIn: departureDate,
                                    adults: guests,
                                    children: 0
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
            {/* Back Button */}

            <div className="bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link href="/cruises" className="inline-flex items-center gap-2 text-slate-600 hover:text-red-600 font-medium transition-colors">
                        <ArrowLeft size={18} />
                        Back to Cruises
                    </Link>
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-[500px]">
                {cruise.image_url ? (
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${cruise.image_url})` }} />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-slate-900 flex items-center justify-center">
                        <Ship size={120} className="text-white/30" />
                    </div>
                )}
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-64 pb-20">
                {/* Floating Info Card */}
                <div className="bg-white rounded-[3rem] shadow-2xl p-8 border border-slate-100 mb-12">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div>
                                            <h1 className="text-4xl font-black text-slate-900 mb-2">{cruise.name}</h1>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1 text-slate-600">
                                                    <MapPin size={18} />
                                                    <span className="font-medium">{cruise.location}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-slate-600">
                                                    <Calendar size={18} />
                                                    <span className="font-medium">{cruise.duration_days} days</span>
                                                </div>
                                                <div className="flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full border border-amber-100">
                                                    <StarRating rating={cruise.rating} size={16} />
                                                    <span className="font-bold text-xs text-amber-700">{cruise.rating} Rating</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {cruise.description && (
                                        <p className="text-slate-600 leading-relaxed">{cruise.description}</p>
                                    )}
                                </div>

                                <div className="lg:w-96 bg-slate-50 rounded-2xl p-6 border border-slate-200">
                                    <div className="text-center mb-6">
                                        <div className="text-sm text-slate-500 mb-1">Starting from</div>
                                        <div className="text-4xl font-black text-slate-900">Rs {cruise.base_price?.toLocaleString()}</div>
                                        <div className="text-sm text-slate-500">per person</div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
                                                <Calendar size={14} className="inline mr-1" />
                                                Departure Date
                                            </label>
                                            <input
                                                type="date"
                                                value={departureDate}
                                                onChange={(e) => setDepartureDate(e.target.value)}
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

                {/* Itinerary Section */}
                {cruise.itinerary && cruise.itinerary.length > 0 && (
                    <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm mb-12">
                        <section>
                            <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-6">Voyage</h2>
                            <h3 className="text-4xl font-black text-slate-900 mb-10 leading-tight">Detailed Itinerary</h3>
                            <div className="space-y-0">
                                {cruise.itinerary.map((item, idx) => (
                                    <div key={idx} className="relative pl-12 pb-12 last:pb-0">
                                        {/* Timeline Line */}
                                        {idx !== cruise.itinerary!.length - 1 && (
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

                {/* Amenities */}
                {cruise.amenities && cruise.amenities.length > 0 && (
                    <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm mb-12">
                        <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-6">Experience</h2>
                        <h3 className="text-4xl font-black text-slate-900 mb-10 leading-tight">Onboard Amenities</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cruise.amenities.map((amenity, idx) => (
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
                    <ReviewsSection serviceId={cruise.id} serviceType="cruise" />
                </div>
            </div>
        </div>
    )
}
