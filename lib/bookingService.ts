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
    roomPreference?: string
    // Contact Info for Guest/New Customers
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
}

export async function createBookingRequest(data: BookingRequestData) {
    try {
        const { data: { user } } = await supabase.auth.getUser()
        
        // 1. Identify or create customer via secure RPC
        const { data: customerId, error: customerError } = await supabase.rpc('get_or_create_customer_v1', {
            p_email: user?.email || data.email,
            p_first_name: data.firstName,
            p_last_name: data.lastName,
            p_phone: data.phone,
            p_user_id: user?.id
        })

        if (customerError) throw customerError

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
            tax_amount: 0, // Need to calculate tax if applicable
            activity_type: data.serviceCategory,
            activity_name: data.serviceName,
            description: data.roomPreference 
                ? `Room: ${data.roomPreference}. ${data.specialRequests || ''} Travelers: ${JSON.stringify(data.travelers)}`
                : data.specialRequests || `Travelers: ${JSON.stringify(data.travelers)}`,
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

        return { success: true, bookingId: bookingResponse?.id }
    } catch (error) {
        console.error('Booking failed:', error)
        return { success: false, error: (error as Error).message }
    }
}