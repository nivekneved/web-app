'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Plane, Calendar, Users, Search } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import ServiceCard from '@/components/ServiceCard'

const supabase = createClient()

type FlightService = {
    id: string
    name: string
    location: string
    base_price: number
    image_url: string
    rating: number
    service_type: string
}

export default function FlightsPage() {
    const [flights, setFlights] = useState<FlightService[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadFlights()
    }, [])

    async function loadFlights() {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('id, name, location, base_price, image_url, rating, service_type')
                .eq('service_type', 'flight')
                .order('name', { ascending: true })

            if (error) throw error
            setFlights(data || [])
        } catch (error) {
            console.error('Error loading flights:', error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero with Search */}
            <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/hero-flight.png"
                    alt="Flights"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 w-full max-w-5xl px-4">
                    <div className="text-center text-white mb-12">
                        <h1 className="text-5xl md:text-6xl font-black mb-4">Book Your Flight</h1>
                        <p className="text-xl md:text-2xl text-slate-200">
                            Search hundreds of airlines and find the perfect connection.
                        </p>
                    </div>

                    {/* Flight Search Widget Container */}
                    <div className="bg-white p-6 rounded-3xl shadow-2xl">
                        <div className="flex gap-4 mb-6">
                            <button className="text-sm font-bold uppercase tracking-widest text-red-600 border-b-2 border-red-600 pb-1">Round Trip</button>
                            <button className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 pb-1 transition-colors">One Way</button>
                            <button className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 pb-1 transition-colors">Multi-City</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-red-200 transition-colors cursor-pointer group">
                                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">From</span>
                                <div className="flex items-center gap-2">
                                    <Plane size={20} className="text-slate-900 group-hover:text-red-600 transition-colors" />
                                    <span className="font-bold text-lg text-slate-900">Mauritius (MRU)</span>
                                </div>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-red-200 transition-colors cursor-pointer group">
                                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">To</span>
                                <div className="flex items-center gap-2">
                                    <Plane size={20} className="text-slate-900 group-hover:text-red-600 transition-colors rotate-90" />
                                    <span className="font-bold text-lg text-slate-400">Select Destination</span>
                                </div>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-red-200 transition-colors cursor-pointer group">
                                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Dates</span>
                                <div className="flex items-center gap-2">
                                    <Calendar size={20} className="text-slate-900 group-hover:text-red-600 transition-colors" />
                                    <span className="font-bold text-lg text-slate-900">Depart - Return</span>
                                </div>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-red-200 transition-colors cursor-pointer group">
                                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Travelers</span>
                                <div className="flex items-center gap-2">
                                    <Users size={20} className="text-slate-900 group-hover:text-red-600 transition-colors" />
                                    <span className="font-bold text-lg text-slate-900">1 Adult</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button className="px-8 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-slate-900 transition-colors flex items-center gap-2 shadow-lg shadow-red-600/20">
                                <Search size={20} />
                                Search Flights
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Flight Services */}
            <div className="container mx-auto px-4 py-20">
                <h2 className="text-3xl font-black text-slate-900 mb-8">Available Flight Connections</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        [...Array(3)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-3xl h-96 border border-slate-100" />
                        ))
                    ) : (
                        flights.map((flight) => (
                            <ServiceCard
                                key={flight.id}
                                id={flight.id}
                                title={flight.name}
                                location={flight.location}
                                price={flight.base_price}
                                image={flight.image_url || "/hero-flight.png"}
                                duration="Return Trip"
                                link={`/flights/${flight.id}`}
                                tag="FLIGHT"
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
