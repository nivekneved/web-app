'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Building2,
  PhoneCall,
  MessageCircle
} from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

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
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero/tailormade_travel_hero_1773391405705.png"
            alt="Plan My Trip"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-7xl font-bold mb-6 font-serif tracking-tight italic">Design Your Dream Escape</h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 font-light max-w-2xl mx-auto">Tell us about your perfect journey, and we&apos;ll handle every detail to make it a reality.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-slate-100">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Trip Questionnaire</h2>
                  <p className="text-slate-500 italic">Fields marked with * are required for professional assistance.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Destination */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Where would you like to go? *</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          name="destination"
                          required 
                          placeholder="e.g. Dubai, Paris, Maldives"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900" 
                        />
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Departure *</label>
                            <input 
                                type="date" 
                                name="departure_date"
                                required
                                className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Return *</label>
                            <input 
                                type="date" 
                                name="return_date"
                                required
                                className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900" 
                            />
                        </div>
                    </div>

                    {/* Travelers */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Adults *</label>
                            <select 
                                name="adults"
                                required
                                className="w-full px-4 py-4 bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-900 appearance-none outline-none"
                            >
                                {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n.toString()}>{n}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Children</label>
                            <select 
                                name="children"
                                className="w-full px-4 py-4 bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-900 appearance-none outline-none"
                            >
                                {[0,1,2,3,4,5,6].map(n => <option key={n} value={n.toString()}>{n}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Budget */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Preferred Budget (Rs) *</label>
                      <input 
                        type="text" 
                        name="budget"
                        required 
                        placeholder="e.g. 50,000 - 100,000"
                        className="w-full px-4 py-4 bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-900 outline-none" 
                      />
                    </div>

                    {/* Accommodation */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Preferred Accommodation</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['Standard', 'Boutique', 'Luxury', 'All-Inclusive'].map((type) => (
                           <label key={type} className="flex items-center gap-2 p-4 bg-white border border-slate-300 rounded-2xl cursor-pointer hover:border-primary/50 transition-colors">
                             <input type="radio" name="accommodation" value={type} className="w-4 h-4 text-primary focus:ring-primary" />
                             <span className="text-sm font-medium text-slate-700">{type}</span>
                           </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-100 my-8" />

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        required 
                        className="w-full px-4 py-4 bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-900 outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Email *</label>
                      <input 
                        type="email" 
                        name="email"
                        required 
                        className="w-full px-4 py-4 bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-900 outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Phone *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required 
                        className="w-full px-4 py-4 bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-900 outline-none" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Special Requests / Message</label>
                    <textarea 
                      name="message"
                      rows={4}
                      placeholder="Share any specific interests, dietary requirements, or special occasions..."
                      className="w-full px-4 py-4 bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-900 resize-none outline-none" 
                    ></textarea>
                  </div>

                  <div className="flex flex-col items-center gap-4 pt-4">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-12 py-5 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          Send My Request
                        </>
                      )}
                    </button>

                    <AnimatePresence mode="wait">
                      {submitStatus === 'success' && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-6 py-3 rounded-xl border border-green-100"
                        >
                          <CheckCircle2 size={18} />
                          Request sent successfully! Our team will contact you soon.
                        </motion.div>
                      )}
                      {submitStatus === 'error' && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-600 font-bold bg-red-50 px-6 py-3 rounded-xl border border-red-100"
                        >
                          Oops! Something went wrong. Please try again or call us directly.
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
              <div className="bg-white rounded-[2rem] shadow-lg p-8 border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3 border-b border-slate-50 pb-4">
                  <Building2 className="text-primary" />
                  Visit Us
                </h3>
                
                <div className="space-y-10">
                  <div className="space-y-3">
                    <h4 className="font-black text-primary uppercase text-xs tracking-widest px-2 py-1 bg-red-50 inline-block rounded">Port Louis</h4>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      Ground Floor Newton Tower,<br />
                      Corner Sir William Newton and Remy Ollier Street,<br />
                      Port Louis, Mauritius
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-black text-primary uppercase text-xs tracking-widest px-2 py-1 bg-red-50 inline-block rounded">Ebene</h4>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      Ground Floor, 57 Ebene Mews,<br />
                      Rue Du Savoir,<br />
                      Ebene Cybercity
                    </p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-slate-900 text-white rounded-[2rem] shadow-lg p-8 transform rotate-1">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-red-500">
                  <Clock size={28} />
                  Working Hours
                </h3>
                <div className="space-y-4 font-light opacity-90">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Mon – Fri</span>
                    <span className="font-bold">08:30 – 16:45</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Saturday</span>
                    <span className="font-bold">08:30 – 12:30</span>
                  </div>
                  <div className="flex justify-between text-red-400">
                    <span>Sun & Public Holidays</span>
                    <span className="font-bold uppercase">Closed</span>
                  </div>
                </div>
              </div>

              {/* Contact Numbers */}
              <div className="bg-white rounded-[2rem] shadow-lg p-8 border border-slate-100">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <PhoneCall className="text-primary" />
                    Quick Contact
                  </h3>
                  <div className="space-y-4">
                    {[
                        { label: 'General', number: '(+230) 212 4070', icon: Phone },
                        { label: 'Booking', number: '(+230) 5940 7711', icon: MessageCircle, isWhatsApp: true },
                        { label: 'Support', number: '(+230) 5940 7701', icon: MessageCircle, isWhatsApp: true },
                        { label: 'Reservation', number: 'reservation@travellounge.mu', icon: Mail }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col gap-1 p-3 hover:bg-slate-50 rounded-xl transition-all">
                            <span className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">{item.label}</span>
                            <div className="flex items-center gap-3">
                                <item.icon className={item.isWhatsApp ? "text-green-500" : "text-primary"} size={16} />
                                <span className="font-bold text-slate-900">{item.number}</span>
                            </div>
                        </div>
                    ))}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
