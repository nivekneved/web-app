
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Compass } from 'lucide-react';

export const metadata = {
  title: 'Mauritius - Discover Paradise | Travel Lounge',
  description: 'Explore the breathtaking beauty of Mauritius. From pristine beaches to lush interior landscapes, plan your perfect tropical escape with Travel Lounge.',
};

export default function MauritiusPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center min-h-[500px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero/mauritius_destination_hero_1773391482617.png"
            alt="Mauritius Paradise Aerial View"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-8xl font-bold mb-6 font-serif">Mauritius: Beyond the Horizon</h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90 font-light max-w-2xl mx-auto">From the best local hotels to exclusive spa deals and activities, we ensure you a hassle-free stay. Discover why Mauritius is more than just a destination.</p>
            <div className="flex gap-4">
                 <Link href="/destinations/mauritius" className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all">Explore Destinations</Link>
                 <Link href="/contact" className="px-8 py-4 bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold rounded-full hover:bg-white/30 transition-all">Book Your Stay</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                    { label: 'Language', val: 'English, French, Creole' },
                    { label: 'Currency', val: 'Mauritian Rupee (MUR)' },
                    { label: 'Best Time', val: 'May to December' },
                    { label: 'Climate', val: 'Tropical (25°C - 30°C)' },
                ].map((item, i) => (
                    <div key={i}>
                        <p className="text-white/60 text-xs uppercase tracking-widest font-bold mb-1">{item.label}</p>
                        <p className="font-bold text-lg">{item.val}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Regions */}
      <section className="py-24">
        <div className="container mx-auto px-4">
             <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Discover Our Coasts</h2>
                <div className="w-24 h-1 bg-primary mx-auto" />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[
                    { coast: 'North Coast', desc: 'Famous for Grand Baie, white sandy beaches, and vibrant nightlife.', img: '/assets/hero/mauritius_destination_hero_1773391482617.png' },
                    { coast: 'East Coast', desc: 'Home to the most exclusive luxury resorts and pristine turquoise lagoons.', img: '/assets/hero/local_deals_hero_1773391387665.png' },
                    { coast: 'South Coast', desc: 'Rugged beauty, dramatic cliffs, and untouched natural landscapes.', img: '/assets/hero/day_packages_hero_1773391515388.png' },
                    { coast: 'West Coast', desc: 'Perfect sunsets, calm waters, and the iconic Le Morne mountain.', img: '/assets/hero/tailormade_travel_hero_1773391405705.png' },
                ].map((item, i) => (
                    <div key={i} className="group overflow-hidden rounded-[3rem] relative h-[400px]">
                        <Image src={item.img} alt={item.coast} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-10 left-10 text-white right-10">
                            <h3 className="text-3xl font-bold mb-3">{item.coast}</h3>
                            <p className="text-white/80 leading-relaxed mb-6">{item.desc}</p>
                            <Link href="/destinations/mauritius" className="inline-flex items-center gap-2 font-bold group-hover:text-primary transition-colors">Learn More <Compass size={18} /></Link>
                        </div>
                    </div>
                ))}
             </div>
        </div>
      </section>
    </div>
  );
}
