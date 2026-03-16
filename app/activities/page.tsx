'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Search, Filter } from 'lucide-react'
import ServiceCard from '@/components/ServiceCard'

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
            if (regionFilter === 'sea') {
                filtered = filtered.filter(a => a.amenities?.includes('Sea Adventure'))
            } else if (regionFilter === 'land') {
                filtered = filtered.filter(a => a.amenities?.includes('Land Adventure'))
            } else {
                filtered = filtered.filter(a => a.region === regionFilter)
            }
        }

        setFilteredActivities(filtered)
    }, [searchTerm, regionFilter, activities])

    async function loadActivities() {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('id, name, description, location, region, base_price, rating, image_url, amenities, duration_hours')
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
            <div className="bg-gradient-to-r from-red-600 to-slate-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">Activities & Experiences</h1>
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
                                <option value="all">All Regions & Categories</option>
                                <option value="sea">Sea Adventures</option>
                                <option value="land">Land Adventures</option>
                                <optgroup label="By Region">
                                    {regions.filter(r => r !== 'all').map(region => (
                                        <option key={region} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </optgroup>
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
                            <ServiceCard
                                key={activity.id}
                                id={activity.id}
                                title={activity.name}
                                location={activity.location}
                                price={activity.base_price}
                                image={activity.image_url || "/hero-adventure.png"}
                                duration={activity.duration_hours ? `${activity.duration_hours} Hours` : undefined}
                                link={`/activities/${activity.id}`}
                                tag="ACTIVITY"
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
