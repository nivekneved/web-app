import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FileText, CheckCircle, Clock, ShieldCheck, Globe, HelpCircle, ArrowRight } from 'lucide-react'

export const metadata = {
    title: 'Visa Services | Travel Lounge',
    description: 'Fast, reliable, and professional visa assistance for your travels. We help with documentation and processing for destinations worldwide.',
}

export default function VisaServicesPage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/assets/hero/visa_services_hero_1773391463549.png"
                    alt="Visa Services"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tight">Visa Assistance</h1>
                    <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto font-light">
                        Expert guidance for Schengen, UK, USA, and South Africa visas.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 -mt-20 relative z-20">
                <div className="bg-white rounded-3xl p-10 md:p-16 shadow-xl border border-slate-100 mb-12">
                     <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 italic">Travel Without Limits</h2>
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
                            Navigating visa requirements can be complex and stressful. As an IATA accredited agency, 
                            we provide professional assistance to ensure your documentation is accurate and submitted on time.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {[
                            { title: 'Tourist Visas', icon: Globe, desc: 'Processing for major destinations including Schengen, USA, UK, Australia, and more.' },
                            { title: 'Business Visas', icon: ShieldCheck, desc: 'Fast-tracked assistance for corporate travel and international meetings.' },
                            { title: 'Document Legalization', icon: FileText, desc: 'Apostille and notary services for your important travel documents.' },
                            { title: 'Application Review', icon: HelpCircle, desc: 'Professional check of your documents before you submit to reduce rejection risk.' },
                        ].map((service, i) => (
                            <div key={i} className="group p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-red-600 hover:bg-white hover:shadow-2xl transition-all duration-500">
                                <service.icon className="text-red-600 mb-6 group-hover:scale-110 transition-transform" size={48} />
                                <h3 className="text-2xl font-black text-slate-900 mb-4">{service.title}</h3>
                                <p className="text-slate-600 leading-relaxed font-light italic mb-6">{service.desc}</p>
                                <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-black text-red-600 uppercase tracking-widest hover:gap-3 transition-all">
                                    Learn More <ArrowRight size={16} />
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         {[
                            { icon: CheckCircle, label: 'High Approval Rate', desc: '98% success rate for applications.' },
                            { icon: Clock, label: 'Fast Processing', desc: 'Average turnaround of 5-10 days.' },
                            { icon: ShieldCheck, label: 'Secure Data', desc: 'Your private info is fully encrypted.' },
                         ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center">
                                <item.icon className="text-red-600 mb-4" size={32} />
                                <h4 className="font-bold text-slate-900 mb-1">{item.label}</h4>
                                <p className="text-xs text-slate-400 uppercase tracking-widest font-black">{item.desc}</p>
                            </div>
                         ))}
                    </div>
                </div>

                <div className="bg-slate-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -ml-32 -mb-32" />
                    <h2 className="text-3xl md:text-5xl font-black mb-6">Need a Visa?</h2>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-light">
                        Our experts are ready to guide you through the process step-by-step.
                    </p>
                    <Link href="/contact" className="px-10 py-5 bg-red-600 text-white font-bold rounded-full hover:bg-red-500 transition-all inline-block shadow-xl shadow-red-600/20">
                        Start Your Application
                    </Link>
                </div>
            </div>
        </div>
    )
}
