'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import ServiceCard from '@/components/ServiceCard'
import { createClient } from '@/lib/supabase'
import { Filter, Star, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const supabase = createClient()

type Service = {
    id: string
    name: string
    location: string
    base_price: number
    image_url: string
    duration_days?: number
    duration_hours?: number
    service_type: string
    rating?: number
}

type DestinationListingProps = {
    title: string
    subtitle: string
    heroImage: string
    regions?: string[]
    serviceTypes?: string[]
    tag: string
}

export default function DestinationListing({
    title,
    subtitle,
    heroImage,
    regions,
    serviceTypes,
    tag
}: DestinationListingProps) {
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)
    const [sortBy, setSortBy] = useState<string>('price-asc')
    const [filterPrice, setFilterPrice] = useState<number>(200000)
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [selectedRatings, setSelectedRatings] = useState<number[]>([])

    const loadServices = React.useCallback(async () => {
        try {
            setLoading(true)
            let query = supabase
                .from('services')
                .select('id, name, location, base_price, image_url, duration_days, duration_hours, service_type, rating')

            if (regions && regions.length > 0) {
                query = query.in('region', regions)
            }

            if (serviceTypes && serviceTypes.length > 0) {
                query = query.in('service_type', serviceTypes)
            }

            const { data, error } = await query

            if (error) throw error
            setServices(data || [])
        } catch (error) {
            console.error('Error loading services:', error)
        } finally {
            setLoading(false)
        }
    }, [regions, serviceTypes])

    useEffect(() => {
        loadServices()
    }, [loadServices])

    const availableTypes = useMemo(() => {
        const types = new Set(services.map(s => s.service_type))
        return Array.from(types).sort()
    }, [services])

    const processedServices = useMemo(() => {
        let result = [...services]

        if (filterPrice) {
            result = result.filter(s => Number(s.base_price) <= filterPrice)
        }

        if (selectedTypes.length > 0) {
            result = result.filter(s => selectedTypes.includes(s.service_type))
        }

        if (selectedRatings.length > 0) {
            result = result.filter(s => s.rating && selectedRatings.includes(Math.floor(s.rating)))
        }

        result.sort((a, b) => {
            if (sortBy === 'price-asc') return Number(a.base_price) - Number(b.base_price)
            if (sortBy === 'price-desc') return Number(b.base_price) - Number(a.base_price)
            if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
            if (sortBy === 'rating-desc') return (b.rating || 0) - (a.rating || 0)
            return 0
        })

        return result
    }, [services, sortBy, filterPrice, selectedTypes, selectedRatings])

    const getServiceLink = (service: Service) => {
        const type = service.service_type.toLowerCase()
        const base = type === 'activity' ? '/activities' : 
                     type === 'tour' ? '/tours' : 
                     type === 'cruise' ? '/cruises' : 
                     type === 'hotel' ? '/hotels' : 
                     type === 'lounge' ? '/lounge' : '/services'
        return `${base}/${service.id}`
    }

    const toggleType = (type: string) => {
        setSelectedTypes(prev => 
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        )
    }

    const toggleRating = (rating: number) => {
        setSelectedRatings(prev => 
            prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
        )
    }

    return (
        <div className="min-h-screen bg-[#F2F5F7]">
            {/* MMT Style Hero - more focused */}
            <div className="relative h-[250px] md:h-[350px] flex items-center overflow-hidden">
                <Image
                    src={heroImage}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl">
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-6xl font-black text-white mb-2 uppercase tracking-tight"
                        >
                            {title}
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg md:text-xl text-white/80 font-medium"
                        >
                            {subtitle}
                        </motion.p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters - MMT Style */}
                    <aside className="lg:w-1/4 space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <Filter size={20} className="text-blue-500" />
                                    Filters
                                </h3>
                                <button 
                                    onClick={() => {
                                        setFilterPrice(200000);
                                        setSelectedTypes([]);
                                        setSelectedRatings([]);
                                    }}
                                    className="text-sm font-bold text-blue-600 hover:text-blue-700"
                                >
                                    Reset All
                                </button>
                            </div>

                            {/* Price Filter */}
                            <div className="mb-8">
                                <label className="block text-sm font-black text-slate-900 uppercase tracking-widest mb-4">
                                    Budget (Up to Rs {filterPrice.toLocaleString()})
                                </label>
                                <input
                                    type="range"
                                    min="1000"
                                    max="200000"
                                    step="5000"
                                    value={filterPrice}
                                    onChange={(e) => setFilterPrice(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="flex justify-between mt-2 text-xs font-bold text-slate-400">
                                    <span>Rs 1,000</span>
                                    <span>Rs 200,000+</span>
                                </div>
                            </div>

                            {/* Service Type Filter */}
                            <div className="mb-8">
                                <label className="block text-sm font-black text-slate-900 uppercase tracking-widest mb-4">
                                    Category
                                </label>
                                <div className="space-y-3">
                                    {availableTypes.map(type => (
                                        <label key={type} className="flex items-center group cursor-pointer">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTypes.includes(type)}
                                                    onChange={() => toggleType(type)}
                                                    className="peer h-5 w-5 appearance-none rounded border-2 border-slate-200 checked:bg-blue-600 checked:border-blue-600 transition-all"
                                                />
                                                <Check className="absolute h-3 w-3 text-white left-1 opacity-0 peer-checked:opacity-100 transition-opacity" />
                                            </div>
                                            <span className="ml-3 text-sm font-bold text-slate-600 group-hover:text-slate-900 capitalize">
                                                {type}s
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div>
                                <label className="block text-sm font-black text-slate-900 uppercase tracking-widest mb-4">
                                    Star Rating
                                </label>
                                <div className="space-y-3">
                                    {[5, 4, 3].map(rating => (
                                        <label key={rating} className="flex items-center group cursor-pointer">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRatings.includes(rating)}
                                                    onChange={() => toggleRating(rating)}
                                                    className="peer h-5 w-5 appearance-none rounded border-2 border-slate-200 checked:bg-blue-600 checked:border-blue-600 transition-all"
                                                />
                                                <Check className="absolute h-3 w-3 text-white left-1 opacity-0 peer-checked:opacity-100 transition-opacity" />
                                            </div>
                                            <span className="ml-3 flex items-center gap-1">
                                                {[...Array(rating)].map((_, i) => (
                                                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                                                ))}
                                                <span className="text-sm font-bold text-slate-600 ml-1">& Up</span>
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Promo Card */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white overflow-hidden relative">
                            <div className="relative z-10">
                                <h4 className="text-xl font-black mb-2 uppercase">Need Help?</h4>
                                <p className="text-sm text-white/80 mb-4 font-medium">Get personalized travel advice from our experts.</p>
                                <button className="bg-white text-blue-600 px-6 py-2 rounded-xl font-bold text-sm hover:scale-105 transition-transform">
                                    Contact Us
                                </button>
                            </div>
                            <div className="absolute -bottom-4 -right-4 opacity-20">
                                <Image src="/assets/hero/flight_booking_hero_1773391370829.png" alt="help" width={100} height={100} className="rounded-full" />
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="lg:w-3/4">
                        {/* Top Bar Sort */}
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-6 flex flex-wrap items-center justify-between gap-4">
                            <div className="text-slate-600 font-bold">
                                Showing <span className="text-slate-900">{processedServices.length}</span> results for your search
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Sort By:</span>
                                <div className="flex gap-2">
                                    {[
                                        { id: 'price-asc', label: 'Price (Low)' },
                                        { id: 'price-desc', label: 'Price (High)' },
                                        { id: 'rating-desc', label: 'Top Rated' }
                                    ].map(opt => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setSortBy(opt.id)}
                                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                                sortBy === opt.id 
                                                ? 'bg-blue-600 text-white' 
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            <AnimatePresence mode="popLayout">
                                {loading ? (
                                    [...Array(6)].map((_, i) => (
                                        <motion.div 
                                            key={`skeleton-${i}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="animate-pulse bg-white rounded-2xl h-[400px] border border-slate-200" 
                                        />
                                    ))
                                ) : processedServices.length === 0 ? (
                                    <motion.div 
                                        key="no-results"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="col-span-full py-20 text-center"
                                    >
                                        <div className="bg-white rounded-3xl p-12 inline-block border border-slate-200 shadow-sm">
                                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                                                <Filter size={40} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-2">No matches found</h3>
                                            <p className="text-slate-500 font-medium max-w-xs mx-auto">
                                                Try adjusting your filters or search criteria to see more options.
                                            </p>
                                            <button 
                                                onClick={() => {
                                                    setFilterPrice(200000);
                                                    setSelectedTypes([]);
                                                    setSelectedRatings([]);
                                                }}
                                                className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
                                            >
                                                Clear All Filters
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    processedServices.map((service) => (
                                        <ServiceCard
                                            key={service.id}
                                            id={service.id}
                                            title={service.name}
                                            location={service.location}
                                            price={Number(service.base_price)}
                                            image={service.image_url || "/hero-hotel.png"}
                                            duration={service.duration_days ? `${service.duration_days} Days` : service.duration_hours ? `${service.duration_hours} Hours` : ''}
                                            link={getServiceLink(service)}
                                            tag={tag || service.service_type.toUpperCase()}
                                            rating={service.rating}
                                        />
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
