'use client'

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { 
  MapPin, 
  Calendar,
  Users,
  CheckCircle2, 
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Palmtree,
  Mountain,
  Cigarette as City,
  Ship,
  Heart,
  Briefcase,
  Phone,
  Mail,
  User
} from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const TRIP_TYPES = [
  { id: 'luxury', label: 'Luxury Escape', icon: Sparkles, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'beach', label: 'Beach Holiday', icon: Palmtree, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'adventure', label: 'Adventure', icon: Mountain, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'romantic', label: 'Honeymoon', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
  { id: 'business', label: 'Corporate', icon: Briefcase, color: 'text-slate-600', bg: 'bg-slate-50' },
  { id: 'cruise', label: 'Cruise Voyage', icon: Ship, color: 'text-sky-600', bg: 'bg-sky-50' },
  { id: 'city', label: 'City Break', icon: City, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 'family', label: 'Family Fun', icon: Users, color: 'text-orange-500', bg: 'bg-orange-50' },
];

const BUDGET_OPTIONS = [
  { label: 'Standard', range: 'Rs 15,000 - 30,000', per: 'per person' },
  { label: 'Quality', range: 'Rs 30,000 - 75,000', per: 'per person' },
  { label: 'Premium', range: 'Rs 75,000 - 150,000', per: 'per person' },
  { label: 'Luxury', range: 'Rs 150,000+', per: 'per person' },
];

export default function PlanMyTrip() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    tripType: '',
    departureDate: '',
    returnDate: '',
    adults: '2',
    children: '0',
    budget: '',
    accommodation: 'Boutique',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 4;
  const supabase = createClient();
  const formRef = useRef<HTMLDivElement>(null);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const submissionData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: `Plan My Trip Wizard - ${formData.destination} (${formData.tripType})`,
      message: `
        Trip Type: ${formData.tripType}
        Destination: ${formData.destination}
        Departure Date: ${formData.departureDate}
        Return Date: ${formData.returnDate}
        Adults: ${formData.adults}
        Children: ${formData.children}
        Budget Pref: ${formData.budget}
        Accommodation: ${formData.accommodation}
        Special Requests: ${formData.message}
      `.trim(),
      status: 'unread'
    };

    try {
      const { error } = await supabase.from('inquiries').insert([submissionData]);
      if (error) throw error;
      setStep(5); // Success step
      toast.success('Your dream trip has been sent to our designers!');
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="bg-[#fcfdff] min-h-screen pb-24">
      {/* Header Overlay */}
      <div className="relative h-[40vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"
          alt="Luxury Journey"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#fcfdff]" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-[0.4em]">
                Tailor-Made Excellence
            </span>
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none">
                Travel <span className="text-red-500">Designer.</span>
            </h1>
            <p className="text-white/70 font-medium max-w-xl mx-auto text-sm md:text-base">
                An expert curation of your perfect escape, hand-crafted by our concierge team.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden min-h-[600px] flex flex-col">
          
          {/* Progress Bar */}
          {step <= totalSteps && (
            <div className="h-2 w-full bg-slate-50 flex">
              <motion.div 
                className="h-full bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                initial={{ width: '0%' }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
              />
            </div>
          )}

          <div className="p-8 md:p-16 flex-grow flex flex-col items-center justify-center" ref={formRef}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full max-w-3xl space-y-12"
                >
                  <div className="text-center space-y-4">
                    <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em]">Step 01</h2>
                    <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">What&apos;s your travel mood?</h3>
                    <p className="text-slate-500 font-medium">Select the style of journey that matches your vision.</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {TRIP_TYPES.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => {
                          updateField('tripType', type.label);
                          nextStep();
                        }}
                        className={cn(
                          "group relative flex flex-col items-center gap-4 p-8 rounded-3xl border-2 transition-all duration-300 hover:shadow-xl",
                          formData.tripType === type.label 
                            ? "bg-white border-red-600 ring-4 ring-red-50" 
                            : "bg-white border-slate-50 hover:border-red-200"
                        )}
                      >
                        <div className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110",
                          type.bg, type.color
                        )}>
                          <type.icon size={28} />
                        </div>
                        <span className="text-xs font-black uppercase text-slate-900 tracking-wider text-center">{type.label}</span>
                        {formData.tripType === type.label && (
                          <div className="absolute top-3 right-3 text-red-600">
                             <CheckCircle2 size={16} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full max-w-xl space-y-12"
                >
                  <div className="text-center space-y-4">
                    <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em]">Step 02</h2>
                    <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Where and When?</h3>
                    <p className="text-slate-500 font-medium">Identify your destination and timing for this escape.</p>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Destination Area</label>
                        <div className="relative group">
                            <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-600 transition-colors" size={20} />
                            <input 
                                type="text" 
                                value={formData.destination}
                                onChange={(e) => updateField('destination', e.target.value)}
                                placeholder="Dubai, Europe, Tropical Island..."
                                className="w-full pl-16 pr-8 py-6 bg-slate-50 border border-slate-100 rounded-3xl focus:outline-none focus:ring-4 focus:ring-red-600/5 focus:bg-white font-bold text-lg text-slate-900 placeholder:text-slate-300 transition-all shadow-sm" 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Departure</label>
                            <div className="relative">
                                <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                                <input 
                                    type="date" 
                                    value={formData.departureDate}
                                    onChange={(e) => updateField('departureDate', e.target.value)}
                                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-600/5 focus:bg-white font-bold text-sm text-slate-900 transition-all appearance-none" 
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Return</label>
                            <div className="relative">
                                <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                                <input 
                                    type="date" 
                                    value={formData.returnDate}
                                    onChange={(e) => updateField('returnDate', e.target.value)}
                                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-600/5 focus:bg-white font-bold text-sm text-slate-900 transition-all appearance-none" 
                                />
                            </div>
                        </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-8">
                    <button onClick={prevStep} className="flex items-center gap-2 text-slate-400 font-black uppercase text-xs tracking-widest hover:text-red-600 transition-colors">
                      <ChevronLeft size={16} /> Back
                    </button>
                    <Button size="lg" onClick={nextStep} disabled={!formData.destination}>
                      Almost there <ChevronRight size={18} className="ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full max-w-3xl space-y-16"
                >
                  <div className="text-center space-y-4">
                    <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em]">Step 03</h2>
                    <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Details & Lifestyle</h3>
                    <p className="text-slate-500 font-medium">Who is joining and what&apos;s the comfort level?</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-3">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Adults</label>
                              <div className="relative">
                                  <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                  <select 
                                      value={formData.adults}
                                      onChange={(e) => updateField('adults', e.target.value)}
                                      className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-600/5 focus:bg-white font-black text-sm text-slate-900 transition-all appearance-none cursor-pointer"
                                  >
                                      {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n.toString()}>{n} Adults</option>)}
                                  </select>
                              </div>
                          </div>
                          <div className="space-y-3">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Children</label>
                              <div className="relative">
                                  <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                  <select 
                                      value={formData.children}
                                      onChange={(e) => updateField('children', e.target.value)}
                                      className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-600/5 focus:bg-white font-black text-sm text-slate-900 transition-all appearance-none cursor-pointer"
                                  >
                                      {[0,1,2,3,4,5,6].map(n => <option key={n} value={n.toString()}>{n} Children</option>)}
                                  </select>
                              </div>
                          </div>
                       </div>

                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Accommodation Style</label>
                          <div className="grid grid-cols-2 gap-3">
                            {['Quality', 'Elite', 'Boutique', 'All-Inclusive'].map((type) => (
                              <button
                                key={type}
                                onClick={() => updateField('accommodation', type)}
                                className={cn(
                                  "flex items-center justify-center p-4 rounded-xl border-2 font-black text-[10px] uppercase tracking-widest transition-all",
                                  formData.accommodation === type 
                                    ? "bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/20" 
                                    : "bg-white text-slate-400 border-slate-100 hover:border-red-200"
                                )}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                       </div>
                    </div>

                    <div className="space-y-6">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Estimated Budget Range</label>
                      <div className="space-y-3">
                         {BUDGET_OPTIONS.map((opt) => (
                           <button
                             key={opt.label}
                             onClick={() => updateField('budget', opt.label)}
                             className={cn(
                               "w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all",
                               formData.budget === opt.label 
                                 ? "bg-red-50/30 border-red-600 ring-4 ring-red-50/50" 
                                 : "bg-white border-slate-50 hover:border-slate-200"
                             )}
                           >
                             <div className="text-left">
                               <div className="text-xs font-black text-slate-900 uppercase tracking-widest">{opt.label}</div>
                               <div className="text-sm font-medium text-slate-400">{opt.range}</div>
                             </div>
                             <div className={cn(
                               "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                               formData.budget === opt.label ? "border-red-600 bg-red-600" : "border-slate-200"
                             )}>
                               {formData.budget === opt.label && <div className="w-2 h-2 bg-white rounded-full" />}
                             </div>
                           </button>
                         ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-8">
                    <button onClick={prevStep} className="flex items-center gap-2 text-slate-400 font-black uppercase text-xs tracking-widest hover:text-red-600 transition-colors">
                      <ChevronLeft size={16} /> Back
                    </button>
                    <Button size="lg" onClick={nextStep} disabled={!formData.budget}>
                      Finalize Details <ChevronRight size={18} className="ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  key="step4"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full max-w-xl space-y-12"
                >
                  <div className="text-center space-y-4">
                    <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em]">Step 04</h2>
                    <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Final Details</h3>
                    <p className="text-slate-500 font-medium">Connect with our Travel Designers to craft your itinerary.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <Input 
                         label="Full Name"
                         name="name"
                         icon={<User size={18} />}
                         value={formData.name}
                         onChange={(e) => updateField('name', e.target.value)}
                         placeholder="John Smith"
                       />
                       <Input 
                         label="Phone Number"
                         name="phone"
                         icon={<Phone size={18} />}
                         value={formData.phone}
                         onChange={(e) => updateField('phone', e.target.value)}
                         placeholder="+230"
                       />
                    </div>
                    <Input 
                      label="Email Address"
                      name="email"
                      type="email"
                      icon={<Mail size={18} />}
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="john@example.com"
                    />

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Anything else we should know?</label>
                      <textarea 
                        value={formData.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        placeholder="Dietary requirements, special celebrations, or mandatory bucket-list activities..."
                        className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-3xl focus:outline-none focus:ring-4 focus:ring-red-600/5 focus:bg-white font-bold text-sm text-slate-900 placeholder:text-slate-300 transition-all resize-none shadow-sm min-h-[150px]" 
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-8">
                    <button onClick={prevStep} className="flex items-center gap-2 text-slate-400 font-black uppercase text-xs tracking-widest hover:text-red-600 transition-colors">
                      <ChevronLeft size={16} /> Back
                    </button>
                    <Button 
                      size="xl" 
                      onClick={handleSubmit} 
                      disabled={!formData.name || !formData.email || isSubmitting}
                      isLoading={isSubmitting}
                      className="min-w-[200px] shadow-2xl shadow-red-600/20"
                    >
                      Design My Trip
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-8 py-12"
                >
                  <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-600/10">
                    <CheckCircle2 size={48} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-slate-900 tracking-tight">Vision Received!</h3>
                    <p className="text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
                      Our Travel Designers are now reviewing your request. Expect a personalized consultation within 24 hours.
                    </p>
                  </div>
                  <Button asChild variant="outline" size="lg">
                     <Link href="/">Back to Home</Link>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
                { title: 'Personal Concierge', desc: 'A dedicated travel expert assigned to your journey from start to finish.', icon: User },
                { title: 'Exclusive Access', desc: 'Secure reservations at places that are often marked "Fully Booked" elsewhere.', icon: Sparkles },
                { title: 'Seamless Routing', desc: 'Every transfer, flight, and stay perfectly timed for zero-stress movement.', icon: MapPin }
            ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-4 px-6"
                >
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-lg text-red-600 border border-slate-50">
                        <item.icon size={24} />
                    </div>
                    <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
