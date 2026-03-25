'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { resolveImageUrl } from '@/lib/image'
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
            {/* Hero Section */}
            <div className="relative h-[250px] md:h-[350px] flex items-center overflow-hidden bg-slate-900 border-b border-white/10">
                <Image
                    src="/hero-about.png"
                    alt="Our Team"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-block py-2 px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-6">
                            Our People
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight uppercase">
                            Meet the <br />
                            <span className="text-red-500 italic">Experts.</span>
                        </h1>
                        <p className="text-lg text-white/70 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                            A dedicated team of IATA-certified professionals committed to making your world-wide travel dreams a reality.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Team Grid */}
            <section className="py-24 bg-slate-50/50">
                <div className="container mx-auto px-6">
                    {loading ? (
                        <GridSkeleton count={3} />
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            {/* Left Column: The Boss */}
                            <div className="lg:col-span-4 space-y-8">
                                <div className="sticky top-32">
                                    <div className="mb-8 pl-4">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="w-12 h-1 bg-red-600 rounded-full" />
                                            <span className="text-xs font-black text-red-600 uppercase tracking-[0.4em]">Leadership</span>
                                        </div>
                                        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Our <span className="text-red-600 italic">Visionary</span></h2>
                                    </div>
                                    
                                    {team.filter(m => m.role === 'director').map((boss) => (
                                        <motion.div
                                            key={boss.id}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="group px-4"
                                        >
                                            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-red-100 ring-1 ring-gray-100">
                                                <Image
                                                    src={resolveImageUrl(boss.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(boss.name)}&size=800&background=F3F4F6&color=9CA3AF`)}
                                                    alt={boss.name}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-red-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-10 flex flex-col justify-center text-center text-white">
                                                    <h3 className="text-3xl font-black mb-4">
                                                        {boss.name}
                                                    </h3>
                                                    <p className="text-sm font-bold leading-relaxed mb-8">
                                                        {boss.bio || "Leading our agency with vision and excellence."}
                                                    </p>
                                                    <div className="flex justify-center gap-4">
                                                        <a href={`mailto:${boss.email}`} className="bg-white text-red-600 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-950 hover:text-white transition-all">
                                                            Contact Leena
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="absolute bottom-10 left-10 right-10 group-hover:opacity-0 transition-opacity duration-300">
                                                    <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] mb-2 block group-hover:text-white">Managing Director</span>
                                                    <h3 className="text-3xl font-black text-white leading-tight tracking-tighter">
                                                        {boss.name.split(' ')[0]} <span className="text-red-500 group-hover:text-white transition-colors">{boss.name.split(' ').slice(1).join(' ')}</span>
                                                    </h3>
                                                    <p className="text-white text-[10px] mt-4 leading-relaxed font-medium line-clamp-3">
                                                        {boss.bio || "Leading the agency with vision and excellence."}
                                                    </p>
                                                    <div className="flex gap-4 mt-8">
                                                        <div className="p-3 bg-white/10 text-white rounded-xl backdrop-blur-sm border border-white/10">
                                                            <Mail size={16} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column: The Team Experts */}
                            <div className="lg:col-span-8">
                                <div className="mb-12">
                                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Operational Excellence</h3>
                                    <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight italic text-red-600">The Travel Specialists</h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {team.filter(m => m.role !== 'director').map((member, i) => (
                                        <motion.div
                                            key={member.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="group"
                                        >
                                            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200 border border-gray-100">
                                                <Image
                                                    src={resolveImageUrl(member.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=800&background=F3F4F6&color=9CA3AF`)}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                                                
                                                {/* Smaller Text Overlay for Staff */}
                                                <div className="absolute bottom-6 left-6 right-6 group-hover:opacity-0 transition-opacity duration-300">
                                                    <span className="text-[8px] font-black text-red-500 group-hover:text-white transition-colors uppercase tracking-widest mb-1 block">
                                                        {roleLabels[member.role] || member.role}
                                                    </span>
                                                    <h3 className="text-xl font-black text-white leading-tight">
                                                        {member.name.split(' ')[0]} <span className="text-red-500 group-hover:text-white transition-colors">{member.name.split(' ').slice(1).join(' ')}</span>
                                                    </h3>
                                                </div>

                                                {/* Compact Hover State */}
                                                <div className="absolute inset-0 bg-red-600/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-center text-center text-white">
                                                    <p className="text-xs font-bold leading-relaxed mb-6 text-white line-clamp-4">
                                                        {member.bio || "Dedicated travel professional at Travel Lounge."}
                                                    </p>
                                                    <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-2 bg-white text-red-600 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-950 hover:text-white transition-all">
                                                        <Mail size={14} /> Contact
                                                    </a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
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
