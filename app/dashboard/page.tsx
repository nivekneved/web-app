'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Mail, Calendar, MapPin, LogOut, BookOpen } from 'lucide-react'
import { toast } from 'sonner'

const supabase = createClient()

type Booking = {
    id: string
    service_type: string
    service_name: string
    check_in_date: string
    check_out_date: string
    total_price: number
    status: string
    created_at: string
}

type Profile = {
    id: string
    name: string
    email: string
    phone?: string
    created_at: string
}

export default function DashboardPage() {
    const { user, loading: authLoading, signOut } = useAuth()
    const router = useRouter()
    const [profile, setProfile] = useState<Profile | null>(null)
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadProfile() {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('id, name, email, phone, created_at')
                    .eq('id', user?.id)
                    .single()

                if (error) throw error
                setProfile(data)
            } catch (error) {
                console.error('Error loading profile:', error)
            }
        }

        async function loadBookings() {
            try {
                const { data, error } = await supabase
                    .from('bookings')
                    .select('id, service_type, service_name, check_in_date, check_out_date, total_price, status, created_at')
                    .eq('customer_id', user?.id)
                    .order('created_at', { ascending: false })

                if (error) throw error
                setBookings(data || [])
            } catch (error) {
                console.error('Error loading bookings:', error)
            } finally {
                setLoading(false)
            }
        }

        if (!authLoading && !user) {
            router.push('/login')
        } else if (user) {
            loadProfile()
            loadBookings()
        }
    }, [user, authLoading, router])

    async function handleSignOut() {
        await signOut()
        toast.success('Signed out successfully')
        router.push('/')
    }

    if (authLoading || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
            </div>
        )
    }

    if (!user) return null

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 mb-2">My Dashboard</h1>
                        <p className="text-slate-500 font-medium">Welcome back, {profile?.name || 'Traveler'}!</p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-red-600 transition-all shadow-lg"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 bg-red-50 rounded-2xl">
                                <User size={32} className="text-red-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Profile</h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Name</div>
                                <div className="text-slate-900 font-bold">{profile?.name || 'N/A'}</div>
                            </div>

                            <div>
                                <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                                    <Mail size={12} />
                                    Email
                                </div>
                                <div className="text-slate-900 font-medium">{profile?.email || user.email}</div>
                            </div>

                            {profile?.phone && (
                                <div>
                                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Phone</div>
                                    <div className="text-slate-900 font-medium">{profile.phone}</div>
                                </div>
                            )}

                            <div>
                                <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                                    <Calendar size={12} />
                                    Member Since
                                </div>
                                <div className="text-slate-900 font-medium">
                                    {new Date(profile?.created_at || user.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bookings */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-blue-50 rounded-xl">
                                    <BookOpen size={24} className="text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900">My Bookings</h2>
                            </div>

                            {bookings.length === 0 ? (
                                <div className="text-center py-12">
                                    <MapPin size={48} className="mx-auto text-slate-300 mb-4" />
                                    <p className="text-slate-400 text-lg mb-4">No bookings yet</p>
                                    <Link
                                        href="/hotels"
                                        className="inline-block px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-slate-900 transition-all"
                                    >
                                        Start Exploring
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {bookings.map((booking) => (
                                        <div key={booking.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <div className="font-black text-slate-900 text-lg capitalize">
                                                        {booking.service_type} - {booking.service_name || 'N/A'}
                                                    </div>
                                                    <div className="text-sm text-slate-600 flex items-center gap-2 mt-1">
                                                        <Calendar size={14} />
                                                        {new Date(booking.check_in_date).toLocaleDateString()} - {new Date(booking.check_out_date).toLocaleDateString()}
                                                    </div>
                                                </div>
                                                <div className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' :
                                                    booking.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                                                        'bg-slate-100 text-slate-700'
                                                    }`}>
                                                    {booking.status}
                                                </div>
                                            </div>
                                            <div className="text-2xl font-black text-slate-900 mt-2">
                                                Rs {booking.total_price?.toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
