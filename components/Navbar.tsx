'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Menu, X, Heart, Moon, Sun, Phone, Mail, Facebook, Instagram, MessageCircle } from 'lucide-react'
import { useWishlist } from '@/contexts/WishlistContext'
import { useTheme } from '@/contexts/ThemeContext'
import { createClient } from '@/lib/supabase'
import { navigationConfig, type NavMenuItem } from '@/lib/navigation'
import { NavRecursive } from './Navbar/NavRecursive'
import { MobileAccordion } from './Navbar/MobileAccordion'
import { cn } from '@/lib/utils'

interface NavRow {
    id: string;
    label: string;
    link: string;
    parent_id: string | null;
    display_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface SiteSettings {
    general_config?: {
        siteTitle?: string;
        contactEmail?: string;
        contactPhone?: string;
        facebookUrl?: string;
        instagramUrl?: string;
    };
    [key: string]: unknown;
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [settings, setSettings] = useState<SiteSettings | null>(null)
    const [items, setItems] = useState<NavMenuItem[]>([])
    const { wishlist } = useWishlist()
    const { theme, toggleTheme } = useTheme()
    const supabase = createClient()

    const fetchNavigations = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('navigations')
                .select('*')
                .eq('is_active', true)
                .order('display_order', { ascending: true })

            if (error) throw error

            if (data) {
                // Build Tree
                const tree: NavMenuItem[] = []
                const map: Record<string, NavMenuItem & { id: string; parent_id: string | null }> = {}
                
                const rows = data as NavRow[]
                
                rows.forEach((item) => {
                    map[item.id] = { 
                        label: item.label, 
                        href: item.link, 
                        children: [],
                        id: item.id,
                        parent_id: item.parent_id
                    }
                })
                
                rows.forEach((item) => {
                    if (item.parent_id && map[item.parent_id]) {
                        map[item.parent_id].children?.push(map[item.id])
                    } else {
                        tree.push(map[item.id])
                    }
                })
                setItems(tree)
            }
        } catch (err) {
            console.error('Error fetching navigations:', err)
        }
    }, [supabase])

    const fetchSettings = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('*')

            if (error) throw error

            if (data) {
                const config: SiteSettings = {}
                data.forEach((item: { key: string; value: unknown }) => {
                    config[item.key] = item.value
                })
                setSettings(config)
            }
        } catch (err) {
            console.error('Error fetching navbar settings:', err)
        }
    }, [supabase])

    useEffect(() => {
        fetchSettings()
        fetchNavigations()

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [fetchSettings, fetchNavigations])

    const siteTitle = settings?.general_config?.siteTitle || 'Travel Lounge'
    const facebookUrl = settings?.general_config?.facebookUrl || 'https://www.facebook.com/cqf.xeh.mybluehost.me/website_6dd3f772/'
    const instagramUrl = settings?.general_config?.instagramUrl || 'https://www.instagram.com/travellounge_ltd?igsh=MWljeWRiNG43aDN0OQ=='

    return (
        <header className="w-full">
            {/* Topbar */}
            <div className="bg-red-600 text-white py-1 hidden md:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex flex-wrap items-center gap-4 md:gap-6">
                            <a href="tel:+2302124070" className="flex items-center gap-2 hover:bg-white/10 p-1 rounded transition-colors whitespace-nowrap">
                                <Phone size={14} />
                                <span>(+230) 212 4070</span>
                            </a>
                            <a href="https://wa.me/23059407701" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:bg-white/10 p-1 rounded transition-colors whitespace-nowrap">
                                <MessageCircle size={14} className="text-green-400" />
                                <span>5940 7701</span>
                            </a>
                            <a href="https://wa.me/23059407711" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:bg-white/10 p-1 rounded transition-colors whitespace-nowrap">
                                <MessageCircle size={14} className="text-green-400" />
                                <span>5940 7711</span>
                            </a>
                            <a href="mailto:reservation@travellounge.mu" className="flex items-center gap-2 hover:bg-white/10 p-1 rounded transition-colors whitespace-nowrap">
                                <Mail size={14} />
                                <span>reservation@travellounge.mu</span>
                            </a>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:bg-white/10 p-1 rounded transition-colors">
                                    <Facebook size={16} />
                                </a>
                                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:bg-white/10 p-1 rounded transition-colors">
                                    <Instagram size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav
                className={cn(
                    "sticky top-0 z-50 bg-white transition-all duration-300",
                    isScrolled ? "shadow-lg py-2" : "border-b border-slate-100 dark:border-slate-800 py-4"
                )}
                role="navigation"
                aria-label="Main Navigation"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 z-50 shrink-0">
                            <Image
                                src="/logo.png"
                                alt={siteTitle}
                                width={200}
                                height={50}
                                className="h-10 md:h-12 w-auto object-contain"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:block">
                            <NavRecursive items={items.length > 0 ? items : navigationConfig.menu} />
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-2 md:gap-4">
                            {/* CTA Button */}
                            <Link
                                href={navigationConfig.cta.href}
                                className="hidden md:flex items-center justify-center px-5 py-2.5 bg-primary hover:bg-primary/90 text-black font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                            >
                                {navigationConfig.cta.label}
                            </Link>

                            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

                            {/* Theme & Wishlist */}
                            <div className="flex items-center gap-1 md:gap-2">
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                    aria-label="Toggle theme"
                                >
                                    {theme === 'dark' ? <Sun size={20} className="text-slate-400" /> : <Moon size={20} className="text-slate-800" />}
                                </button>

                                <Link
                                    href="/wishlist"
                                    className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                    aria-label={`View Wishlist (${wishlist.length} items)`}
                                >
                                    <Heart size={20} className="text-slate-800" />
                                    {wishlist.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                            {wishlist.length}
                                        </span>
                                    )}
                                </Link>

                                {/* Mobile Menu Button */}
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                    aria-expanded={isOpen}
                                    aria-controls="mobile-menu"
                                    aria-label="Toggle mobile menu"
                                >
                                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div 
                    id="mobile-menu"
                    className={cn(
                        "lg:hidden fixed inset-x-0 top-[64px] bottom-0 bg-white dark:bg-slate-900 z-40 transition-transform duration-300 ease-in-out transform",
                        isOpen ? "translate-x-0" : "-translate-x-full"
                    )}
                >
                    <div className="h-full overflow-y-auto px-6 py-8">
                        <MobileAccordion items={items.length > 0 ? items : navigationConfig.menu} onClose={() => setIsOpen(false)} />
                        
                        {/* Mobile CTA */}
                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                             <Link
                                href={navigationConfig.cta.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center w-full px-5 py-4 bg-primary text-black font-bold rounded-xl shadow-lg shadow-primary/20"
                            >
                                {navigationConfig.cta.label}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
