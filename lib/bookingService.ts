import { createClient } from './supabase'

const supabase = createClient()

export type BookingRequestData = {
    serviceId: string
    serviceName: string
    serviceCategory: string
    amount: number
    startDate: string
    endDate?: string
    paxAdults: number
    paxChildren: number
    travelers: Record<string, unknown>[]
    specialRequests?: string
}

export async function createBookingRequest(data: BookingRequestData) {
    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated')

        // 1. Ensure customer record exists (Bridge between Auth/Profile and Admin Customers)
        const { error: customerError } = await supabase
            .from('customers')
            .select('id')
            .eq('id', user.id)
            .single()

        if (customerError && customerError.code === 'PGRST116') {
            // Customer doesn't exist, fetch profile
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()

            if (profile) {
                const names = profile.name.split(' ')
                const firstName = names[0]
                const lastName = names.slice(1).join(' ') || 'User'

                const { error: insertError } = await supabase
                    .from('customers')
                    .insert([{
                        id: user.id,
                        first_name: firstName,
                        last_name: lastName,
                        email: profile.email,
                        phone: profile.phone,
                        status: 'active'
                    }])

                if (insertError) throw insertError
                // customer = newCustomer (assigned but never used in the flow below, but step 2 uses user.id)
            }
        } else if (customerError) {
            throw customerError
        }

        // 2. Create the main booking record
        const { data: booking, error: bookingError } = await supabase
            .from('bookings')
            .insert([{
                customer_id: user.id,
                activity_name: data.serviceName,
                activity_type: data.serviceCategory,
                start_date: data.startDate,
                end_date: data.endDate,
                amount: data.amount,
                total_amount: data.amount,
                pax_adults: data.paxAdults,
                pax_children: data.paxChildren,
                status: 'pending',
                payment_status: 'pending',
                description: data.specialRequests || `Travelers: ${JSON.stringify(data.travelers)}`
            }])
            .select()
            .single()

        if (bookingError) throw bookingError

        // 3. Create the booking item record
        const { error: itemError } = await supabase
            .from('booking_items')
            .insert([{
                booking_id: booking.id,
                service_id: data.serviceId,
                service_name: data.serviceName,
                service_category: data.serviceCategory,
                amount: data.amount
            }])

        if (itemError) throw itemError

        return { success: true, bookingId: booking.id }
    } catch (error) {
        console.error('Booking failed:', error)
        return { success: false, error: (error as Error).message }
    }
}
