'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Mail, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { GridSkeleton } from '@/components/LoadingSkeleton'

interface TeamMember {
    id: string
    name: string
    role: string
    bio: string
    photo_url: string | null
    email: string
}

const roleLabels: Record<string, string> = {
    'director': 'Managing Director',
    'sales_corporate': 'Senior Sales Executive Corporate',
    'sales_corporate_sr': 'Senior Sales Executive Corporate',
    'sales_leisure': 'Senior Sales Executive Leisure',
    'consultant': 'Travel Consultant',
    'accountant': 'Account Clerk'
}

export default function TeamPage() {
    const [team, setTeam] = useState<TeamMember[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function fetchTeam() {
            try {
                const { data, error } = await supabase
                    .from('admins')
                    .select('id, name, role, bio, photo_url, email')
                    .eq('is_active', true)
                    .eq('show_on_front_page', true)
                    .order('display_order', { ascending: true })

                if (error) throw error
                setTeam(data || [])
            } catch (err) {
                console.error('Error fetching team:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchTeam()
    }, [supabase])

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <section className="bg-slate-50 py-24 border-b border-slate-100">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-sm font-bold text-red-600 uppercase tracking-[0.4em] mb-4">Our People</h1>
                        <p className="text-5xl md:text-6xl font-black text-slate-900 mb-8">Meet the <span className="text-red-600">Experts</span></p>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            A dedicated team of IATA-certified professionals committed to making your world-wide travel dreams a reality.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Team Grid */}
            <section className="py-32">
                <div className="container mx-auto px-6">
                    {loading ? (
                        <GridSkeleton count={3} />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {team.map((member, i) => (
                                <motion.div
                                    key={member.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group"
                                >
                                    <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200">
                                        <Image
                                            src={member.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=800&background=F3F4F6&color=9CA3AF`}
                                            alt={member.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        
                                        {/* Persistent Gradient for legibility */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                                        {/* Hover Overlay for Bio */}
                                        <div className="absolute inset-0 bg-red-600/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-10 flex flex-col justify-center text-white">
                                            <p className="text-lg font-medium leading-relaxed mb-8">
                                                {member.bio || "Dedicated travel professional at Travel Lounge."}
                                            </p>
                                            <div className="flex flex-col gap-4">
                                                <a href={`mailto:${member.email}`} className="flex items-center gap-3 bg-white/20 hover:bg-white/30 transition-all p-4 rounded-2xl border border-white/20">
                                                    <Mail size={20} />
                                                    <span className="font-bold text-sm">Send Email</span>
                                                </a>
                                                <Link
                                                    href={`/contact?subject=Meeting with ${member.name}`}
                                                    className="flex items-center gap-3 bg-white text-red-600 font-bold p-4 rounded-2xl hover:bg-slate-900 hover:text-white transition-all"
                                                >
                                                    <ArrowRight size={20} />
                                                    <span className="text-sm">Book Consultation</span>
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Persistent Text Overlay (Name/Role) */}
                                        <div className="absolute bottom-10 left-10 right-10 group-hover:opacity-0 transition-opacity duration-300">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="w-8 h-1 bg-red-600 rounded-full" />
                                                <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
                                                    {roleLabels[member.role] || member.role}
                                                </span>
                                            </div>
                                            <h3 className="text-4xl font-black text-white leading-tight tracking-tighter">
                                                {member.name.split(' ')[0]} <br />
                                                <span className="text-red-500">{member.name.split(' ').slice(1).join(' ')}</span>
                                            </h3>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-24 bg-red-600">
                <div className="container mx-auto px-6 text-center text-white">
                    <h2 className="text-4xl font-black mb-6">Want to Join Our Team?</h2>
                    <p className="text-xl text-red-50 mb-10 opacity-80">We&apos;re always looking for passionate travel enthusiasts.</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center px-10 py-4 bg-white text-red-600 font-bold rounded-2xl hover:bg-slate-900 hover:text-white transition-all transform hover:scale-105"
                    >
                        Send Your CV
                    </Link>
                </div>
            </section>
        </div>
    )
}
