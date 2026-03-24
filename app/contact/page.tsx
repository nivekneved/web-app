'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Image from 'next/image'

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
                .insert([{
                    ...formData,
                    status: 'unread'
                }])

            if (error) throw error

            toast.success('Message sent! We\'ll get back to you soon.')
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        } catch (error) {
            console.error('Error sending message:', error)
            toast.error('Failed to send message. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    const contactEmail = settings?.contactEmail || ''
    const contactPhone = settings?.contactPhone || ''
    const whatsapp1 = settings?.whatsappNumber1 || ''
    const office1Title = settings?.office1Title || ''
    const office1Address = settings?.office1Address || ''
    const office2Title = settings?.office2Title || ''
    const office2Address = settings?.office2Address || ''

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[40vh] w-full overflow-hidden bg-slate-900">
                <Image
                    src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a"
                    alt="Contact Us"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                
                <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center">
                    <div className="max-w-4xl">
                        <span className="inline-block py-2 px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                            Get In Touch
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-tight">
                            We&apos;re Here To <br />
                            <span className="text-red-500 italic">Help You.</span>
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 py-20">
                <Breadcrumbs 
                    items={[
                        { label: 'Contact', active: true }
                    ]}
                    className="mb-16"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Contact Info */}
                    <div className="space-y-20">
                        <section>
                            <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-6">Concierge</h2>
                            <h3 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Our Global Headquarters</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-300">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm mb-4">
                                        <MapPin size={24} />
                                    </div>
                                    <h4 className="font-black text-lg text-slate-900">{office1Title}</h4>
                                    <p className="text-slate-500 font-medium leading-relaxed text-sm">
                                        {office1Address}
                                    </p>
                                </div>
                                
                                <div className="space-y-4 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-300">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm mb-4">
                                        <MapPin size={24} />
                                    </div>
                                    <h4 className="font-black text-lg text-slate-900">{office2Title}</h4>
                                    <p className="text-slate-500 font-medium leading-relaxed text-sm">
                                        {office2Address || 'Ground Floor, 57 Ebene Mews, Rue Du Savoir, Ebene Cybercity'}
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-6">Support</h2>
                            <div className="grid grid-cols-1 gap-6">
                                <a href={`tel:${contactPhone}`} className="group flex items-center gap-6 p-6 hover:bg-slate-50 rounded-3xl transition-all duration-300">
                                    <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center group-hover:bg-red-600 transition-colors">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Direct Line</p>
                                        <p className="text-xl font-black text-slate-900">{contactPhone || '+230 5940 7701'}</p>
                                    </div>
                                </a>
                                
                                <a href={`https://wa.me/${whatsapp1.replace(/\D/g, '')}`} className="group flex items-center gap-6 p-6 hover:bg-slate-50 rounded-3xl transition-all duration-300">
                                    <div className="w-14 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <MessageCircle size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">WhatsApp Concierge</p>
                                        <p className="text-xl font-black text-slate-900">{contactPhone || '+230 5940 7701'}</p>
                                    </div>
                                </a>

                                <a href={`mailto:${contactEmail}`} className="group flex items-center gap-6 p-6 hover:bg-slate-50 rounded-3xl transition-all duration-300">
                                    <div className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Inquiry</p>
                                        <p className="text-xl font-black text-slate-900">{contactEmail}</p>
                                    </div>
                                </a>
                            </div>
                        </section>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <div className="sticky top-24">
                            <div className="bg-white rounded-[3rem] border border-slate-300 p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)]">
                                <h3 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">Direct Inquiry</h3>
                                
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <Input
                                        label="Full Name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Enter your name"
                                    />
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <Input
                                            label="Email Address"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="your@email.com"
                                        />
                                        <Input
                                            label="Phone Number"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+230"
                                        />
                                    </div>

                                    <Input
                                        label="Subject"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        placeholder="What can we help you with?"
                                    />

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Message</label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full px-6 py-5 bg-slate-50 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm transition-all resize-none"
                                            placeholder="Tell us about your travel plans..."
                                        />
                                    </div>

                                    <Button
                                        size="xl"
                                        type="submit"
                                        isLoading={submitting}
                                        className="w-full shadow-2xl shadow-red-600/20"
                                    >
                                        Send Message
                                    </Button>

                                    <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                        Response time: &lt; 24 Hours
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Directions Section */}
                <div className="mt-32 space-y-16">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-6">Directions</h2>
                        <h3 className="text-4xl font-black text-slate-900 mb-6">Visit Our Offices</h3>
                        <p className="text-slate-500 font-medium text-lg">Find us easily with the interactive maps below. We look forward to welcoming you to our premises.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Port Louis Map */}
                        <div className="space-y-6">
                            <div className="bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-300 h-[450px] relative group shadow-2xl shadow-slate-200/50">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3744.912389104051!2d57.50091321744385!3d-20.162747100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x217c504dafffffff%3A0x6b801a6b0c0c0c0c!2sNewton%20Tower!5e0!3m2!1sen!2smu!4v1710590000000!5m2!1sen!2smu"
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="grayscale group-hover:grayscale-0 transition-all duration-1000"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">Main Branch</span>
                                </div>
                            </div>
                            <div className="px-6">
                                <h4 className="font-black text-2xl text-slate-900 mb-2">{office1Title}</h4>
                                <p className="text-slate-500 font-medium leading-relaxed">{office1Address}</p>
                            </div>
                        </div>

                        {/* Ebene Map */}
                        <div className="space-y-6">
                            <div className="bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-300 h-[450px] relative group shadow-2xl shadow-slate-200/50">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.90561570172!2d57.485121!3d-20.244347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x217c5adaaaaaaa!2sEbene%20Mews!5e0!3m2!1sen!2smu!4v1710590000000!5m2!1sen!2smu"
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="grayscale group-hover:grayscale-0 transition-all duration-1000"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">Cybercity Office</span>
                                </div>
                            </div>
                            <div className="px-6">
                                <h4 className="font-black text-2xl text-slate-900 mb-2">{office2Title}</h4>
                                <p className="text-slate-500 font-medium leading-relaxed">{office2Address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
