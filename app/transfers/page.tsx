'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Car, MapPin, Clock, Shield, CheckCircle2, Star, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import ServiceCard from '@/components/ServiceCard'

const supabase = createClient()

type TransferService = {
    id: string
    name: string
    location: string
    base_price: number
    image_url: string
    rating: number
    service_type: string
}

export default function TransfersPage() {
    const [transfers, setTransfers] = useState<TransferService[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadTransfers() {
            try {
                const { data, error } = await supabase
                    .from('services')
                    .select('id, name, location, base_price, image_url, rating, service_type')
                    .eq('service_type', 'transfer')
                    .order('name', { ascending: true })

                if (error) throw error
                setTransfers(data || [])
            } catch (error) {
                console.error('Error loading transfers:', error)
            } finally {
                setLoading(false)
            }
        }
        loadTransfers()
    }, [])

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center overflow-hidden">
                <Image
                    src="/hero-adventure.png"
                    alt="Reliable Transfers"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-r from-slate-950/80 via-slate-900/40 to-transparent" />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-block px-4 py-1 bg-red-600 text-white text-sm font-bold tracking-widest uppercase mb-6 rounded-full">
                            VIP TRANSFERS
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                            Seamless Comfort <br />Door-to-Door
                        </h1>
                        <p className="text-xl text-slate-200 mb-8 leading-relaxed max-w-2xl">
                            From airport arrivals to hotel departures, enjoy stress-free transportation with our modern fleet and professional chauffeurs.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Quick Booking Bar */}
            <section className="relative -mt-20 z-20 px-6">
                <div className="container mx-auto">
                    <div className="bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl">
                                <MapPin className="text-red-600" size={20} />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Pickup</span>
                                    <input type="text" placeholder="Location" className="bg-transparent font-bold text-slate-900 text-sm focus:outline-hidden" />
                                </div>
                            </div>
                            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl">
                                <MapPin className="text-red-600" size={20} />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Dropoff</span>
                                    <input type="text" placeholder="Destination" className="bg-transparent font-bold text-slate-900 text-sm focus:outline-hidden" />
                                </div>
                            </div>
                            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl">
                                <Calendar className="text-red-600" size={20} />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Date</span>
                                    <span className="font-bold text-slate-900 text-sm">Select Date</span>
                                </div>
                            </div>
                            <button className="bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition-all">
                                Check Availability
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fleet Showcase */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-red-600 uppercase tracking-[0.3em] mb-4">Our Fleet</h2>
                        <p className="text-4xl font-black text-slate-900">Choose Your Ride</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {loading ? (
                            [...Array(3)].map((_, i) => (
                                <div key={i} className="animate-pulse bg-slate-50 rounded-[2.5rem] h-96 border border-slate-100" />
                            ))
                        ) : (
                            transfers.map((transfer) => (
                                <ServiceCard
                                    key={transfer.id}
                                    id={transfer.id}
                                    title={transfer.name}
                                    location={transfer.location}
                                    price={transfer.base_price}
                                    image={transfer.image_url || "/hero-adventure.png"}
                                    link={`/transfers/${transfer.id}`}
                                    tag="TRANSFER"
                                />
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { icon: Shield, title: "Fixed Pricing", desc: "No hidden costs or surge pricing. What you see is what you pay." },
                            { icon: Clock, title: "Flight Tracking", desc: "Our chauffeurs track your flight and wait even if you're delayed." },
                            { icon: CheckCircle2, title: "Professional", desc: "Uniformed, multilingual drivers with local expertise." },
                            { icon: Star, title: "Modern Comfort", desc: "Modern, air-conditioned vehicles with complimentary water/WiFi." }
                        ].map((f, i) => (
                            <div key={i} className="space-y-4">
                                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                                    <f.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold">{f.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute top-0 right-0 p-24 opacity-5 rotate-12">
                    <Car size={400} />
                </div>
            </section>

            {/* Help Section */}
            <section className="py-32 container mx-auto px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl font-black text-slate-900 mb-6">Need a Large Group Transfer?</h2>
                    <p className="text-lg text-slate-500 mb-12">
                        For groups larger than 15 or special event requirements, our team can provide custom transport solutions.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/contact" className="px-10 py-5 bg-red-600 text-white rounded-2xl font-bold hover:bg-slate-900 transition-all transform hover:scale-105 shadow-xl">
                            Get a Quote
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
