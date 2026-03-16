'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const partners = [
  { name: 'Air Austral', logo: '/partners/Air-austral.png' },
  { name: 'Air France', logo: '/partners/airfrance.png' },
  { name: 'Air Mauritius', logo: '/partners/airmauritius.png' },
  { name: 'Expat', logo: '/partners/Expat-logo-e1717409708420.jpg' },
  { name: 'Holy', logo: '/partners/HOLY-NEW.png' },
  { name: 'Kenya Airways', logo: '/partners/KenyaAirways.png' },
  { name: 'SA Airways', logo: '/partners/SAairways.png' },
  { name: 'Swan', logo: '/partners/SWAN-NEW.png' },
  { name: 'Turkish Airlines', logo: '/partners/Turkishairline.png' },
  { name: 'Hotelbeds', logo: '/partners/hotelbeds.png' },
  { name: 'TBO Holidays', logo: '/partners/tboholidays.png' },
  { name: 'Emirates', logo: '/partners/prt-5-300x225-1.webp' }, 
  { name: 'Cim Finance', logo: '/partners/prt-7-300x225-1.webp' },
  { name: 'Partner 3', logo: '/partners/prt3.webp' },
];

// Double the partners for a seamless infinite loop
const sliderPartners = [...partners, ...partners];

export default function PartnerSlider() {
  return (
    <div className="pb-10 pt-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
      <motion.div
        className="flex gap-24 items-center justify-start py-4"
        animate={{
          x: ['0%', '-50%'], 
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
        whileHover={{ scale: 1.01 }}
        style={{ width: 'fit-content' }}
      >
        {sliderPartners.map((partner, index) => (
          <motion.div
            key={`${partner.name}-${index}`}
            className="relative h-24 w-60 shrink-0 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              className="object-contain"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
