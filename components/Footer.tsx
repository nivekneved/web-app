import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-2xl font-black mb-4">
                            Travel<span className="text-red-600">Lounge</span>
                        </h3>
                        <p className="text-slate-300 mb-4 leading-relaxed">
                            Your local and international holiday provider. IATA accredited travel agents for safe and memorable holidays.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Visit Us */}
                    <div>
                        <h4 className="text-lg font-black mb-4">Visit Us</h4>
                        <div className="space-y-4 text-slate-300">
                            <div>
                                <p className="font-bold text-white mb-1">Port Louis</p>
                                <p className="text-sm flex items-start gap-2">
                                    <MapPin size={16} className="mt-1 flex-shrink-0 text-red-600" />
                                    <span>Ground Floor Newton Tower, Corner Sir William Newton and Remy Ollier Street, Port Louis, Mauritius</span>
                                </p>
                            </div>
                            <div>
                                <p className="font-bold text-white mb-1">Ebene</p>
                                <p className="text-sm flex items-start gap-2">
                                    <MapPin size={16} className="mt-1 flex-shrink-0 text-red-600" />
                                    <span>Ground Floor, 57 Ebene Mews, Rue Du Savoir, Ebene Cybercity</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h4 className="text-lg font-black mb-4">Contact Us</h4>
                        <div className="space-y-3 text-slate-300">
                            <a href="tel:+2302124070" className="flex items-center gap-2 hover:text-red-600 transition-colors">
                                <Phone size={16} className="text-red-600" />
                                <span>(+230) 212 4070</span>
                            </a>
                            <a href="https://wa.me/23059407711" className="flex items-center gap-2 hover:text-red-600 transition-colors">
                                <Phone size={16} className="text-red-600" />
                                <span>(+230) 5940 7711</span>
                            </a>
                            <a href="https://wa.me/23059407701" className="flex items-center gap-2 hover:text-red-600 transition-colors">
                                <Phone size={16} className="text-red-600" />
                                <span>(+230) 5940 7701</span>
                            </a>
                            <a href="mailto:reservation@travellounge.mu" className="flex items-center gap-2 hover:text-red-600 transition-colors">
                                <Mail size={16} className="text-red-600" />
                                <span>reservation@travellounge.mu</span>
                            </a>
                            <div className="pt-3">
                                <p className="font-bold text-white mb-2 flex items-center gap-2">
                                    <Clock size={16} className="text-red-600" />
                                    Working Hours
                                </p>
                                <p className="text-sm">Monday – Friday: 08:30 – 16:45</p>
                                <p className="text-sm">Saturday: 08:30 – 12:30</p>
                                <p className="text-sm">Sunday & Public holidays: Closed</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-black mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-slate-300">
                            <li>
                                <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-red-600 transition-colors">About Us</Link>
                            </li>
                            <li>
                                <Link href="/cruises" className="hover:text-red-600 transition-colors">Cruises</Link>
                            </li>
                            <li>
                                <Link href="/tours" className="hover:text-red-600 transition-colors">Group Tours</Link>
                            </li>
                            <li>
                                <Link href="/hotels" className="hover:text-red-600 transition-colors">Hotels</Link>
                            </li>
                            <li>
                                <Link href="/activities" className="hover:text-red-600 transition-colors">Activities</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-red-600 transition-colors">Contact Us</Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-red-600 transition-colors">FAQ</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="mt-12 pt-8 border-t border-slate-800">
                    <div className="max-w-xl mx-auto text-center">
                        <h4 className="text-lg font-black mb-2">Newsletter</h4>
                        <p className="text-slate-300 mb-4">Stay up to date with our latest news, receive exclusive deals, and more.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                            />
                            <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-400">
                    <p>
                        © {new Date().getFullYear()} Travel Lounge and Leisure. All rights reserved.
                        {' '}- Developed by <a href="https://www.ebox.mu" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-500">EBOX</a>
                    </p>
                </div>
            </div>
        </footer>
    )
}
