'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Landmark, Utensils, Bus, Camera, Users, Clock } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import ServiceCard from '@/components/ServiceCard';
import { GridSkeleton } from '@/components/LoadingSkeleton';

const supabase = createClient();

type Service = {
  id: string;
  name: string;
  location: string;
  base_price: number;
  image_url: string;
  duration_days?: number;
  rating?: number;
};

export default function GroupToursPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGroupTours() {
      try {
        setLoading(true);
        // Fetch services linked to 'guided-group-tours' category
        const { data, error } = await supabase
          .from('services')
          .select(`
            id, name, location, base_price, image_url, duration_days, rating,
            service_categories!inner(category_id, categories!inner(slug))
          `)
          .eq('service_categories.categories.slug', 'guided-group-tours')
          .order('name', { ascending: true });

        if (error) throw error;
        setServices(data || []);
      } catch (err) {
        console.error('Error fetching group tours:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchGroupTours();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero/group_tours_hero_1773391421071.png"
            alt="Guided Group Tours"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">Explore Together</span>
            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight leading-[0.9]">Guided Group <br/><span className="text-red-600">Travel</span></h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90 font-medium max-w-xl">Join like-minded people and explore the island with our local experts. Everything is planned so you can relax.</p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">Better Experiences <br/>When Shared</h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-8"> Our group tours are designed to give you the best of both worlds: a well-organized trip with local secrets, and the freedom to explore at your own pace. </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
                    <Users size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Small Groups</h3>
                  <p className="text-slate-500 text-sm">Intimate group sizes for a more personal experience.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
                    <Clock size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Expert Planning</h3>
                  <p className="text-slate-500 text-sm">We handle all the details so you don&apos;t have to.</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl skew-y-3">
                <Image 
                  src="/hero-tour.png" 
                  alt="Group experience" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl hidden md:block border border-slate-100">
                <p className="text-4xl font-black text-red-600 mb-1">500+</p>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Happy Travelers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Results Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 uppercase tracking-tight">Current Group Tours</h2>
            <p className="text-slate-500 font-medium text-lg">Pick your next shared adventure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <GridSkeleton count={3} />
            ) : services.length > 0 ? (
              services.map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  title={service.name}
                  location={service.location}
                  price={service.base_price}
                  image={service.image_url}
                  duration={service.duration_days ? `${service.duration_days} Days` : ''}
                  link={`/tours/${service.id}`}
                  tag="GROUP TOUR"
                  rating={service.rating}
                />
              ))
            ) : (
              <div className="col-span-full py-20 bg-white rounded-[3rem] border border-dashed border-slate-200 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                  <Users size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No active group tours</h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto"> We are currently planning summer tours. Please check back soon or contact us for private groups. </p>
                <Link href="/contact" className="mt-8 inline-block px-8 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all">
                  Contact Us
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Landmark, title: 'Cultural Depth', desc: 'Dive deep into local traditions and history with experts.' },
              { icon: Utensils, title: 'Local Flavors', desc: 'Enjoy authentic meals at hidden gems away from tourists.' },
              { icon: Bus, title: 'Comfort Travel', desc: 'Travel in modern, air-conditioned vans with professional drivers.' },
              { icon: Camera, title: 'Perfect Photos', desc: 'Our guides know the best spots and times for great photos.' },
            ].map((item, i) => (
              <div key={i} className="group p-8 rounded-[2.5rem] bg-slate-50 hover:bg-slate-900 transition-all duration-500">
                <div className="w-14 h-14 bg-white group-hover:bg-red-600 rounded-2xl flex items-center justify-center text-red-600 group-hover:text-white mb-6 shadow-sm transition-colors">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-white mb-4">{item.title}</h3>
                <p className="text-slate-500 group-hover:text-slate-400 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
           </div>
        </div>
      </section>
    </div>
  );
}
