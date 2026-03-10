'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const categories = [
    { id: 1, name: 'Cruises', image: '/hero-cruise.png', link: '/cruises' },
    { id: 2, name: 'Flights', image: '/hero-flight.png', link: '/flights' },
    { id: 3, name: 'Group Tours', image: '/hero-adventure.png', link: '/tours' },
    { id: 4, name: 'Rodrigues', image: '/hero-hotel.png', link: '/rodrigues' },
    { id: 5, name: 'Hotels', image: '/hero-hotel.png', link: '/hotels' },
    { id: 6, name: 'Day Packages', image: '/hero-adventure.png', link: '/packages' },
]

export default function CategoryGrid() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={cat.link} className="group block relative h-64 lg:h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center text-center">
                                    <h3 className="text-white text-xl font-bold uppercase tracking-wider group-hover:text-red-400 transition-colors">
                                        {cat.name}
                                    </h3>
                                    <div className="w-12 h-1 bg-red-600 mt-3 transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
