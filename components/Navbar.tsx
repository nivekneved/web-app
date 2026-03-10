'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Hotel, Ship, MapPin, Plane, Activity, User, Heart, Moon, Sun, Phone, Mail, Facebook, Instagram, Linkedin, ChevronDown } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { useTheme } from '@/contexts/ThemeContext'
import { CurrencySelector } from '@/contexts/CurrencyContext'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { user } = useAuth()
    const { wishlist } = useWishlist()
    const { theme, toggleTheme } = useTheme()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            {/* Topbar */}
            <div className="bg-slate-900 text-white py-2 hidden md:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between text-sm">
                        {/* Left: Contact Info */}
                        <div className="flex items-center gap-6">
                            <a href="tel:+2302124070" className="flex items-center gap-2 hover:text-red-500 transition-colors">
                                <Phone size={14} />
                                <span>(+230) 212 4070</span>
                            </a>
                            <a href="mailto:reservation@travellounge.mu" className="flex items-center gap-2 hover:text-red-500 transition-colors">
                                <Mail size={14} />
                                <span>reservation@travellounge.mu</span>
                            </a>
                        </div>

                        {/* Right: Social & User */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <a href="#" className="hover:text-red-500 transition-colors">
                                    <Facebook size={16} />
                                </a>
                                <a href="#" className="hover:text-red-500 transition-colors">
                                    <Instagram size={16} />
                                </a>
                                <a href="#" className="hover:text-red-500 transition-colors">
                                    <Linkedin size={16} />
                                </a>
                            </div>
                            <span className="text-slate-400">|</span>
                            {user ? (
                                <Link href="/dashboard" className="hover:text-red-500 transition-colors">
                                    My Account
                                </Link>
                            ) : (
                                <Link href="/login" className="hover:text-red-500 transition-colors">
                                    Login / Register
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav
                className={`sticky top-0 z-50 bg-white dark:bg-slate-900 transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'border-b border-slate-100 dark:border-slate-800'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 z-50">
                            <span className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                                Travel<span className="text-red-600">Lounge</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-6">
                            <Link href="/" className="text-slate-700 dark:text-slate-300 hover:text-red-600 font-bold transition-colors">
                                Home
                            </Link>

                            <div className="relative group">
                                <Link href="/cruises" className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-red-600 font-bold transition-colors">
                                    Cruises
                                    <ChevronDown size={14} strokeWidth={3} />
                                </Link>
                                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                                    <Link href="/cruises" className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors first:rounded-t-xl text-slate-700 dark:text-slate-200 font-medium">
                                        All Cruises
                                    </Link>
                                    <Link href="/cruises/costa" className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200 font-medium">
                                        Costa Cruises
                                    </Link>
                                    <Link href="/cruises/msc" className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors last:rounded-b-xl text-slate-700 dark:text-slate-200 font-medium">
                                        MSC Cruises
                                    </Link>
                                </div>
                            </div>

                            <Link href="/flights" className="text-slate-700 dark:text-slate-300 hover:text-red-600 font-bold transition-colors">
                                Flights
                            </Link>

                            <div className="relative group">
                                <Link href="/hotels" className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-red-600 font-bold transition-colors">
                                    Hotels
                                    <ChevronDown size={14} strokeWidth={3} />
                                </Link>
                                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                                    <Link href="/hotels" className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors first:rounded-t-xl text-slate-700 dark:text-slate-200 font-medium">
                                        All Hotels
                                    </Link>
                                    <Link href="/hotels/mauritius" className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200 font-medium">
                                        Mauritius
                                    </Link>
                                    <Link href="/hotels/international" className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors last:rounded-b-xl text-slate-700 dark:text-slate-200 font-medium">
                                        International
                                    </Link>
                                </div>
                            </div>

                            <Link href="/rodrigues" className="text-slate-700 dark:text-slate-300 hover:text-red-600 font-bold transition-colors">
                                Rodrigues
                            </Link>
                            
                             <div className="relative group">
                                <Link href="/tours" className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-red-600 font-bold transition-colors">
                                    Group Tours
                                    <ChevronDown size={14} strokeWidth={3} />
                                </Link>
                                 <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                                    <Link href="/tours" className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors first:rounded-t-xl text-slate-700 dark:text-slate-200 font-medium">
                                        All Tours
                                    </Link>
                                    <Link href="/tours/asia" className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200 font-medium">
                                        Asia
                                    </Link>
                                    <Link href="/tours/europe" className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200 font-medium">
                                        Europe
                                    </Link>
                                    <Link href="/tours/dubai" className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors last:rounded-b-xl text-slate-700 dark:text-slate-200 font-medium">
                                        Dubai
                                    </Link>
                                </div>
                            </div>
                            
                            <Link href="/packages" className="text-slate-700 dark:text-slate-300 hover:text-red-600 font-bold transition-colors">
                                Day Packages
                            </Link>

                            <Link href="/contact" className="text-slate-700 dark:text-slate-300 hover:text-red-600 font-bold transition-colors">
                                Contact
                            </Link>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-3">
                            {/* Currency Selector */}
                            <div className="hidden md:block">
                                <CurrencySelector />
                            </div>

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

                            {/* User Button */}
                            {user ? (
                                <Link
                                    href="/dashboard"
                                    className="hidden md:flex px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-slate-900 transition-all items-center gap-2"
                                >
                                    <User size={18} />
                                    <span>Dashboard</span>
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="hidden md:flex px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-slate-900 transition-all items-center gap-2"
                                >
                                    Login
                                </Link>
                            )}

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
                    <div className="lg:hidden bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
                        <div className="px-4 py-4 space-y-2">
                            <Link
                                href="/"
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors text-slate-700 dark:text-slate-300 font-semibold"
                            >
                                Home
                            </Link>
                            <Link
                                href="/cruises"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors text-slate-700 dark:text-slate-300"
                            >
                                <Ship size={18} />
                                Cruises
                            </Link>
                            <Link
                                href="/flights"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors text-slate-700 dark:text-slate-300"
                            >
                                <Plane size={18} />
                                Flights
                            </Link>
                            <Link
                                href="/tours"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors text-slate-700 dark:text-slate-300"
                            >
                                <MapPin size={18} />
                                Group Tours
                            </Link>
                            <Link
                                href="/hotels"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors text-slate-700 dark:text-slate-300"
                            >
                                <Hotel size={18} />
                                Hotels
                            </Link>
                            <Link
                                href="/activities"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors text-slate-700 dark:text-slate-300"
                            >
                                <Activity size={18} />
                                Activities
                            </Link>
                            <Link
                                href="/about"
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors text-slate-700 dark:text-slate-300 font-semibold"
                            >
                                About
                            </Link>
                            <Link
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors text-slate-700 dark:text-slate-300 font-semibold"
                            >
                                Contact
                            </Link>
                            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                                <Link
                                    href={user ? "/dashboard" : "/login"}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 bg-red-600 text-white rounded-xl font-bold text-center"
                                >
                                    {user ? 'Dashboard' : 'Login'}
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}
