'use client'

import React, { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, User, ArrowLeft, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const authSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().optional()
})

type AuthFormData = z.infer<typeof authSchema>

const supabase = createClient()

export default function LoginPage() {
    const router = useRouter()
    const [isLogin, setIsLogin] = useState(true)
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting } 
    } = useForm<AuthFormData>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: '',
            password: '',
            name: ''
        }
    })

    async function onSubmit(data: AuthFormData) {
        try {
            if (isLogin) {
                // Login
                const { error } = await supabase.auth.signInWithPassword({
                    email: data.email,
                    password: data.password,
                })

                if (error) throw error
                toast.success('Welcome back!')
                router.push('/dashboard')
            } else {
                // Sign up - manual check for name
                if (!data.name) {
                    toast.error('Name is required for sign up')
                    return
                }

                const { data: authData, error: authError } = await supabase.auth.signUp({
                    email: data.email,
                    password: data.password,
                })

                if (authError) throw authError

                // Create profile
                if (authData.user) {
                    const { error: profileError } = await supabase
                        .from('profiles')
                        .insert([{
                            id: authData.user.id,
                            email: data.email,
                            name: data.name
                        }])

                    if (profileError) throw profileError

                    toast.success('Account created! Please check your email to verify.')
                    router.push('/dashboard')
                }
            }
        } catch (error) {
            toast.error((error as Error).message || 'Authentication failed')
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
            {/* Back to Home */}
            <div className="absolute top-8 left-8">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-red-600 font-medium transition-colors">
                    <ArrowLeft size={18} />
                    Back to Home
                </Link>
            </div>

            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-slate-900 mb-2">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="text-slate-500 font-medium">
                        {isLogin ? 'Sign in to your account' : 'Join Travel Lounge today'}
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-[3rem] p-8 shadow-xl border border-slate-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {!isLogin && (
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                                    <User size={14} className="inline mr-1" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    {...register('name')}
                                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 focus:border-red-600 transition-all font-medium ${errors.name ? 'border-red-500' : 'border-slate-300'}`}
                                    placeholder="John Doe"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-[10px] font-black uppercase flex items-center gap-1 mt-1 ml-1">
                                        <AlertCircle size={10} /> {errors.name.message}
                                    </p>
                                )}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                                <Mail size={14} className="inline mr-1" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                {...register('email')}
                                className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 focus:border-red-600 transition-all font-medium ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                                placeholder="john@example.com"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-[10px] font-black uppercase flex items-center gap-1 mt-1 ml-1">
                                    <AlertCircle size={10} /> {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                                <Lock size={14} className="inline mr-1" />
                                Password
                            </label>
                            <input
                                type="password"
                                {...register('password')}
                                className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/20 focus:border-red-600 transition-all font-medium ${errors.password ? 'border-red-500' : 'border-slate-300'}`}
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-[10px] font-black uppercase flex items-center gap-1 mt-1 ml-1">
                                    <AlertCircle size={10} /> {errors.password.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-6 py-4 bg-red-600 text-white rounded-xl font-black uppercase tracking-wider hover:bg-slate-900 transition-all shadow-lg shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    Processing...
                                </div>
                            ) : (
                                isLogin ? 'Sign In' : 'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Toggle */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-slate-600 hover:text-red-600 font-medium transition-colors"
                        >
                            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}