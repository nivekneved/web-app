'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { resolveImageUrl } from '@/lib/image';

const supabase = createClient();

export default function PartnerSlider() {
  const [partners, setPartners] = React.useState<{ name: string; logo_url: string }[]>([]);

  React.useEffect(() => {
    async function loadPartners() {
      const { data } = await supabase
        .from('partners')
        .select('name, logo_url')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
        
      if (data) setPartners(data);
    }
    loadPartners();
  }, []);

  // Double the partners for a seamless infinite loop
  const sliderPartners = [...partners, ...partners];
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
              src={resolveImageUrl(partner.logo_url)}
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
