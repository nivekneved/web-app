'use client'

import React from 'react'

type TravelerDetails = {
    firstName: string
    lastName: string
    email: string
    phone: string
    mobile?: string
    age?: number
    passportNumber?: string
}

type BookingWizardStep = 1 | 2 | 3 | 4

type BookingWizardProps = {
    serviceId: string
    serviceName: string
    servicePrice: number
    serviceCategory: string
    onComplete: (data: BookingWizardData) => void
    isLoading?: boolean
    initialData?: Partial<BookingWizardData>
    roomOptions?: string[]
    showRoomSelection?: boolean
}

export type BookingWizardData = {
    checkIn: string
    checkOut: string
    guests: number
    firstName: string
    lastName: string
    email: string
    phone: string
    mobile: string
    notes: string
    travelers: TravelerDetails[]
    mealPreference?: string
    roomPreference?: string
}

export default function BookingWizard({ serviceName, servicePrice, onComplete, isLoading, initialData, roomOptions, showRoomSelection = true }: BookingWizardProps) {
    const [currentStep, setCurrentStep] = React.useState<BookingWizardStep>(1)
    const [formData, setFormData] = React.useState<BookingWizardData>({
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
        roomPreference: initialData?.roomPreference || (roomOptions && roomOptions.length > 0 ? roomOptions[0] : (showRoomSelection ? 'standard' : undefined))
    })

    function updateFormData(updates: Partial<BookingWizardData>) {
        setFormData(prev => ({ ...prev, ...updates }))
    }

    function updateTraveler(index: number, updates: Partial<TravelerDetails>) {
        const updated = [...formData.travelers]
        updated[index] = { ...updated[index], ...updates }
        setFormData(prev => ({ ...prev, travelers: updated }))
    }

    function addTraveler() {
        setFormData(prev => ({
            ...prev,
            travelers: [...prev.travelers, { firstName: '', lastName: '', email: '', phone: '' }]
        }))
    }

    function removeTraveler(index: number) {
        setFormData(prev => ({
            ...prev,
            travelers: prev.travelers.filter((_, i) => i !== index)
        }))
    }

    function nextStep() {
        if (currentStep < 4) setCurrentStep((currentStep + 1) as BookingWizardStep)
    }

    function prevStep() {
        if (currentStep > 1) setCurrentStep((currentStep - 1) as BookingWizardStep)
    }

    function handleSubmit() {
        onComplete(formData)
    }

    return (
        <div className="w-full">
            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    {[
                        { num: 1, label: 'Dates & Guests' },
                        { num: 2, label: 'Traveler Details' },
                        { num: 3, label: 'Preferences' },
                        { num: 4, label: 'Review' }
                    ].map((step, idx) => (
                        <React.Fragment key={step.num}>
                            <div className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= step.num
                                        ? 'bg-red-600 text-white'
                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                                    }`}>
                                    {step.num}
                                </div>
                                <span className="text-xs mt-2 font-medium text-slate-600 dark:text-slate-400">{step.label}</span>
                            </div>
                            {idx < 3 && (
                                <div className={`flex-1 h-1 mx-2 rounded transition-all ${currentStep > step.num ? 'bg-red-600' : 'bg-slate-200 dark:bg-slate-700'
                                    }`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-8 md:p-12 border border-slate-200 dark:border-slate-700 shadow-sm">
                {/* Step 1: Booking Details */}
                {currentStep === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Complete Your Reservation</h2>
                        
                        <div className="grid grid-cols-2 gap-4 p-6 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Check-in</label>
                                <input
                                    type="date"
                                    value={formData.checkIn}
                                    onChange={(e) => updateFormData({ checkIn: e.target.value })}
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Check-out</label>
                                <input
                                    type="date"
                                    value={formData.checkOut}
                                    onChange={(e) => updateFormData({ checkOut: e.target.value })}
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 dark:text-white"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Number of Guests</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={formData.guests}
                                    onChange={(e) => updateFormData({ guests: parseInt(e.target.value) })}
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">First Name</label>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={(e) => updateFormData({ firstName: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={(e) => updateFormData({ lastName: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 dark:text-white"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => updateFormData({ email: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={(e) => updateFormData({ phone: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Mobile</label>
                                <input
                                    type="tel"
                                    placeholder="Mobile"
                                    value={formData.mobile}
                                    onChange={(e) => updateFormData({ mobile: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 dark:text-white"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Notes</label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => updateFormData({ notes: e.target.value })}
                                    rows={3}
                                    placeholder="Any special requirements or messages for the host..."
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Traveler Details */}
                {currentStep === 2 && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Traveler Information</h2>
                            <button
                                onClick={addTraveler}
                                className="px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-slate-900 transition-all text-sm"
                            >
                                + Add Traveler
                            </button>
                        </div>
                        {formData.travelers.map((traveler, idx) => (
                            <div key={idx} className="p-6 bg-slate-50 dark:bg-slate-700 rounded-2xl space-y-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-slate-900 dark:text-white">Traveler {idx + 1}</h3>
                                    {idx > 0 && (
                                        <button
                                            onClick={() => removeTraveler(idx)}
                                            className="text-red-600 text-sm font-medium hover:underline"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        value={traveler.firstName}
                                        onChange={(e) => updateTraveler(idx, { firstName: e.target.value })}
                                        className="px-4 py-3 bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 dark:text-white"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        value={traveler.lastName}
                                        onChange={(e) => updateTraveler(idx, { lastName: e.target.value })}
                                        className="px-4 py-3 bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 dark:text-white"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={traveler.email}
                                        onChange={(e) => updateTraveler(idx, { email: e.target.value })}
                                        className="px-4 py-3 bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 dark:text-white"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone"
                                        value={traveler.phone}
                                        onChange={(e) => updateTraveler(idx, { phone: e.target.value })}
                                        className="px-4 py-3 bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 dark:text-white"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Step 3: Preferences */}
                {currentStep === 3 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Your Preferences</h2>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Meal Preference</label>
                            <select
                                value={formData.mealPreference}
                                onChange={(e) => updateFormData({ mealPreference: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 dark:text-white"
                            >
                                <option value="none">No Preference</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="vegan">Vegan</option>
                                <option value="halal">Halal</option>
                                <option value="kosher">Kosher</option>
                            </select>
                        </div>
                        {showRoomSelection && (
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Room Type</label>
                                <select
                                    value={formData.roomPreference}
                                    onChange={(e) => updateFormData({ roomPreference: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 dark:text-white font-bold"
                                >
                                    {roomOptions && roomOptions.length > 0 ? (
                                        roomOptions.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))
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
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Review Your Booking</h2>
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{serviceName}</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400">
                                    <div><strong>Check-in:</strong> {formData.checkIn}</div>
                                    <div><strong>Check-out:</strong> {formData.checkOut}</div>
                                    <div><strong>Guests:</strong> {formData.guests}</div>
                                    <div><strong>Travelers:</strong> {formData.travelers.length + 1}</div>
                                    <div className="col-span-2 border-t border-slate-200 dark:border-slate-600 pt-2 mt-2">
                                        <strong>Primary Contact:</strong> {formData.firstName} {formData.lastName} ({formData.email})
                                    </div>
                                    {formData.notes && (
                                        <div className="col-span-2 italic">
                                            <strong>Notes:</strong> {formData.notes}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-slate-900 dark:text-white">Total Amount</span>
                                    <span className="text-2xl font-black text-red-600">Rs {servicePrice.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-8">
                    {currentStep > 1 && (
                        <button
                            onClick={prevStep}
                            className="flex-1 px-6 py-4 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                        >
                            Previous
                        </button>
                    )}
                    {currentStep < 4 ? (
                        <button
                            onClick={nextStep}
                            className="flex-1 px-6 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-slate-900 transition-all"
                        >
                            Next Step
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="flex-1 px-6 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-slate-900 transition-all disabled:opacity-50"
                        >
                            {isLoading ? 'Submitting...' : 'Submit Booking Request'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
