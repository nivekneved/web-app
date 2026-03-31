import React from 'react'
import { Send, User, Mail, Phone, Users, MessageSquare, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useSettings } from '@/contexts/SettingsContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const bookingSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(8, 'Please enter a valid phone number'),
    travelers: z.string(),
    message: z.string().optional()
})

type BookingFormData = z.infer<typeof bookingSchema>

export default function BookingForm({ packageTitle }: { packageTitle: string }) {
    const { generalConfig } = useSettings()
    const labels = generalConfig?.ui_labels || {}
    const placeholders = generalConfig?.form_placeholders || {}
    
    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors, isSubmitting } 
    } = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            travelers: '1 Traveler',
            message: ''
        }
    })

    const onSubmit = async () => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            
            toast.success("Booking Request Sent!", {
                description: "We have received your request and will contact you shortly."
            })
            reset()
        } catch {
            toast.error("Failed to send booking request.")
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 sticky top-24">
            <h3 className="text-2xl font-black text-slate-900 mb-2">{labels.book_package_title || 'Book This Package'}</h3>
            <p className="text-slate-500 mb-6 text-sm">{labels.send_request_prefix || 'Send us a request for'} <span className="font-bold text-slate-900">{packageTitle}</span></p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{labels.first_name || 'Full Name'}</label>
                    <div className="relative">
                        <User className="absolute left-4 top-3.5 text-slate-400" size={18} />
                        <input
                            type="text"
                            {...register('name')}
                            placeholder={placeholders.first_name || "John Doe"}
                            className={`w-full pl-12 pr-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 transition-all font-medium ${errors.name ? 'border-red-500' : 'border-slate-300'}`}
                        />
                    </div>
                    {errors.name && (
                        <p className="text-red-500 text-[10px] font-black uppercase flex items-center gap-1 mt-1 ml-1">
                            <AlertCircle size={10} /> {errors.name.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{labels.email_address || 'Email Address'}</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                        <input
                            type="email"
                            {...register('email')}
                            placeholder={placeholders.email_address || "john@example.com"}
                            className={`w-full pl-12 pr-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 transition-all font-medium ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-red-500 text-[10px] font-black uppercase flex items-center gap-1 mt-1 ml-1">
                            <AlertCircle size={10} /> {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{labels.phone_number || 'Phone Number'}</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-3.5 text-slate-400" size={18} />
                        <input
                            type="tel"
                            {...register('phone')}
                            placeholder={placeholders.phone_number || "Your active phone number"}
                            className={`w-full pl-12 pr-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 transition-all font-medium ${errors.phone ? 'border-red-500' : 'border-slate-300'}`}
                        />
                    </div>
                    {errors.phone && (
                        <p className="text-red-500 text-[10px] font-black uppercase flex items-center gap-1 mt-1 ml-1">
                            <AlertCircle size={10} /> {errors.phone.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{labels.travelers || 'Travelers'}</label>
                    <div className="relative">
                        <Users className="absolute left-4 top-3.5 text-slate-400" size={18} />
                        <select 
                            {...register('travelers')}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 transition-all font-medium appearance-none"
                        >
                            <option>{labels.one_traveler || '1 Traveler'}</option>
                            <option>{labels.two_travelers || '2 Travelers'}</option>
                            <option>{labels.three_travelers || '3 Travelers'}</option>
                            <option>{labels.four_plus_travelers || '4+ Travelers'}</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{labels.special_requests || 'Special Requests'}</label>
                    <div className="relative">
                        <MessageSquare className="absolute left-4 top-3.5 text-slate-400" size={18} />
                        <textarea
                            rows={3}
                            {...register('message')}
                            placeholder={placeholders.special_requests || "Any dietary requirements or preferences?"}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 transition-all font-medium resize-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (labels.submitting_btn || 'Sending...') : (
                        <>
                            {labels.send_inquiry_btn || 'Send Inquiry'} <Send size={18} />
                        </>
                    )}
                </button>
            </form>
        </div>
    )
}
