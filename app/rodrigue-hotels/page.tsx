
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BedDouble, Waves, Coffee, Utensils, Star } from 'lucide-react';

export const metadata = {
  title: 'Rodrigues Hotels - Authentic Escapes | Travel Lounge',
  description: 'Book your stay in Rodrigues with Travel Lounge. We offer a selection of the best hotels and guesthouses on the island.',
};

export default function RodriguesHotelsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center min-h-[450px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero/rodrigues_hotels_hero_1773391499243.png"
            alt="Authentic Rodrigues Hotels"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-8xl font-bold mb-6 font-serif">Island Living, Rodrigues Style</h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90 font-light max-w-2xl">From charming local guest houses to boutique hotels on the coast. Experience genuine hospitality with our curated selection of stays and reliable airport transfers.</p>
            <Link 
              href="/hotels"
              className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all inline-block"
            >
              Browse All Hotels
            </Link>
          </div>
        </div>
      </section>

      {/* Selection */}
      <section className="py-24">
        <div className="container mx-auto px-4">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                    { name: 'Luxury Eco-Lodge', price: 'Rs 5,500', rating: 5, tags: ['Eco-friendly', 'Secluded'] },
                    { name: 'Lagoon Front Resort', price: 'Rs 4,200', rating: 4, tags: ['Sea View', 'Family'] },
                    { name: 'Hillside Guesthouse', price: 'Rs 2,800', rating: 4, tags: ['Authentic', 'Budget'] },
                ].map((hotel, i) => (
                    <div key={i} className="bg-slate-50 rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-2xl transition-all">
                        <div className="relative h-64">
                            <Image src="/assets/hero/rodrigues_hotels_hero_1773391499243.png" alt={hotel.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">From {hotel.price}</div>
                        </div>
                        <div className="p-8">
                            <div className="flex gap-1 text-yellow-400 mb-4">
                                {[...Array(hotel.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">{hotel.name}</h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {hotel.tags.map((tag, j) => <span key={j} className="text-[10px] uppercase font-bold tracking-wider bg-slate-200 text-slate-600 px-3 py-1 rounded-full">{tag}</span>)}
                            </div>
                            <Link href="/hotels" className="w-full text-center block px-6 py-3 border-2 border-slate-900 text-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-all">Select Details</Link>
                        </div>
                    </div>
                ))}
             </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                {[
                    { icon: Coffee, title: 'Local Breakfast' },
                    { icon: Waves, title: 'Outdoor Pools' },
                    { icon: Utensils, title: 'Island Cuisine' },
                    { icon: BedDouble, title: 'Premium Linens' },
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-4 text-center">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <item.icon size={32} />
                        </div>
                        <h4 className="font-bold text-slate-900">{item.title}</h4>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
