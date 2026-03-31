'use client'

import React from 'react'
import { useSettings } from '@/contexts/SettingsContext'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { AlertCircle, Plus, Trash2, Calendar, Users, Mail, Phone, MessageSquare, Utensils, Home, ChevronRight, ChevronLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const travelerSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(8, 'Phone number is required'),
    mobile: z.string().default(''),
    age: z.number().optional(),
    passportNumber: z.string().default('')
})

const bookingSchema = z.object({
    checkIn: z.string().min(1, 'Check-in date is required'),
    checkOut: z.string().min(1, 'Check-out date is required'),
    guests: z.number().min(1).max(20),
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(8, 'Phone number is required'),
    mobile: z.string().default(''),
    notes: z.string().default(''),
    travelers: z.array(travelerSchema).default([]),
    mealPreference: z.string().default('none'),
    roomPreference: z.string().default('standard')
}).refine((data) => {
    const start = new Date(data.checkIn)
    const end = new Date(data.checkOut)
    return end > start
}, {
    message: "Check-out date must be after check-in date",
    path: ["checkOut"]
})

export type BookingWizardData = z.infer<typeof bookingSchema>



type BookingWizardProps = {
    serviceId: string
    serviceName: string
    servicePrice: number
    serviceCategory: string
    onComplete: (data: BookingWizardData) => void
    isLoading?: boolean
    initialData?: Partial<BookingWizardData>
    roomOptions?: (string | { type: string, min_stay?: number })[]
    showRoomSelection?: boolean
}

