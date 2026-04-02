'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
    user: { id: string, email: string, user_metadata: any } | null
    loading: boolean
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signOut: async () => { }
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    // Mock user for testing without real authentication
    const [user] = useState<{ id: string, email: string, user_metadata: any } | null>({
        id: 'mock-user-id',
        email: 'guest@example.com',
        user_metadata: { name: 'Guest User' }
    })
    const [loading] = useState(false)

    useEffect(() => {
        // Clear all session storage and auth-related cookies/history
        try {
            if (typeof window !== 'undefined') {
                // Clear any supabase-related local storage
                Object.keys(localStorage).forEach(key => {
                    if (key.startsWith('sb-')) {
                        localStorage.removeItem(key)
                    }
                })
                // Clear any specific session storage
                sessionStorage.clear()
                console.log('[AuthContext] Legacy session data cleared for auth-free mode')
            }
        } catch (e) {
            console.error('Error clearing legacy session data:', e)
        }
        
    }, [])


    const signOut = async () => {
        // No-op for mock environment
        console.log('Sign out requested - no-op in auth-free mode')
    }

    return (
        <AuthContext.Provider value={{ user, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

