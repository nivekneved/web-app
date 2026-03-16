'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  MapPin, 
  Clock, 
  CheckCircle2, 
  PhoneCall,
  MessageCircle,
  Users,
  Wallet,
  Home,
  Mail
} from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function TailorMadePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: `Tailor-Made Request - ${formData.get('destination')}`,
      message: `
        Destination: ${formData.get('destination')}
        Departure Date: ${formData.get('departure_date')}
        Return Date: ${formData.get('return_date')}
        Adults: ${formData.get('adults')}
        Children: ${formData.get('children')}
        Budget: ${formData.get('budget')}
        Accommodation: ${formData.get('accommodation')}
        Special Requests: ${formData.get('message')}
      `.trim(),
      status: 'unread'
    };

    try {
      const { error } = await supabase.from('inquiries').insert([data]);
      if (error) throw error;
      setSubmitStatus('success');
      toast.success('Your tailor-made request has been sent! Our experts will contact you soon.');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setSubmitStatus('error');
      toast.error('Something went wrong. Please try again or call us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[500px] flex items-center overflow-hidden bg-slate-900">
        <Image
          src="/assets/hero/tailormade_travel_hero_1773391405705.png"
          alt="Tailor-Made Travel"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
            <span className="inline-block py-2 px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                Bespoke Journeys
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
                Your Journey, <br />
                <span className="text-red-500 italic">Exactly as You Imagine.</span>
            </h1>
            <p className="text-xl text-white/70 font-medium max-w-2xl mx-auto leading-relaxed">
                Customise your trips including accommodation, transport, activities, or places of interest with our travel specialists.
            </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <Breadcrumbs 
            items={[
                { label: 'Tailor-Made Travel', active: true }
            ]}
            className="mb-16"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
            
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[3rem] border border-slate-100 p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)]">
                <div className="mb-12">
                  <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-4">Inquiry</h2>
                  <h3 className="text-4xl font-black text-slate-900 tracking-tight">Design Your Trip</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Destination */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Where would you like to go? *</label>
                        <div className="relative">
                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input 
                                type="text" 
                                name="destination"
                                required 
                                placeholder="e.g. Dubai, Paris, Maldives"
                                className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm transition-all" 
                            />
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Departure *</label>
                            <input 
                                type="date" 
                                name="departure_date"
                                required
                                className="w-full px-5 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm transition-all" 
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Return *</label>
                            <input 
                                type="date" 
                                name="return_date"
                                required
                                className="w-full px-5 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm transition-all" 
                            />
                        </div>
                    </div>

                    {/* Travelers */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Adults *</label>
                            <div className="relative">
                                <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <select 
                                    name="adults"
                                    required
                                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm transition-all appearance-none"
                                >
                                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n.toString()}>{n} Adults</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Children</label>
                            <div className="relative">
                                <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                                <select 
                                    name="children"
                                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm transition-all appearance-none"
                                >
                                    {[0,1,2,3,4,5,6].map(n => <option key={n} value={n.toString()}>{n} Children</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Budget */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Preferred Budget (Rs) *</label>
                      <div className="relative">
                        <Wallet className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                            type="text" 
                            name="budget"
                            required 
                            placeholder="e.g. 50,000 - 100,000"
                            className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm transition-all" 
                        />
                      </div>
                    </div>

                    {/* Accommodation */}
                    <div className="space-y-4 md:col-span-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Preferred Accommodation</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Standard', 'Boutique', 'Luxury', 'All-Inclusive'].map((type) => (
                           <label key={type} className="group relative flex items-center justify-center p-5 bg-slate-50 border border-slate-100 rounded-2xl cursor-pointer hover:bg-white hover:border-red-600/50 transition-all font-bold text-xs uppercase tracking-widest text-slate-600 has-[:checked]:bg-red-600 has-[:checked]:text-white has-[:checked]:border-red-600 has-[:checked]:shadow-xl has-[:checked]:shadow-red-600/20">
                             <input type="radio" name="accommodation" value={type} className="hidden" />
                             <Home size={16} className="mr-2" />
                             {type}
                           </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-50 my-12" />

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Input 
                        label="Your Name *"
                        name="name"
                        required 
                        placeholder="John Doe"
                    />
                    <Input 
                        label="Email Address *"
                        type="email" 
                        name="email"
                        required 
                        placeholder="john@example.com"
                    />
                    <Input 
                        label="Phone Number *"
                        type="tel" 
                        name="phone"
                        required 
                        placeholder="+230"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Special Requests / Message</label>
                    <textarea 
                      name="message"
                      rows={4}
                      placeholder="Share any specific interests, dietary requirements, or special occasions..."
                      className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm transition-all resize-none" 
                    ></textarea>
                  </div>

                  <div className="flex flex-col items-center gap-6 pt-6">
                    <Button 
                      type="submit"
                      size="xl"
                      isLoading={isSubmitting}
                      className="w-full md:w-auto min-w-[300px] shadow-2xl shadow-red-600/20"
                    >
                      Send Tailor-Made Request
                    </Button>

                    <AnimatePresence mode="wait">
                      {submitStatus === 'success' && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3 text-green-600 font-bold bg-green-50 px-8 py-4 rounded-2xl border border-green-100"
                        >
                          <CheckCircle2 size={20} />
                          Request sent successfully! Our team will contact you soon.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar / Contact Info */}
            <div className="space-y-12">
              {/* Process Section */}
              <section>
                <h3 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-8">The Process</h3>
                <div className="space-y-6">
                  {[
                    { step: '01', title: 'Consultation', desc: 'We chat about your dreams, interests, and must-sees.' },
                    { step: '02', title: 'Curated Design', desc: 'Our experts draft a unique itinerary for your review.' },
                    { step: '03', title: 'Perfected Details', desc: 'We refine everything until it is absolutely perfect.' },
                  ].map((item, i) => (
                    <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-xs font-black text-red-500 mb-2 block">{item.step}</span>
                      <h4 className="font-black text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Working Hours */}
              <div className="bg-slate-900 text-white rounded-[3rem] p-10 shadow-2xl shadow-slate-900/20">
                <h3 className="text-xl font-black mb-8 flex items-center gap-4 text-red-500">
                  <Clock size={28} />
                  Hours
                </h3>
                <div className="space-y-6 font-medium">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/60">Mon – Fri</span>
                    <span className="font-black">08:30 – 17:00</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/60">Saturday</span>
                    <span className="font-black">08:30 – 12:30</span>
                  </div>
                  <div className="flex justify-between items-center text-red-400">
                    <span className="font-black uppercase text-[10px] tracking-widest">Sunday</span>
                    <span className="font-black uppercase text-[10px] tracking-widest">Closed</span>
                  </div>
                </div>
              </div>

              {/* Contact Numbers */}
              <section>
                  <h3 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-8">Concierge</h3>
                  <div className="space-y-6">
                    {[
                        { label: 'General', number: '(+230) 212 4070', icon: PhoneCall },
                        { label: 'WhatsApp', number: '(+230) 5940 7711', icon: MessageCircle, isWhatsApp: true },
                        { label: 'Email', number: 'reservation@travellounge.mu', icon: Mail }
                    ].map((item, i) => (
                        <div key={i} className="group flex items-center gap-5 p-4 hover:bg-slate-50 rounded-2xl transition-all duration-300">
                            <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                                item.isWhatsApp ? "bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white" : "bg-slate-50 text-slate-900 group-hover:bg-red-600 group-hover:text-white"
                            )}>
                                <item.icon size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-0.5">{item.label}</span>
                                <span className="font-black text-slate-900 group-hover:text-red-600 transition-colors">{item.number}</span>
                            </div>
                        </div>
                    ))}
                  </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
