'use client';

import React from 'react'
import Image from 'next/image'
import { MapPin, Clock, Calendar, CheckCircle } from 'lucide-react'
import BookingForm from '@/components/BookingForm'
import { resolveImageUrl } from '@/lib/image'

interface PackageDetailProps {
    title: string
    subtitle: string
    description: string
    price: string
    images: string[]
    highlights: string[]
    itinerary: { day: string; title: string; desc: string }[]
    meta: { duration: string; location: string; date: string }
}

export default function PackageDetail({ title, subtitle, description, images, highlights, itinerary, meta }: PackageDetailProps) {
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero Image */}
            <div className="relative h-[250px] md:h-[350px] overflow-hidden">
                <Image
                    src={resolveImageUrl(images[0])}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
                    <span className="inline-block px-4 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                        Premium Package
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-2">{title}</h1>
                    <p className="text-xl text-slate-200">{subtitle}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-6 p-6 bg-white rounded-2xl shadow-xs border border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-red-600">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-slate-400 uppercase">Duration</span>
                                    <span className="font-bold text-slate-900">{meta.duration}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-red-600">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-slate-400 uppercase">Location</span>
                                    <span className="font-bold text-slate-900">{meta.location}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-red-600">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-slate-400 uppercase">Travel Dates</span>
                                    <span className="font-bold text-slate-900">{meta.date}</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 mb-6">Overview</h2>
                            <p className="text-slate-600 leading-relaxed text-lg mb-6">{description}</p>

                            <h3 className="text-lg font-bold text-slate-900 mb-4">Highlights</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {highlights.map((h, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <CheckCircle size={18} className="text-red-600 shrink-0" />
                                        <span className="text-slate-700">{h}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Gallery */}
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 mb-6">Gallery</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {images.slice(1).map((img, i) => (
                                    <div key={i} className="relative h-48 md:h-64 rounded-xl overflow-hidden">
                                        <Image src={resolveImageUrl(img)} alt={`Gallery ${i}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Itinerary */}
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 mb-6">Itinerary</h2>
                            <div className="space-y-6">
                                {itinerary.map((item, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                                                {item.day}
                                            </div>
                                            {i !== itinerary.length - 1 && <div className="w-0.5 flex-1 bg-slate-200 my-2" />}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                                            <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <BookingForm packageTitle={title} />

                        <div className="mt-8 bg-slate-900 text-white p-8 rounded-2xl text-center">
                            <h4 className="font-bold text-xl mb-4">Need Help?</h4>
                            <p className="text-slate-400 mb-6">Speak to our expert travel consultants.</p>
                            <a href="tel:+2302124070" className="block w-full py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-red-600 hover:text-white transition-colors">
                                Call (+230) 212 4070
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
