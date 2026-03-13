'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'

interface GeneralConfig {
    siteTitle?: string;
    contactEmail?: string;
    contactPhone?: string;
    officeAddress?: string;
    workingHours?: string;
    facebookUrl?: string;
    instagramUrl?: string;
}

export default function Footer() {
    const [email, setEmail] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [settings, setSettings] = useState<GeneralConfig | null>(null)
    const supabase = createClient()

    const fetchSettings = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('value')
                .eq('key', 'general_config')
                .single()

            if (error) throw error
            if (data?.value) {
                setSettings(data.value as GeneralConfig)
            }
        } catch (err) {
            console.error('Footer: Error fetching settings:', err)
        }
    }, [supabase])

    useEffect(() => {
        fetchSettings()
    }, [fetchSettings])

    async function handleSubscribe(e: React.FormEvent) {
        e.preventDefault()
        if (!email) return

        setSubmitting(true)
        try {
            const { error } = await supabase
                .from('subscribers')
                .insert([{ email }])

            if (error) {
                if (error.code === '23505') {
                    toast.error('You are already subscribed!')
                } else {
                    throw error
                }
            } else {
                toast.success('Thank you for subscribing!')
                setEmail('')
            }
        } catch (err) {
            console.error('Error subscribing:', err)
            toast.error('Failed to subscribe. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    const contactEmail = settings?.contactEmail || 'reservation@travellounge.mu'
    const contactPhone = settings?.contactPhone || '(+230) 212 4070'
    const workingHours = settings?.workingHours || 'Mon - Fri: 08:30 - 17:00'
    const facebookUrl = settings?.facebookUrl || 'https://www.facebook.com/cqf.xeh.mybluehost.me/website_6dd3f772/'
    const instagramUrl = settings?.instagramUrl || 'https://www.instagram.com/travellounge_ltd?igsh=MWljeWRiNG43aDN0OQ=='

    return (
        <footer className="bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-4">
                    {/* Company Info */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <h3 className="text-2xl font-black mb-4">
                            Travel<span className="text-red-600">Lounge</span>
                        </h3>
                        <p className="text-slate-300 mb-4 leading-relaxed text-sm">
                            Your local and international holiday provider. IATA accredited travel agents for safe and memorable holidays.
                        </p>
                        <div className="flex gap-3">
                            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="https://wa.me/23059407701" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                                <MessageCircle size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Visit Us */}
                    <div>
                        <h4 className="text-lg font-black mb-4">Visit Us</h4>
                        <div className="space-y-6 text-slate-300">
                            <div>
                                <p className="font-bold text-white mb-1 uppercase text-xs tracking-widest flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                                    Port Louis
                                </p>
                                <p className="text-xs leading-relaxed mb-2">
                                    Ground Floor Newton Tower, Corner Sir William Newton and Remy Ollier Street, Port Louis
                                </p>
                                <a 
                                    href="https://www.google.com/maps/dir/?api=1&destination=Newton+Tower+Port+Louis" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[10px] font-black text-red-500 hover:text-red-400 flex items-center gap-1 uppercase tracking-tighter"
                                >
                                    <MapPin size={10} />
                                    Get Directions
                                </a>
                            </div>
                            <div>
                                <p className="font-bold text-white mb-1 uppercase text-xs tracking-widest flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                                    Ebene
                                </p>
                                <p className="text-xs leading-relaxed mb-2">
                                    Ground Floor, 57 Ebene Mews, Rue Du Savoir, Ebene Cybercity
                                </p>
                                <a 
                                    href="https://www.google.com/maps/dir/?api=1&destination=Ebene+Mews+57" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[10px] font-black text-red-500 hover:text-red-400 flex items-center gap-1 uppercase tracking-tighter"
                                >
                                    <MapPin size={10} />
                                    Get Directions
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h4 className="text-lg font-black mb-4">Contact Us</h4>
                        <div className="space-y-3 text-slate-300">
                            <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-red-600 transition-colors">
                                <Phone size={16} className="text-red-600" />
                                <span>{contactPhone}</span>
                            </a>
                            <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 hover:text-red-600 transition-colors">
                                <Mail size={16} className="text-red-600" />
                                <span>{contactEmail}</span>
                            </a>
                            <div className="pt-3">
                                <p className="font-bold text-white mb-2 flex items-center gap-2">
                                    <Clock size={16} className="text-red-600" />
                                    Working Hours
                                </p>
                                <p className="text-sm whitespace-pre-line">{workingHours}</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links & Newsletter */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <div className="mb-8">
                            <h4 className="text-lg font-black mb-4">Quick Links</h4>
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-slate-300 text-sm">
                                <li>
                                    <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
                                </li>
                                <li>
                                    <Link href="/about" className="hover:text-red-600 transition-colors">About Us</Link>
                                </li>
                                <li>
                                    <Link href="/cruises" className="hover:text-red-600 transition-colors">Cruises</Link>
                                </li>
                                <li>
                                    <Link href="/tours" className="hover:text-red-600 transition-colors">Group Tours</Link>
                                </li>
                                <li>
                                    <Link href="/hotels" className="hover:text-red-600 transition-colors">Hotels</Link>
                                </li>
                                <li>
                                    <Link href="/activities" className="hover:text-red-600 transition-colors">Activities</Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="hover:text-red-600 transition-colors">Contact Us</Link>
                                </li>
                                <li>
                                    <Link href="/faq" className="hover:text-red-600 transition-colors">FAQ</Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-black mb-3 uppercase tracking-wider text-slate-400">Newsletter</h4>
                            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                                <input
                                    type="email"
                                    placeholder="enter email to subscribe here"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 text-white text-sm"
                                />
                                <button 
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-2.5 bg-red-600 text-black rounded-xl font-bold hover:bg-red-700 transition-colors text-sm flex items-center justify-center"
                                >
                                    {submitting ? <Loader2 size={16} className="animate-spin" /> : 'Subscribe'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-6 border-t border-slate-800 text-center text-slate-400 text-xs">
                    <p>
                        © {new Date().getFullYear()} Travel Lounge and Leisure. All rights reserved.
                        {' '}- Developed by <a href="https://www.ebox.mu" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-500 font-bold">EBOX</a>
                    </p>
                </div>
            </div>
        </footer>
    )
}
