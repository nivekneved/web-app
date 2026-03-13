
import React from 'react';
import Image from 'next/image';
import { History, Heart, Award, Users } from 'lucide-react';

export const metadata = {
  title: 'Our Story - The Travel Lounge Journey',
  description: 'Learn about the history, values, and mission of Travel Lounge. Discover how we became one of the leading travel agencies in Mauritius.',
};

export default function OurStoryPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center min-h-[400px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero/mauritius_destination_hero_1773391482617.png"
            alt="Travel Lounge Office and History"
            fill
            className="object-cover grayscale opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 font-serif">Our Story</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/80">A legacy of travel, built on passion and dedicated service.</p>
        </div>
      </section>

      {/* Timeline/Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
             <div className="max-w-4xl mx-auto mb-20 text-center">
                <Heart className="text-primary mx-auto mb-8" size={48} />
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">Where Passion Meets Adventure</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">Since 2014, TRAVEL LOUNGE LTD has been a dedicated one-stop travel solutions provider, specializing in corporate business and personalized holiday leisure travel for both Mauritian and international travelers.</p>
                <p className="text-lg text-slate-600 leading-relaxed">Located in the heart of Port Louis, we are an IATA accredited travel agency committed to ensuring a hassle-free stay. For us, your peace of mind is our business.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <Image src="/assets/hero/group_tours_hero_1773391421071.png" alt="Travel Lounge Team" fill className="object-cover" />
                 <div className="space-y-12">
                    {[
                        { title: 'Our Vision', desc: 'To continuously grow across borders, in products and services, and always putting the customer’s delight at first place.', icon: History },
                        { title: 'Our Mission', desc: 'Dedicated to providing personal advice, support, and communication throughout your trip abroad with tailored solutions.', icon: Award },
                        { title: 'IATA Accredited', desc: 'Genuine travel and holiday specialists providing peace of mind through professional expertise.', icon: Users },
                    ].map((item, i) => (
                        <div key={i} className="flex gap-6">
                            <div className="shrink-0 w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                                <item.icon size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                 </div>
             </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto mb-16">
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">Visit Our Offices</h2>
                  <p className="text-lg text-slate-600">We are conveniently located to serve you better.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                  <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
                      <h3 className="text-2xl font-bold mb-4">Port Louis</h3>
                      <p className="text-slate-600 leading-relaxed font-sans">
                          Ground Floor Newton Tower<br />
                          Corner Sir William Newton and Remy Ollier Street<br />
                          Port Louis, Mauritius
                      </p>
                  </div>
                  <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
                      <h3 className="text-2xl font-bold mb-4">Ebene</h3>
                      <p className="text-slate-600 leading-relaxed font-sans">
                          Ground Floor, 57 Ebene Mews<br />
                          Rue Du Savoir, Ebene Cybercity.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="container mx-auto px-4 text-center">
               <h2 className="text-3xl font-bold mb-16 underline decoration-primary/20 underline-offset-8">Our Core Principles</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    {[
                        { title: 'Integrity', desc: 'Honest pricing and transparent service in everything we do.' },
                        { title: 'Excellence', desc: 'Striving for perfection in every itinerary we design.' },
                        { title: 'Personalization', desc: 'Because every traveler is unique, every trip should be too.' },
                    ].map((val, i) => (
                        <div key={i} className="bg-white p-10 rounded-3xl shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">{val.title}</h3>
                            <p className="text-slate-600">{val.desc}</p>
                        </div>
                    ))}
               </div>
          </div>
      </section>
    </div>
  );
}
