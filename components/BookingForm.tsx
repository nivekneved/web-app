'use client'

import React, { useState } from 'react'
import { Send, User, Mail, Phone, Users, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'

export default function BookingForm({ packageTitle }: { packageTitle: string }) {
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setLoading(false)
        toast.success("Booking Request Sent!", {
            description: "We have received your request and will contact you shortly."
        })
        // potentially reset form here
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 sticky top-24">
            <h3 className="text-2xl font-black text-slate-900 mb-2">Book This Package</h3>
            <p className="text-slate-500 mb-6 text-sm">Send us a request for <span className="font-bold text-slate-900">{packageTitle}</span></p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-3.5 text-slate-400" size={18} />
                        <input
                            type="text"
                            required
                            placeholder="John Doe"
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-600 transition-all font-medium"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                        <input
                            type="email"
                            required
                            placeholder="john@example.com"
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-600 transition-all font-medium"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-3.5 text-slate-400" size={18} />
                        <input
                            type="tel"
                            required
                            placeholder="+230 5000 0000"
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-600 transition-all font-medium"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Travelers</label>
                    <div className="relative">
                        <Users className="absolute left-4 top-3.5 text-slate-400" size={18} />
                        <select className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-600 transition-all font-medium appearance-none">
                            <option>1 Traveler</option>
                            <option>2 Travelers</option>
                            <option>3 Travelers</option>
                            <option>4+ Travelers</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Special Requests</label>
                    <div className="relative">
                        <MessageSquare className="absolute left-4 top-3.5 text-slate-400" size={18} />
                        <textarea
                            rows={3}
                            placeholder="Any dietary requirements or preferences?"
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-600 transition-all font-medium resize-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? 'Sending...' : (
                        <>
                            Send Inquiry <Send size={18} />
                        </>
                    )}
                </button>
            </form>
        </div>
    )
}
