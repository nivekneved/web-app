'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'
import { resolveImageUrl } from '@/lib/image'
import { useSettings } from '@/contexts/SettingsContext'

export default function Footer() {
    const { generalConfig: config } = useSettings()
    const labels = (config?.ui_labels || {}) as Record<string, string>
    const placeholders = (config?.form_placeholders || {}) as Record<string, string>
    const [email, setEmail] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const supabase = createClient()

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
                    toast.error(labels.already_subscribed || 'You are already subscribed!')
                } else {
                    throw error
                }
            } else {
                toast.success(labels.subscribe_success || 'Thank you for subscribing!')
                setEmail('')
            }
        } catch (err) {
            console.error('Error subscribing:', err)
            toast.error(labels.subscribe_error || 'Failed to subscribe. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    const contactEmail = config?.contactEmail || ''
    const contactPhone = config?.contactPhone || ''
    const whatsappNumber1 = config?.whatsappNumber1 || ''
    const workingHours = config?.workingHours || ''
    const facebookUrl = config?.facebookUrl || ''
    const instagramUrl = config?.instagramUrl || ''

    if (config?.showFooterWeb === false) return null;

    return (
        <footer className="bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10 lg:gap-y-4">
                    {/* Company Info */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <Link href="/" className="inline-block mb-6">
                                <Image 
                                    src={resolveImageUrl("/assets/logo-red-bird.png")} 
                                    alt="Travel Lounge" 
                                    width={300} 
                                    height={100} 
                                    className="h-24 w-auto object-contain"
                                />
                        </Link>
                        <p className="text-slate-400 mb-6 leading-relaxed text-sm font-medium">
                            {labels.footer_tagline || 'Your local and international holiday provider. IATA accredited travel agents for safe and memorable holidays.'}
                        </p>
                        <div className="flex gap-3">
                            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href={`https://wa.me/${whatsappNumber1.replace(/\s+/g, '').replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                                <MessageCircle size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Visit Us */}
                    <div>
                        <h4 className="text-[11px] font-black mb-6 uppercase tracking-[0.3em] text-white">{labels.visit_us || 'Visit Us'}</h4>
                        <div className="space-y-6 text-slate-400">
                            {config?.office1Address && (
                                <div>
                                    <p className="font-bold text-white mb-1 uppercase text-[10px] tracking-widest flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                                        {config?.office1Title || ''}
                                    </p>
                                    <p className="text-sm leading-relaxed mb-2">
                                        {config?.office1Address}
                                    </p>
                                    <a 
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(config?.office1Address || '')}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-xs font-black text-red-500 hover:text-red-400 flex items-center gap-1 uppercase tracking-[0.3em]"
                                    >
                                        <MapPin size={10} />
                                        {labels.directions_btn || 'Directions'}
                                    </a>
                                </div>
                            )}
                            {config?.office2Address && (
                                <div>
                                    <p className="font-bold text-white mb-1 uppercase text-[10px] tracking-widest flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                                        {config?.office2Title || ''}
                                    </p>
                                    <p className="text-sm leading-relaxed mb-2">
                                        {config?.office2Address}
                                    </p>
                                    <a 
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(config?.office2Address || '')}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-xs font-black text-red-500 hover:text-red-400 flex items-center gap-1 uppercase tracking-[0.3em]"
                                    >
                                        <MapPin size={10} />
                                        {labels.directions_btn || 'Directions'}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h4 className="text-[11px] font-black mb-6 uppercase tracking-[0.3em] text-white">{labels.contact_us || 'Contact Us'}</h4>
                        <div className="space-y-4 text-slate-400 font-medium text-sm">
                            <a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-red-600 transition-colors">
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
                                    {labels.working_hours || 'Working Hours'}
                                </p>
                                <p className="text-sm whitespace-pre-line">{workingHours}</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links & Newsletter */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <div className="mb-10">
                            <h4 className="text-[11px] font-black mb-6 uppercase tracking-[0.3em] text-white">{labels.quick_links || 'Quick Links'}</h4>
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-slate-400 text-sm font-medium">
                                <li>
                                    <Link href="/packages" className="hover:text-red-600 transition-colors">Holiday Packages</Link>
                                </li>
                                <li>
                                    <Link href="/faq" className="hover:text-red-600 transition-colors">FAQ</Link>
                                </li>
                                <li>
                                    <Link href="/safety" className="hover:text-red-600 transition-colors">Safety & Security</Link>
                                </li>
                                <li>
                                    <Link href="/wishlist" className="hover:text-red-600 transition-colors">My Wishlist</Link>
                                </li>
                                <li>
                                    <Link href="/privacy-policy" className="hover:text-red-600 transition-colors">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link href="/terms-conditions" className="hover:text-red-600 transition-colors">Terms & Conditions</Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-black mb-4 uppercase tracking-[0.3em] text-slate-500">{labels.newsletter || 'Newsletter'}</h4>
                            <form onSubmit={handleSubscribe} className="flex gap-1">
                                <input
                                    type="email"
                                    placeholder={placeholders.email_address || "Enter your email"}
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-grow px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/50 text-white text-xs font-bold transition-all"
                                />
                                <button 
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-3 bg-red-600 text-white rounded-xl font-black hover:bg-white hover:text-slate-900 transition-all text-[10px] flex items-center justify-center shrink-0 uppercase tracking-[0.2em] shadow-lg shadow-red-600/20"
                                >
                                    {submitting ? <Loader2 size={16} className="animate-spin" /> : (labels.go_btn || 'Go')}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-6 border-t border-slate-800 text-center text-slate-400 text-sm">
                    <p>
                        © {new Date().getFullYear()} {config?.siteTitle || 'Travel Lounge'}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>

    )
}
