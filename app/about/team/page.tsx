'use client'

import Image from 'next/image'
import { Instagram, Facebook, Linkedin, Mail, Phone, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const team = [
    {
        name: "Leena Jhugroo",
        role: "Managing Director",
        image: "/team/leena.png",
        bio: "With over 15 years in the travel industry, Leena leads Travel Lounge with a vision for excellence and customer-centricity.",
        color: "bg-red-600"
    },
    {
        name: "Nalini Indurjeet",
        role: "Senior Sales Executive Corporate",
        image: "/team/nalini.png",
        bio: "Corporate travel specialist dedicated to providing seamless business itineraries and high-level support.",
        color: "bg-slate-900"
    },
    {
        name: "Nabila Ramjaun",
        role: "Senior Sales Executive Corporate",
        image: "/team/nabila.png",
        bio: "Exquisite attention to detail in corporate accounts, ensuring efficiency and reliability for our business partners.",
        color: "bg-slate-800"
    },
    {
        name: "Kirtee Boodoo",
        role: "Senior Sales Executive Leisure",
        image: "/team/kirtee.png",
        bio: "Passionate about crafting personalized holiday experiences that go beyond expectations.",
        color: "bg-red-600"
    },
    {
        name: "Maleekah Amboorallee",
        role: "Travel Consultant",
        image: "/team/maleekah.png",
        bio: "Expert in local and international destinations, helping travelers find their perfect getaway.",
        color: "bg-slate-900"
    },
    {
        name: "Manshi Rughoobur",
        role: "Account Clerk",
        image: "/team/manshi.png",
        bio: "The backbone of our financial operations, ensuring precision and transparency in every transaction.",
        color: "bg-slate-800"
    },
    {
        name: "Mandini Boolauk",
        role: "Travel Consultant",
        image: "/team/mandini.png",
        bio: "Dedicated to assisting clients with the best travel deals and comprehensive itinerary planning.",
        color: "bg-red-600"
    }
]

export default function TeamPage() {
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {team.map((member, i) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group"
                            >
                                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-8 shadow-2xl shadow-slate-200">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Social Overlay */}
                                    <div className="absolute bottom-6 left-6 right-6 flex gap-3 translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex gap-2 bg-white/10 backdrop-blur-md p-2 rounded-2xl w-full justify-around border border-white/20">
                                            <button className="text-white hover:text-red-600 transition-colors p-2"><Facebook size={20} /></button>
                                            <button className="text-white hover:text-red-600 transition-colors p-2"><Instagram size={20} /></button>
                                            <button className="text-white hover:text-red-600 transition-colors p-2"><Linkedin size={20} /></button>
                                            <button className="text-white hover:text-red-600 transition-colors p-2"><Mail size={20} /></button>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`w-12 h-1 ${member.color} rounded-full`} />
                                        <span className="text-sm font-bold text-red-600 uppercase tracking-widest">{member.role}</span>
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 mb-4">{member.name}</h3>
                                    <p className="text-slate-500 leading-relaxed mb-6">
                                        {member.bio}
                                    </p>
                                    <Link
                                        href={`/contact?subject=Meeting with ${member.name}`}
                                        className="inline-flex items-center gap-2 text-slate-900 font-bold hover:text-red-600 transition-colors group/link"
                                    >
                                        Book a consultation
                                        <ArrowRight size={18} className="transform group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
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
