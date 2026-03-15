'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useParams } from 'next/navigation'
import { MapPin, Check, ArrowLeft, Clock, Heart, Users, Calendar } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { useWishlist } from '@/contexts/WishlistContext'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import StarRating from '@/components/ui/StarRating'
import ReviewsSection from '@/components/ReviewsSection'

const supabase = createClient()

type PackageService = {
    id: string
    name: string
    description: string
    location: string
    region: string
    base_price: number
    rating: number
    image_url: string
    amenities: string[]
    duration: string
    itinerary?: { time: string; title: string; description: string }[]
}

export default function PackageDetailPage() {
    const params = useParams()
    const [pkg, setPkg] = useState<PackageService | null>(null)
    const [loading, setLoading] = useState(true)
    const [date, setDate] = useState('')
    const [participants, setParticipants] = useState(2)
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

    function toggleWishlist() {
        if (!pkg) return
        if (isInWishlist(pkg.id)) {
            removeFromWishlist(pkg.id)
            toast.success('Removed from wishlist')
        } else {
            addToWishlist({
                id: pkg.id,
                service_type: 'package',
                name: pkg.name,
                image_url: pkg.image_url,
                base_price: pkg.base_price,
                location: pkg.location
            })
            toast.success('Added to wishlist')
        }
    }

    useEffect(() => {
        if (params.id) {
            loadPackage(params.id as string)
        }
    }, [params.id])

    async function loadPackage(id: string) {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('id, name, description, location, region, base_price, rating, image_url, amenities, duration, itinerary')
                .eq('id', id)
                .single()

            if (error) throw error
            setPkg(data)
        } catch (error) {
            console.error('Error loading package:', error)
            toast.error('Package not found')
        } finally {
            setLoading(false)
        }
    }

    function handleBookNow() {
        if (!date) {
            toast.error('Please select a date')
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

    if (!pkg) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-slate-900 mb-4">Package Not Found</h1>
                    <Button variant="outline" asChild>
                        <Link href="/packages">
                            Back to Packages
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[65vh] w-full overflow-hidden">
                <Image
                    src={pkg.image_url || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5'}
                    alt={pkg.name}
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
                        <Link href="/packages">
                            <ArrowLeft size={20} />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleWishlist}
                        className={cn(
                            "backdrop-blur-md rounded-full text-white transition-all",
                            isInWishlist(pkg.id) ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 hover:bg-white/30'
                        )}
                        aria-label={isInWishlist(pkg.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        <Heart size={20} fill={isInWishlist(pkg.id) ? 'currentColor' : 'none'} />
                    </Button>
                </div>

                <div className="absolute bottom-16 left-8 right-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <Badge variant="success" className="px-4 py-1.5 shadow-xl shadow-green-600/20">
                                Popular Package
                            </Badge>
                            <div className="flex items-center gap-2">
                                <StarRating rating={pkg.rating} size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/90">{pkg.rating} Rating</span>
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
                            {pkg.name}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/90 font-medium text-lg">
                            <div className="flex items-center gap-2">
                                <MapPin size={22} className="text-red-500" />
                                {pkg.location}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={22} className="text-white/60" />
                                {pkg.duration || 'Full Day'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 pb-32">
                <Breadcrumbs 
                    items={[
                        { label: 'Packages', href: '/packages' },
                        { label: pkg.name, active: true }
                    ]}
                    className="mb-12 mt-8"
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
                    <div className="lg:col-span-2 space-y-20">
                        {/* Description */}
                        <section>
                            <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-6">Journey</h2>
                            <h3 className="text-4xl font-black text-slate-900 mb-8 leading-tight">About this package</h3>
                            <p className="text-xl text-slate-500 leading-relaxed font-medium">
                                {pkg.description}
                            </p>
                        </section>

                        {/* Itinerary Section */}
                        {pkg.itinerary && pkg.itinerary.length > 0 && (
                            <section className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                                <h2 className="text-xs font-black text-green-600 uppercase tracking-[0.4em] mb-6">Plan</h2>
                                <h3 className="text-4xl font-black text-slate-900 mb-10 leading-tight">Detailed Itinerary</h3>
                                <div className="space-y-0">
                                    {pkg.itinerary.map((item, idx) => (
                                        <div key={idx} className="relative pl-12 pb-12 last:pb-0">
                                            {/* Timeline Line */}
                                            {idx !== pkg.itinerary!.length - 1 && (
                                                <div className="absolute left-[15px] top-[30px] bottom-0 w-0.5 bg-slate-100" />
                                            )}
                                            {/* Timeline Dot */}
                                            <div className="absolute left-0 top-1.5 w-8 h-8 bg-white border-2 border-green-600 rounded-full flex items-center justify-center z-10">
                                                <div className="w-2 h-2 bg-green-600 rounded-full" />
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
                        {pkg.amenities && pkg.amenities.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-6">Details</h2>
                                <h3 className="text-4xl font-black text-slate-900 mb-10 leading-tight">What&apos;s Included</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {pkg.amenities.map((amenity, idx) => (
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
                                    <span className="text-5xl font-black text-slate-900 tracking-tighter">MUR {pkg.base_price?.toLocaleString()}</span>
                                    <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-3">/ person</span>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Preferred Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                            <input
                                                type="date"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Number of Participants</label>
                                        <div className="relative">
                                            <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                            <input
                                                type="number"
                                                min="1"
                                                value={participants}
                                                onChange={(e) => setParticipants(parseInt(e.target.value))}
                                                className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm transition-all"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        size="xl"
                                        onClick={handleBookNow}
                                        className="w-full shadow-2xl shadow-red-600/20"
                                    >
                                        Book This Experience
                                    </Button>

                                    <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                        Secure your spot today
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <ReviewsSection serviceId={pkg.id} serviceType="package" />
                </div>
            </div>
        </div>
    )
}
