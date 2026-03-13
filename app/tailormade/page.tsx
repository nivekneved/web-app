
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserCheck, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Tailor-Made Travel | Travel Lounge',
  description: 'Design your dream vacation with Travel Lounge. We specialize in bespoke, personalized itineraries tailored to your unique preferences.',
};

export default function TailorMadePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center min-h-[500px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero/tailormade_travel_hero_1773391405705.png"
            alt="Bespoke Tailor-made Vacations"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-7xl font-bold mb-6 font-serif">Your Journey, Exactly as You Imagine It</h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90 font-light">Why settle for ordinary when you can have extraordinary? Our travel designers craft one-of-a-kind itineraries tailored precisely to your style, pace, and interests.</p>
            <Link 
              href="/contact/request-quote"
              className="inline-block px-10 py-5 bg-white text-primary font-bold rounded-full hover:bg-slate-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              Start Designing Your Trip
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-16">The Tailor-Made Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                {[
                    { step: '01', title: 'Consultation', desc: 'We chat about your dreams, interests, and must-sees.' },
                    { step: '02', title: 'Curated Design', desc: 'Our experts draft a unique itinerary for your review.' },
                    { step: '03', title: 'Perfected Details', desc: 'We refine everything until it is absolutely perfect.' },
                ].map((item, i) => (
                    <div key={i} className="relative group p-10 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all">
                        <span className="text-6xl font-black text-slate-100 absolute top-4 left-4 group-hover:text-primary/10 transition-colors">{item.step}</span>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">{item.title}</h3>
                        <p className="text-slate-600 relative z-10 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-24">
        <div className="container mx-auto px-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="relative h-[500px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl skew-y-1">
                    <Image 
                        src="/assets/hero/mauritius_destination_hero_1773391482617.png" 
                        alt="Expert Travel Planning" 
                        fill 
                        className="object-cover"
                    />
                </div>
                <div>
                    <Sparkles className="text-primary mb-6" size={48} />
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">We Take Care of Every Detail, So You Don&apos;t Have To</h2>
                    <ul className="space-y-6">
                        {[
                            'Hidden gems and off-the-beaten-path experiences.',
                            'Seamless logistics from start to finish.',
                            'Exclusive access to private tours and expert guides.',
                            '24/7 concierge support during your travels.',
                        ].map((text, i) => (
                            <li key={i} className="flex gap-4 items-start text-lg text-slate-700 font-medium">
                                <UserCheck className="text-primary shrink-0" size={24} />
                                <span>{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
             </div>
        </div>
      </section>
    </div>
  );
}
