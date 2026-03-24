'use client'

import React, { useState, useEffect, useMemo, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import ServiceCard from '@/components/ServiceCard'
import { createClient } from '@/lib/supabase'
import { Filter, Star, Check, Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const supabase = createClient()

const MAURITIUS_REGIONS = ['North', 'East', 'South', 'West', 'Mauritius', 'North Coast', 'East Coast', 'South Coast', 'West Coast']

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
    region?: string
    amenities?: string[] | string
    is_seasonal_deal?: boolean
    deal_note?: string
    description?: string
    max_group_size?: number
    room_types?: any[]
    itinerary?: any[]
    stock?: number
    status?: string
    cta_text?: string
    cta_link?: string
    gallery_images?: string[]
    meta_title?: string
    meta_description?: string
    seo_keywords?: string
    special_features?: any
    seasonality?: string
    highlights?: any
    included?: any
    not_included?: any
    cancellation_policy?: string
    terms_and_conditions?: string
    thumbnail_url?: string
    banner_url?: string
    featured?: boolean
    priority?: number
    secondary_image_url?: string
}

type ServiceListingProps = {
    title: string
    subtitle: string
    heroImage: string
    serviceTypes?: string[]
    excludeRegions?: string[]
    includeRegions?: string[]
    tag?: string
    searchPlaceholder?: string
    categorySlug?: string
}

export default function ServiceListing({
    title,
    subtitle,
    heroImage,
    serviceTypes,
    excludeRegions,
    includeRegions,
    tag,
    searchPlaceholder = "Search by name or location...",
    categorySlug
}: ServiceListingProps) {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#F2F5F7] animate-pulse" />}>
            <ServiceListingInner 
                title={title}
                subtitle={subtitle}
                heroImage={heroImage}
                serviceTypes={serviceTypes}
                excludeRegions={excludeRegions}
                includeRegions={includeRegions}
                tag={tag}
                searchPlaceholder={searchPlaceholder}
                categorySlug={categorySlug}
            />
        </Suspense>
    )
}

