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
    // Contact Info for Guest/New Customers
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
}

export async function createBookingRequest(data: BookingRequestData) {
    try {
        const { data: { user } } = await supabase.auth.getUser()
        
        let customerId: string | undefined

        if (user) {
            // 1a. Logged in user - Ensure customer record exists
            const { data: customer } = await supabase
                .from('customers')
                .select('id')
                .eq('id', user.id)
                .single()

            if (!customer) {
                // Fetch profile to sync
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('id, name, email, phone')
                    .eq('id', user.id)
                    .single()

                if (profile) {
                    const names = profile.name.split(' ')
                    const firstName = names[0]
                    const lastName = names.slice(1).join(' ') || 'User'

                    const { data: newCustomer, error: insertError } = await supabase
                        .from('customers')
                        .insert([{
                            id: user.id,
                            first_name: firstName,
                            last_name: lastName,
                            email: profile.email,
                            phone: profile.phone,
                            status: 'Active'
                        }])
                        .select()
                        .single()

                    if (insertError) throw insertError
                    customerId = newCustomer?.id
                } else {
                    customerId = user.id
                }
            } else {
                customerId = customer.id
            }
        } else {
            // 1b. Guest user - Use provided contact details
            if (!data.email) throw new Error('Email is required for guest booking')

            const { data: existingCustomer } = await supabase
                .from('customers')
                .select('id')
                .eq('email', data.email)
                .maybeSingle()

            if (existingCustomer) {
                customerId = existingCustomer.id
            } else {
                // Create new guest customer
                const { data: newGuest, error: guestError } = await supabase
                    .from('customers')
                    .insert([{
                        first_name: data.firstName || 'Guest',
                        last_name: data.lastName || 'User',
                        email: data.email,
                        phone: data.phone,
                        status: 'Lead'
                    }])
                    .select()
                    .single()

                if (guestError) throw guestError
                customerId = newGuest?.id
            }
        }

        if (!customerId) throw new Error('Could not identify or create customer')

        // 2. Prepare data for the transactional RPC
        const bookingData = {
            customer_id: customerId,
            start_date: data.startDate,
            end_date: data.endDate,
            status: 'pending',
            pax_adults: data.paxAdults,
            pax_children: data.paxChildren,
            amount: data.amount,
            total_amount: data.amount,
            activity_type: data.serviceCategory,
            activity_name: data.serviceName,
            description: data.specialRequests || `Travelers: ${JSON.stringify(data.travelers)}`,
            created_at: new Date().toISOString()
        }

        const itemsData = [{
            service_id: data.serviceId,
            service_name: data.serviceName,
            service_category: data.serviceCategory,
            amount: data.amount
        }]

        // 3. Execute transactional creation via RPC
        const { data: bookingResponse, error: rpcError } = await supabase.rpc('create_booking_v1', {
            p_booking_data: bookingData,
            p_items_data: itemsData
        })

        if (rpcError) throw rpcError

        // The RPC returns { id: ... } or similar if successful, depending on its definition
        // Let's assume it returns the created booking ID or use the data if returned.
        // Based on Admin-app usage, it doesn't seem to capture the return value but we want the ID if possible.
        // If the RPC doesn't return the ID, we might need to fetch it or modify the RPC later.
        // For now, we follow the pattern of the RPC usage.

        return { success: true, bookingId: bookingResponse?.id }
    } catch (error) {
        console.error('Booking failed:', error)
        return { success: false, error: (error as Error).message }
    }
}
