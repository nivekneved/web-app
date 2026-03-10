'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Search, MapPin, Star, Filter, Clock, Activity } from 'lucide-react'

const supabase = createClient()

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
}

export default function ActivitiesPage() {
    const [activities, setActivities] = useState<ActivityService[]>([])
    const [filteredActivities, setFilteredActivities] = useState<ActivityService[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [regionFilter, setRegionFilter] = useState('all')

    useEffect(() => {
        loadActivities()
    }, [])

    useEffect(() => {
        let filtered = activities

        if (searchTerm) {
            filtered = filtered.filter(a =>
                a.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                a.location?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (regionFilter !== 'all') {
            filtered = filtered.filter(a => a.region === regionFilter)
        }

        setFilteredActivities(filtered)
    }, [searchTerm, regionFilter, activities])

    async function loadActivities() {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('service_type', 'activity')
                .order('name', { ascending: true })

            if (error) throw error
            setActivities(data || [])
            setFilteredActivities(data || [])
        } catch (error) {
            console.error('Error loading activities:', error)
        } finally {
            setLoading(false)
        }
    }

    const regions = ['all', ...Array.from(new Set(activities.map(a => a.region).filter(Boolean)))]

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-slate-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl font-black mb-4">Activities & Experiences</h1>
                    <p className="text-xl text-white/80 font-medium">
                        Unique adventures and unforgettable moments
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="bg-white rounded-[2rem] shadow-xl p-6 border border-slate-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search activities by name or location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 focus:border-red-600 transition-all font-medium"
                            />
                        </div>

                        <div className="relative">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <select
                                value={regionFilter}
                                onChange={(e) => setRegionFilter(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 focus:border-red-600 transition-all font-medium appearance-none"
                            >
                                {regions.map(region => (
                                    <option key={region} value={region}>
                                        {region === 'all' ? 'All Regions' : region}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activities Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {filteredActivities.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-lg italic">No activities found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredActivities.map((activity) => (
                            <div
                                key={activity.id}
                                className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:border-purple-600 hover:shadow-2xl transition-all"
                            >
                                {activity.image_url ? (
                                    <div
                                        className="h-64 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                        style={{ backgroundImage: `url(${activity.image_url})` }}
                                    />
                                ) : (
                                    <div className="h-64 bg-gradient-to-br from-purple-600 to-slate-900 flex items-center justify-center">
                                        <Activity size={64} className="text-white/30" />
                                    </div>
                                )}

                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                                                {activity.name}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                                                <MapPin size={14} />
                                                {activity.location}
                                            </div>
                                            {activity.duration_hours && (
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <Clock size={14} />
                                                    {activity.duration_hours} hours
                                                </div>
                                            )}
                                        </div>
                                        {activity.rating && (
                                            <div className="flex items-center gap-1 px-3 py-1 bg-amber-50 rounded-lg">
                                                <Star size={14} className="text-amber-600 fill-amber-600" />
                                                <span className="text-sm font-bold text-amber-700">{activity.rating}</span>
                                            </div>
                                        )}
                                    </div>

                                    {activity.description && (
                                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{activity.description}</p>
                                    )}

                                    {activity.amenities && activity.amenities.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {activity.amenities.slice(0, 3).map((amenity, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg font-medium"
                                                >
                                                    {amenity}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-sm text-slate-500">From</span>
                                            <span className="text-2xl font-black text-slate-900">Rs {activity.base_price?.toLocaleString()}</span>
                                            <span className="text-sm text-slate-500">/person</span>
                                        </div>
                                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-slate-900 transition-all text-sm">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
