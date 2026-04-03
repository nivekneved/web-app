'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Instagram, Facebook, Share2, X, Mail } from 'lucide-react';

const socialLinks = [
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    href: 'https://wa.me/23059407701',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://www.instagram.com/travellounge_ltd?igsh=MWljeWRiNG43aDN0OQ==',
    color: 'bg-pink-600',
    hoverColor: 'hover:bg-pink-700'
  },
  {
    name: 'Facebook',
    icon: Facebook,
    href: 'https://www.facebook.com/travellounge.mu/',
    color: 'bg-red-600',
    hoverColor: 'hover:bg-red-700'
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:reservation@travellounge.mu',
    color: 'bg-indigo-600',
    hoverColor: 'hover:bg-indigo-700'
  }
];

export default function FloatingSocial() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col gap-3 mb-2"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-center p-1.5 rounded-2xl shadow-lg backdrop-blur-md bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 group transition-all hover:scale-110 active:scale-95`}
                title={social.name}
              >
                <div className={`${social.color} ${social.hoverColor} p-2.5 rounded-xl text-white shadow-md transition-colors`}>
                  <social.icon size={20} />
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`p-4 rounded-full shadow-2xl transition-all flex items-center justify-center ${
          isOpen 
            ? 'bg-slate-900 text-white rotate-90' 
            : 'bg-primary text-white shadow-primary/30'
        }`}
        aria-label="Social media menu"
      >
        {isOpen ? <X size={24} /> : <Share2 size={24} />}
      </motion.button>
    </div>
  );
}
