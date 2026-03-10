'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'
import { Calendar } from 'lucide-react'

const supabase = createClient()

type Post = {
    id: string
    title: string
    slug: string
    excerpt: string
    featured_image: string | null
    published_at: string
    tags: string[]
}

export default function NewsPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadPosts()
    }, [])

    async function loadPosts() {
        try {
            const { data, error } = await supabase
                .from('editorial_posts')
                .select('*')
                .eq('status', 'published')
                .order('published_at', { ascending: false })

            if (error) throw error
            setPosts(data || [])
        } catch (error) {
            console.error('Error loading posts:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-slate-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl font-black mb-4">Travel News & Insights</h1>
                    <p className="text-xl text-red-100">Discover the latest travel trends, destinations, and tips</p>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent mx-auto"></div>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-lg italic">No articles published yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/news/${post.slug}`}
                                className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:border-red-600 transition-all group shadow-sm hover:shadow-xl"
                            >
                                {post.featured_image ? (
                                    <div className="aspect-video bg-slate-200 overflow-hidden relative">
                                        <Image
                                            src={post.featured_image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                ) : (
                                    <div className="aspect-video bg-gradient-to-br from-red-500 to-slate-700" />
                                )}

                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {new Date(post.published_at).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-red-600 transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="text-slate-600 mb-4 line-clamp-3">{post.excerpt}</p>

                                    {post.tags && post.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.slice(0, 3).map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
