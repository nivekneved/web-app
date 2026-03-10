'use client'

import { Shield, Lock, Bell, CheckCircle2, Award, HeadphonesIcon } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SafetyPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="py-32 bg-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-xl shadow-red-200">
                            <Shield size={40} />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">
                            Your Safety is <br />Our <span className="text-red-600">Top Priority</span>
                        </h1>
                        <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
                            Traveling with Travel Lounge means traveling with peace of mind. As an IATA accredited agency, we adhere to the highest international safety standards.
                        </p>
                    </motion.div>
                </div>
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
                    <Shield size={500} className="text-slate-900" />
                </div>
            </section>

            {/* Core Safety Pillars */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: Lock,
                                title: "Secure Bookings",
                                desc: "Every transaction on our platform is protected by bank-grade encryption and secure payment gateways."
                            },
                            {
                                icon: Bell,
                                title: "Real-time Alerts",
                                desc: "We monitor global travel advisories 24/7 and proactively notify you of any changes affecting your trip."
                            },
                            {
                                icon: Award,
                                title: "IATA Accredited",
                                desc: "Our accreditation isn't just a badge; it's a commitment to rigorous financial and operational standards."
                            }
                        ].map((pillar, i) => (
                            <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-slate-200/50 transition-all">
                                <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-8">
                                    <pillar.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4">{pillar.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust & Accreditations */}
            <section className="py-24 bg-slate-900 text-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1">
                            <h2 className="text-4xl font-black mb-6">Industry-Leading Protection</h2>
                            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                                We only partner with airlines, hotels, and tour operators that meet our stringent safety and quality criteria. Our internal &quot;Safety Score&quot; ensures that every part of your journey is vetted.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Verified Travel Partners",
                                    "Comprehensive Travel Insurance Options",
                                    "Emergency Ground Support in 50+ Countries",
                                    "24/7 Priority Emergency Hotline"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <CheckCircle2 size={20} className="text-red-600" />
                                        <span className="font-bold">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 w-full">
                            <div className="aspect-square relative rounded-full border-[20px] border-slate-800 flex items-center justify-center p-12">
                                <div className="text-center">
                                    <Award size={80} className="text-red-600 mx-auto mb-6" />
                                    <div className="text-5xl font-black mb-2 tracking-tighter">IATA</div>
                                    <div className="text-slate-400 font-bold uppercase tracking-widest text-sm">Official Accredited Member</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Emergency Contact */}
            <section className="py-32 bg-white text-center">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto bg-slate-50 p-12 md:p-20 rounded-[4rem] border border-slate-100">
                        <HeadphonesIcon size={48} className="text-red-600 mx-auto mb-8" />
                        <h2 className="text-4xl font-black text-slate-900 mb-6">Need Immediate Assistance?</h2>
                        <p className="text-lg text-slate-500 mb-10">
                            Our emergency support team is available 24 hours a day, 7 days a week to assist you with any travel emergencies.
                        </p>
                        <div className="flex flex-col md:flex-row justify-center gap-6">
                            <a href="tel:+2302124070" className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-red-600 transition-all shadow-xl">
                                Call Emergency Hotline
                            </a>
                            <a href="/contact" className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                                Submit Safety Inquiry
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
