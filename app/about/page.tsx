'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { Globe, Trophy, MapPin, Clock, ShieldCheck, Star, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase'

type ContentBlock = {
    section_key: string
    content: unknown
}

type AboutContent = {
    hero?: {
        badge: string
        title: string
        description: string
        image: string
    }
    identity?: {
        subtitle: string
        title: string
        description: string
        quote: string
        stats_label: string
        stats_value: string
    }
    vision?: {
        title: string
        description: string
    }
    mission?: {
        title: string
        description: string
    }
}

export default function AboutPage() {
    const [content, setContent] = useState<AboutContent | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = useMemo(() => createClient(), [])

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data, error } = await supabase
                    .from('content_blocks')
                    .select('*')
                    .eq('page_slug', 'about')

                if (error) throw error

                if (data && data.length > 0) {
                    const blocks: Record<string, unknown> = {}
                    data.forEach((block: ContentBlock) => {
                        blocks[block.section_key] = block.content
                    })
                    setContent(blocks as AboutContent)
                }
            } catch (err) {
                console.error('Error fetching about page content:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchContent()
    }, [supabase])

    // Fallback data
    const hero = content?.hero || {
        badge: "IATA Accredited Agency",
        title: "Your World, <br />Our <span class=\"text-red-600\">Expertise</span>",
        description: "Since 2014, Travel Lounge has been the premier destination for discerning travelers in Mauritius. We specialize in corporate travel and tailor-made leisure experiences worldwide.",
        image: "/hero-flight.png"
    }

    const identity = content?.identity || {
        subtitle: "About Travel Lounge",
        title: "A One-Stop <br /><span class=\"text-red-600\">Travel Solutions</span> Provider",
        description: "Located in the heart of Port Louis, Travel Lounge Ltd is an IATA accredited travel agency specializing in corporate business and personalized holiday leisure travel deals.",
        quote: "Our mission is to provide dedicated support and personal advice throughout your journey, always putting customer delight at the forefront.",
        stats_label: "Years of Excellence",
        stats_value: "10+"
    }

    const vision = content?.vision || {
        title: "Our Vision",
        description: "To be a one-stop travel solutions provider which aims to continuously grow across borders, in products and services, and always putting the customer's delight at first place."
    }

    const mission = content?.mission || {
        title: "Our Mission",
        description: "Our dedicated corporate team members focus on personal advice, support and communication throughout your trip abroad and also provide related solutions to individual customers."
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="animate-spin text-red-600" size={48} />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center overflow-hidden">
                <Image
                    src={hero.image}
                    alt="Travel Lounge Mauritius"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-block py-1 px-4 rounded-full bg-red-600 text-white text-sm font-bold mb-6 tracking-widest uppercase">
                            {hero.badge}
                        </span>
                        <h1 
                            className="text-6xl md:text-8xl font-black text-white mb-8 leading-none"
                            dangerouslySetInnerHTML={{ __html: hero.title }}
                        />
                        <p className="text-xl text-slate-200 leading-relaxed font-medium">
                            {hero.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Core Identity */}
            <section className="py-32 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-sm font-bold text-red-600 uppercase tracking-[0.4em] mb-6">{identity.subtitle}</h2>
                            <h3 
                                className="text-5xl font-black text-slate-900 mb-10 leading-tight"
                                dangerouslySetInnerHTML={{ __html: identity.title }}
                            />
                            <div className="space-y-8 text-slate-600 text-lg">
                                <p className="leading-relaxed">
                                    {identity.description}
                                </p>
                                <p className="leading-relaxed italic border-l-4 border-red-600 pl-6 py-2 bg-slate-50 rounded-r-2xl">
                                    &quot;{identity.quote}&quot;
                                </p>
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative">
                            <div className="grid grid-cols-2 gap-6 relative z-10">
                                <div className="space-y-6 pt-12">
                                    <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl">
                                        <div className="text-5xl font-black text-red-600 mb-2">{identity.stats_value}</div>
                                        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{identity.stats_label}</div>
                                    </div>
                                    <div className="h-64 relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                                        <Image src="/hero-adventure.png" alt="Travel" fill className="object-cover" />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="h-80 relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                                        <Image src="/hero-hotel.png" alt="Travel" fill className="object-cover" />
                                    </div>
                                    <div className="bg-red-600 p-8 rounded-[2.5rem] text-white shadow-2xl transform hover:scale-105 transition-transform">
                                        <div className="text-5xl font-black mb-2">IATA</div>
                                        <div className="text-sm font-bold text-red-100 uppercase tracking-widest">Globally Certified</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Cards */}
            <section className="py-32 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-xl group hover:bg-slate-900 transition-all duration-500">
                            <div className="w-16 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center mb-10 transform group-hover:rotate-12 transition-transform">
                                <Globe size={32} />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-6 group-hover:text-white transition-colors">{vision.title}</h3>
                            <p className="text-slate-500 text-lg leading-relaxed group-hover:text-slate-400 transition-colors">
                                {vision.description}
                            </p>
                        </div>
                        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-xl group hover:bg-red-600 transition-all duration-500">
                            <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-10 transform group-hover:-rotate-12 transition-transform">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-6 group-hover:text-white transition-colors">{mission.title}</h3>
                            <p className="text-slate-500 text-lg leading-relaxed group-hover:text-red-50 transition-colors">
                                {mission.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-sm font-bold text-red-600 uppercase tracking-[0.4em] mb-4">The Selection</h2>
                    <p className="text-5xl font-black text-slate-900 mb-20 leading-tight">Why Choose <span className="text-red-600">Travel Lounge</span>?</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {[
                            { icon: Star, title: "Tailor-made Specialists", desc: "Customize your trips including accommodation, transport, activities, or places of interest of your choice." },
                            { icon: Trophy, title: "Guaranteed Quality", desc: "A dedicated team to secure the best hotel rates in most popular destinations. Book with confidence." },
                            { icon: Clock, title: "24/7 Expert Support", desc: "Our agents are genuine travel specialists. Enjoy peace of mind while we assist you on your planning." }
                        ].map((v, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-red-600 mb-8 border border-slate-100 shadow-sm">
                                    <v.icon size={40} />
                                </div>
                                <h4 className="text-2xl font-black text-slate-900 mb-4">{v.title}</h4>
                                <p className="text-slate-500 leading-relaxed max-w-xs">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Locations */}
            <section className="py-32 bg-slate-900 text-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-20 items-end">
                        <div className="lg:w-1/2">
                            <h2 className="text-sm font-bold text-red-600 uppercase tracking-[0.4em] mb-6">Visit Us</h2>
                            <h3 className="text-4xl font-black mb-12">Our Physical Offices <br />in Mauritius</h3>
                            <div className="space-y-12">
                                <div className="flex gap-8 group">
                                    <div className="w-14 h-14 bg-slate-800 rounded-2xl flex-shrink-0 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
                                        <MapPin size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black mb-2">Port Louis Headquarters</h4>
                                        <p className="text-slate-400">Ground Floor Newton Tower, Corner Sir William Newton and Remy Ollier Street, Port Louis.</p>
                                    </div>
                                </div>
                                <div className="flex gap-8 group">
                                    <div className="w-14 h-14 bg-slate-800 rounded-2xl flex-shrink-0 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
                                        <MapPin size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black mb-2">Ebene Cybercity</h4>
                                        <p className="text-slate-400">Ground Floor, 57 Ebene Mews, Rue Du Savoir, Ebene Cybercity.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 bg-slate-800 p-12 rounded-[3.5rem] border border-slate-700">
                            <h4 className="text-2xl font-black mb-6">Opening Hours</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                                    <span className="text-slate-400">Monday — Friday</span>
                                    <span className="font-bold">08:30 – 16:45</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                                    <span className="text-slate-400">Saturday</span>
                                    <span className="font-bold">08:30 – 12:30</span>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-slate-400">Sunday & Holidays</span>
                                    <span className="text-red-500 font-bold uppercase tracking-widest text-sm">Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
