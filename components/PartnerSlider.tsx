'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const partners = [
  { name: 'Air Austral', logo: '/partners/Air-austral.png' },
  { name: 'Air France', logo: '/partners/airfrance.png' },
  { name: 'Air Mauritius', logo: '/partners/airmauritius.png' },
  { name: 'Expat', logo: '/partners/Expat-logo-e1717409708420.jpg' },
  { name: 'Holy', logo: '/partners/HOLY-NEW.png' },
  { name: 'Kenya Airways', logo: '/partners/KenyaAirways.png' },
  { name: 'Partner 5', logo: '/partners/prt-5-300x225-1.webp' },
  { name: 'Partner 7', logo: '/partners/prt-7-300x225-1.webp' },
  { name: 'Partner 3', logo: '/partners/prt3.webp' },
  { name: 'SA Airways', logo: '/partners/SAairways.png' },
  { name: 'Swan', logo: '/partners/SWAN-NEW.png' },
  { name: 'Turkish Airlines', logo: '/partners/Turkishairline.png' },
];

export default function PartnerSlider() {
  return (
    <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center group">
          {/* Custom Arrows based on the image */}
          <button className="absolute left-0 z-10 p-2 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronLeft size={32} />
          </button>
          
          <div className="flex-grow flex items-center justify-around gap-12 overflow-x-auto no-scrollbar py-4">
             {/* Simple Marquee or row based on image */}
             <div className="flex items-center gap-16 min-w-full justify-center">
                {partners.map((partner, index) => (
                    <motion.div
                        key={partner.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative h-12 w-48 shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
                    >
                        <Image
                            src={partner.logo}
                            alt={partner.name}
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </motion.div>
                ))}
             </div>
          </div>

          <button className="absolute right-0 z-10 p-2 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    </section>
  );
}
