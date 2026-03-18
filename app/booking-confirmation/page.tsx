'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Home, User } from 'lucide-react'
import { Suspense } from 'react'

function BookingConfirmationContent() {
    const searchParams = useSearchParams()
    const bookingId = searchParams.get('id') || 'XXXXXXXX'
    const serviceName = searchParams.get('service') || 'Service'
    const amount = searchParams.get('amount') || '0'

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-2xl w-full">
                {/* Success Card */}
                <div className="bg-white rounded-[3rem] p-12 text-center shadow-xl border border-slate-100">
                    {/* Success Icon */}
                    <div className="mb-6 inline-block p-6 bg-emerald-50 rounded-full">
                        <CheckCircle size={64} className="text-emerald-600" />
                    </div>

                    {/* Success Message */}
                    <h1 className="text-4xl font-black text-slate-900 mb-3">Booking Request Received!</h1>
                    <p className="text-lg text-slate-600 mb-8">
                        Your booking request for <span className="font-bold text-slate-900">{serviceName}</span> has been successfully submitted.
                    </p>

                    {/* Booking Details */}
                    <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left">
                        <h2 className="text-lg font-black text-slate-900 mb-4">Booking Details</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-slate-600">Booking ID:</span>
                                <span className="font-bold text-slate-900">{bookingId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Service:</span>
                                <span className="font-bold text-slate-900">{serviceName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Total Amount:</span>
                                <span className="font-bold text-emerald-600 text-xl">Rs {parseInt(amount).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-8 text-left">
                        <p className="text-sm text-red-900">
                            <strong>What&apos;s Next?</strong><br />
                            Our team has received your request and will review the details. You will receive a notification once the booking is processed. For any offline payment arrangements, our concierge team will contact you directly within the next 24 hours.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/dashboard"
                            className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-red-600 transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            <User size={20} />
                            View My Bookings
                        </Link>
                        <Link
                            href="/"
                            className="px-8 py-4 border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                        >
                            <Home size={20} />
                            Back to Home
                        </Link>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center text-sm text-slate-500">
                    Need help? <Link href="/contact" className="text-red-600 font-bold hover:underline">Contact Support</Link>
                </div>
            </div>
        </div>
    )
}

export default function BookingConfirmationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
            </div>
        }>
            <BookingConfirmationContent />
        </Suspense>
    )
}
