'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Menu, X, Hotel, Ship, MapPin, Plane, Activity, Heart, Moon, Sun, Phone, Mail, Facebook, Instagram, Linkedin, ChevronDown } from 'lucide-react'
import { useWishlist } from '@/contexts/WishlistContext'
import { useTheme } from '@/contexts/ThemeContext'
import { createClient } from '@/lib/supabase'

interface SiteSettings {
    general_config?: {
        siteTitle?: string;
        contactEmail?: string;
        contactPhone?: string;
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
    const { wishlist } = useWishlist()
    const { theme, toggleTheme } = useTheme()
    const supabase = createClient()

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

    const [navItems, setNavItems] = useState<any[]>([])
    const fetchNavigations = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('navigations')
                .select('*')
                .eq('is_active', true)
                .order('display_order', { ascending: true })

            if (!error && data && data.length > 0) {
                setNavItems(data)
            }
        } catch (err) {
            console.error('Error fetching dynamic navigations:', err)
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
    const contactEmail = settings?.general_config?.contactEmail || 'reservation@travellounge.mu'
    const contactPhone = settings?.general_config?.contactPhone || '(+230) 212 4070'
    const facebookUrl = settings?.general_config?.facebookUrl || '#'
    const instagramUrl = settings?.general_config?.instagramUrl || '#'
    const linkedinUrl = settings?.general_config?.linkedinUrl || '#'

    return (
        <>
            {/* Topbar */}
            <div className="bg-red-600 text-white py-1 hidden md:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between text-sm">
                        {/* Left: Contact Info */}
                        <div className="flex items-center gap-6">
                            <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:bg-white/10 p-1 rounded transition-colors">
                                <Phone size={14} />
                                <span>{contactPhone}</span>
                            </a>
                            <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 hover:bg-white/10 p-1 rounded transition-colors">
                                <Mail size={14} />
                                <span>{contactEmail}</span>
                            </a>
                        </div>

                        {/* Right: Social & User */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:bg-white/10 p-1 rounded transition-colors">
                                    <Facebook size={16} />
                                </a>
                                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:bg-white/10 p-1 rounded transition-colors">
                                    <Instagram size={16} />
                                </a>
                                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:bg-white/10 p-1 rounded transition-colors">
                                    <Linkedin size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav
                className={`sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'border-b border-slate-100'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 z-50">
                            <Image
                                src="/logo.png"
                                alt={siteTitle}
                                width={160}
                                height={40}
                                className="h-8 md:h-10 w-auto object-contain"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-6">
                            {navItems.length > 0 ? (
                                navItems.map((item) => (
                                    <Link key={item.id} href={item.link} className="text-slate-900 hover:text-red-600 font-bold transition-colors">
                                        {item.label}
                                    </Link>
                                ))
                            ) : (
                                <>
                                    <Link href="/cruises" className="text-slate-900 hover:text-red-600 font-bold transition-colors">Cruises</Link>
                                    <Link href="/flights" className="text-slate-900 hover:text-red-600 font-bold transition-colors">Flights</Link>
                                    <Link href="/hotels" className="text-slate-900 hover:text-red-600 font-bold transition-colors">Hotels</Link>
                                    <div className="relative group">
                                        <Link href="/about" className="flex items-center gap-1 text-slate-900 hover:text-red-600 font-bold transition-colors">
                                            About
                                            <ChevronDown size={14} strokeWidth={3} />
                                        </Link>
                                        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                                            <Link href="/about" className="block px-4 py-3 hover:bg-slate-50 transition-colors first:rounded-t-xl text-slate-900 font-medium">Inside Travel Lounge</Link>
                                            <Link href="/about/team" className="block px-4 py-3 hover:bg-slate-50 transition-colors last:rounded-b-xl text-slate-900 font-medium">Our Team</Link>
                                        </div>
                                    </div>
                                    <Link href="/packages" className="text-slate-900 hover:text-red-600 font-bold transition-colors">Day Packages</Link>
                                    <Link href="/contact" className="text-slate-900 hover:text-red-600 font-bold transition-colors">Contact</Link>
                                </>
                            )}
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-3">
                            {/* Dark Mode Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors hidden md:block"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? <Sun size={20} className="text-slate-400" /> : <Moon size={20} className="text-slate-600" />}
                            </button>

                            {/* Wishlist */}
                            <Link
                                href="/wishlist"
                                className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors hidden md:block"
                            >
                                <Heart size={20} className="text-slate-600 dark:text-slate-400" />
                                {wishlist.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {wishlist.length}
                                    </span>
                                )}
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden bg-white border-t border-slate-100">
                        <div className="px-4 py-4 space-y-2">
                            {navItems.length > 0 ? (
                                navItems.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={item.link}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors text-slate-900 font-bold"
                                    >
                                        {item.label}
                                    </Link>
                                ))
                            ) : (
                                <>
                                    <Link href="/cruises" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors text-slate-900"><Ship size={18} /> Cruises</Link>
                                    <Link href="/flights" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors text-slate-900"><Plane size={18} /> Flights</Link>
                                    <Link href="/hotels" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors text-slate-900"><Hotel size={18} /> Hotels</Link>
                                    <Link href="/about" onClick={() => setIsOpen(false)} className="block px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors text-slate-900 font-semibold">About Us</Link>
                                    <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors text-slate-900 font-semibold">Contact</Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}
