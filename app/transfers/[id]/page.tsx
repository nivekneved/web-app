'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useParams } from 'next/navigation'
import { Car, ArrowLeft, Calendar, Users, MapPin, Heart, Shield, Clock, Luggage, X } from 'lucide-react'

import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { useWishlist } from '@/contexts/WishlistContext'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { resolveImageUrl } from '@/lib/image'
import { cn } from '@/lib/utils'
import ReviewsSection from '@/components/ReviewsSection'
import BookingWizard, { BookingWizardData } from '@/components/BookingWizard'
import { createBookingRequest } from '@/lib/bookingService'
import { useRouter } from 'next/navigation'


const supabase = createClient()

type Transfer = {
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

export default function TransferDetailPage() {
    const params = useParams()
    const [transfer, setTransfer] = useState<Transfer | null>(null)
    const [loading, setLoading] = useState(true)
    const [pickupDate, setPickupDate] = useState('')
    const [travelers, setTravelers] = useState(2)
    const [showWizard, setShowWizard] = useState(false)
    const [bookingLoading, setBookingLoading] = useState(false)
    const router = useRouter()
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()


    useEffect(() => {
        if (params.id) {
            loadTransfer(params.id as string)
        }
    }, [params.id])

    async function loadTransfer(id: string) {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('id, name, description, location, region, base_price, rating, image_url, amenities')
                .eq('id', id)
                .eq('service_type', 'transfer')
                .single()

            if (error) throw error
            setTransfer(data)
        } catch (error) {
            console.error('Error loading transfer:', error)
            toast.error('Transfer service not found')
        } finally {
            setLoading(false)
        }
    }

    function toggleWishlist() {
        if (!transfer) return
        if (isInWishlist(transfer.id)) {
            removeFromWishlist(transfer.id)
            toast.success('Removed from saved items')
        } else {
            addToWishlist({
                id: transfer.id,
                service_type: 'transfer',
                name: transfer.name,
                image_url: transfer.image_url,
                base_price: transfer.base_price,
                location: transfer.location
            })
            toast.success('Saved for later')
        }
    }

    function handleBookNow() {
        if (!pickupDate) {
            toast.error('Please select a pickup date')
            return
        }
        setShowWizard(true)
    }

    async function handleBookingComplete(data: BookingWizardData) {
        if (!transfer) return
        setBookingLoading(true)
        
        const result = await createBookingRequest({
            serviceId: transfer.id,
            serviceName: transfer.name,
            serviceCategory: 'transfer',
            amount: transfer.base_price,
            startDate: data.checkIn || pickupDate,
            endDate: data.checkOut,
            paxAdults: data.adults || travelers,
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
            router.push(`/booking-confirmation?id=${result.bookingId}&service=${encodeURIComponent(transfer.name)}&amount=${transfer.base_price}`)
        } else {
            toast.error(result.error || 'Failed to submit booking request')
        }
        setBookingLoading(false)
    }


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-900 border-t-transparent"></div>
            </div>
        )
    }

    if (!transfer) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-slate-900 mb-4">Transfer Not Found</h1>
                    <Button variant="outline" asChild>
                        <Link href="/transfers">
                            Back to Transfers
                        </Link>
                    </Button>
                </div>
            </div>
        )
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
                            <X size={24} />
                        </button>
                        <div className="p-8">
                            <BookingWizard 
                                serviceId={transfer.id}
                                serviceName={transfer.name}
                                servicePrice={transfer.base_price}
                                serviceCategory="transfer"
                                onComplete={handleBookingComplete}
                                isLoading={bookingLoading}
                                initialData={{
                                    checkIn: pickupDate,
                                    adults: travelers,
                                    children: 0
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
            {/* Hero Section */}

            <div className="relative h-[55vh] w-full overflow-hidden">
                <Image
                    src={resolveImageUrl(transfer.image_url, '/assets/placeholders/service-placeholder.png')}
                    alt={transfer.name}
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
                        <Link href="/transfers">
                            <ArrowLeft size={20} />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleWishlist}
                        className={cn(
                            "backdrop-blur-md rounded-full text-white transition-all",
                            isInWishlist(transfer.id) ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 hover:bg-white/30'
                        )}
                    >
                        <Heart size={20} fill={isInWishlist(transfer.id) ? 'currentColor' : 'none'} />
                    </Button>
                </div>

                <div className="absolute bottom-12 left-8 right-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <Badge className="bg-slate-900 text-white border-none py-1.5 px-4 shadow-lg">
                                Reliable & Professional
                            </Badge>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
                            {transfer.name}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/90 font-bold uppercase tracking-[0.2em] text-xs">
                            <div className="flex items-center gap-2">
                                <Car size={18} className="text-red-500" />
                                Chauffeur Service
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={18} className="text-red-500" />
                                {transfer.location}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 pb-32">
                <Breadcrumbs 
                    items={[
                        { label: 'Transfers', href: '/transfers' },
                        { label: transfer.name, active: true }
                    ]}
                    className="mb-12 mt-8"
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-16">
                        {/* Description */}
                        <section>
                            <h2 className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em] mb-4">Comfort First</h2>
                            <h3 className="text-3xl font-black text-slate-900 mb-6 leading-tight">Travel in Style</h3>
                            <p className="text-lg text-slate-500 leading-relaxed font-medium">
                                {transfer.description}
                                <br /><br />
                                Experience stress-free transportation with our premium transfer services. Our professional drivers ensure you arrive at your destination safely and on time. We maintain a fleet of modern, air-conditioned vehicles to provide the highest level of comfort throughout your journey.
                            </p>
                        </section>

                        {/* Amenities / Included */}
                        {transfer.amenities && transfer.amenities.length > 0 && (
                            <section>
                                <h3 className="text-2xl font-black text-slate-900 mb-8">Service Features</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {transfer.amenities.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-600 shadow-sm border border-slate-200/50 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                                <Shield size={18} />
                                            </div>
                                            <span className="font-black text-[10px] uppercase tracking-widest text-slate-600">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Driver Info */}
                        <section className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100">
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 mx-auto sm:mx-0 shadow-sm">
                                        <Users size={24} />
                                    </div>
                                    <h4 className="font-black text-sm uppercase tracking-widest">Professional</h4>
                                    <p className="text-slate-500 text-xs font-medium">Experienced, uniformed drivers with local expertise.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 mx-auto sm:mx-0 shadow-sm">
                                        <Clock size={24} />
                                    </div>
                                    <h4 className="font-black text-sm uppercase tracking-widest">Punctual</h4>
                                    <p className="text-slate-500 text-xs font-medium">We track flights and adjust for delays automatically.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 mx-auto sm:mx-0 shadow-sm">
                                        <Luggage size={24} />
                                    </div>
                                    <h4 className="font-black text-sm uppercase tracking-widest">Helpful</h4>
                                    <p className="text-slate-500 text-xs font-medium">Full assistance with your luggage and special needs.</p>
                                </div>
                             </div>
                        </section>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)]">
                                <div className="mb-8">
                                    <span className="text-xs text-slate-400 font-bold block mb-1">Fixed Service Rate</span>
                                    <div className="flex items-end gap-2">
                                        <span className="text-4xl font-black text-slate-900 tracking-tighter">Rs {transfer.base_price?.toLocaleString()}</span>
                                        <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2">/ Trip</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pickup Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                            <input
                                                type="date"
                                                value={pickupDate}
                                                onChange={(e) => setPickupDate(e.target.value)}
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Number of Passengers</label>
                                        <div className="relative">
                                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                            <input
                                                type="number"
                                                min="1"
                                                value={travelers}
                                                onChange={(e) => setTravelers(parseInt(e.target.value))}
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm transition-all"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        size="xl"
                                        onClick={handleBookNow}
                                        className="w-full shadow-xl shadow-red-600/20 mt-4"
                                    >
                                        Book Transfer
                                    </Button>

                                    <p className="text-center text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] leading-relaxed">
                                        24/7 Availability Across Mauritius
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-20 border-t border-slate-100 pt-20">
                    <ReviewsSection serviceId={transfer.id} serviceType="transfer" />
                </div>
            </div>
        </div>
    )
}
