
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Local Deals Mauritius | Travel Lounge',
  description: 'Discover the best local deals and hotel offers in Mauritius. Special discounts for residents and travelers alike.',
};

export default function LocalDealsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center min-h-[350px] md:min-h-[400px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero/local_deals_hero_1773391387665.png"
            alt="Local Deals Mauritius"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-2xl px-4 md:px-0">
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-6 font-serif leading-tight">Island Escapes, Rediscovered</h1>
            <p className="text-lg md:text-2xl mb-10 text-white/90 font-light max-w-2xl mx-auto md:mx-0">Discover the best local hotels, activities, and spa deals on our beautiful island. We ensure you a hassle-free stay because your peace of mind is our business.</p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/packages"
                className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                View Limited Offers <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">Mauritius&apos; Best Kept Secrets</h2>
                <p className="text-lg text-slate-600">From special resort day passes to adventurous catamaran cruises, find the best deals at the island&apos;s most loved spots.</p>
          </div>
        </div>
      </section>

      {/* Deal Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Weekend Getaways', desc: 'Perfect short breaks starting Friday afternoon.', count: '15+ Deals' },
              { title: 'Day Packages', desc: 'Enjoy hotel facilities for the day without staying overnight.', count: '20+ Deals' },
              { title: 'Family Fun', desc: 'Resorts with the best kids clubs and family activities.', count: '12+ Deals' },
              { title: 'Romantic Escapes', desc: 'Adults-only tranquility and honeymoon-style dinners.', count: '10+ Deals' },
            ].map((cat, i) => (
              <div key={i} className="p-8 border border-slate-100 rounded-3xl hover:border-primary/20 hover:bg-primary/5 transition-all group">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{cat.title}</h3>
                <p className="text-slate-600 mb-6">{cat.desc}</p>
                <span className="text-primary font-bold group-hover:translate-x-2 transition-transform inline-block">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
