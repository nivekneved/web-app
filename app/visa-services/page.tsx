
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, CheckCircle, Clock, ShieldCheck, Globe, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Visa Services | Travel Lounge',
  description: 'Fast, reliable, and professional visa assistance for your travels. We help with documentation and processing for destinations worldwide.',
};

export default function VisaServicesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[55vh] flex items-center min-h-[400px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero/visa_services_hero_1773391463549.png"
            alt="Expert Visa Assistance"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-2xl bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Expert Visa Assistance</h1>
            <p className="text-lg mb-8 text-white/95 leading-relaxed">Let us handle the complexity of visa applications. Our dedicated team ensures your documentation is perfect and processed with the highest chance of success.</p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-50 transition-all"
            >
              Get Started <FileText size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="container mx-auto px-4">
             <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Simplifying World Travel</h2>
                <p className="text-lg text-slate-600">Navigating travel requirements can be stressful. We provide a comprehensive suite of services to ensure you&apos;re ready for your next adventure.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    { title: 'Tourist Visas', icon: Globe, desc: 'Processing for major destinations including Schengen, USA, UK, Australia, and more.' },
                    { title: 'Business Visas', icon: ShieldCheck, desc: 'Fast-tracked assistance for corporate travel and international meetings.' },
                    { title: 'Document Legalization', icon: FileText, desc: 'Apostille and notary services for your important travel documents.' },
                    { title: 'Application Review', icon: HelpCircle, desc: 'Professional check of your documents before you submit to reduce rejection risk.' },
                ].map((service, i) => (
                    <div key={i} className="group p-10 bg-slate-50 rounded-[3rem] hover:bg-primary transition-all duration-300">
                        <service.icon className="text-primary group-hover:text-white mb-6 transition-colors" size={48} />
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white mb-4 transition-colors">{service.title}</h3>
                        <p className="text-slate-600 group-hover:text-white/80 leading-relaxed transition-colors">{service.desc}</p>
                    </div>
                ))}
             </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-30" />
          <div className="container mx-auto px-4 text-center relative z-10">
                <h3 className="text-3xl font-bold mb-12">Our Commitment To You</h3>
                <div className="flex flex-wrap justify-center gap-12 font-medium">
                    <div className="flex items-center gap-3"><CheckCircle className="text-primary" /> High Approval Rate</div>
                    <div className="flex items-center gap-3"><Clock className="text-primary" /> Fast Processing</div>
                    <div className="flex items-center gap-3"><ShieldCheck className="text-primary" /> Data Privacy</div>
                </div>
          </div>
      </section>
    </div>
  );
}
