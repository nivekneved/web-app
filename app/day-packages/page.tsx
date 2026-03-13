
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sun, Utensils, Beer, Waves, MapPin, Sparkles, Clock } from 'lucide-react';

export const metadata = {
  title: 'Luxury Day Packages | Travel Lounge',
  description: 'Enjoy a day of luxury at the best hotels in Mauritius. Book your day package including lunch and pool access with Travel Lounge.',
};

export default function DayPackagesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center min-h-[500px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero/day_packages_hero_1773391515388.png"
            alt="Luxury Day Packages Mauritius"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <Sparkles className="text-primary mx-auto mb-6" size={48} />
            <h1 className="text-4xl md:text-7xl font-bold mb-6 italic font-serif">One Perfect Day</h1>
            <p className="text-xl md:text-2xl mb-10 text-white/95 font-light">Experience the ultimate luxury resort lifestyle for the day. Perfect for residents and travelers seeking a quick escape with premium amenities and gourmet dining.</p>
            <Link 
              href="/packages"
              className="px-10 py-5 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all inline-block shadow-xl shadow-primary/20"
            >
              Browse Day Passes
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-24">
        <div className="container mx-auto px-4">
             <div className="text-center mb-20 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-serif underline decoration-primary/30 underline-offset-8">What&apos;s Included</h2>
                <p className="text-lg text-slate-600">Our day packages are designed to offer you a complete hotel experience without the overnight stay. Typical inclusions include:</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { icon: Utensils, title: 'Buffet or A La Carte', desc: 'Indulge in a premium lunch experience at the hotel&apos;s signature restaurant.' },
                    { icon: Beer, title: 'Unlimited Drinks', desc: 'Selection of beverages, cocktails, and soft drinks throughout your stay.' },
                    { icon: Waves, title: 'Pool & Beach', desc: 'Full access to swimming pools, private beaches, and lounge facilities.' },
                    { icon: Sun, title: 'Resort Activities', desc: 'Non-motorized water sports, gym access, and daily entertainment programs.' },
                ].map((item, i) => (
                    <div key={i} className="p-10 bg-slate-50 rounded-[3rem] hover:ring-2 ring-primary/20 transition-all text-center">
                        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-primary mx-auto mb-8 shadow-sm">
                            <item.icon size={36} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                    </div>
                ))}
             </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Popular Day Passes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[
                    { hotel: 'Lux* Grand Gaube', price: 'Rs 2,800', hours: '10:00 - 17:00' },
                    { hotel: 'Shandrani Beachcomber', price: 'Rs 3,200', hours: '09:00 - 18:00' },
                ].map((deal, i) => (
                    <div key={i} className="flex flex-col md:flex-row bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden group">
                        <div className="md:w-1/2 relative h-64 md:h-auto">
                             <Image src="/assets/hero/day_packages_hero_1773391515388.png" alt={deal.hotel} fill className="object-cover" />
                        </div>
                        <div className="p-10 md:w-1/2">
                            <h3 className="text-2xl font-bold mb-4">{deal.hotel}</h3>
                            <div className="space-y-3 mb-8 text-white/70">
                                <p className="flex items-center gap-3"><Clock size={18} className="text-primary" /> {deal.hours}</p>
                                <p className="flex items-center gap-3"><MapPin size={18} className="text-primary" /> Mauritius</p>
                            </div>
                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                                <span className="text-2xl font-bold text-primary">{deal.price}</span>
                                <Link href="/contact" className="px-6 py-2.5 bg-white text-slate-900 font-bold rounded-full hover:bg-primary hover:text-white transition-all text-sm">Book Now</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
