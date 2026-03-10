'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'

const deals = [
    {
        id: 1,
        title: "Maldives Luxury Escape",
        price: "Rs 45,000",
        image: "/hero-hotel.png",
        duration: "5 Days",
        link: "/packages/maldives-escape"
    },
    {
        id: 2,
        title: "Dubai Shopping Festival",
        price: "Rs 32,000",
        image: "/hero-flight.png",
        duration: "7 Days",
        link: "/packages/dubai-shopping"
    },
    {
        id: 3,
        title: "European Dream Tour",
        price: "Rs 85,000",
        image: "/hero-adventure.png",
        duration: "10 Days",
        link: "/tours/europe"
    },
    {
        id: 4,
        title: "Rodrigues Weekend",
        price: "Rs 12,000",
        image: "/hero-cruise.png",
        duration: "3 Days",
        link: "/rodrigues/weekend"
    },
]

export default function DealsCarousel() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2">Exclusive Offers</h2>
                        <h3 className="text-4xl font-black text-slate-900">Seasonal Deals</h3>
                    </div>
                    <Link href="/packages" className="hidden md:flex items-center gap-2 text-slate-900 font-bold hover:text-red-600 transition-colors">
                        View All Offers <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {deals.map((deal, index) => (
                        <motion.div
                            key={deal.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={deal.image}
                                    alt={deal.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Limited Time
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-3">
                                    <Clock size={14} />
                                    {deal.duration}
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-red-600 transition-colors">
                                    {deal.title}
                                </h4>
                                <div className="flex items-end justify-between mt-6">
                                    <div>
                                        <span className="text-xs text-slate-400 font-bold block">From</span>
                                        <span className="text-xl font-black text-slate-900">{deal.price}</span>
                                    </div>
                                    <Link href={deal.link} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-red-600 group-hover:text-white transition-all">
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="/packages" className="inline-flex items-center gap-2 text-slate-900 font-bold hover:text-red-600 transition-colors">
                        View All Offers <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    )
}
