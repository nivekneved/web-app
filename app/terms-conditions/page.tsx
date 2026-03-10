'use client'

import { FileText, CheckCircle2, AlertCircle, ChevronRight, Scale } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TermsConditionsPage() {
    const terms = [
        {
            title: "Booking & Payments",
            content: "All bookings are subject to availability. Full payment must be received to confirm your reservation. Prices are subject to change until the booking is finalized and ticketed."
        },
        {
            title: "Cancellations & Refunds",
            content: "Cancellation policies vary by airline, hotel, and tour operator. Travel Lounge charges a standard administrative fee for all processed refunds. We strongly recommend travel insurance."
        },
        {
            title: "Travel Documents",
            content: "It is the traveler's responsibility to ensure they have valid passports, visas, and health certificates required for their destination. Travel Lounge is not liable for entry denials."
        },
        {
            title: "Liability Limitation",
            content: "While we partner with reputable providers, Travel Lounge acts as an agent and is not responsible for service failures, delays, or accidents caused by third-party travel providers."
        },
        {
            title: "Amending Your Booking",
            content: "Changes to confirmed bookings may incur penalties from both the travel provider and Travel Lounge. All amendment requests must be submitted in writing."
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <section className="pt-32 pb-16 bg-slate-900 border-b border-white/10 text-white">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-red-900/40">
                            <Scale size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-4">Terms & Conditions</h1>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Agreement to Use Travel Lounge Services</p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="space-y-8">
                        <div className="bg-red-50 border border-red-100 p-8 rounded-3xl flex gap-6 items-center mb-12">
                            <div className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center shrink-0">
                                <AlertCircle size={24} />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900">Important Notice</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    By using our website and booking services, you agree to be bound by these terms. Please read them carefully before making a reservation.
                                </p>
                            </div>
                        </div>

                        {terms.map((term, i) => (
                            <div key={i} className="group p-8 md:p-12 hover:bg-slate-50 rounded-[3rem] transition-all border border-transparent hover:border-slate-100">
                                <div className="flex items-start gap-6">
                                    <span className="text-4xl font-black text-slate-200 group-hover:text-red-600/20 transition-colors">
                                        0{i + 1}
                                    </span>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900 mb-4">{term.title}</h2>
                                        <p className="text-slate-500 text-lg leading-relaxed">
                                            {term.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="pt-16 border-t border-slate-100 mt-16 text-center">
                            <p className="text-slate-400 mb-8 italic">
                                These terms are governed by the laws of Mauritius. Travel Lounge reserves the right to update these terms at any time without prior notice.
                            </p>
                            <div className="flex flex-col md:flex-row justify-center gap-4">
                                <a href="mailto:legal@travellounge.mu" className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-red-600 transition-all shadow-xl">
                                    Legal Inquiries
                                </a>
                                <a href="/contact" className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                                    Contact Support
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
