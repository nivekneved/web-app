'use client'

import { useState, useEffect } from 'react'
import { Star, User } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'

const supabase = createClient()

type Review = {
    id: string
    customer_name: string
    rating: number
    comment: string
    created_at: string
    status: string
}

type ReviewsSectionProps = {
    serviceId: string
    serviceType: string
}

export default function ReviewsSection({ serviceId, serviceType }: ReviewsSectionProps) {
    const { user } = useAuth()
    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        loadReviews()
    }, [serviceId])

    async function loadReviews() {
        try {
            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .eq('service_id', serviceId)
                .eq('status', 'approved')
                .order('created_at', { ascending: false })
                .limit(10)

            if (error) throw error
            setReviews(data || [])
        } catch (error) {
            console.error('Error loading reviews:', error)
        } finally {
            setLoading(false)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!user) {
            toast.error('Please login to submit a review')
            return
        }

        setSubmitting(true)
        try {
            // Get user profile for name
            const { data: profile } = await supabase
                .from('profiles')
                .select('name')
                .eq('id', user.id)
                .single()

            const { error } = await supabase
                .from('reviews')
                .insert([{
                    service_id: serviceId,
                    service_type: serviceType,
                    customer_id: user.id,
                    customer_name: profile?.name || 'Anonymous',
                    rating,
                    comment,
                    status: 'pending'
                }])

            if (error) throw error

            toast.success('Review submitted! It will be visible after approval.')
            setComment('')
            setRating(5)
            setShowForm(false)
        } catch (error: any) {
            toast.error('Failed to submit review')
            console.error(error)
        } finally {
            setSubmitting(false)
        }
    }

    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : '0.0'

    return (
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-black text-slate-900">Reviews</h2>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                            <Star size={20} className="text-amber-600 fill-amber-600" />
                            <span className="text-xl font-bold text-slate-900">{averageRating}</span>
                        </div>
                        <span className="text-slate-500">({reviews.length} reviews)</span>
                    </div>
                </div>
                {user && !showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-slate-900 transition-all"
                    >
                        Write Review
                    </button>
                )}
            </div>

            {/* Review Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="mb-8 p-6 bg-slate-50 rounded-2xl">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Write Your Review</h3>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setRating(value)}
                                    className="p-2 hover:bg-white rounded-lg transition-colors"
                                >
                                    <Star
                                        size={24}
                                        className={value <= rating ? 'text-amber-600 fill-amber-600' : 'text-slate-300'}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Your Review</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            rows={4}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 focus:border-red-600 transition-all"
                            placeholder="Share your experience..."
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="px-6 py-3 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-slate-900 transition-all disabled:opacity-50"
                        >
                            {submitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </div>
                </form>
            )}

            {/* Reviews List */}
            {loading ? (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-red-600 border-t-transparent mx-auto"></div>
                </div>
            ) : reviews.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-slate-400 italic">No reviews yet. Be the first to review!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review.id} className="p-4 bg-slate-50 rounded-xl">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-full">
                                        <User size={20} className="text-slate-400" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900">{review.customer_name}</div>
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: review.rating }).map((_, i) => (
                                                <Star key={i} size={14} className="text-amber-600 fill-amber-600" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-sm text-slate-500">
                                    {new Date(review.created_at).toLocaleDateString()}
                                </div>
                            </div>
                            <p className="text-slate-700">{review.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
