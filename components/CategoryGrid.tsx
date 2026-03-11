'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase'

type Category = {
    id: string
    name: string
    image_url: string
    link: string
}

export default function CategoryGrid() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function fetchCategories() {
            try {
                const { data, error } = await supabase
                    .from('categories')
                    .select('id, name, image_url, link')
                    .eq('is_active', true)
                    .eq('show_on_home', true)
                    .order('display_order', { ascending: true })

                if (error) throw error
                setCategories(data || [])
            } catch (err) {
                console.error('Error fetching categories:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [supabase])

    if (loading) {
        return (
            <div className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-64 lg:h-80 bg-slate-100 animate-pulse rounded-2xl" />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (categories.length === 0) return null

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
                            <Link href={cat.link || '#'} className="group block relative h-64 lg:h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                                <Image
                                    src={cat.image_url || '/hero-placeholder.png'}
                                    alt={cat.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    unoptimized
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
