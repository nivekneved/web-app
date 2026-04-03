'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface GuestCount {
  adults: number
  children: number
}

export default function SearchBar() {
  const [showGuests, setShowGuests] = useState(false)
  const [guests, setGuests] = useState<GuestCount>({ adults: 2, children: 0 })
  const [checkIn, setCheckIn] = useState<string>('2026-04-30')
  const [checkOut, setCheckOut] = useState<string>('2026-05-29')
  
  const guestRef = useRef<HTMLDivElement>(null)

  // format date for display
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    } catch {
      return dateStr
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (guestRef.current && !guestRef.current.contains(event.target as Node)) {
        setShowGuests(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const updateGuests = (type: keyof GuestCount, increment: boolean) => {
    setGuests(prev => ({
      ...prev,
      [type]: Math.max(type === 'adults' ? 1 : 0, prev[type] + (increment ? 1 : -1))
    }))
  }

  const totalGuests = guests.adults + guests.children

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-1 relative z-40">
      <div className="bg-white rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-2 md:p-3 flex flex-col md:flex-row items-stretch md:items-center gap-2 border border-slate-100">
        
        {/* Check-in */}
        <div className="flex-1 px-6 py-2 border-r border-slate-100 last:border-0 cursor-pointer hover:bg-slate-50 transition-colors rounded-3xl md:rounded-none md:rounded-l-full relative group">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-blue-600 transition-colors">
            Check-in
          </label>
          <div className="flex items-center gap-2">
            <span className="text-slate-900 font-bold text-sm md:text-base">
              {formatDate(checkIn)}
            </span>
            <input 
              type="date" 
              className="absolute inset-0 opacity-0 cursor-pointer"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
        </div>

        {/* Check-out */}
        <div className="flex-1 px-6 py-2 border-r border-slate-100 last:border-0 cursor-pointer hover:bg-slate-50 transition-colors relative group">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-blue-600 transition-colors">
            Check-out
          </label>
          <div className="flex items-center gap-2">
            <span className="text-slate-900 font-bold text-sm md:text-base">
              {formatDate(checkOut)}
            </span>
            <input 
              type="date" 
              className="absolute inset-0 opacity-0 cursor-pointer"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        {/* Guests */}
        <div 
          ref={guestRef}
          onClick={() => setShowGuests(!showGuests)}
          className="flex-1 px-6 py-2 cursor-pointer hover:bg-slate-50 transition-colors relative group"
        >
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-blue-600 transition-colors">
            Guests
          </label>
          <div className="flex items-center justify-between">
            <span className="text-slate-900 font-bold text-sm md:text-base">
              {totalGuests > 0 ? `${totalGuests} Guests` : 'Add Guests'}
            </span>
          </div>

          <AnimatePresence>
            {showGuests && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full left-0 mt-4 w-72 bg-white rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.2)] border border-slate-100 p-6 z-50 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="space-y-6">
                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Adults</div>
                      <div className="text-xs text-slate-400">Age 18+</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => updateGuests('adults', false)}
                        className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-blue-600 hover:text-blue-600 transition-all disabled:opacity-30"
                        disabled={guests.adults <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold text-slate-900 w-4 text-center">{guests.adults}</span>
                      <button 
                        onClick={() => updateGuests('adults', true)}
                        className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-blue-600 hover:text-blue-600 transition-all"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Children</div>
                      <div className="text-xs text-slate-400">Age 0-17</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => updateGuests('children', false)}
                        className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-blue-600 hover:text-blue-600 transition-all disabled:opacity-30"
                        disabled={guests.children <= 0}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold text-slate-900 w-4 text-center">{guests.children}</span>
                      <button 
                        onClick={() => updateGuests('children', true)}
                        className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-blue-600 hover:text-blue-600 transition-all"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-[#0060CE] text-white font-black rounded-2xl hover:bg-blue-700 transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-600/20 text-sm uppercase tracking-widest mt-2">
                    Search
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Button */}
        <div className="md:pl-4 py-1 pr-1">
          <button className="w-full md:w-auto px-10 py-5 bg-[#0060CE] text-white rounded-full font-black text-sm tracking-[0.2em] hover:bg-blue-700 transition-all transform hover:scale-105 shadow-xl shadow-blue-600/30 uppercase flex items-center justify-center gap-3">
            <Search size={18} strokeWidth={3} />
            <span className="md:inline">Search</span>
          </button>
        </div>

      </div>
    </div>
  )
}
