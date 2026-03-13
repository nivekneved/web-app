'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'
import { ChevronDown, HelpCircle, Loader2, Mail, Phone, MessageCircle } from 'lucide-react'
import Link from 'next/link'

const supabase = createClient()

type FAQ = {
    id: string
    category: string
    question: string
    answer: string
    order_index: number
}

type GroupedFAQ = {
    category: string
    questions: { q: string, a: string }[]
}

export default function FAQPage() {
    const [openItems, setOpenItems] = useState<string[]>([])
    const [faqData, setFaqData] = useState<GroupedFAQ[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        loadFAQs()
    }, [])

    async function loadFAQs() {
        try {
            const { data, error } = await supabase
                .from('faqs')
                .select('*')
                .eq('is_published', true)
                .order('order_index', { ascending: true })

            if (data && data.length > 0) {
                const grouped: { [key: string]: GroupedFAQ } = {}
                data.forEach((faq: FAQ) => {
                    if (!grouped[faq.category]) {
                        grouped[faq.category] = { category: faq.category, questions: [] }
                    }
                    grouped[faq.category].questions.push({ q: faq.question, a: faq.answer })
                })
                setFaqData(Object.values(grouped))
            }
        } catch (error) {
            console.error('Error loading FAQs:', error)
        } finally {
            setLoading(false)
        }
    }

    function toggleItem(id: string) {
        setOpenItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        )
    }

    const filteredFaqs = faqData.filter(cat => 
        cat.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.questions.some(q => q.q.toLowerCase().includes(searchTerm.toLowerCase()) || q.a.toLowerCase().includes(searchTerm.toLowerCase()))
    ).map(cat => ({
        ...cat,
        questions: cat.questions.filter(q => 
            cat.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
            q.a.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }))

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/assets/hero/local_deals_hero_1773391387665.png"
                    alt="FAQ"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tight">Help Center</h1>
                    <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto font-light">
                        Find answers to commonly asked questions about our services and bookings.
                    </p>
                </div>
            </div>

            {/* Search Input Box */}
            <div className="container mx-auto px-4 -mt-20 relative z-20">
                <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 mb-12">
                     <div className="max-w-2xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-600/10 focus:border-red-600 text-lg font-medium transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <HelpCircle className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400" size={28} />
                     </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="animate-spin text-red-600" size={48} />
                        </div>
                    ) : filteredFaqs.length > 0 ? (
                        <div className="space-y-12">
                            {filteredFaqs.map((category, catIdx) => (
                                <div key={catIdx}>
                                    <h2 className="text-3xl font-black text-slate-900 mb-8 italic border-b-2 border-red-600 inline-block">{category.category}</h2>
                                    <div className="space-y-4">
                                        {category.questions.map((faq, qIdx) => {
                                            const id = `${catIdx}-${qIdx}`
                                            const isOpen = openItems.includes(id)

                                            return (
                                                <div
                                                    key={qIdx}
                                                    className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-red-600 shadow-lg' : 'border-slate-100 shadow-sm hover:border-red-600/30'}`}
                                                >
                                                    <button
                                                        onClick={() => toggleItem(id)}
                                                        className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-50/50 transition-colors"
                                                    >
                                                        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-red-600' : 'text-slate-900'}`}>{faq.q}</span>
                                                        <ChevronDown
                                                            size={24}
                                                            className={`flex-shrink-0 text-red-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                                        />
                                                    </button>
                                                    {isOpen && (
                                                        <div className="px-8 pb-8">
                                                            <div className="h-px bg-slate-100 mb-6" />
                                                            <p className="text-slate-600 leading-relaxed text-lg font-light">{faq.a}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
                             <p className="text-slate-500 text-lg">No matching questions found.</p>
                        </div>
                    )}

                    {/* Contact CTA */}
                    <div className="mt-20 bg-slate-900 rounded-[3rem] p-12 text-center text-white overflow-hidden relative">
                         <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -mr-32 -mt-32" />
                         <h2 className="text-3xl font-black mb-4">Still have questions?</h2>
                         <p className="text-slate-400 mb-10 max-w-xl mx-auto">Our support team is available 24/7 to help you with your bookings and travel plans.</p>
                         <div className="flex flex-wrap justify-center gap-6">
                             <Link href="/contact" className="px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-500 transition-all shadow-xl shadow-red-600/20 flex items-center gap-2">
                                <Mail size={20} /> Email Support
                             </Link>
                             <a href="https://wa.me/23059407711" target="_blank" className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-50 transition-all flex items-center gap-2">
                                <MessageCircle size={20} className="text-green-600" /> WhatsApp Chat
                             </a>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
