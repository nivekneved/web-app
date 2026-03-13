'use client'

import { AlertCircle, Scale, ChevronRight, FileText, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TermsConditionsPage() {
    const terms = [
        {
            title: "Acceptance of Terms",
            content: "By accessing and using Travel Lounge's services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please do not use our services."
        },
        {
            title: "Booking & Payments",
            content: "All bookings are subject to availability. Full payment must be received to confirm your reservation. Travel Lounge acts as an agent for various travel service providers; their terms also apply to your booking."
        },
        {
            title: "Cancellations & Refunds",
            content: "Cancellation fees apply according to the specific service provider's policy. Travel Lounge's administration fees are non-refundable. We strongly recommend comprehensive travel insurance."
        },
        {
            title: "Travel Documents",
            content: "Travelers are responsible for obtaining all necessary travel documents, including valid passports, visas, and health certificates. We are not liable for any issues arising from incomplete documentation."
        },
        {
            title: "Liability & Responsibility",
            content: "Travel Lounge is not liable for any injury, loss, damage, or delay caused by third-party service providers or unforeseen circumstances beyond our control (Force Majeure)."
        },
        {
            title: "Pricing & Quotations",
            content: "Quotations are valid at the time of issue but are subject to change due to currency fluctuations, fuel surcharges, or provider price increases until full payment is received."
        },
        {
            title: "Privacy and Data Protection",
            content: "Your use of our services is also governed by our Privacy Policy, which explains how we handle your personal information."
        },
        {
            title: "Governing Law",
            content: "These terms and conditions are governed by the laws of the Republic of Mauritius. Any disputes shall be subject to the exclusive jurisdiction of the Courts of Mauritius."
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <section className="pt-32 pb-16 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-red-600/10 skew-x-12 transform translate-x-1/2" />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-3xl"
                    >
                        <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-red-900/20">
                            <Scale size={32} />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Terms & <span className="text-red-600">Conditions</span></h1>
                        <p className="text-xl text-slate-400 font-medium leading-relaxed">
                            Please review our service agreement carefully. These terms ensure a safe and transparent experience for all our travelers.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-32 space-y-8">
                                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                                    <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                                        <FileText size={20} className="text-red-600" />
                                        At a Glance
                                    </h3>
                                    <ul className="space-y-4">
                                        {[
                                            "IATA Accredited Agency",
                                            "Secure Payment Processing",
                                            "Transparent Refund Policy",
                                            "Professional Travel Advice"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-slate-600 font-medium text-sm">
                                                <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="p-8 bg-red-50 rounded-[2.5rem] border border-red-100">
                                    <AlertCircle size={32} className="text-red-600 mb-4" />
                                    <p className="text-sm text-red-900 font-bold leading-relaxed">
                                        Need a custom corporate agreement? Contact our business team for tailored solutions.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Terms */}
                        <div className="lg:col-span-2 space-y-12">
                            {terms.map((term, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="pb-12 border-b border-slate-100 last:border-0"
                                >
                                    <span className="text-xs font-black text-red-600 uppercase tracking-widest mb-2 block">Section 0{i+1}</span>
                                    <h2 className="text-2xl font-black text-slate-900 mb-4">{term.title}</h2>
                                    <p className="text-slate-600 leading-relaxed text-lg">
                                        {term.content}
                                    </p>
                                </motion.div>
                            ))}

                            <div className="pt-12">
                                <a 
                                    href="mailto:legal@travellounge.mu" 
                                    className="inline-flex items-center gap-2 px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-red-600 transition-all shadow-xl group"
                                >
                                    Download Full PDF
                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
