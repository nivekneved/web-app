'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { Menu, X, Heart, Phone, Mail, Facebook, Instagram, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useWishlist } from '@/contexts/WishlistContext'
// import { useTheme } from '@/contexts/ThemeContext'
import { createClient } from '@/lib/supabase'
import { navigationConfig, type NavMenuItem } from '@/lib/navigation'
import { MobileAccordion } from './Navbar/MobileAccordion'
import { NavRecursive } from './Navbar/NavRecursive'
// import { MegaMenu } from './MegaMenu'
import { cn } from '@/lib/utils'
import { Button } from './ui/Button'

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
        whatsappNumber1?: string;
        whatsappNumber2?: string;
        facebookUrl?: string;
        instagramUrl?: string;
        linkedinUrl?: string;
    };
    [key: string]: unknown;
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [settings, setSettings] = useState<SiteSettings | null>(null)
    const [items, setItems] = useState<NavMenuItem[]>([])
    // const [activeMegaMenu, setActiveMegaMenu] = useState<NavMenuItem | null>(null)
    const { wishlist } = useWishlist()
    // const { theme, toggleTheme } = useTheme()
    const supabase = createClient()

    const fetchNavigations = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('navigations')
                .select('id, label, link, parent_id, display_order, is_active')
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
                .select('key, value')

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
    const facebookUrl = settings?.general_config?.facebookUrl || 'https://www.facebook.com/travellounge.mu'
    const instagramUrl = settings?.general_config?.instagramUrl || 'https://www.instagram.com/travellounge_ltd?igsh=MWljeWRiNG43aDN0OQ=='

    const menuItems = items.length > 0 ? items : navigationConfig.menu

    return (
        <header className="w-full">
            {/* Topbar */}
            <AnimatePresence>
                {!isScrolled && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="bg-red-600 text-white py-1 hidden md:block border-b border-red-700 overflow-hidden"
                    >
                        <div className="max-w-[1920px] mx-auto px-4 sm:px-10 lg:px-16">
                            <div className="flex items-center justify-between text-sm font-medium">
                                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                                    {settings?.general_config?.contactPhone && (
                                        <a href={`tel:${settings.general_config.contactPhone.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:bg-white/10 p-1 rounded transition-colors whitespace-nowrap">
                                            <Phone size={14} />
                                            <span>{settings.general_config.contactPhone}</span>
                                        </a>
                                    )}
                                    {settings?.general_config?.whatsappNumber1 && (
                                        <a href={`https://wa.me/${settings.general_config.whatsappNumber1.replace(/\s+/g, '').replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:bg-white/10 p-1 rounded transition-colors whitespace-nowrap">
                                            <MessageCircle size={14} className="text-white" />
                                            <span>{settings.general_config.whatsappNumber1}</span>
                                        </a>
                                    )}
                                    {settings?.general_config?.whatsappNumber2 && (
                                        <a href={`https://wa.me/${settings.general_config.whatsappNumber2.replace(/\s+/g, '').replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:bg-white/10 p-1 rounded transition-colors whitespace-nowrap">
                                            <MessageCircle size={14} className="text-white" />
                                            <span>{settings.general_config.whatsappNumber2}</span>
                                        </a>
                                    )}
                                    {settings?.general_config?.contactEmail && (
                                        <a href={`mailto:${settings.general_config.contactEmail}`} className="flex items-center gap-2 hover:bg-white/10 p-1 rounded transition-colors whitespace-nowrap">
                                            <Mail size={14} />
                                            <span>{settings.general_config.contactEmail}</span>
                                        </a>
                                    )}
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        {facebookUrl && (
                                            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:bg-white/10 p-1 rounded transition-colors">
                                                <Facebook size={16} />
                                            </a>
                                        )}
                                        {instagramUrl && (
                                            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:bg-white/10 p-1 rounded transition-colors">
                                                <Instagram size={16} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <nav
                className={cn(
                    "sticky top-0 z-50 transition-all duration-300",
                    isScrolled 
                        ? "bg-white/95 backdrop-blur-xl shadow-lg py-2" 
                        : "bg-white border-b border-slate-100 py-2"
                )}
                role="navigation"
                aria-label="Main Navigation"
            >
                <div className="max-w-[1920px] mx-auto px-4 sm:px-10 lg:px-16">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 z-50 shrink-0">
                            <Image
                                src="/logo.png"
                                alt={siteTitle}
                                width={240}
                                height={72}
                                className="h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
                                priority
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center justify-center flex-grow">
                            <NavRecursive items={menuItems} />
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-2 md:gap-4">
                            {/* CTA Button */}
                            <Button
                                asChild
                                variant="primary"
                                size="sm"
                                className="hidden md:flex shadow-none hover:shadow-lg transition-all"
                            >
                                <Link href={navigationConfig.cta.href}>
                                    {navigationConfig.cta.label}
                                </Link>
                            </Button>

                            <div className="h-6 w-px bg-slate-200 dark:bg-slate-300 hidden md:block"></div>

                            {/* Wishlist */}
                            <div className="flex items-center gap-1 md:gap-3">
                                <motion.div whileTap={{ scale: 0.9 }}>
                                    <Link
                                        href="/wishlist"
                                        className="relative w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full text-slate-900 dark:text-white transition-all hover:ring-4 hover:ring-red-600/10"
                                        aria-label={`View Wishlist (${wishlist.length} items)`}
                                    >
                                        <Heart 
                                            size={18} 
                                            className={cn(wishlist.length > 0 ? "text-red-600 fill-red-600" : "text-current")} 
                                        />
                                        {wishlist.length > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-red-600/40 border-2 border-white dark:border-slate-800">
                                                {wishlist.length}
                                            </span>
                                        )}
                                    </Link>
                                </motion.div>

                                <motion.div whileTap={{ scale: 0.9 }} className="lg:hidden">
                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="group p-2 flex items-center gap-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full pl-5 pr-2 transition-all hover:ring-4 hover:ring-red-600/10"
                                        aria-expanded={isOpen}
                                        aria-controls="navigation-drawer"
                                        aria-label="Toggle navigation menu"
                                    >
                                        <span className="text-[10px] font-black text-slate-900 dark:text-slate-100 tracking-[0.3em] uppercase transition-colors group-hover:text-red-600">
                                            {isOpen ? "Close" : "Menu"}
                                        </span>
                                        <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-900 rounded-full text-slate-900 dark:text-white shadow-sm border border-slate-100 dark:border-slate-800">
                                            {isOpen ? <X size={18} /> : <Menu size={18} />}
                                        </div>
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Standard Dropdowns for nested items happen inside DropdownMenuItem now */}


                {/* Universal Navigation Drawer */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[60]"
                            />

                            {/* Drawer Content */}
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                                className="fixed right-0 top-0 bottom-0 w-full md:w-[450px] bg-white dark:bg-slate-50 z-[70] shadow-[-20px_0_80px_-20px_rgba(0,0,0,0.15)] flex flex-col"
                            >
                                {/* Drawer Header */}
                                <div className="p-8 flex items-center justify-between border-b border-slate-100 dark:border-slate-200">
                                    <Link href="/" onClick={() => setIsOpen(false)}>
                                        <Image
                                            src="/logo.png"
                                            alt={siteTitle}
                                            width={140}
                                            height={40}
                                            className="h-10 w-auto object-contain"
                                        />
                                    </Link>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-white rounded-full text-slate-500 hover:text-red-600 border border-slate-100 transition-all font-black text-xs"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Navigation Items */}
                                <div className="flex-grow overflow-y-auto px-10 py-12 custom-scrollbar">
                                    <MobileAccordion items={menuItems} onClose={() => setIsOpen(false)} />
                                </div>

                                {/* Drawer Footer */}
                                <div className="p-10 border-t border-slate-100 dark:border-slate-200 bg-slate-50/50">
                                    <Button
                                        asChild
                                        variant="primary"
                                        size="lg"
                                        className="w-full shadow-2xl shadow-red-600/20 py-8 text-sm tracking-[0.2em] font-black"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Link href={navigationConfig.cta.href}>
                                            {navigationConfig.cta.label}
                                        </Link>
                                    </Button>

                                    <div className="mt-8 flex items-center justify-center gap-6 grayscale opacity-50">
                                        <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:grayscale-0 transition-all">
                                            <Facebook size={20} />
                                        </a>
                                        <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:grayscale-0 transition-all">
                                            <Instagram size={20} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    )
}

