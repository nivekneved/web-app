'use server'

import { sendTemplatedEmail } from './emailService'

/**
 * Server Action to trigger email notifications after successful bookings
 */
export async function notifyBookingSuccess(data: {
    email: string
    customerName: string
    bookingId: string
    serviceName: string
    amount: number
}) {
    // 1. Send Confirmation to Customer
    const customerResult = await sendTemplatedEmail({
        to: data.email,
        templateName: 'booking_confirmation',
        variables: {
            customer_name: data.customerName,
            booking_id: data.bookingId,
            service_name: data.serviceName,
            amount: data.amount,
            currency: 'MUR'
        }
    })

    // 2. Send Notification to Admin
    const adminResult = await sendTemplatedEmail({
        to: process.env.MAIL_FROM_EMAIL || 'admin@travellounge.mu',
        templateName: 'admin_new_booking',
        variables: {
            customer_name: data.customerName,
            booking_id: data.bookingId,
            service_name: data.serviceName,
            amount: data.amount,
            customer_email: data.email
        }
    })

    return { 
        customerNotified: customerResult.success, 
        adminNotified: adminResult.success 
    }
}

/**
 * Server Action for Inquiry notifications
 */
export async function notifyInquiryReceived(data: {
    email: string
    customerName: string
    serviceName: string
}) {
    return await sendTemplatedEmail({
        to: data.email,
        templateName: 'inquiry_received',
        variables: {
            customer_name: data.customerName,
            service_name: data.serviceName
        }
    })
}

/**
 * Server Action for Newsletter subscription welcome
 */
export async function notifySubscriptionWelcome(email: string) {
    return await sendTemplatedEmail({
        to: email,
        templateName: 'subscription_welcome',
        variables: {
            customer_email: email
        }
    })
}
