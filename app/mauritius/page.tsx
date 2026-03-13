import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Compass, Palmtree, Sun, Waves } from 'lucide-react'

export const metadata = {
    title: 'Mauritius - Discover Paradise | Travel Lounge',
    description: 'Explore the breathtaking beauty of Mauritius. From pristine beaches to lush interior landscapes, plan your perfect tropical escape with Travel Lounge.',
}

export default function MauritiusPage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/assets/hero/mauritius_destination_hero_1773391482617.png"
                    alt="Mauritius Paradise"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tight">Mauritius Paradise</h1>
                    <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto font-light">
                        Beyond the horizon lies an island of unmatched beauty and warmth.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 -mt-20 relative z-20">
                <div className="bg-white rounded-3xl p-10 md:p-16 shadow-xl border border-slate-100 mb-12">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 italic">Island of Inspiration</h2>
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                            From the best local hotels to exclusive spa deals and activities, we ensure you a hassle-free stay. 
                            Discover why Mauritius is more than just a destination—it&apos;s a vibrant tapestry of cultures, 
                            landscapes, and experiences waiting to be explored.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 text-center">
                        {[
                            { icon: Palmtree, label: 'Language', val: 'English, French, Creole' },
                            { icon: Sun, label: 'Currency', val: 'Mauritian Rupee (MUR)' },
                            { icon: Compass, label: 'Best Time', val: 'May to December' },
                            { icon: Waves, label: 'Climate', val: 'Tropical (25°C - 30°C)' },
                        ].map((item, i) => (
                            <div key={i} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-red-600 transition-colors group">
                                <item.icon className="mx-auto mb-4 text-red-600 group-hover:scale-110 transition-transform" size={32} />
                                <p className="text-slate-400 text-xs uppercase tracking-widest font-black mb-1">{item.label}</p>
                                <p className="font-bold text-slate-900">{item.val}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { coast: 'North Coast', desc: 'Famous for Grand Baie, white sandy beaches, and vibrant nightlife.', img: '/assets/hero/mauritius_destination_hero_1773391482617.png' },
                            { coast: 'East Coast', desc: 'Home to the most exclusive luxury resorts and pristine turquoise lagoons.', img: '/assets/hero/local_deals_hero_1773391387665.png' },
                            { coast: 'South Coast', desc: 'Rugged beauty, dramatic cliffs, and untouched natural landscapes.', img: '/assets/hero/day_packages_hero_1773391515388.png' },
                            { coast: 'West Coast', desc: 'Perfect sunsets, calm waters, and the iconic Le Morne mountain.', img: '/assets/hero/tailormade_travel_hero_1773391405705.png' },
                        ].map((item, i) => (
                            <div key={i} className="group overflow-hidden rounded-[2.5rem] relative h-[400px] shadow-lg">
                                <Image src={item.img} alt={item.coast} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-8 left-8 text-white right-8">
                                    <h3 className="text-3xl font-black mb-2">{item.coast}</h3>
                                    <p className="text-white/80 leading-relaxed mb-6 text-sm italic">{item.desc}</p>
                                    <Link href="/destinations" className="inline-flex items-center gap-2 font-bold px-6 py-2 bg-red-600 rounded-full hover:bg-red-500 transition-colors text-sm">
                                        Explore More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900 rounded-[3rem] p-12 text-center text-white">
                    <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to Book?</h2>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-light">
                        Our local experts are ready to craft your perfect Mauritian adventure.
                    </p>
                    <Link href="/contact" className="px-10 py-5 bg-red-600 text-white font-bold rounded-full hover:bg-red-500 transition-all inline-block shadow-xl shadow-red-600/20">
                        Get in Touch
                    </Link>
                </div>
            </div>
        </div>
    )
}
