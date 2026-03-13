
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Landmark, Utensils, Camera, Bus, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Guided Group Tours | Travel Lounge',
  description: 'Join our expertly guided group tours. Explore Mauritius and the world with like-minded travelers and professional guides.',
};

export default function GroupToursPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center min-h-[500px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero/group_tours_hero_1773391421071.png"
            alt="Guided Group Tours"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-full mb-6">Expertly Curated Tours</span>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 italic font-serif">Adventure Together</h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90">Experience the world&apos;s most iconic destinations with professional guides and a vibrant community of fellow explorers.</p>
            <Link 
              href="/tours"
              className="inline-block px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-all font-sans"
            >
              Explore Our Tours
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-24">
        <div className="container mx-auto px-4">
             <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-6xl font-bold text-slate-900 mb-6">The Group Experience</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">Our guided group tours offer the perfect balance of organized structure and personal freedom. We handle the heavy lifting while you focus on making memories.</p>
                </div>
                <div className="shrink-0">
                     <div className="flex -space-x-4 mb-4">
                        {[1,2,3,4,5].map(i => (
                            <div key={i} className="w-14 h-14 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                                <Image src="/logo.png" alt="Traveler" fill className="object-cover grayscale opacity-20" />
                            </div>
                        ))}
                     </div>
                     <p className="text-slate-500 font-medium">Join 500+ happy travelers</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { icon: Landmark, title: 'Expert Local Guides', desc: 'Discover hidden stories and historical secrets from those who know it best.' },
                    { icon: Utensils, title: 'Authentic Dining', desc: 'Taste local cuisine at hand-picked restaurants away from the tourist traps.' },
                    { icon: Bus, title: 'Premium Transport', desc: 'Travel in comfort with our fleet of modern, air-conditioned vehicles.' },
                    { icon: Camera, title: 'Iconic Landmarks', desc: 'Priority access to the world&apos;s most famous sites and viewing points.' },
                    { icon: Users, title: 'Small Group Sizes', desc: 'Intimate groups that ensure a personalized and social experience.' },
                    { icon: CheckCircle2, title: 'All-Inclusive Peace of Mind', desc: 'Most meals, entry fees, and activities are included in your price.' },
                ].map((item, i) => (
                    <div key={i} className="flex gap-6 p-8 border border-slate-100 rounded-[2.5rem] hover:bg-slate-50 transition-all">
                        <div className="shrink-0 w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-slate-900/20">
                            <item.icon size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                ))}
             </div>
        </div>
      </section>
    </div>
  );
}
