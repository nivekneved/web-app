'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FileText, CheckCircle, Clock, ShieldCheck, Globe, ArrowRight, HelpCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function VisaServicesPage() {
    const steps = [
        {
            title: "Expert Consultation",
            description: "Detailed analysis of your travel plans and visa requirements based on your nationality and destination.",
            icon: <Globe className="text-blue-600" size={24} />
        },
        {
            title: "Document Preparation",
            description: "Guided assistance in gathering and organizing all necessary documentation to ensure a complete application.",
            icon: <FileText className="text-red-600" size={24} />
        },
        {
            title: "Thorough Review",
            description: "Rigorous checking of your application forms for accuracy and compliance with current embassy standards.",
            icon: <CheckCircle className="text-green-600" size={24} />
        }
    ]

    const features = [
        {
            title: "Accredited Agency",
            desc: "IATA accredited travel agent with years of experience in global visa procedures.",
            icon: <ShieldCheck className="text-blue-500" />
        },
        {
            title: "Time Saving",
            desc: "We handle the complex paperwork so you can focus on planning your trip.",
            icon: <Clock className="text-red-500" />
        }
    ]

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero Section */}
            <div className="relative h-[400px] flex items-center overflow-hidden bg-slate-900 rounded-b-[3rem] md:rounded-b-[5rem]">
                <Image
                    src="/hero-flight.png"
                    alt="Travel Visa Services"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-block py-2 px-6 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-6">
                            Concierge Services
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
                            Travel Visa <br />
                            <span className="text-red-600">Assistance.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 font-medium mb-10 max-w-2xl leading-relaxed">
                            Simplifying the complex world of travel documentation. Our experts ensure your visa application 
                            is handled with precision and care for a stress-free journey.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 -mt-16 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Process Steps */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-xl shadow-slate-200/60 border border-slate-100">
                            <h2 className="text-3xl font-black text-slate-900 mb-12 tracking-tight">Our Process</h2>
                            <div className="space-y-12">
                                {steps.map((step, i) => (
                                    <div key={i} className="flex gap-8 group">
                                        <div className="shrink-0 w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                                            {step.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-extrabold text-slate-900 mb-2">{step.title}</h3>
                                            <p className="text-slate-500 font-medium leading-relaxed">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FAQ/Contact Promo */}
                        <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <HelpCircle size={48} className="text-red-600 mb-6" />
                                <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">Need a customized visa plan?</h3>
                                <p className="text-slate-400 font-medium mb-10 max-w-xl leading-relaxed">
                                    Our consultants are ready to guide you through specific requirements for over 150 destinations worldwide.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link 
                                        href="/contact"
                                        className="px-8 py-4 bg-red-600 text-white rounded-full font-black text-xs tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all inline-block shadow-xl shadow-red-600/20"
                                    >
                                        Start Your Application
                                    </Link>
                                    <Link 
                                        href="/contact"
                                        className="px-8 py-4 bg-white/10 text-white rounded-full font-black text-xs tracking-[0.2em] hover:bg-white/20 transition-all inline-block"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                            {/* Decorative background logo */}
                            <div className="absolute -bottom-20 -right-20 opacity-10">
                                <Globe size={300} />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Information */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/60 border border-slate-100">
                            <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-widest">Why Choose Us</h3>
                            <div className="space-y-8">
                                {features.map((f, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                                            {f.icon}
                                        </div>
                                        <h4 className="font-extrabold text-slate-900">{f.title}</h4>
                                        <p className="text-sm text-slate-500 font-medium leading-relaxed">{f.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Information Alert */}
                        <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white">
                            <h3 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-widest">
                                Important Notice
                            </h3>
                            <p className="text-sm font-medium text-blue-100 leading-relaxed mb-6">
                                Visa requirements can change without notice. Always verify with official embassy channels or consult our team for the most up-to-date information.
                            </p>
                            <Link href="/about" className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:translate-x-2 transition-transform">
                                View Full Disclaimer <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
