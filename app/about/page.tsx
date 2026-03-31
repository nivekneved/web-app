'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import { resolveImageUrl } from '@/lib/image'
import { sanitizeHtml } from '@/lib/sanitize'
import { useSettings } from '@/contexts/SettingsContext'

type ContentBlock = {
    section_key: string
    content: unknown
}

type AboutContent = {
    hero?: {
        badge: string
        title: string
        description: string
        image: string
    }
    identity?: {
        subtitle: string
        title: string
        description: string
        position?: string
        quote: string
        stats_label: string
        stats_value: string
        image_primary?: string
        image_secondary?: string
    }
}

export default function AboutPage() {
    const { generalConfig: config } = useSettings()
    const labels = (config?.ui_labels || {}) as Record<string, string>
    const [content, setContent] = useState<AboutContent | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = useMemo(() => createClient(), [])

    const fetchContent = useCallback(async () => {
        try {
            const { data } = await supabase
                .from('content_blocks')
                .select('section_key, content')
                .eq('page_slug', 'about')

            if (data && data.length > 0) {
                const blocks: Record<string, unknown> = {}
                data.forEach((block: ContentBlock) => {
                    blocks[block.section_key] = block.content
                })
                setContent(blocks as AboutContent)
            }
        } catch (err) {
            console.error('About: Error fetching content blocks:', err)
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
        badge: "",
        title: "",
        description: "",
        image: ""
    }

    const identity = content?.identity || {
        subtitle: "",
        title: "",
        description: "",
        quote: "",
        stats_label: "",
        stats_value: ""
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="animate-spin text-red-600" size={48} />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <section className="relative h-[250px] md:h-[350px] flex items-center overflow-hidden bg-slate-950 border-b border-white/10">
                <Image
                    src={resolveImageUrl(config?.aboutHeroImage, "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?q=80&w=2070&auto=format&fit=crop")}
                    alt="Travel Lounge Mauritius"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

                <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-block py-2 px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-6">
                            {hero.badge}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-[1.1]">
                            {hero.title.split('<br />').map((line: string, idx: number) => (
                                <React.Fragment key={idx}>
                                    <span dangerouslySetInnerHTML={{ __html: sanitizeHtml(line) }} />
                                    {idx < hero.title.split('<br />').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </h1>
                        <p className="text-lg text-white/70 font-medium max-w-2xl mx-auto leading-relaxed">
                            {hero.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center justify-center text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative w-full max-w-2xl px-12 py-20 bg-slate-50 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-100 overflow-hidden"
                        >
                            {/* Watermark decorations */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] -ml-32 -mb-32"></div>
                            
                            <div className="relative z-10 flex flex-col items-center">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em] mb-12">{labels.legacy_label || 'A Legacy of Excellence'}</span>
                                <div className="relative w-72 h-72 mb-12">
                                    <Image 
                                        src="/assets/logo-red-bird.png" 
                                        alt="Travel Lounge Red Bird Logo" 
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                    />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter max-w-lg mx-auto">
                                    {labels.brand_tagline || 'Pioneering Luxury & Corporate Travel Since Day One.'}
                                </h2>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <span className="text-xs font-black text-red-600 uppercase tracking-[0.4em]">{labels.who_we_are_badge || 'Who we are'}</span>
                                <h2 
                                    className="text-4xl font-black text-slate-900 leading-tight uppercase tracking-tight"
                                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(identity.title.replace(/<br\s*\/?>/g, ' ')) }}
                                />
                            </div>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                {identity.description}
                            </p>
                            <div className="p-8 bg-slate-50 border-l-4 border-red-600 rounded-r-[2rem]">
                                <p className="text-xl italic font-medium text-slate-900 leading-relaxed mb-4">
                                    &quot;{identity.quote}&quot;
                                </p>
                                <span className="text-xs font-black uppercase tracking-widest text-red-600">{labels.vision_label || 'The Travel Lounge Vision'}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-6 pt-12">
                                <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl">
                                     <div className="text-5xl font-black text-red-600 mb-2">{identity.stats_value}</div>
                                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{identity.stats_label}</div>
                                </div>
                                <div className="aspect-[4/5] relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
                                    <Image src="/corporate_identity_about_1774969770940.png" alt="Travel Lounge Corporate Services" fill className="object-cover" />
                                </div>
                           </div>
                           <div className="space-y-6">
                                <div className="aspect-[4/5] relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
                                    <Image src="/leisure_identity_about_1774969745442.png" alt="Travel Lounge Leisure Experiences" fill className="object-cover" />
                                </div>
                                <div className="bg-red-600 p-8 rounded-[2.5rem] text-white shadow-2xl">
                                    <div className="text-4xl font-black mb-2">{labels.iata_label || 'IATA'}</div>
                                    <div className="text-xs font-black text-red-100 uppercase tracking-widest">{labels.iata_sublabel || 'Accredited Member'}</div>
                                </div>
                           </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
