'use client'

import Image from 'next/image'
import { Globe, Users, Trophy, Heart, CheckCircle2, ArrowRight, Instagram, Facebook, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[500px] flex items-center overflow-hidden">
                <Image
                    src="/hero-hotel.png"
                    alt="About Travel Lounge"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-slate-950/60" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
                            Our Journey, <br />Your <span className="text-red-600">Adventure</span>
                        </h1>
                        <p className="text-xl text-slate-200 max-w-2xl mx-auto">
                            Crafting unforgettable travel experiences with passion, expertise, and a commitment to excellence since 2008.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <span className="text-sm font-bold text-red-600 uppercase tracking-widest mb-4 inline-block">Since 2008</span>
                            <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">We Are More Than Just A <span className="text-red-600">Travel Agency</span></h2>
                            <div className="space-y-6 text-slate-500 text-lg leading-relaxed">
                                <p>
                                    Travel Lounge was born from a simple idea: that everyone deserves to experience the world's most beautiful destinations without the stress of planning. Based in the heart of Mauritius, we've grown from a small local team to a premier IATA accredited agency with a global reach.
                                </p>
                                <p>
                                    Our expertise spans across luxury cruises, international flights, and tailor-made holidays. We don't just book trips; we curate moments that last a lifetime. Whether it's a honeymoon in the Maldives, a safari in Kenya, or a corporate retreat in Singapore, we handle every detail with precision.
                                </p>
                            </div>
                        </div>
                        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="h-64 relative rounded-3xl overflow-hidden shadow-xl">
                                    <Image src="/hero-flight.png" alt="Travel" fill className="object-cover" />
                                </div>
                                <div className="h-48 bg-red-600 rounded-3xl p-8 text-white flex flex-col justify-end">
                                    <div className="text-4xl font-black mb-1">15+</div>
                                    <div className="text-sm font-bold uppercase tracking-wider">Years Experience</div>
                                </div>
                            </div>
                            <div className="pt-12 space-y-4">
                                <div className="h-48 bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-end">
                                    <div className="text-4xl font-black mb-1">50k+</div>
                                    <div className="text-sm font-bold uppercase tracking-wider">Happy Travelers</div>
                                </div>
                                <div className="h-64 relative rounded-3xl overflow-hidden shadow-xl">
                                    <Image src="/hero-cruise.png" alt="Travel" fill className="object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-sm font-bold text-red-600 uppercase tracking-[0.3em] mb-4">Our Values</h2>
                    <p className="text-4xl font-black text-slate-900 mb-16">The Principles That Guide Us</p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: Globe, title: "Global Vision", desc: "Connecting cultures and people through seamless travel." },
                            { icon: Heart, title: "Passion First", desc: "We love what we do, and it shows in every itinerary we craft." },
                            { icon: Trophy, title: "Excellence", desc: "Setting the gold standard in premium travel services." },
                            { icon: Users, title: "Commited Team", desc: "Expert agents dedicated to your journey, 24/7." }
                        ].map((v, i) => (
                            <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all border border-slate-100">
                                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                                    <v.icon size={32} />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-4">{v.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section Placeholder */}
            <section className="py-24 container mx-auto px-6 text-center">
                <h2 className="text-4xl font-black text-slate-900 mb-6">World-Class Expertise</h2>
                <p className="text-lg text-slate-500 mb-16 max-w-2xl mx-auto">
                    Our team of IATA-certified travel specialists bring decades of combined experience to ensure your trip is perfect.
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="group">
                            <div className="aspect-[4/5] bg-slate-100 rounded-[2.5rem] mb-6 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-slate-300 font-black text-6xl">TL</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-black text-slate-900">Travel Lounge Expert</h3>
                            <p className="text-red-600 font-bold text-sm uppercase tracking-widest mt-1">Travel Consultant</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Social CTA */}
            <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between relative z-10 gap-12">
                    <div className="text-center lg:text-left">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Stay Connected</h2>
                        <p className="text-xl text-slate-400">Join our community of travelers and get the latest deals first.</p>
                    </div>
                    <div className="flex gap-4">
                        <a href="#" className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center hover:bg-red-600 transition-all transform hover:scale-110">
                            <Facebook size={24} />
                        </a>
                        <a href="#" className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center hover:bg-red-600 transition-all transform hover:scale-110">
                            <Instagram size={24} />
                        </a>
                        <a href="#" className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center hover:bg-red-600 transition-all transform hover:scale-110">
                            <Linkedin size={24} />
                        </a>
                    </div>
                </div>
                <div className="absolute bottom-0 right-0 p-12 opacity-5">
                    <Users size={300} />
                </div>
            </section>
        </div>
    )
}
