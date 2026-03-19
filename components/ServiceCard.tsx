'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Clock, ArrowRight, Share2, X } from 'lucide-react'
import StarRating from './ui/StarRating'
import BookingWizard, { BookingWizardData } from './BookingWizard'
import { createBookingRequest } from '@/lib/bookingService'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface ServiceCardProps {
    id: string
    title: string
    location?: string
    price: number
    image: string
    duration?: string
    link: string
    tag?: string
    rating?: number
    service_type?: string
    isSeasonal?: boolean
    dealNote?: string
}

export default function ServiceCard({ id, title, location, price, image, duration, link, tag, rating, service_type, isSeasonal, dealNote }: ServiceCardProps) {
    const [showWizard, setShowWizard] = React.useState(false)
    const [bookingLoading, setBookingLoading] = React.useState(false)
    const router = useRouter()

    async function handleBookingComplete(data: BookingWizardData) {
        setBookingLoading(true)
        const result = await createBookingRequest({
            serviceId: id,
            serviceName: title,
            serviceCategory: service_type || 'service',
            amount: price,
            startDate: data.checkIn,
            endDate: data.checkOut,
            paxAdults: data.guests,
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
            router.push(`/booking-confirmation?id=${result.bookingId}&service=${encodeURIComponent(title)}&amount=${price}`)
        } else {
            toast.error(result.error || 'Failed to submit booking request')
        }
        setBookingLoading(false)
    }

    return (
        <React.Fragment>
            {showWizard && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-1 relative shadow-2xl">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowWizard(false);
                            }}
                            className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors z-10"
                        >
                            <X size={24} />
                        </button>
                        <div className="p-8">
                            <BookingWizard 
                                serviceId={id}
                                serviceName={title}
                                servicePrice={price}
                                serviceCategory={service_type || 'service'}
                                onComplete={handleBookingComplete}
                                isLoading={bookingLoading}
                            />
                        </div>
                    </div>
                </div>
            )}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
        >
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={image || "/hero-hotel.png"}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {tag && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
                        {tag}
                    </div>
                )}
                {isSeasonal && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-red-900/20 z-10">
                        {dealNote || 'Limited Time'}
                    </div>
                )}
            </div>
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                    {location && (
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase">
                            <MapPin size={14} className="text-red-500" />
                            {location}
                        </div>
                    )}
                    {duration && (
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase">
                            <Clock size={14} />
                            {duration}
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-1">
                    {title}
                </h3>

                <div className="mb-4">
                    <StarRating rating={rating || 0} size={14} showNumber={true} />
                </div>

                <div className="mt-auto pt-6">
                    <div className="flex items-end justify-between border-t border-slate-100 pt-4 mb-4">
                        <div>
                            <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">From</span>
                            <span className="text-xl font-black text-slate-900">Rs {price.toLocaleString()}</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const shareUrl = window.location.origin + link;
                                    if (navigator.share) {
                                        navigator.share({
                                            title: title,
                                            url: shareUrl
                                        }).catch(console.error);
                                    } else {
                                        navigator.clipboard.writeText(shareUrl);
                                        import('sonner').then(({ toast }) => toast.success('Link copied to clipboard!'));
                                    }
                                }}
                                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-950 hover:text-white transition-all shadow-sm"
                                title="Share"
                            >
                                <Share2 size={16} />
                            </button>
                            <Link 
                                href={link} 
                                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm"
                            >
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

{/* 
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowWizard(true);
                        }}
                        className="w-full py-4 bg-red-600 text-white rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-slate-900 transition-all shadow-lg shadow-red-600/20"
                    >
                        Book This Now
                    </button>
                    */}
                </div>
            </div>
        </motion.div>
    </React.Fragment>
    )
}
