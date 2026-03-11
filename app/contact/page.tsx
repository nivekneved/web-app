'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase'

interface GeneralConfig {
    siteTitle?: string;
    contactEmail?: string;
    contactPhone?: string;
    whatsappNumber1?: string;
    whatsappNumber2?: string;
    office1Title?: string;
    office1Address?: string;
    office2Title?: string;
    office2Address?: string;
    workingHours?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    linkedinUrl?: string;
}

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })
    const [submitting, setSubmitting] = useState(false)
    const [settings, setSettings] = useState<GeneralConfig | null>(null)
    const [loading, setLoading] = useState(true)
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
            console.error('Contact: Error fetching settings:', err)
        } finally {
            setLoading(false)
        }
    }, [supabase])

    useEffect(() => {
        fetchSettings()
    }, [fetchSettings])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSubmitting(true)

        try {
            const { error } = await supabase
                .from('inquiries')
                .insert([formData])

            if (error) throw error

            toast.success('Message sent! We\'ll get back to you soon.')
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        } catch (error) {
            console.error('Error sending message:', error)
            toast.error('Failed to send message. Please try again later.')
        } finally {
            setSubmitting(false)
        }
    }

    const contactEmail = settings?.contactEmail || 'reservation@travellounge.mu'
    const contactPhone = settings?.contactPhone || '(+230) 212 4070'
    const whatsapp1 = settings?.whatsappNumber1 || '+230 5940 7711'
    const whatsapp2 = settings?.whatsappNumber2 || '+230 5940 7701'
    const office1Title = settings?.office1Title || 'Port Louis Office'
    const office1Address = settings?.office1Address || 'Ground Floor Newton Tower, Corner Sir William Newton and Remy Ollier Street, Port Louis, Mauritius'
    const office2Title = settings?.office2Title || 'Ebene Office'
    const office2Address = settings?.office2Address || 'Ground Floor, 57 Ebene Mews, Rue Du Savoir, Ebene Cybercity, Mauritius'
    const workingHours = settings?.workingHours || 'Mon - Fri: 08:30 - 17:00'

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
                <Loader2 className="animate-spin text-red-600 mb-4" size={48} />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Getting in touch...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Hero */}
            <div className="bg-gradient-to-r from-red-600 to-slate-900 text-white py-20">
                <div className="max-w-7xl auto px-6">
                    <h1 className="text-5xl font-black mb-4">Contact Us</h1>
                    <p className="text-xl text-red-100">Get in touch with our IATA accredited travel agents</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Get In Touch</h2>

                        {/* Offices */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg h-full">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <MapPin className="text-red-600" size={24} />
                                    {office1Title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 mb-4 whitespace-pre-line text-sm">
                                    {office1Address}
                                </p>
                            </div>

                            {(office2Address || settings?.office2Title) && (
                                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg h-full">
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <MapPin className="text-red-600" size={24} />
                                        {office2Title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 mb-4 whitespace-pre-line text-sm">
                                        {office2Address}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Contact Details */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg mb-8">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">Contact Details</h3>
                            <div className="space-y-4">
                                <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-red-600 transition-colors">
                                    <Phone size={20} className="text-red-600" />
                                    <span>{contactPhone}</span>
                                </a>
                                <a href={`https://wa.me/${whatsapp1.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-red-600 transition-colors">
                                    <Phone size={20} className="text-red-600" />
                                    <span>{whatsapp1} (WhatsApp)</span>
                                </a>
                                <a href={`https://wa.me/${whatsapp2.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-red-600 transition-colors">
                                    <Phone size={20} className="text-red-600" />
                                    <span>{whatsapp2} (WhatsApp)</span>
                                </a>
                                <a href={`mailto:${contactEmail}`} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-red-600 transition-colors">
                                    <Mail size={20} className="text-red-600" />
                                    <span>{contactEmail}</span>
                                </a>
                            </div>
                        </div>

                        {/* Working Hours */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <Clock size={24} className="text-red-600" />
                                Working Hours
                            </h3>
                            <div className="space-y-2 text-slate-600 dark:text-slate-300 whitespace-pre-line">
                                {workingHours}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Send Us A Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 dark:text-white"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 dark:text-white"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 dark:text-white"
                                        placeholder="+230 123 4567"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 dark:text-white"
                                        placeholder="Inquiry about cruise packages"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 dark:text-white resize-none"
                                        placeholder="Tell us about your travel plans..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full px-6 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-slate-900 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {submitting ? (
                                        <Loader2 size={20} className="animate-spin" />
                                    ) : (
                                        <Send size={20} />
                                    )}
                                    {submitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <a
                                href={`https://wa.me/${whatsapp1.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all text-center"
                            >
                                WhatsApp Us
                            </a>
                            <a
                                href={`tel:${contactPhone.replace(/\s/g, '')}`}
                                className="px-6 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all text-center"
                            >
                                Call Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
