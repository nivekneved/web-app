'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { type NavMenuItem } from '@/lib/navigation'
import { cn } from '@/lib/utils'

interface MegaMenuProps {
    items: NavMenuItem[]
    onClose: () => void
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ items, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
                "absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl z-50 py-12 px-6 overflow-y-auto max-h-[calc(100vh-100px)]"
            )}
            onMouseLeave={onClose}
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-12">
                {items.map((category, idx) => (
                    <div key={idx} className="space-y-6">
                        <Link 
                            href={category.href}
                            className="block"
                            onClick={onClose}
                        >
                            <h3 className="text-xs font-black text-red-600 uppercase tracking-[0.3em] mb-4 hover:text-slate-900 transition-colors">
                                {category.label}
                            </h3>
                        </Link>
                        
                        {category.children && category.children.length > 0 && (
                            <ul className="space-y-3">
                                {category.children.map((child, cIdx) => (
                                    <li key={cIdx}>
                                        <Link
                                            href={child.href}
                                            className="group flex flex-col"
                                            onClick={onClose}
                                        >
                                            <span className="text-sm font-bold text-slate-800 group-hover:text-red-600 transition-colors">
                                                {child.label}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}

                <div className="lg:col-span-1 xl:col-span-1 border-l border-slate-100 pl-12 hidden lg:block">
                    <div className="bg-slate-50 rounded-2xl p-6 relative overflow-hidden group">
                        <h4 className="text-lg font-black text-slate-900 mb-2 leading-tight">Plan Your Paradise</h4>
                        <p className="text-sm text-slate-500 font-medium mb-6">Expert travel advice tailored just for you.</p>
                        <Link 
                            href="/plan-my-trip"
                            className="inline-block bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-black tracking-widest hover:bg-red-600 transition-all transform hover:scale-105"
                            onClick={onClose}
                        >
                            GET STARTED
                        </Link>
                        <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <span className="text-8xl font-black">TL</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-50 flex items-center justify-between text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
                <div className="flex gap-8">
                    <span>Exclusive Offers</span>
                    <span>24/7 Support</span>
                    <span>IATA Accredited</span>
                </div>
                <div className="text-red-100 italic">Travel Lounge Ltd.</div>
            </div>
        </motion.div>
    )
}

