'use client'

import { createContext, useContext, useEffect, useState } from 'react'

// Authentication has been removed as per guest-only requirement
type AuthContextType = {
    user: null
    loading: boolean
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: false,
    signOut: async () => { }
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    // Clear all session storage and auth-related cookies on bootstrap
    useEffect(() => {
        try {
            if (typeof window !== 'undefined') {
                // Clear all storage to ensure no legacy tokens remain
                localStorage.clear()
                sessionStorage.clear()
                console.log('[AuthContext] All legacy storage data cleared')
            }
        } catch (e) {
            console.error('Error clearing legacy storage:', e)
        }
    }, [])

    const signOut = async () => {
        // No-op for mock environment
        console.log('Sign out requested - no-op in auth-free mode')
    }

    return (
        <AuthContext.Provider value={{ user: null, loading: false, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
