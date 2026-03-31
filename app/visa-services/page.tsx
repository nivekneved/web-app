'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FileText, CheckCircle, Clock, ShieldCheck, Globe, ArrowRight, HelpCircle, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { resolveImageUrl } from '@/lib/image'
import { createClient } from '@/lib/supabase'
import { useSettings } from '@/contexts/SettingsContext'

type ContentBlock = {
    section_key: string
    content: unknown
}

type VisaContent = {
    hero?: {
        badge: string
        title: string
        subtitle: string
    }
    steps?: {
        title: string
        description: string
        icon: string
    }[]
    cta?: {
        title: string
        description: string
        primary_label: string
        secondary_label: string
    }
    sidebar?: {
        title: string
        features: {
            title: string
            desc: string
            icon: string
        }[]
        notice_title: string
        notice_content: string
        disclaimer_label: string
    }
}

const IconMap: Record<string, React.ElementType> = {
    Globe,
    FileText,
    CheckCircle,
    ShieldCheck,
    Clock,
    HelpCircle
}

export default function VisaServicesPage() {
    const { generalConfig: config } = useSettings()
    const [content, setContent] = useState<VisaContent | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = useMemo(() => createClient(), [])

    const fetchContent = useCallback(async () => {
        try {
            const { data } = await supabase
                .from('content_blocks')
                .select('section_key, content')
                .eq('page_slug', 'visa-services')

            if (data && data.length > 0) {
                const blocks: Record<string, unknown> = {}
                data.forEach((block: ContentBlock) => {
                    blocks[block.section_key] = block.content
                })
                setContent(blocks as VisaContent)
            }
        } catch (err) {
            console.error('Visa Services: Error fetching content blocks:', err)
        }
    }, [supabase])

    useEffect(() => {
        const init = async () => {
            await fetchContent()
            setLoading(false)
        }
        init()
    }, [fetchContent])

    const hero = content?.hero || {
        badge: "Concierge Services",
        title: "Travel Visa Assistance.",
        subtitle: "Simplifying the complex world of travel documentation."
    }

    const steps = content?.steps || []
    const cta = content?.cta || null
    const sidebar = content?.sidebar || null

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="animate-spin text-red-600" size={48} />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero Section */}
            <div className="relative h-[250px] md:h-[350px] flex items-center overflow-hidden bg-slate-900 border-b border-white/10">
                <Image
                    src={resolveImageUrl(config?.visaHeroImage, "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2017&auto=format&fit=crop")}
                    alt="Travel Visa Services"
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
                            {hero.badge}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight uppercase">
                            {hero.title.split('.')[0]}<br />
                            <span className="text-red-500 italic">Assistance.</span>
                        </h1>
                        <p className="text-lg text-white/70 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                            {hero.subtitle}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 -mt-16 relative z-20">
                <Breadcrumbs 
                    items={[{ label: 'Visa Services', active: true }]} 
                    className="mb-8"
                />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Process Steps */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-xl shadow-slate-200/60 border border-slate-100">
                            <h2 className="text-3xl font-black text-slate-900 mb-12 tracking-tight">Our Process</h2>
                            <div className="space-y-12">
                                {steps.map((step, i) => {
                                    const Icon = IconMap[step.icon] || Globe
                                    return (
                                        <div key={i} className="flex gap-8 group">
                                            <div className="shrink-0 w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                                                <Icon className="text-red-600 group-hover:text-white" size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-extrabold text-slate-900 mb-2">{step.title}</h3>
                                                <p className="text-slate-500 font-medium leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* FAQ/Contact Promo */}
                        {cta && (
                            <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden">
                                <div className="relative z-10">
                                    <HelpCircle size={48} className="text-red-600 mb-6" />
                                    <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">{cta.title}</h3>
                                    <p className="text-slate-400 font-medium mb-10 max-w-xl leading-relaxed">
                                        {cta.description}
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <Link 
                                            href="/contact"
                                            className="px-8 py-4 bg-red-600 text-white rounded-full font-black text-xs tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all inline-block shadow-xl shadow-red-600/20"
                                        >
                                            {cta.primary_label}
                                        </Link>
                                        <Link 
                                            href="/contact"
                                            className="px-8 py-4 bg-white/10 text-white rounded-full font-black text-xs tracking-[0.2em] hover:bg-white/20 transition-all inline-block"
                                        >
                                            {cta.secondary_label}
                                        </Link>
                                    </div>
                                </div>
                                <div className="absolute -bottom-20 -right-20 opacity-10">
                                    <Globe size={300} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Information */}
                    {sidebar && (
                        <div className="space-y-8">
                            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/60 border border-slate-100">
                                <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-widest">{sidebar.title}</h3>
                                <div className="space-y-8">
                                    {sidebar.features.map((f, i) => {
                                        const Icon = IconMap[f.icon] || ShieldCheck
                                        return (
                                            <div key={i} className="space-y-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                                                    <Icon className="text-red-500" size={20} />
                                                </div>
                                                <h4 className="font-extrabold text-slate-900">{f.title}</h4>
                                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{f.desc}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="bg-red-600 rounded-[2.5rem] p-10 text-white">
                                <h3 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-widest">
                                    {sidebar.notice_title}
                                </h3>
                                <p className="text-sm font-medium text-red-100 leading-relaxed mb-6">
                                    {sidebar.notice_content}
                                </p>
                                <Link href="/about" className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:translate-x-2 transition-transform">
                                    {sidebar.disclaimer_label} <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
