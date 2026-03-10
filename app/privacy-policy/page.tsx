'use client'

import { Shield, Lock, Eye, FileText, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PrivacyPolicyPage() {
    const sections = [
        {
            title: "Data We Collect",
            content: "We collect information such as your name, email address, phone number, and passport details when you make a booking. We also collect data related to your browsing behavior on our website."
        },
        {
            title: "How We Use Your Data",
            content: "Your data is primarily used to process your travel bookings, communicate important updates about your trip, and improve our services through analytics."
        },
        {
            title: "Third-Party Sharing",
            content: "We only share your information with trusted partners (airlines, hotels, insurers) essential for fulfilling your travel arrangements and as required by law."
        },
        {
            title: "Your Rights",
            content: "You have the right to access, correct, or delete your personal data. You can also opt-out of marketing communications at any time."
        },
        {
            title: "Cookies Policy",
            content: "We use cookies to enhance your experience, remember your preferences, and provide personalized content based on your interests."
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <section className="pt-32 pb-16 bg-slate-50 border-b border-slate-100">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Shield size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Privacy Policy</h1>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Last Updated: February 2026</p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="space-y-16">
                        <div className="prose prose-slate max-w-none">
                            <p className="text-xl text-slate-600 leading-relaxed mb-8">
                                At Travel Lounge, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information in accordance with international data protection standards.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {sections.map((section, i) => (
                                <div key={i} className="group p-8 md:p-12 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center text-sm font-black italic">
                                            {i + 1}
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900">{section.title}</h2>
                                    </div>
                                    <p className="text-slate-500 text-lg leading-relaxed">
                                        {section.content}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-900 rounded-[3rem] p-12 text-white text-center">
                            <Lock size={48} className="text-red-600 mx-auto mb-6" />
                            <h3 className="text-2xl font-black mb-4">Questions About Your Data?</h3>
                            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                                If you have any questions about this Privacy Policy or how we handle your data, please reach out to our data protection officer.
                            </p>
                            <a href="mailto:privacy@travellounge.mu" className="inline-flex items-center gap-2 text-red-500 font-bold hover:text-red-400 transition-colors">
                                privacy@travellounge.mu
                                <ChevronRight size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