function ServiceListingInner({
    title,
    subtitle,
    heroImage,
    serviceTypes,
    excludeRegions,
    includeRegions,
    tag,
    searchPlaceholder,
    categorySlug
}: ServiceListingProps) {
    const searchParams = useSearchParams()
    const urlRegion = searchParams.get('region')

    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)
    const [sortBy, setSortBy] = useState<string>('price-asc')
    const [filterPrice, setFilterPrice] = useState<number>(200000)
    const [selectedRegions, setSelectedRegions] = useState<string[]>([])
    const [selectedRatings, setSelectedRatings] = useState<number[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

    const loadServices = useCallback(async () => {
        try {
            setLoading(true)
            const selectFields = [
                'id', 'name', 'location', 'base_price', 'image_url', 
                'duration_days', 'duration_hours', 'service_type', 
                'rating', 'region', 'amenities', 'is_seasonal_deal', 'deal_note',
                'description', 'max_group_size', 'room_types', 'itinerary', 'stock',
                'status', 'cta_text', 'cta_link', 'gallery_images', 'meta_title',
                'meta_description', 'seo_keywords', 'special_features', 'seasonality',
                'highlights', 'included', 'not_included', 'cancellation_policy',
                'terms_and_conditions', 'thumbnail_url', 'banner_url', 'featured',
                'priority', 'secondary_image_url'
            ].join(', ')
            
            const categorySelect = categorySlug ? ', service_categories!inner(category_id, categories!inner(slug))' : ''
            
            let query = supabase
                .from('services')
                .select(selectFields + categorySelect)

            if (categorySlug) {
                query = query.eq('service_categories.categories.slug', categorySlug)
            }

            if (serviceTypes && serviceTypes.length > 0) {
                query = query.in('service_type', serviceTypes)
            }

            if (includeRegions && includeRegions.length > 0) {
                query = query.in('region', includeRegions)
            }

            if (excludeRegions && excludeRegions.length > 0) {
                query = query.not('region', 'in', `(${excludeRegions.join(',')})`)
            }

            const { data, error } = await query

            if (error) throw error
            setServices((data as unknown as Service[]) || [])
        } catch (error) {
            console.error('Error loading services:', error)
        } finally {
            setLoading(false)
        }
    }, [serviceTypes, includeRegions, excludeRegions, categorySlug])

    useEffect(() => {
        loadServices()
    }, [loadServices])

    useEffect(() => {
        if (urlRegion) {
            setSelectedRegions([urlRegion])
        }
    }, [urlRegion])

    const availableRegions = useMemo(() => {
        const regions = new Set(services.map(s => s.region).filter(Boolean))
        return Array.from(regions).sort() as string[]
    }, [services])

    const availableAmenities = useMemo(() => {
        const amenities = new Set<string>()
        services.forEach(s => {
            if (Array.isArray(s.amenities)) {
                s.amenities.forEach(a => amenities.add(a))
            } else if (typeof s.amenities === 'string') {
                s.amenities.split(',').forEach(a => amenities.add(a.trim()))
            }
        })
        return Array.from(amenities).sort()
    }, [services])

    const processedServices = useMemo(() => {
        let result = [...services]

        if (searchTerm) {
            const term = searchTerm.toLowerCase()
            result = result.filter(s => 
                s.name.toLowerCase().includes(term) || 
                s.location?.toLowerCase().includes(term)
            )
        }

        if (filterPrice) {
            result = result.filter(s => Number(s.base_price) <= filterPrice)
        }

        if (selectedRegions.length > 0) {
            result = result.filter(s => {
                if (!s.region) return false
                // If "Mauritius" is selected, include all its sub-regions
                if (selectedRegions.includes('Mauritius')) {
                    if (MAURITIUS_REGIONS.includes(s.region)) return true
                }
                return selectedRegions.includes(s.region)
            })
        }

        if (selectedRatings.length > 0) {
            result = result.filter(s => s.rating && selectedRatings.includes(Math.floor(s.rating)))
        }

        if (selectedAmenities.length > 0) {
            result = result.filter(s => {
                const sAmenities = Array.isArray(s.amenities) 
                    ? s.amenities 
                    : typeof s.amenities === 'string' 
                        ? s.amenities.split(',').map(a => a.trim()) 
                        : []
                return selectedAmenities.every(a => sAmenities.includes(a))
            })
        }

        result.sort((a, b) => {
            if (sortBy === 'price-asc') return Number(a.base_price) - Number(b.base_price)
            if (sortBy === 'price-desc') return Number(b.base_price) - Number(a.base_price)
            if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
            if (sortBy === 'rating-desc') return (b.rating || 0) - (a.rating || 0)
            return 0
        })

        return result
    }, [services, sortBy, filterPrice, selectedRegions, selectedRatings, searchTerm, selectedAmenities])

    const getServiceLink = (service: Service) => {
        const type = service.service_type.toLowerCase()
        const base = (type === 'activity' || type === 'sea_activity' || type === 'land_activity') ? '/activities' : 
                     type === 'tour' ? '/tours' : 
                     type === 'cruise' ? '/cruises' : 
                     type === 'hotel' ? '/hotels' : 
                     type === 'lounge' ? '/lounge' : '/services'
        return `${base}/${service.id}`
    }

    const toggleRegion = (region: string) => {
        setSelectedRegions(prev => 
            prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
        )
    }

    const toggleRating = (rating: number) => {
        setSelectedRatings(prev => 
            prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
        )
    }

    const toggleAmenity = (amenity: string) => {
        setSelectedAmenities(prev => 
            prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
        )
    }

    const resetFilters = () => {
        setFilterPrice(200000)
        setSelectedRegions([])
        setSelectedRatings([])
        setSelectedAmenities([])
        setSearchTerm('')
    }

    return (
        <div className="min-h-screen bg-[#F2F5F7]">
            {/* Hero Section */}
            <div className="relative h-[250px] md:h-[350px] flex items-center overflow-hidden bg-slate-900 border-b border-white/10">
                <Image
                    src={heroImage}
                    alt={title}
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center">
                    <div className="max-w-3xl">
                        {tag && (
                            <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-block py-2 px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-6"
                            >
                                {tag}
                            </motion.span>
                        )}
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-[1.1]"
                        >
                            {title}
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-white/70 font-medium max-w-2xl mx-auto leading-relaxed"
                        >
                            {subtitle}
                        </motion.p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-1/4 space-y-6">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-300 sticky top-24">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <Filter size={20} className="text-red-600" />
                                    Filter Tools
                                </h3>
                                <button 
                                    onClick={resetFilters}
                                    className="text-xs font-black text-red-600 hover:text-red-700 uppercase tracking-widest"
                                >
                                    Reset
                                </button>
                            </div>

                            {/* Search within page */}
                            <div className="mb-8">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Quick Search</label>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                    <input
                                        type="text"
                                        placeholder={searchPlaceholder}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:bg-white font-bold text-sm transition-all"
                                    />
                                </div>
                            </div>

                            {/* Price Filter */}
                            <div className="mb-8">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                                    Budget (Up to Rs {filterPrice.toLocaleString()})
                                </label>
                                <input
                                    type="range"
                                    min="500"
                                    max="200000"
                                    step="500"
                                    value={filterPrice}
                                    onChange={(e) => setFilterPrice(Number(e.target.value))}
                                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-red-600"
                                />
                                <div className="flex justify-between mt-3 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                                    <span>Rs 500</span>
                                    <span>Rs 200k+</span>
                                </div>
                            </div>

                            {/* Region Filter */}
                            {availableRegions.length > 0 && (
                                <div className="mb-8">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Region</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {availableRegions.map(region => (
                                            <button
                                                key={region}
                                                onClick={() => toggleRegion(region)}
                                                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                                    selectedRegions.includes(region) 
                                                    ? 'bg-red-50 text-red-600 border border-red-100' 
                                                    : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                                                }`}
                                            >
                                                {region}
                                                {selectedRegions.includes(region) && <Check size={14} />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Popular Amenities / Tags */}
                            {availableAmenities.length > 0 && (
                                <div className="mb-8">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Popular Tags</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['Sea Adventure', 'Land Adventure', 'Family Friendly', 'Romantic', 'All Inclusive'].filter(a => availableAmenities.includes(a)).map(amenity => (
                                            <button
                                                key={amenity}
                                                onClick={() => toggleAmenity(amenity)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                                    selectedAmenities.includes(amenity)
                                                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                }`}
                                            >
                                                {amenity}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Rating Filter */}
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Rating</label>
                                <div className="space-y-2">
                                    {[5, 4, 3].map(rating => (
                                        <button 
                                            key={rating}
                                            onClick={() => toggleRating(rating)}
                                            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all ${
                                                selectedRatings.includes(rating)
                                                ? 'bg-red-50 border border-red-100'
                                                : 'border border-transparent hover:bg-slate-50'
                                            }`}
                                        >
                                            <div className="flex items-center gap-1">
                                                {[...Array(rating)].map((_, i) => (
                                                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                                                ))}
                                                <span className="text-[10px] font-black text-slate-400 ml-1 uppercase">& Up</span>
                                            </div>
                                            {selectedRatings.includes(rating) && <Check size={14} className="text-red-600" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Content */}
                    <main className="lg:w-3/4">
                        {/* Prominent Search Bar */}
                        <div className="mb-8">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                    <Search className="h-6 w-6 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    placeholder={searchPlaceholder}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-16 pr-6 py-6 bg-white border-2 border-slate-300 rounded-[2rem] text-xl font-bold text-slate-900 placeholder:text-slate-400 shadow-sm transition-all focus:outline-none focus:border-red-600/50 focus:ring-4 focus:ring-red-600/10"
                                />
                                {searchTerm && (
                                    <button 
                                        onClick={() => setSearchTerm('')}
                                        className="absolute inset-y-0 right-6 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Sort Bar */}
                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 mb-8 flex flex-wrap items-center justify-between gap-6">
                            <div className="text-slate-500 font-bold">
                                Found <span className="text-slate-900 font-black">{processedServices.length}</span> adventures for you
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Sort By</span>
                                <div className="flex bg-slate-50 p-1 rounded-2xl">
                                    {[
                                        { id: 'price-asc', label: 'Price (Low)' },
                                        { id: 'price-desc', label: 'Price (High)' },
                                        { id: 'rating-desc', label: 'Recommended' }
                                    ].map(opt => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setSortBy(opt.id)}
                                            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                                                sortBy === opt.id 
                                                ? 'bg-white text-slate-900 shadow-sm' 
                                                : 'text-slate-500 hover:text-slate-900'
                                            }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Results Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            <AnimatePresence mode="popLayout">
                                {loading ? (
                                    [...Array(6)].map((_, i) => (
                                        <motion.div 
                                            key={`skel-${i}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="animate-pulse bg-white rounded-[3rem] h-[450px] border border-slate-100" 
                                        />
                                    ))
                                ) : processedServices.length === 0 ? (
                                    <motion.div 
                                        key="no-match"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="col-span-full py-32 text-center"
                                    >
                                        <div className="bg-white rounded-[3rem] p-16 inline-block border border-slate-100 shadow-xl shadow-slate-200/50">
                                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200">
                                                <Filter size={48} />
                                            </div>
                                            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">No adventures found</h3>
                                            <p className="text-slate-500 font-medium max-w-xs mx-auto mb-10"> We couldn&apos;t find any matches for your current filters. Try broadening your search. </p>
                                            <button 
                                                onClick={resetFilters}
                                                className="px-12 py-4 bg-red-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-600/20"
                                            >
                                                Reset All Filters
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    processedServices.map((service) => (
                                        <motion.div
                                            key={service.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                        >
                                            <ServiceCard
                                                id={service.id}
                                                title={service.name}
                                                location={service.location}
                                                price={Number(service.base_price)}
                                                image={service.image_url || "/hero-hotel.png"}
                                                duration={service.duration_days ? `${service.duration_days} Days` : service.duration_hours ? `${service.duration_hours} Hours` : ''}
                                                link={getServiceLink(service)}
                                                tag={tag || service.service_type.toUpperCase()}
                                                rating={service.rating}
                                                service_type={service.service_type}
                                                isSeasonal={service.is_seasonal_deal}
                                                dealNote={service.deal_note}
                                            />
                                        </motion.div>
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
