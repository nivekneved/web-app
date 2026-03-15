'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Clock, ArrowRight } from 'lucide-react'
import StarRating from './ui/StarRating'

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
}

export default function ServiceCard({ title, location, price, image, duration, link, tag, rating }: ServiceCardProps) {
    return (
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
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {tag}
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

                <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-4">
                    <div>
                        <span className="text-xs text-slate-400 font-bold block">Starting from</span>
                        <span className="text-xl font-black text-slate-900">Rs {price.toLocaleString()}</span>
                    </div>
                    <Link 
                        href={link} 
                        className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-red-600 group-hover:text-white transition-all"
                    >
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}
