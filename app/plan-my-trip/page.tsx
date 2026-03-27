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
  Mail
} from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { resolveImageUrl } from '@/lib/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function PlanMyTrip() {
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
      subject: `Plan My Trip Request - ${formData.get('destination')}`,
      message: `
        Destination: ${formData.get('destination')}
        Departure Date: ${formData.get('departure_date')}
        Adults: ${formData.get('adults')}
        Children: ${formData.get('children')}
        Special Requests: ${formData.get('message')}
      `.trim(),
      status: 'unread'
    };

    try {
      const { error } = await supabase.from('inquiries').insert([data]);
      if (error) throw error;
      setSubmitStatus('success');
      toast.success('Your request has been sent! Our experts will contact you soon.');
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
      <section className="relative h-[40vh] min-h-[400px] flex items-center overflow-hidden bg-slate-900">
        <Image
          src={resolveImageUrl(null, "/assets/placeholders/hero-adventure.png")}
          alt="Plan My Trip"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        
        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center justify-center">
            <span className="inline-block py-2 px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                Custom Journeys
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight leading-[1.1]">
                Design Your <br />
                <span className="text-red-500 italic">Dream Escape.</span>
            </h1>
            <p className="text-lg text-white/70 font-medium max-w-2xl mx-auto leading-relaxed">
                Tell us about your perfect journey, and we&apos;ll handle every detail to make it a reality.
            </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-8">
          <Breadcrumbs 
            items={[
                { label: 'Plan My Trip', active: true }
            ]}
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)]">
                <div className="mb-8">
                  <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-4">Inquiry</h2>
                  <h3 className="text-4xl font-black text-slate-900 tracking-tight">Trip Questionnaire</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm text-slate-900 placeholder:text-slate-400 transition-all" 
                            />
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Departure *</label>
                        <input 
                            type="date" 
                            name="departure_date"
                            required
                            className="w-full px-5 py-5 bg-slate-50 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm text-slate-900 transition-all" 
                        />
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
                                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm text-slate-900 transition-all appearance-none"
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
                                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm text-slate-900 transition-all appearance-none"
                                >
                                    {[0,1,2,3,4,5,6].map(n => <option key={n} value={n.toString()}>{n} Children</option>)}
                                </select>
                            </div>
                        </div>
                    </div>


                  </div>

                  <hr className="border-slate-50 my-8" />

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      className="w-full px-6 py-5 bg-slate-50 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:bg-white font-bold text-sm text-slate-900 placeholder:text-slate-400 transition-all resize-none" 
                    ></textarea>
                  </div>

                  <div className="flex flex-col items-center gap-6 pt-2">
                    <Button 
                      type="submit"
                      size="xl"
                      isLoading={isSubmitting}
                      className="w-full md:w-auto min-w-[300px] shadow-2xl shadow-red-600/20"
                    >
                      Send My Request
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
            <div className="space-y-8">
              {/* Office Locations */}
              <section>
                <h3 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-6">Visit Us</h3>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-black text-slate-900 text-lg">Port Louis</h4>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      Ground Floor Newton Tower,<br />
                      Sir William Newton Street,<br />
                      Port Louis, Mauritius
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-black text-slate-900 text-lg">Ebene Cybercity</h4>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      Ground Floor, 57 Ebene Mews,<br />
                      Rue Du Savoir,<br />
                      Ebene, Mauritius
                    </p>
                  </div>
                </div>
              </section>

              {/* Working Hours */}
              <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-2xl shadow-slate-900/20">
                <h3 className="text-xl font-black mb-6 flex items-center gap-4 text-red-500">
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
                  <h3 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-6">Concierge</h3>
                  <div className="space-y-4">
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