export default function BookingWizard({ 
    serviceName, 
    servicePrice, 
    onComplete, 
    isLoading, 
    initialData, 
    roomOptions, 
    showRoomSelection = true 
}: BookingWizardProps) {
    const { generalConfig } = useSettings()
    const labels = generalConfig?.ui_labels || {}
    const placeholders = generalConfig?.form_placeholders || {}
    const [currentStep, setCurrentStep] = React.useState<number>(1)

    const form = useForm<BookingWizardData>({
        resolver: zodResolver(bookingSchema) as any,
        defaultValues: {
            checkIn: initialData?.checkIn || '',
            checkOut: initialData?.checkOut || '',
            guests: initialData?.guests || 1,
            firstName: initialData?.firstName || '',
            lastName: initialData?.lastName || '',
            email: initialData?.email || '',
            phone: initialData?.phone || '',
            mobile: initialData?.mobile || '',
            notes: initialData?.notes || '',
            travelers: initialData?.travelers || [],
            mealPreference: initialData?.mealPreference || 'none',
            roomPreference: initialData?.roomPreference || (roomOptions && roomOptions.length > 0
                ? (typeof roomOptions[0] === 'string' ? roomOptions[0] : roomOptions[0].type)
                : (showRoomSelection ? 'standard' : 'standard'))
        }
    })

    const { 
        register, 
        control, 
        handleSubmit, 
        trigger, 
        watch,
        formState: { errors } 
    } = form

    const { fields, append, remove } = useFieldArray({
        control,
        name: "travelers"
    })

    const watchAllFields = watch()

    const validateStep = async (step: number) => {
        let fieldsToValidate: any[] = []
        if (step === 1) {
            fieldsToValidate = ['checkIn', 'checkOut', 'guests', 'firstName', 'lastName', 'email', 'phone']
        } else if (step === 2) {
            fieldsToValidate = ['travelers']
        } else if (step === 3) {
            fieldsToValidate = ['mealPreference', 'roomPreference']
        }

        const result = await trigger(fieldsToValidate)
        
        // Special logic for min_stay if it's step 1
        if (step === 1 && result) {
            const start = new Date(watchAllFields.checkIn)
            const end = new Date(watchAllFields.checkOut)
            const diffDays = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

            const selectedRoomName = watchAllFields.roomPreference
            const roomConfig = roomOptions?.find(opt => 
                typeof opt === 'string' ? opt === selectedRoomName : opt.type === selectedRoomName
            )

            if (roomConfig && typeof roomConfig !== 'string' && roomConfig.min_stay && roomConfig.min_stay > 1) {
                if (diffDays < roomConfig.min_stay) {
                    alert(`This room requires a minimum stay of ${roomConfig.min_stay} nights. Your selection is ${diffDays} nights.`)
                    return false
                }
            }
        }

        return result
    }

    const nextStep = async () => {
        if (await validateStep(currentStep)) {
            if (currentStep < 4) setCurrentStep((prev) => (prev + 1))
        }
    }

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep((prev) => (prev - 1))
    }

    const onSubmit = (data: BookingWizardData) => {
        onComplete(data)
    }

    return (
        <div className="w-full">
            {/* Progress Steps */}
            <div className="mb-12">
                <div className="flex items-center justify-between">
                    {[
                        { num: 1, label: labels.dates_guests || 'Dates & Guests', icon: Calendar },
                        { num: 2, label: labels.traveler_details_label || 'Travelers', icon: Users },
                        { num: 3, label: labels.preferences || 'Preferences', icon: Utensils },
                        { num: 4, label: labels.review || 'Review', icon: Home }
                    ].map((step, idx) => (
                        <React.Fragment key={step.num}>
                            <div className="flex flex-col items-center flex-1 relative">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all shadow-lg ${currentStep >= step.num
                                        ? 'bg-red-600 text-white scale-110'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                    }`}>
                                    <step.icon size={20} />
                                </div>
                                <span className={`text-[10px] mt-3 font-black uppercase tracking-widest ${currentStep >= step.num ? 'text-red-600' : 'text-slate-400'}`}>
                                    {step.label}
                                </span>
                            </div>
                            {idx < 3 && (
                                <div className={`flex-[0.5] h-[2px] mt-6 rounded transition-all ${currentStep > step.num ? 'bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'bg-slate-200 dark:bg-slate-700'
                                    }`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <form onSubmit={handleSubmit(onSubmit as any)} className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentStep === 1 && (
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                                        {labels.complete_reservation || 'Complete Your Reservation'}
                                    </h2>
                                    <p className="text-slate-500 font-medium">Please provide your booking and contact details.</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{labels.check_in || 'Check-in'}</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600" size={18} />
                                            <input
                                                type="date"
                                                {...register('checkIn')}
                                                className={`w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border ${errors.checkIn ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-2xl focus:ring-4 focus:ring-red-600/10 outline-none transition-all font-bold dark:text-white`}
                                            />
                                        </div>
                                        {errors.checkIn && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1"><AlertCircle size={10} /> {errors.checkIn.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{labels.check_out || 'Check-out'}</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600" size={18} />
                                            <input
                                                type="date"
                                                {...register('checkOut')}
                                                className={`w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border ${errors.checkOut ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-2xl focus:ring-4 focus:ring-red-600/10 outline-none transition-all font-bold dark:text-white`}
                                            />
                                        </div>
                                        {errors.checkOut && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1"><AlertCircle size={10} /> {errors.checkOut.message}</p>}
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{labels.number_of_guests || 'Guests'}</label>
                                        <div className="relative">
                                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600" size={18} />
                                            <input
                                                type="number"
                                                min="1"
                                                {...register('guests', { valueAsNumber: true })}
                                                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-red-600/10 outline-none transition-all font-bold dark:text-white"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">First Name</label>
                                        <input
                                            {...register('firstName')}
                                            placeholder={placeholders.first_name || 'First Name'}
                                            className={`w-full px-6 py-4 bg-slate-100 dark:bg-slate-800 border ${errors.firstName ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-2xl focus:ring-4 focus:ring-red-600/10 outline-none transition-all font-bold dark:text-white`}
                                        />
                                        {errors.firstName && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1"><AlertCircle size={10} /> {errors.firstName.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Last Name</label>
                                        <input
                                            {...register('lastName')}
                                            placeholder={placeholders.last_name || 'Last Name'}
                                            className={`w-full px-6 py-4 bg-slate-100 dark:bg-slate-800 border ${errors.lastName ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-2xl focus:ring-4 focus:ring-red-600/10 outline-none transition-all font-bold dark:text-white`}
                                        />
                                        {errors.lastName && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1"><AlertCircle size={10} /> {errors.lastName.message}</p>}
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="email"
                                                {...register('email')}
                                                placeholder={placeholders.email_address || 'Email'}
                                                className={`w-full pl-16 pr-6 py-4 bg-slate-100 dark:bg-slate-800 border ${errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-2xl focus:ring-4 focus:ring-red-600/10 outline-none transition-all font-bold dark:text-white`}
                                            />
                                        </div>
                                        {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1"><AlertCircle size={10} /> {errors.email.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Phone</label>
                                        <div className="relative">
                                            <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="tel"
                                                {...register('phone')}
                                                placeholder={placeholders.phone_number || 'Phone'}
                                                className={`w-full pl-16 pr-6 py-4 bg-slate-100 dark:bg-slate-800 border ${errors.phone ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-2xl focus:ring-4 focus:ring-red-600/10 outline-none transition-all font-bold dark:text-white`}
                                            />
                                        </div>
                                        {errors.phone && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1"><AlertCircle size={10} /> {errors.phone.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Mobile (Optional)</label>
                                        <input
                                            type="tel"
                                            {...register('mobile')}
                                            placeholder={placeholders.phone_number || 'Mobile'}
                                            className="w-full px-6 py-4 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-red-600/10 outline-none transition-all font-bold dark:text-white"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Additional Notes</label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-6 top-6 text-slate-400" size={18} />
                                            <textarea
                                                {...register('notes')}
                                                rows={3}
                                                placeholder={placeholders.special_requests || "Special requirements..."}
                                                className="w-full pl-16 pr-6 py-6 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[2rem] focus:ring-4 focus:ring-red-600/10 outline-none transition-all font-bold dark:text-white resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">{labels.traveler_information || 'Travelers'}</h2>
                                        <p className="text-slate-500 font-medium">Add details for everyone traveling with you.</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => append({ firstName: '', lastName: '', email: '', phone: '', mobile: '', passportNumber: '' })}
                                        className="h-14 px-8 bg-red-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-900 transition-all shadow-[0_10px_20px_rgba(220,38,38,0.2)] flex items-center gap-2"
                                    >
                                        <Plus size={16} /> {labels.add_traveler_btn || 'Add Traveler'}
                                    </button>
                                </div>

                                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                                    {fields.length === 0 && (
                                        <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem]">
                                            <Users className="mx-auto text-slate-200 dark:text-slate-800 mb-4" size={48} />
                                            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No additional travelers added</p>
                                        </div>
                                    )}
                                    {fields.map((item, index) => (
                                        <motion.div 
                                            key={item.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 relative group"
                                        >
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-black text-xs">
                                                        {index + 1}
                                                    </div>
                                                    <h3 className="font-black text-slate-900 dark:text-white uppercase text-[10px] tracking-widest">Additional Traveler</h3>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <input
                                                    {...register(`travelers.${index}.firstName` as const)}
                                                    placeholder="First Name"
                                                    className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-red-600/10 outline-none transition-all font-bold dark:text-white"
                                                />
                                                <input
                                                    {...register(`travelers.${index}.lastName` as const)}
                                                    placeholder="Last Name"
                                                    className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-red-600/10 outline-none transition-all font-bold dark:text-white"
                                                />
                                                <input
                                                    {...register(`travelers.${index}.email` as const)}
                                                    placeholder="Email"
                                                    className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-red-600/10 outline-none transition-all font-bold dark:text-white"
                                                />
                                                <input
                                                    {...register(`travelers.${index}.phone` as const)}
                                                    placeholder="Phone"
                                                    className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-red-600/10 outline-none transition-all font-bold dark:text-white"
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="space-y-12">
                                <div className="space-y-1 text-center">
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white">{labels.your_preferences || 'Your Preferences'}</h2>
                                    <p className="text-slate-500 font-medium">Fine-tune your experience for maximum comfort.</p>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block text-center">{labels.meal_preference || 'Meal Preference'}</label>
                                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                                            {['none', 'vegetarian', 'vegan', 'halal', 'kosher'].map((pref) => (
                                                <label key={pref} className="cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        value={pref}
                                                        {...register('mealPreference')}
                                                        className="peer hidden"
                                                    />
                                                    <div className="h-full px-4 py-8 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent peer-checked:border-red-600 peer-checked:bg-white dark:peer-checked:bg-slate-800 rounded-3xl transition-all text-center">
                                                        <span className="block font-black text-slate-400 peer-checked:text-slate-900 dark:peer-checked:text-white text-[10px] uppercase tracking-widest">{pref}</span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {showRoomSelection && (
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block text-center">{labels.room_type || 'Room Preference'}</label>
                                            <select
                                                {...register('roomPreference')}
                                                className="w-full px-8 py-6 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-red-600/10 outline-none transition-all font-black text-xl text-center dark:text-white"
                                            >
                                            {roomOptions && roomOptions.length > 0 ? (
                                                roomOptions.map(opt => {
                                                    const value = typeof opt === 'string' ? opt : opt.type
                                                    const label = typeof opt === 'string' ? opt : `${opt.type} ${opt.min_stay && opt.min_stay > 1 ? `(${opt.min_stay} nights min)` : ''}`
                                                    return <option key={value} value={value}>{label}</option>
                                                })
                                            ) : (
                                                <>
                                                    <option value="standard">Standard Room</option>
                                                    <option value="deluxe">Deluxe Room</option>
                                                    <option value="suite">Suite</option>
                                                    <option value="connecting">Connecting Rooms</option>
                                                </>
                                            )}
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="space-y-10">
                                <div className="space-y-1 text-center">
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white">{labels.review_booking || 'Review & Confirm'}</h2>
                                    <p className="text-slate-500 font-medium">Please review your journey details before submitting.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-10 bg-slate-900 text-white rounded-[3rem] space-y-6 shadow-2xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl -mr-16 -mt-16" />
                                        <div className="relative space-y-6">
                                            <div className="space-y-1">
                                                <h3 className="text-xs font-black text-red-600 uppercase tracking-widest">Service</h3>
                                                <p className="text-2xl font-black leading-tight">{serviceName}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-8">
                                                <div className="space-y-1">
                                                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Check-in</h3>
                                                    <p className="font-bold text-lg">{watchAllFields.checkIn}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Check-out</h3>
                                                    <p className="font-bold text-lg">{watchAllFields.checkOut}</p>
                                                </div>
                                            </div>
                                            <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Investment</span>
                                                <span className="text-3xl font-black text-red-600">Rs {servicePrice.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-10 bg-slate-50 dark:bg-slate-800 rounded-[3rem] space-y-6 border border-slate-100 dark:border-slate-800">
                                        <div className="space-y-4">
                                            <div className="space-y-1">
                                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Guest</h3>
                                                <p className="font-black text-slate-900 dark:text-white uppercase leading-tight">{watchAllFields.firstName} {watchAllFields.lastName}</p>
                                                <p className="text-slate-500 font-medium text-sm">{watchAllFields.email}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Group Composition</h3>
                                                <p className="font-black text-slate-900 dark:text-white uppercase tracking-tighter">{watchAllFields.guests} Adults / {fields.length} Additional Travelers</p>
                                            </div>
                                            {watchAllFields.notes && (
                                                <div className="space-y-1">
                                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Special Notes</h3>
                                                    <p className="text-slate-500 text-sm italic">&ldquo;{watchAllFields.notes}&rdquo;</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-12">
                    {currentStep > 1 && (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="h-16 flex-1 px-8 border-2 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                        >
                            <ChevronLeft size={16} /> {labels.prev_btn || 'Back'}
                        </button>
                    )}
                    {currentStep < 4 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="h-16 flex-[2] px-8 bg-red-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-900 transition-all shadow-[0_20px_40px_rgba(220,38,38,0.2)] flex items-center justify-center gap-2"
                        >
                            {labels.next_btn || 'Continue'} <ChevronRight size={16} />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="h-16 flex-[2] px-8 bg-red-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-900 transition-all shadow-[0_20px_40px_rgba(220,38,38,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (labels.submitting_btn || 'Processing...') : (labels.submit_booking_btn || 'Confirm Reservation')}
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}
