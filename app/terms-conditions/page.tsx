'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { FileText, Lock, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase'

type ContentBlock = {
    section_key: string
    content: unknown
}

type TermsContent = {
    hero?: {
        title: string
        subtitle: string
        last_updated: string
    }
    sections?: {
        title: string
        content: string
    }[]
    contact?: {
        title: string
        description: string
        action_label: string
    }
}

export default function TermsConditionsPage() {
    const [content, setContent] = useState<TermsContent | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = useMemo(() => createClient(), [])

    const fetchContent = useCallback(async () => {
        try {
            const { data } = await supabase
                .from('content_blocks')
                .select('section_key, content')
                .eq('page_slug', 'terms-conditions')

            if (data && data.length > 0) {
                const blocks: TermsContent = {}
                data.forEach((block: ContentBlock) => {
                    (blocks as Record<string, unknown>)[block.section_key] = block.content
                })
                setContent(blocks)
            }
        } catch (err) {
            console.error('Terms Conditions: Error fetching content blocks:', err)
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
        title: "Terms & Conditions",
        subtitle: "Your agreement with Travel Lounge for our services and website usage.",
        last_updated: "March 2026"
    }

    const sections = content?.sections || []
    const contact = content?.contact || null

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="animate-spin text-red-600" size={48} />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <section className="relative h-[250px] md:h-[350px] flex items-center bg-slate-900 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-red-600/10 skew-x-12 transform translate-x-1/2" />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-3xl"
                    >
                        <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                            <FileText size={32} />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight uppercase tracking-tight">{hero.title}</h1>
                        <p className="text-xl text-slate-400 font-medium leading-relaxed">
                            {hero.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Segment */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-32 space-y-8">
                                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                                    <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                                        <Lock size={20} className="text-red-600" />
                                        Summary
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 size={18} className="text-green-500 mt-1 shrink-0" />
                                            <p className="text-sm font-medium text-slate-600">Service Agreement</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 size={18} className="text-green-500 mt-1 shrink-0" />
                                            <p className="text-sm font-medium text-slate-600">Usage Rights</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 size={18} className="text-green-500 mt-1 shrink-0" />
                                            <p className="text-sm font-medium text-slate-600">Liability Terms</p>
                                        </div>
                                    </div>
                                </div>

                                    <div className="text-center p-6 bg-slate-900 rounded-3xl border border-slate-800">
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Last Updated</p>
                                        <p className="text-sm font-bold text-white">{hero.last_updated}</p>
                                    </div>
                            </div>
                        </div>

                        {/* Detailed Terms */}
                        <div className="lg:col-span-2 space-y-12">
                            {sections.map((section, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-4">
                                        <span className="w-8 h-8 rounded-lg bg-slate-900 text-white text-[10px] font-black flex items-center justify-center">0{i+1}</span>
                                        {section.title}
                                    </h2>
                                    <p className="text-slate-600 text-lg leading-relaxed font-light">
                                        {section.content}
                                    </p>
                                </motion.div>
                            ))}

                            {contact && (
                                <div className="p-12 bg-slate-900 text-white rounded-[3rem] mt-20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                                    <div className="relative z-10 flex-1">
                                        <h3 className="text-2xl font-black mb-4">{contact.title}</h3>
                                        <p className="text-slate-400 font-medium">
                                            {contact.description}
                                        </p>
                                    </div>
                                    <a 
                                        href="/contact" 
                                        className="relative z-10 px-10 py-5 bg-white text-slate-900 font-bold rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-xl shadow-black/20 flex items-center gap-3"
                                    >
                                        {contact.action_label}
                                        <ChevronRight size={18} />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
