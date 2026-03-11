'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, HelpCircle, Mail, Phone, MessageCircle, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase'

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

const staticFaqs: GroupedFAQ[] = [
    {
        category: 'Booking',
        questions: [
            {
                q: 'How do I make a booking?',
                a: 'Browse our services, select your preferred option, fill in the booking form with your details, and proceed to payment. You\'ll receive a confirmation email once your booking is complete.'
            },
            {
                q: 'Can I modify my booking after confirmation?',
                a: 'Yes, you can modify your booking by contacting our support team at least 48 hours before your travel date. Changes may be subject to availability and additional fees.'
            },
            {
                q: 'What is your cancellation policy?',
                a: 'Cancellations made 7+ days before travel: full refund. 3-7 days: 50% refund. Less than 3 days: no refund. Exceptions may apply based on service provider policies.'
            }
        ]
    },
    {
        category: 'Payment',
        questions: [
            {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and bank transfers. All payments are processed securely.'
            },
            {
                q: 'Is my payment information secure?',
                a: 'Yes, we use industry-standard SSL encryption and comply with PCI DSS standards to ensure your payment information is completely secure.'
            },
            {
                q: 'When will I be charged?',
                a: 'Payment is processed immediately upon booking confirmation. For some services, a deposit may be charged initially with the balance due before travel.'
            }
        ]
    }
]

interface SiteSettings {
    contactEmail?: string;
    contactPhone?: string;
    whatsappNumber1?: string;
    workingHours?: string;
}

export default function FAQPage() {
    const [openItems, setOpenItems] = useState<string[]>([])
    const [faqData, setFaqData] = useState<GroupedFAQ[]>(staticFaqs)
    const [settings, setSettings] = useState<SiteSettings | null>(null)
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const supabase = createClient()

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch FAQs and Settings in parallel
                const [faqRes, settingsRes] = await Promise.all([
                    supabase
                        .from('faqs')
                        .select('*')
                        .eq('is_published', true)
                        .order('order_index', { ascending: true }),
                    supabase
                        .from('site_settings')
                        .select('value')
                        .eq('key', 'general_config')
                        .single()
                ])

                if (faqRes.data && faqRes.data.length > 0) {
                    const grouped: { [key: string]: GroupedFAQ } = {}
                    faqRes.data.forEach((faq: FAQ) => {
                        if (!grouped[faq.category]) {
                            grouped[faq.category] = { category: faq.category, questions: [] }
                        }
                        grouped[faq.category].questions.push({ q: faq.question, a: faq.answer })
                    })
                    setFaqData(Object.values(grouped))
                }

                if (settingsRes.data?.value) {
                    setSettings(settingsRes.data.value as SiteSettings)
                }
            } catch (err) {
                console.error('FAQ: Error fetching data:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [supabase])

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
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-slate-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-4">
                        <HelpCircle size={48} />
                        <h1 className="text-5xl font-black">Help Center</h1>
                    </div>
                    <p className="text-xl text-red-100">Find answers to commonly asked questions</p>
                </div>
            </div>

            {/* Search */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100">
                    <input
                        type="text"
                        placeholder="Search for answers..."
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 focus:border-red-600 text-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* FAQs */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {loading && (
                    <div className="flex justify-center py-10">
                        <Loader2 className="animate-spin text-red-600" size={32} />
                    </div>
                )}
                
                <div className="space-y-12">
                    {filteredFaqs.map((category, catIdx) => (
                        <div key={catIdx}>
                            <h2 className="text-3xl font-black text-slate-900 mb-6">{category.category}</h2>
                            <div className="space-y-4">
                                {category.questions.map((faq, qIdx) => {
                                    const id = `${catIdx}-${qIdx}`
                                    const isOpen = openItems.includes(id)

                                    return (
                                        <div
                                            key={qIdx}
                                            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-red-600 transition-colors"
                                        >
                                            <button
                                                onClick={() => toggleItem(id)}
                                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                                            >
                                                <span className="text-lg font-bold text-slate-900 pr-4">{faq.q}</span>
                                                <ChevronDown
                                                    size={24}
                                                    className={`flex-shrink-0 text-red-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                                />
                                            </button>
                                            {isOpen && (
                                                <div className="px-6 pb-5">
                                                    <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Section */}
            <div className="bg-white border-t border-slate-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-slate-900 mb-3">Still need help?</h2>
                        <p className="text-lg text-slate-600">Our support team is here to assist you</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link
                            href={`mailto:${settings?.contactEmail || 'reservation@travellounge.mu'}`}
                            className="bg-slate-50 rounded-2xl p-6 text-center hover:bg-red-50 hover:border-red-600 border-2 border-transparent transition-all group"
                        >
                            <div className="p-4 bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600 transition-colors">
                                <Mail size={28} className="text-red-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Email Us</h3>
                            <p className="text-sm text-slate-600">Get a response within 24 hours</p>
                        </Link>

                        <a
                            href={`tel:${settings?.contactPhone || '+2302124070'}`}
                            className="bg-slate-50 rounded-2xl p-6 text-center hover:bg-red-50 hover:border-red-600 border-2 border-transparent transition-all group"
                        >
                            <div className="p-4 bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600 transition-colors">
                                <Phone size={28} className="text-red-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Call Us</h3>
                            <p className="text-sm text-slate-600 mb-2">{settings?.contactPhone || '(+230) 212 4070'}</p>
                            <p className="text-xs text-slate-500 uppercase tracking-widest font-black">{settings?.workingHours?.split('\n')[0] || 'Mon-Fri: 9AM-6PM'}</p>
                        </a>

                        <a
                            href={`https://wa.me/${(settings?.whatsappNumber1 || '+23059407711').replace(/\s+/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-50 rounded-2xl p-6 text-center hover:bg-red-50 hover:border-red-600 border-2 border-transparent transition-all group"
                        >
                            <div className="p-4 bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600 transition-colors">
                                <MessageCircle size={28} className="text-red-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Live Chat</h3>
                            <p className="text-sm text-slate-600">Chat with us on WhatsApp</p>
                            <p className="text-xs text-slate-500 mt-2 font-bold text-green-600">Usually Online</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
