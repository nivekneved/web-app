'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useParams } from 'next/navigation'
import { MapPin, Star, Check, ArrowLeft, Calendar, Users } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

const supabase = createClient()

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
}

export default function TourDetailPage() {
    const params = useParams()
    const [tour, setTour] = useState<Tour | null>(null)
    const [loading, setLoading] = useState(true)
    const [startDate, setStartDate] = useState('')
    const [guests, setGuests] = useState(2)

    useEffect(() => {
        if (params.id) {
            loadTour(params.id as string)
        }
    }, [params.id])

    async function loadTour(id: string) {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('id, name, description, location, region, base_price, rating, image_url, amenities, duration_days, max_group_size, service_type')
                .eq('id', id)
                .eq('service_type', 'tour')
                .single()

            if (error) throw error
            setTour(data)
        } catch (error) {
            console.error('Error loading tour:', error)
            toast.error('Tour not found')
        } finally {
            setLoading(false)
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
        toast.success('Booking feature coming soon!')
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
            </div>
        )
    }

    if (!tour) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-slate-900 mb-4">Tour Not Found</h1>
                    <Link href="/tours" className="text-red-600 font-bold hover:underline">
                        ← Back to Tours
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
                    <Link href="/tours" className="inline-flex items-center gap-2 text-slate-600 hover:text-red-600 font-medium transition-colors">
                        <ArrowLeft size={18} />
                        Back to Tours
                    </Link>
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-[500px]">
                {tour.image_url ? (
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${tour.image_url})` }} />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-slate-900" />
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
                                            <h1 className="text-4xl font-black text-slate-900 mb-2">{tour.name}</h1>
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <div className="flex items-center gap-1 text-slate-600">
                                                    <MapPin size={18} />
                                                    <span className="font-medium">{tour.location}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-slate-600">
                                                    <Calendar size={18} />
                                                    <span className="font-medium">{tour.duration_days} days</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-slate-600">
                                                    <Users size={18} />
                                                    <span className="font-medium">Max {tour.max_group_size} people</span>
                                                </div>
                                                {tour.rating && (
                                                    <div className="flex items-center gap-1 px-3 py-1 bg-amber-50 rounded-lg">
                                                        <Star size={16} className="text-amber-600 fill-amber-600" />
                                                        <span className="font-bold text-amber-700">{tour.rating}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {tour.description && (
                                        <p className="text-slate-600 leading-relaxed">{tour.description}</p>
                                    )}
                                </div>

                                <div className="lg:w-96 bg-slate-50 rounded-2xl p-6 border border-slate-200">
                                    <div className="text-center mb-6">
                                        <div className="text-sm text-slate-500 mb-1">Starting from</div>
                                        <div className="text-4xl font-black text-slate-900">Rs {tour.base_price?.toLocaleString()}</div>
                                        <div className="text-sm text-slate-500">per person</div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
                                                <Calendar size={14} className="inline mr-1" />
                                                Start Date
                                            </label>
                                            <input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 focus:border-red-600 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
                                                <Users size={14} className="inline mr-1" />
                                                Number of People
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                max={tour.max_group_size}
                                                value={guests}
                                                onChange={(e) => setGuests(parseInt(e.target.value))}
                                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 focus:border-red-600 transition-all"
                                            />
                                            <div className="text-xs text-slate-500 mt-1">Maximum: {tour.max_group_size} people</div>
                                        </div>

                                        <button
                                            onClick={handleBookNow}
                                            className="w-full px-6 py-4 bg-green-600 text-white rounded-xl font-black uppercase tracking-wider hover:bg-slate-900 transition-all shadow-lg shadow-green-600/20"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                {/* Inclusions */}
                {tour.amenities && tour.amenities.length > 0 && (
                    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                        <h2 className="text-2xl font-black text-slate-900 mb-6">What&apos;s Included</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tour.amenities.map((amenity, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="p-2 bg-green-50 rounded-lg">
                                        <Check size={16} className="text-green-600" />
                                    </div>
                                    <span className="text-slate-700 font-medium">{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
